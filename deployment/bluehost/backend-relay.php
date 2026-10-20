<?php
// Bluehost runs PHP, not Node. Only these application routes are relayed.
// This origin was verified through Replit's publishing settings; never use
// a workspace (.replit.dev) URL or a visitor-supplied destination here.
declare(strict_types=1);
const BACKEND_ORIGIN = 'https://xrp-review-hub.replit.app';

function relayError(int $status, string $message): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode(['error' => $message]);
    exit;
}

// REQUEST_URI retains the original path after Apache's internal rewrite.
// Do not accept a target from query parameters (would create an open proxy).
$uri = $_SERVER['REQUEST_URI'] ?? '';
$path = parse_url($uri, PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$routes = [
    '#^/api/(contact|subscribe|reviews|track-click)$#' => ['POST'],
    '#^/api/news$#' => ['GET', 'HEAD'],
    '#^/api/reviews/(wallet|exchange)/[a-z0-9-]{1,64}$#' => ['GET', 'HEAD'],
    '#^/api/admin/reviews(?:/summary)?$#' => ['GET', 'HEAD'],
    '#^/api/admin/reviews/[1-9][0-9]*/(?:hide|unhide)$#' => ['POST'],
    '#^/api/admin/reviews/[1-9][0-9]*$#' => ['DELETE'],
    '#^/sitemap(?:-[a-z0-9-]+)?\.xml$#' => ['GET', 'HEAD'],
    '#^/rss\.xml$#' => ['GET', 'HEAD'],
    '#^/og/(page|wallet|exchange|compare|blog)\.(png|svg)$#' => ['GET', 'HEAD'],
];
$allowed = null;
foreach ($routes as $pattern => $methods) {
    if (is_string($path) && preg_match($pattern, $path)) {
        $allowed = $methods;
        break;
    }
}
if ($allowed === null) relayError(404, 'Unknown backend route');
if (!in_array($method, $allowed, true)) {
    header('Allow: ' . implode(', ', $allowed));
    relayError(405, 'Method not allowed');
}
if (!function_exists('curl_init')) relayError(503, 'Backend relay requires PHP cURL');
if (strlen($uri) > 8192 || preg_match('/[\x00-\x20\x7f]/', $uri)) {
    relayError(400, 'Invalid request URL');
}

// Cap actual bytes, not just Content-Length (chunked requests can omit it).
$body = file_get_contents('php://input', false, null, 0, 65537);
if ($body === false) relayError(400, 'Unable to read request');
if (strlen($body) > 65536) relayError(413, 'Request too large');
if (in_array($method, ['POST', 'DELETE'], true) && $body !== '' &&
    stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    relayError(415, 'JSON request required');
}

$requestHeaders = ['Accept: ' . ($_SERVER['HTTP_ACCEPT'] ?? 'application/json')];
foreach ([
    'CONTENT_TYPE' => 'Content-Type',
    'HTTP_AUTHORIZATION' => 'Authorization',
    'REDIRECT_HTTP_AUTHORIZATION' => 'Authorization',
    'HTTP_X_ADMIN_TOKEN' => 'X-Admin-Token',
    'HTTP_USER_AGENT' => 'User-Agent',
    'HTTP_REFERER' => 'Referer',
] as $key => $name) {
    if (!empty($_SERVER[$key]) && !preg_match('/[\r\n]/', $_SERVER[$key])) {
        // Apache may put Authorization in either variable.
        if ($key === 'REDIRECT_HTTP_AUTHORIZATION' && !empty($_SERVER['HTTP_AUTHORIZATION'])) continue;
        $requestHeaders[] = $name . ': ' . $_SERVER[$key];
    }
}
// Never forward a visitor's spoofable X-Forwarded-For chain. Express uses
// this address for the review throttle and spam checks.
$requestHeaders[] = 'X-Forwarded-For: ' . ($_SERVER['REMOTE_ADDR'] ?? '');

$responseHeaders = [];
$responseBody = '';
$curl = curl_init(BACKEND_ORIGIN . $uri);
curl_setopt_array($curl, [
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_HTTPHEADER => $requestHeaders,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 40,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
    CURLOPT_NOBODY => $method === 'HEAD',
    CURLOPT_HEADERFUNCTION => function ($handle, string $line) use (&$responseHeaders): int {
        if (stripos($line, 'HTTP/') === 0) $responseHeaders = [];
        $parts = explode(':', $line, 2);
        if (count($parts) === 2) $responseHeaders[strtolower(trim($parts[0]))] = trim($parts[1]);
        return strlen($line);
    },
    CURLOPT_WRITEFUNCTION => function ($handle, string $chunk) use (&$responseBody): int {
        if (strlen($responseBody) + strlen($chunk) > 5 * 1024 * 1024) return 0;
        $responseBody .= $chunk;
        return strlen($chunk);
    },
]);
if ($body !== '' && in_array($method, ['POST', 'DELETE'], true)) {
    curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
}
$ok = curl_exec($curl);
$status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
$curlError = curl_errno($curl);
curl_close($curl);
if ($ok === false || $status < 200) {
    // Do not log form data, tokens, or upstream URLs containing visitor data.
    error_log('[Backend relay] Transport failed, code=' . $curlError);
    relayError($curlError === CURLE_OPERATION_TIMEDOUT ? 504 : 502, 'Backend temporarily unavailable. Please try again.');
}
// A redirect or HTML login/SPA response is not a successful API/image/feed.
// Fail explicitly rather than show a false "subscribed" toast.
$type = strtolower($responseHeaders['content-type'] ?? '');
if (($status >= 300 && $status < 400 && $status !== 304) ||
    ($status < 300 && (
        (strpos($path, '/api/') === 0 && strpos($type, 'application/json') !== 0) ||
        (strpos($path, '/og/') === 0 && strpos($type, 'image/') !== 0) ||
        (substr($path, -4) === '.xml' && strpos($type, 'xml') === false)
    ))) {
    relayError(502, 'Backend returned an unexpected response');
}

http_response_code($status);
header('X-Content-Type-Options: nosniff');
foreach (['content-type', 'cache-control', 'etag', 'last-modified', 'retry-after'] as $name) {
    if (isset($responseHeaders[$name])) header($name . ': ' . $responseHeaders[$name]);
}
// Private writes and moderation responses must never be cached at Bluehost.
if (strpos($path, '/api/') === 0 || $status >= 400) header('Cache-Control: no-store');
if ($method !== 'HEAD') echo $responseBody;

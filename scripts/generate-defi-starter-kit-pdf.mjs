import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const logoPath = path.join(root, "client/src/assets/logos/allthingsxrpl-logo.png");
const outDir = path.join(root, "client/public/downloads");
const outPath = path.join(outDir, "xrpl-defi-starter-kit.pdf");

fs.mkdirSync(outDir, { recursive: true });

const BRAND_BLUE = "#0B3D91";
const ACCENT = "#1FB6FF";
const TEXT = "#1f2937";
const MUTED = "#6b7280";
const RULE = "#e5e7eb";
const BG_SOFT = "#f3f6fb";

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 64, bottom: 24, left: 64, right: 64 },
  info: {
    Title: "XRPL DeFi Starter Kit — All Things XRPL",
    Author: "All Things XRPL",
    Subject: "Your guide to safely getting started with XRPL DeFi",
    Keywords: "XRPL, XRP, DeFi, Xaman, Crossmark, AMM, trustline",
  },
});

doc.pipe(fs.createWriteStream(outPath));

const pageWidth = doc.page.width;
const pageHeight = doc.page.height;
const left = doc.page.margins.left;
const right = pageWidth - doc.page.margins.right;
const contentWidth = right - left;

let pageNum = 0;
let inChrome = false;

function drawPageChrome() {
  pageNum += 1;
  if (pageNum === 1) return; // cover handled separately
  if (inChrome) return;
  inChrome = true;
  const savedY = doc.y;
  const savedX = doc.x;
  // Header rule with small logo + brand text
  doc.save();
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, left, 28, { width: 22, height: 22 });
  }
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(BRAND_BLUE)
    .text("All Things XRPL", left + 30, 34, { lineBreak: false });
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(MUTED)
    .text("XRPL DeFi Starter Kit", 0, 34, {
      align: "right",
      width: right,
    });
  doc
    .strokeColor(RULE)
    .lineWidth(0.5)
    .moveTo(left, 56)
    .lineTo(right, 56)
    .stroke();

  // Footer
  doc
    .strokeColor(RULE)
    .lineWidth(0.5)
    .moveTo(left, pageHeight - 44)
    .lineTo(right, pageHeight - 44)
    .stroke();
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(MUTED)
    .text("allthingsxrpl.com", left, pageHeight - 36, { lineBreak: false });
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(MUTED)
    .text(`Page ${pageNum - 1}`, 0, pageHeight - 36, {
      align: "right",
      width: right,
      lineBreak: false,
    });
  doc.restore();
  doc.y = savedY;
  doc.x = savedX;
  inChrome = false;
}

doc.on("pageAdded", drawPageChrome);
drawPageChrome();

// ---------- COVER ----------
doc.save();
doc.rect(0, 0, pageWidth, pageHeight).fill(BRAND_BLUE);
// accent bar
doc.rect(0, 0, 8, pageHeight).fill(ACCENT);
doc.restore();

if (fs.existsSync(logoPath)) {
  doc.image(logoPath, left, 110, { width: 90, height: 90 });
}

doc
  .font("Helvetica-Bold")
  .fontSize(12)
  .fillColor("#cfe6ff")
  .text("ALL THINGS XRPL", left, 220, { characterSpacing: 2 });

doc
  .font("Helvetica-Bold")
  .fontSize(36)
  .fillColor("#ffffff")
  .text("XRPL DeFi", left, 250, { lineGap: 4 })
  .text("Starter Kit", left);

doc
  .font("Helvetica")
  .fontSize(14)
  .fillColor("#cfe6ff")
  .text(
    "The dApps to try first, the safety checks that protect your funds, " +
      "and step-by-step setup for Xaman and Crossmark.",
    left,
    370,
    { width: contentWidth - 40, lineGap: 4 }
  );

// Cover footer block
doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor("#ffffff")
  .text("What's inside", left, pageHeight - 200, { characterSpacing: 1 });

const coverItems = [
  "1.  Which XRPL dApps to try first",
  "2.  Trustline + AMM safety checklist",
  "3.  Xaman setup (mobile)",
  "4.  Crossmark setup (desktop)",
  "5.  The five-link emergency kit",
  "6.  What to read next",
];
doc.font("Helvetica").fontSize(11).fillColor("#e6f1ff");
let y = pageHeight - 180;
for (const item of coverItems) {
  doc.text(item, left, y, { width: contentWidth - 40 });
  y += 18;
}

doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor("#9ec5f0")
  .text("allthingsxrpl.com", left, pageHeight - 50, { lineBreak: false });

// ---------- BODY ----------
doc.addPage();
doc.fillColor(TEXT);
doc.y = 80;

function ensureSpace(needed) {
  if (doc.y + needed > pageHeight - 70) {
    doc.addPage();
  }
}

function h1(text) {
  ensureSpace(60);
  doc
    .moveDown(0.5)
    .font("Helvetica-Bold")
    .fontSize(20)
    .fillColor(BRAND_BLUE)
    .text(text, { width: contentWidth });
  doc
    .strokeColor(ACCENT)
    .lineWidth(2)
    .moveTo(left, doc.y + 4)
    .lineTo(left + 40, doc.y + 4)
    .stroke();
  doc.moveDown(1);
  doc.fillColor(TEXT);
}

function h2(text) {
  ensureSpace(40);
  doc
    .moveDown(0.6)
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor(BRAND_BLUE)
    .text(text, { width: contentWidth });
  doc.moveDown(0.4);
  doc.fillColor(TEXT);
}

function paragraph(text) {
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(TEXT)
    .text(text, { width: contentWidth, lineGap: 3, align: "left" });
  doc.moveDown(0.6);
}

function paragraphRich(parts) {
  // parts: array of { text, link?, bold? }
  doc.font("Helvetica").fontSize(11).fillColor(TEXT);
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const isLast = i === parts.length - 1;
    const opts = { lineGap: 3, continued: !isLast };
    if (p.link) {
      doc.fillColor(ACCENT).font("Helvetica");
      doc.text(p.text, { ...opts, link: p.link, underline: true });
      doc.fillColor(TEXT);
    } else if (p.bold) {
      doc.font("Helvetica-Bold").text(p.text, opts);
      doc.font("Helvetica");
    } else {
      doc.text(p.text, opts);
    }
  }
  doc.moveDown(0.6);
}

function checklistItem(text) {
  ensureSpace(28);
  const startY = doc.y;
  // checkbox
  doc
    .strokeColor(BRAND_BLUE)
    .lineWidth(1)
    .rect(left, startY + 3, 10, 10)
    .stroke();
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(TEXT)
    .text(text, left + 20, startY, {
      width: contentWidth - 20,
      lineGap: 3,
    });
  doc.moveDown(0.3);
}

function numberedStep(n, text) {
  ensureSpace(24);
  const startY = doc.y;
  doc
    .circle(left + 8, startY + 8, 9)
    .fillAndStroke(BRAND_BLUE, BRAND_BLUE);
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#ffffff")
    .text(String(n), left, startY + 4, {
      width: 16,
      align: "center",
      lineBreak: false,
    });
  doc.fillColor(TEXT);
  doc
    .font("Helvetica")
    .fontSize(11)
    .text(text, left + 24, startY, {
      width: contentWidth - 24,
      lineGap: 3,
    });
  doc.moveDown(0.4);
}

function calloutBox(title, body) {
  ensureSpace(70);
  const startY = doc.y;
  const padding = 12;
  // measure
  doc.font("Helvetica-Bold").fontSize(11);
  const titleH = doc.heightOfString(title, { width: contentWidth - padding * 2 });
  doc.font("Helvetica").fontSize(10.5);
  const bodyH = doc.heightOfString(body, {
    width: contentWidth - padding * 2,
    lineGap: 3,
  });
  const boxH = titleH + bodyH + padding * 2 + 6;
  doc.save();
  doc.roundedRect(left, startY, contentWidth, boxH, 6).fill(BG_SOFT);
  doc
    .strokeColor(ACCENT)
    .lineWidth(3)
    .moveTo(left, startY)
    .lineTo(left, startY + boxH)
    .stroke();
  doc.restore();
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(BRAND_BLUE)
    .text(title, left + padding, startY + padding, {
      width: contentWidth - padding * 2,
    });
  doc
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor(TEXT)
    .text(body, left + padding, doc.y + 2, {
      width: contentWidth - padding * 2,
      lineGap: 3,
    });
  doc.y = startY + boxH + 10;
}

function table(headers, rows, colWidths) {
  ensureSpace(60);
  const rowPad = 6;
  const startX = left;
  let y = doc.y;
  // header
  doc.save();
  doc.rect(startX, y, contentWidth, 22).fill(BRAND_BLUE);
  doc.restore();
  doc.font("Helvetica-Bold").fontSize(10).fillColor("#ffffff");
  let x = startX;
  for (let i = 0; i < headers.length; i++) {
    doc.text(headers[i], x + rowPad, y + 6, {
      width: colWidths[i] - rowPad * 2,
      lineBreak: false,
    });
    x += colWidths[i];
  }
  y += 22;
  doc.fillColor(TEXT).font("Helvetica").fontSize(9.5);
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    // measure tallest cell
    let cellH = 0;
    for (let i = 0; i < row.length; i++) {
      const h = doc.heightOfString(row[i], {
        width: colWidths[i] - rowPad * 2,
        lineGap: 2,
      });
      if (h > cellH) cellH = h;
    }
    const rowH = cellH + rowPad * 2;
    if (y + rowH > pageHeight - 70) {
      doc.addPage();
      y = doc.y;
    }
    if (r % 2 === 1) {
      doc.save();
      doc.rect(startX, y, contentWidth, rowH).fill(BG_SOFT);
      doc.restore();
    }
    let cx = startX;
    doc.fillColor(TEXT).font("Helvetica").fontSize(9.5);
    for (let i = 0; i < row.length; i++) {
      doc.text(row[i], cx + rowPad, y + rowPad, {
        width: colWidths[i] - rowPad * 2,
        lineGap: 2,
      });
      cx += colWidths[i];
    }
    // bottom rule
    doc
      .strokeColor(RULE)
      .lineWidth(0.5)
      .moveTo(startX, y + rowH)
      .lineTo(startX + contentWidth, y + rowH)
      .stroke();
    y += rowH;
  }
  doc.y = y + 10;
}

function bulletLink(label, url) {
  ensureSpace(20);
  const startY = doc.y;
  doc
    .circle(left + 3, startY + 6, 2)
    .fill(BRAND_BLUE);
  doc.fillColor(TEXT).font("Helvetica").fontSize(11);
  doc.text(label + " — ", left + 14, startY, { continued: true, lineGap: 3 });
  doc
    .fillColor(ACCENT)
    .text(url, { link: url, underline: true, lineGap: 3 });
  doc.fillColor(TEXT);
  doc.moveDown(0.2);
}

// Intro
paragraph(
  "Welcome to DeFi on the XRP Ledger. This kit walks you through the dApps " +
    "worth trying first, the safety checks that protect your funds before you " +
    "touch an AMM or trustline, and exactly how to set up the two wallets you " +
    "will actually use day-to-day: Xaman and Crossmark."
);
paragraph(
  "Print it, screenshot it, or keep it open in a tab — every link in this PDF " +
    "is clickable on mobile and desktop."
);

// 1
h1("1. Which XRPL dApps to try first");
paragraph(
  "The XRPL has a small, focused DeFi ecosystem. You do not need to learn " +
    "twenty protocols. Start with these five — in this order — and you will " +
    "have used the AMM, the DEX, an NFT marketplace and an on-chain lending " +
    "market in under an afternoon."
);

table(
  ["#", "dApp", "What it is", "Try this first"],
  [
    ["1", "XPMarket", "Token launchpad + AMM dashboard", "Swap 1 XRP for any listed token, watch the AMM fill"],
    ["2", "Sologenic DEX", "Native XRPL order-book DEX (no AMM)", "Place a limit order for a small amount of USD-issued IOU"],
    ["3", "XRP.Cafe", "The largest XRPL NFT marketplace", "Browse a free mint, sweep one floor NFT under 5 XRP"],
    ["4", "Magnetic X", "XRPL lending + perps (EVM sidechain)", "Bridge 5 XRP to the sidechain, deposit into a lending pool"],
    ["5", "First Ledger", "Memecoin / new-token launch tracker", "Filter by 24h volume, check liquidity before any buy"],
  ],
  [28, 90, 175, contentWidth - 28 - 90 - 175]
);

paragraphRich([
  { text: "Full deep-dives, screenshots and current rankings: " },
  { text: "allthingsxrpl.com/dapps", link: "https://allthingsxrpl.com/dapps" },
]);

calloutBox(
  "Rule of thumb",
  "If a dApp asks you to import your seed phrase into a website, close the tab. " +
    "Real XRPL dApps connect through Xaman or Crossmark — they never see your secret."
);

// 2
h1("2. Trustline + AMM safety checklist");
paragraph(
  "Most money lost on XRPL DeFi is not lost to “hacks.” It is lost to " +
    "trustlines opened on scam tokens and AMMs joined without checking the " +
    "two sides of the pool. Run through this list every single time before " +
    "you sign."
);

h2("Before you set a trustline");
[
  "The issuer address matches the official one on the project's website (copy-paste, never type).",
  "The token has a verified entry on Bithomp or XRPSCAN — not just a logo and a Telegram link.",
  "You have set a sensible limit on the trustline (e.g. 10,000), not the default “no limit.” A no-limit trustline lets a malicious issuer mint unlimited tokens into your wallet.",
  "You understand the transfer fee the issuer has set. Anything above 1% is unusual for a real project.",
  "You are okay reserving 2 XRP per trustline (this is locked, not spent — you get it back when you remove the trustline).",
].forEach(checklistItem);

h2("Before you deposit into an AMM");
[
  "Both sides of the pool have real, traded liquidity — not just a single LP holding 99% of the shares.",
  "You have read the current spread and the 24h volume. A pool with $0 daily volume earns no fees, no matter what the APR widget says.",
  "You understand impermanent loss: if the price ratio changes, you will end up with more of the losing asset and less of the winning one. You only break even if both prices recover.",
  "You are depositing an amount you can leave in for at least 30 days. AMM LP positions on XRPL have a small unbonding cost.",
  "You have never clicked an “auto-compound” or “boost APR” contract. The native XRPL AMM has no such feature — those links are scams.",
].forEach(checklistItem);

h2("After you sign");
[
  "Open Bithomp, paste your address, and confirm the trustline / AMM deposit shows up exactly as you expected.",
  "If anything looks wrong — wrong issuer, wrong amount, unfamiliar token — remove the trustline immediately. You can always re-add it.",
].forEach(checklistItem);

// 3
h1("3. Xaman setup (mobile, free, the daily driver)");
paragraph(
  "Xaman is built by XRPL Labs (the same team that runs an XRPL validator). " +
    "It is the wallet most XRPL dApps connect to by default."
);

const xamanSteps = [
  "Install Xaman from the App Store or Google Play. Confirm the developer is XRPL Labs B.V. before you tap install.",
  "Open the app and choose Create a new account.",
  "Choose Full access (you control the secret) — not “Read only.”",
  "Choose the Secret Numbers option, not the 24-word mnemonic. Secret Numbers are XRPL-native and easier to back up on paper.",
  "Write your 8 rows of secret numbers on paper, in order. Store the paper somewhere fire-safe. Do not photograph it. Do not type it into anything that is not Xaman.",
  "Send your first 10 XRP from an exchange to fund the account. The XRPL requires a 1 XRP base reserve, so send at least 2 XRP or the transaction will fail.",
  "In Settings > Security, turn on Face ID / fingerprint and set a 6-digit PIN.",
  "To use a dApp: open the dApp in your phone browser, tap “Connect Xaman,” and approve the sign request inside the Xaman app. You will never paste your secret into the dApp.",
];
xamanSteps.forEach((s, i) => numberedStep(i + 1, s));

calloutBox(
  "Optional but recommended",
  "Pair Xaman with a Tangem card or Ledger so the secret never lives on your " +
    "phone at all. Settings > Accounts > Add account > Import from hardware."
);

// 4
h1("4. Crossmark setup (desktop, free, for browser dApps)");
paragraph(
  "Crossmark is the “MetaMask of XRPL.” It lives in your browser as an " +
    "extension, which makes it the easiest way to use XRPL dApps from a laptop."
);

const crossmarkSteps = [
  "Go to crossmark.io directly (do not search — fake extensions exist). Click Install for Chrome / Brave / Edge.",
  "Verify the extension publisher is Crossmark before you add it.",
  "Open the extension and choose Create new wallet.",
  "Write the 24-word seed phrase on paper. Store it physically, not in a password manager, and never on a cloud drive.",
  "Set a strong extension password — this only unlocks the extension on your machine, it does not protect you if your seed leaks.",
  "Fund the account with 2+ XRP from an exchange so it meets the base reserve.",
  "To use a dApp: open the dApp site, click “Connect Crossmark,” and approve from the extension popup. Always read the transaction payload — token, amount, destination — before you sign.",
  "Pin the extension to your toolbar so you can spot a fake pop-up. Real Crossmark prompts always come from the pinned icon.",
];
crossmarkSteps.forEach((s, i) => numberedStep(i + 1, s));

calloutBox(
  "Tip",
  "Keep a separate Crossmark profile for “DeFi experiments” with a small " +
    "balance, and a Xaman + hardware wallet setup for long-term holdings. " +
    "Never connect your main wallet to a brand-new dApp."
);

// 5
h1("5. The five-link emergency kit");
paragraph("Bookmark these. If anything looks wrong, one of them will tell you why.");
bulletLink("Block explorer", "https://bithomp.com");
bulletLink("Alternative explorer", "https://xrpscan.com");
bulletLink("Trustline / token verification", "https://xrpl.services");
bulletLink("Official XRPL docs", "https://xrpl.org");
bulletLink("Our live dApp rankings", "https://allthingsxrpl.com/dapps");

// 6
h1("6. What to read next");
bulletLink("Best XRPL DeFi dApps in 2026", "https://allthingsxrpl.com/dapps");
bulletLink("Best wallets for XRPL DeFi", "https://allthingsxrpl.com/best-for/defi");
bulletLink("Xaman full review", "https://allthingsxrpl.com/wallet/xaman");
bulletLink("Crossmark full review", "https://allthingsxrpl.com/wallet/crossmark");
bulletLink("AMM safety deep-dive", "https://allthingsxrpl.com/blog");

doc.moveDown(1.2);
ensureSpace(80);
doc
  .strokeColor(RULE)
  .lineWidth(0.5)
  .moveTo(left, doc.y)
  .lineTo(right, doc.y)
  .stroke();
doc.moveDown(0.8);
paragraph(
  "You are on our list. We send one short email a week with new XRPL DeFi " +
    "launches we have personally tested, plus any urgent security alerts."
);
doc
  .font("Helvetica-Oblique")
  .fontSize(11)
  .fillColor(MUTED)
  .text("— The All Things XRPL editorial team", { width: contentWidth });

doc.end();
console.log("Wrote", outPath);

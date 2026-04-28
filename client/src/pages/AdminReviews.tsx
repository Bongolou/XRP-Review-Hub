import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowDown, ArrowUp, Eye, EyeOff, Star, Trash2, ShieldCheck, LogOut, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductReview } from "@shared/schema";

const TOKEN_STORAGE_KEY = "atxrpl-admin-token";

interface AdminReviewsResponse {
  reviews: ProductReview[];
}

interface ReviewTargetSummaryRow {
  targetKind: string;
  targetSlug: string;
  total: number;
  hidden: number;
  average: number | null;
}

interface AdminReviewsSummaryResponse {
  summary: ReviewTargetSummaryRow[];
}

type SummarySortKey = "targetKind" | "targetSlug" | "total" | "hidden" | "average";
type SummarySortDir = "asc" | "desc";

function formatDate(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StarRow({ value }: { value: number }) {
  return (
    <div className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < value ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}

async function adminFetch(token: string, url: string, init?: RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError("Please paste the admin token.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await adminFetch(token.trim(), "/api/admin/reviews?limit=1");
      onLogin(token.trim());
    } catch (err) {
      const msg = (err as Error).message;
      if (msg.startsWith("401")) {
        setError("That token isn't valid. Double-check and try again.");
      } else if (msg.startsWith("503")) {
        setError("The admin token isn't configured on the server yet.");
      } else {
        setError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 space-y-5"
        data-testid="form-admin-login"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold font-display">Review moderation</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Editors only. Paste the admin token to manage visitor-submitted reviews.
        </p>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Admin token"
          autoComplete="current-password"
          data-testid="input-admin-token"
          className="w-full h-12 px-4 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-muted-foreground/70"
        />
        {error && (
          <div className="text-sm text-red-400" data-testid="text-admin-login-error">
            {error}
          </div>
        )}
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary hover:bg-primary/90"
          data-testid="button-admin-login"
        >
          {submitting ? "Checking…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

interface SummaryTableProps {
  rows: ReviewTargetSummaryRow[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  sortKey: SummarySortKey;
  sortDir: SummarySortDir;
  onSort: (key: SummarySortKey) => void;
  activeTarget: { kind: string; slug: string } | null;
  onSelectTarget: (row: ReviewTargetSummaryRow) => void;
}

function SortHeader({
  label,
  sortKey,
  activeKey,
  dir,
  onSort,
  align = "left",
  testId,
}: {
  label: string;
  sortKey: SummarySortKey;
  activeKey: SummarySortKey;
  dir: SummarySortDir;
  onSort: (key: SummarySortKey) => void;
  align?: "left" | "right";
  testId: string;
}) {
  const active = sortKey === activeKey;
  return (
    <th
      className={`px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        data-testid={testId}
        className={`inline-flex items-center gap-1 hover:text-white ${
          active ? "text-white" : ""
        } ${align === "right" ? "ml-auto" : ""}`}
      >
        <span>{label}</span>
        {active &&
          (dir === "asc" ? (
            <ArrowUp className="h-3.5 w-3.5" />
          ) : (
            <ArrowDown className="h-3.5 w-3.5" />
          ))}
      </button>
    </th>
  );
}

function SummaryTable({
  rows,
  isLoading,
  isFetching,
  error,
  sortKey,
  sortDir,
  onSort,
  activeTarget,
  onSelectTarget,
}: SummaryTableProps) {
  return (
    <div
      className="mb-6 rounded-xl border border-white/10 bg-card/30 overflow-hidden"
      data-testid="section-admin-summary"
    >
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold">Traffic by review page</h2>
          <p className="text-xs text-muted-foreground">
            Click a row to filter the reviews below to that wallet or exchange.
          </p>
        </div>
        {isFetching && !isLoading && (
          <span className="text-xs text-muted-foreground" data-testid="text-summary-refreshing">
            Refreshing…
          </span>
        )}
      </div>
      {error && (
        <div
          className="px-4 py-3 text-sm text-red-400"
          data-testid="text-admin-summary-error"
        >
          Failed to load summary: {error.message}
        </div>
      )}
      {isLoading ? (
        <div className="px-4 py-6 text-sm text-muted-foreground" data-testid="text-summary-loading">
          Loading summary…
        </div>
      ) : rows.length === 0 ? (
        <div className="px-4 py-6 text-sm text-muted-foreground" data-testid="text-summary-empty">
          No reviews yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-testid="table-admin-summary">
            <thead className="bg-white/5">
              <tr>
                <SortHeader
                  label="Kind"
                  sortKey="targetKind"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={onSort}
                  testId="button-sort-kind"
                />
                <SortHeader
                  label="Slug"
                  sortKey="targetSlug"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={onSort}
                  testId="button-sort-slug"
                />
                <SortHeader
                  label="Total"
                  sortKey="total"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={onSort}
                  align="right"
                  testId="button-sort-total"
                />
                <SortHeader
                  label="Hidden"
                  sortKey="hidden"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={onSort}
                  align="right"
                  testId="button-sort-hidden"
                />
                <SortHeader
                  label="Avg rating"
                  sortKey="average"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={onSort}
                  align="right"
                  testId="button-sort-average"
                />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isActive =
                  !!activeTarget &&
                  activeTarget.kind === row.targetKind &&
                  activeTarget.slug === row.targetSlug;
                return (
                  <tr
                    key={`${row.targetKind}/${row.targetSlug}`}
                    onClick={() => onSelectTarget(row)}
                    data-testid={`row-summary-${row.targetKind}-${row.targetSlug}`}
                    className={`cursor-pointer border-t border-white/5 hover:bg-white/5 ${
                      isActive ? "bg-primary/10" : ""
                    }`}
                  >
                    <td className="px-3 py-2 text-xs uppercase tracking-wide text-muted-foreground">
                      {row.targetKind}
                    </td>
                    <td className="px-3 py-2 font-medium">{row.targetSlug}</td>
                    <td
                      className="px-3 py-2 text-right tabular-nums"
                      data-testid={`text-summary-total-${row.targetKind}-${row.targetSlug}`}
                    >
                      {row.total}
                    </td>
                    <td
                      className={`px-3 py-2 text-right tabular-nums ${
                        row.hidden > 0 ? "text-red-300" : "text-muted-foreground"
                      }`}
                      data-testid={`text-summary-hidden-${row.targetKind}-${row.targetSlug}`}
                    >
                      {row.hidden}
                    </td>
                    <td
                      className="px-3 py-2 text-right tabular-nums"
                      data-testid={`text-summary-average-${row.targetKind}-${row.targetSlug}`}
                    >
                      {row.average === null ? "—" : row.average.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ReviewsTable({ token, onLogout }: { token: string; onLogout: () => void }) {
  const queryClient = useQueryClient();
  const queryKey = ["/api/admin/reviews"];
  const summaryQueryKey = ["/api/admin/reviews/summary"];
  const [filter, setFilter] = useState<"all" | "visible" | "hidden">("all");
  const [targetFilter, setTargetFilter] = useState<{ kind: string; slug: string } | null>(null);
  const [sortKey, setSortKey] = useState<SummarySortKey>("total");
  const [sortDir, setSortDir] = useState<SummarySortDir>("desc");
  const [actionError, setActionError] = useState<string | null>(null);

  const { data, isLoading, isFetching, refetch, error } = useQuery<AdminReviewsResponse>({
    queryKey,
    queryFn: () => adminFetch(token, "/api/admin/reviews?limit=200"),
  });

  const summaryQuery = useQuery<AdminReviewsSummaryResponse>({
    queryKey: summaryQueryKey,
    queryFn: () => adminFetch(token, "/api/admin/reviews/summary"),
  });

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey });
    queryClient.invalidateQueries({ queryKey: summaryQueryKey });
  };

  const hideMutation = useMutation({
    mutationFn: (id: number) =>
      adminFetch(token, `/api/admin/reviews/${id}/hide`, { method: "POST" }),
    onSuccess: invalidateAll,
    onError: (err: Error) => setActionError(err.message),
  });

  const unhideMutation = useMutation({
    mutationFn: (id: number) =>
      adminFetch(token, `/api/admin/reviews/${id}/unhide`, { method: "POST" }),
    onSuccess: invalidateAll,
    onError: (err: Error) => setActionError(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      adminFetch(token, `/api/admin/reviews/${id}`, { method: "DELETE" }),
    onSuccess: invalidateAll,
    onError: (err: Error) => setActionError(err.message),
  });

  const reviews = useMemo(() => {
    let all = data?.reviews ?? [];
    if (targetFilter) {
      all = all.filter(
        (r) => r.targetKind === targetFilter.kind && r.targetSlug === targetFilter.slug,
      );
    }
    if (filter === "visible") return all.filter((r) => !r.hiddenAt);
    if (filter === "hidden") return all.filter((r) => r.hiddenAt);
    return all;
  }, [data?.reviews, filter, targetFilter]);

  const totals = useMemo(() => {
    const all = data?.reviews ?? [];
    return {
      total: all.length,
      visible: all.filter((r) => !r.hiddenAt).length,
      hidden: all.filter((r) => r.hiddenAt).length,
    };
  }, [data?.reviews]);

  const sortedSummary = useMemo(() => {
    const rows = [...(summaryQuery.data?.summary ?? [])];
    rows.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "targetKind") {
        cmp = a.targetKind.localeCompare(b.targetKind);
        if (cmp === 0) cmp = a.targetSlug.localeCompare(b.targetSlug);
      } else if (sortKey === "targetSlug") {
        cmp = a.targetSlug.localeCompare(b.targetSlug);
      } else if (sortKey === "total") {
        cmp = a.total - b.total;
      } else if (sortKey === "hidden") {
        cmp = a.hidden - b.hidden;
      } else if (sortKey === "average") {
        const av = a.average ?? -1;
        const bv = b.average ?? -1;
        cmp = av - bv;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [summaryQuery.data?.summary, sortKey, sortDir]);

  const toggleSort = (key: SummarySortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "targetKind" || key === "targetSlug" ? "asc" : "desc");
    }
  };

  const targetHref = (r: ProductReview) =>
    r.targetKind === "wallet" ? `/wallet/${r.targetSlug}` : `/exchange/${r.targetSlug}`;

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display">Visitor review moderation</h1>
              <p className="text-sm text-muted-foreground">
                Hide or delete reviews. Hidden reviews are excluded from public lists and the aggregate rating.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                refetch();
                summaryQuery.refetch();
              }}
              data-testid="button-admin-refresh"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isFetching || summaryQuery.isFetching ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={onLogout} data-testid="button-admin-logout">
              <LogOut className="h-4 w-4 mr-1" />
              Sign out
            </Button>
          </div>
        </div>

        <SummaryTable
          rows={sortedSummary}
          isLoading={summaryQuery.isLoading}
          isFetching={summaryQuery.isFetching}
          error={summaryQuery.error as Error | null}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={toggleSort}
          activeTarget={targetFilter}
          onSelectTarget={(row) => {
            if (
              targetFilter &&
              targetFilter.kind === row.targetKind &&
              targetFilter.slug === row.targetSlug
            ) {
              setTargetFilter(null);
            } else {
              setTargetFilter({ kind: row.targetKind, slug: row.targetSlug });
            }
          }}
        />

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {([
            ["all", `All (${totals.total})`],
            ["visible", `Visible (${totals.visible})`],
            ["hidden", `Hidden (${totals.hidden})`],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              data-testid={`button-filter-${value}`}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                filter === value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card/30 border-white/10 hover:border-primary/50"
              }`}
            >
              {label}
            </button>
          ))}
          {targetFilter && (
            <button
              onClick={() => setTargetFilter(null)}
              data-testid="button-clear-target-filter"
              className="px-3 py-1.5 rounded-full text-sm border bg-primary/10 border-primary/40 text-primary hover:bg-primary/20 inline-flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" />
              {targetFilter.kind}/{targetFilter.slug}
            </button>
          )}
        </div>

        {actionError && (
          <div className="mb-4 text-sm text-red-400" data-testid="text-admin-action-error">
            {actionError}
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-400" data-testid="text-admin-load-error">
            Failed to load reviews: {(error as Error).message}
          </div>
        )}

        {isLoading ? (
          <div className="text-muted-foreground" data-testid="text-admin-loading">Loading reviews…</div>
        ) : reviews.length === 0 ? (
          <div className="text-muted-foreground" data-testid="text-admin-empty">No reviews to show in this view.</div>
        ) : (
          <div className="space-y-3" data-testid="list-admin-reviews">
            {reviews.map((r) => {
              const hidden = Boolean(r.hiddenAt);
              return (
                <div
                  key={r.id}
                  className={`p-4 rounded-xl border ${hidden ? "bg-red-500/5 border-red-500/30" : "bg-card/30 border-white/10"}`}
                  data-testid={`admin-review-row-${r.id}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs uppercase tracking-wide text-muted-foreground">
                          {r.targetKind}
                        </span>
                        <Link
                          href={targetHref(r)}
                          className="text-sm font-medium text-primary hover:underline"
                          data-testid={`link-admin-target-${r.id}`}
                        >
                          {r.targetSlug}
                        </Link>
                        {hidden && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30"
                            data-testid={`badge-hidden-${r.id}`}
                          >
                            Hidden
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium" data-testid={`text-admin-author-${r.id}`}>
                          {r.authorName}
                        </span>
                        <StarRow value={r.rating} />
                        <span className="text-xs text-muted-foreground">
                          · {formatDate(r.createdAt)}
                        </span>
                      </div>
                      <p
                        className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed"
                        data-testid={`text-admin-body-${r.id}`}
                      >
                        {r.body}
                      </p>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 md:w-32">
                      {hidden ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setActionError(null);
                            unhideMutation.mutate(r.id);
                          }}
                          disabled={unhideMutation.isPending}
                          data-testid={`button-unhide-${r.id}`}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Restore
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setActionError(null);
                            hideMutation.mutate(r.id);
                          }}
                          disabled={hideMutation.isPending}
                          data-testid={`button-hide-${r.id}`}
                        >
                          <EyeOff className="h-4 w-4 mr-1" />
                          Hide
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (!confirm("Delete this review permanently? This cannot be undone.")) return;
                          setActionError(null);
                          deleteMutation.mutate(r.id);
                        }}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${r.id}`}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminReviews() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(TOKEN_STORAGE_KEY);
      if (stored) setToken(stored);
    } catch {
      // ignore
    }
  }, []);

  const handleLogin = (t: string) => {
    try {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, t);
    } catch {
      // ignore
    }
    setToken(t);
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      // ignore
    }
    setToken(null);
  };

  if (!token) return <LoginForm onLogin={handleLogin} />;
  return <ReviewsTable token={token} onLogout={handleLogout} />;
}

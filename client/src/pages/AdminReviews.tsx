import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Eye, EyeOff, Star, Trash2, ShieldCheck, LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductReview } from "@shared/schema";

const TOKEN_STORAGE_KEY = "atxrpl-admin-token";

interface AdminReviewsResponse {
  reviews: ProductReview[];
}

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

function ReviewsTable({ token, onLogout }: { token: string; onLogout: () => void }) {
  const queryClient = useQueryClient();
  const queryKey = ["/api/admin/reviews"];
  const [filter, setFilter] = useState<"all" | "visible" | "hidden">("all");
  const [actionError, setActionError] = useState<string | null>(null);

  const { data, isLoading, isFetching, refetch, error } = useQuery<AdminReviewsResponse>({
    queryKey,
    queryFn: () => adminFetch(token, "/api/admin/reviews?limit=200"),
  });

  const hideMutation = useMutation({
    mutationFn: (id: number) =>
      adminFetch(token, `/api/admin/reviews/${id}/hide`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (err: Error) => setActionError(err.message),
  });

  const unhideMutation = useMutation({
    mutationFn: (id: number) =>
      adminFetch(token, `/api/admin/reviews/${id}/unhide`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (err: Error) => setActionError(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      adminFetch(token, `/api/admin/reviews/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (err: Error) => setActionError(err.message),
  });

  const reviews = useMemo(() => {
    const all = data?.reviews ?? [];
    if (filter === "visible") return all.filter((r) => !r.hiddenAt);
    if (filter === "hidden") return all.filter((r) => r.hiddenAt);
    return all;
  }, [data?.reviews, filter]);

  const totals = useMemo(() => {
    const all = data?.reviews ?? [];
    return {
      total: all.length,
      visible: all.filter((r) => !r.hiddenAt).length,
      hidden: all.filter((r) => r.hiddenAt).length,
    };
  }, [data?.reviews]);

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
              onClick={() => refetch()}
              data-testid="button-admin-refresh"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isFetching ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={onLogout} data-testid="button-admin-logout">
              <LogOut className="h-4 w-4 mr-1" />
              Sign out
            </Button>
          </div>
        </div>

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

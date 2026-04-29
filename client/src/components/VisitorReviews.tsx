import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Star, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { ProductReview } from "@shared/schema";

export interface ReviewsResponse {
  reviews: ProductReview[];
  count: number;
  average: number | null;
}

interface VisitorReviewsProps {
  targetKind: "wallet" | "exchange";
  targetSlug: string;
  targetName: string;
}

function formatDate(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in values ? String(values[key]) : `{${key}}`,
  );
}

function StarRow({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="inline-flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < value ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}

export function VisitorReviews({ targetKind, targetSlug, targetName }: VisitorReviewsProps) {
  const { t } = useLanguage();
  const queryKey = ["/api/reviews", targetKind, targetSlug];
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<ReviewsResponse>({ queryKey });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [body, setBody] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    rating?: string;
    name?: string;
    body?: string;
  }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/reviews", {
        targetKind,
        targetSlug,
        authorName: authorName.trim(),
        rating,
        body: body.trim(),
      });
      return res.json();
    },
    onSuccess: () => {
      setSuccessMessage(t("reviews.successPosted"));
      setErrorMessage(null);
      setFieldErrors({});
      setRating(0);
      setHoverRating(0);
      setAuthorName("");
      setBody("");
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (err: Error) => {
      const msg = err.message.includes(":") ? err.message.split(":").slice(1).join(":").trim() : err.message;
      try {
        const parsed = JSON.parse(msg);
        setErrorMessage(parsed.error ?? t("reviews.errorGeneric"));
      } catch {
        setErrorMessage(msg || t("reviews.errorGeneric"));
      }
      setSuccessMessage(null);
    },
  });

  const reviews = data?.reviews ?? [];
  const count = data?.count ?? 0;
  const average = data?.average ?? null;
  const averageRounded = useMemo(
    () => (average === null ? null : Math.round(average * 10) / 10),
    [average],
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    const nextErrors: { rating?: string; name?: string; body?: string } = {};
    if (rating < 1 || rating > 5) {
      nextErrors.rating = t("reviews.errorRating");
    }
    if (authorName.trim().length < 2) {
      nextErrors.name = t("reviews.errorName");
    }
    if (body.trim().length < 20) {
      nextErrors.body = t("reviews.errorBody");
    }
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    mutation.mutate();
  };

  const basedOnTemplate = count === 1 ? t("reviews.basedOn.one") : t("reviews.basedOn.other");

  return (
    <div
      className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 mb-8"
      data-testid={`section-visitor-reviews-${targetSlug}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold font-display">{t("reviews.heading")}</h2>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {count > 0 && averageRounded !== null ? (
          <div className="flex items-center gap-3" data-testid={`text-visitor-rating-summary-${targetSlug}`}>
            <span className="text-3xl font-bold">{averageRounded.toFixed(1)}</span>
            <div>
              <StarRow value={Math.round(averageRounded)} />
              <div className="text-sm text-muted-foreground">
                {fillTemplate(basedOnTemplate, { count })}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground" data-testid={`text-visitor-rating-empty-${targetSlug}`}>
            {fillTemplate(t("reviews.empty"), { name: targetName })}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-muted-foreground mb-8">{t("reviews.loading")}</div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4 mb-10">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="p-4 rounded-xl bg-background/40 border border-white/10"
              data-testid={`review-item-${r.id}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-primary/20 p-2 rounded-full flex-shrink-0">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium truncate" data-testid={`text-review-author-${r.id}`}>
                      {r.authorName}
                    </div>
                    <div className="text-xs text-muted-foreground">{formatDate(r.createdAt)}</div>
                  </div>
                </div>
                <div data-testid={`text-review-rating-${r.id}`}>
                  <StarRow value={r.rating} />
                </div>
              </div>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed" data-testid={`text-review-body-${r.id}`}>
                {r.body}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4" data-testid={`form-review-${targetSlug}`}>
        <h3 className="font-bold text-lg">{t("reviews.formHeading")}</h3>

        <div>
          <label className="block text-sm text-muted-foreground mb-2">{t("reviews.yourRating")}</label>
          <div
            className={`flex items-center gap-1 rounded-lg ${
              fieldErrors.rating
                ? "border border-red-500 ring-1 ring-red-500 px-2 py-1 -mx-2 -my-1"
                : ""
            }`}
            data-testid={`rating-picker-${targetSlug}`}
            aria-invalid={fieldErrors.rating ? true : undefined}
            aria-describedby={fieldErrors.rating ? `error-review-rating-${targetSlug}` : undefined}
          >
            {[1, 2, 3, 4, 5].map((value) => {
              const active = (hoverRating || rating) >= value;
              const ariaLabel =
                value === 1 ? t("reviews.rateOne") : fillTemplate(t("reviews.rateMany"), { n: value });
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setRating(value);
                    if (fieldErrors.rating) {
                      setFieldErrors((prev) => ({ ...prev, rating: undefined }));
                    }
                  }}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={ariaLabel}
                  className="p-1 rounded hover:bg-white/5 transition-colors"
                  data-testid={`button-rating-${value}`}
                >
                  <Star
                    className={`h-7 w-7 ${active ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/40"}`}
                  />
                </button>
              );
            })}
          </div>
          {fieldErrors.rating && (
            <div
              id={`error-review-rating-${targetSlug}`}
              className="mt-2 text-sm text-red-400"
              data-testid={`error-review-rating-${targetSlug}`}
            >
              {fieldErrors.rating}
            </div>
          )}
        </div>

        <div>
          <input
            type="text"
            value={authorName}
            onChange={(e) => {
              setAuthorName(e.target.value);
              if (fieldErrors.name) {
                setFieldErrors((prev) => ({ ...prev, name: undefined }));
              }
            }}
            placeholder={t("reviews.namePlaceholder")}
            maxLength={60}
            data-testid={`input-review-name-${targetSlug}`}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? `error-review-name-${targetSlug}` : undefined}
            className={`w-full h-12 px-4 rounded-lg bg-background/50 border outline-none text-white placeholder:text-muted-foreground/70 ${
              fieldErrors.name
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
            }`}
          />
          {fieldErrors.name && (
            <div
              id={`error-review-name-${targetSlug}`}
              className="mt-2 text-sm text-red-400"
              data-testid={`error-review-name-${targetSlug}`}
            >
              {fieldErrors.name}
            </div>
          )}
        </div>

        <div>
          <textarea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              if (fieldErrors.body) {
                setFieldErrors((prev) => ({ ...prev, body: undefined }));
              }
            }}
            placeholder={fillTemplate(t("reviews.bodyPlaceholder"), { name: targetName })}
            rows={4}
            maxLength={1000}
            data-testid={`input-review-body-${targetSlug}`}
            aria-invalid={fieldErrors.body ? true : undefined}
            aria-describedby={fieldErrors.body ? `error-review-body-${targetSlug}` : undefined}
            className={`w-full px-4 py-3 rounded-lg bg-background/50 border outline-none text-white placeholder:text-muted-foreground/70 resize-none ${
              fieldErrors.body
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
            }`}
          />
          {fieldErrors.body && (
            <div
              id={`error-review-body-${targetSlug}`}
              className="mt-2 text-sm text-red-400"
              data-testid={`error-review-body-${targetSlug}`}
            >
              {fieldErrors.body}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            {body.length}/1000 · {t("reviews.helpText")}
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            data-testid={`button-submit-review-${targetSlug}`}
            className="bg-primary hover:bg-primary/90"
          >
            {mutation.isPending ? t("reviews.submitting") : t("reviews.submit")}
          </Button>
        </div>

        {errorMessage && (
          <div className="text-sm text-red-400" data-testid={`text-review-error-${targetSlug}`}>
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="text-sm text-green-400" data-testid={`text-review-success-${targetSlug}`}>
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
}

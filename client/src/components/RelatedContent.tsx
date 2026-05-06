import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/i18n/LocalizedLink";
import type { RelatedLink } from "@/lib/internalLinkMap";

interface RelatedContentProps {
  heading: string;
  subheading?: string;
  items: RelatedLink[];
  testIdPrefix?: string;
}

export function RelatedContent({ heading, subheading, items, testIdPrefix = "link-related" }: RelatedContentProps) {
  if (!items || items.length === 0) return null;
  return (
    <section className="my-16 md:my-20">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold font-display mb-2">{heading}</h2>
        {subheading && <p className="text-muted-foreground">{subheading}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {items.slice(0, 3).map((item) => {
          const slugId = item.href.replace(/^\//, "").replace(/\//g, "-");
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group p-5 md:p-6 rounded-2xl border border-white/10 bg-card/40 hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col"
              data-testid={`${testIdPrefix}-${slugId}`}
            >
              {item.badge && (
                <div className="text-xs uppercase tracking-widest text-primary font-display mb-2">
                  {item.badge}
                </div>
              )}
              <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-muted-foreground flex-1">{item.description}</p>
              )}
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

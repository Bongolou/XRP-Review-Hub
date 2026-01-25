import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, X, FileText, Wallet, Building2, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const searchableContent = [
  { title: "Xaman Wallet Review", path: "/wallet/xaman", type: "wallet", keywords: ["xumm", "mobile", "free", "app"] },
  { title: "Ledger Nano X Review", path: "/wallet/ledger", type: "wallet", keywords: ["hardware", "cold storage", "security"] },
  { title: "Tangem Review", path: "/wallet/tangem", type: "wallet", keywords: ["card", "nfc", "hardware"] },
  { title: "Uphold Exchange Review", path: "/exchange/uphold", type: "exchange", keywords: ["buy xrp", "fiat", "usa"] },
  { title: "Bitrue Exchange Review", path: "/exchange/bitrue", type: "exchange", keywords: ["trading", "staking"] },
  { title: "Kraken Exchange Review", path: "/exchange/kraken", type: "exchange", keywords: ["security", "pro", "trading"] },
  { title: "Getting Started Guide", path: "/getting-started", type: "guide", keywords: ["beginner", "buy", "first"] },
  { title: "Wallet Quiz", path: "/wallet-quiz", type: "tool", keywords: ["find", "choose", "compare"] },
  { title: "FAQ", path: "/faq", type: "help", keywords: ["questions", "help", "support"] },
  { title: "Blog", path: "/blog", type: "content", keywords: ["articles", "news", "insights"] },
  { title: "About Us", path: "/about", type: "page", keywords: ["team", "mission"] },
  { title: "Contact", path: "/contact", type: "page", keywords: ["email", "message"] },
  { title: "Affiliate Disclosure", path: "/disclosure", type: "legal", keywords: ["affiliate", "commission"] },
  { title: "Privacy Policy", path: "/privacy", type: "legal", keywords: ["data", "cookies"] },
  { title: "Terms of Service", path: "/terms", type: "legal", keywords: ["terms", "conditions"] },
];

const typeIcons: Record<string, typeof Wallet> = {
  wallet: Wallet,
  exchange: Building2,
  guide: FileText,
  help: HelpCircle,
  default: FileText,
};

export function SearchDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();

  const results = query.length > 0
    ? searchableContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSelect = (path: string) => {
    setLocation(path);
    setQuery("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-card border border-white/10 rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search wallets, guides, articles..."
            autoFocus
            data-testid="search-input"
            className="flex-1 bg-transparent outline-none text-white placeholder:text-muted-foreground"
          />
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {query.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              Start typing to search...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No results found for "{query}"
            </div>
          ) : (
            <div className="p-2">
              {results.map(item => {
                const Icon = typeIcons[item.type] || typeIcons.default;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleSelect(item.path)}
                    data-testid={`search-result-${item.path.replace(/\//g, '-')}`}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                  >
                    <Icon className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground capitalize">{item.type}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-white/10 text-xs text-muted-foreground flex justify-between">
          <span>Press ESC to close</span>
          <span>⌘K to open search</span>
        </div>
      </div>
    </div>
  );
}

export function useSearch() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
}

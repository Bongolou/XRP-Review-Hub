import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Compass, LockKeyhole, ShieldCheck, Smartphone, Sparkles, Star } from "lucide-react";
import "./walletradar-refined.css";

type Goal = "everyday" | "offline" | "simple";

const wallets = [
  { name: "Xaman", kind: "Mobile · self-custody", score: "9.9", price: "Free", mark: "X", hue: "coral", note: "The most complete way into the XRPL.", goals: ["everyday", "simple"] as Goal[] },
  { name: "Ledger Nano X", kind: "Hardware · Bluetooth", score: "9.8", price: "$149", mark: "L", hue: "forest", note: "Keep your keys offline, without losing access.", goals: ["offline"] as Goal[] },
  { name: "Tangem", kind: "Hardware · NFC cards", score: "9.4", price: "$54.90", mark: "T", hue: "citron", note: "Hardware-level security, pocket-sized.", goals: ["offline", "simple"] as Goal[] },
];

const priorities: { id: Goal; label: string; description: string; icon: typeof Smartphone }[] = [
  { id: "everyday", label: "Use it every day", description: "Apps, swaps & NFTs", icon: Smartphone },
  { id: "offline", label: "Keep it offline", description: "Long-term peace of mind", icon: LockKeyhole },
  { id: "simple", label: "Keep it simple", description: "An easy place to start", icon: Sparkles },
];

export default function WalletRadarRefined() {
  const [goal, setGoal] = useState<Goal>("everyday");
  const [selected, setSelected] = useState("Xaman");
  const [allWallets, setAllWallets] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const matches = useMemo(() => wallets.filter((wallet) => wallet.goals.includes(goal)), [goal]);
  const visible = allWallets ? wallets : matches;
  const featured = visible.find((wallet) => wallet.name === selected) ?? matches[0];

  const chooseGoal = (next: Goal) => {
    setGoal(next);
    setSelected(wallets.find((wallet) => wallet.goals.includes(next))?.name ?? "Xaman");
    setReviewOpen(false);
  };

  return (
    <main className="wpol">
      <header className="wpol-header">
        <a href="#start" className="wpol-brand" aria-label="All Things XRPL home">
          <span className="wpol-monogram">AT<span>.</span></span>
          <span>ALL THINGS <b>XRPL</b></span>
        </a>
        <div className="wpol-header-center"><span className="wpol-status" /> INDEPENDENT WALLET FIELD GUIDE <i>·</i> MAY 2026</div>
        <button className="wpol-browse" onClick={() => setAllWallets((value) => !value)} aria-expanded={allWallets}>
          {allWallets ? "Recommended" : "All wallets"} <ChevronDown size={14} />
        </button>
      </header>

      <section className="wpol-hero" id="start">
        <div className="wpol-hero-copy">
          <div className="wpol-eyebrow"><span>01</span> A BETTER PLACE TO START</div>
          <h1>Find your<br /><em>kind of wallet.</em></h1>
          <p>Good choices begin with what matters to you. Pick a priority; we’ll narrow the field.</p>
          <div className="wpol-trust"><ShieldCheck size={14} /> Hands-on research <span /> No paid rankings</div>
        </div>
        <div className="wpol-compass" aria-hidden="true">
          <div className="wpol-compass-ring wpol-ring-a" />
          <div className="wpol-compass-ring wpol-ring-b" />
          <div className="wpol-compass-center"><Compass size={29} strokeWidth={1.35} /></div>
          <span className="wpol-compass-label">YOUR<br />NORTH</span>
          <span className="wpol-compass-coordinate">XRPL / 2026</span>
          <span className="wpol-star">✳</span>
        </div>
      </section>

      <section className="wpol-priorities" aria-label="Choose your wallet priority">
        <div className="wpol-section-head">
          <div className="wpol-section-title"><span className="wpol-index">02</span><span>WHAT MATTERS MOST?</span></div>
          <span className="wpol-aside">Three good places to begin.</span>
        </div>
        <div className="wpol-priority-grid" role="tablist">
          {priorities.map(({ id, label, description, icon: Icon }) => (
            <button key={id} role="tab" aria-selected={goal === id} className={`wpol-priority ${goal === id ? "active" : ""}`} onClick={() => chooseGoal(id)}>
              <span className="wpol-priority-icon"><Icon size={17} strokeWidth={1.7} /></span>
              <span className="wpol-priority-copy"><b>{label}</b><small>{description}</small></span>
              <span className="wpol-priority-check">{goal === id ? <Check size={14} /> : <ArrowDownRight size={14} />}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="wpol-results">
        <div className="wpol-results-heading">
          <div>
            <div className="wpol-section-title"><span className="wpol-index">03</span><span>YOUR SHORTLIST</span><span className="wpol-count">{matches.length} MATCH{matches.length === 1 ? "" : "ES"}</span></div>
            <h2>{goal === "everyday" ? "Ready for your everyday." : goal === "offline" ? "A little more peace of mind." : "Simple, from the first tap."}</h2>
            <p>{goal === "everyday" ? "A quick route to the apps and activity you came for." : goal === "offline" ? "Hardware picks for a quieter kind of security." : "Wallets that keep the jargon out of your way."}</p>
          </div>
          <button className="wpol-all" onClick={() => setAllWallets((value) => !value)}>{allWallets ? "Show my matches" : "Compare all"} <ArrowRight size={15} /></button>
        </div>

        <div className="wpol-result-grid">
          <div className="wpol-wallet-list" role="list" aria-label="Wallet recommendations">
            {visible.map((wallet, index) => (
              <button key={wallet.name} role="listitem" className={`wpol-wallet ${featured?.name === wallet.name ? "chosen" : ""}`} onClick={() => { setSelected(wallet.name); setReviewOpen(false); }}>
                <span className={`wpol-wallet-mark ${wallet.hue}`}>{wallet.mark}</span>
                <span className="wpol-wallet-copy"><b>{wallet.name}</b><small>{wallet.kind}</small></span>
                <span className="wpol-rating"><Star size={12} fill="currentColor" /> {wallet.score}</span>
                <span className="wpol-rank">0{index + 1}</span>
              </button>
            ))}
          </div>
          {featured && <article className="wpol-feature">
            <div className="wpol-feature-top"><span className="wpol-pick"><Sparkles size={12} /> EDITOR’S PICK</span><span className="wpol-score">{featured.score}<small> / 10</small></span></div>
            <div className="wpol-feature-name">{featured.name}</div>
            <p className="wpol-feature-note">{featured.note}</p>
            <div className="wpol-facts">
              <div><small>WALLET TYPE</small><b>{featured.kind.split(" · ")[0]}</b></div>
              <div><small>STARTING PRICE</small><b>{featured.price}</b></div>
            </div>
            <button className="wpol-review" onClick={() => setReviewOpen((value) => !value)} aria-expanded={reviewOpen}>
              {reviewOpen ? "Close review note" : `Read our ${featured.name} review`} <ArrowRight size={15} />
            </button>
            {reviewOpen && <div className="wpol-review-note">Our review covers setup, security trade-offs and who this wallet suits best.</div>}
          </article>}
        </div>
        <div className="wpol-results-foot"><span><span className="wpol-verified"><Check size={9} /></span> Independent research. Clear recommendations.</span><a href="#method">How we choose <ArrowRight size={12} /></a></div>
      </section>

      <footer className="wpol-footer" id="method"><span>ALL THINGS XRPL <i>—</i> WALLET NOTES, WITHOUT THE NOISE.</span><span>INDEPENDENT SINCE 2021 <b>✳</b></span></footer>
    </main>
  );
}

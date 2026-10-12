import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, Check, Compass, Shield, Smartphone, Sparkles, Star } from "lucide-react";
import "./walletradar-atlas.css";

type Goal = "everyday" | "offline" | "beginner";

const wallets = [
  { name: "Xaman", kind: "Mobile · self-custody", rating: "9.9", price: "Free", goals: ["everyday", "beginner"] as Goal[], mark: "X", color: "coral", note: "Best for exploring XRPL" },
  { name: "Ledger Nano X", kind: "Hardware · Bluetooth", rating: "9.9", price: "$149", goals: ["offline"] as Goal[], mark: "L", color: "ink", note: "Best for long-term storage" },
  { name: "Tangem", kind: "Hardware · NFC cards", rating: "9.4", price: "$54.90", goals: ["offline", "beginner"] as Goal[], mark: "T", color: "lime", note: "Best setup in your pocket" },
];

const goals: { id: Goal; label: string; detail: string; icon: typeof Smartphone }[] = [
  { id: "everyday", label: "Use it every day", detail: "Quick access, swaps & apps", icon: Smartphone },
  { id: "offline", label: "Keep it offline", detail: "Keys stored away from reach", icon: Shield },
  { id: "beginner", label: "Keep it simple", detail: "A gentle first step into XRP", icon: Sparkles },
];

const goalCopy: Record<Goal, { title: string; detail: string }> = {
  everyday: { title: "A wallet that keeps up.", detail: "Quick access to swaps, NFTs and XRPL apps." },
  offline: { title: "Your keys, out of reach.", detail: "Hardware options for a quieter kind of security." },
  beginner: { title: "Start without the jargon.", detail: "A gentle first step into holding XRP yourself." },
};

export default function WalletRadarAtlas() {
  const [goal, setGoal] = useState<Goal>("everyday");
  const [selected, setSelected] = useState("Xaman");
  const [showAll, setShowAll] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const matched = useMemo(() => wallets.filter((wallet) => wallet.goals.includes(goal)), [goal]);
  const visibleWallets = showAll ? wallets : matched;
  const featured = visibleWallets.find((wallet) => wallet.name === selected) ?? matched[0];

  function chooseGoal(next: Goal) {
    setGoal(next);
    setSelected(wallets.find((wallet) => wallet.goals.includes(next))?.name ?? "Xaman");
    setShowReview(false);
  }

  return (
    <main className="atlas">
      <aside className="atlas-rail">
        <header className="atlas-header">
          <a className="atlas-brand" href="#atlas-top" aria-label="All Things XRPL home">
            <span className="atlas-stamp">AT</span>
            <span>ALL THINGS <b>XRPL</b></span>
          </a>
          <span className="atlas-index">FIELD GUIDE&nbsp; / &nbsp;05</span>
        </header>

        <section className="atlas-intro" id="atlas-top">
          <div className="atlas-eyebrow"><span /> THE XRPL WALLET FINDER</div>
          <h1>Good wallet.<br /><em>Clear choice.</em></h1>
          <p>Skip the endless spec sheets. Tell us what matters and we’ll point you in the right direction.</p>
          <div className="atlas-compass"><Compass size={19} strokeWidth={1.5} /><span>YOUR PRIORITIES</span><i>03 / 08</i></div>
        </section>

        <section className="atlas-goals">
          <div className="atlas-section-label"><span>01</span> START WITH YOUR USE</div>
          <div className="atlas-goal-list" role="tablist" aria-label="Choose your wallet priority">
            {goals.map(({ id, label, detail, icon: Icon }) => (
              <button key={id} role="tab" aria-selected={goal === id} className={`atlas-goal ${goal === id ? "active" : ""}`} onClick={() => chooseGoal(id)}>
                <span className="atlas-goal-icon"><Icon size={16} /></span>
                <span className="atlas-goal-copy"><b>{label}</b><small>{detail}</small></span>
                <span className="atlas-goal-check">{goal === id && <Check size={13} />}</span>
              </button>
            ))}
          </div>
          <div className="atlas-assurance"><Shield size={14} /><span>Hands-on research</span><i /> No paid rankings</div>
        </section>

        <footer className="atlas-rail-foot">
          <span>INDEPENDENT SINCE 2021</span><b>✳</b>
        </footer>
      </aside>

      <section className="atlas-results">
        <div className="atlas-results-head">
          <div>
            <div className="atlas-result-label"><span>02</span> YOUR SHORTLIST <i>{matched.length} MATCHES</i></div>
            <h2>{goalCopy[goal].title}</h2>
            <p>{goalCopy[goal].detail}</p>
          </div>
          <button className="atlas-browse" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll}>
            {showAll ? "Show matches" : "Browse all wallets"} <ArrowDownRight size={16} />
          </button>
        </div>

        <div className="atlas-layout">
          <div className="atlas-list" role="list" aria-label="Recommended wallets">
            <div className="atlas-list-head"><span>RECOMMENDED</span><span>RATING</span></div>
            {visibleWallets.map((wallet, index) => (
              <button key={wallet.name} role="listitem" className={`atlas-wallet ${featured?.name === wallet.name ? "selected" : ""}`} onClick={() => { setSelected(wallet.name); setShowReview(false); }}>
                <span className={`atlas-mark ${wallet.color}`}>{wallet.mark}</span>
                <span className="atlas-wallet-copy"><b>{wallet.name}</b><small>{wallet.kind}</small></span>
                <span className="atlas-rating"><Star size={12} fill="currentColor" />{wallet.rating}</span>
                <span className="atlas-rank">0{index + 1}</span>
              </button>
            ))}
            {!visibleWallets.length && <div className="atlas-empty">No matches yet. Choose another priority.</div>}
            <div className="atlas-method"><span className="atlas-check"><Check size={11} /></span> Rankings reflect our own research. <a href="#atlas-method">How we choose <ArrowRight size={12} /></a></div>
          </div>

          {featured && (
            <article className="atlas-pick">
              <div className="atlas-pick-top"><span><Sparkles size={13} /> OUR PICK</span><b>{featured.rating}<small> / 10</small></b></div>
              <div className="atlas-pick-number">FIELD NOTE&nbsp; 0{wallets.indexOf(featured) + 1}</div>
              <h3>{featured.name}</h3>
              <p>{featured.note}</p>
              <div className="atlas-facts">
                <span>TYPE <b>{featured.kind.split(" · ")[0]}</b></span>
                <span>PRICE <b>{featured.price}</b></span>
              </div>
              <button className="atlas-review" onClick={() => setShowReview((value) => !value)} aria-expanded={showReview}>
                {showReview ? "Close review note" : `Read our ${featured.name} review`} <ArrowRight size={16} />
              </button>
              {showReview && <div className="atlas-review-note">Our {featured.name} review covers setup, security trade-offs and who this wallet suits best.</div>}
              <div className="atlas-orbit" aria-hidden="true"><span /><span /></div>
            </article>
          )}
        </div>

        <footer className="atlas-bottom" id="atlas-method">
          <span>ALL THINGS XRPL <i>—</i> WALLET NOTES, WITHOUT THE NOISE.</span>
          <span>INDEPENDENT WALLET FIELD GUIDE&nbsp; · &nbsp;UPDATED MAY 2026</span>
        </footer>
      </section>
    </main>
  );
}

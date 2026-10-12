import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, Compass, Shield, Smartphone, Sparkles, Star } from "lucide-react";
import "./walletradar-tidal.css";

type Goal = "everyday" | "offline" | "beginner";

const wallets = [
  { name: "Xaman", kind: "Mobile · self-custody", rating: "9.9", price: "Free", goals: ["everyday", "beginner"], mark: "X", color: "blue", note: "Best for exploring XRPL" },
  { name: "Ledger Nano X", kind: "Hardware · Bluetooth", rating: "9.9", price: "$149", goals: ["offline"], mark: "L", color: "navy", note: "Best for long-term storage" },
  { name: "Tangem", kind: "Hardware · NFC cards", rating: "9.4", price: "$54.90", goals: ["offline", "beginner"], mark: "T", color: "ochre", note: "Best setup in your pocket" },
];

const goalCopy: Record<Goal, { label: string; title: string; detail: string }> = {
  everyday: { label: "Use it every day", title: "A wallet that keeps up.", detail: "Quick access to swaps, NFTs and XRPL apps." },
  offline: { label: "Keep it offline", title: "Your keys, out of reach.", detail: "Hardware options for a quieter kind of security." },
  beginner: { label: "Keep it simple", title: "Start without the jargon.", detail: "A gentle first step into holding XRP yourself." },
};

export default function WalletRadarTidal() {
  const [goal, setGoal] = useState<Goal>("everyday");
  const [selected, setSelected] = useState("Xaman");
  const [showAll, setShowAll] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const matched = useMemo(() => wallets.filter((wallet) => wallet.goals.includes(goal)), [goal]);
  const featured = (showAll ? wallets : matched).find((wallet) => wallet.name === selected) ?? matched[0];

  function chooseGoal(next: Goal) {
    setGoal(next);
    const firstMatch = wallets.find((wallet) => wallet.goals.includes(next));
    if (firstMatch) setSelected(firstMatch.name);
  }

  return (
    <main className="tidal">
      <header className="tidal-nav">
        <a className="tidal-brand" href="#top" aria-label="All Things XRPL home">
          <span className="tidal-stamp">AT</span>
          <span>ALL THINGS <b>XRPL</b></span>
        </a>
        <span className="tidal-nav-note">Independent wallet field guide <i>·</i> Updated May 2026</span>
        <button className="tidal-menu" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll}>
          Browse wallets <ChevronDown size={15} />
        </button>
      </header>

      <section className="tidal-intro" id="top">
        <div className="tidal-intro-copy">
          <div className="tidal-eyebrow"><span className="tidal-eyebrow-dot" /> THE XRPL WALLET FINDER</div>
          <h1>Good wallet.<br /><em>Clear choice.</em></h1>
          <p>Skip the endless spec sheets. Tell us what matters to you and we’ll point you in the right direction.</p>
          <div className="tidal-proof"><Shield size={14} /> Hands-on research <span /> No paid rankings</div>
        </div>
        <div className="tidal-art" aria-hidden="true">
          <div className="tidal-orbit tidal-orbit-one" /><div className="tidal-orbit tidal-orbit-two" />
          <div className="tidal-orbit-center"><Compass size={34} strokeWidth={1.25} /></div>
          <span className="tidal-orbit-label tidal-label-north">YOUR<br />PRIORITIES</span>
          <span className="tidal-orbit-label tidal-label-east">03 / 08</span>
          <span className="tidal-cross">+</span>
        </div>
      </section>

      <section className="tidal-finder">
        <div className="tidal-finder-heading">
          <div><span className="tidal-step">01</span><span className="tidal-overline">START WITH YOUR USE</span></div>
          <span className="tidal-quiet">No wrong answers.</span>
        </div>
        <div className="tidal-goal-list" role="tablist" aria-label="Choose your wallet priority">
          {(["everyday", "offline", "beginner"] as Goal[]).map((id, index) => {
            const Icon = index === 0 ? Smartphone : index === 1 ? Shield : Sparkles;
            return (
              <button key={id} role="tab" aria-selected={goal === id} className={`tidal-goal ${goal === id ? "is-active" : ""}`} onClick={() => chooseGoal(id)}>
                <span className="tidal-goal-icon"><Icon size={17} /></span>
                <span className="tidal-goal-label">{goalCopy[id].label}</span>
                <span className="tidal-goal-check">{goal === id && <Check size={14} />}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="tidal-result">
        <div className="tidal-result-top">
          <div>
            <div className="tidal-result-kicker"><span className="tidal-step">02</span><span className="tidal-overline">YOUR SHORTLIST</span><span className="tidal-match-count">{matched.length} MATCHES</span></div>
            <h2>{goalCopy[goal].title}</h2>
            <p>{goalCopy[goal].detail}</p>
          </div>
          <button className="tidal-all-link" onClick={() => setShowAll((value) => !value)}>{showAll ? "Hide all" : "See all wallets"} <ArrowRight size={15} /></button>
        </div>
        <div className="tidal-result-body">
          <div className="tidal-wallet-rail" role="list" aria-label="Recommended wallets">
            {(showAll ? wallets : matched).map((wallet, index) => (
              <button key={wallet.name} role="listitem" className={`tidal-wallet-row ${featured?.name === wallet.name ? "chosen" : ""}`} onClick={() => setSelected(wallet.name)}>
                <span className={`tidal-wallet-mark ${wallet.color}`}>{wallet.mark}</span>
                <span className="tidal-wallet-meta"><b>{wallet.name}</b><small>{wallet.kind}</small></span>
                <span className="tidal-wallet-rating"><Star size={12} fill="currentColor" /> {wallet.rating}</span>
                <span className="tidal-row-rank">0{index + 1}</span>
              </button>
            ))}
          </div>
          {featured && (
            <article className="tidal-spotlight">
              <div className="tidal-spotlight-top"><span className="tidal-spotlight-tag"><Sparkles size={12} /> OUR PICK</span><span className="tidal-spotlight-score">{featured.rating}<small> / 10</small></span></div>
              <div className="tidal-spotlight-name">{featured.name}</div>
              <div className="tidal-spotlight-note">{featured.note}</div>
              <div className="tidal-spotlight-rule" />
              <div className="tidal-spotlight-facts"><span>TYPE <b>{featured.kind.split(" · ")[0]}</b></span><span>PRICE <b>{featured.price}</b></span></div>
              <button className="tidal-review-button" onClick={() => setShowReview((value) => !value)} aria-expanded={showReview}>
                {showReview ? "Close review note" : `Read our ${featured.name} review`} <ArrowRight size={16} />
              </button>
              {showReview && <div className="tidal-review-note">Our {featured.name} review covers setup, security trade-offs and who this wallet suits best.</div>}
            </article>
          )}
        </div>
        <div className="tidal-result-foot"><span><span className="tidal-tiny-check"><Check size={10} /></span> Rankings reflect our own research.</span><a href="#method">How we choose <ArrowRight size={12} /></a></div>
      </section>

      <footer className="tidal-foot" id="method">
        <span>ALL THINGS XRPL <i>—</i> WALLET NOTES, WITHOUT THE NOISE.</span>
        <span className="tidal-foot-right">Independent since 2021 <span className="tidal-foot-mark">✳</span></span>
      </footer>
    </main>
  );
}

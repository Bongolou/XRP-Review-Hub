import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Check, ChevronDown, LockKeyhole, ShieldCheck, Smartphone, Sparkles, Star } from "lucide-react";
import "./walletradar-pocket.css";

type Goal = "daily" | "offline" | "easy";

const wallets = [
  { name: "Xaman", detail: "Mobile app · Self-custody", price: "Free", score: "9.9", mark: "X", color: "coral", description: "A confident first wallet for everyday XRPL life.", goals: ["daily", "easy"] as Goal[] },
  { name: "Ledger Nano X", detail: "Hardware · Bluetooth", price: "$149", score: "9.8", mark: "L", color: "ink", description: "Keep your keys offline and your options open.", goals: ["offline"] as Goal[] },
  { name: "Tangem", detail: "Hardware · NFC cards", price: "$54.90", score: "9.4", mark: "T", color: "lime", description: "A hardware wallet that feels as simple as a card.", goals: ["offline", "easy"] as Goal[] },
];

const goals: { id: Goal; title: string; hint: string; icon: typeof Smartphone }[] = [
  { id: "daily", title: "Everyday use", hint: "Apps, swaps & NFTs", icon: Smartphone },
  { id: "offline", title: "Offline security", hint: "Keep keys off your phone", icon: LockKeyhole },
  { id: "easy", title: "Easy to start", hint: "Simple setup, less jargon", icon: Sparkles },
];

export default function WalletRadarPocket() {
  const [goal, setGoal] = useState<Goal>("daily");
  const [selectedName, setSelectedName] = useState("Xaman");
  const [showAll, setShowAll] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const matches = useMemo(() => wallets.filter((wallet) => wallet.goals.includes(goal)), [goal]);
  const results = showAll ? wallets : matches;
  const selected = results.find((wallet) => wallet.name === selectedName) ?? matches[0];

  function chooseGoal(next: Goal) {
    setGoal(next);
    setSelectedName(wallets.find((wallet) => wallet.goals.includes(next))?.name ?? "Xaman");
    setReviewOpen(false);
  }

  return (
    <main className="wrp">
      <header className="wrp-topbar">
        <a className="wrp-brand" href="#finder" aria-label="All Things XRPL wallet finder">
          <span className="wrp-mark">AT<span>.</span></span>
          <span>ALL THINGS <b>XRPL</b></span>
        </a>
        <span className="wrp-live"><i /> WALLET FINDER</span>
        <button className="wrp-menu" onClick={() => setShowAll((value) => !value)} aria-label={showAll ? "Show recommendations" : "Browse all wallets"} aria-expanded={showAll}>
          <span>{showAll ? "Picks" : "All wallets"}</span><ChevronDown size={14} />
        </button>
      </header>

      <section className="wrp-intro" id="finder">
        <div className="wrp-kicker"><span>01</span> YOUR WALLET, YOUR WAY</div>
        <h1>Find your<br /><em>right fit.</em></h1>
        <p>Start with what matters. We’ll make the shortlist clear.</p>
        <div className="wrp-proof"><ShieldCheck size={15} /><span>Independently researched</span><b>·</b><span>No paid rankings</span></div>
      </section>

      <section className="wrp-choose" aria-label="Choose what matters most">
        <div className="wrp-section-label"><span>02</span><b>WHAT MATTERS MOST?</b><small>Choose one</small></div>
        <div className="wrp-goals" role="radiogroup" aria-label="Wallet priority">
          {goals.map(({ id, title, hint, icon: Icon }) => (
            <button key={id} className={`wrp-goal ${goal === id ? "is-active" : ""}`} role="radio" aria-checked={goal === id} onClick={() => chooseGoal(id)}>
              <span className="wrp-goal-icon"><Icon size={19} strokeWidth={1.8} /></span>
              <span className="wrp-goal-text"><b>{title}</b><small>{hint}</small></span>
              <span className="wrp-goal-check">{goal === id ? <Check size={15} /> : <ArrowRight size={15} />}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="wrp-results" aria-live="polite">
        <div className="wrp-results-head">
          <div className="wrp-section-label"><span>03</span><b>YOUR SHORTLIST</b><small className="wrp-match-count">{matches.length} MATCH{matches.length === 1 ? "" : "ES"}</small></div>
          <h2>{goal === "daily" ? "Made for daily moves." : goal === "offline" ? "Security, kept simple." : "An easy place to begin."}</h2>
          <p>{goal === "daily" ? "A good fit for exploring the XRPL." : goal === "offline" ? "Hardware picks for more peace of mind." : "Friendly setup, without the learning curve."}</p>
        </div>
        <div className="wrp-result-list">
          {results.map((wallet, index) => (
            <button key={wallet.name} className={`wrp-wallet ${selected?.name === wallet.name ? "is-selected" : ""}`} onClick={() => { setSelectedName(wallet.name); setReviewOpen(false); }} aria-pressed={selected?.name === wallet.name}>
              <span className={`wrp-wallet-mark ${wallet.color}`}>{wallet.mark}</span>
              <span className="wrp-wallet-info"><b>{wallet.name}</b><small>{wallet.detail}</small></span>
              <span className="wrp-wallet-rating"><Star size={12} fill="currentColor" />{wallet.score}</span>
              <span className="wrp-wallet-num">0{index + 1}</span>
            </button>
          ))}
        </div>
        {selected && <article className="wrp-detail">
          <div className="wrp-detail-top"><span><Sparkles size={13} /> BEST MATCH FOR YOU</span><b>{selected.score}<small> / 10</small></b></div>
          <h3>{selected.name}</h3>
          <p>{selected.description}</p>
          <div className="wrp-detail-facts"><div><small>WALLET TYPE</small><b>{selected.detail.split(" · ")[0]}</b></div><div><small>STARTING PRICE</small><b>{selected.price}</b></div></div>
          <button className="wrp-review" onClick={() => setReviewOpen((value) => !value)} aria-expanded={reviewOpen}>
            {reviewOpen ? "Hide review summary" : `Read our ${selected.name} review`} <ArrowRight size={16} />
          </button>
          {reviewOpen && <div className="wrp-review-copy">We look at setup, security trade-offs, and who this wallet suits best—so you can choose with confidence.</div>}
        </article>}
        <button className="wrp-all" onClick={() => setShowAll((value) => !value)}>
          {showAll ? "Show only my matches" : "See all wallet options"} <ArrowDown size={15} className={showAll ? "wrp-flip" : ""} />
        </button>
        <div className="wrp-assurance"><span><span className="wrp-assurance-check"><Check size={10} /></span> Clear recommendations. Independent research.</span><a href="#method">Our method <ArrowRight size={13} /></a></div>
      </section>

      <footer className="wrp-footer" id="method">
        <span>ALL THINGS XRPL <i>—</i> WALLET NOTES, WITHOUT THE NOISE.</span>
        <span>INDEPENDENT SINCE 2021 <b>✳</b></span>
      </footer>
    </main>
  );
}

# All Things XRPL — XRPL DeFi Starter Kit

Welcome to DeFi on the XRP Ledger. This kit walks you through the dApps
worth trying first, the safety checks that protect your funds before you
touch an AMM or trustline, and exactly how to set up the two wallets you
will actually use day-to-day: Xaman and Crossmark.

Print it, screenshot it, or keep it open in a tab — every link works on
mobile and desktop.

---

## 1. Which XRPL dApps to try first

The XRPL has a small, focused DeFi ecosystem. You do not need to learn
twenty protocols. Start with these five — in this order — and you will
have used the AMM, the DEX, an NFT marketplace and an on-chain lending
market in under an afternoon.

| #  | dApp              | What it is                                  | Try this first                                            |
|----|-------------------|---------------------------------------------|-----------------------------------------------------------|
| 1  | XPMarket          | Token launchpad + AMM dashboard             | Swap 1 XRP for any listed token, watch the AMM fill       |
| 2  | Sologenic DEX     | Native XRPL order-book DEX (no AMM)         | Place a limit order for a small amount of USD-issued IOU  |
| 3  | XRP.Cafe          | The largest XRPL NFT marketplace            | Browse a free mint, sweep one floor NFT under 5 XRP       |
| 4  | Magnetic X        | XRPL lending + perps (EVM sidechain)        | Bridge 5 XRP to the sidechain, deposit into a lending pool|
| 5  | First Ledger      | Memecoin / new-token launch tracker         | Filter by 24h volume, check liquidity before any buy      |

Full deep-dives, screenshots and current rankings:
https://allthingsxrpl.com/dapps

Rule of thumb: if a dApp asks you to import your seed phrase into a
website, close the tab. Real XRPL dApps connect through Xaman or
Crossmark — they never see your secret.

---

## 2. Trustline + AMM safety checklist

Most money lost on XRPL DeFi is not lost to "hacks." It is lost to
trustlines opened on scam tokens and AMMs joined without checking the
two sides of the pool. Run through this list every single time before
you sign.

### Before you set a trustline

- [ ] The issuer address matches the official one on the project's
      website (copy-paste, never type).
- [ ] The token has a verified entry on Bithomp or XRPSCAN — not just
      a logo and a Telegram link.
- [ ] You have set a **sensible limit** on the trustline (e.g. 10,000),
      not the default "no limit." A no-limit trustline lets a malicious
      issuer mint unlimited tokens into your wallet.
- [ ] You understand the **transfer fee** the issuer has set. Anything
      above 1% is unusual for a real project.
- [ ] You are okay reserving 2 XRP per trustline (this is locked, not
      spent — you get it back when you remove the trustline).

### Before you deposit into an AMM

- [ ] Both sides of the pool have **real, traded liquidity** — not just
      a single LP holding 99% of the shares.
- [ ] You have read the current spread and the 24h volume. A pool with
      $0 daily volume earns no fees, no matter what the APR widget says.
- [ ] You understand **impermanent loss**: if the price ratio changes,
      you will end up with more of the losing asset and less of the
      winning one. You only break even if both prices recover.
- [ ] You are depositing an amount you can leave in for **at least
      30 days**. AMM LP positions on XRPL have a small unbonding cost.
- [ ] You have **never** clicked an "auto-compound" or "boost APR"
      contract. The native XRPL AMM has no such feature — those links
      are scams.

### After you sign

- [ ] Open Bithomp, paste your address, and confirm the trustline /
      AMM deposit shows up exactly as you expected.
- [ ] If anything looks wrong — wrong issuer, wrong amount, unfamiliar
      token — remove the trustline immediately. You can always re-add it.

---

## 3. Xaman setup (mobile, free, the daily driver)

Xaman is built by XRPL Labs (the same team that runs an XRPL validator).
It is the wallet most XRPL dApps connect to by default.

1. Install **Xaman** from the App Store or Google Play. Confirm the
   developer is **XRPL Labs B.V.** before you tap install.
2. Open the app and choose **Create a new account**.
3. Choose **Full access** (you control the secret) — not "Read only."
4. Choose the **Secret Numbers** option, not the 24-word mnemonic.
   Secret Numbers are XRPL-native and easier to back up on paper.
5. Write your 8 rows of secret numbers on paper, in order. Store the
   paper somewhere fire-safe. **Do not photograph it. Do not type it
   into anything that is not Xaman.**
6. Send your first 10 XRP from an exchange to fund the account. The
   XRPL requires a 1 XRP base reserve, so send at least 2 XRP or the
   transaction will fail.
7. In **Settings → Security**, turn on Face ID / fingerprint and set a
   6-digit PIN.
8. To use a dApp: open the dApp in your phone browser, tap "Connect
   Xaman," and approve the sign request inside the Xaman app. You will
   never paste your secret into the dApp.

Optional but recommended: pair Xaman with a Tangem card or Ledger so
the secret never lives on your phone at all. Settings → Accounts →
Add account → Import from hardware.

---

## 4. Crossmark setup (desktop, free, for browser dApps)

Crossmark is the "MetaMask of XRPL." It lives in your browser as an
extension, which makes it the easiest way to use XRPL dApps from a
laptop.

1. Go to **https://crossmark.io** directly (do not search — fake
   extensions exist). Click **Install for Chrome / Brave / Edge**.
2. Verify the extension publisher is **Crossmark** before you add it.
3. Open the extension and choose **Create new wallet**.
4. Write the 24-word seed phrase on paper. Store it physically, not
   in a password manager, and never on a cloud drive.
5. Set a strong extension password — this only unlocks the extension on
   your machine, it does not protect you if your seed leaks.
6. Fund the account with 2+ XRP from an exchange so it meets the base
   reserve.
7. To use a dApp: open the dApp site, click "Connect Crossmark," and
   approve from the extension popup. Always read the transaction
   payload — token, amount, destination — before you sign.
8. **Pin the extension** to your toolbar so you can spot a fake
   pop-up. Real Crossmark prompts always come from the pinned icon.

Tip: keep a separate Crossmark profile for "DeFi experiments" with a
small balance, and a Xaman + hardware wallet setup for long-term
holdings. Never connect your main wallet to a brand-new dApp.

---

## 5. The five-link emergency kit

Bookmark these. If anything looks wrong, one of them will tell you why.

- Block explorer: https://bithomp.com
- Alternative explorer: https://xrpscan.com
- Trustline / token verification: https://xrpl.services
- Official XRPL docs: https://xrpl.org
- Our live dApp rankings: https://allthingsxrpl.com/dapps

---

## 6. What to read next

- Best XRPL DeFi dApps in 2026 — https://allthingsxrpl.com/dapps
- Best wallets for XRPL DeFi — https://allthingsxrpl.com/best-for/defi
- Xaman full review — https://allthingsxrpl.com/wallet/xaman
- Crossmark full review — https://allthingsxrpl.com/wallet/crossmark
- AMM safety deep-dive — https://allthingsxrpl.com/blog

---

You are on our list. We send one short email a week with new XRPL DeFi
launches we have personally tested, plus any urgent security alerts.

— The All Things XRPL editorial team

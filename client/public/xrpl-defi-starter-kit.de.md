# All Things XRPL — XRPL DeFi Starter Kit

Willkommen zu DeFi auf dem XRP Ledger. Dieses Kit zeigt dir die dApps,
die du zuerst ausprobieren solltest, die Sicherheitschecks, die dein
Geld schützen, bevor du eine AMM oder Trustline anfasst, und genau, wie
du die zwei Wallets einrichtest, die du im Alltag nutzen wirst: Xaman
und Crossmark.

Druck es aus, mach einen Screenshot oder lass es in einem Tab offen —
jeder Link funktioniert auf Mobilgerät und Desktop.

---

## 1. Welche XRPL-dApps zuerst ausprobieren

Das XRPL hat ein kleines, fokussiertes DeFi-Ökosystem. Du musst keine
zwanzig Protokolle lernen. Fang mit diesen fünf an — in dieser
Reihenfolge — und du hast in weniger als einem Nachmittag den AMM, den
DEX, einen NFT-Marktplatz und einen On-Chain-Lendingmarkt benutzt.

| #  | dApp              | Was es ist                                  | Probiere zuerst                                            |
|----|-------------------|---------------------------------------------|------------------------------------------------------------|
| 1  | XPMarket          | Token-Launchpad + AMM-Dashboard             | Tausche 1 XRP gegen einen gelisteten Token, beobachte den AMM|
| 2  | Sologenic DEX     | Nativer Orderbuch-DEX des XRPL (kein AMM)   | Setze ein Limit-Order über einen kleinen USD-IOU-Betrag    |
| 3  | XRP.Cafe          | Der größte XRPL-NFT-Marktplatz              | Schau dir einen Free Mint an, sweep ein Floor-NFT < 5 XRP  |
| 4  | Magnetic X        | XRPL-Lending + Perps (EVM-Sidechain)        | Bridge 5 XRP zur Sidechain, lege sie in einen Lending-Pool |
| 5  | First Ledger      | Memecoin- / Neutoken-Tracker                | Filtere nach 24h-Volumen, prüfe die Liquidität vor dem Kauf|

Ausführliche Analysen, Screenshots und aktuelle Rankings:
https://allthingsxrpl.com/dapps

Faustregel: Wenn dich eine dApp auffordert, deine Seed-Phrase auf einer
Website einzugeben, schließ den Tab. Echte XRPL-dApps verbinden sich
über Xaman oder Crossmark — sie sehen dein Geheimnis nie.

---

## 2. Trustline- und AMM-Sicherheits-Checkliste

Das meiste Geld, das im XRPL-DeFi verloren geht, wird nicht durch
"Hacks" verloren. Es wird durch Trustlines zu Scam-Tokens und durch
AMM-Einstiege ohne Prüfung der beiden Pool-Seiten verloren. Geh diese
Liste vor jeder Signatur durch.

### Bevor du eine Trustline setzt

- [ ] Die Issuer-Adresse stimmt mit der offiziellen auf der Website des
      Projekts überein (Copy-Paste, niemals tippen).
- [ ] Der Token hat einen verifizierten Eintrag bei Bithomp oder XRPSCAN
      — nicht nur ein Logo und einen Telegram-Link.
- [ ] Du hast ein **sinnvolles Limit** für die Trustline gesetzt
      (z. B. 10 000), nicht das voreingestellte "kein Limit". Eine
      Trustline ohne Limit erlaubt einem bösartigen Issuer, unbegrenzt
      Tokens in deine Wallet zu prägen.
- [ ] Du verstehst die **Transfergebühr** des Issuers. Mehr als 1 % ist
      bei einem echten Projekt ungewöhnlich.
- [ ] Du bist damit einverstanden, 2 XRP pro Trustline zu reservieren
      (sie sind gesperrt, nicht ausgegeben — du bekommst sie zurück,
      wenn du die Trustline entfernst).

### Bevor du in einen AMM einzahlst

- [ ] Beide Seiten des Pools haben **echte, gehandelte Liquidität** —
      nicht nur einen einzelnen LP mit 99 % der Anteile.
- [ ] Du hast den aktuellen Spread und das 24h-Volumen gelesen. Ein
      Pool mit 0 $ Tagesvolumen verdient keine Gebühren, egal was das
      APR-Widget anzeigt.
- [ ] Du verstehst **Impermanent Loss**: Verschiebt sich das Preis-
      verhältnis, hältst du am Ende mehr vom Verlierer-Asset und weniger
      vom Gewinner. Du bist nur dann break-even, wenn beide Preise sich
      wieder erholen.
- [ ] Du legst einen Betrag ein, den du **mindestens 30 Tage** liegen
      lassen kannst. AMM-LP-Positionen auf XRPL haben kleine Auflöse-
      kosten.
- [ ] Du hast **niemals** auf einen "Auto-Compound"- oder "Boost APR"-
      Vertrag geklickt. Der native XRPL-AMM hat keine solche Funktion —
      diese Links sind Scams.

### Nach dem Signieren

- [ ] Öffne Bithomp, füge deine Adresse ein und bestätige, dass die
      Trustline / der AMM-Deposit genau wie erwartet erscheint.
- [ ] Wenn etwas falsch aussieht — falscher Issuer, falscher Betrag,
      unbekannter Token — entferne die Trustline sofort. Du kannst sie
      jederzeit wieder hinzufügen.

---

## 3. Xaman einrichten (mobil, kostenlos, der Alltagsbegleiter)

Xaman wird von XRPL Labs gebaut (das gleiche Team, das einen XRPL-
Validator betreibt). Es ist die Wallet, mit der sich die meisten
XRPL-dApps standardmäßig verbinden.

1. Installiere **Xaman** aus dem App Store oder bei Google Play. Prüfe,
   dass der Entwickler **XRPL Labs B.V.** ist, bevor du auf Installieren
   tippst.
2. Öffne die App und wähle **Create a new account**.
3. Wähle **Full access** (du kontrollierst das Secret) — nicht "Read
   only".
4. Wähle die **Secret Numbers**-Option, nicht das 24-Wort-Mnemonic.
   Secret Numbers sind XRPL-nativ und einfacher auf Papier zu sichern.
5. Schreibe deine 8 Reihen Secret Numbers auf Papier, in der richtigen
   Reihenfolge. Lagere das Papier feuersicher. **Fotografiere es nicht.
   Tippe es in nichts außer Xaman ein.**
6. Schicke deine ersten 10 XRP von einer Börse, um das Konto zu
   finanzieren. Das XRPL verlangt eine Basisreserve von 1 XRP, also
   schicke mindestens 2 XRP, sonst schlägt die Transaktion fehl.
7. Aktiviere unter **Settings → Security** Face ID / Fingerabdruck und
   setze eine 6-stellige PIN.
8. Eine dApp benutzen: Öffne die dApp im Handy-Browser, tippe auf
   "Connect Xaman" und bestätige die Signatur in der Xaman-App. Du wirst
   dein Secret nie in die dApp einfügen.

Optional, aber empfohlen: Koppele Xaman mit einer Tangem-Karte oder
einem Ledger, damit das Secret nie auf dem Handy lebt. Settings →
Accounts → Add account → Import from hardware.

---

## 4. Crossmark einrichten (Desktop, kostenlos, für Browser-dApps)

Crossmark ist das "MetaMask des XRPL". Es lebt im Browser als
Erweiterung und ist damit der einfachste Weg, XRPL-dApps vom Laptop aus
zu nutzen.

1. Geh direkt auf **https://crossmark.io** (nicht suchen — es gibt
   gefälschte Erweiterungen). Klick auf **Install for Chrome / Brave /
   Edge**.
2. Prüfe, dass der Herausgeber der Erweiterung **Crossmark** ist, bevor
   du sie hinzufügst.
3. Öffne die Erweiterung und wähle **Create new wallet**.
4. Schreibe die 24-Wort-Seed-Phrase auf Papier. Lager sie physisch,
   nicht in einem Passwortmanager und niemals in einer Cloud.
5. Setze ein starkes Erweiterungspasswort — es entsperrt nur die
   Erweiterung auf deinem Gerät, es schützt nicht, wenn dein Seed
   geleakt wird.
6. Finanziere das Konto mit 2+ XRP von einer Börse, damit es die
   Basisreserve erfüllt.
7. Eine dApp benutzen: Öffne die dApp-Seite, klick auf "Connect
   Crossmark" und bestätige im Popup der Erweiterung. Lies immer das
   Transaktions-Payload — Token, Betrag, Ziel — bevor du signierst.
8. **Pinne die Erweiterung** in deine Toolbar, damit du gefälschte
   Popups erkennst. Echte Crossmark-Prompts kommen immer vom gepinnten
   Icon.

Tipp: Halte ein separates Crossmark-Profil für "DeFi-Experimente" mit
kleinem Guthaben und ein Xaman + Hardware-Wallet-Setup für langfristige
Bestände. Verbinde nie deine Hauptwallet mit einer brandneuen dApp.

---

## 5. Das Fünf-Link-Notfallset

Setze Lesezeichen. Wenn etwas falsch aussieht, sagt dir einer dieser
Links warum.

- Block-Explorer: https://bithomp.com
- Alternativer Explorer: https://xrpscan.com
- Trustline- / Token-Verifikation: https://xrpl.services
- Offizielle XRPL-Docs: https://xrpl.org
- Unsere Live-dApp-Rankings: https://allthingsxrpl.com/dapps

---

## 6. Was du als Nächstes lesen solltest

- Beste XRPL-DeFi-dApps 2026 — https://allthingsxrpl.com/dapps
- Beste Wallets für XRPL-DeFi — https://allthingsxrpl.com/best-for/defi
- Vollständiger Xaman-Test — https://allthingsxrpl.com/wallet/xaman
- Vollständiger Crossmark-Test — https://allthingsxrpl.com/wallet/crossmark
- AMM-Sicherheits-Deep-Dive — https://allthingsxrpl.com/blog

---

Du bist auf unserer Liste. Wir senden eine kurze E-Mail pro Woche mit
neuen XRPL-DeFi-Launches, die wir persönlich getestet haben, plus
dringende Sicherheitswarnungen.

— Das All-Things-XRPL-Redaktionsteam

# All Things XRPL — Kit de démarrage XRPL DeFi

Bienvenue dans le DeFi sur le XRP Ledger. Ce kit vous présente les dApps
à essayer en premier, les contrôles de sécurité qui protègent vos fonds
avant de toucher à un AMM ou à une trustline, et exactement comment
configurer les deux portefeuilles que vous utiliserez au quotidien :
Xaman et Crossmark.

Imprimez-le, prenez-en une capture ou laissez-le ouvert dans un onglet
— chaque lien fonctionne sur mobile et sur ordinateur.

---

## 1. Quelles dApps XRPL essayer en premier

Le XRPL possède un écosystème DeFi restreint et ciblé. Inutile
d'apprendre vingt protocoles. Commencez par ces cinq — dans cet ordre —
et vous aurez utilisé l'AMM, le DEX, une marketplace NFT et un marché
de prêt on-chain en moins d'un après-midi.

| #  | dApp              | Ce que c'est                                  | À essayer en premier                                          |
|----|-------------------|-----------------------------------------------|---------------------------------------------------------------|
| 1  | XPMarket          | Launchpad de tokens + tableau de bord AMM     | Échangez 1 XRP contre un token listé, observez l'AMM remplir  |
| 2  | Sologenic DEX     | DEX natif XRPL à carnet d'ordres (sans AMM)   | Placez un ordre limite pour un petit IOU en USD               |
| 3  | XRP.Cafe          | La plus grande marketplace NFT du XRPL        | Regardez un mint gratuit, raflez un NFT du floor à moins de 5 XRP|
| 4  | Magnetic X        | Lending + perps XRPL (sidechain EVM)          | Bridgez 5 XRP vers la sidechain, déposez dans un pool de prêt |
| 5  | First Ledger      | Suivi de memecoins et nouveaux tokens         | Filtrez par volume 24 h, vérifiez la liquidité avant tout achat|

Analyses détaillées, captures d'écran et classements actuels :
https://allthingsxrpl.com/dapps

Règle simple : si une dApp vous demande d'importer votre phrase de
récupération sur un site web, fermez l'onglet. Les vraies dApps XRPL se
connectent via Xaman ou Crossmark — elles ne voient jamais votre secret.

---

## 2. Liste de sécurité trustline + AMM

La majorité de l'argent perdu en DeFi XRPL ne l'est pas à cause de
"hacks". Il l'est à cause de trustlines ouvertes sur des tokens
frauduleux et d'AMM rejoints sans vérifier les deux côtés du pool.
Passez cette liste en revue avant chaque signature.

### Avant de définir une trustline

- [ ] L'adresse de l'émetteur correspond à celle officielle du site du
      projet (copier-coller, jamais à la main).
- [ ] Le token a une fiche vérifiée sur Bithomp ou XRPSCAN — pas
      seulement un logo et un lien Telegram.
- [ ] Vous avez fixé une **limite raisonnable** sur la trustline (par
      ex. 10 000), pas le "sans limite" par défaut. Une trustline sans
      limite permet à un émetteur malveillant de frapper un nombre
      illimité de tokens dans votre portefeuille.
- [ ] Vous comprenez les **frais de transfert** définis par l'émetteur.
      Au-delà de 1 %, c'est inhabituel pour un vrai projet.
- [ ] Vous acceptez de réserver 2 XRP par trustline (ils sont bloqués,
      pas dépensés — vous les récupérez en supprimant la trustline).

### Avant de déposer dans un AMM

- [ ] Les deux côtés du pool ont une **liquidité réelle et tradée** —
      pas juste un seul LP qui détient 99 % des parts.
- [ ] Vous avez lu le spread actuel et le volume 24 h. Un pool à 0 $
      de volume quotidien ne génère aucun frais, peu importe ce
      qu'affiche le widget APR.
- [ ] Vous comprenez la **perte impermanente** : si le ratio de prix
      change, vous finissez avec plus de l'actif perdant et moins du
      gagnant. Vous ne récupérez votre mise que si les deux prix
      reviennent au même niveau.
- [ ] Vous déposez un montant que vous pouvez laisser **au moins
      30 jours**. Les positions LP d'AMM sur XRPL ont un petit coût de
      sortie.
- [ ] Vous n'avez **jamais** cliqué sur un contrat "auto-compound" ou
      "boost APR". L'AMM natif du XRPL n'a pas de telle fonction —
      ces liens sont des arnaques.

### Après avoir signé

- [ ] Ouvrez Bithomp, collez votre adresse et confirmez que la
      trustline / le dépôt AMM apparaît exactement comme prévu.
- [ ] Si quelque chose semble erroné — mauvais émetteur, mauvais
      montant, token inconnu — supprimez la trustline immédiatement.
      Vous pouvez toujours la rajouter.

---

## 3. Configuration de Xaman (mobile, gratuit, votre porte-feuille du quotidien)

Xaman est développé par XRPL Labs (la même équipe qui opère un
validateur XRPL). C'est le portefeuille auquel se connectent par défaut
la plupart des dApps XRPL.

1. Installez **Xaman** depuis l'App Store ou Google Play. Vérifiez que
   le développeur est **XRPL Labs B.V.** avant d'appuyer sur installer.
2. Ouvrez l'application et choisissez **Create a new account**.
3. Choisissez **Full access** (vous contrôlez le secret) — pas "Read
   only".
4. Choisissez l'option **Secret Numbers**, pas la phrase mnémonique de
   24 mots. Les Secret Numbers sont natifs au XRPL et plus faciles à
   sauvegarder sur papier.
5. Notez vos 8 lignes de Secret Numbers sur papier, dans l'ordre.
   Stockez le papier dans un endroit ignifugé. **Ne le photographiez
   pas. Ne les saisissez nulle part en dehors de Xaman.**
6. Envoyez vos 10 premiers XRP depuis une plateforme d'échange pour
   alimenter le compte. Le XRPL exige une réserve de base de 1 XRP,
   envoyez donc au moins 2 XRP sous peine d'échec de la transaction.
7. Dans **Settings → Security**, activez Face ID / empreinte digitale
   et fixez un PIN à 6 chiffres.
8. Pour utiliser une dApp : ouvrez la dApp dans le navigateur du
   téléphone, appuyez sur "Connect Xaman", puis approuvez la demande de
   signature dans l'application Xaman. Vous ne collerez jamais votre
   secret dans la dApp.

Facultatif mais recommandé : associez Xaman à une carte Tangem ou un
Ledger pour que le secret ne réside jamais sur votre téléphone.
Settings → Accounts → Add account → Import from hardware.

---

## 4. Configuration de Crossmark (bureau, gratuit, pour les dApps de navigateur)

Crossmark est le "MetaMask du XRPL". Il vit dans votre navigateur sous
forme d'extension, ce qui en fait le moyen le plus simple d'utiliser
les dApps XRPL depuis un ordinateur portable.

1. Allez directement sur **https://crossmark.io** (pas via une
   recherche — de fausses extensions existent). Cliquez sur **Install
   for Chrome / Brave / Edge**.
2. Vérifiez que l'éditeur de l'extension est bien **Crossmark** avant
   de l'ajouter.
3. Ouvrez l'extension et choisissez **Create new wallet**.
4. Notez la phrase de 24 mots sur papier. Conservez-la physiquement,
   pas dans un gestionnaire de mots de passe, et jamais dans le cloud.
5. Définissez un mot de passe d'extension robuste — il ne déverrouille
   l'extension que sur votre machine et ne vous protège pas en cas de
   fuite de la phrase.
6. Alimentez le compte avec 2+ XRP depuis une plateforme d'échange
   pour couvrir la réserve de base.
7. Pour utiliser une dApp : ouvrez le site de la dApp, cliquez sur
   "Connect Crossmark", puis approuvez depuis le popup de l'extension.
   Lisez toujours le contenu de la transaction — token, montant,
   destination — avant de signer.
8. **Épinglez l'extension** à votre barre d'outils pour repérer les
   faux popups. Les vraies invites Crossmark proviennent toujours de
   l'icône épinglée.

Astuce : conservez un profil Crossmark séparé pour les "expériences
DeFi" avec un petit solde, et un Xaman + portefeuille matériel pour
vos avoirs de long terme. Ne connectez jamais votre portefeuille
principal à une dApp toute neuve.

---

## 5. Le kit de cinq liens d'urgence

Mettez-les en favoris. Si quelque chose cloche, l'un d'eux vous dira
pourquoi.

- Explorateur de blocs : https://bithomp.com
- Explorateur alternatif : https://xrpscan.com
- Vérification trustline / token : https://xrpl.services
- Documentation officielle XRPL : https://xrpl.org
- Notre classement de dApps en direct : https://allthingsxrpl.com/dapps

---

## 6. À lire ensuite

- Meilleures dApps DeFi XRPL en 2026 — https://allthingsxrpl.com/dapps
- Meilleurs portefeuilles pour DeFi XRPL — https://allthingsxrpl.com/best-for/defi
- Test complet de Xaman — https://allthingsxrpl.com/wallet/xaman
- Test complet de Crossmark — https://allthingsxrpl.com/wallet/crossmark
- Sécurité de l'AMM en profondeur — https://allthingsxrpl.com/blog

---

Vous êtes sur notre liste. Nous envoyons un court e-mail par semaine
avec les nouveaux lancements DeFi XRPL que nous avons personnellement
testés, ainsi que toute alerte de sécurité urgente.

— L'équipe éditoriale All Things XRPL

# All Things XRPL — Kit inicial de DeFi no XRPL

Bem-vindo ao DeFi no XRP Ledger. Este kit mostra as dApps que vale a
pena experimentar primeiro, as verificações de segurança que protegem
seu dinheiro antes de tocar num AMM ou trustline, e exatamente como
configurar as duas carteiras que você vai usar no dia a dia: Xaman e
Crossmark.

Imprima, faça uma captura de tela ou deixe aberto numa aba — todos os
links funcionam em celular e desktop.

---

## 1. Quais dApps do XRPL experimentar primeiro

O XRPL tem um ecossistema DeFi pequeno e focado. Você não precisa
aprender vinte protocolos. Comece com estas cinco — nesta ordem — e em
menos de uma tarde já terá usado o AMM, o DEX, um marketplace de NFT e
um mercado de empréstimos on-chain.

| #  | dApp              | O que é                                       | Experimente primeiro                                         |
|----|-------------------|-----------------------------------------------|--------------------------------------------------------------|
| 1  | XPMarket          | Launchpad de tokens + painel de AMM           | Troque 1 XRP por qualquer token listado e veja o AMM atender |
| 2  | Sologenic DEX     | DEX nativo do XRPL com livro de ordens        | Coloque uma ordem limite por um pequeno IOU em USD           |
| 3  | XRP.Cafe          | O maior marketplace de NFT do XRPL            | Veja um mint gratuito, varra um NFT do piso por menos de 5 XRP|
| 4  | Magnetic X        | Empréstimo + perps no XRPL (sidechain EVM)    | Faça bridge de 5 XRP, deposite em um pool de empréstimo      |
| 5  | First Ledger      | Rastreador de memecoins e novos tokens        | Filtre por volume 24h e cheque a liquidez antes de comprar   |

Análises completas, capturas e rankings atuais:
https://allthingsxrpl.com/dapps

Regra de ouro: se uma dApp pedir para importar sua frase semente em um
site, feche a aba. dApps reais do XRPL conectam via Xaman ou Crossmark
— elas nunca veem seu segredo.

---

## 2. Checklist de segurança para trustline e AMM

A maior parte do dinheiro perdido em DeFi do XRPL não é perdida em
"hacks". É perdida com trustlines abertas em tokens fraudulentos e em
AMMs entrados sem verificar os dois lados do pool. Passe por esta lista
toda vez antes de assinar.

### Antes de definir uma trustline

- [ ] O endereço do emissor corresponde ao oficial do site do projeto
      (copie e cole, nunca digite).
- [ ] O token tem entrada verificada no Bithomp ou XRPSCAN — não só
      logo e link de Telegram.
- [ ] Você definiu um **limite sensato** na trustline (por ex. 10.000),
      não o "sem limite" padrão. Uma trustline sem limite permite a um
      emissor malicioso emitir tokens infinitos para sua carteira.
- [ ] Você entende a **taxa de transferência** que o emissor definiu.
      Acima de 1 % é incomum para um projeto real.
- [ ] Está tudo bem reservar 2 XRP por trustline (ficam bloqueados, não
      gastos — você recupera ao remover a trustline).

### Antes de depositar num AMM

- [ ] Os dois lados do pool têm **liquidez real e negociada** — não
      apenas um único LP detendo 99 % das cotas.
- [ ] Você leu o spread atual e o volume 24h. Um pool com 0 $ de
      volume diário não gera taxa, não importa o que diz o widget de
      APR.
- [ ] Você entende **perda impermanente**: se o preço mudar, você
      acaba com mais do ativo perdedor e menos do vencedor. Só fica no
      zero se ambos os preços voltarem.
- [ ] Você deposita um valor que pode deixar por **pelo menos 30 dias**.
      Posições LP de AMM no XRPL têm um pequeno custo de saída.
- [ ] Você **nunca** clicou num contrato de "auto-compound" ou "boost
      APR". O AMM nativo do XRPL não tem essa função — esses links são
      golpes.

### Depois de assinar

- [ ] Abra o Bithomp, cole seu endereço e confirme que a trustline ou
      depósito no AMM aparece exatamente como você esperava.
- [ ] Se algo parece errado — emissor errado, valor errado, token
      desconhecido — remova a trustline imediatamente. Você pode
      readicioná-la depois.

---

## 3. Configuração da Xaman (celular, grátis, sua carteira do dia a dia)

A Xaman é feita pela XRPL Labs (a mesma equipe que opera um validador
do XRPL). É a carteira à qual a maioria das dApps do XRPL se conecta
por padrão.

1. Instale a **Xaman** pela App Store ou Google Play. Confirme que o
   desenvolvedor é **XRPL Labs B.V.** antes de tocar em instalar.
2. Abra o app e escolha **Create a new account**.
3. Escolha **Full access** (você controla o segredo) — não "Read only".
4. Escolha a opção **Secret Numbers**, não a frase mnemônica de 24
   palavras. Os Secret Numbers são nativos do XRPL e mais fáceis de
   guardar em papel.
5. Anote suas 8 linhas de Secret Numbers em papel, em ordem. Guarde o
   papel em um lugar à prova de fogo. **Não tire foto. Não digite em
   nenhum lugar fora da Xaman.**
6. Envie seus primeiros 10 XRP de uma corretora para fundear a conta.
   O XRPL exige reserva base de 1 XRP, então envie pelo menos 2 XRP ou
   a transação falhará.
7. Em **Settings → Security**, ative Face ID / digital e defina um PIN
   de 6 dígitos.
8. Para usar uma dApp: abra a dApp no navegador do celular, toque em
   "Connect Xaman" e aprove a solicitação dentro do app Xaman. Você
   nunca colará seu segredo na dApp.

Opcional, mas recomendado: pareie a Xaman com um cartão Tangem ou
Ledger para que o segredo nunca fique no celular. Settings → Accounts
→ Add account → Import from hardware.

---

## 4. Configuração da Crossmark (desktop, grátis, para dApps no navegador)

A Crossmark é a "MetaMask do XRPL". Vive no navegador como extensão,
o que a torna o jeito mais fácil de usar dApps do XRPL no laptop.

1. Vá direto em **https://crossmark.io** (não pesquise — existem
   extensões falsas). Clique em **Install for Chrome / Brave / Edge**.
2. Verifique que o editor da extensão é **Crossmark** antes de
   adicioná-la.
3. Abra a extensão e escolha **Create new wallet**.
4. Anote a frase de 24 palavras em papel. Guarde fisicamente, não em
   gerenciador de senhas, e nunca em nuvem.
5. Defina uma senha forte para a extensão — ela só desbloqueia a
   extensão na sua máquina, não te protege se a frase vazar.
6. Fundeie a conta com 2+ XRP de uma corretora para atender à reserva
   base.
7. Para usar uma dApp: abra o site, clique em "Connect Crossmark" e
   aprove no popup da extensão. Sempre leia o conteúdo da transação
   — token, valor, destino — antes de assinar.
8. **Fixe a extensão** na barra de ferramentas para reconhecer popups
   falsos. Os prompts reais da Crossmark sempre vêm do ícone fixado.

Dica: mantenha um perfil Crossmark separado para "experimentos DeFi"
com saldo pequeno, e uma Xaman + carteira de hardware para
participações de longo prazo. Nunca conecte sua carteira principal a
uma dApp recém-lançada.

---

## 5. O kit de emergência de cinco links

Salve nos favoritos. Se algo parecer errado, um deles vai te dizer o
porquê.

- Explorador de blocos: https://bithomp.com
- Explorador alternativo: https://xrpscan.com
- Verificação de trustline / token: https://xrpl.services
- Documentação oficial do XRPL: https://xrpl.org
- Nosso ranking de dApps em tempo real: https://allthingsxrpl.com/dapps

---

## 6. O que ler em seguida

- Melhores dApps DeFi do XRPL em 2026 — https://allthingsxrpl.com/dapps
- Melhores carteiras para DeFi XRPL — https://allthingsxrpl.com/best-for/defi
- Análise completa da Xaman — https://allthingsxrpl.com/wallet/xaman
- Análise completa da Crossmark — https://allthingsxrpl.com/wallet/crossmark
- Mergulho em segurança de AMM — https://allthingsxrpl.com/blog

---

Você está na nossa lista. Enviamos um e-mail curto por semana com os
novos lançamentos DeFi do XRPL que testamos pessoalmente, mais qualquer
alerta urgente de segurança.

— A equipe editorial da All Things XRPL

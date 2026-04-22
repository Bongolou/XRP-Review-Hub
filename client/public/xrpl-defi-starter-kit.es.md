# All Things XRPL — Kit de inicio para DeFi en XRPL

Bienvenido al DeFi sobre XRP Ledger. Esta guía te muestra las dApps que
vale la pena probar primero, los controles de seguridad que protegen tu
dinero antes de tocar un AMM o una trustline, y cómo configurar
exactamente las dos carteras que usarás a diario: Xaman y Crossmark.

Imprímelo, hazle una captura o déjalo abierto en una pestaña — todos los
enlaces funcionan en móvil y escritorio.

---

## 1. Qué dApps de XRPL probar primero

XRPL tiene un ecosistema DeFi pequeño y enfocado. No necesitas aprender
veinte protocolos. Empieza con estas cinco — en este orden — y en menos
de una tarde habrás usado el AMM, el DEX, un mercado de NFT y un mercado
de préstamos on-chain.

| #  | dApp              | Qué es                                       | Prueba esto primero                                          |
|----|-------------------|----------------------------------------------|--------------------------------------------------------------|
| 1  | XPMarket          | Plataforma de tokens + panel AMM             | Cambia 1 XRP por cualquier token listado y observa el AMM    |
| 2  | Sologenic DEX     | DEX nativo de XRPL con libro de órdenes      | Pon una orden límite por una cantidad pequeña de IOU en USD  |
| 3  | XRP.Cafe          | El mayor mercado de NFT del XRPL             | Mira un mint gratis, barre un NFT del suelo por menos de 5 XRP|
| 4  | Magnetic X        | Préstamos + perps en XRPL (sidechain EVM)    | Puentea 5 XRP a la sidechain y deposítalo en un pool         |
| 5  | First Ledger      | Rastreador de memecoins y nuevos tokens      | Filtra por volumen 24h, comprueba la liquidez antes de comprar|

Análisis completos, capturas y rankings actuales:
https://allthingsxrpl.com/dapps

Regla práctica: si una dApp te pide importar tu frase semilla en un
sitio web, cierra la pestaña. Las dApps reales del XRPL se conectan
mediante Xaman o Crossmark — nunca ven tu secreto.

---

## 2. Lista de seguridad para trustlines y AMM

La mayoría del dinero perdido en DeFi de XRPL no se pierde por "hackeos".
Se pierde por trustlines abiertas a tokens fraudulentos y por entrar a
AMM sin revisar los dos lados del pool. Repasa esta lista cada vez antes
de firmar.

### Antes de configurar una trustline

- [ ] La dirección del emisor coincide con la oficial del sitio web del
      proyecto (copia y pega, nunca escribas a mano).
- [ ] El token tiene una entrada verificada en Bithomp o XRPSCAN — no
      solo un logo y un grupo de Telegram.
- [ ] Has fijado un **límite razonable** en la trustline (por ejemplo
      10 000), no el "sin límite" por defecto. Una trustline sin límite
      permite a un emisor malicioso acuñar tokens infinitos en tu cartera.
- [ ] Entiendes la **comisión de transferencia** del emisor. Cualquier
      valor por encima del 1 % es inusual para un proyecto real.
- [ ] Te parece bien reservar 2 XRP por cada trustline (queda bloqueado,
      no gastado — lo recuperas al eliminar la trustline).

### Antes de depositar en un AMM

- [ ] Ambos lados del pool tienen **liquidez real** y operada — no solo
      un único LP con el 99 % de las participaciones.
- [ ] Has revisado el spread actual y el volumen 24h. Un pool con 0 $ de
      volumen diario no genera comisiones, por mucho que diga el APR.
- [ ] Entiendes la **pérdida impermanente**: si la proporción de precios
      cambia, acabarás con más del activo perdedor y menos del ganador.
      Solo recuperas el equilibrio si ambos precios se recuperan.
- [ ] Vas a depositar una cantidad que puedes dejar **al menos 30 días**.
      Las posiciones LP del AMM en XRPL tienen un pequeño coste de salida.
- [ ] **Nunca** has hecho clic en un contrato de "auto-compound" o
      "boost APR". El AMM nativo del XRPL no tiene esa función — esos
      enlaces son estafas.

### Después de firmar

- [ ] Abre Bithomp, pega tu dirección y comprueba que la trustline o el
      depósito en el AMM aparece exactamente como esperabas.
- [ ] Si algo no cuadra — emisor erróneo, importe erróneo, token
      desconocido — elimina la trustline de inmediato. Siempre la puedes
      volver a añadir.

---

## 3. Configuración de Xaman (móvil, gratis, tu cartera diaria)

Xaman está hecha por XRPL Labs (el mismo equipo que opera un validador
del XRPL). Es la cartera a la que se conectan por defecto la mayoría de
las dApps de XRPL.

1. Instala **Xaman** desde la App Store o Google Play. Confirma que el
   desarrollador es **XRPL Labs B.V.** antes de pulsar instalar.
2. Abre la app y elige **Crear una cuenta nueva**.
3. Elige **Acceso completo** (tú controlas el secreto) — no "Solo lectura".
4. Elige la opción **Secret Numbers**, no la frase mnemotécnica de 24
   palabras. Los Secret Numbers son nativos de XRPL y más fáciles de
   guardar en papel.
5. Escribe tus 8 filas de Secret Numbers en papel, en orden. Guarda el
   papel en un sitio a prueba de fuego. **No le hagas foto. No los
   escribas en nada que no sea Xaman.**
6. Envía tus primeros 10 XRP desde un exchange para fondear la cuenta.
   El XRPL exige una reserva base de 1 XRP, así que envía al menos 2 XRP
   o la transacción fallará.
7. En **Ajustes → Seguridad**, activa Face ID / huella y pon un PIN de
   6 dígitos.
8. Para usar una dApp: abre la dApp en el navegador del móvil, pulsa
   "Connect Xaman" y aprueba la firma desde la app de Xaman. Nunca
   pegarás tu secreto en la dApp.

Opcional pero recomendado: empareja Xaman con una tarjeta Tangem o un
Ledger para que el secreto no viva en el teléfono. Ajustes → Cuentas →
Añadir cuenta → Importar desde hardware.

---

## 4. Configuración de Crossmark (escritorio, gratis, para dApps en navegador)

Crossmark es el "MetaMask del XRPL". Vive en el navegador como
extensión, lo que la convierte en la forma más fácil de usar dApps de
XRPL desde un portátil.

1. Ve a **https://crossmark.io** directamente (no busques — existen
   extensiones falsas). Pulsa **Install for Chrome / Brave / Edge**.
2. Verifica que el editor de la extensión es **Crossmark** antes de
   añadirla.
3. Abre la extensión y elige **Create new wallet**.
4. Escribe la frase semilla de 24 palabras en papel. Guárdala en
   físico, nunca en un gestor de contraseñas ni en la nube.
5. Pon una contraseña fuerte para la extensión — solo desbloquea la
   extensión en tu equipo, no te protege si la semilla se filtra.
6. Fondea la cuenta con 2+ XRP desde un exchange para cubrir la
   reserva base.
7. Para usar una dApp: abre el sitio, pulsa "Connect Crossmark" y
   aprueba desde el popup de la extensión. Lee siempre la transacción
   — token, importe y destino — antes de firmar.
8. **Fija la extensión** en la barra para reconocer popups falsos. Los
   prompts reales de Crossmark siempre vienen del icono fijado.

Consejo: mantén un perfil aparte de Crossmark para "experimentos DeFi"
con poco saldo, y un Xaman + cartera hardware para tus tenencias a
largo plazo. Nunca conectes tu cartera principal a una dApp recién
estrenada.

---

## 5. El kit de emergencia de cinco enlaces

Guárdalos en favoritos. Si algo va mal, alguno te dirá por qué.

- Explorador de bloques: https://bithomp.com
- Explorador alternativo: https://xrpscan.com
- Verificación de trustlines y tokens: https://xrpl.services
- Documentación oficial del XRPL: https://xrpl.org
- Nuestro ranking de dApps en vivo: https://allthingsxrpl.com/dapps

---

## 6. Qué leer a continuación

- Mejores dApps DeFi de XRPL en 2026 — https://allthingsxrpl.com/dapps
- Mejores carteras para DeFi en XRPL — https://allthingsxrpl.com/best-for/defi
- Reseña completa de Xaman — https://allthingsxrpl.com/wallet/xaman
- Reseña completa de Crossmark — https://allthingsxrpl.com/wallet/crossmark
- Análisis de seguridad del AMM — https://allthingsxrpl.com/blog

---

Estás en nuestra lista. Enviamos un breve correo a la semana con los
nuevos lanzamientos DeFi de XRPL que hemos probado en persona, además
de cualquier alerta de seguridad urgente.

— El equipo editorial de All Things XRPL

# All Things XRPL — XRPL DeFi 入门工具包

欢迎来到 XRP Ledger 上的 DeFi。本工具包将带你了解最值得先尝试的
dApp、在接触 AMM 或信任线之前保护资金的安全检查，以及配置你日常会
真正用到的两款钱包：Xaman 与 Crossmark。

打印它、截图它，或在浏览器标签里保留它——所有链接在手机和桌面上
都可以点击。

---

## 1. 优先尝试哪些 XRPL dApp

XRPL 拥有一个小而专注的 DeFi 生态。你不需要学二十个协议。按下面的
顺序先用这五个，一个下午之内你就用过了 AMM、DEX、NFT 市场和链上借
贷市场。

| #  | dApp              | 是什么                                         | 先试这个                                                     |
|----|-------------------|------------------------------------------------|--------------------------------------------------------------|
| 1  | XPMarket          | 代币发射台 + AMM 仪表盘                        | 用 1 XRP 兑换任意上线代币，观察 AMM 成交                     |
| 2  | Sologenic DEX     | XRPL 原生订单簿 DEX（无 AMM）                  | 用很小的金额对 USD-IOU 挂一笔限价单                          |
| 3  | XRP.Cafe          | XRPL 上最大的 NFT 市场                         | 浏览一次免费铸造，扫一只 5 XRP 以下的地板 NFT                |
| 4  | Magnetic X        | XRPL 借贷 + 永续（EVM 侧链）                   | 把 5 XRP 跨到侧链，存入借贷池                                |
| 5  | First Ledger      | 模因币 / 新代币上线追踪                        | 按 24 小时成交量筛选，买入前先确认流动性                     |

完整深度评测、截图和最新排名：
https://allthingsxrpl.com/dapps

经验法则：如果一个 dApp 让你把助记词导入到网站里，立刻关掉页面。
真正的 XRPL dApp 通过 Xaman 或 Crossmark 连接——它们永远看不到你
的密钥。

---

## 2. 信任线 + AMM 安全清单

XRPL DeFi 中绝大多数被损失的资金，并不是因为"被黑"。它们是因为
对骗子代币开了信任线，或在没有检查池子两边的情况下加入了 AMM。
每次签名前都要把这份清单走一遍。

### 设置信任线之前

- [ ] 发行方地址与项目官网公布的官方地址一致（复制粘贴，永远不要
      手打）。
- [ ] 该代币在 Bithomp 或 XRPSCAN 上有已验证的条目——不只是一个
      Logo 和一个 Telegram 链接。
- [ ] 你已经为信任线设置了**合理的额度**（例如 10,000），而不是
      默认的"无上限"。无上限的信任线会让恶意发行方向你的钱包无限
      增发代币。
- [ ] 你了解发行方设置的**转账费**。任何高于 1% 的费率对真实项目
      来说都不正常。
- [ ] 你接受为每条信任线锁定 2 XRP 储备金（这只是被锁定，并未花
      掉——删除信任线后会退回）。

### 在向 AMM 存入之前

- [ ] 池子两边都有**真实、被交易的流动性**——不是只有一个 LP 持有
      99% 的份额。
- [ ] 你看过当前价差和 24 小时成交量。日成交量为 0 的池子无论 APR
      上写多少都赚不到手续费。
- [ ] 你理解**无常损失**：如果价格比例变化，你最终持有更多的下跌
      资产、更少的上涨资产。只有当两边价格都恢复时才能保本。
- [ ] 你存入的金额是你可以**至少放 30 天**的。XRPL 上的 AMM LP
      仓位有一笔小额的退出成本。
- [ ] 你**从未**点击过任何"自动复利"或"加速 APR"合约。XRPL 原生
      AMM 没有这种功能——这类链接都是骗局。

### 签名之后

- [ ] 打开 Bithomp，粘贴你的地址，确认信任线或 AMM 存款显示完全
      符合你的预期。
- [ ] 如果有任何不对——错误的发行方、错误的金额、不熟悉的代币——
      立刻移除信任线。你随时可以再加回去。

---

## 3. Xaman 设置（移动端、免费、日常主力）

Xaman 由 XRPL Labs 开发（同一团队也运营着一个 XRPL 验证节点）。
大多数 XRPL dApp 默认会连到这款钱包。

1. 从 App Store 或 Google Play 安装 **Xaman**。在点击安装前确认
   开发者是 **XRPL Labs B.V.**。
2. 打开 App，选择 **Create a new account**。
3. 选择 **Full access**（你掌握密钥）——不要选 "Read only"。
4. 选择 **Secret Numbers** 选项，而不是 24 单词助记词。Secret
   Numbers 是 XRPL 原生的，纸笔备份更方便。
5. 把 8 行 Secret Numbers 按顺序写在纸上。把这张纸放在防火的地方。
   **不要拍照。不要在 Xaman 之外的任何地方输入它。**
6. 从交易所先转入 10 XRP 来激活账户。XRPL 要求 1 XRP 的基础储备，
   所以至少要发 2 XRP，否则交易会失败。
7. 在 **Settings → Security** 里开启 Face ID / 指纹，并设置 6 位
   PIN 码。
8. 使用 dApp：在手机浏览器中打开 dApp，点击 "Connect Xaman"，在
   Xaman App 内确认签名请求。你永远不会把密钥粘贴到 dApp 中。

可选但推荐：把 Xaman 和 Tangem 卡或 Ledger 配对，这样密钥根本不会
存在手机上。Settings → Accounts → Add account → Import from
hardware。

---

## 4. Crossmark 设置（桌面端、免费、用于浏览器 dApp）

Crossmark 是 "XRPL 上的 MetaMask"。它以浏览器扩展形式存在，是从
笔记本上使用 XRPL dApp 最便捷的方式。

1. 直接访问 **https://crossmark.io**（不要搜索——存在仿冒扩展）。
   点击 **Install for Chrome / Brave / Edge**。
2. 添加之前确认扩展的发布者是 **Crossmark**。
3. 打开扩展，选择 **Create new wallet**。
4. 把 24 单词助记词写在纸上。物理保存，不要存入密码管理器，更不
   要放进任何云盘。
5. 设置一个强密码——这只解锁本机上的扩展，不会在助记词泄露时保护
   你。
6. 从交易所往账户转入 2+ XRP，以满足基础储备。
7. 使用 dApp：打开 dApp 网站，点击 "Connect Crossmark"，在扩展
   弹窗中确认。签名前一定要阅读交易内容——代币、金额、目标地址。
8. **将扩展固定**到工具栏，方便识别仿冒弹窗。真正的 Crossmark
   提示总是来自固定的图标。

小贴士：用一个独立的 Crossmark 资料"做 DeFi 实验"，余额少；长期
持有则用 Xaman + 硬件钱包。永远不要把主钱包连到全新的 dApp。

---

## 5. 五条链接的应急包

把它们加入收藏。一旦觉得不对劲，其中一个会告诉你原因。

- 区块浏览器：https://bithomp.com
- 备选浏览器：https://xrpscan.com
- 信任线 / 代币验证：https://xrpl.services
- XRPL 官方文档：https://xrpl.org
- 我们的实时 dApp 排名：https://allthingsxrpl.com/dapps

---

## 6. 接下来读什么

- 2026 年最佳 XRPL DeFi dApp — https://allthingsxrpl.com/dapps
- 最佳 XRPL DeFi 钱包 — https://allthingsxrpl.com/best-for/defi
- Xaman 完整评测 — https://allthingsxrpl.com/wallet/xaman
- Crossmark 完整评测 — https://allthingsxrpl.com/wallet/crossmark
- AMM 安全深度解析 — https://allthingsxrpl.com/blog

---

你已经在我们的订阅列表里。我们每周会发一封简短邮件，介绍我们亲自
测试过的新 XRPL DeFi 项目，以及任何紧急安全提醒。

— All Things XRPL 编辑团队

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const logoPath = path.join(root, "client/src/assets/logos/allthingsxrpl-logo.png");
const outDir = path.join(root, "client/public/downloads");
const outPath = path.join(outDir, "xrpl-wallet-starter-kit.pdf");

fs.mkdirSync(outDir, { recursive: true });

const BRAND_BLUE = "#0B3D91";
const ACCENT = "#1FB6FF";
const TEXT = "#1f2937";
const MUTED = "#6b7280";
const RULE = "#e5e7eb";
const BG_SOFT = "#f3f6fb";

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 64, bottom: 24, left: 64, right: 64 },
  info: {
    Title: "XRPL Wallet Starter Kit — All Things XRPL",
    Author: "All Things XRPL",
    Subject: "Your first 60 minutes on the XRP Ledger",
    Keywords: "XRPL, XRP, wallet, Xaman, Ledger, Trezor, Tangem, Crossmark",
  },
});

doc.pipe(fs.createWriteStream(outPath));

const pageWidth = doc.page.width;
const pageHeight = doc.page.height;
const left = doc.page.margins.left;
const right = pageWidth - doc.page.margins.right;
const contentWidth = right - left;

let pageNum = 0;
let inChrome = false;

function drawPageChrome() {
  pageNum += 1;
  if (pageNum === 1) return;
  if (inChrome) return;
  inChrome = true;
  const savedY = doc.y;
  const savedX = doc.x;
  doc.save();
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, left, 28, { width: 22, height: 22 });
  }
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(BRAND_BLUE)
    .text("All Things XRPL", left + 30, 34, { lineBreak: false });
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(MUTED)
    .text("XRPL Wallet Starter Kit", 0, 34, {
      align: "right",
      width: right,
    });
  doc
    .strokeColor(RULE)
    .lineWidth(0.5)
    .moveTo(left, 56)
    .lineTo(right, 56)
    .stroke();

  doc
    .strokeColor(RULE)
    .lineWidth(0.5)
    .moveTo(left, pageHeight - 44)
    .lineTo(right, pageHeight - 44)
    .stroke();
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(MUTED)
    .text("allthingsxrpl.com", left, pageHeight - 36, { lineBreak: false });
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(MUTED)
    .text(`Page ${pageNum - 1}`, 0, pageHeight - 36, {
      align: "right",
      width: right,
      lineBreak: false,
    });
  doc.restore();
  doc.y = savedY;
  doc.x = savedX;
  inChrome = false;
}

doc.on("pageAdded", drawPageChrome);
drawPageChrome();

// ---------- COVER ----------
doc.save();
doc.rect(0, 0, pageWidth, pageHeight).fill(BRAND_BLUE);
doc.rect(0, 0, 8, pageHeight).fill(ACCENT);
doc.restore();

if (fs.existsSync(logoPath)) {
  doc.image(logoPath, left, 110, { width: 90, height: 90 });
}

doc
  .font("Helvetica-Bold")
  .fontSize(12)
  .fillColor("#cfe6ff")
  .text("ALL THINGS XRPL", left, 220, { characterSpacing: 2 });

doc
  .font("Helvetica-Bold")
  .fontSize(36)
  .fillColor("#ffffff")
  .text("Wallet", left, 250, { lineGap: 4 })
  .text("Starter Kit", left);

doc
  .font("Helvetica")
  .fontSize(14)
  .fillColor("#cfe6ff")
  .text(
    "Everything we recommend a new XRP holder do in their first 60 minutes.",
    left,
    370,
    { width: contentWidth - 40, lineGap: 4 }
  );

doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor("#ffffff")
  .text("What's inside", left, pageHeight - 200, { characterSpacing: 1 });

const coverItems = [
  "1.  Pick the right wallet for your situation",
  "2.  The 60-minute setup checklist",
  "3.  Five mistakes we see new XRP holders make",
  "4.  Where to learn more",
];
doc.font("Helvetica").fontSize(11).fillColor("#e6f1ff");
let y = pageHeight - 180;
for (const item of coverItems) {
  doc.text(item, left, y, { width: contentWidth - 40 });
  y += 18;
}

doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor("#9ec5f0")
  .text("allthingsxrpl.com", left, pageHeight - 50, { lineBreak: false });

// ---------- BODY ----------
doc.addPage();
doc.fillColor(TEXT);
doc.y = 80;

function ensureSpace(needed) {
  if (doc.y + needed > pageHeight - 70) {
    doc.addPage();
  }
}

function h1(text) {
  ensureSpace(60);
  doc
    .moveDown(0.5)
    .font("Helvetica-Bold")
    .fontSize(20)
    .fillColor(BRAND_BLUE)
    .text(text, { width: contentWidth });
  doc
    .strokeColor(ACCENT)
    .lineWidth(2)
    .moveTo(left, doc.y + 4)
    .lineTo(left + 40, doc.y + 4)
    .stroke();
  doc.moveDown(1);
  doc.fillColor(TEXT);
}

function paragraph(text) {
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(TEXT)
    .text(text, { width: contentWidth, lineGap: 3, align: "left" });
  doc.moveDown(0.6);
}

function paragraphRichLink(prefix, label, url) {
  doc.font("Helvetica").fontSize(11).fillColor(TEXT);
  doc.text(prefix, { lineGap: 3, continued: true });
  doc.fillColor(ACCENT).text(label, { link: url, underline: true, lineGap: 3 });
  doc.fillColor(TEXT);
  doc.moveDown(0.6);
}

function numberedStep(n, text) {
  ensureSpace(24);
  const startY = doc.y;
  doc
    .circle(left + 8, startY + 8, 9)
    .fillAndStroke(BRAND_BLUE, BRAND_BLUE);
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#ffffff")
    .text(String(n), left, startY + 4, {
      width: 16,
      align: "center",
      lineBreak: false,
    });
  doc.fillColor(TEXT);
  doc
    .font("Helvetica")
    .fontSize(11)
    .text(text, left + 24, startY, {
      width: contentWidth - 24,
      lineGap: 3,
    });
  doc.moveDown(0.4);
}

function table(headers, rows, colWidths) {
  ensureSpace(60);
  const rowPad = 6;
  const startX = left;
  let y = doc.y;
  doc.save();
  doc.rect(startX, y, contentWidth, 22).fill(BRAND_BLUE);
  doc.restore();
  doc.font("Helvetica-Bold").fontSize(10).fillColor("#ffffff");
  let x = startX;
  for (let i = 0; i < headers.length; i++) {
    doc.text(headers[i], x + rowPad, y + 6, {
      width: colWidths[i] - rowPad * 2,
      lineBreak: false,
    });
    x += colWidths[i];
  }
  y += 22;
  doc.fillColor(TEXT).font("Helvetica").fontSize(9.5);
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    let cellH = 0;
    for (let i = 0; i < row.length; i++) {
      const h = doc.heightOfString(row[i], {
        width: colWidths[i] - rowPad * 2,
        lineGap: 2,
      });
      if (h > cellH) cellH = h;
    }
    const rowH = cellH + rowPad * 2;
    if (y + rowH > pageHeight - 70) {
      doc.addPage();
      y = doc.y;
    }
    if (r % 2 === 1) {
      doc.save();
      doc.rect(startX, y, contentWidth, rowH).fill(BG_SOFT);
      doc.restore();
    }
    let cx = startX;
    doc.fillColor(TEXT).font("Helvetica").fontSize(9.5);
    for (let i = 0; i < row.length; i++) {
      doc.text(row[i], cx + rowPad, y + rowPad, {
        width: colWidths[i] - rowPad * 2,
        lineGap: 2,
      });
      cx += colWidths[i];
    }
    doc
      .strokeColor(RULE)
      .lineWidth(0.5)
      .moveTo(startX, y + rowH)
      .lineTo(startX + contentWidth, y + rowH)
      .stroke();
    y += rowH;
  }
  doc.y = y + 10;
}

function bulletLink(label, url) {
  ensureSpace(20);
  const startY = doc.y;
  doc
    .circle(left + 3, startY + 6, 2)
    .fill(BRAND_BLUE);
  doc.fillColor(TEXT).font("Helvetica").fontSize(11);
  doc.text(label + " — ", left + 14, startY, { continued: true, lineGap: 3 });
  doc
    .fillColor(ACCENT)
    .text(url, { link: url, underline: true, lineGap: 3 });
  doc.fillColor(TEXT);
  doc.moveDown(0.2);
}

// Intro (verbatim from markdown)
paragraph(
  "Welcome to the XRP Ledger. This one-page kit summarises everything we " +
    "recommend a new XRP holder do in their first 60 minutes."
);

// 1
h1("1. Pick the right wallet for your situation");

table(
  ["Goal", "Our pick", "Why"],
  [
    ["Just getting started, free", "Xaman (XUMM)", "Built by XRPL Labs, full DEX/AMM/NFT support"],
    ["Cold storage of larger holdings", "Ledger Nano X", "Industry-standard secure element, multi-chain"],
    ["Affordable hardware", "Trezor Safe 3", "Open-source firmware, secure element, $79"],
    ["Card-style hardware", "Tangem", "NFC tap-to-sign, $54.90, no seed phrase to lose"],
    ["Maximum security (air-gapped)", "ELLIPAL Titan", "No USB / Bluetooth / Wi-Fi — QR codes only"],
    ["Browser-based dApp use", "Crossmark", "MetaMask-style UX for the XRPL on desktop"],
  ],
  [170, 110, contentWidth - 170 - 110]
);

paragraphRichLink(
  "Full reviews: ",
  "https://allthingsxrpl.com/best-xrp-wallets",
  "https://allthingsxrpl.com/best-xrp-wallets"
);

// 2
h1("2. The 60-minute setup checklist");

const setupSteps = [
  "Buy your wallet from the official source. Never an Amazon reseller.",
  "Set up the device offline first. Do not enter your seed phrase on any computer, ever.",
  "Write your seed phrase / secret numbers on paper, then store the paper somewhere fire-safe and out of sight. Do not photograph it.",
  "Create a small test transaction (1 XRP) and verify it arrives before moving any larger amount.",
  "Bookmark only the official wallet URL. Phishing sites are the #1 way XRP holders lose funds.",
];
setupSteps.forEach((s, i) => numberedStep(i + 1, s));

// 3
h1("3. Five mistakes we see new XRP holders make");

const mistakeSteps = [
  "Storing the seed phrase in cloud notes, email, or a password manager.",
  "Sending XRP to an exchange without the destination tag.",
  "Believing \u201CRipple\u201D giveaway videos on YouTube. They are all scams.",
  "Approving trustlines for unknown tokens \u2014 this can authorise spending.",
  "Putting the entire portfolio in a single hot wallet on a phone they also use for general browsing.",
];
mistakeSteps.forEach((s, i) => numberedStep(i + 1, s));

// 4
h1("4. Where to learn more");
bulletLink("Best XRP wallets, ranked", "https://allthingsxrpl.com/best-xrp-wallets");
bulletLink("Best for beginners", "https://allthingsxrpl.com/best-for/beginners");
bulletLink("Best cold-storage setup", "https://allthingsxrpl.com/best-for/cold-storage");
bulletLink("Best for XRPL DeFi", "https://allthingsxrpl.com/best-for/defi");

doc.moveDown(1.2);
ensureSpace(80);
doc
  .strokeColor(RULE)
  .lineWidth(0.5)
  .moveTo(left, doc.y)
  .lineTo(right, doc.y)
  .stroke();
doc.moveDown(0.8);
paragraph(
  "Questions? Reply to the welcome email \u2014 a real person reads every one."
);
doc
  .font("Helvetica-Oblique")
  .fontSize(11)
  .fillColor(MUTED)
  .text("\u2014 The All Things XRPL editorial team", { width: contentWidth });

doc.end();
console.log("Wrote", outPath);

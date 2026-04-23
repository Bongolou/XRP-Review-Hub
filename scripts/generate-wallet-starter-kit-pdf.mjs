import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const logoPath = path.join(root, "client/src/assets/logos/allthingsxrpl-logo.png");
const outDir = path.join(root, "client/public/downloads");
const sourceDir = path.join(root, "client/public");

fs.mkdirSync(outDir, { recursive: true });

const BRAND_BLUE = "#0B3D91";
const ACCENT = "#1FB6FF";
const TEXT = "#1f2937";
const MUTED = "#6b7280";
const RULE = "#e5e7eb";
const BG_SOFT = "#f3f6fb";

const LANGS = ["en", "es", "zh", "ja", "ko", "pt", "de", "fr"];

const CJK_SUBFONT = {
  zh: { regular: "SourceHanSansSC-Regular", bold: "SourceHanSansSC-Bold" },
  ja: { regular: "SourceHanSans-Regular", bold: "SourceHanSans-Bold" },
  ko: { regular: "SourceHanSansK-Regular", bold: "SourceHanSansK-Bold" },
};

const LABELS = {
  en: {
    eyebrow: "ALL THINGS XRPL",
    headerName: "XRPL Wallet Starter Kit",
    coverTitle: ["Wallet", "Starter Kit"],
    inside: "What's inside",
    page: "Page",
  },
  es: {
    eyebrow: "ALL THINGS XRPL",
    headerName: "Kit de inicio para carteras XRPL",
    coverTitle: ["Kit de inicio", "para carteras"],
    inside: "Qué hay dentro",
    page: "Página",
  },
  zh: {
    eyebrow: "ALL THINGS XRPL",
    headerName: "XRPL 钱包入门工具包",
    coverTitle: ["钱包", "入门工具包"],
    inside: "内容简介",
    page: "第",
  },
  ja: {
    eyebrow: "ALL THINGS XRPL",
    headerName: "XRPL ウォレット スターターキット",
    coverTitle: ["ウォレット", "スターターキット"],
    inside: "収録内容",
    page: "ページ",
  },
  ko: {
    eyebrow: "ALL THINGS XRPL",
    headerName: "XRPL 지갑 스타터 키트",
    coverTitle: ["지갑", "스타터 키트"],
    inside: "이 키트의 내용",
    page: "페이지",
  },
  pt: {
    eyebrow: "ALL THINGS XRPL",
    headerName: "Kit inicial de carteiras XRPL",
    coverTitle: ["Kit inicial", "de carteiras"],
    inside: "O que há dentro",
    page: "Página",
  },
  de: {
    eyebrow: "ALL THINGS XRPL",
    headerName: "XRPL Wallet Starter Kit",
    coverTitle: ["Wallet", "Starter Kit"],
    inside: "Was drin ist",
    page: "Seite",
  },
  fr: {
    eyebrow: "ALL THINGS XRPL",
    headerName: "Kit de démarrage XRPL Wallet",
    coverTitle: ["Kit de démarrage", "pour wallet"],
    inside: "Contenu du kit",
    page: "Page",
  },
};

function findSourceHanSans() {
  if (process.env.SOURCE_HAN_SANS_TTC && fs.existsSync(process.env.SOURCE_HAN_SANS_TTC)) {
    return process.env.SOURCE_HAN_SANS_TTC;
  }
  try {
    const out = execSync(
      "ls /nix/store 2>/dev/null | grep -E '^[a-z0-9]+-source-han-sans-[0-9.]+$'",
      { timeout: 30000 }
    )
      .toString()
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const dir of out) {
      const p = `/nix/store/${dir}/share/fonts/opentype/source-han-sans/SourceHanSans.ttc`;
      if (fs.existsSync(p)) return p;
    }
  } catch (_) {}
  return null;
}

const HAN_SANS_PATH = findSourceHanSans();

// ------------------------------------------------------------------
// Markdown parser — small, scoped to the structure of these documents.
// ------------------------------------------------------------------

function parseMarkdown(md) {
  const rawLines = md.split("\n");
  const blocks = [];
  let i = 0;
  while (i < rawLines.length) {
    const line = rawLines[i];
    if (line.match(/^#\s/)) {
      blocks.push({ type: "h1", text: line.replace(/^#\s+/, "").trim() });
      i++;
      continue;
    }
    if (line.match(/^##\s/)) {
      blocks.push({ type: "h2", text: line.replace(/^##\s+/, "").trim() });
      i++;
      continue;
    }
    if (line.match(/^###\s/)) {
      blocks.push({ type: "h3", text: line.replace(/^###\s+/, "").trim() });
      i++;
      continue;
    }
    if (line.match(/^---\s*$/)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }
    if (line.trim().startsWith("|")) {
      const tableLines = [];
      while (i < rawLines.length && rawLines[i].trim().startsWith("|")) {
        tableLines.push(rawLines[i]);
        i++;
      }
      const rows = tableLines.map((l) =>
        l
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim())
      );
      const headers = rows[0];
      const body = rows.slice(2);
      blocks.push({ type: "table", headers, rows: body });
      continue;
    }
    if (line.match(/^- \[ \]/)) {
      const items = [];
      while (i < rawLines.length && rawLines[i].match(/^- \[ \]/)) {
        let item = rawLines[i].replace(/^- \[ \]\s*/, "");
        i++;
        while (
          i < rawLines.length &&
          rawLines[i].match(/^\s{4,}\S/) &&
          !rawLines[i].match(/^\s*-\s/)
        ) {
          item += " " + rawLines[i].trim();
          i++;
        }
        items.push(item.trim());
      }
      blocks.push({ type: "checklist", items });
      continue;
    }
    if (line.match(/^\d+\.\s/)) {
      const items = [];
      while (i < rawLines.length && rawLines[i].match(/^\d+\.\s/)) {
        let item = rawLines[i].replace(/^\d+\.\s+/, "");
        i++;
        while (
          i < rawLines.length &&
          rawLines[i].match(/^\s{3,}\S/) &&
          !rawLines[i].match(/^\d+\.\s/)
        ) {
          item += " " + rawLines[i].trim();
          i++;
        }
        items.push(item.trim());
      }
      blocks.push({ type: "numlist", items });
      continue;
    }
    if (line.match(/^-\s/)) {
      const items = [];
      while (i < rawLines.length && rawLines[i].match(/^-\s/)) {
        let item = rawLines[i].replace(/^-\s+/, "");
        i++;
        while (
          i < rawLines.length &&
          rawLines[i].match(/^\s{2,}\S/) &&
          !rawLines[i].match(/^\s*-\s/)
        ) {
          item += " " + rawLines[i].trim();
          i++;
        }
        items.push(item.trim());
      }
      blocks.push({ type: "bullets", items });
      continue;
    }
    if (line.trim() === "") {
      i++;
      continue;
    }
    let text = line.trim();
    i++;
    while (
      i < rawLines.length &&
      rawLines[i].trim() !== "" &&
      !rawLines[i].match(/^[#\-|]/) &&
      !rawLines[i].match(/^\d+\.\s/) &&
      !rawLines[i].match(/^---\s*$/)
    ) {
      text += " " + rawLines[i].trim();
      i++;
    }
    blocks.push({ type: "p", text });
  }
  return blocks;
}

// Inline parsing: returns an array of { text, bold?, link? } runs.
function parseInline(text) {
  const runs = [];
  const segments = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  for (const seg of segments) {
    const isBold = /^\*\*[^*]+\*\*$/.test(seg);
    const inner = isBold ? seg.slice(2, -2) : seg;
    const urlRe = /(https?:\/\/[^\s\)\],。、）]+)/g;
    let last = 0;
    let m;
    while ((m = urlRe.exec(inner)) !== null) {
      if (m.index > last) {
        runs.push({ text: inner.slice(last, m.index), bold: isBold });
      }
      runs.push({ text: m[0], link: m[0] });
      last = m.index + m[0].length;
    }
    if (last < inner.length) {
      runs.push({ text: inner.slice(last), bold: isBold });
    }
  }
  return runs;
}

// ------------------------------------------------------------------
// Per-language PDF generation.
// ------------------------------------------------------------------

function generateForLanguage(lang) {
  const labels = LABELS[lang];
  const sourceFile =
    lang === "en"
      ? path.join(sourceDir, "xrpl-wallet-starter-kit.md")
      : path.join(sourceDir, `xrpl-wallet-starter-kit.${lang}.md`);
  const outPath =
    lang === "en"
      ? path.join(outDir, "xrpl-wallet-starter-kit.pdf")
      : path.join(outDir, `xrpl-wallet-starter-kit.${lang}.pdf`);

  if (!fs.existsSync(sourceFile)) {
    console.warn(`Skipping ${lang}: source not found at ${sourceFile}`);
    return;
  }

  const md = fs.readFileSync(sourceFile, "utf8");
  const blocks = parseMarkdown(md);

  const isCJK = !!CJK_SUBFONT[lang];
  if (isCJK && !HAN_SANS_PATH) {
    throw new Error(
      `Cannot render ${lang} PDF: Source Han Sans font not found. Install nix package 'source-han-sans' or set SOURCE_HAN_SANS_TTC.`
    );
  }

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 64, bottom: 24, left: 64, right: 64 },
    info: {
      Title: `${labels.headerName} — All Things XRPL`,
      Author: "All Things XRPL",
      Subject: "Your first 60 minutes on the XRP Ledger",
      Keywords: "XRPL, XRP, wallet, Xaman, Ledger, Trezor, Tangem, Crossmark",
    },
  });

  doc.pipe(fs.createWriteStream(outPath));

  if (isCJK) {
    const sub = CJK_SUBFONT[lang];
    doc.registerFont("body-regular", HAN_SANS_PATH, sub.regular);
    doc.registerFont("body-bold", HAN_SANS_PATH, sub.bold);
    doc.registerFont("body-oblique", HAN_SANS_PATH, sub.regular);
  } else {
    doc.registerFont("body-regular", "Helvetica");
    doc.registerFont("body-bold", "Helvetica-Bold");
    doc.registerFont("body-oblique", "Helvetica-Oblique");
  }

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
      .font("body-bold")
      .fontSize(9)
      .fillColor(BRAND_BLUE)
      .text("All Things XRPL", left + 30, 34, { lineBreak: false });
    doc
      .font("body-regular")
      .fontSize(9)
      .fillColor(MUTED)
      .text(labels.headerName, 0, 34, {
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
      .font("body-regular")
      .fontSize(8)
      .fillColor(MUTED)
      .text("allthingsxrpl.com", left, pageHeight - 36, { lineBreak: false });
    doc
      .font("body-regular")
      .fontSize(8)
      .fillColor(MUTED)
      .text(`${labels.page} ${pageNum - 1}`, 0, pageHeight - 36, {
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
    .font("body-bold")
    .fontSize(12)
    .fillColor("#cfe6ff")
    .text(labels.eyebrow, left, 220, { characterSpacing: 2 });

  doc
    .font("body-bold")
    .fontSize(36)
    .fillColor("#ffffff")
    .text(labels.coverTitle[0], left, 250, { lineGap: 4 })
    .text(labels.coverTitle[1], left);

  // Subtitle: first paragraph of the markdown body (after H1).
  const firstPara = blocks.find((b, idx) => b.type === "p" && idx > 0);
  const subtitle = firstPara ? firstPara.text : "";
  doc
    .font("body-regular")
    .fontSize(14)
    .fillColor("#cfe6ff")
    .text(subtitle, left, 370, { width: contentWidth - 40, lineGap: 4 });

  // What's inside — derived from H2 headings.
  doc
    .font("body-bold")
    .fontSize(10)
    .fillColor("#ffffff")
    .text(labels.inside, left, pageHeight - 220, { characterSpacing: 1 });

  const sectionTitles = blocks.filter((b) => b.type === "h2").map((b) => b.text);
  doc.font("body-regular").fontSize(11).fillColor("#e6f1ff");
  let cy = pageHeight - 200;
  for (const item of sectionTitles) {
    if (cy > pageHeight - 70) break;
    doc.text(item, left, cy, { width: contentWidth - 40 });
    cy += 18;
  }

  doc
    .font("body-regular")
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
      .font("body-bold")
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

  function h2(text) {
    ensureSpace(40);
    doc
      .moveDown(0.6)
      .font("body-bold")
      .fontSize(13)
      .fillColor(BRAND_BLUE)
      .text(text, { width: contentWidth });
    doc.moveDown(0.4);
    doc.fillColor(TEXT);
  }

  function paragraph(runs) {
    doc.font("body-regular").fontSize(11).fillColor(TEXT);
    if (typeof runs === "string") runs = parseInline(runs);
    for (let i = 0; i < runs.length; i++) {
      const p = runs[i];
      const isLast = i === runs.length - 1;
      const opts = { lineGap: 3, continued: !isLast };
      if (p.link) {
        doc.fillColor(ACCENT).font("body-regular");
        doc.text(p.text, { ...opts, link: p.link, underline: true });
        doc.fillColor(TEXT);
      } else if (p.bold) {
        doc.font("body-bold").text(p.text, opts);
        doc.font("body-regular");
      } else {
        doc.text(p.text, opts);
      }
    }
    doc.moveDown(0.6);
  }

  function checklistItem(text) {
    ensureSpace(28);
    const startY = doc.y;
    doc
      .strokeColor(BRAND_BLUE)
      .lineWidth(1)
      .rect(left, startY + 3, 10, 10)
      .stroke();
    const runs = parseInline(text);
    doc.font("body-regular").fontSize(11).fillColor(TEXT);
    doc.x = left + 20;
    doc.y = startY;
    for (let i = 0; i < runs.length; i++) {
      const p = runs[i];
      const isLast = i === runs.length - 1;
      const opts = {
        lineGap: 3,
        continued: !isLast,
        width: contentWidth - 20,
      };
      if (p.link) {
        doc.fillColor(ACCENT).text(p.text, { ...opts, link: p.link, underline: true });
        doc.fillColor(TEXT);
      } else if (p.bold) {
        doc.font("body-bold").text(p.text, opts);
        doc.font("body-regular");
      } else {
        doc.text(p.text, opts);
      }
    }
    doc.x = left;
    doc.moveDown(0.3);
  }

  function numberedStep(n, text) {
    ensureSpace(24);
    const startY = doc.y;
    doc.circle(left + 8, startY + 8, 9).fillAndStroke(BRAND_BLUE, BRAND_BLUE);
    doc
      .font("body-bold")
      .fontSize(10)
      .fillColor("#ffffff")
      .text(String(n), left, startY + 4, {
        width: 16,
        align: "center",
        lineBreak: false,
      });
    const runs = parseInline(text);
    doc.font("body-regular").fontSize(11).fillColor(TEXT);
    doc.x = left + 24;
    doc.y = startY;
    for (let i = 0; i < runs.length; i++) {
      const p = runs[i];
      const isLast = i === runs.length - 1;
      const opts = {
        lineGap: 3,
        continued: !isLast,
        width: contentWidth - 24,
      };
      if (p.link) {
        doc.fillColor(ACCENT).text(p.text, { ...opts, link: p.link, underline: true });
        doc.fillColor(TEXT);
      } else if (p.bold) {
        doc.font("body-bold").text(p.text, opts);
        doc.font("body-regular");
      } else {
        doc.text(p.text, opts);
      }
    }
    doc.x = left;
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
    doc.font("body-bold").fontSize(10).fillColor("#ffffff");
    let x = startX;
    for (let i = 0; i < headers.length; i++) {
      doc.text(headers[i], x + rowPad, y + 6, {
        width: colWidths[i] - rowPad * 2,
        lineBreak: false,
      });
      x += colWidths[i];
    }
    y += 22;
    doc.fillColor(TEXT).font("body-regular").fontSize(9.5);
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r];
      let cellH = 0;
      for (let i = 0; i < row.length; i++) {
        const h = doc.heightOfString(row[i] ?? "", {
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
      doc.fillColor(TEXT).font("body-regular").fontSize(9.5);
      for (let i = 0; i < row.length; i++) {
        doc.text(row[i] ?? "", cx + rowPad, y + rowPad, {
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
    doc.x = left;
  }

  function bulletItem(text) {
    ensureSpace(20);
    const startY = doc.y;
    doc.circle(left + 3, startY + 6, 2).fill(BRAND_BLUE);
    const m = text.match(/^(.*?)\s*[:—–-]\s*(https?:\/\/\S+)\s*$/);
    doc.font("body-regular").fontSize(11).fillColor(TEXT);
    doc.x = left + 14;
    doc.y = startY;
    if (m) {
      const label = m[1].trim();
      const url = m[2].trim();
      doc.text(label + " — ", { continued: true, lineGap: 3 });
      doc.fillColor(ACCENT).text(url, { link: url, underline: true, lineGap: 3 });
      doc.fillColor(TEXT);
    } else {
      const runs = parseInline(text);
      for (let i = 0; i < runs.length; i++) {
        const p = runs[i];
        const isLast = i === runs.length - 1;
        const opts = { lineGap: 3, continued: !isLast };
        if (p.link) {
          doc.fillColor(ACCENT).text(p.text, { ...opts, link: p.link, underline: true });
          doc.fillColor(TEXT);
        } else if (p.bold) {
          doc.font("body-bold").text(p.text, opts);
          doc.font("body-regular");
        } else {
          doc.text(p.text, opts);
        }
      }
    }
    doc.x = left;
    doc.moveDown(0.2);
  }

  // ---------- Render blocks ----------
  let skippedFirstPara = false;
  let signoffSeen = false;

  const lastHrIdx = blocks.map((b, i) => (b.type === "hr" ? i : -1)).filter((i) => i >= 0).pop();

  for (let idx = 0; idx < blocks.length; idx++) {
    const b = blocks[idx];
    if (b.type === "h1") continue;
    if (b.type === "p" && !skippedFirstPara) {
      skippedFirstPara = true;
      continue;
    }
    if (idx === lastHrIdx) {
      doc.moveDown(1.2);
      ensureSpace(80);
      doc
        .strokeColor(RULE)
        .lineWidth(0.5)
        .moveTo(left, doc.y)
        .lineTo(right, doc.y)
        .stroke();
      doc.moveDown(0.8);
      signoffSeen = true;
      continue;
    }
    if (b.type === "hr") continue;

    if (signoffSeen && b.type === "p") {
      if (b.text.trim().startsWith("—") || b.text.trim().startsWith("--")) {
        doc
          .font("body-oblique")
          .fontSize(11)
          .fillColor(MUTED)
          .text(b.text, { width: contentWidth });
      } else {
        paragraph(b.text);
      }
      continue;
    }

    switch (b.type) {
      case "h2":
        h1(b.text.replace(/^#+\s*/, ""));
        break;
      case "h3":
        h2(b.text);
        break;
      case "p":
        paragraph(b.text);
        break;
      case "table":
        {
          const headers = b.headers;
          const n = headers.length;
          let widths;
          if (n === 3) {
            widths = [170, 110, contentWidth - 170 - 110];
          } else {
            const w = contentWidth / n;
            widths = headers.map(() => w);
          }
          table(headers, b.rows, widths);
        }
        break;
      case "checklist":
        for (const item of b.items) checklistItem(item);
        break;
      case "numlist":
        b.items.forEach((it, i) => numberedStep(i + 1, it));
        break;
      case "bullets":
        for (const item of b.items) bulletItem(item);
        break;
    }
  }

  doc.end();
  console.log("Wrote", outPath);
}

for (const lang of LANGS) {
  generateForLanguage(lang);
}

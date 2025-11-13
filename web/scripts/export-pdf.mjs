import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");
const slidesPath = path.join(projectRoot, "content", "slides.json");

const slides = JSON.parse(fs.readFileSync(slidesPath, "utf-8"));
const outputDir = path.join(projectRoot, "public");
const outputPath = path.join(outputDir, "english-literature-daily-life.pdf");

fs.mkdirSync(outputDir, { recursive: true });

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 56, bottom: 64, left: 64, right: 64 }
});

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

const accent = "#8b5cf6";
const ink = "#1f2937";
const contentWidth =
  doc.page.width - doc.page.margins.left - doc.page.margins.right;

slides.forEach((slide, index) => {
  if (index !== 0) {
    doc.addPage();
  }

  doc
    .fillColor(accent)
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(`Slide ${index + 1}`, { align: "right" });

  doc.moveDown(0.5);

  doc
    .fillColor(ink)
    .font("Helvetica-Bold")
    .fontSize(28)
    .text(slide.title, { align: "left" });

  if (slide.tagline) {
    doc.moveDown(0.35);
    doc
      .font("Helvetica-Oblique")
      .fontSize(14)
      .fillColor("#4b5563")
      .text(slide.tagline, { align: "left" });
  }

  if (slide.highlight) {
    doc.moveDown(0.75);
    const highlightTop = doc.y;
    doc.font("Helvetica").fontSize(14);
    const highlightTextHeight = doc.heightOfString(slide.highlight, {
      width: contentWidth,
      lineGap: 4
    });
    const highlightHeight = highlightTextHeight + 24;
    const { page } = doc;
    doc
      .save()
      .roundedRect(
        page.margins.left,
        highlightTop - 8,
        contentWidth,
        highlightHeight
      )
      .fillOpacity(0.12)
      .fill(accent)
      .restore();

    doc
      .fillColor(ink)
      .font("Helvetica")
      .fontSize(14)
      .text(slide.highlight, {
        width: contentWidth,
        align: "left",
        lineGap: 4
      });

    doc.moveDown(0.75);
  } else {
    doc.moveDown(1);
  }

  const bulletMargin = 16;
  const textWidth = contentWidth - bulletMargin;

  doc.font("Helvetica").fontSize(13).fillColor(ink);

  slide.points.forEach((point, pointIndex) => {
    const bulletX = doc.x;
    const bulletY = doc.y + 6;

    doc.save().fillColor(accent).circle(bulletX, bulletY, 3).fill().restore();

    doc.text(point, bulletX + bulletMargin, doc.y - 6, {
      width: textWidth,
      lineGap: 4
    });

    if (pointIndex !== slide.points.length - 1) {
      doc.moveDown(0.6);
    }
  });

  doc.moveDown(0.5);
});

doc.end();

await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});

console.log(`PDF exported to ${path.relative(projectRoot, outputPath)}`);

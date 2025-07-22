// js/qr-export.js

import { sanitizeFilename } from "./utils.js";

export function exportToPNG(canvasId, filename = "qr_code") {
  const canvas = document.getElementById(canvasId);
  const link = document.createElement("a");
  link.download = sanitizeFilename(filename) + ".png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export function exportToSVG(qr, fgColor, bgColor, logoImage, originalInput, size = 6) {
  const count = qr.getModuleCount();
  const qrSize = count * size;
  const xmlns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(xmlns, "svg");
  svg.setAttribute("xmlns", xmlns);
  svg.setAttribute("width", qrSize);
  svg.setAttribute("height", qrSize);
  svg.setAttribute("viewBox", `0 0 ${qrSize} ${qrSize}`);

  const bgRect = document.createElementNS(xmlns, "rect");
  bgRect.setAttribute("width", "100%");
  bgRect.setAttribute("height", "100%");
  bgRect.setAttribute("fill", bgColor);
  svg.appendChild(bgRect);

  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        const rect = document.createElementNS(xmlns, "rect");
        rect.setAttribute("x", c * size);
        rect.setAttribute("y", r * size);
        rect.setAttribute("width", size);
        rect.setAttribute("height", size);
        rect.setAttribute("fill", fgColor);
        svg.appendChild(rect);
      }
    }
  }

  if (logoImage && logoImage.src) {
    const logoSize = qrSize / 4;
    const img = document.createElementNS(xmlns, "image");
    img.setAttributeNS(null, "x", (qrSize - logoSize) / 2);
    img.setAttributeNS(null, "y", (qrSize - logoSize) / 2);
    img.setAttributeNS(null, "width", logoSize);
    img.setAttributeNS(null, "height", logoSize);
    img.setAttributeNS("http://www.w3.org/1999/xlink", "href", logoImage.src);
    svg.appendChild(img);
  }

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const link = document.createElement("a");
  link.download = sanitizeFilename(originalInput || "qr_code") + ".svg";
  link.href = URL.createObjectURL(blob);
  link.click();
}

export async function exportBatchToZip(qrArray) {
  if (!qrArray.length) return;
  const zip = new JSZip();

  for (const { canvas, filename } of qrArray) {
    const dataURL = canvas.toDataURL("image/png");
    const binary = atob(dataURL.split(",")[1]);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    zip.file(sanitizeFilename(filename) + ".png", bytes);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  link.download = "qr_batch.zip";
  link.href = URL.createObjectURL(blob);
  link.click();
}

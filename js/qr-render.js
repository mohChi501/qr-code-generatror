// qr-render.js

import { sanitizeFilename } from "./utils.js";

/**
 * Renders a single QR code to a canvas.
 * @param {string} data - The content to encode.
 * @param {string} fgColor - Foreground color.
 * @param {string} bgColor - Background color.
 * @param {HTMLImageElement|null} logoImage - Optional logo to center.
 * @param {string} canvasId - ID of target canvas element.
 * @returns {{svg: string, qrObject: object}} - SVG markup and QR object.
 */
export function renderQRCode(data, fgColor, bgColor, logoImage, canvasId = "qrCanvas") {
  const qr = qrcode(0, "H"); // Error correction: High
  qr.addData(data);
  qr.make();

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const count = qr.getModuleCount();
  const size = 6;
  canvas.width = canvas.height = count * size;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        ctx.fillStyle = fgColor;
        ctx.fillRect(c * size, r * size, size, size);
      }
    }
  }

  if (logoImage && logoImage.complete) {
    const logoSize = canvas.width / 4;
    ctx.drawImage(
      logoImage,
      (canvas.width - logoSize) / 2,
      (canvas.height - logoSize) / 2,
      logoSize,
      logoSize
    );
  }

  return {
    svg: qr.createSvgTag({ cellSize: 4 }),
    qrObject: qr
  };
}

/**
 * Renders multiple QR codes into a container.
 * @param {string[]} inputLines - Array of strings, one per QR.
 * @param {string} fgColor - Foreground color.
 * @param {string} bgColor - Background color.
 * @param {HTMLImageElement|null} logoImage - Optional logo to apply to all.
 * @param {string} containerId - DOM container to render into.
 * @returns {{canvas: HTMLCanvasElement, filename: string}[]} - Array of canvas objects and names.
 */
export function renderMultipleQRCodes(inputLines, fgColor, bgColor, logoImage, containerId = "qrBatchContainer") {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const results = [];

  inputLines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const qr = qrcode(0, "H");
    qr.addData(trimmed);
    qr.make();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const count = qr.getModuleCount();
    const size = 6;
    canvas.width = canvas.height = count * size;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillStyle = fgColor;
          ctx.fillRect(c * size, r * size, size, size);
        }
      }
    }

    if (logoImage && logoImage.complete) {
      const logoSize = canvas.width / 4;
      ctx.drawImage(
        logoImage,
        (canvas.width - logoSize) / 2,
        (canvas.height - logoSize) / 2,
        logoSize,
        logoSize
      );
    }

    const filename = `qr_${index + 1}`;
    results.push({ canvas, filename });

    const wrapper = document.createElement("div");
    wrapper.style.margin = "10px";
    wrapper.appendChild(canvas);
    container.appendChild(wrapper);
  });

  return results;
}

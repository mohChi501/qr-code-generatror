// qr-render.js

import { sanitizeFilename } from './utils.js';

/**
 * Renders a single QR code to a canvas.
 * @param {string} data - The content to encode.
 * @param {string} fgColor - Foreground color.
 * @param {string} bgColor - Background color.
 * @param {Image|null} logoImage - Optional logo image.
 * @param {string} canvasId - ID of the target canvas element.
 * @returns {{svg: string, qrObject: object}} - SVG tag and QR code object.
 */
export function renderQRCode(data, fgColor, bgColor, logoImage, canvasId = "qrCanvas") {
  const qr = qrcode(0, "H"); // Error correction level H (30%)
  qr.addData(data);
  qr.make();

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const count = qr.getModuleCount();
  const size = 6;
  canvas.width = canvas.height = count * size;

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw QR pixels
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        ctx.fillStyle = fgColor;
        ctx.fillRect(c * size, r * size, size, size);
      }
    }
  }

  // Optional logo overlay
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
 * Renders multiple QR codes into a container div.
 * Each line of input becomes a separate canvas QR code.
 * @param {string[]} inputLines - Array of individual QR data strings.
 * @param {string} fgColor - Foreground color.
 * @param {string} bgColor - Background color.
 * @param {Image|null} logoImage - Optional logo image.
 * @param {string} containerId - ID of container div.
 * @returns {{canvas: HTMLCanvasElement, filename: string}[]} - Array of canvas+filename pairs.
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

    // Draw QR background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw modules
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillStyle = fgColor;
          ctx.fillRect(c * size, r * size, size, size);
        }
      }
    }

    // Optional logo overlay
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

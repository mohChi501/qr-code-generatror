// qr-render.js

import { sanitizeFilename } from './utils.js';

export function renderQRCode(data, fgColor, bgColor, logoImage, canvasId = 'qrCanvas') {
  const qr = qrcode(0, 'H'); // Error correction level H (30%)
  qr.addData(data);
  qr.make();

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const count = qr.getModuleCount();
  const size = 6;
  canvas.width = canvas.height = count * size;

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw QR modules
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        ctx.fillStyle = fgColor;
        ctx.fillRect(c * size, r * size, size, size);
      }
    }
  }

  // Draw logo (centered)
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

// qr-export.js

import { sanitizeFilename } from './utils.js';

export function exportToPNG(canvasId, filename = 'qr_code') {
  const canvas = document.getElementById(canvasId);
  const link = document.createElement('a');
  link.download = sanitizeFilename(filename) + '.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export function exportToSVG(qr, fgColor, bgColor, logoImage, originalInput, size = 6) {
  const count = qr.getModuleCount();
  const qrSize = count * size;
  const xmlns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(xmlns, 'svg');
  svg.setAttribute('xmlns', xmlns);
  svg.setAttribute('width', qrSize);
  svg.setAttribute('height', qrSize);
  svg.setAttribute('viewBox', `0 0 ${qrSize} ${qrSize}`);

  const bgRect = document.createElementNS(xmlns, 'rect');
  bgRect.setAttribute('width', '100%');
  bgRect.setAttribute('height', '100%');
  bgRect.setAttribute('fill', bgColor);
  svg.appendChild(bgRect);

  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        const rect = document.createElementNS(xmlns, 'rect');
        rect.setAttribute('x', c * size);
        rect.setAttribute('y', r * size);
        rect.setAttribute('width', size);
        rect.setAttribute('height', size);
        rect.setAttribute('fill', fgColor);
        svg.appendChild(rect);
      }
    }
  }

  if (logoImage && logoImage.src) {
    const logoSize = qrSize / 4;
    const img = document.createElementNS(xmlns, 'image');
    img.setAttributeNS(null, 'x', (qrSize - logoSize) / 2);
    img.setAttributeNS(null, 'y', (qrSize - logoSize) / 2);
    img.setAttributeNS(null, 'width', logoSize);
    img.setAttributeNS(null, 'height', logoSize);
    img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', logoImage.src);

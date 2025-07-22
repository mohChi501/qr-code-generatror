// qr-scanner.js

export let scanner = null;
export let scannerRunning = false;

/**
 * Starts the webcam QR scanner.
 * @param {Function} onSuccess - Called when a QR code is successfully scanned.
 */
export function startScanner(onSuccess) {
  if (scannerRunning) return;

  scanner = new Html5Qrcode("reader");
  scanner
    .start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      decoded => onSuccess(decoded),
      err => console.warn("Scan error:", err)
    )
    .then(() => {
      scannerRunning = true;
    })
    .catch(err => console.error("Start error:", err));
}

/**
 * Stops the webcam QR scanner.
 */
export function stopScanner() {
  if (!scannerRunning || !scanner) return;

  scanner
    .stop()
    .then(() => {
      scanner.clear();
      scannerRunning = false;
    })
    .catch(err => console.error("Stop error:", err));
}

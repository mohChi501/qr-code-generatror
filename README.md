# qr_code_generator
📦 QR Code Generator
A modular, browser-based QR Code generator built with HTML, JavaScript, and CSS. It supports customizable formatting, colors, logo overlays, real-time QR scanning via webcam, and export options for PNG and SVG. Ideal for personal use, business tools, or secure label generation.

🔧 Features
📄 Input formats: Plain text, URL, Email, Phone/SMS, Wi-Fi, vCard

🎨 Custom foreground/background colors

🖼️ Optional logo overlay

📥 Download as PNG or SVG (auto-sanitized filenames)

📸 Start/stop QR scanner with webcam

🔐 High error correction (ECC level H)

🧱 Modular structure for clean scalability

🚀 How to Use
Clone this repo or download it as ZIP

Open index.html in any modern browser

Select a QR format and input your data

Optionally:

Customize QR colors

Upload a logo image

Download the generated QR as PNG or SVG

Use "Start Scanning" to decode QR codes in real time

💡 Input Format Examples
Format	Input Syntax	Description
Wi-Fi	MySSID,password123	SSID and password comma-separated
vCard	Jane Doe,1234567890,jane@xyz.com	Name, phone, and email comma-separated
Email	hello@example.com	Email address (creates mailto link)
URL	https://example.com	Or just example.com (auto-prefixed)
🖼️ Logo Overlay Notes
Supported formats: PNG, JPEG

Logo is automatically centered in the QR code

SVG export also embeds the logo (via <image> tag)

🔐 Secure Practices
QR codes are encoded using ECC level H (30% error correction)

Inputs are sanitized before download to prevent naming issues

rMQR is included as a placeholder format only

🛠️ Folder Structure
qr-code-generator/
├── index.html
├── style.css
├── README.md
├── js/
│   ├── qr-config.js
│   ├── qr-render.js
│   ├── qr-export.js
│   ├── qr-scanner.js
│   ├── utils.js
🤝 Contributions
Feel free to fork, improve, or adapt this tool! Suggestions for:

rMQR integration via WebAssembly

Multiple QR previews

Style presets or animation

are welcome via issues or pull requests.

📄 License
MIT License


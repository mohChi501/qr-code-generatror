// qr-config.js

export function formatData(format, data) {
  switch (format) {
    case "url":
      return data.startsWith("http") ? data : `https://${data}`;
    case "email":
      return `mailto:${data}`;
    case "sms":
      return `sms:${data}`;
    case "wifi":
      const [ssid, pwd] = data.split(",");
      return `WIFI:T:WPA;S:${ssid};P:${pwd};;`;
    case "vcard":
      const [name, phone, email] = data.split(",");
      return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
    case "rmqr":
      alert("rMQR is a placeholder format and not supported in this version.");
      return "";
    case "text":
    default:
      return data;
  }
}

// js/qr-config.js

export class alphaDateTime {
  static timestampEncoding = ['B','C','D','E','F','G','H','J','K','M','N','P','Q','R','S','T'];

  static createAlphTimestamp() {
    return Array.from(Date.now().toString(16))
      .map(ch => alphaDateTime.timestampEncoding[parseInt(ch, 16)])
      .join('');
  }

  static decodeAlphaTimestamp(ts) {
    return Array.from(ts)
      .map(c => alphaDateTime.timestampEncoding.indexOf(c).toString(16))
      .join('');
  }
}

export function formatData(format, data) {
  switch (format) {
    case "special":
      return `4,${data}${alphaDateTime.createAlphTimestamp()}`;
    case "multiline":
      return data;
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
      alert("rMQR is a placeholder format and not supported.");
      return "";
    default:
      return data;
  }
}

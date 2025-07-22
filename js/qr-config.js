// js/qr-config.js

/**
 * Encodes a timestamp into a short alphanumeric string.
 */
export class alphaDateTime {
  static timestampEncoding = [
    'B','C','D','E','F','G','H','J','K','M','N','P','Q','R','S','T'
  ];

  /**
   * Creates an “alpha” timestamp by converting each hex digit
   * of Date.now() into a letter from timestampEncoding.
   */
  static createAlphTimestamp() {
    const hex = Date.now().toString(16);
    return Array.from(hex)
      .map(ch => alphaDateTime.timestampEncoding[parseInt(ch, 16)])
      .join('');
  }

  /**
   * Decodes an alpha timestamp back into its original hex string.
   */
  static decodeAlphaTimestamp(alphaTs) {
    const inv = alphaDateTime.timestampEncoding;
    return Array.from(alphaTs)
      .map(c => inv.indexOf(c).toString(16))
      .join('');
  }
}

/**
 * Transforms raw input into the proper payload for each QR type.
 */
export function formatData(format, data) {
  switch (format) {
    case "special":
      // 4,{data}{alphaTimestamp}
      return `4,${data}${alphaDateTime.createAlphTimestamp()}`;

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
      return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${name}`,
        `TEL:${phone}`,
        `EMAIL:${email}`,
        "END:VCARD"
      ].join("\n");

    case "rmqr":
      alert("rMQR is a placeholder format and not supported.");
      return "";

    case "text":
    default:
      return data;
  }
}

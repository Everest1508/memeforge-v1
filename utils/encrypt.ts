import CryptoJS from "crypto-js";

const AES_KEY = process.env.AES_KEY!;
const AES_IV = process.env.AES_IV!;

export function encryptData(data: object): string {
  if (!AES_KEY || !AES_IV) throw new Error("AES key or IV not set in environment variables.");

  const key = CryptoJS.enc.Utf8.parse(AES_KEY);
  const iv = CryptoJS.enc.Utf8.parse(AES_IV);

  const message = JSON.stringify(data);

  const encrypted = CryptoJS.AES.encrypt(message, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

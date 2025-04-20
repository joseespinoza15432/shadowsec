// src/pages/Upload.jsx
import React, { useRef, useState } from "react";

// ——— Web Crypto helper functions ———
async function deriveKey(password, salt) {
  const pwUtf8    = new TextEncoder().encode(password);
  const saltBytes = salt || crypto.getRandomValues(new Uint8Array(16));

  const baseKey = await crypto.subtle.importKey(
    "raw", pwUtf8, "PBKDF2", false, ["deriveKey"]
  );

  const aesKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt:         saltBytes,
      iterations:   100_000,
      hash:         "SHA-256",
    },
    baseKey,
    { name: "AES‑GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );

  return { key: aesKey, salt: saltBytes };
}

async function encryptFile(file, aesKey) {
  const plaintext = await file.arrayBuffer();
  const iv        = crypto.getRandomValues(new Uint8Array(12));
  const cipher    = await crypto.subtle.encrypt(
    { name: "AES‑GCM", iv },
    aesKey,
    plaintext
  );

  // prepend IV to ciphertext
  const out = new Uint8Array(iv.byteLength + cipher.byteLength);
  out.set(iv, 0);
  out.set(new Uint8Array(cipher), iv.byteLength);
  return out;
}

// ——— Component ———
export default function Upload() {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState("");   // simple status message

  const handleButtonClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const files    = Array.from(e.target.files);
    const password = prompt("Enter an encryption password:");
    if (!password) return setStatus("Encryption cancelled");

    setStatus("Deriving key…");
    const { key: aesKey, salt } = await deriveKey(password);

    for (const file of files) {
      setStatus(`Encrypting “${file.name}”…`);
      const encrypted = await encryptFile(file, aesKey);

      setStatus(`Getting upload URL for “${file.name}”…`);
      // 1) Ask your backend for a presigned URL & object key
      const { uploadUrl, objectKey } = await fetch("/api/sign-s3", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ filename: file.name }),
      }).then((r) => r.json());

      setStatus(`Uploading encrypted blob…`);
      // 2) PUT the encrypted data
      const put = await fetch(uploadUrl, {
        method:  "PUT",
        headers: { "Content-Type": "application/octet-stream" },
        body:    encrypted,
      });
      if (!put.ok) throw new Error("Upload failed");

      setStatus(`✅ “${file.name}” uploaded to S3 at ${objectKey}`);
      // You may also want to POST the salt (as hex/base64) + objectKey
      // back to your server so you can decrypt later.
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-4">Convert WORD to PDF</h1>
      <p className="text-gray-700 mb-8">
        Make DOC and DOCX files easy to read by converting them to PDF.
      </p>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
        {/* hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".doc,.docx"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* button */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleButtonClick}
            className="bg-red-600 hover:bg-red-700 text-white text-lg font-medium px-6 py-4 rounded-lg transition"
          >
            Select WORD files
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4">
          or drop WORD documents here
        </p>

        {status && (
          <p className="mt-6 text-blue-600 text-center">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

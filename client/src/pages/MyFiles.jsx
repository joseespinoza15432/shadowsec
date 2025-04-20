// src/pages/MyFiles.jsx
import React, { useEffect, useState } from "react";

// Web Crypto helpers
async function deriveKey(password, saltHex) {
  const pwUtf8 = new TextEncoder().encode(password);
  const saltBytes = Uint8Array.from(Buffer.from(saltHex, "hex"));

  const baseKey = await crypto.subtle.importKey(
    "raw",
    pwUtf8,
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations: 100_000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
}

async function decryptFile(encryptedBytes, aesKey) {
  const iv = encryptedBytes.slice(0, 12);
  const ciphertext = encryptedBytes.slice(12);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    aesKey,
    ciphertext
  );
  return new Blob([decrypted]);
}

export default function MyFiles() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/files")
      .then((r) => r.json())
      .then((data) => setFiles(data));
  }, []);

  const handleDecrypt = async (file) => {
    const password = prompt(
      `Enter password to decrypt "${file.originalFilename}"`
    );
    if (!password) return;

    try {
      setStatus("Deriving key...");
      const aesKey = await deriveKey(password, file.salt);

      setStatus("Fetching encrypted file...");
      const res = await fetch(`/api/download/${file.objectKey}`);
      const { url } = await res.json();

      const encrypted = await fetch(url).then((r) => r.arrayBuffer());

      setStatus("Decrypting...");
      const decryptedBlob = await decryptFile(encrypted, aesKey);

      const downloadUrl = URL.createObjectURL(decryptedBlob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = file.originalFilename.replace(".docx", "-decrypted.docx");
      a.click();
      URL.revokeObjectURL(downloadUrl);
      setStatus("✅ Decryption complete!");
    } catch (err) {
      console.error("Decrypt error:", err);
      setStatus("❌ Decryption failed.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Files</h2>
      {status && <p className="text-blue-600 mb-4">{status}</p>}
      {files.length === 0 && <p>No files uploaded yet.</p>}
      <ul className="space-y-4">
        {files.map((file) => (
          <li key={file._id} className="border p-4 rounded shadow bg-white">
            <p className="font-medium">{file.originalFilename}</p>
            <p className="text-sm text-gray-500">Key: {file.objectKey}</p>
            <button
              onClick={() => handleDecrypt(file)}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download & Decrypt
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

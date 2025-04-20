// src/pages/MyFiles.jsx
import React, { useEffect, useState } from "react";

// Convert hex string to Uint8Array
function hexToBytes(hex) {
  const len = hex.length / 2;
  const result = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    result[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return result;
}

// Derive AES-GCM key
async function deriveKey(password, saltBytes) {
  const pwUtf8 = new TextEncoder().encode(password);
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

// Decrypt the encrypted blob
async function decryptFile(encryptedBlob, aesKey) {
  const encryptedBytes = new Uint8Array(await encryptedBlob.arrayBuffer());
  const iv = encryptedBytes.slice(0, 12);
  const ciphertext = encryptedBytes.slice(12);

  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    aesKey,
    ciphertext
  );
  return new Blob([plaintext]);
}

export default function MyFiles() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setStatus("❌ Failed to load files");
      });
  }, []);

  const handleDecrypt = async (file) => {
    const password = prompt(
      `Enter password to decrypt "${file.originalFilename}"`
    );
    if (!password) return;

    try {
      setStatus("Requesting download URL…");
      const res = await fetch(`/api/download/${file.objectKey}`);
      const { url } = await res.json();

      setStatus("Downloading encrypted file…");
      const encryptedBlob = await fetch(url).then((r) => r.blob());

      const saltBytes = Uint8Array.from(atob(file.salt), (c) =>
        c.charCodeAt(0)
      );
      const aesKey = await deriveKey(password, saltBytes);

      setStatus("Decrypting file…");
      const decryptedBlob = await decryptFile(encryptedBlob, aesKey);

      const a = document.createElement("a");
      a.href = URL.createObjectURL(decryptedBlob);
      a.download = file.originalFilename;
      a.click();

      setStatus("✅ File decrypted and saved");
    } catch (err) {
      console.error("Decrypt error:", err);
      setStatus("❌ Decryption failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Encrypted Files
      </h2>
      {status && <p className="text-center text-blue-600 mb-4">{status}</p>}
      <ul className="space-y-4">
        {files.map((file) => (
          <li
            key={file._id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{file.originalFilename}</p>
              <p className="text-sm text-gray-500">{file.objectKey}</p>
            </div>
            <button
              onClick={() => handleDecrypt(file)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Decrypt & Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// src/pages/PostMortemGenerator.jsx
import React, { useState } from "react";

export default function PostMortemGenerator() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [summary, setSummary] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
    setSummary("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setStatus("Uploading and analyzing log file...");

    const formData = new FormData();
    formData.append("logfile", file);

    try {
      const res = await fetch("/api/post-mortem", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSummary(data.summary);
        setStatus("✅ Analysis complete");
      } else {
        setStatus("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Server error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        🕵️ Incident Post‑Mortem Generator
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".txt,.log"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Analyze Logs
        </button>
      </form>

      {status && (
        <p className="mt-4 text-sm text-center text-blue-600">{status}</p>
      )}

      {summary && (
        <div className="mt-6 bg-white text-black p-4 rounded border whitespace-pre-wrap">
          {summary}
        </div>
      )}
    </div>
  );
}

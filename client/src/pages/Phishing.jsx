import React, { useState } from "react";

export default function Phishing() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("");
    setLoading(true);

    try {
      const res = await fetch("/api/phishing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResult(data.result || "No response from server");
    } catch (err) {
      setResult("❌ An error occurred while checking the link.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 bg-black p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🔗 Phishing Link Detector
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          className="w-full px-4 py-2 border rounded"
          placeholder="Paste a URL here…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-black px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Checking…" : "Check Link"}
        </button>
      </form>
      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded border text-sm whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}

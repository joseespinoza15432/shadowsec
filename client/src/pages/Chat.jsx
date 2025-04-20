import React, { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/security-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      const botMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error talking to Gemini:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ An error occurred." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold text-center mb-6"> Security Coach</h1>

      <div className="bg-white p-4 rounded shadow h-[400px] overflow-y-auto mb-4 border">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">
            Ask me about phishing, passwords, scams, and more!
          </p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`my-2 p-3 rounded-lg max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-100 ml-auto text-right text-black"
                  : "bg-gray-100 text-black"
              }`}
            >
              {msg.content}
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-4 py-2"
          placeholder="Ask a security question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}

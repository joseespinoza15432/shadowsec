import React, { useState } from "react";
import "./Home.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comments: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ firstName: "", lastName: "", email: "", comments: "" });
      } else {
        setStatus(`❌ ${data.error || "Failed to send message."}`);
      }
    } catch (err) {
      setStatus("❌ Server error. Try again later.");
      console.error(err);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Contact Us</h1>
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="comments">Comments</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                required
                className="form-textarea"
                rows="4"
              />
            </div>

            <button type="submit" className="contact-submit-button">
              Submit
            </button>

            {status && (
              <p className="mt-4 text-sm text-center text-blue-500">{status}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

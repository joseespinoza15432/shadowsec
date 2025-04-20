import React from "react";

const FeaturesSection = () => {
    const features = [
      {
        title: "Encrypted Uploads",
        description: "Securely upload files using in-browser encryption with OpenPGP.js.",
        icon: "🔐",
      },
      {
        title: "AI Chatbot",
        description: "Ask BatBot how to stay secure. It's trained on modern best practices.",
        icon: "🤖",
      },
      {
        title: "Phishing Detector",
        description: "Paste suspicious messages or links to instantly evaluate their safety.",
        icon: "⚠️",
      },
    ];
  
    return (
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            🛡️ What You Can Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default FeaturesSection
  
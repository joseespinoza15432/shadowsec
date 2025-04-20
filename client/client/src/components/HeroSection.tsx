import React from "react"

const HeroSection: React.FC = () => {
  return (
    <section className="text-center py-20">
      <h1 className="text-5xl font-bold text-white">🦇 Welcome to SafeCloud Ally</h1>
      <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
        Your all-in-one secure file vault and AI-powered security assistant.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <a href="/upload" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
          Get Started
        </a>
        <a href="/chat" className="bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-600">
          Talk to BatBot
        </a>
      </div>
    </section>
  )
}

export default HeroSection

import React from 'react';

export default function Mission() {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        Our Mission
      </h1>
      
      <div className="w-full space-y-12">
        <div className="bg-[#0f172a]/60 backdrop-blur-md border border-blue-400/10 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Mission</h2>
          <p className="text-blue-300 leading-relaxed">
            At ShadowSec, our mission is to demystify cybersecurity and make it accessible to everyone. We combine cutting-edge technology with user-friendly interfaces to empower individuals and organizations to protect their digital assets.
          </p>
        </div>
        
        <div className="bg-[#0f172a]/60 backdrop-blur-md border border-blue-400/10 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Key Objectives</h2>
          <ul className="space-y-3">
            <li className="flex items-center text-blue-300">
              <span className="mr-2">•</span>
              Secure cloud storage with end-to-end encryption
            </li>
            <li className="flex items-center text-blue-300">
              <span className="mr-2">•</span>
              Advanced phishing detection and prevention
            </li>
            <li className="flex items-center text-blue-300">
              <span className="mr-2">•</span>
              Real-time threat monitoring and alerts
            </li>
            <li className="flex items-center text-blue-300">
              <span className="mr-2">•</span>
              User-friendly security tools for all skill levels
            </li>
            <li className="flex items-center text-blue-300">
              <span className="mr-2">•</span>
              Continuous innovation in cybersecurity
            </li>
          </ul>
        </div>

        <div className="bg-[#0f172a]/60 backdrop-blur-md border border-blue-400/10 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Vision</h2>
          <p className="text-blue-300 leading-relaxed">
            We envision a digital world where security is not a luxury but a fundamental right. Through our platform, we aim to democratize access to enterprise-grade security tools, making them available to individuals and organizations of all sizes.
          </p>
        </div>
      </div>
    </div>
  );
} 
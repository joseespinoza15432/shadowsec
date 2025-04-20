import React from 'react';
import './Home.css';

export default function Mission() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">
          Our Mission
        </h1>
        <div className="mission-content">
          <div className="mission-section">
            <h2 className="mission-subtitle"></h2>
            <p className="mission-text">
              At SHADOWSEC, our mission is to provide robust security solutions that protect your digital assets from modern threats. We combine advanced technology with user-friendly interfaces to make security accessible to everyone.
            </p>
          </div>
          
          <div className="mission-section">
            <h2 className="mission-subtitle">Key Objectives</h2>
            <ul className="mission-list">
              <li>Secure cloud storage with end-to-end encryption</li>
              <li>Advanced phishing detection and prevention</li>
              <li>Real-time threat monitoring and alerts</li>
              <li>User-friendly security tools for all skill levels</li>
              <li>Continuous innovation in cybersecurity</li>
            </ul>
          </div>

          <div className="mission-section">
            <h2 className="mission-subtitle">Our Vision</h2>
            <p className="mission-text">
              We envision a digital world where security is not a luxury but a fundamental right. Through our platform, we aim to democratize access to enterprise-grade security tools, making them available to individuals and organizations of all sizes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
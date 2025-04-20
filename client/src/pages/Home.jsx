import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">
          Welcome to SHADOWSEC
        </h1>
        <p className="home-subtitle">
          Your trusted companion for secure cloud storage and phishing protection.  
          Explore our features to enhance your online safety.
        </p>
        <div className="home-buttons">
          <Link
            to="/upload"
            className="home-button home-button-primary"
          >
            Get Started
          </Link>
          <Link
            to="/chat"
            className="home-button home-button-secondary"
          >
            Chat Now
          </Link>
        </div>
      </div>
    </div>
  );
}

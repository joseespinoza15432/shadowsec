import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Home.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">SHADOWSEC</Link>
        <div className="navbar-links">
          <Link to="/mission" className="navbar-link">Mission</Link>
          <Link to="/my-files" className="navbar-link">Files</Link>
          <Link to="/phishing" className="navbar-link">Phishing</Link>
          <Link to="/upload" className="navbar-link">Upload</Link>
          <Link to="/chat" className="navbar-link">Chat</Link>
          <Link to="/contact" className="navbar-link">Contac Us</Link>
        </div>
      </div>
    </nav>
  );
}

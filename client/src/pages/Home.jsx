import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <main className="home-content">
        <div className="content-wrapper">
          <section className="hero-section">
            <h1 className="home-title">
              Welcome to <span className="gradient-text">ShadowSec</span>
            </h1>
            <p className="home-subtitle">
              Your trusted partner in cybersecurity and threat intelligence
            </p>
            <div className="home-buttons">
              <Button variant="primary" asChild>
                <Link to="/upload">Get Started</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/mission">Learn More</Link>
              </Button>
            </div>
          </section>

          <section className="background-section">
            <Container>
              <div className="section-inner">
                <h2 className="section-title">Our Background</h2>
                <div className="section-content">
                  <p className="section-text">
                    ShadowSec was founded with a singular mission: to protect organizations and individuals from the ever-evolving landscape of cyber threats. Our team of cybersecurity experts brings decades of combined experience in threat intelligence, penetration testing, and security operations.
                  </p>
                  <p className="section-text">
                    We understand that cybersecurity is not just about technology—it's about people, processes, and staying one step ahead of adversaries. Our platform combines cutting-edge AI technology with human expertise to provide comprehensive security solutions.
                  </p>
                </div>
              </div>
            </Container>
          </section>

          <section className="values-section">
            <Container>
              <div className="section-inner">
                <h2 className="section-title">Our Values</h2>
                <div className="values-grid">
                  <div className="value-card">
                    <Shield className="value-icon" />
                    <h3 className="value-title">Security First</h3>
                    <p className="value-description">
                      We prioritize security in everything we do, ensuring our solutions meet the highest standards of protection.
                    </p>
                  </div>
                  <div className="value-card">
                    <Shield className="value-icon" />
                    <h3 className="value-title">Innovation</h3>
                    <p className="value-description">
                      We continuously evolve our technology to stay ahead of emerging threats and provide cutting-edge solutions.
                    </p>
                  </div>
                  <div className="value-card">
                    <Shield className="value-icon" />
                    <h3 className="value-title">Transparency</h3>
                    <p className="value-description">
                      We believe in open communication and clear reporting, keeping our clients informed every step of the way.
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          <section className="goals-section">
            <Container>
              <div className="section-inner">
                <h2 className="section-title">Our Goals</h2>
                <div className="goals-list">
                  <div className="goal-item">
                    <div className="goal-number">01</div>
                    <div className="goal-content">
                      <h3 className="goal-title">Empower Organizations</h3>
                      <p className="goal-description">
                        Provide organizations with the tools and knowledge they need to defend against cyber threats effectively.
                      </p>
                    </div>
                  </div>
                  <div className="goal-item">
                    <div className="goal-number">02</div>
                    <div className="goal-content">
                      <h3 className="goal-title">Raise Awareness</h3>
                      <p className="goal-description">
                        Educate users about cybersecurity best practices and the importance of maintaining strong security postures.
                      </p>
                    </div>
                  </div>
                  <div className="goal-item">
                    <div className="goal-number">03</div>
                    <div className="goal-content">
                      <h3 className="goal-title">Innovate Continuously</h3>
                      <p className="goal-description">
                        Develop and implement new technologies and methodologies to stay ahead of evolving cyber threats.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Background Elements */}
      <div className="hero-bg-glow"></div>

      {/* Hero Content */}
      <div className="container hero-content">
        <div className="hero-badge fade-in-up">
          <span className="sparkle">✨</span>
          Powered by Gemini 3.0, n8n, NanoBanana, and Veo3.1.
        </div>

        <h1 className="hero-title fade-in-up delay-1">
          <span className="text-gradient">Create UGC Ads <br /> That Convert</span>
        </h1>

        <p className="hero-subhead fade-in-up delay-2">
          The all-in-one AI creative studio that turns your ideas into high-performing video ads in seconds.
        </p>

        <div className="hero-stats fade-in-up delay-3">
          <span><strong>10x</strong> Faster Creation</span>
          <span className="dot">•</span>
          <span><strong>95%</strong> Higher Engagement</span>
          <span className="dot">•</span>
          <span><strong>50k+</strong> Ads Created</span>
        </div>

        <div className="hero-actions fade-in-up delay-4">
          <button className="btn btn-primary" onClick={() => document.getElementById('builder').scrollIntoView({ behavior: 'smooth' })}>
            Start Creating Free
          </button>
          <button className="btn btn-secondary" onClick={() => document.getElementById('samples').scrollIntoView({ behavior: 'smooth' })}>
            View Examples
          </button>
        </div>
      </div>

      {/* Floating Corner Images */}
      <div className="hero-corners">
        <div className="corner-img top-left float-slow">
          <img src="/images/hero_ugc_1.png" alt="UGC Example" />
        </div>
        <div className="corner-img top-right float-medium">
          <img src="/images/hero_ugc_2.png" alt="UGC Example" />
        </div>
        <div className="corner-img bottom-left float-medium">
          <img src="/images/hero_ugc_3.png" alt="UGC Example" />
        </div>
        <div className="corner-img bottom-right float-slow">
          <img src="/images/hero_ugc_4.png" alt="UGC Example" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span>Scroll to Get Started</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;

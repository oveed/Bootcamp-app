import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">

      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to TherapyHub</h1>
          <p className="quote" >"Taking care of your mental health is just as important as taking care of your physical health."</p>
          <Link to="/login" className="cta-button">Get In Touch</Link>
        </div>
      </div>

      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Personalized Support</h3>
            <p>Get tailored mental health support from professionals.</p>
          </div>
          <div className="feature-item">
            <h3>Online Appointments</h3>
            <p>Schedule sessions with ease through our online booking system.</p>
          </div>
          <div className="feature-item">
            <h3>24/7 Accessibility</h3>
            <p>Access mental health resources anytime, anywhere.</p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>TherapyHub is dedicated to providing accessible mental health support and resources. Our team of experienced professionals is here to help you on your journey to well-being.</p>
      </section>

    </div>
  );
}

export default HomePage;

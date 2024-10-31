'use client';

import React, { useState } from 'react';
import './globals.css';
import Image from 'next/image';

export default function Home() {
  // Ripple effect on click
  const handleClick = (event) => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  // Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data to API route
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="main-container" onClick={handleClick}>
      <nav className="nav-bar">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Hi, I&apos;m <span className="highlight">Sasankh Reddy</span></h1>
          <p>Full-Stack Developer</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="overview">
          <h2>Overview</h2>
          <p>
            I&apos;m a skilled software developer with experience in TypeScript and JavaScript, and
            expertise in frameworks like React, Node.js, and Three.js. I&apos;m a quick learner and
            collaborate closely with clients to create efficient, scalable, and user-friendly
            solutions that solve real-world problems. Let&apos;s work together to bring your ideas to life!
          </p>
          <div className="role-cards">
            <div className="card">Frontend Developer</div>
            <div className="card">Backend Developer</div>
            <div className="card">Programmer</div>
          </div>
        </div>

        <div className="skills">
          <h2>Tech Skills</h2>
          <div className="skills-icons">
            <Image src="/icons/react.svg" alt="React" />
            <Image src="/icons/nextjs.svg" alt="Next.js" />
            <Image src="/icons/js.svg" alt="JavaScript" />
            <Image src="/icons/ts.svg" alt="TypeScript" />
            <Image src="/icons/css.svg" alt="CSS" />
            <Image src="/icons/html.svg" alt="HTML" />
            <Image src="/icons/nodejs.svg" alt="Node.js" />
            <Image src="/icons/mongo.svg" alt="MongoDB" />
            <Image src="/icons/git.svg" alt="Git" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <h2>Projects</h2>
        <div className="projects-container">
          <div className="project-card">
            <Image src="/icons/pro1.png" alt="Project Preview" className="project-image" />
            <div className="project-header">
              <h3>InkSync</h3>
            </div>
            <div className="project-content">
              <p>A real-time collaborative whiteboard web application built with NextJs, Express, and Socket.io.</p>
              <div className="tech-tags">
                <span>#NextJs</span> <span>#ExpressJs</span> <span>#Socket.io</span> <span>#Tailwind</span> <span>#NodeJs</span>
              </div>
              <div className="project-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://example.com" target="_blank" rel="noopener noreferrer">Live Demo</a>
              </div>
            </div>
          </div>
          {/* Add more project cards as needed */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <h2>Contact</h2>
        <p>Get in touch for collaborations!</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
        {status && <p>{status}</p>}
      </section>
    </div>
  );
}
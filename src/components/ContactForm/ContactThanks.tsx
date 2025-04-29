import React from 'react';
import './ContactForm.css';

export function ContactThanks() {
  return (
    <div className="contact-thanks-container">
      <div className="contact-thanks-box">
        <div style={{fontSize: '2rem', marginBottom: '0.5em'}}>🎉 Thanks, we’ll be in touch shortly</div>
        <div className="contact-thanks-desc">
          Please also visit our blog and help documentation to gain a comprehensive understanding of ScopeDB.
        </div>
        <div className="contact-thanks-links">
          <span className="contact-thanks-link">
            <b>Blog</b> <span>&gt;</span>
          </span>
          <span className="contact-thanks-link">
            <b>Document</b> <span>&gt;</span>
          </span>
        </div>
      </div>
    </div>
  );
}

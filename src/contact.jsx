import React from 'react';
import './contact.css';

const ContactPage = () => {
  return (
      <div className="contact-form" id="contact-form">
        <h1>Contact Me</h1>
        <form action="https://getform.io/f/ayvekyrb" method="POST">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" name="name" required />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" placeholder="Enter your email" name="email" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" required placeholder="Your message"></textarea>
            <br />
            <br />
            <button id="send-button" type="submit">Send Message</button>
          </div>
        </form>

        <div className="contact-info">
          <p><strong>Contact</strong><br />aliuapplez@gmail.com</p>
          <p><strong>Based in</strong><br />Toronto, Canada</p>
          <p><strong>Phone Number</strong><br />647-268-6367</p>
          </div>
        </div>
  );
};

export default ContactPage;

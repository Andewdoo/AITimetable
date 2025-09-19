import React from 'react';
import './SignupPage.css';

function SignupPage() {
  return (
    <div className="signup-container">
      <div className="form-section">
        <h2>Create Your Account</h2>
        <p className="subtitle">Join Smart Table and take control of your schedule.</p>
        <form className="signup-form">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Jane Doe" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="jane@example.com" required />

          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="janedoe123" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" required />

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>

      <div className="image-section">
        <img
          src="https://source.unsplash.com/800x600/?workspace,design"
          alt="Signup Visual"
        />
      </div>
    </div>
  );
}

export default SignupPage;

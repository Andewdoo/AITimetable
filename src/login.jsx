import React from 'react';
import './Loginpage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div className="login-container">
      <div className="login-form-section">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Log in to continue organizing your schedule with Smart Table.</p>
        <form className="login-form">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="john123" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" required />

          <button type="submit" className="login-btn">Login</button>
          <button type="button" className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
        </form>
      </div>

      <div className="login-image-section">
        <img
          src="https://source.unsplash.com/800x600/?workspace,technology"
          alt="Smart Table Visual"
        />
      </div>
    </div>
  );
}

export default LoginPage;

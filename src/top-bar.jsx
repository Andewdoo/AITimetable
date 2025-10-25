import { useState } from 'react';
import styles from './top-bar.module.css';
import { useNavigate } from 'react-router-dom';

function TopBar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <>
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <span className={styles.brandName}>Smart Table</span>
        </div>
        <div className={styles.topbarRight}>
          <button className={styles.loginButton} onClick={() => navigate('/login')}>Login</button>
          <button className={styles.iconButton} onClick={toggleMenu}>
            <img src="/app.png" alt="menu" className={styles.icon} />
          </button>
        </div>
      </header>
<div className={`${styles.sidePanel} ${menuOpen ? styles.open : ''}`}>
  <div className={styles.panelContent}>
    <h1>Menu</h1>
    <div className={styles.menuButtons}>
      <button className={styles.menuButton} onClick={() => navigate('/CalendarPage')}>Calendar</button>
      <button className={styles.menuButton} onClick={() => navigate('/why')}>Why Smart Table?</button>
      <button className={styles.menuButton}
       onClick={() => navigate('/login')}>Login
       </button>
      <button className={styles.menuButton} onClick={() => navigate('/signup')}>Sign Up
      </button>
      <button className={styles.menuButton} onClick={() => navigate('/contact')}>Contact</button>
      <button className={styles.menuButton} onClick={() => navigate('/home')}>Home
      </button>
    </div>
    <button className={styles.closeButton} onClick={toggleMenu}>Close</button>
  </div>
</div>
    </>
  );
}

export default TopBar;

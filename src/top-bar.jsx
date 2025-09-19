import { useState } from 'react';
import styles from './top-bar.module.css';
import { useNavigate } from 'react-router-dom';
import LoginPage from './login.jsx';


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
          <a href='/login.html'>
          <button className={styles.loginButton}>Login</button>
          </a>
          <button className={styles.iconButton} onClick={toggleMenu}>
            <img src="/app.png" alt="menu" className={styles.icon} />
          </button>
        </div>
      </header>
<div className={`${styles.sidePanel} ${menuOpen ? styles.open : ''}`}>
  <div className={styles.panelContent}>
    <h1>Menu</h1>
    <div className={styles.menuButtons}>
      <a href={'/why-smart-table.html'}>
      <button className={styles.menuButton}>Why Smart Table?</button>
      </a>
      <button className={styles.menuButton}
       onClick={() => navigate('/login')}>Login
       </button>
      <button className={styles.menuButton}>Sign Up</button>
      <button className={styles.menuButton}>Contact</button>
    </div>
    <button className={styles.closeButton} onClick={toggleMenu}>Close</button>
  </div>
</div>
    </>
  );
}

export default TopBar;

import { useState } from 'react';
import styles from './top-bar.module.css';

function TopBar() {
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
          <button className={styles.loginButton}>Login</button>
          <button className={styles.iconButton} onClick={toggleMenu}>
            <img src="/app.png" alt="menu" className={styles.icon} />
          </button>
        </div>
      </header>

      <div className={`${styles.sidePanel} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.panelContent}>
          <h1>Menu</h1>
          <ul>
            <li>Products</li>
            <li>Business Types</li>
            <li>Why Smart Table?</li>
            <li>Pricing</li>
            <li>Resources</li>
            <li>Sign In</li>
            <li>Shop</li>
          </ul>
          <button className={styles.closeButton} onClick={toggleMenu}>Close</button>
        </div>
      </div>
    </>
  );
}

export default TopBar;

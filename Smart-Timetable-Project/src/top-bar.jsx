import styles from './top-bar.module.css'
function TopBar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <span className={styles.brandName}>Smart Table</span>
      </div>
      <div className={styles.topbarRight}>
        <button>Login</button>
        <button className={styles.iconButton}>
        <img src="/app.png" alt="menu" className={styles.icon} />
        </button>
      </div>
    </header>
  );
}
export default TopBar;

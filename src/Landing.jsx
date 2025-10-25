import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Landing() {
    const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Smart Table</h1>
        <h2 className={styles.heroHeadline}>
          Let AI plan your week smarter, faster, and stress-free.
        </h2>
        <a>
        <button className={styles.getStartedButton} onClick={() => navigate('/CalendarPage')}>Get Started</button>
        </a>
      </div>

      <div className={styles.messageSection}>
        <h1 className={styles.mainMessage}>
          Input your tasks and deadlines, and we'll build your optimal schedule
        </h1>
        <p className={styles.subMessage}>
          The ultimate AI integrated smart timetable
        </p>
      </div>
    </div>
  );
}

export default Landing;


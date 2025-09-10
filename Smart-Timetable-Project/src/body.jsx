import { useState } from 'react';
import styles from './body.module.css';

function Carousel() {
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const cards = [
    {
      img: '/Timetable.jpg',
      title: 'AI Smart Scheduling',
      description: 'Let AI optimize your schedule based on your tasks and deadlines.',
      backText: 
      <ul>
        <li>Save time and reduce stress with intelligent planning.</li>
        <li>Customizable to fit your unique needs and preferences.</li>
        <li>Ensures important tasks are scheduled first</li>
      </ul>
    },
    {
      img: '/share.jpg',
      title: 'Sync and Share',
      description: 'Share your timetables with friends and access them from any device.',
      backText:
      <ul>
        <li>Sync your timetable with other devices</li>
        <li>Collaborate and share schedules with friends or colleagues</li>
        <li>Access your timetable anytime, anywhere</li>
      </ul>
    },
    {
      img: '/sync.jpg',
      title: 'Interactive Interface',
      description: 'Visualize changes in real time with intuative easy to use features.',
      backText:
      <ul>
        <li>Intuitive easy to use interface.</li>
        <li>Drag and drop tasks to reschedule</li>
        <li>Real-time updates and notifications</li>
      </ul>
    },
  ];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.cardGroup}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => handleFlip(index)}
          >
            <div
              className={`${styles.flipCardInner} ${
                flippedCards[index] ? styles.flipped : ''
              }`}
            >
              <div className={styles.flipCardFront}>
                <img src={card.img} alt={card.title} className={styles.cardImage} />
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
              <div className={styles.flipCardBack}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.backText}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;

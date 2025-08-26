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
      title: 'Create Timetable',
      description: 'Easily create and manage your timetables.',
      backText: 'Plan your week efficiently with our smart scheduling tools.',
    },
    {
      img: '/share.jpg',
      title: 'Share with Friends',
      description: 'Share your timetables with friends and collaborate on scheduling.',
      backText: 'Invite friends and sync your schedules in real time.',
    },
    {
      img: '/sync.jpg',
      title: 'Sync Across Devices',
      description: 'Access your timetables from any device, anytime, anywhere.',
      backText: 'Stay updated across mobile, tablet, and desktop.',
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

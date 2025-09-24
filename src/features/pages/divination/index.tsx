import React, { useState } from 'react';
import { Eye, Star, Shield, Zap } from 'lucide-react';
import styles from './Divination.module.scss';

const Divination: React.FC = () => {
  const [selectedVision, setSelectedVision] = useState('future-sight');
  const [isActive, setIsActive] = useState(false);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const visions = [
    {
      id: 'future-sight',
      name: 'Future Sight',
      level: 1,
      xp: 40,
      materials: ['Crystal Ball', 'Mystic Essence'],
      color: '#8b5cf6',
      icon: '🔮',
      effect: 'See glimpses of the future',
    },
    {
      id: 'past-vision',
      name: 'Past Vision',
      level: 10,
      xp: 60,
      materials: ['Ancient Scroll', 'Memory Essence'],
      color: '#6b7280',
      icon: '📜',
      effect: 'View events from the past',
    },
    {
      id: 'present-awareness',
      name: 'Present Awareness',
      level: 20,
      xp: 80,
      materials: ['Mind Crystal', 'Focus Essence'],
      color: '#10b981',
      icon: '🧠',
      effect: 'Enhanced awareness of surroundings',
    },
    {
      id: 'dream-walking',
      name: 'Dream Walking',
      level: 35,
      xp: 120,
      materials: ['Dream Essence', 'Sleep Crystal'],
      color: '#ec4899',
      icon: '💤',
      effect: 'Enter the dream realm',
    },
    {
      id: 'soul-reading',
      name: 'Soul Reading',
      level: 50,
      xp: 150,
      materials: ['Soul Crystal', 'Empathy Essence'],
      color: '#f59e0b',
      icon: '👁️',
      effect: 'Read the souls of others',
    },
    {
      id: 'prophecy',
      name: 'Prophecy',
      level: 70,
      xp: 200,
      materials: ['Oracle Stone', 'Fate Essence'],
      color: '#ef4444',
      icon: '⚡',
      effect: 'Create powerful prophecies',
    },
  ];

  const handleStartDivination = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.divination}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Eye className={styles.titleIcon} />
          <h1>Divination</h1>
          <span className={styles.level}>Level {level}</span>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Experience</span>
            <span className={styles.statValue}>
              {experience.toLocaleString()}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Next Level</span>
            <span className={styles.statValue}>
              {(level * 1000 - experience).toLocaleString()} XP
            </span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.visionSelection}>
          <h3>Select Vision</h3>
          <div className={styles.visionGrid}>
            {visions.map(vision => (
              <div
                key={vision.id}
                className={`${styles.visionCard} ${selectedVision === vision.id ? styles.selected : ''} ${level < vision.level ? styles.locked : ''}`}
                onClick={() =>
                  level >= vision.level && setSelectedVision(vision.id)
                }
              >
                <div className={styles.visionIcon}>{vision.icon}</div>
                <div className={styles.visionInfo}>
                  <h4>{vision.name}</h4>
                  <p>Level {vision.level}</p>
                  <p>{vision.xp} XP</p>
                  <p className={styles.effect}>{vision.effect}</p>
                  <div className={styles.materials}>
                    {vision.materials.map((material, index) => (
                      <span key={index} className={styles.material}>
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                {level < vision.level && (
                  <div className={styles.lockIcon}>🔒</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.divinationArea}>
          <div className={styles.altar}>
            <div className={styles.tools}>
              <div className={styles.crystalBall}>🔮</div>
              <div className={styles.tarotCards}>🃏</div>
              <div className={styles.runes}>📿</div>
            </div>
            <div
              className={`${styles.divining} ${isActive ? styles.active : ''}`}
            >
              <Eye className={styles.eyeIcon} />
              <div className={styles.visionParticles}>
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={styles.particle} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <button
              className={`${styles.startButton} ${isActive ? styles.active : ''}`}
              onClick={handleStartDivination}
              disabled={
                level < visions.find(v => v.id === selectedVision)?.level!
              }
            >
              {isActive ? 'Stop Divining' : 'Start Divining'}
            </button>
          </div>
        </div>

        <div className={styles.bonuses}>
          <h3>Divination Bonuses</h3>
          <div className={styles.bonusGrid}>
            <div className={styles.bonusCard}>
              <Star className={styles.bonusIcon} />
              <h4>Clairvoyance</h4>
              <p>Enhanced vision accuracy</p>
            </div>
            <div className={styles.bonusCard}>
              <Shield className={styles.bonusIcon} />
              <h4>Mystic Insight</h4>
              <p>Reduced essence consumption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Divination;

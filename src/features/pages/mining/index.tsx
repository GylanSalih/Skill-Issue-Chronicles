import { Pickaxe, Star } from 'lucide-react';
import React, { useState } from 'react';
import styles from './Mining.module.scss';

const Mining: React.FC = () => {
  const [selectedOre, setSelectedOre] = useState('iron');
  const [isActive, setIsActive] = useState(false);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const oreTypes = [
    {
      id: 'iron',
      name: 'Iron Ore',
      level: 1,
      materials: ['Iron Ore x1', 'Coal x1'],
      experience: 25,
      icon: '⛏️',
    },
    {
      id: 'gold',
      name: 'Gold Ore',
      level: 5,
      materials: ['Gold Ore x1', 'Coal x2'],
      experience: 50,
      icon: '🥇',
    },
    {
      id: 'diamond',
      name: 'Diamond Ore',
      level: 10,
      materials: ['Diamond Ore x1', 'Coal x3'],
      experience: 100,
      icon: '💎',
    },
  ];

  const selectedOreData = oreTypes.find(ore => ore.id === selectedOre);

  return (
    <div className={styles.mining}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Pickaxe className={styles.titleIcon} />
          <h1>Mining</h1>
          <span className={styles.level}>Level {level}</span>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Experience</span>
            <span className={styles.statValue}>{experience.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className={styles.miningContent}>
        <div className={styles.oreSelection}>
          <h2>Select Ore to Mine</h2>
          <div className={styles.oreGrid}>
            {oreTypes.map(ore => (
              <div
                key={ore.id}
                className={`${styles.oreCard} ${selectedOre === ore.id ? styles.selected : ''}`}
                onClick={() => setSelectedOre(ore.id)}
              >
                <div className={styles.oreIcon}>{ore.icon}</div>
                <div className={styles.oreName}>{ore.name}</div>
                <div className={styles.oreLevel}>Level {ore.level}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.miningArea}>
          <h2>Mining</h2>
          {selectedOreData && (
            <div className={styles.miningInfo}>
              <div className={styles.oreDetails}>
                <h3>{selectedOreData.name}</h3>
                <div className={styles.materials}>
                  <h4>Materials Gained:</h4>
                  <ul>
                    {selectedOreData.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.experience}>
                  <span>Experience: {selectedOreData.experience}</span>
                </div>
              </div>

              <div className={styles.miningAction}>
                <button
                  className={`${styles.mineButton} ${isActive ? styles.active : ''}`}
                  onClick={() => setIsActive(!isActive)}
                >
                  <Pickaxe className={styles.mineIcon} />
                  {isActive ? 'Mining...' : 'Start Mining'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mining;
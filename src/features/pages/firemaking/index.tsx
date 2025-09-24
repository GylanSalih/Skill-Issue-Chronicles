import { Flame, Mountain, TreePine, Zap } from 'lucide-react';
import React, { useState } from 'react';
import styles from './Firemaking.module.scss';

const Firemaking: React.FC = () => {
  const [selectedWood, setSelectedWood] = useState('normal');
  const [isActive, setIsActive] = useState(false);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const woodTypes = [
    { id: 'normal', name: 'Normal Wood', level: 1, xp: 10, color: '#8B4513' },
    { id: 'oak', name: 'Oak Wood', level: 15, xp: 25, color: '#A0522D' },
    { id: 'willow', name: 'Willow Wood', level: 30, xp: 40, color: '#D2B48C' },
    { id: 'maple', name: 'Maple Wood', level: 45, xp: 60, color: '#CD853F' },
    { id: 'yew', name: 'Yew Wood', level: 60, xp: 100, color: '#228B22' },
    { id: 'magic', name: 'Magic Wood', level: 75, xp: 150, color: '#9370DB' },
  ];

  const handleStartFiremaking = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.firemaking}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Flame className={styles.titleIcon} />
          <h1>Firemaking</h1>
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
        <div className={styles.woodSelection}>
          <h3>Select Wood Type</h3>
          <div className={styles.woodGrid}>
            {woodTypes.map(wood => (
              <div
                key={wood.id}
                className={`${styles.woodCard} ${selectedWood === wood.id ? styles.selected : ''} ${level < wood.level ? styles.locked : ''}`}
                onClick={() => level >= wood.level && setSelectedWood(wood.id)}
              >
                <div
                  className={styles.woodColor}
                  style={{ backgroundColor: wood.color }}
                />
                <div className={styles.woodInfo}>
                  <h4>{wood.name}</h4>
                  <p>Level {wood.level}</p>
                  <p>{wood.xp} XP</p>
                </div>
                {level < wood.level && (
                  <div className={styles.lockIcon}>🔒</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.firemakingArea}>
          <div className={styles.fireContainer}>
            <div className={`${styles.fire} ${isActive ? styles.active : ''}`}>
              <Flame className={styles.fireIcon} />
              <div className={styles.fireParticles}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={styles.particle} />
                ))}
              </div>
            </div>
            <div className={styles.woodPile}>
              <TreePine className={styles.woodIcon} />
            </div>
          </div>

          <div className={styles.controls}>
            <button
              className={`${styles.startButton} ${isActive ? styles.active : ''}`}
              onClick={handleStartFiremaking}
              disabled={
                level < woodTypes.find(w => w.id === selectedWood)?.level!
              }
            >
              {isActive ? 'Stop Firemaking' : 'Start Firemaking'}
            </button>
          </div>
        </div>

        <div className={styles.bonuses}>
          <h3>Firemaking Bonuses</h3>
          <div className={styles.bonusGrid}>
            <div className={styles.bonusCard}>
              <Zap className={styles.bonusIcon} />
              <h4>Lightning Strike</h4>
              <p>Chance to gain bonus XP</p>
            </div>
            <div className={styles.bonusCard}>
              <Mountain className={styles.bonusIcon} />
              <h4>Mountain Winds</h4>
              <p>Increased burn rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Firemaking;

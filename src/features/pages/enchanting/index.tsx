import React, { useState } from 'react';
import { Sparkles, Star, Shield, Zap } from 'lucide-react';
import styles from './Enchanting.module.scss';

const Enchanting: React.FC = () => {
  const [selectedEnchant, setSelectedEnchant] = useState('sharpness');
  const [isActive, setIsActive] = useState(false);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const enchants = [
    {
      id: 'sharpness',
      name: 'Sharpness',
      level: 1,
      xp: 30,
      materials: ['Magic Essence', 'Iron Ingot'],
      color: '#ef4444',
      icon: '⚔️',
      effect: '+10% Attack Power',
    },
    {
      id: 'protection',
      name: 'Protection',
      level: 5,
      xp: 45,
      materials: ['Magic Essence', 'Steel Ingot'],
      color: '#3b82f6',
      icon: '🛡️',
      effect: '+15% Defense',
    },
    {
      id: 'speed',
      name: 'Speed',
      level: 10,
      xp: 60,
      materials: ['Magic Essence', 'Feather'],
      color: '#10b981',
      icon: '💨',
      effect: '+20% Movement Speed',
    },
  ];

  const handleStartEnchanting = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.enchanting}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Sparkles className={styles.titleIcon} />
          <h1>Enchanting</h1>
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
        <div className={styles.enchantSelection}>
          <h3>Select Enchantment</h3>
          <div className={styles.enchantGrid}>
            {enchants.map(enchant => (
              <div
                key={enchant.id}
                className={`${styles.enchantCard} ${selectedEnchant === enchant.id ? styles.selected : ''} ${level < enchant.level ? styles.locked : ''}`}
                onClick={() =>
                  level >= enchant.level && setSelectedEnchant(enchant.id)
                }
              >
                <div className={styles.enchantIcon}>{enchant.icon}</div>
                <div className={styles.enchantInfo}>
                  <h4>{enchant.name}</h4>
                  <p>Level {enchant.level}</p>
                  <p>{enchant.xp} XP</p>
                  <p className={styles.effect}>{enchant.effect}</p>
                </div>
                {level < enchant.level && (
                  <div className={styles.lockIcon}>🔒</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.enchantingArea}>
          <div className={styles.enchantingTable}>
            <div
              className={`${styles.enchanting} ${isActive ? styles.active : ''}`}
            >
              <Sparkles className={styles.sparklesIcon} />
              <div className={styles.magicParticles}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={styles.particle} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <button
              className={`${styles.startButton} ${isActive ? styles.active : ''}`}
              onClick={handleStartEnchanting}
              disabled={
                level < enchants.find(e => e.id === selectedEnchant)?.level!
              }
            >
              {isActive ? 'Stop Enchanting' : 'Start Enchanting'}
            </button>
          </div>
        </div>

        <div className={styles.bonuses}>
          <h3>Enchanting Bonuses</h3>
          <div className={styles.bonusGrid}>
            <div className={styles.bonusCard}>
              <Star className={styles.bonusIcon} />
              <h4>Perfect Enchant</h4>
              <p>Chance for enhanced effects</p>
            </div>
            <div className={styles.bonusCard}>
              <Shield className={styles.bonusIcon} />
              <h4>Master Enchanter</h4>
              <p>Reduced material consumption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enchanting;

import { BookOpen, Shield, Star, Zap } from 'lucide-react';
import React, { useState } from 'react';
import styles from './Runecrafting.module.scss';

const Runecrafting: React.FC = () => {
  const [selectedRune, setSelectedRune] = useState('air-rune');
  const [isActive, setIsActive] = useState(false);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const runes = [
    {
      id: 'air-rune',
      name: 'Air Rune',
      level: 1,
      xp: 25,
      materials: ['Pure Essence'],
      color: '#87CEEB',
      icon: '💨',
      effect: 'Basic air magic',
    },
    {
      id: 'water-rune',
      name: 'Water Rune',
      level: 5,
      xp: 40,
      materials: ['Pure Essence'],
      color: '#4169E1',
      icon: '💧',
      effect: 'Basic water magic',
    },
    {
      id: 'earth-rune',
      name: 'Earth Rune',
      level: 9,
      xp: 55,
      materials: ['Pure Essence'],
      color: '#8B4513',
      icon: '🌍',
      effect: 'Basic earth magic',
    },
    {
      id: 'fire-rune',
      name: 'Fire Rune',
      level: 14,
      xp: 70,
      materials: ['Pure Essence'],
      color: '#FF4500',
      icon: '🔥',
      effect: 'Basic fire magic',
    },
    {
      id: 'mind-rune',
      name: 'Mind Rune',
      level: 20,
      xp: 90,
      materials: ['Pure Essence'],
      color: '#9370DB',
      icon: '🧠',
      effect: 'Mind control magic',
    },
    {
      id: 'body-rune',
      name: 'Body Rune',
      level: 35,
      xp: 120,
      materials: ['Pure Essence'],
      color: '#FF69B4',
      icon: '💪',
      effect: 'Body enhancement magic',
    },
    {
      id: 'cosmic-rune',
      name: 'Cosmic Rune',
      level: 50,
      xp: 150,
      materials: ['Pure Essence'],
      color: '#FFD700',
      icon: '⭐',
      effect: 'Cosmic magic',
    },
    {
      id: 'chaos-rune',
      name: 'Chaos Rune',
      level: 65,
      xp: 200,
      materials: ['Pure Essence'],
      color: '#8B0000',
      icon: '🌀',
      effect: 'Chaos magic',
    },
  ];

  const handleStartRunecrafting = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.runecrafting}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <BookOpen className={styles.titleIcon} />
          <h1>Runecrafting</h1>
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
        <div className={styles.runeSelection}>
          <h3>Select Rune</h3>
          <div className={styles.runeGrid}>
            {runes.map(rune => (
              <div
                key={rune.id}
                className={`${styles.runeCard} ${selectedRune === rune.id ? styles.selected : ''} ${level < rune.level ? styles.locked : ''}`}
                onClick={() => level >= rune.level && setSelectedRune(rune.id)}
              >
                <div className={styles.runeIcon}>{rune.icon}</div>
                <div className={styles.runeInfo}>
                  <h4>{rune.name}</h4>
                  <p>Level {rune.level}</p>
                  <p>{rune.xp} XP</p>
                  <p className={styles.effect}>{rune.effect}</p>
                  <div className={styles.materials}>
                    {rune.materials.map((material, index) => (
                      <span key={index} className={styles.material}>
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                {level < rune.level && (
                  <div className={styles.lockIcon}>🔒</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.runecraftingArea}>
          <div className={styles.altar}>
            <div className={styles.essence}>
              <div className={styles.pureEssence}>💎</div>
            </div>
            <div
              className={`${styles.crafting} ${isActive ? styles.active : ''}`}
            >
              <Zap className={styles.zapIcon} />
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
              onClick={handleStartRunecrafting}
              disabled={level < runes.find(r => r.id === selectedRune)?.level!}
            >
              {isActive ? 'Stop Runecrafting' : 'Start Runecrafting'}
            </button>
          </div>
        </div>

        <div className={styles.bonuses}>
          <h3>Runecrafting Bonuses</h3>
          <div className={styles.bonusGrid}>
            <div className={styles.bonusCard}>
              <Star className={styles.bonusIcon} />
              <h4>Mystical Insight</h4>
              <p>Chance to create multiple runes</p>
            </div>
            <div className={styles.bonusCard}>
              <Shield className={styles.bonusIcon} />
              <h4>Arcane Mastery</h4>
              <p>Reduced essence consumption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Runecrafting;

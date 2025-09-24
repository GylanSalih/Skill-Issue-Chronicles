import { Beaker, Leaf, Shield, Zap } from 'lucide-react';
import React, { useState } from 'react';
import styles from './Herblore.module.scss';

const Herblore: React.FC = () => {
  const [selectedPotion, setSelectedPotion] = useState('health-potion');
  const [isActive, setIsActive] = useState(false);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const potions = [
    {
      id: 'health-potion',
      name: 'Health Potion',
      level: 1,
      xp: 20,
      materials: ['Herb', 'Water'],
      color: '#dc2626',
      icon: '🧪',
      effect: 'Restores 50 HP',
    },
    {
      id: 'mana-potion',
      name: 'Mana Potion',
      level: 10,
      xp: 35,
      materials: ['Magic Herb', 'Water'],
      color: '#3b82f6',
      icon: '🧪',
      effect: 'Restores 50 MP',
    },
    {
      id: 'strength-potion',
      name: 'Strength Potion',
      level: 25,
      xp: 60,
      materials: ['Strength Herb', 'Water', 'Crystal'],
      color: '#f59e0b',
      icon: '🧪',
      effect: '+20% Attack Power',
    },
    {
      id: 'defense-potion',
      name: 'Defense Potion',
      level: 40,
      xp: 85,
      materials: ['Defense Herb', 'Water', 'Iron'],
      color: '#6b7280',
      icon: '🧪',
      effect: '+20% Defense',
    },
    {
      id: 'speed-potion',
      name: 'Speed Potion',
      level: 55,
      xp: 120,
      materials: ['Speed Herb', 'Water', 'Feather'],
      color: '#10b981',
      icon: '🧪',
      effect: '+30% Movement Speed',
    },
    {
      id: 'wisdom-potion',
      name: 'Wisdom Potion',
      level: 70,
      xp: 150,
      materials: ['Wisdom Herb', 'Water', 'Crystal'],
      color: '#8b5cf6',
      icon: '🧪',
      effect: '+25% XP Gain',
    },
  ];

  const handleStartHerblore = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.herblore}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Leaf className={styles.titleIcon} />
          <h1>Herblore</h1>
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
        <div className={styles.potionSelection}>
          <h3>Select Potion</h3>
          <div className={styles.potionGrid}>
            {potions.map(potion => (
              <div
                key={potion.id}
                className={`${styles.potionCard} ${selectedPotion === potion.id ? styles.selected : ''} ${level < potion.level ? styles.locked : ''}`}
                onClick={() =>
                  level >= potion.level && setSelectedPotion(potion.id)
                }
              >
                <div className={styles.potionIcon}>{potion.icon}</div>
                <div className={styles.potionInfo}>
                  <h4>{potion.name}</h4>
                  <p>Level {potion.level}</p>
                  <p>{potion.xp} XP</p>
                  <p className={styles.effect}>{potion.effect}</p>
                  <div className={styles.materials}>
                    {potion.materials.map((material, index) => (
                      <span key={index} className={styles.material}>
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                {level < potion.level && (
                  <div className={styles.lockIcon}>🔒</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.herbloreArea}>
          <div className={styles.laboratory}>
            <div className={styles.cauldron}>
              <div className={styles.ingredients}>
                <div className={styles.herb}>🌿</div>
                <div className={styles.water}>💧</div>
                <div className={styles.crystal}>💎</div>
              </div>
              <div
                className={`${styles.brewing} ${isActive ? styles.active : ''}`}
              >
                <Beaker className={styles.flaskIcon} />
                <div className={styles.brewParticles}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={styles.particle} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <button
              className={`${styles.startButton} ${isActive ? styles.active : ''}`}
              onClick={handleStartHerblore}
              disabled={
                level < potions.find(p => p.id === selectedPotion)?.level!
              }
            >
              {isActive ? 'Stop Brewing' : 'Start Brewing'}
            </button>
          </div>
        </div>

        <div className={styles.bonuses}>
          <h3>Herblore Bonuses</h3>
          <div className={styles.bonusGrid}>
            <div className={styles.bonusCard}>
              <Zap className={styles.bonusIcon} />
              <h4>Perfect Brew</h4>
              <p>Chance to create enhanced potions</p>
            </div>
            <div className={styles.bonusCard}>
              <Shield className={styles.bonusIcon} />
              <h4>Master Alchemist</h4>
              <p>Reduced ingredient consumption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herblore;

import { Beaker, Shield, Star } from 'lucide-react';
import React, { useState } from 'react';
import styles from './Alchemy.module.scss';

const Alchemy: React.FC = () => {
  const [selectedTransmutation, setSelectedTransmutation] =
    useState('iron-to-gold');
  const [isActive, setIsActive] = useState(false);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const transmutations = [
    {
      id: 'iron-to-gold',
      name: 'Iron to Gold',
      level: 1,
      xp: 50,
      materials: ['Iron Ingot', 'Philosopher Stone'],
      color: '#FFD700',
      icon: '⚗️',
      effect: 'Transform iron into gold',
    },
    {
      id: 'lead-to-silver',
      name: 'Lead to Silver',
      level: 10,
      xp: 75,
      materials: ['Lead Ingot', 'Mercury'],
      color: '#C0C0C0',
      icon: '⚗️',
      effect: 'Transform lead into silver',
    },
    {
      id: 'copper-to-platinum',
      name: 'Copper to Platinum',
      level: 25,
      xp: 120,
      materials: ['Copper Ingot', 'Alchemical Catalyst'],
      color: '#E5E4E2',
      icon: '⚗️',
      effect: 'Transform copper into platinum',
    },
    {
      id: 'water-to-wine',
      name: 'Water to Wine',
      level: 40,
      xp: 150,
      materials: ['Pure Water', 'Grape Essence'],
      color: '#722F37',
      icon: '🍷',
      effect: 'Transform water into fine wine',
    },
    {
      id: 'stone-to-bread',
      name: 'Stone to Bread',
      level: 60,
      xp: 200,
      materials: ['Stone', 'Wheat Essence'],
      color: '#D2B48C',
      icon: '🍞',
      effect: 'Transform stone into bread',
    },
  ];

  const handleStartAlchemy = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.alchemy}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Beaker className={styles.titleIcon} />
          <h1>Alchemy</h1>
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
        <div className={styles.transmutationSelection}>
          <h3>Select Transmutation</h3>
          <div className={styles.transmutationGrid}>
            {transmutations.map(transmutation => (
              <div
                key={transmutation.id}
                className={`${styles.transmutationCard} ${selectedTransmutation === transmutation.id ? styles.selected : ''} ${level < transmutation.level ? styles.locked : ''}`}
                onClick={() =>
                  level >= transmutation.level &&
                  setSelectedTransmutation(transmutation.id)
                }
              >
                <div className={styles.transmutationIcon}>
                  {transmutation.icon}
                </div>
                <div className={styles.transmutationInfo}>
                  <h4>{transmutation.name}</h4>
                  <p>Level {transmutation.level}</p>
                  <p>{transmutation.xp} XP</p>
                  <p className={styles.effect}>{transmutation.effect}</p>
                  <div className={styles.materials}>
                    {transmutation.materials.map((material, index) => (
                      <span key={index} className={styles.material}>
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                {level < transmutation.level && (
                  <div className={styles.lockIcon}>🔒</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.alchemyArea}>
          <div className={styles.alchemyTable}>
            <div className={styles.ingredients}>
              <div className={styles.baseMaterial}>🧱</div>
              <div className={styles.catalyst}>💎</div>
              <div className={styles.philosopherStone}>🔮</div>
            </div>
            <div
              className={`${styles.transmutation} ${isActive ? styles.active : ''}`}
            >
              <Beaker className={styles.flaskIcon} />
              <div className={styles.alchemyParticles}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={styles.particle} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <button
              className={`${styles.startButton} ${isActive ? styles.active : ''}`}
              onClick={handleStartAlchemy}
              disabled={
                level <
                transmutations.find(t => t.id === selectedTransmutation)?.level!
              }
            >
              {isActive ? 'Stop Transmutation' : 'Start Transmutation'}
            </button>
          </div>
        </div>

        <div className={styles.bonuses}>
          <h3>Alchemy Bonuses</h3>
          <div className={styles.bonusGrid}>
            <div className={styles.bonusCard}>
              <Star className={styles.bonusIcon} />
              <h4>Perfect Transmutation</h4>
              <p>Chance for enhanced results</p>
            </div>
            <div className={styles.bonusCard}>
              <Shield className={styles.bonusIcon} />
              <h4>Master Alchemist</h4>
              <p>Reduced material consumption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alchemy;

import { Shield, Star, Wand2, Zap } from 'lucide-react';
import React, { useState } from 'react';
import styles from './Spells.module.scss';

const Spells: React.FC = () => {
  const [selectedSpell, setSelectedSpell] = useState('fireball');
  const [isActive, setIsActive] = useState(false);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const spells = [
    {
      id: 'fireball',
      name: 'Fireball',
      level: 1,
      xp: 30,
      materials: ['Fire Rune', 'Air Rune'],
      color: '#FF4500',
      icon: '🔥',
      effect: 'Deals fire damage',
    },
    {
      id: 'ice-shard',
      name: 'Ice Shard',
      level: 5,
      xp: 45,
      materials: ['Water Rune', 'Air Rune'],
      color: '#87CEEB',
      icon: '❄️',
      effect: 'Deals ice damage',
    },
    {
      id: 'lightning-bolt',
      name: 'Lightning Bolt',
      level: 10,
      xp: 60,
      materials: ['Air Rune', 'Mind Rune'],
      color: '#FFD700',
      icon: '⚡',
      effect: 'Deals lightning damage',
    },
    {
      id: 'earth-spike',
      name: 'Earth Spike',
      level: 15,
      xp: 75,
      materials: ['Earth Rune', 'Body Rune'],
      color: '#8B4513',
      icon: '🌍',
      effect: 'Deals earth damage',
    },
    {
      id: 'heal',
      name: 'Heal',
      level: 20,
      xp: 90,
      materials: ['Water Rune', 'Body Rune'],
      color: '#32CD32',
      icon: '💚',
      effect: 'Restores health',
    },
    {
      id: 'teleport',
      name: 'Teleport',
      level: 30,
      xp: 120,
      materials: ['Law Rune', 'Air Rune'],
      color: '#9370DB',
      icon: '🌀',
      effect: 'Instant movement',
    },
    {
      id: 'meteor',
      name: 'Meteor',
      level: 50,
      xp: 180,
      materials: ['Fire Rune', 'Earth Rune', 'Cosmic Rune'],
      color: '#FF6347',
      icon: '☄️',
      effect: 'Massive fire damage',
    },
    {
      id: 'time-stop',
      name: 'Time Stop',
      level: 70,
      xp: 250,
      materials: ['Cosmic Rune', 'Law Rune', 'Chaos Rune'],
      color: '#FF1493',
      icon: '⏰',
      effect: 'Freezes time',
    },
  ];

  const handleStartCasting = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.spells}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Wand2 className={styles.titleIcon} />
          <h1>Spells</h1>
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
        <div className={styles.spellSelection}>
          <h3>Select Spell</h3>
          <div className={styles.spellGrid}>
            {spells.map(spell => (
              <div
                key={spell.id}
                className={`${styles.spellCard} ${selectedSpell === spell.id ? styles.selected : ''} ${level < spell.level ? styles.locked : ''}`}
                onClick={() =>
                  level >= spell.level && setSelectedSpell(spell.id)
                }
              >
                <div className={styles.spellIcon}>{spell.icon}</div>
                <div className={styles.spellInfo}>
                  <h4>{spell.name}</h4>
                  <p>Level {spell.level}</p>
                  <p>{spell.xp} XP</p>
                  <p className={styles.effect}>{spell.effect}</p>
                  <div className={styles.materials}>
                    {spell.materials.map((material, index) => (
                      <span key={index} className={styles.material}>
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                {level < spell.level && (
                  <div className={styles.lockIcon}>🔒</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.spellArea}>
          <div className={styles.castingCircle}>
            <div className={styles.runeCircle}>
              <div className={styles.centerRune}>🔮</div>
              <div className={styles.outerRunes}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={styles.rune} />
                ))}
              </div>
            </div>
            <div
              className={`${styles.casting} ${isActive ? styles.active : ''}`}
            >
              <Zap className={styles.zapIcon} />
              <div className={styles.magicParticles}>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={styles.particle} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <button
              className={`${styles.startButton} ${isActive ? styles.active : ''}`}
              onClick={handleStartCasting}
              disabled={
                level < spells.find(s => s.id === selectedSpell)?.level!
              }
            >
              {isActive ? 'Stop Casting' : 'Start Casting'}
            </button>
          </div>
        </div>

        <div className={styles.bonuses}>
          <h3>Magic Bonuses</h3>
          <div className={styles.bonusGrid}>
            <div className={styles.bonusCard}>
              <Star className={styles.bonusIcon} />
              <h4>Arcane Mastery</h4>
              <p>Chance for spell critical hits</p>
            </div>
            <div className={styles.bonusCard}>
              <Shield className={styles.bonusIcon} />
              <h4>Mana Efficiency</h4>
              <p>Reduced rune consumption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spells;

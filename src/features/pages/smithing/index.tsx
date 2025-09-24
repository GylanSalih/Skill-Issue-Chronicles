import { Hammer, Shield, Star } from 'lucide-react';
import React, { useState } from 'react';
import styles from './Smithing.module.scss';

const Smithing: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState('iron-sword');
  const [isActive, setIsActive] = useState(false);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const smithingItems = [
    {
      id: 'iron-sword',
      name: 'Iron Sword',
      level: 1,
      materials: ['Iron Bar x2', 'Coal x1'],
      experience: 25,
      icon: '⚔️',
    },
    {
      id: 'steel-armor',
      name: 'Steel Armor',
      level: 5,
      materials: ['Steel Bar x3', 'Leather x2'],
      experience: 50,
      icon: '🛡️',
    },
    {
      id: 'gold-ring',
      name: 'Gold Ring',
      level: 10,
      materials: ['Gold Bar x1', 'Gem x1'],
      experience: 75,
      icon: '💍',
    },
  ];

  const selectedItemData = smithingItems.find(item => item.id === selectedItem);

  return (
    <div className={styles.smithing}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Hammer className={styles.titleIcon} />
          <h1>Smithing</h1>
          <span className={styles.level}>Level {level}</span>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Experience</span>
            <span className={styles.statValue}>{experience.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className={styles.smithingContent}>
        <div className={styles.itemSelection}>
          <h2>Select Item to Craft</h2>
          <div className={styles.itemGrid}>
            {smithingItems.map(item => (
              <div
                key={item.id}
                className={`${styles.itemCard} ${selectedItem === item.id ? styles.selected : ''}`}
                onClick={() => setSelectedItem(item.id)}
              >
                <div className={styles.itemIcon}>{item.icon}</div>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemLevel}>Level {item.level}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.craftingArea}>
          <h2>Crafting</h2>
          {selectedItemData && (
            <div className={styles.craftingInfo}>
              <div className={styles.itemDetails}>
                <h3>{selectedItemData.name}</h3>
                <div className={styles.materials}>
                  <h4>Materials Required:</h4>
                  <ul>
                    {selectedItemData.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.experience}>
                  <span>Experience: {selectedItemData.experience}</span>
                </div>
              </div>

              <div className={styles.craftingAction}>
                <button
                  className={`${styles.craftButton} ${isActive ? styles.active : ''}`}
                  onClick={() => setIsActive(!isActive)}
                >
                  <Hammer className={styles.craftIcon} />
                  {isActive ? 'Crafting...' : 'Start Crafting'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Smithing;
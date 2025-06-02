'use client'

import React, { useState } from 'react';
import { 
  Sword, 
  Shield, 
  Crown, 
  Shirt, 
  Footprints, 
  Hand, 
  Zap, 
  Star,
  Plus,
  Gem
} from 'lucide-react';
import styles from './Equipment.module.css';

const EquipmentInterface = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [equipment, setEquipment] = useState({
    helmet: {
      item: { 
        name: 'Titanium Helm', 
        rarity: 'epic',
        stats: { defense: 45, strength: 12, health: 80 },
        image: '⚔️'
      }
    },
    amulet: {
      item: { 
        name: 'Mystic Pendant', 
        rarity: 'legendary',
        stats: { magic: 85, mana: 150, luck: 25 },
        image: '💎'
      }
    },
    weapon: {
      item: { 
        name: 'Dragonsbane Sword', 
        rarity: 'legendary',
        stats: { damage: 120, accuracy: 35, critical: 18 },
        image: '🗡️'
      }
    },
    chest: {
      item: { 
        name: 'Enchanted Plate', 
        rarity: 'rare',
        stats: { defense: 65, health: 200, resistance: 25 },
        image: '🛡️'
      }
    },
    shield: {
      item: { 
        name: 'Guardian Shield', 
        rarity: 'epic',
        stats: { defense: 55, block: 30, resistance: 15 },
        image: '🛡️'
      }
    },
    legs: {
      item: { 
        name: 'Steel Greaves', 
        rarity: 'uncommon',
        stats: { defense: 32, agility: 18, speed: 12 },
        image: '🦵'
      }
    },
    gloves: {
      item: { 
        name: 'Precision Gauntlets', 
        rarity: 'rare',
        stats: { accuracy: 28, damage: 15, dexterity: 22 },
        image: '🧤'
      }
    },
    boots: {
      item: { 
        name: 'Swift Boots', 
        rarity: 'epic',
        stats: { agility: 45, speed: 35, dodge: 20 },
        image: '👢'
      }
    },
    ring: {
      item: { 
        name: 'Ring of Fortune', 
        rarity: 'legendary',
        stats: { luck: 40, magic: 25, mana: 75 },
        image: '💍'
      }
    },
    cape: {
      item: { 
        name: 'Shadowcloak', 
        rarity: 'epic',
        stats: { agility: 30, dodge: 25, stealth: 50 },
        image: '🎭'
      }
    }
  });

  const equipmentSlots = [
    { id: 'helmet', icon: Crown, position: { top: '8%', left: '50%' }, label: 'Helmet' },
    { id: 'amulet', icon: Gem, position: { top: '18%', left: '25%' }, label: 'Amulet' },
    { id: 'weapon', icon: Sword, position: { top: '28%', left: '15%' }, label: 'Weapon' },
    { id: 'chest', icon: Shirt, position: { top: '32%', left: '50%' }, label: 'Chest' },
    { id: 'shield', icon: Shield, position: { top: '28%', left: '85%' }, label: 'Shield' },
    { id: 'legs', icon: Shirt, position: { top: '58%', left: '50%' }, label: 'Legs' },
    { id: 'gloves', icon: Hand, position: { top: '42%', left: '25%' }, label: 'Gloves' },
    { id: 'boots', icon: Footprints, position: { top: '78%', left: '50%' }, label: 'Boots' },
    { id: 'ring', icon: Zap, position: { top: '42%', left: '75%' }, label: 'Ring' },
    { id: 'cape', icon: Star, position: { top: '22%', left: '70%' }, label: 'Cape' }
  ];

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Equipment</h1>
          <p className={styles.subtitle}>
            Manage your character's gear and equipment
          </p>
        </div>

        <div className={styles.equipmentGrid}>
          
          {/* Equipment Slots */}
          <div className={styles.equipmentCard}>
            <div className={styles.cardHeader}>
              <div className={styles.categoryIcon}>
                <div className={styles.iconBackground}>
                  <Gem className={styles.icon} />
                </div>
                <h2 className={styles.categoryTitle}>Character Equipment</h2>
              </div>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.characterContainer}>
                {/* Character Silhouette */}
                <div className={styles.characterSilhouette} />

                {/* Equipment Slots */}
                {equipmentSlots.map(slot => {
                  const IconComponent = slot.icon;
                  const item = equipment[slot.id]?.item;
                  const isSelected = selectedSlot === slot.id;
                  
                  return (
                    <div
                      key={slot.id}
                      className={styles.equipmentSlot}
                      style={slot.position}
                      onClick={() => setSelectedSlot(selectedSlot === slot.id ? null : slot.id)}
                    >
                      <div
                        className={`${styles.slotButton} ${
                          item ? styles[`rarity_${item.rarity}`] : styles.emptySlot
                        } ${isSelected ? styles.selectedSlot : ''}`}
                      >
                        {item ? (
                          <span className={styles.itemEmoji}>{item.image}</span>
                        ) : (
                          <Plus className={styles.plusIcon} />
                        )}
                        
                        {/* Tooltip */}
                        <div className={styles.tooltip}>
                          {item ? item.name : slot.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Item Details */}
          {selectedSlot && equipment[selectedSlot]?.item ? (
            <div className={styles.detailsCard}>
              <div className={styles.cardHeader}>
                <div className={styles.categoryIcon}>
                  <div className={styles.iconBackground}>
                    <Gem className={styles.icon} />
                  </div>
                  <h3 className={styles.categoryTitle}>Item Details</h3>
                </div>
              </div>
              
              <div className={styles.cardContent}>
                {(() => {
                  const item = equipment[selectedSlot].item;
                  return (
                    <div className={styles.itemDetailsContent}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemImage}>{item.image}</span>
                        <div className={styles.itemInfo}>
                          <h4 className={`${styles.itemName} ${styles[`rarity_${item.rarity}_text`]}`}>
                            {item.name}
                          </h4>
                          <p className={styles.itemRarity}>
                            {item.rarity}
                          </p>
                        </div>
                      </div>
                      
                      <div className={styles.statsSection}>
                        <h5 className={styles.statsTitle}>Stats</h5>
                        <div className={styles.statsGrid}>
                          {Object.entries(item.stats).map(([stat, value]) => (
                            <div key={stat} className={styles.statRow}>
                              <span className={styles.statLabel}>
                                {stat}
                              </span>
                              <span className={styles.statValue}>
                                +{value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={styles.actionButtons}>
                        <button className={styles.upgradeButton}>
                          Upgrade Item
                        </button>
                        <button className={styles.unequipButton}>
                          Unequip
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            <div className={styles.emptyDetailsCard}>
              <div className={styles.emptyState}>
                <Gem className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>No Item Selected</h3>
                <p className={styles.emptyText}>Click on an equipment slot to view item details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentInterface;
import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { TreePine, Lock, Star } from 'lucide-react';
import styles from './WoodcuttingGrid.module.scss';

interface WoodType {
  id: string;
  name: string;
  image: string;
  requiredLevel: number;
  baseReward: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  description: string;
}

const woodTypes: WoodType[] = [
  {
    id: 'normalWood',
    name: 'Normal Wood',
    image: '/assets/img/Resources/Wood/NormalWood.png',
    requiredLevel: 1,
    baseReward: 1,
    rarity: 'common',
    description: 'Basic wood for crafting'
  },
  {
    id: 'softwood',
    name: 'Softwood',
    image: '/assets/img/Resources/Wood/Softwood.png',
    requiredLevel: 3,
    baseReward: 2,
    rarity: 'common',
    description: 'Light and easy to work with'
  },
  {
    id: 'willowWood',
    name: 'Willow Wood',
    image: '/assets/img/Resources/Wood/WillowWood.png',
    requiredLevel: 5,
    baseReward: 3,
    rarity: 'uncommon',
    description: 'Flexible and durable'
  },
  {
    id: 'glowwood',
    name: 'Glowwood',
    image: '/assets/img/Resources/Wood/Glowwood.png',
    requiredLevel: 8,
    baseReward: 5,
    rarity: 'rare',
    description: 'Magically glowing wood'
  },
  {
    id: 'frostbark',
    name: 'Frostbark',
    image: '/assets/img/Resources/Wood/Frostbark.png',
    requiredLevel: 12,
    baseReward: 7,
    rarity: 'rare',
    description: 'Ice-cold bark from frozen trees'
  },
  {
    id: 'ebonyWood',
    name: 'Ebony Wood',
    image: '/assets/img/Resources/Wood/EbonyWood.png',
    requiredLevel: 15,
    baseReward: 10,
    rarity: 'epic',
    description: 'Dark and mysterious wood'
  },
  {
    id: 'voidbark',
    name: 'Voidbark',
    image: '/assets/img/Resources/Wood/Voidbark.png',
    requiredLevel: 20,
    baseReward: 15,
    rarity: 'epic',
    description: 'Wood from the void dimension'
  },
  {
    id: 'yangWood',
    name: 'Yang Wood',
    image: '/assets/img/Resources/Wood/YangWood.png',
    requiredLevel: 25,
    baseReward: 20,
    rarity: 'legendary',
    description: 'Wood of pure light energy'
  },
  {
    id: 'yingWood',
    name: 'Ying Wood',
    image: '/assets/img/Resources/Wood/YingWood.png',
    requiredLevel: 25,
    baseReward: 20,
    rarity: 'legendary',
    description: 'Wood of pure dark energy'
  }
];

const WoodcuttingGrid: React.FC = () => {
  const { gameState, toggleSkill } = useGameState();
  const woodcuttingSkill = gameState.skills.woodcutting;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#9ca3af';
      case 'uncommon': return '#10b981';
      case 'rare': return '#3b82f6';
      case 'epic': return '#8b5cf6';
      case 'legendary': return '#f59e0b';
      default: return '#9ca3af';
    }
  };

  const canChop = (woodType: WoodType) => {
    return woodcuttingSkill.level >= woodType.requiredLevel;
  };

  const getCurrentWoodAmount = (woodId: string) => {
    return gameState.resources.secondary[woodId as keyof typeof gameState.resources.secondary] || 0;
  };

  const handleWoodChop = (woodType: WoodType) => {
    if (canChop(woodType)) {
      // Hier würde die Logik für das Holzfällen implementiert werden
      console.log(`Chopping ${woodType.name}`);
    }
  };

  return (
    <div className={styles.woodcuttingGrid}>
      <div className={styles.header}>
        <TreePine className={styles.headerIcon} size={32} />
        <div className={styles.headerContent}>
          <h1>Woodcutting</h1>
          <p>Chop different types of wood to gather resources</p>
        </div>
      </div>

      <div className={styles.skillInfo}>
        <div className={styles.skillLevel}>
          <span>Woodcutting Level: {woodcuttingSkill.level}</span>
          <span>Experience: {woodcuttingSkill.experience} XP</span>
        </div>
        <button
          onClick={() => toggleSkill('woodcutting')}
          className={`${styles.toggleButton} ${woodcuttingSkill.isActive ? styles.active : styles.inactive}`}
        >
          {woodcuttingSkill.isActive ? 'Stop Chopping' : 'Start Chopping'}
        </button>
      </div>

      <div className={styles.woodGrid}>
        {woodTypes.map((woodType) => {
          const isUnlocked = canChop(woodType);
          const currentAmount = getCurrentWoodAmount(woodType.id);
          
          return (
            <div
              key={woodType.id}
              className={`${styles.woodCard} ${!isUnlocked ? styles.locked : ''}`}
              onClick={() => handleWoodChop(woodType)}
            >
              <div className={styles.woodImageContainer}>
                <img 
                  src={woodType.image} 
                  alt={woodType.name}
                  className={styles.woodImage}
                />
                {!isUnlocked && (
                  <div className={styles.lockOverlay}>
                    <Lock size={24} />
                    <span>Level {woodType.requiredLevel}</span>
                  </div>
                )}
                <div className={styles.rarityIndicator} style={{ backgroundColor: getRarityColor(woodType.rarity) }}>
                  <Star size={12} />
                </div>
              </div>
              
              <div className={styles.woodInfo}>
                <h3 className={styles.woodName}>{woodType.name}</h3>
                <p className={styles.woodDescription}>{woodType.description}</p>
                <div className={styles.woodStats}>
                  <div className={styles.stat}>
                    <span>Level Required:</span>
                    <span className={styles.statValue}>{woodType.requiredLevel}</span>
                  </div>
                  <div className={styles.stat}>
                    <span>Reward:</span>
                    <span className={styles.statValue}>{woodType.baseReward} wood</span>
                  </div>
                  <div className={styles.stat}>
                    <span>Owned:</span>
                    <span className={styles.statValue}>{currentAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WoodcuttingGrid;

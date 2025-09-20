import React from 'react';
import { TreePine, Lock } from 'lucide-react';
import { useWoodcutting } from '../../hooks/useWoodcutting';
import Tooltip from '../ui/tooltip';
import WoodTooltip from './WoodTooltip';
import styles from './WoodcuttingGrid.module.scss';

const WoodcuttingGrid: React.FC = () => {
  const {
    woodTypes,
    startChopping,
    canChopWood,
    getWoodAmount,
    activeSession
  } = useWoodcutting();

  const handleWoodChop = (woodTypeId: string) => {
    if (canChopWood(woodTypeId)) {
      console.log(`Starting to chop ${woodTypeId} in loop mode`);
      startChopping(woodTypeId, true); // Starte standardmäßig im Loop-Modus
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

      <div className={styles.scenerySection}>
        <div className={styles.sceneryImage}>
          <img 
            src="/assets/img/scenery/wood_scenery.png" 
            alt="Mystical Forest with Elves"
            className={styles.sceneryImg}
          />
        </div>
        <div className={styles.sceneryDescription}>
          <h2>Mystical Forest of Eldoria</h2>
          <p>
            Deep within the enchanted woods of Eldoria, ancient trees whisper secrets of the old world. 
            Elven guardians watch over these sacred groves, where magical wood types grow in harmony with nature. 
            Each tree holds unique properties - from the common oak to the legendary Ying and Yang woods that pulse 
            with elemental energy. Master woodcutters must prove their worth to harvest these precious resources.
          </p>
        </div>
      </div>

      <div className={styles.woodGrid}>
        {woodTypes.map((woodType) => {
          const isUnlocked = canChopWood(woodType.id);
          const currentAmount = getWoodAmount(woodType.id);
          const isCurrentlyChopping = activeSession?.woodTypeId === woodType.id;
          
          return (
            <Tooltip
              key={woodType.id}
              content={
                <WoodTooltip
                  woodType={woodType}
                  isUnlocked={isUnlocked}
                  onStartChopping={() => handleWoodChop(woodType.id)}
                  isCurrentlyChopping={isCurrentlyChopping}
                  progress={activeSession?.progress || 0}
                />
              }
              position="center"
              trigger="click"
            >
              <div
                className={`${styles.woodCard} ${!isUnlocked ? styles.locked : ''} ${isCurrentlyChopping ? styles.chopping : ''}`}
              >
                <div className={`${styles.rarityTag} ${styles[woodType.rarity]}`}>
                  {woodType.rarity.toUpperCase()}
                </div>
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
                      <span>Owned:</span>
                      <span className={styles.statValue}>{currentAmount}</span>
                    </div>
                    <div className={styles.stat}>
                      <span>Duration:</span>
                      <span className={styles.statValue}>{woodType.baseTime}s</span>
                    </div>
                  </div>
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default WoodcuttingGrid;

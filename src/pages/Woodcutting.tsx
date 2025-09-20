import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { TreePine, Axe, Zap } from 'lucide-react';
import styles from './Woodcutting.module.scss';

export default function WoodcuttingPage() {
  const { gameState, toggleSkill } = useGameState();
  const woodcuttingSkill = gameState.skills.woodcutting;

  const upgrades = [
    {
      id: 'faster_chopping',
      name: 'Faster Chopping',
      description: 'Reduces chopping time by 20%',
      cost: 100,
      level: 1,
      effect: 'time_reduction'
    },
    {
      id: 'more_wood',
      name: 'More Wood',
      description: 'Increases wood gained per cycle',
      cost: 250,
      level: 1,
      effect: 'resource_multiplier'
    },
    {
      id: 'auto_chopping',
      name: 'Auto Chopping',
      description: 'Automatically starts chopping when available',
      cost: 500,
      level: 1,
      effect: 'auto_start'
    }
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <TreePine className={styles.headerIcon} size={32} />
        <div className={styles.headerContent}>
          <h1>Woodcutting</h1>
          <p>Chop wood to gather resources and gain experience</p>
        </div>
      </div>

      {/* Skill Status */}
      <div className={styles.skillCard}>
        <div className={styles.skillHeader}>
          <div className={styles.skillInfo}>
            <h2>Woodcutting Skill</h2>
            <p>Level {woodcuttingSkill.level} • {woodcuttingSkill.experience} XP</p>
          </div>
          <button
            onClick={() => toggleSkill('woodcutting')}
            className={`${styles.toggleButton} ${woodcuttingSkill.isActive ? styles.active : styles.inactive}`}
          >
            {woodcuttingSkill.isActive ? 'Stop Chopping' : 'Start Chopping'}
          </button>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span>Progress</span>
            <span>{Math.round(woodcuttingSkill.progress)}%</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${woodcuttingSkill.progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <p>Wood per Cycle</p>
            <p className={styles.woodStat}>{woodcuttingSkill.level}</p>
          </div>
          <div className={styles.statItem}>
            <p>Cycle Time</p>
            <p className={styles.timeStat}>{woodcuttingSkill.baseTime}s</p>
          </div>
          <div className={styles.statItem}>
            <p>Total Wood</p>
            <p className={styles.totalStat}>{gameState.resources.secondary.wood}</p>
          </div>
        </div>
      </div>

      {/* Upgrades */}
      <div className={styles.upgradesSection}>
        <h2>Upgrades</h2>
        <div className={styles.upgradesGrid}>
          {upgrades.map(upgrade => (
            <div key={upgrade.id} className={styles.upgradeCard}>
              <div className={styles.upgradeHeader}>
                <Axe className={styles.upgradeIcon} size={20} />
                <h3 className={styles.upgradeTitle}>{upgrade.name}</h3>
              </div>
              <p className={styles.upgradeDescription}>{upgrade.description}</p>
              <div className={styles.upgradeFooter}>
                <span className={styles.upgradeCost}>{upgrade.cost} Gold</span>
                <button 
                  className={styles.buyButton}
                  disabled={gameState.resources.primary < upgrade.cost}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className={styles.tipsCard}>
        <div className={styles.tipsContent}>
          <Zap className={styles.tipsIcon} size={20} />
          <div className={styles.tipsText}>
            <h3>Pro Tips</h3>
            <ul>
              <li>• Higher level = more wood per cycle</li>
              <li>• Upgrade your tools to chop faster</li>
              <li>• Wood is used for crafting and building</li>
              <li>• Leave the game running to gain resources while idle!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

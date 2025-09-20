import React from 'react';
import { Star, Clock, Zap, Shield } from 'lucide-react';
import styles from '../ui/Tooltip.module.scss';

interface WoodTooltipProps {
  woodType: {
    id: string;
    name: string;
    requiredLevel: number;
    baseReward: number;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    description: string;
  };
  currentLevel: number;
  isUnlocked: boolean;
  onStartChopping: () => void;
}

const WoodTooltip: React.FC<WoodTooltipProps> = ({
  woodType,
  currentLevel,
  isUnlocked,
  onStartChopping
}) => {
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

  const calculateReward = () => {
    const baseReward = woodType.baseReward;
    const levelMultiplier = Math.max(1, currentLevel - woodType.requiredLevel + 1);
    const minReward = Math.floor(baseReward * levelMultiplier * 0.8);
    const maxReward = Math.floor(baseReward * levelMultiplier * 1.2);
    return { min: minReward, max: maxReward };
  };

  const calculateEssenceChance = () => {
    const baseChance = 0.01; // 1% base chance
    const levelBonus = Math.max(0, currentLevel - woodType.requiredLevel) * 0.005; // 0.5% per level above required
    return Math.min(0.1, baseChance + levelBonus); // Max 10%
  };

  const calculateRareChance = () => {
    const baseChance = 0.0001; // 0.01% base chance
    const levelBonus = Math.max(0, currentLevel - woodType.requiredLevel) * 0.00005; // 0.005% per level above required
    return Math.min(0.01, baseChance + levelBonus); // Max 1%
  };

  const reward = calculateReward();
  const essenceChance = calculateEssenceChance();
  const rareChance = calculateRareChance();

  return (
    <>
      <div className={styles.tooltipTitle}>{woodType.name}</div>
      
      <div className={`${styles.tooltipRarity} ${styles[woodType.rarity]}`}>
        {woodType.rarity.toUpperCase()}
      </div>
      
      <div className={styles.tooltipDescription}>
        {woodType.description}
      </div>

      <div className={styles.tooltipSection}>
        <div className={styles.tooltipSectionTitle}>Requirements</div>
        <div className={styles.tooltipStats}>
          <div className={styles.tooltipStat}>
            <span className={styles.label}>Required Level</span>
            <span className={styles.value} style={{ color: isUnlocked ? '#10b981' : '#dc2626' }}>
              {woodType.requiredLevel}
            </span>
          </div>
          <div className={styles.tooltipStat}>
            <span className={styles.label}>Your Level</span>
            <span className={styles.value}>{currentLevel}</span>
          </div>
        </div>
      </div>

      <div className={styles.tooltipSection}>
        <div className={styles.tooltipSectionTitle}>Outputs</div>
        <div className={styles.tooltipStats}>
          <div className={styles.tooltipStat}>
            <span className={styles.label}>Wood</span>
            <span className={styles.value} style={{ color: '#f59e0b' }}>
              {reward.min} - {reward.max}
            </span>
          </div>
          <div className={styles.tooltipStat}>
            <span className={styles.label}>Duration</span>
            <span className={styles.value} style={{ color: '#3b82f6' }}>
              6s
            </span>
          </div>
        </div>
      </div>

      <div className={styles.tooltipSection}>
        <div className={styles.tooltipSectionTitle}>Special Drops</div>
        <div className={styles.tooltipStats}>
          <div className={styles.tooltipStat}>
            <span className={styles.label}>Essences</span>
            <span className={styles.value} style={{ color: '#8b5cf6' }}>
              {(essenceChance * 100).toFixed(2)}%
            </span>
          </div>
          <div className={styles.tooltipStat}>
            <span className={styles.label}>Rares</span>
            <span className={styles.value} style={{ color: '#f59e0b' }}>
              {(rareChance * 100).toFixed(3)}%
            </span>
          </div>
        </div>
      </div>

      <div className={styles.tooltipSection}>
        <div className={styles.tooltipSectionTitle}>Bonuses</div>
        <div className={styles.tooltipStats}>
          <div className={styles.tooltipStat}>
            <span className={styles.label}>Gather</span>
            <span className={styles.value} style={{ color: '#10b981' }}>
              ∞
            </span>
          </div>
        </div>
      </div>

      {isUnlocked && (
        <button
          className={styles.tooltipButton}
          onClick={onStartChopping}
        >
          Start Chopping
        </button>
      )}
      
      <div className={styles.tooltipHint}>
        Press <kbd>ESC</kbd> to close
      </div>
    </>
  );
};

export default WoodTooltip;

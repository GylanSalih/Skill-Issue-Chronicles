import React from 'react';
import { Play, Pause } from 'lucide-react';
import { WoodTypeConfig } from '../../config/woodConfig';
import { useWoodcutting } from '../../hooks/useWoodcutting';
import styles from '../ui/tooltip/Tooltip.module.scss';

interface WoodTooltipProps {
  woodType: WoodTypeConfig;
  isUnlocked: boolean;
  onStartChopping: () => void;
  isCurrentlyChopping: boolean;
  progress: number;
}

const WoodTooltip: React.FC<WoodTooltipProps> = ({
  woodType,
  isUnlocked,
  onStartChopping,
  isCurrentlyChopping,
  progress
}) => {
  const { getEstimatedRewards } = useWoodcutting();
  const estimatedRewards = getEstimatedRewards(woodType.id);

  if (!estimatedRewards) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.tooltipTitle}>{woodType.name}</div>
      
      <div className={`${styles.tooltipRarity} ${styles[woodType.rarity]}`}>
        {woodType.rarity.toUpperCase()}
      </div>
      
      <div className={styles.tooltipDescription}>
        {woodType.description}
      </div>

      {/* Spezielle Eigenschaften */}
      {woodType.specialProperties && (
        <div className={styles.tooltipSection}>
          <div className={styles.tooltipSectionTitle}>Special Properties</div>
          <div className={styles.tooltipStats}>
            {woodType.specialProperties.glowing && (
              <div className={styles.tooltipStat}>
                <span className={styles.label}>✨ Glowing</span>
                <span className={styles.value} style={{ color: '#fbbf24' }}>Yes</span>
              </div>
            )}
            {woodType.specialProperties.magical && (
              <div className={styles.tooltipStat}>
                <span className={styles.label}>🔮 Magical</span>
                <span className={styles.value} style={{ color: '#8b5cf6' }}>Yes</span>
              </div>
            )}
            {woodType.specialProperties.elemental && (
              <div className={styles.tooltipStat}>
                <span className={styles.label}>⚡ Element</span>
                <span className={styles.value} style={{ color: '#3b82f6' }}>
                  {woodType.specialProperties.elemental}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

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
            <span className={styles.label}>Stamina Cost</span>
            <span className={styles.value} style={{ color: '#f59e0b' }}>
              {woodType.stats.staminaCost}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.tooltipSection}>
        <div className={styles.tooltipSectionTitle}>Outputs</div>
        <div className={styles.tooltipStats}>
          <div className={styles.tooltipStat}>
            <span className={styles.label}>Wood</span>
            <span className={styles.value} style={{ color: '#f59e0b' }}>
              {estimatedRewards.minWood} - {estimatedRewards.maxWood}
            </span>
          </div>
          <div className={styles.tooltipStat}>
            <span className={styles.label}>Duration</span>
            <span className={styles.value} style={{ color: '#3b82f6' }}>
              {estimatedRewards.duration}s
            </span>
          </div>
          <div className={styles.tooltipStat}>
            <span className={styles.label}>Experience</span>
            <span className={styles.value} style={{ color: '#10b981' }}>
              {estimatedRewards.experience} XP
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
              {(estimatedRewards.essenceChance * 100).toFixed(2)}%
            </span>
          </div>
          <div className={styles.tooltipStat}>
            <span className={styles.label}>Rares</span>
            <span className={styles.value} style={{ color: '#f59e0b' }}>
              {(estimatedRewards.rareChance * 100).toFixed(3)}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar wenn aktiv */}
      {isCurrentlyChopping && (
        <div className={styles.tooltipSection}>
          <div className={styles.tooltipSectionTitle}>Progress</div>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={styles.progressText}>{Math.round(progress)}%</span>
          </div>
        </div>
      )}

      {isUnlocked && (
        <button
          className={`${styles.tooltipButton} ${isCurrentlyChopping ? styles.buttonActive : ''}`}
          onClick={onStartChopping}
          disabled={isCurrentlyChopping}
        >
          {isCurrentlyChopping ? (
            <>
              <Pause size={16} />
              Chopping... {Math.round(progress)}%
            </>
          ) : (
            <>
              <Play size={16} />
              Start Chopping
            </>
          )}
        </button>
      )}
      
      <div className={styles.tooltipHint}>
        Press <kbd>ESC</kbd> to close
      </div>
    </>
  );
};

export default WoodTooltip;

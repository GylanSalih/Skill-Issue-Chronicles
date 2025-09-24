import React, { useState, useEffect } from 'react';
import { TreePine, Lock, Clock, X } from 'lucide-react';
import { useWoodcutting } from '../../../core/hooks/useWoodcutting';
import { useGameState } from '../../../core/hooks/useGameState';
// import { useActivityManager } from '../../contexts/ActivityManager';
import Tooltip from '../ui/tooltip';
import WoodTooltip from './WoodTooltip';
import styles from './WoodcuttingGrid.module.scss';

// Import images
import woodSceneryImg from '../../../assets/img/scenery/wood_scenery.png';
import wood1Img from '../../../assets/img/Resources/Wood/NormalWood.png';

const WoodcuttingGrid: React.FC = () => {
  const {
    woodTypes,
    startChopping,
    canChopWood,
    getWoodAmount,
    activeSession,
  } = useWoodcutting();

  const { gameState } = useGameState();
  // const { getSkill, getSkillLevel, getSkillExperience } = useActivityManager();
  const woodcuttingSkill = gameState.skills.woodcutting;

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [efficiency, setEfficiency] = useState(0);

  // Skill calculations
  const getSkillLevel = () => woodcuttingSkill.level;
  const getSkillExperience = () => woodcuttingSkill.experience;
  const getRequiredExperience = () => woodcuttingSkill.level * 100;
  const getExperienceProgress = () => {
    const current = getSkillExperience();
    const required = getRequiredExperience();
    return Math.min((current / required) * 100, 100);
  };

  // Calculate efficiency based on skill level
  const calculateEfficiency = () => {
    const baseEfficiency = 25;
    const levelBonus = (getSkillLevel() - 1) * 5; // 5% per level
    const timeBonus = timeElapsed * 0.1; // Small bonus over time
    return Math.min(
      Math.round((baseEfficiency + levelBonus + timeBonus) * 10) / 10,
      100
    );
  };

  // Calculate wood bonus based on skill level
  const getWoodBonus = () => {
    return Math.floor(getSkillLevel() / 5); // +1 wood every 5 levels
  };

  // Calculate time reduction based on skill level (currently unused but kept for future use)
  // const getTimeReduction = () => {
  //   return Math.floor(skillLevel / 3) * 0.1; // 10% time reduction every 3 levels
  // };

  // Timer für aktive Session
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSession) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      setTimeElapsed(0);
    }
    return () => clearInterval(interval);
  }, [activeSession]);

  // Update efficiency based on skill level and time
  useEffect(() => {
    if (activeSession) {
      setEfficiency(calculateEfficiency());
    } else {
      setEfficiency(0);
    }
  }, [activeSession, timeElapsed, getSkillLevel()]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleWoodChop = (woodTypeId: string) => {
    if (canChopWood(woodTypeId)) {
      console.log(`Starting to chop ${woodTypeId} in loop mode`);
      startChopping(woodTypeId, true); // Starte standardmäßig im Loop-Modus
    }
  };

  const stopChopping = () => {
    // Hier würde die Stop-Funktion implementiert werden
    console.log('Stopping woodcutting');
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
            src={woodSceneryImg}
            alt='Mystical Forest with Elves'
            className={styles.sceneryImg}
          />
        </div>
        <div className={styles.sceneryDescription}>
          <h2>Mystical Forest of Eldoria</h2>
          <p>
            Deep within the enchanted woods of Eldoria, ancient trees whisper
            secrets of the old world. Elven guardians watch over these sacred
            groves, where magical wood types grow in harmony with nature. Each
            tree holds unique properties - from the common oak to the legendary
            Ying and Yang woods that pulse with elemental energy. Master
            woodcutters must prove their worth to harvest these precious
            resources.
          </p>
        </div>
      </div>

      {/* Current Action & Progress Section */}
      <div className={styles.actionProgressSection}>
        {/* Current Action */}
        <div className={styles.currentAction}>
          <div className={styles.actionHeader}>
            <h3>Current Action</h3>
            <div className={styles.actionControls}>
              <div className={styles.timer}>
                <Clock size={16} />
                <span>{formatTime(timeElapsed)}</span>
              </div>
              <button className={styles.closeBtn} onClick={stopChopping}>
                <X size={16} />
              </button>
            </div>
          </div>

          {activeSession ? (
            <div className={styles.activeAction}>
              <div className={styles.actionItem}>
                <div className={styles.actionImage}>
                  <img
                    src={
                      woodTypes.find(w => w.id === activeSession.woodTypeId)
                        ?.image || wood1Img
                    }
                    alt={
                      woodTypes.find(w => w.id === activeSession.woodTypeId)
                        ?.name || 'Unknown Wood'
                    }
                  />
                </div>
                <div className={styles.actionInfo}>
                  <div className={styles.actionName}>
                    <span>
                      {woodTypes.find(w => w.id === activeSession.woodTypeId)
                        ?.name || 'Unknown Wood'}
                    </span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${activeSession.progress}%` }}
                    />
                  </div>
                  <div className={styles.actionStats}>
                    <span className={styles.quantity}>
                      +
                      {Math.floor(activeSession.progress / 10) + getWoodBonus()}{' '}
                      ({getWoodAmount(activeSession.woodTypeId)} total)
                    </span>
                    <span className={styles.resourceTime}>
                      {woodTypes.find(w => w.id === activeSession.woodTypeId)
                        ?.baseTime || 3}
                      s
                    </span>
                    <span className={styles.expRate}>
                      {woodTypes.find(w => w.id === activeSession.woodTypeId)
                        ?.baseTime
                        ? (
                            (0.25 *
                              (woodTypes.find(
                                w => w.id === activeSession.woodTypeId
                              )?.baseTime || 1)) /
                            10
                          ).toFixed(2)
                        : '0.25'}{' '}
                      EXP/s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.noAction}>
              <p>No active woodcutting session</p>
              <span>Click on a wood type below to start chopping</span>
            </div>
          )}
        </div>

        {/* Your Progress */}
        <div className={styles.yourProgress}>
          <div className={styles.progressHeader}>
            <h3>Your Progress</h3>
            <div className={styles.efficiency}>{efficiency}% Efficiency</div>
          </div>

          <div className={styles.activeAction}>
            <div className={styles.actionItem}>
              <div className={styles.actionImage}>
                <TreePine size={32} />
                <div className={styles.skillLevelBadge}>
                  Lv. {getSkillLevel()}
                </div>
              </div>
              <div className={styles.actionInfo}>
                <div className={styles.actionName}>
                  <span>Woodcutting</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${getExperienceProgress()}%` }}
                  />
                </div>
                <div className={styles.actionStats}>
                  <span className={styles.quantity}>
                    {getRequiredExperience() - getSkillExperience()} EXP{' '}
                    <span className={styles.neededText}>Needed</span>
                  </span>
                  <span className={styles.resourceTime}>
                    {Math.round(getExperienceProgress())}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.woodGrid}>
        {woodTypes.map(woodType => {
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
              position='center'
              trigger='click'
            >
              <div
                className={`${styles.woodCard} ${!isUnlocked ? styles.locked : ''} ${isCurrentlyChopping ? styles.chopping : ''}`}
              >
                <div
                  className={`${styles.rarityTag} ${styles[woodType.rarity]}`}
                >
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
                  <p className={styles.woodDescription}>
                    {woodType.description}
                  </p>
                  <div className={styles.woodStats}>
                    <div className={styles.stat}>
                      <span>Level Required:</span>
                      <span className={styles.statValue}>
                        {woodType.requiredLevel}
                      </span>
                    </div>
                    <div className={styles.stat}>
                      <span>Owned:</span>
                      <span className={styles.statValue}>{currentAmount}</span>
                    </div>
                    <div className={styles.stat}>
                      <span>Duration:</span>
                      <span className={styles.statValue}>
                        {woodType.baseTime}s
                      </span>
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

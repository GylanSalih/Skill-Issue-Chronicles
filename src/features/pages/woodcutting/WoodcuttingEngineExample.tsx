/**
 * 🌲 WOODCUTTING ENGINE EXAMPLE
 *
 * Beispiel-Implementierung wie die neue MelvorEngine für Woodcutting verwendet wird.
 * Zeigt die Migration von der alten verstreuten Logik zur neuen zentralen Engine.
 *
 * ✨ Features:
 * - Zentrale Engine-Integration
 * - Reaktive UI-Updates
 * - Einheitliche Activity-Verwaltung
 * - Performance-optimiert
 */

import React, { useMemo } from 'react';
import {
  getSkillDefinition,
  getUnlockedActivities,
  useSkill,
} from '../../../core/engine';
import styles from './Woodcutting.module.scss';

const WoodcuttingEngineExample: React.FC = () => {
  const woodcuttingSkill = useSkill('woodcutting');

  // Hole verfügbare Aktivitäten basierend auf Level
  const availableActivities = useMemo(() => {
    const skillDef = getSkillDefinition('woodcutting');
    if (!skillDef) return [];

    return getUnlockedActivities('woodcutting', woodcuttingSkill.level);
  }, [woodcuttingSkill.level]);

  // Aktuell aktive Aktivität
  const currentActivity = woodcuttingSkill.activeActivity;

  // ==================== EVENT HANDLERS ====================

  const handleStartChopping = (activityId: string) => {
    const success = woodcuttingSkill.startActivity(activityId, { loop: false });
    if (!success) {
      console.log(`Could not start ${activityId} - requirements not met`);
    }
  };

  const handleStopChopping = () => {
    woodcuttingSkill.stopActivity();
  };

  const handleToggleLoop = () => {
    woodcuttingSkill.toggleLoop();
  };

  // ==================== RENDER HELPERS ====================

  const renderSkillInfo = () => (
    <div className={styles.skillInfo}>
      <h2>Woodcutting</h2>
      <div className={styles.levelInfo}>
        <span>Level: {woodcuttingSkill.level}</span>
        <span>Experience: {woodcuttingSkill.experience}</span>
        <span>Next Level: {woodcuttingSkill.nextLevelExperience} XP</span>
      </div>

      {/* Level Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${woodcuttingSkill.levelProgress}%` }}
        />
        <span className={styles.progressText}>
          {woodcuttingSkill.levelProgress.toFixed(1)}%
        </span>
      </div>
    </div>
  );

  const renderCurrentActivity = () => {
    if (!currentActivity) {
      return (
        <div className={styles.noActivity}>
          <p>No active woodcutting activity</p>
        </div>
      );
    }

    const activityDef = availableActivities.find(
      a => a.id === currentActivity.activityId
    );
    if (!activityDef) return null;

    return (
      <div className={styles.currentActivity}>
        <h3>Currently Chopping: {activityDef.name}</h3>

        {/* Activity Progress */}
        <div className={styles.activityProgress}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${woodcuttingSkill.progress}%` }}
            />
            <span className={styles.progressText}>
              {woodcuttingSkill.progress.toFixed(1)}%
            </span>
          </div>

          <div className={styles.activityInfo}>
            <span>Time: {activityDef.baseTime}s</span>
            <span>Looping: {currentActivity.isLooping ? '✓' : '✗'}</span>
            <span>Count: {currentActivity.loopCount}</span>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.activityControls}>
          <button onClick={handleStopChopping} className={styles.stopButton}>
            Stop Chopping
          </button>
          <button
            onClick={handleToggleLoop}
            className={`${styles.loopButton} ${currentActivity.isLooping ? styles.active : ''}`}
          >
            {currentActivity.isLooping ? 'Disable Loop' : 'Enable Loop'}
          </button>
        </div>
      </div>
    );
  };

  const renderWoodTypes = () => (
    <div className={styles.woodTypes}>
      <h3>Available Wood Types</h3>
      <div className={styles.woodGrid}>
        {availableActivities.map(activity => {
          const canPerform = woodcuttingSkill.canPerformActivity(activity.id);
          const isActive = currentActivity?.activityId === activity.id;

          return (
            <div
              key={activity.id}
              className={`${styles.woodCard} ${styles[activity.rarity]} ${isActive ? styles.active : ''}`}
            >
              {activity.image && (
                <img
                  src={activity.image}
                  alt={activity.name}
                  className={styles.woodImage}
                />
              )}

              <div className={styles.woodInfo}>
                <h4>{activity.name}</h4>
                <p className={styles.description}>{activity.description}</p>

                <div className={styles.requirements}>
                  <span>Level: {activity.requiredLevel}</span>
                  <span>Time: {activity.baseTime}s</span>
                  <span>Rarity: {activity.rarity}</span>
                </div>

                {/* Rewards Preview */}
                <div className={styles.rewards}>
                  {activity.baseRewards.map((reward, index) => (
                    <div key={index} className={styles.reward}>
                      <span>
                        {reward.resourceId}: {reward.minAmount}-
                        {reward.maxAmount}
                      </span>
                      <span>XP: {reward.experienceGain}</span>
                      {reward.chance < 1 && (
                        <span>Chance: {(reward.chance * 100).toFixed(1)}%</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleStartChopping(activity.id)}
                  disabled={!canPerform || isActive}
                  className={`${styles.chopButton} ${canPerform ? styles.enabled : styles.disabled}`}
                >
                  {isActive
                    ? 'Chopping...'
                    : canPerform
                      ? 'Start Chopping'
                      : 'Level Too Low'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ==================== MAIN RENDER ====================

  return (
    <div className={styles.woodcuttingContainer}>
      {renderSkillInfo()}
      {renderCurrentActivity()}
      {renderWoodTypes()}

      {/* Debug Info (remove in production) */}
      <div className={styles.debugInfo}>
        <h4>Debug Info</h4>
        <pre>
          {JSON.stringify(
            {
              level: woodcuttingSkill.level,
              experience: woodcuttingSkill.experience,
              isActive: woodcuttingSkill.isActive,
              progress: woodcuttingSkill.progress,
              currentActivity: currentActivity?.activityId,
              availableCount: availableActivities.length,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};

export default WoodcuttingEngineExample;

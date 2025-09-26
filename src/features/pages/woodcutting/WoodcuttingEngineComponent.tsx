import { ChevronRight, Clock, Star, TreePine, X, Zap } from 'lucide-react';
import React, { useMemo } from 'react';
import woodSceneryImg from '../../../assets/img/scenery/wood_scenery.png';
import {
  addExperience,
  getSkillDefinition,
  getUnlockedActivities,
  modalManager,
  useMelvorEngine,
  useResources,
  useSkill,
} from '../../../core/engine';
import {
  SimpleTooltip,
  TooltipData,
} from '../../../shared/components/ui/SimpleTooltip';
import styles from './Woodcutting.module.scss';

const WoodcuttingEngineComponent: React.FC = () => {
  const woodcuttingSkill = useSkill('woodcutting');
  const { resources } = useResources();
  const engine = useMelvorEngine();

  const {
    skill,
    level,
    experience,
    levelProgress,
    nextLevelExperience,
    isActive,
    activeActivity,
    progress,
    startActivity,
    stopActivity,
    canPerformActivity,
  } = woodcuttingSkill;

  // Get wood amounts from resources
  const woodAmount = resources.normalWood || 0;
  const totalWoodAmount = Object.entries(resources)
    .filter(
      ([key]) =>
        key.includes('Wood') || key.includes('wood') || key.includes('bark')
    )
    .reduce((sum, [, amount]) => sum + (amount || 0), 0);

  // Calculate active time (simplified)
  const activeTime = isActive
    ? Date.now() - (activeActivity?.startTime || Date.now())
    : 0;

  // Get skill definition and unlocked activities
  const skillDef = getSkillDefinition('woodcutting');
  const unlockedActivities = useMemo(() => {
    if (!skillDef) {
      console.log('❌ No skill definition found for woodcutting');
      return [];
    }
    const activities = getUnlockedActivities('woodcutting', level);
    console.log('🌳 Woodcutting activities:', activities);
    console.log('📊 Current level:', level);
    console.log('🎯 Skill definition:', skillDef);
    return activities;
  }, [skillDef, level]);

  // Format time helper
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  // Handle opening activity modal
  const handleOpenActivityModal = (activity: any) => {
    const currentResource = resources[activity.id] || 0;

    modalManager.openActivityModal(
      activity,
      'woodcutting',
      level,
      canPerformActivity(activity.id),
      {
        canStart: !isActive && canPerformActivity(activity.id),
        canStop: isActive && activeActivity?.activityId === activity.id,
        isActive: isActive && activeActivity?.activityId === activity.id,
        onStart: () => {
          if (!isActive && canPerformActivity(activity.id)) {
            startActivity(activity.id, { loop: true });
          }
        },
        onStop: () => {
          if (isActive) {
            stopActivity();
          }
        },
      },
      currentResource
    );
  };

  // Handle starting an activity (keep for backward compatibility)
  const handleStartActivity = (activityId: string) => {
    if (!isActive && canPerformActivity(activityId)) {
      startActivity(activityId, { loop: true });
    }
  };

  // Handle stopping current activity
  const handleStop = () => {
    if (isActive) {
      stopActivity();
    }
  };

  // Handle toggle (start/stop)
  const handleToggle = () => {
    if (isActive) {
      stopActivity();
    } else if (unlockedActivities.length > 0) {
      // Start with the first available activity
      const firstActivity = unlockedActivities[0];
      startActivity(firstActivity.id, { loop: true });
    }
  };

  const canStart = unlockedActivities.length > 0 && !isActive;

  // Debug: Level up function for testing
  const handleDebugLevelUp = () => {
    // Add 1000 experience to woodcutting
    addExperience('woodcutting', 1000);
    console.log('🚀 Debug: Added 1000 XP to woodcutting');
  };

  return (
    <div className={styles.woodcuttingGrid}>
      {/* Header */}
      <div className={styles.header}>
        <TreePine size={32} className={styles.headerIcon} />
        <div className={styles.headerContent}>
          <h1>Woodcutting</h1>
          <p>Chop trees to gather wood and gain experience</p>
        </div>
      </div>

      {/* Skill Info */}
      <div className={styles.skillInfo}>
        <div className={styles.skillLevel}>
          <span>Level: {level}</span>
          <span>Experience: {experience.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            className={`${styles.toggleButton} ${isActive ? styles.active : styles.inactive}`}
            onClick={handleToggle}
            disabled={!canStart}
          >
            {isActive ? 'Stop Chopping' : 'Start Chopping'}
          </button>
          <button
            onClick={handleDebugLevelUp}
            style={{
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '600',
            }}
          >
            🚀 Debug: Level Up
          </button>
        </div>
      </div>

      {/* Scenery Section */}
      <div className={styles.scenerySection}>
        <div className={styles.sceneryImage}>
          <img
            src={woodSceneryImg}
            alt='Wood Scenery'
            className={styles.sceneryImg}
          />
        </div>
        <div className={styles.sceneryDescription}>
          <h2>Woodcutting Area</h2>
          <p>
            Welcome to the woodcutting area! Here you can chop various types of
            trees to gather wood and gain experience. Higher level trees provide
            better rewards and more experience points.
          </p>
        </div>
      </div>

      {/* Action Progress Section */}
      <div className={styles.actionProgressSection}>
        {/* Current Action */}
        <div className={styles.currentAction}>
          <div className={styles.actionHeader}>
            <h3>Current Action</h3>
            <div className={styles.actionControls}>
              {isActive && (
                <div className={styles.timer}>
                  <Clock size={16} />
                  <span>{formatTime(activeTime)}</span>
                </div>
              )}
              {isActive && (
                <button className={styles.closeBtn} onClick={handleStop}>
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {isActive && activeActivity ? (
            <div className={styles.activeAction}>
              <div className={styles.actionItem}>
                <div className={styles.actionImage}>
                  <TreePine size={40} />
                </div>
                <div className={styles.actionInfo}>
                  <div className={styles.actionName}>
                    <span className={styles.activityName}>Woodcutting</span>
                    <span className={styles.itemName}>
                      {activeActivity.activityId}
                    </span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className={styles.actionStats}>
                    <span className={styles.quantity}>
                      {activeActivity.activityId}:{' '}
                      {resources[activeActivity.activityId] || 0}
                    </span>
                    <span className={styles.resourceTime}>
                      Total Wood: {totalWoodAmount.toLocaleString()}
                    </span>
                    <span className={styles.expRate}>
                      Exp: {experience.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.noAction}>
              <p>No active woodcutting</p>
              <span>Select a tree type below to start</span>
            </div>
          )}
        </div>

        {/* Your Progress */}
        <div className={styles.yourProgress}>
          <div className={styles.progressHeader}>
            <h3>Your Progress</h3>
            <span className={styles.efficiency}>Efficiency: 100%</span>
          </div>

          <SimpleTooltip
            data={{
              title: 'Woodcutting Skill',
              description: 'Your woodcutting skill level and progress',
              stats: {
                level: level,
                experience: experience,
                nextLevel: nextLevelExperience - experience,
                progress: levelProgress,
              },
              resources: [
                { name: 'Total Wood', amount: totalWoodAmount },
                { name: 'Normal Wood', amount: woodAmount },
              ],
            }}
            position='center'
            clickToShow={true}
            showStartButton={true}
            onStart={() => {
              console.log('Starting woodcutting activity!');
              // Hier kannst du die Aktivität starten
            }}
          >
            <div className={styles.skillProgress}>
              <div className={styles.skillIcon}>
                <TreePine size={32} />
                <div className={styles.skillLevelBadge}>Lv.{level}</div>
              </div>
              <div className={styles.skillInfo}>
                <div className={styles.skillName}>Woodcutting</div>
                <div className={styles.skillProgressBar}>
                  <div
                    className={styles.skillProgressFill}
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
                <div className={styles.skillStats}>
                  <span className={styles.expNeeded}>
                    <Zap size={12} />
                    <span className={styles.neededText}>Needed:</span>{' '}
                    {nextLevelExperience - experience}
                  </span>
                  <span className={styles.percentage}>
                    {levelProgress.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </SimpleTooltip>

          <div className={styles.skillBenefits}>
            <div className={styles.benefitItem}>
              <TreePine size={16} />
              <span>Unlocks new tree types</span>
            </div>
            <div className={styles.benefitItem}>
              <Zap size={16} />
              <span>Increases wood gathering speed</span>
            </div>
            <div className={styles.benefitItem}>
              <Star size={16} />
              <span>Better resource rewards</span>
            </div>
          </div>

          <button className={styles.ascensionBtn}>
            <Star size={16} />
            <span>Ascension Available</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Wood Grid */}
      <div className={styles.woodGrid}>
        {unlockedActivities.length > 0 ? (
          unlockedActivities.map(activity => {
            const canPerform = canPerformActivity(activity.id);
            const currentResource = resources[activity.id] || 0;

            // Create tooltip data for this activity
            const tooltipData: TooltipData = {
              title: activity.name,
              description: activity.description,
              stats: {
                level: level,
                experience: experience,
                nextLevel: nextLevelExperience - experience,
                progress: levelProgress,
              },
              resources: [
                {
                  name: activity.name,
                  amount: currentResource,
                },
              ],
              requirements: {
                level: activity.requiredLevel,
              },
            };

            return (
              <SimpleTooltip
                key={activity.id}
                data={tooltipData}
                position='center'
                clickToShow={true}
                showStartButton={canPerform}
                onStart={() => {
                  console.log(`Starting ${activity.name} activity!`);
                  handleOpenActivityModal(activity);
                }}
              >
                <div
                  className={`${styles.woodCard} ${
                    isActive && activeActivity?.activityId === activity.id
                      ? styles.chopping
                      : ''
                  } ${!canPerform ? styles.disabled : ''}`}
                  onClick={() => handleOpenActivityModal(activity)}
                >
                  <div className={styles.woodImageContainer}>
                    <img
                      src={activity.image}
                      alt={activity.name}
                      className={styles.woodImage}
                    />
                    <div
                      className={styles.rarityTag}
                      data-rarity={activity.rarity}
                    >
                      {activity.rarity}
                    </div>
                    {currentResource > 0 && (
                      <div className={styles.resourceBadge}>
                        {currentResource.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className={styles.woodInfo}>
                    <h3>{activity.name}</h3>
                    <p>{activity.description}</p>
                  </div>
                  <div className={styles.woodStats}>
                    <div className={styles.stat}>
                      <span>Level Required:</span>
                      <span
                        className={`${styles.statValue} ${level >= activity.requiredLevel ? styles.met : styles.notMet}`}
                      >
                        {activity.requiredLevel}
                      </span>
                    </div>
                    <div className={styles.stat}>
                      <span>Base Time:</span>
                      <span className={styles.statValue}>
                        {activity.baseTime}s
                      </span>
                    </div>
                    <div className={styles.stat}>
                      <span>Experience:</span>
                      <span className={styles.statValue}>
                        {activity.baseRewards.reduce(
                          (sum, reward) => sum + reward.experienceGain,
                          0
                        )}{' '}
                        XP
                      </span>
                    </div>
                  </div>
                </div>
              </SimpleTooltip>
            );
          })
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '2rem',
              color: '#9ca3af',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
              border: '1px solid #444',
              borderRadius: '12px',
            }}
          >
            <h3>No Wood Types Available</h3>
            <p>Level up to unlock more wood types!</p>
            <p>Current Level: {level}</p>
            <p>Activities found: {unlockedActivities.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WoodcuttingEngineComponent;

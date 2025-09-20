import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { useWoodcutting } from '../../hooks/useWoodcutting';
import { Coins, Crown, User, PanelRight, PanelLeft, TreePine, Square } from 'lucide-react';
import { getWoodTypeById } from '../../config/woodConfig';
import styles from './GameHeader.module.scss';

interface GameHeaderProps {
  onToggleResourcePanel: () => void;
  isResourcePanelVisible: boolean;
}

const GameHeader: React.FC<GameHeaderProps> = ({ onToggleResourcePanel, isResourcePanelVisible }) => {
  const { gameState } = useGameState();
  const { activeSession, stopChopping, isLooping } = useWoodcutting();

  // Handle Woodcutting Progress
  const currentWoodTypeConfig = activeSession ? getWoodTypeById(activeSession.woodTypeId) : null;
  const isWoodcutting = activeSession?.isActive || false;
  const woodcuttingProgress = activeSession?.progress || 0;

  const handleStopWoodcutting = () => {
    if (activeSession) {
      stopChopping();
    }
  };


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left: Woodcutting Progress */}
        <div className={styles.leftSection}>


            <div className={styles.woodcuttingContainer}>
              <div className={styles.woodcuttingHeader}>
                <div className={styles.woodcuttingIcon}>
                  <TreePine size={16} />
                </div>
                <div className={styles.woodcuttingInfo}>
                  <div className={styles.woodcuttingTitle}>
                    {isWoodcutting && currentWoodTypeConfig 
                      ? `Chopping ${currentWoodTypeConfig.name}` 
                      : 'Woodcutting Activity'
                    }
                  </div>
                  <div className={styles.woodcuttingDuration}>
                    {isWoodcutting && currentWoodTypeConfig ? (
                      <>
                        {currentWoodTypeConfig.baseTime}s • {currentWoodTypeConfig.rarity.toUpperCase()}
                        {isLooping && <span className={styles.loopIndicator}> • LOOPING</span>}
                      </>
                    ) : (
                      'Click on wood to start chopping'
                    )}
                  </div>
                </div>
                {isWoodcutting && (
                  <div className={styles.woodcuttingControls}>
                    <button 
                      className={styles.stopButton}
                      onClick={handleStopWoodcutting}
                      title="Stop Chopping"
                    >
                      <Square size={12} />
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.woodcuttingProgress}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${woodcuttingProgress}%` }}
                  />
                </div>
                <div className={styles.progressValue}>
                  {isWoodcutting ? `${Math.round(woodcuttingProgress)}%` : '0%'}
                </div>
              </div>
            </div>





          <div className={styles.slot}>Slot 2</div>
          <div className={styles.slot}>Slot 3</div>
        </div>

        {/* Center: More empty slots */}
        <div className={styles.centerSection}>
          <div className={styles.slot}>Center Slot 1</div>
          <div className={styles.slot}>Center Slot 2</div>
          <div className={styles.slot}>Center Slot 3</div>
        </div>

        {/* Right: Player Profile */}
        <div className={styles.rightSection}>
          {isResourcePanelVisible ? (
            <div 
              className={styles.toggleIcon} 
              onClick={onToggleResourcePanel}
              title="Resource Panel ausblenden"
            >
              <PanelLeft size={20} />
            </div>
          ) : (
            <div 
              className={styles.toggleIcon} 
              onClick={onToggleResourcePanel}
              title="Resource Panel anzeigen"
            >
              <PanelRight size={20} />
            </div>
          )}
          <div className={styles.playerProfile}>
            <div className={styles.playerInfo}>
              <div className={styles.playerName}>PlayerName</div>
              <div className={styles.playerStats}>
                <div className={styles.statItem}>
                  <Crown size={14} />
                  <span>Level 1</span>
                </div>
                <div className={styles.statItem}>
                  <Coins size={14} />
                  <span>{gameState.resources.primary.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className={styles.profileImage}>
              <User size={24} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;

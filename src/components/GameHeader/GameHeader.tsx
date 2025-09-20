import React, { useState, useEffect } from 'react';
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

  // Einfacher Ladebalken State
  const [simpleProgress, setSimpleProgress] = useState(0);

  // Handle Woodcutting Progress
  const currentWoodTypeConfig = activeSession ? getWoodTypeById(activeSession.woodTypeId) : null;
  const isWoodcutting = activeSession?.isActive || false;

  // Einfacher Timer basierend auf Resource-Zeit
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isWoodcutting && currentWoodTypeConfig) {
      setSimpleProgress(0);
      
      const duration = currentWoodTypeConfig.baseTime * 1000; // in ms
      const updateInterval = duration / 100; // 100 Updates für smooth progress
      
      interval = setInterval(() => {
        setSimpleProgress(prev => {
          if (prev >= 100) {
            return 0; // Zurück auf 0% setzen
          }
          return prev + 1;
        });
      }, updateInterval);
    } else {
      setSimpleProgress(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWoodcutting, currentWoodTypeConfig]);

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
                  <TreePine size={14} />
                </div>
                <div className={styles.woodcuttingInfo}>
                  <div className={styles.woodcuttingTitle}>
                    {isWoodcutting && currentWoodTypeConfig 
                      ? currentWoodTypeConfig.name
                      : 'Woodcutting'
                    }
                  </div>
                  <div className={styles.woodcuttingMeta}>
                    {isWoodcutting && currentWoodTypeConfig ? (
                      <div className={styles.metaRow}>
                        <span className={styles.duration}>{currentWoodTypeConfig.baseTime}s</span>
                        <span className={styles.separator}>•</span>
                        <span className={`${styles.rarity} ${styles[currentWoodTypeConfig.rarity]}`}>
                          {currentWoodTypeConfig.rarity}
                        </span>
                        {isLooping && (
                          <>
                            <span className={styles.separator}>•</span>
                            <span className={styles.looping}>Looping</span>
                          </>
                        )}
                      </div>
                    ) : (
                      <span className={styles.idleText}>Click wood to start</span>
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
                      <Square size={10} />
                    </button>
                  </div>
                )}
              </div>
              {isWoodcutting && (
                <div className={styles.woodcuttingProgress}>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${simpleProgress}%` }}
                    />
                    <div className={styles.progressValue}>
                      {Math.round(simpleProgress)}%
                    </div>
                  </div>
                </div>
              )}
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../../hooks/useGameState';
import { useWoodcutting } from '../../hooks/useWoodcutting';
import { useCharacter, useCharacterClasses } from '../../contexts/GameContext';
import { Coins, Crown, PanelRight, PanelLeft, TreePine, Square, Bell, MessageCircle } from 'lucide-react';
import { getWoodTypeById } from '../../config/woodConfig';
import styles from './GameHeader.module.scss';

interface GameHeaderProps {
  onToggleResourcePanel: () => void;
  isResourcePanelVisible: boolean;
}

const GameHeader: React.FC<GameHeaderProps> = ({ onToggleResourcePanel, isResourcePanelVisible }) => {
  const navigate = useNavigate();
  const { gameState } = useGameState();
  const { activeSession, stopChopping, isLooping } = useWoodcutting();
  const { currentCharacter } = useCharacter();
  const { getClassById } = useCharacterClasses();

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

  const handlePlayerProfileClick = () => {
    navigate('/character');
  };

  // Get character icon
  const getCharacterIcon = () => {
    if (!currentCharacter) return '/assets/img/avatars/warrior.png';
    const classData = getClassById(currentCharacter.characterClassId);
    return classData?.image || '/assets/img/avatars/warrior.png';
  };

  // Get activity type and name based on active session
  const getActivityInfo = () => {
    if (isWoodcutting && currentWoodTypeConfig) {
      return {
        type: 'Woodcutting',
        name: currentWoodTypeConfig.name,
        icon: <TreePine size={16} />
      };
    }
    
    // Hier können später andere Aktivitäten hinzugefügt werden
    // Beispiel für zukünftige Aktivitäten:
    // if (isMining && currentOreConfig) {
    //   return {
    //     type: 'Mining',
    //     name: currentOreConfig.name,
    //     icon: <Pickaxe size={16} />
    //   };
    // }
    // 
    // if (isFishing && currentFishConfig) {
    //   return {
    //     type: 'Fishing',
    //     name: currentFishConfig.name,
    //     icon: <Fish size={16} />
    //   };
    // }
    
    return null;
  };


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left: Activity Progress */}
        <div className={styles.leftSection}>
          {(() => {
            const activityInfo = getActivityInfo();
            return activityInfo ? (
              <button 
                className={styles.simpleTimer}
                onClick={() => navigate('/woodcutting')}
                title={`Click to go to ${activityInfo.name}`}
              >
                <div className={styles.timerIcon}>
                  <img 
                    src={currentWoodTypeConfig?.image} 
                    alt={activityInfo.name}
                  />
                </div>
                <div className={styles.timerInfo}>
                  <div className={styles.timerName}>
                    <span className={styles.activityName}>{activityInfo.type}</span>
                    <span className={styles.itemName}>{activityInfo.name}</span>
                  </div>
                  <div className={styles.timerProgress}>
                    <div 
                      className={styles.timerFill} 
                      style={{ width: `${simpleProgress}%` }}
                    />
                  </div>
                </div>
              </button>
            ) : (
              <div className={styles.noActivity}>
                <TreePine size={16} />
                <span>No active resource gathering</span>
              </div>
            );
          })()}





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
          {/* Notifications Bell */}
          <div 
            className={styles.notificationIcon}
            onClick={() => {
              // TODO: Implement notification panel
              console.log('Notifications clicked');
            }}
            title="Wichtige Nachrichten"
          >
            <Bell size={20} />
            {/* Notification Badge */}
            <div className={styles.notificationBadge}>3</div>
          </div>
          
          {/* Chat/Message Icon */}
          <div 
            className={styles.messageIcon}
            onClick={() => {
              // TODO: Implement chat panel
              console.log('Chat clicked');
            }}
            title="Chat & Nachrichten"
          >
            <MessageCircle size={20} />
            {/* Message Badge */}
            <div className={styles.messageBadge}>5</div>
          </div>
          
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
          <div 
            className={styles.playerProfile}
            onClick={handlePlayerProfileClick}
            style={{ cursor: 'pointer' }}
            title="Character öffnen"
          >
            <div className={styles.playerInfo}>
              <div className={styles.playerName}>
                {currentCharacter?.name || 'Kein Charakter'}
              </div>
              <div className={styles.playerStats}>
                <div className={styles.statItem}>
                  <Crown size={14} />
                  <span>Level {currentCharacter?.level || 1}</span>
                </div>
                <div className={styles.statItem}>
                  <Coins size={14} />
                  <span>{gameState.resources.primary.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className={styles.profileImage}>
              <img 
                src={getCharacterIcon()} 
                alt={currentCharacter?.name || 'Character'}
                className={styles.characterAvatar}
                onError={(e) => {
                  e.currentTarget.src = '/assets/img/avatars/warrior.png';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;

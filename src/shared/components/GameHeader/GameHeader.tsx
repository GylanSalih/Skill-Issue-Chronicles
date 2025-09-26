import {
  Bell,
  Coins,
  Crown,
  Gem,
  LogOut,
  MessageCircle,
  Moon,
  PanelLeft,
  PanelRight,
  Settings,
  Sun,
  TreePine,
  User,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCharacter,
  useCharacterClasses,
} from '../../../core/contexts/GameContext';
import { useSkill } from '../../../core/engine';
import { useGameState } from '../../../core/hooks/useGameState';
import { formatTimeWithSeconds } from '../../../core/services/dateUtils';
import styles from './GameHeader.module.scss';

// Import avatar images
import warriorImg from '@assets/img/avatars/warrior.png';

interface GameHeaderProps {
  onToggleResourcePanel: () => void;
  isResourcePanelVisible: boolean;
  onToggleResourcePanelCollapse?: () => void;
  isResourcePanelCollapsed?: boolean;
  onToggleSideMenu?: () => void;
  isSideMenuCollapsed?: boolean;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  onToggleResourcePanel,
  isResourcePanelVisible,
  onToggleResourcePanelCollapse,
  isResourcePanelCollapsed,
  onToggleSideMenu,
  isSideMenuCollapsed,
}) => {
  const navigate = useNavigate();
  const { gameState } = useGameState();
  const woodcuttingSkill = useSkill('woodcutting');
  const { currentCharacter } = useCharacter();
  const { getClassById } = useCharacterClasses();

  // Einfacher Ladebalken State
  const [simpleProgress, setSimpleProgress] = useState(0);

  // Character dropdown state
  const [isCharacterDropdownOpen, setIsCharacterDropdownOpen] = useState(false);

  // Current time state
  const [currentTime, setCurrentTime] = useState(new Date());

  // Determine if it's day or night
  const isDayTime = () => {
    const hour = currentTime.getHours();
    return hour >= 6 && hour < 18; // 6 AM to 6 PM is day time
  };

  // Handle Woodcutting Progress
  const isWoodcutting = woodcuttingSkill.isActive;
  const currentActivity = woodcuttingSkill.activeActivity;

  // Einfacher Timer basierend auf Resource-Zeit
  useEffect(() => {
    if (isWoodcutting && currentActivity) {
      // Use the progress from the engine
      setSimpleProgress(woodcuttingSkill.progress);
    } else {
      setSimpleProgress(0);
    }
  }, [isWoodcutting, currentActivity, woodcuttingSkill.progress]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isCharacterDropdownOpen &&
        !target.closest(`.${styles.playerProfile}`)
      ) {
        setIsCharacterDropdownOpen(false);
      }
    };

    if (isCharacterDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCharacterDropdownOpen]);

  // const handleStopWoodcutting = () => {
  //   if (woodcuttingSkill.isActive) {
  //     woodcuttingSkill.stopActivity();
  //   }
  // };

  const handlePlayerProfileClick = () => {
    navigate('/character');
  };

  const handleCharacterDropdownToggle = () => {
    setIsCharacterDropdownOpen(!isCharacterDropdownOpen);
  };

  const handleCharacterDropdownClose = () => {
    setIsCharacterDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/character/profile');
    setIsCharacterDropdownOpen(false);
  };

  const handleCharacterSelectionClick = () => {
    navigate('/character-selection');
    setIsCharacterDropdownOpen(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setIsCharacterDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    navigate('/login');
    setIsCharacterDropdownOpen(false);
  };

  // Get character icon
  const getCharacterIcon = () => {
    if (!currentCharacter) return warriorImg;
    const classData = getClassById(currentCharacter.characterClassId);
    return classData?.image || warriorImg;
  };

  // Get activity type and name based on active session
  const getActivityInfo = () => {
    if (isWoodcutting && currentActivity) {
      return {
        type: 'Woodcutting',
        name: currentActivity.activityId,
        icon: <TreePine size={16} />,
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
        {/* Left: SideMenu Toggle + Activity Progress */}
        <div className={styles.leftSection}>
          {/* SideMenu Toggle - links vom Content */}
          {onToggleSideMenu && (
            <div
              className={styles.sideMenuToggle}
              onClick={onToggleSideMenu}
              title={
                isSideMenuCollapsed
                  ? 'SideMenu anzeigen'
                  : 'SideMenu ausblenden'
              }
            >
              {isSideMenuCollapsed ? (
                <PanelRight size={20} />
              ) : (
                <PanelLeft size={20} />
              )}
            </div>
          )}
          {(() => {
            const activityInfo = getActivityInfo();
            return activityInfo ? (
              <button
                className={styles.simpleTimer}
                onClick={() => navigate('/woodcutting')}
                title={`Click to go to ${activityInfo.name}`}
              >
                <div className={styles.timerIcon}>
                  <TreePine size={20} />
                </div>
                <div className={styles.timerInfo}>
                  <div className={styles.timerName}>
                    <span className={styles.activityName}>
                      {activityInfo.type}
                    </span>
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
          {/* Gem Currency Slot */}
          <div
            className={styles.gemSlot}
            onClick={() => {
              // TODO: Implement gem/inventory panel
              console.log('Gem clicked');
            }}
            title='Edelsteine & Seltene Items'
          >
            <div className={styles.gemIcon}>
              <Gem size={16} />
            </div>
            <div className={styles.gemAmount}>1,247</div>
          </div>

          {/* Day/Night Icon */}
          <div
            className={styles.dayNightContainer}
            onClick={() => {
              // TODO: Implement day/night cycle info
              console.log('Day/Night clicked');
            }}
            title={`Aktuelle Zeit - ${isDayTime() ? 'Tageszeit' : 'Nachtzeit'}`}
          >
            <div className={styles.dayNightIcon}>
              {isDayTime() ? (
                <Sun size={16} style={{ color: '#f59e0b' }} />
              ) : (
                <Moon size={16} style={{ color: '#3b82f6' }} />
              )}
            </div>
            <div className={styles.dayNightText}>
              {formatTimeWithSeconds(currentTime.toISOString())}
            </div>
          </div>

          {/* Notifications Bell */}
          <div
            className={styles.notificationIcon}
            onClick={() => {
              // TODO: Implement notification panel
              console.log('Notifications clicked');
            }}
            title='Wichtige Nachrichten'
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
            title='Chat & Nachrichten'
          >
            <MessageCircle size={20} />
            {/* Message Badge */}
            <div className={styles.messageBadge}>5</div>
          </div>

          {isResourcePanelVisible ? (
            <div
              className={styles.toggleIcon}
              onClick={onToggleResourcePanelCollapse || onToggleResourcePanel}
              title={
                isResourcePanelCollapsed
                  ? 'Resource Panel erweitern'
                  : 'Resource Panel minimieren'
              }
            >
              <PanelLeft size={20} />
            </div>
          ) : (
            <div
              className={styles.toggleIcon}
              onClick={onToggleResourcePanel}
              title='Resource Panel anzeigen'
            >
              <PanelRight size={20} />
            </div>
          )}
          <div
            className={styles.playerProfile}
            onClick={handleCharacterDropdownToggle}
            style={{ cursor: 'pointer' }}
            title='Character öffnen'
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
                onError={e => {
                  e.currentTarget.src = warriorImg;
                }}
              />
            </div>

            {/* Character Dropdown Menu */}
            {isCharacterDropdownOpen && (
              <div className={styles.characterDropdown}>
                <div
                  className={styles.dropdownItem}
                  onClick={handleProfileClick}
                >
                  <User size={16} />
                  <span>Profile</span>
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={handleCharacterSelectionClick}
                >
                  <Users size={16} />
                  <span>Switch Char</span>
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={handleSettingsClick}
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={handleLogoutClick}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;

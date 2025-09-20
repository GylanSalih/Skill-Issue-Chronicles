import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { Coins, Crown, User } from 'lucide-react';
import styles from './GameHeader.module.scss';

const GameHeader: React.FC = () => {
  const { gameState } = useGameState();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left: Empty Slots for future features */}
        <div className={styles.leftSection}>
          <div className={styles.slot}>Slot 1</div>
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

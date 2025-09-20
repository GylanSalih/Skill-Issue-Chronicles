import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { Play, Pause, Settings } from 'lucide-react';
import styles from './GameHeader.module.scss';

const GameHeader: React.FC = () => {
  const { gameState, isRunning, startGame, stopGame } = useGameState();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left: Game Title & Stats */}
        <div className={styles.leftSection}>
          <h1 className={styles.title}>Skill Issue Chronicles</h1>
          <div className={styles.activeCharacters}>
            Active Characters: 1
          </div>
        </div>

        {/* Center: Resources & Progress */}
        <div className={styles.centerSection}>
          <div className={styles.resourceItem}>
            <span className={styles.goldText}>💰</span>
            <span className={styles.goldText}>Gold ({gameState.resources.primary})</span>
          </div>
          
          {/* Active Skill Progress */}
          {Object.values(gameState.skills).find(skill => skill.isActive) && (
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ 
                    width: `${Object.values(gameState.skills).find(skill => skill.isActive)?.progress || 0}%` 
                  }}
                />
              </div>
              <span className={styles.progressText}>
                {Math.ceil((Object.values(gameState.skills).find(skill => skill.isActive)?.baseTime || 0) * 
                  (1 - (Object.values(gameState.skills).find(skill => skill.isActive)?.progress || 0) / 100))}s
              </span>
            </div>
          )}
        </div>

        {/* Right: Player Info & Controls */}
        <div className={styles.rightSection}>
          <div className={styles.playerInfo}>
            <div className={styles.playerName}>Player</div>
            <div className={styles.playerLevel}>Total Level: {gameState.character.totalLevel}</div>
          </div>
          
          <button
            onClick={isRunning ? stopGame : startGame}
            className={`${styles.controlButton} ${isRunning ? styles.running : styles.stopped}`}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            <span>{isRunning ? 'Stop' : 'Start'}</span>
          </button>
          
          <button className={styles.settingsButton}>
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;

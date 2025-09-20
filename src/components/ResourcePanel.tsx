import React from 'react';
import { useGameState } from '../hooks/useGameState';
import styles from './ResourcePanel.module.scss';

const ResourcePanel: React.FC = () => {
  const { gameState } = useGameState();

  const resourceIcons: Record<string, string> = {
    primary: '💰',
    wood: '🪵',
    stone: '🪨',
    metal: '⚒️',
    food: '🍎'
  };

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Resources</h3>
      <div className={styles.grid}>
        {/* Primary Resource */}
        <div className={styles.resourceItem}>
          <div className={styles.resourceInfo}>
            <span className={`${styles.resourceIcon} ${styles.primary}`}>{resourceIcons.primary}</span>
            <span className={styles.resourceName}>Gold</span>
          </div>
          <span className={`${styles.resourceValue} ${styles.primary}`}>
            {gameState.resources.primary.toLocaleString()}
          </span>
        </div>

        {/* Secondary Resources */}
        {Object.entries(gameState.resources.secondary).map(([key, value]) => (
          <div key={key} className={styles.resourceItem}>
            <div className={styles.resourceInfo}>
              <span className={styles.resourceIcon}>{resourceIcons[key] || '📦'}</span>
              <span className={styles.resourceName}>{key}</span>
            </div>
            <span className={`${styles.resourceValue} ${styles.secondary}`}>
              {value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcePanel;

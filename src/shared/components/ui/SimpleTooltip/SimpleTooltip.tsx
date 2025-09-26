import React, { useState } from 'react';
import styles from './SimpleTooltip.module.scss';

export interface TooltipData {
  title: string;
  description?: string;
  stats?: {
    level?: number;
    experience?: number;
    nextLevel?: number;
    progress?: number;
  };
  resources?: {
    name: string;
    amount: number;
    icon?: string;
  }[];
  requirements?: {
    level?: number;
    items?: { name: string; amount: number }[];
  };
}

interface SimpleTooltipProps {
  children: React.ReactNode;
  data: TooltipData;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  delay?: number;
  clickToShow?: boolean;
  showStartButton?: boolean;
  onStart?: () => void;
}

const SimpleTooltip: React.FC<SimpleTooltipProps> = ({
  children,
  data,
  position = 'top',
  delay = 300,
  clickToShow = false,
  showStartButton = false,
  onStart,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (clickToShow) return;
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (clickToShow) return;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  const handleClick = () => {
    if (clickToShow) {
      setIsVisible(!isVisible);
    }
  };

  return (
    <div
      className={styles.tooltipWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      {isVisible && (
        <>
          {position === 'center' && <div className={styles.overlay} />}
          <div
            className={`${styles.tooltip} ${position === 'center' ? styles.centerTooltip : styles[position]} ${styles.visible}`}
          >
            <div className={styles.tooltipContent}>
              <div className={styles.tooltipHeader}>
                <h3 className={styles.tooltipTitle}>{data.title}</h3>
                {data.description && (
                  <p className={styles.tooltipDescription}>
                    {data.description}
                  </p>
                )}
              </div>

              {data.stats && (
                <div className={styles.tooltipStats}>
                  {data.stats.level && (
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Level:</span>
                      <span className={styles.statValue}>
                        {data.stats.level}
                      </span>
                    </div>
                  )}
                  {data.stats.experience && (
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Experience:</span>
                      <span className={styles.statValue}>
                        {data.stats.experience.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {data.stats.nextLevel && (
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Next Level:</span>
                      <span className={styles.statValue}>
                        {data.stats.nextLevel.toLocaleString()} XP
                      </span>
                    </div>
                  )}
                  {data.stats.progress !== undefined && (
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Progress:</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${data.stats.progress}%` }}
                        />
                      </div>
                      <span className={styles.progressText}>
                        {data.stats.progress.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              )}

              {data.resources && data.resources.length > 0 && (
                <div className={styles.tooltipResources}>
                  <h4 className={styles.resourcesTitle}>Resources:</h4>
                  {data.resources.map((resource, index) => (
                    <div key={index} className={styles.resourceRow}>
                      <span className={styles.resourceName}>
                        {resource.name}:
                      </span>
                      <span className={styles.resourceAmount}>
                        {resource.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {data.requirements && (
                <div className={styles.tooltipRequirements}>
                  <h4 className={styles.requirementsTitle}>Requirements:</h4>
                  {data.requirements.level && (
                    <div className={styles.requirementRow}>
                      <span className={styles.requirementLabel}>Level:</span>
                      <span className={styles.requirementValue}>
                        {data.requirements.level}
                      </span>
                    </div>
                  )}
                  {data.requirements.items &&
                    data.requirements.items.length > 0 && (
                      <div className={styles.requirementItems}>
                        {data.requirements.items.map((item, index) => (
                          <div key={index} className={styles.requirementRow}>
                            <span className={styles.requirementLabel}>
                              {item.name}:
                            </span>
                            <span className={styles.requirementValue}>
                              {item.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              )}

              {showStartButton && (
                <div className={styles.tooltipActions}>
                  <button
                    className={styles.startButton}
                    onClick={e => {
                      e.stopPropagation();
                      onStart?.();
                      setIsVisible(false);
                    }}
                  >
                    Start
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SimpleTooltip;

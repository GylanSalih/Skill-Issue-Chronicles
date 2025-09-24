import { Crosshair, Eye, Target, Zap } from 'lucide-react';
import styles from './Hunting.module.scss';

const Hunting = () => {
  return (
    <div className={`${styles.huntingContainer} ${styles.mediumWidth}`}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Target className={styles.titleIcon} />
          <h1 className={styles.title}>Hunting Grounds</h1>
        </div>
        <p className={styles.subtitle}>
          Track and hunt wild creatures for valuable resources
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.huntingAreas}>
          <div className={styles.areaCard}>
            <div className={styles.areaHeader}>
              <Crosshair className={styles.areaIcon} />
              <h3>Forest Hunt</h3>
            </div>
            <p className={styles.areaDescription}>
              Hunt deer, rabbits, and other forest creatures
            </p>
            <div className={styles.areaStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Difficulty:</span>
                <span className={styles.statValue}>Easy</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Reward:</span>
                <span className={styles.statValue}>Meat, Hide</span>
              </div>
            </div>
            <button className={styles.huntButton}>
              <Target className={styles.buttonIcon} />
              Start Hunt
            </button>
          </div>

          <div className={styles.areaCard}>
            <div className={styles.areaHeader}>
              <Eye className={styles.areaIcon} />
              <h3>Mountain Hunt</h3>
            </div>
            <p className={styles.areaDescription}>
              Track bears, wolves, and mountain predators
            </p>
            <div className={styles.areaStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Difficulty:</span>
                <span className={styles.statValue}>Hard</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Reward:</span>
                <span className={styles.statValue}>Fur, Bones</span>
              </div>
            </div>
            <button className={styles.huntButton}>
              <Target className={styles.buttonIcon} />
              Start Hunt
            </button>
          </div>

          <div className={styles.areaCard}>
            <div className={styles.areaHeader}>
              <Zap className={styles.areaIcon} />
              <h3>Mystic Hunt</h3>
            </div>
            <p className={styles.areaDescription}>
              Hunt magical creatures for rare materials
            </p>
            <div className={styles.areaStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Difficulty:</span>
                <span className={styles.statValue}>Expert</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Reward:</span>
                <span className={styles.statValue}>Magic Essence</span>
              </div>
            </div>
            <button className={styles.huntButton}>
              <Target className={styles.buttonIcon} />
              Start Hunt
            </button>
          </div>
        </div>

        <div className={styles.huntingStats}>
          <h3>Hunting Statistics</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Animals Hunted</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Experience Gained</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Rare Finds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hunting;

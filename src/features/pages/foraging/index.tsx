import { Flower, Leaf, Search, TreePine } from 'lucide-react';
import styles from './Foraging.module.scss';

const Foraging = () => {
  return (
    <div className={`${styles.foragingContainer} ${styles.wideWidth}`}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Leaf className={styles.titleIcon} />
          <h1 className={styles.title}>Foraging Grounds</h1>
        </div>
        <p className={styles.subtitle}>
          Gather herbs, mushrooms, and natural resources from the wild
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.foragingAreas}>
          <div className={styles.areaCard}>
            <div className={styles.areaHeader}>
              <Flower className={styles.areaIcon} />
              <h3>Meadow Foraging</h3>
            </div>
            <p className={styles.areaDescription}>
              Collect flowers, herbs, and medicinal plants
            </p>
            <div className={styles.areaStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Difficulty:</span>
                <span className={styles.statValue}>Easy</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Reward:</span>
                <span className={styles.statValue}>Herbs, Flowers</span>
              </div>
            </div>
            <button className={styles.forageButton}>
              <Search className={styles.buttonIcon} />
              Start Foraging
            </button>
          </div>

          <div className={styles.areaCard}>
            <div className={styles.areaHeader}>
              <TreePine className={styles.areaIcon} />
              <h3>Forest Foraging</h3>
            </div>
            <p className={styles.areaDescription}>
              Find mushrooms, berries, and forest treasures
            </p>
            <div className={styles.areaStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Difficulty:</span>
                <span className={styles.statValue}>Medium</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Reward:</span>
                <span className={styles.statValue}>Mushrooms, Berries</span>
              </div>
            </div>
            <button className={styles.forageButton}>
              <Search className={styles.buttonIcon} />
              Start Foraging
            </button>
          </div>

          <div className={styles.areaCard}>
            <div className={styles.areaHeader}>
              <Leaf className={styles.areaIcon} />
              <h3>Mystic Foraging</h3>
            </div>
            <p className={styles.areaDescription}>
              Gather rare magical plants and essences
            </p>
            <div className={styles.areaStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Difficulty:</span>
                <span className={styles.statValue}>Hard</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Reward:</span>
                <span className={styles.statValue}>Magic Essence</span>
              </div>
            </div>
            <button className={styles.forageButton}>
              <Search className={styles.buttonIcon} />
              Start Foraging
            </button>
          </div>
        </div>

        <div className={styles.foragingStats}>
          <h3>Foraging Statistics</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Items Found</span>
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

export default Foraging;

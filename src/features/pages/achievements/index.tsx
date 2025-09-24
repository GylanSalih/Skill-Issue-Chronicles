import { Star, Target, Trophy } from 'lucide-react';
import React, { useState } from 'react';
import styles from './Achievements.module.scss';

const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Complete your first training session',
      category: 'tutorial',
      points: 10,
      completed: true,
      completedDate: '2024-01-15',
      icon: '👶',
      rarity: 'common',
    },
    {
      id: 2,
      name: 'Woodcutter',
      description: 'Chop down 100 trees',
      category: 'skill',
      points: 25,
      completed: true,
      completedDate: '2024-01-20',
      icon: '🪓',
      rarity: 'common',
    },
    {
      id: 3,
      name: 'Dragon Slayer',
      description: 'Defeat your first dragon',
      category: 'combat',
      points: 100,
      completed: false,
      icon: '🐉',
      rarity: 'legendary',
    },
    {
      id: 4,
      name: 'Master Craftsman',
      description: 'Craft 1000 items',
      category: 'skill',
      points: 50,
      completed: false,
      icon: '🔨',
      rarity: 'rare',
    },
  ];

  const categories = [
    { id: 'all', name: 'All', icon: '🏆' },
    { id: 'tutorial', name: 'Tutorial', icon: '👶' },
    { id: 'skill', name: 'Skills', icon: '⚡' },
    { id: 'combat', name: 'Combat', icon: '⚔️' },
    { id: 'exploration', name: 'Exploration', icon: '🗺️' },
  ];

  const filteredAchievements = achievements.filter(
    achievement =>
      selectedCategory === 'all' || achievement.category === selectedCategory
  );

  const completedCount = achievements.filter(a => a.completed).length;
  const totalPoints = achievements
    .filter(a => a.completed)
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <div className={styles.achievements}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Trophy className={styles.titleIcon} />
          <h1>Achievements</h1>
        </div>
        <div className={styles.achievementStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Completed</span>
            <span className={styles.statValue}>
              {completedCount}/{achievements.length}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total Points</span>
            <span className={styles.statValue}>{totalPoints}</span>
          </div>
        </div>
      </div>

      <div className={styles.categories}>
        {categories.map(category => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className={styles.categoryIcon}>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.achievementsGrid}>
        {filteredAchievements.map(achievement => (
          <div
            key={achievement.id}
            className={`${styles.achievementCard} ${achievement.completed ? styles.completed : ''} ${styles[achievement.rarity]}`}
          >
            <div className={styles.achievementIcon}>
              <span className={styles.icon}>{achievement.icon}</span>
              {achievement.completed && (
                <div className={styles.completedBadge}>
                  <Trophy className={styles.badgeIcon} />
                </div>
              )}
            </div>

            <div className={styles.achievementInfo}>
              <h3 className={styles.achievementName}>{achievement.name}</h3>
              <p className={styles.achievementDescription}>
                {achievement.description}
              </p>

              <div className={styles.achievementMeta}>
                <div className={styles.points}>
                  <Star className={styles.pointsIcon} />
                  <span>{achievement.points} points</span>
                </div>

                {achievement.completed && (
                  <div className={styles.completedDate}>
                    Completed: {achievement.completedDate}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.achievementProgress}>
              {achievement.completed ? (
                <div className={styles.completedProgress}>
                  <Trophy className={styles.progressIcon} />
                  <span>Completed</span>
                </div>
              ) : (
                <div className={styles.pendingProgress}>
                  <Target className={styles.progressIcon} />
                  <span>In Progress</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;

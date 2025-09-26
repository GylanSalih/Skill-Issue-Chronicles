import {
  Activity,
  Award,
  Crown,
  Heart,
  Shield,
  Star,
  Sword,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import styles from './BadgesTab.module.scss';

const BadgesTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'combat' | 'skill' | 'achievement'
  >('all');

  const badges = [
    {
      id: 'first_kill',
      name: 'First Blood',
      description: 'Defeat your first enemy',
      category: 'combat',
      rarity: 'common',
      owned: true,
      progress: 100,
      icon: Sword,
      xp: 50,
    },
    {
      id: 'wood_master',
      name: 'Wood Master',
      description: 'Chop 1000 pieces of wood',
      category: 'skill',
      rarity: 'rare',
      owned: true,
      progress: 100,
      icon: Target,
      xp: 200,
    },
    {
      id: 'mining_expert',
      name: 'Mining Expert',
      description: 'Mine 500 ores',
      category: 'skill',
      rarity: 'rare',
      owned: false,
      progress: 75,
      icon: Shield,
      xp: 200,
    },
    {
      id: 'level_10',
      name: 'Rising Star',
      description: 'Reach level 10',
      category: 'achievement',
      rarity: 'uncommon',
      owned: true,
      progress: 100,
      icon: Star,
      xp: 100,
    },
    {
      id: 'level_50',
      name: 'Veteran',
      description: 'Reach level 50',
      category: 'achievement',
      rarity: 'epic',
      owned: false,
      progress: 20,
      icon: Crown,
      xp: 500,
    },
    {
      id: 'perfect_run',
      name: 'Perfect Run',
      description: 'Complete a dungeon without taking damage',
      category: 'combat',
      rarity: 'legendary',
      owned: false,
      progress: 0,
      icon: Trophy,
      xp: 1000,
    },
    {
      id: 'fishing_champion',
      name: 'Fishing Champion',
      description: 'Catch 100 fish',
      category: 'skill',
      rarity: 'uncommon',
      owned: true,
      progress: 100,
      icon: Activity,
      xp: 150,
    },
    {
      id: 'survivor',
      name: 'Survivor',
      description: 'Survive 100 battles',
      category: 'combat',
      rarity: 'epic',
      owned: false,
      progress: 45,
      icon: Heart,
      xp: 300,
    },
    {
      id: 'speed_demon',
      name: 'Speed Demon',
      description: 'Complete any activity in under 30 seconds',
      category: 'achievement',
      rarity: 'rare',
      owned: false,
      progress: 0,
      icon: Zap,
      xp: 250,
    },
  ];

  const categories = [
    { id: 'all', name: 'All', icon: Award },
    { id: 'combat', name: 'Combat', icon: Sword },
    { id: 'skill', name: 'Skills', icon: Target },
    { id: 'achievement', name: 'Achievements', icon: Star },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return '#9ca3af';
      case 'uncommon':
        return '#22c55e';
      case 'rare':
        return '#3b82f6';
      case 'epic':
        return '#a855f7';
      case 'legendary':
        return '#f59e0b';
      default:
        return '#9ca3af';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'rgba(156, 163, 175, 0.1)';
      case 'uncommon':
        return 'rgba(34, 197, 94, 0.1)';
      case 'rare':
        return 'rgba(59, 130, 246, 0.1)';
      case 'epic':
        return 'rgba(168, 85, 247, 0.1)';
      case 'legendary':
        return 'rgba(245, 158, 11, 0.1)';
      default:
        return 'rgba(156, 163, 175, 0.1)';
    }
  };

  const filteredBadges =
    selectedCategory === 'all'
      ? badges
      : badges.filter(badge => badge.category === selectedCategory);

  const ownedBadges = badges.filter(badge => badge.owned);
  const totalBadges = badges.length;

  return (
    <div className={styles.normalWidth}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Character Badges</h1>
          <p>
            Sammle und zeige deine Errungenschaften und Abzeichen
          </p>
        </div>
      </div>

      <div className={styles.content}>
        {/* Badge Collection Header */}
      <div className={`${styles.section} ${styles.badgeHeader}`}>
        <div className={styles.badgeHeaderContent}>
          <div className={styles.badgeHeaderIcon}>
            <Award size={32} />
          </div>
          <div className={styles.badgeHeaderText}>
            <h2>Badge Collection</h2>
            <p>Earn badges by completing challenges and achievements</p>
          </div>
        </div>
        <div className={styles.badgeStats}>
          <div className={styles.badgeStat}>
            <span className={styles.badgeStatValue}>{ownedBadges.length}</span>
            <span className={styles.badgeStatLabel}>Earned</span>
          </div>
          <div className={styles.badgeStat}>
            <span className={styles.badgeStatValue}>{totalBadges}</span>
            <span className={styles.badgeStatLabel}>Total</span>
          </div>
          <div className={styles.badgeStat}>
            <span className={styles.badgeStatValue}>
              {Math.round((ownedBadges.length / totalBadges) * 100)}%
            </span>
            <span className={styles.badgeStatLabel}>Complete</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className={`${styles.section} ${styles.badgeFilter}`}>
        <h3>Categories</h3>
        <div className={styles.categoryButtons}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.id as any)}
            >
              <category.icon size={16} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Badge Grid */}
      <div className={`${styles.section} ${styles.badgeGrid}`}>
        <h3>
          {selectedCategory === 'all'
            ? 'All Badges'
            : `${categories.find(c => c.id === selectedCategory)?.name} Badges`}
        </h3>
        <div className={styles.badgesList}>
          {filteredBadges.map(badge => (
            <div
              key={badge.id}
              className={`${styles.badgeCard} ${badge.owned ? styles.owned : styles.locked}`}
            >
              <div className={styles.badgeIcon}>
                <badge.icon
                  size={24}
                  style={{
                    color: badge.owned
                      ? getRarityColor(badge.rarity)
                      : '#6b7280',
                  }}
                />
                {badge.owned && (
                  <div className={styles.ownedIndicator}>
                    <Star size={12} />
                  </div>
                )}
              </div>
              <div className={styles.badgeInfo}>
                <h4>{badge.name}</h4>
                <p>{badge.description}</p>
                <div className={styles.badgeFooter}>
                  <span
                    className={styles.rarityTag}
                    style={{
                      color: getRarityColor(badge.rarity),
                      backgroundColor: getRarityBg(badge.rarity),
                    }}
                  >
                    {badge.rarity.toUpperCase()}
                  </span>
                  <span className={styles.xpReward}>+{badge.xp} XP</span>
                </div>
                {!badge.owned && badge.progress > 0 && (
                  <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                    <span className={styles.progressText}>
                      {badge.progress}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Badges */}
      <div className={`${styles.section} ${styles.recentBadges}`}>
        <h3>Recently Earned</h3>
        <div className={styles.recentBadgesList}>
          {ownedBadges.slice(0, 3).map(badge => (
            <div key={badge.id} className={styles.recentBadgeItem}>
              <div className={styles.recentBadgeIcon}>
                <badge.icon
                  size={20}
                  style={{ color: getRarityColor(badge.rarity) }}
                />
              </div>
              <div className={styles.recentBadgeInfo}>
                <h4>{badge.name}</h4>
                <p>Earned recently</p>
              </div>
              <div className={styles.recentBadgeXp}>+{badge.xp} XP</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default BadgesTab;

import { Award, Crown, Shield, Sword, Target, Trophy, Zap } from 'lucide-react';
import React, { useState } from 'react';
import styles from './BadgesTab.module.scss';

const BadgesTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'combat' | 'skill' | 'achievement'
  >('all');
  const [equippedBadges, setEquippedBadges] = useState<string[]>([]);

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
      progress: 65,
      icon: Shield,
      xp: 300,
    },
    {
      id: 'dungeon_crawler',
      name: 'Dungeon Crawler',
      description: 'Complete 10 dungeons',
      category: 'combat',
      rarity: 'epic',
      owned: false,
      progress: 30,
      icon: Crown,
      xp: 500,
    },
    {
      id: 'speed_runner',
      name: 'Speed Runner',
      description: 'Complete a dungeon in under 5 minutes',
      category: 'achievement',
      rarity: 'legendary',
      owned: false,
      progress: 0,
      icon: Zap,
      xp: 1000,
    },
    {
      id: 'collector',
      name: 'Collector',
      description: 'Collect 100 different items',
      category: 'achievement',
      rarity: 'epic',
      owned: true,
      progress: 100,
      icon: Trophy,
      xp: 400,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return '#9ca3af';
      case 'rare':
        return '#3b82f6';
      case 'epic':
        return '#8b5cf6';
      case 'legendary':
        return '#f59e0b';
      default:
        return '#9ca3af';
    }
  };

  const filteredBadges =
    selectedCategory === 'all'
      ? badges
      : badges.filter(badge => badge.category === selectedCategory);

  const ownedBadges = badges.filter(badge => badge.owned);
  const totalBadges = badges.length;

  const handleBadgeToggle = (badgeId: string) => {
    if (equippedBadges.includes(badgeId)) {
      setEquippedBadges(equippedBadges.filter(id => id !== badgeId));
    } else {
      setEquippedBadges([...equippedBadges, badgeId]);
    }
  };

  return (
    <div className={styles.normalWidth}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Character Badges</h1>
          <p>Sammle und zeige deine Errungenschaften und Abzeichen</p>
        </div>
      </div>

      <div className={styles.content}>
        {/* Stats Overview */}
        <div className={styles.statsOverview}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Award size={16} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{ownedBadges.length}</span>
              <span className={styles.statLabel}>Owned</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Trophy size={16} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{totalBadges}</span>
              <span className={styles.statLabel}>Total</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className={styles.section}>
          <h2>Categories</h2>
          <div className={styles.categoryFilter}>
            {['all', 'combat', 'skill', 'achievement'].map(category => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  selectedCategory === category ? styles.active : ''
                }`}
                onClick={() => setSelectedCategory(category as any)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Badge Collection */}
        <div className={styles.section}>
          <h2>Badge Collection</h2>
          <div className={styles.badgeGrid}>
            {filteredBadges.map(badge => {
              const IconComponent = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`${styles.badgeCard} ${
                    badge.owned ? styles.owned : styles.locked
                  }`}
                >
                  <div className={styles.badgeIcon}>
                    <IconComponent
                      size={80}
                      color={
                        badge.owned ? getRarityColor(badge.rarity) : '#666'
                      }
                    />
                  </div>

                  <div className={styles.badgeInfo}>
                    <h4 className={styles.badgeName}>{badge.name}</h4>
                    <p className={styles.badgeDescription}>
                      {badge.description}
                    </p>
                  </div>

                  <div className={styles.badgeActions}>
                    {badge.owned ? (
                      <button
                        className={`${styles.badgeButton} ${styles.normal}`}
                        onClick={() => handleBadgeToggle(badge.id)}
                      >
                        {equippedBadges.includes(badge.id)
                          ? 'Unequip'
                          : 'Equip'}
                      </button>
                    ) : (
                      <button
                        className={`${styles.badgeButton} ${styles.locked}`}
                      >
                        Locked
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Badges */}
        <div className={styles.section}>
          <h2>Recently Earned</h2>
          <div className={styles.recentBadges}>
            {badges
              .filter(badge => badge.owned)
              .slice(0, 3)
              .map(badge => {
                const IconComponent = badge.icon;
                return (
                  <div key={badge.id} className={styles.recentBadge}>
                    <div className={styles.recentBadgeIcon}>
                      <IconComponent
                        size={16}
                        color={getRarityColor(badge.rarity)}
                      />
                    </div>
                    <div className={styles.recentBadgeInfo}>
                      <span className={styles.recentBadgeName}>
                        {badge.name}
                      </span>
                      <span className={styles.recentBadgeXp}>
                        +{badge.xp} XP
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesTab;

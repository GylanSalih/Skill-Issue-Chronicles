'use client';

import React, { useState } from 'react';
import {
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Star,
  Shield,
  Sword,
  TreePine,
  Flame,
  Pickaxe,
  Hammer,
  Calendar,
  Package,
  Zap,
  Crown,
  Award,
  Activity,
  Gem,
  Heart,
  Users,
  Timer,
  CheckCircle,
  Lock,
  BarChart3,
} from 'lucide-react';
import styles from './Statistics.module.scss';

const Statistics = () => {
  const [gameStats] = useState({
    // Errungenschaften
    totalAchievements: 100,
    unlockedAchievements: 45,
    completionPercentage: 45,
    lastAchievement: {
      name: 'Meister des Feuermachens',
      date: '2024-12-15T14:30:00Z',
    },

    // Kampf & Gegner
    enemiesDefeated: 1247,
    bossesDefeated: 23,
    highestLevel: 78,
    fastestDungeonTime: '12:34',

    // Items & Sammlung
    itemsCollected: 3456,
    rareItemsFound: 89,
    legendaryItems: 12,
    totalAnimals: 156,
    uniqueAnimals: 34,

    // Charakter Info
    characterCreated: '2024-08-12T10:15:00Z',
    totalPlaytime: '145h 23m',

    // Skill Meisterungen
    skills: {
      woodcutting: { level: 67, mastery: 78 },
      fishing: { level: 52, mastery: 65 },
      firemaking: { level: 89, mastery: 92 },
      cooking: { level: 71, mastery: 83 },
      mining: { level: 45, mastery: 52 },
      smithing: { level: 38, mastery: 44 },
    },

    // Zusätzliche Stats
    questsCompleted: 234,
    goldEarned: 567890,
    experienceGained: 2345678,
  });

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSkillIcon = skillName => {
    const icons = {
      woodcutting: TreePine,
      fishing: Star,
      firemaking: Flame,
      cooking: Flame,
      mining: Pickaxe,
      smithing: Hammer,
    };
    return icons[skillName] || Star;
  };

  const getColorClass = color => {
    const colorMap = {
      '#f59e0b': 'colorGold',
      '#ef4444': 'colorRed',
      '#8b5cf6': 'colorPurple',
      '#10b981': 'colorGreen',
    };
    return colorMap[color] || 'colorGold';
  };

  const getProgressColorClass = color => {
    const progressColorMap = {
      '#f59e0b': 'progressGold',
      '#ef4444': 'progressRed',
      '#8b5cf6': 'progressPurple',
      '#10b981': 'progressGreen',
    };
    return progressColorMap[color] || 'progressGold';
  };

  const achievementCategories = [
    {
      title: 'Errungenschaften Übersicht',
      icon: Trophy,
      color: '#f59e0b',
      items: [
        {
          label: 'Freigeschaltet',
          value: `${gameStats.unlockedAchievements} / ${gameStats.totalAchievements}`,
          icon: CheckCircle,
          progress: gameStats.completionPercentage,
        },
        {
          label: 'Gesperrt',
          value: gameStats.totalAchievements - gameStats.unlockedAchievements,
          icon: Lock,
        },
        {
          label: 'Fortschritt',
          value: `${gameStats.completionPercentage}%`,
          icon: BarChart3,
          progress: gameStats.completionPercentage,
        },
        {
          label: 'Letzte Errungenschaft',
          value: gameStats.lastAchievement.name,
          subValue: formatDate(gameStats.lastAchievement.date),
          icon: Award,
        },
      ],
    },
    {
      title: 'Kampf & Abenteuer',
      icon: Sword,
      color: '#ef4444',
      items: [
        {
          label: 'Besiegte Gegner',
          value: gameStats.enemiesDefeated.toLocaleString('de-DE'),
          icon: Target,
        },
        {
          label: 'Besiegte Bosse',
          value: gameStats.bossesDefeated,
          icon: Crown,
        },
        {
          label: 'Höchstes Level',
          value: gameStats.highestLevel,
          icon: TrendingUp,
        },
        {
          label: 'Schnellster Dungeon',
          value: gameStats.fastestDungeonTime,
          icon: Timer,
        },
      ],
    },
    {
      title: 'Sammlung & Items',
      icon: Package,
      color: '#8b5cf6',
      items: [
        {
          label: 'Gesammelte Items',
          value: gameStats.itemsCollected.toLocaleString('de-DE'),
          icon: Package,
        },
        {
          label: 'Seltene Items',
          value: gameStats.rareItemsFound,
          icon: Gem,
        },
        {
          label: 'Legendäre Items',
          value: gameStats.legendaryItems,
          icon: Star,
        },
        {
          label: 'Gesamte Tiere',
          value: `${gameStats.uniqueAnimals} / ${gameStats.totalAnimals}`,
          icon: Heart,
          progress: (gameStats.uniqueAnimals / gameStats.totalAnimals) * 100,
        },
      ],
    },
    {
      title: 'Charakter Info',
      icon: Users,
      color: '#10b981',
      items: [
        {
          label: 'Erstellt am',
          value: formatDate(gameStats.characterCreated),
          icon: Calendar,
        },
        {
          label: 'Spielzeit',
          value: gameStats.totalPlaytime,
          icon: Clock,
        },
        {
          label: 'Quests abgeschlossen',
          value: gameStats.questsCompleted.toLocaleString('de-DE'),
          icon: Activity,
        },
        {
          label: 'Gold verdient',
          value: gameStats.goldEarned.toLocaleString('de-DE'),
          icon: Trophy,
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Errungenschaften & Statistiken</h1>
          <p className={styles.subtitle}>
            Vollständige Übersicht deiner Spielfortschritte und Erfolge
          </p>
        </header>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {achievementCategories.map(category => {
            const CategoryIcon = category.icon;
            const colorClass = getColorClass(category.color);
            const progressColorClass = getProgressColorClass(category.color);

            return (
              <div key={category.title} className={styles.card}>
                {/* Top gradient line */}
                <div className={styles.cardTopLine} />

                {/* Card Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeaderContent}>
                    <div className={`${styles.cardIcon} ${styles[colorClass]}`}>
                      <CategoryIcon />
                    </div>
                    <h3 className={styles.cardTitle}>{category.title}</h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  {category.items.map((item, index) => {
                    const ItemIcon = item.icon;

                    return (
                      <div key={index} className={styles.statItem}>
                        <div className={styles.statItemLeft}>
                          <ItemIcon />
                          <span className={styles.statLabel}>{item.label}</span>
                        </div>

                        <div className={styles.statValueContainer}>
                          <div className={styles.statValue}>{item.value}</div>

                          {item.subValue && (
                            <div className={styles.statSubValue}>
                              {item.subValue}
                            </div>
                          )}

                          {item.progress !== undefined && (
                            <div className={styles.progressBar}>
                              <div
                                className={`${styles.progressFill} ${styles[progressColorClass]}`}
                                style={{
                                  width: `${Math.min(item.progress, 100)}%`,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills Mastery Section */}
        <div className={styles.skillsSection}>
          <div className={styles.cardTopLine} />

          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderContent}>
              <div className={`${styles.cardIcon} ${styles.colorCyan}`}>
                <Zap />
              </div>
              <h3 className={styles.cardTitle}>Skill Meisterungen</h3>
            </div>
          </div>

          <div className={styles.skillsGrid}>
            {Object.entries(gameStats.skills).map(([skillName, skill]) => {
              const SkillIcon = getSkillIcon(skillName);

              return (
                <div key={skillName} className={styles.skillCard}>
                  <div className={styles.skillIconContainer}>
                    <SkillIcon />
                  </div>

                  <div className={styles.skillName}>{skillName}</div>

                  <div className={styles.skillLevel}>Level {skill.level}</div>

                  <div className={styles.skillProgressBar}>
                    <div
                      className={styles.skillProgressFill}
                      style={{
                        width: `${skill.mastery}%`,
                      }}
                    />
                  </div>

                  <div className={styles.skillMastery}>
                    {skill.mastery}% Meisterung
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Summary */}
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <div className={styles.cardTopLine} />

            <div className={styles.summaryValue}>
              {gameStats.completionPercentage}%
            </div>
            <div className={styles.summaryLabel}>Abgeschlossen</div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardTopLine} />

            <div className={styles.summaryValue}>{gameStats.highestLevel}</div>
            <div className={styles.summaryLabel}>Max Level</div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardTopLine} />

            <div className={styles.summaryValue}>{gameStats.totalPlaytime}</div>
            <div className={styles.summaryLabel}>Spielzeit</div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.cardTopLine} />

            <div className={styles.summaryValue}>
              {gameStats.unlockedAchievements}
            </div>
            <div className={styles.summaryLabel}>Errungenschaften</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

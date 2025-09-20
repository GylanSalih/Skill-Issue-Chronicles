'use client'
import React, { useState } from 'react';
import styles from './StatsPanel.module.scss';
import { 
  Sword, 
  Shield, 
  Heart, 
  Zap, 
  Target, 
  TrendingUp,
  Star,
  Eye,
  Wind,
  Flame,
  Snowflake,
  Bolt,
  TreePine,
  Droplets,
  Sun,
  Moon,
  Gem,
  Trophy,
  Timer,
  Activity
} from 'lucide-react';

const StatsPanel = () => {
  const [characterStats] = useState({
    // Core Combat Stats
    damage: 387,
    accuracy: 142,
    critical: 23,
    defense: 245,
    block: 85,
    dodge: 67,
    
    // Attributes
    strength: 156,
    agility: 134,
    intelligence: 98,
    vitality: 189,
    dexterity: 123,
    luck: 87,
    
    // Health & Resources
    health: 2450,
    maxHealth: 2450,
    mana: 1250,
    maxMana: 1250,
    stamina: 340,
    maxStamina: 340,
    
    // Resistances
    fireResistance: 45,
    iceResistance: 32,
    lightningResistance: 28,
    poisonResistance: 51,
    darkResistance: 19,
    lightResistance: 33,
    
    // Special Stats
    speed: 112,
    stealth: 78,
    magicFind: 125,
    goldFind: 98,
    experienceBonus: 15,
    
    // Advanced Combat
    penetration: 34,
    lifesteal: 8,
    manasteal: 5,
    reflection: 12,
    thorns: 23,
    
    // Crafting & Utility
    mining: 67,
    fishing: 89,
    cooking: 45,
    alchemy: 92,
    enchanting: 78
  });

  const statCategories = [
    {
      title: 'Kampf',
      icon: Sword,
      color: '#ef4444',
      stats: [
        { key: 'damage', label: 'Schaden', value: characterStats.damage, icon: Sword },
        { key: 'accuracy', label: 'Genauigkeit', value: characterStats.accuracy, icon: Target },
        { key: 'critical', label: 'Kritisch', value: characterStats.critical, icon: Star, suffix: '%' },
        { key: 'penetration', label: 'Durchdringung', value: characterStats.penetration, icon: TrendingUp },
      ]
    },
    {
      title: 'Verteidigung',
      icon: Shield,
      color: '#3b82f6',
      stats: [
        { key: 'defense', label: 'Verteidigung', value: characterStats.defense, icon: Shield },
        { key: 'block', label: 'Blocken', value: characterStats.block, icon: Shield, suffix: '%' },
        { key: 'dodge', label: 'Ausweichen', value: characterStats.dodge, icon: Wind, suffix: '%' },
        { key: 'reflection', label: 'Reflektion', value: characterStats.reflection, icon: Eye, suffix: '%' },
      ]
    },
    {
      title: 'Attribute',
      icon: TrendingUp,
      color: '#10b981',
      stats: [
        { key: 'strength', label: 'Stärke', value: characterStats.strength, icon: TrendingUp },
        { key: 'agility', label: 'Agilität', value: characterStats.agility, icon: Wind },
        { key: 'intelligence', label: 'Intelligenz', value: characterStats.intelligence, icon: Star },
        { key: 'vitality', label: 'Vitalität', value: characterStats.vitality, icon: Heart },
        { key: 'dexterity', label: 'Geschick', value: characterStats.dexterity, icon: Target },
        { key: 'luck', label: 'Glück', value: characterStats.luck, icon: Trophy },
      ]
    },
    {
      title: 'Ressourcen',
      icon: Heart,
      color: '#8b5cf6',
      stats: [
        { key: 'health', label: 'Leben', value: characterStats.health, max: characterStats.maxHealth, icon: Heart },
        { key: 'mana', label: 'Mana', value: characterStats.mana, max: characterStats.maxMana, icon: Zap },
        { key: 'stamina', label: 'Ausdauer', value: characterStats.stamina, max: characterStats.maxStamina, icon: Activity },
      ]
    },
    {
      title: 'Widerstände',
      icon: Shield,
      color: '#f59e0b',
      stats: [
        { key: 'fireResistance', label: 'Feuer', value: characterStats.fireResistance, icon: Flame, suffix: '%' },
        { key: 'iceResistance', label: 'Eis', value: characterStats.iceResistance, icon: Snowflake, suffix: '%' },
        { key: 'lightningResistance', label: 'Blitz', value: characterStats.lightningResistance, icon: Bolt, suffix: '%' },
        { key: 'poisonResistance', label: 'Gift', value: characterStats.poisonResistance, icon: TreePine, suffix: '%' },
        { key: 'darkResistance', label: 'Dunkelheit', value: characterStats.darkResistance, icon: Moon, suffix: '%' },
        { key: 'lightResistance', label: 'Licht', value: characterStats.lightResistance, icon: Sun, suffix: '%' },
      ]
    },
    {
      title: 'Spezial',
      icon: Star,
      color: '#d946ef',
      stats: [
        { key: 'speed', label: 'Geschwindigkeit', value: characterStats.speed, icon: Wind },
        { key: 'stealth', label: 'Tarnung', value: characterStats.stealth, icon: Eye },
        { key: 'lifesteal', label: 'Lebensentzug', value: characterStats.lifesteal, icon: Droplets, suffix: '%' },
        { key: 'manasteal', label: 'Manaentzug', value: characterStats.manasteal, icon: Zap, suffix: '%' },
        { key: 'thorns', label: 'Dornen', value: characterStats.thorns, icon: TreePine, suffix: '%' },
      ]
    },
    {
      title: 'Magische Funde',
      icon: Gem,
      color: '#06b6d4',
      stats: [
        { key: 'magicFind', label: 'Magie-Fund', value: characterStats.magicFind, icon: Gem, suffix: '%' },
        { key: 'goldFind', label: 'Gold-Fund', value: characterStats.goldFind, icon: Trophy, suffix: '%' },
        { key: 'experienceBonus', label: 'EP-Bonus', value: characterStats.experienceBonus, icon: Star, suffix: '%' },
      ]
    },
    {
      title: 'Handwerk',
      icon: Timer,
      color: '#f97316',
      stats: [
        { key: 'mining', label: 'Bergbau', value: characterStats.mining, icon: Gem },
        { key: 'fishing', label: 'Angeln', value: characterStats.fishing, icon: Droplets },
        { key: 'cooking', label: 'Kochen', value: characterStats.cooking, icon: Flame },
        { key: 'alchemy', label: 'Alchemie', value: characterStats.alchemy, icon: Zap },
        { key: 'enchanting', label: 'Verzauberung', value: characterStats.enchanting, icon: Star },
      ]
    }
  ];

  const formatStatValue = (stat) => {
    if (stat.max) {
      return `${stat.value.toLocaleString('de-DE')} / ${stat.max.toLocaleString('de-DE')}`;
    }
    return `${stat.value.toLocaleString('de-DE')}${stat.suffix || ''}`;
  };

  const getStatPercentage = (stat) => {
    if (stat.max) {
      return (stat.value / stat.max) * 100;
    }
    return null;
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Charakter Statistiken</h1>
          <p className={styles.subtitle}>
            Vollständige Übersicht Ihrer Charakterattribute und Fähigkeiten
          </p>
        </header>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {statCategories.map(category => {
            const CategoryIcon = category.icon;
            
            return (
              <div key={category.title} className={styles.statCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.categoryIcon}>
                    <div 
                      className={styles.iconBackground}
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <CategoryIcon 
                        className={styles.icon}
                        style={{ color: category.color }}
                      />
                    </div>
                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                  </div>
                </div>
                
                <div className={styles.cardContent}>
                  {category.stats.map(stat => {
                    const StatIcon = stat.icon;
                    const percentage = getStatPercentage(stat);
                    
                    return (
                      <div key={stat.key} className={styles.statRow}>
                        <div className={styles.statLabel}>
                          <StatIcon className={styles.statIcon} />
                          <span className={styles.labelText}>{stat.label}</span>
                        </div>
                        
                        <div className={styles.statValue}>
                          <div className={styles.valueText}>
                            {formatStatValue(stat)}
                          </div>
                          
                          {percentage !== null && (
                            <div className={styles.progressBar}>
                              <div 
                                className={styles.progressFill}
                                style={{ 
                                  width: `${Math.min(percentage, 100)}%`,
                                  backgroundColor: category.color
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

        {/* Quick Summary */}
        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>
              {(characterStats.damage + characterStats.accuracy).toLocaleString('de-DE')}
            </div>
            <div className={styles.summaryLabel}>Kampfkraft</div>
          </div>
          
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>
              {(characterStats.defense + characterStats.block).toLocaleString('de-DE')}
            </div>
            <div className={styles.summaryLabel}>Verteidigung</div>
          </div>
          
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>
              {Math.round((characterStats.health / characterStats.maxHealth) * 100)}%
            </div>
            <div className={styles.summaryLabel}>Leben</div>
          </div>
          
          <div className={styles.summaryCard}>
            <div className={styles.summaryValue}>
              {characterStats.magicFind}%
            </div>
            <div className={styles.summaryLabel}>Magie-Fund</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
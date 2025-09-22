import React, { useState, useEffect } from 'react';
import {
  Sword,
  Shield,
  Heart,
  Zap,
  Crown,
  Skull,
  Target,
  Flame,
  SwordIcon,
  ShieldCheck,
  Activity,
  Star,
} from 'lucide-react';
import styles from './Dungeon.module.scss';

interface Player {
  id: string;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  attack: number;
  defense: number;
  avatar: string;
  class: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

interface Enemy {
  id: string;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  avatar: string;
  type: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  rewards: {
    experience: number;
    gold: number;
    items: string[];
  };
}

const Dungeon: React.FC = () => {
  const [player] = useState<Player>({
    id: 'player1',
    name: 'DragonSlayer99',
    level: 42,
    health: 850,
    maxHealth: 1000,
    mana: 320,
    maxMana: 400,
    attack: 125,
    defense: 95,
    avatar: '/assets/img/avatars/avatar_warrior.jpg',
    class: 'Warrior',
    rarity: 'epic',
  });

  const [enemies] = useState<Enemy[]>([
    {
      id: 'goblin1',
      name: 'Goblin Warrior',
      level: 15,
      health: 200,
      maxHealth: 200,
      attack: 45,
      defense: 25,
      avatar: '/assets/img/avatars/goblin_warrior.png',
      type: 'Goblin',
      rarity: 'common',
      rewards: {
        experience: 25,
        gold: 50,
        items: ['Goblin Tooth', 'Rusty Sword'],
      },
    },
    {
      id: 'orc1',
      name: 'Orc Berserker',
      level: 28,
      health: 450,
      maxHealth: 450,
      attack: 85,
      defense: 40,
      avatar: '/assets/img/avatars/orc_berserker.png',
      type: 'Orc',
      rarity: 'uncommon',
      rewards: {
        experience: 60,
        gold: 120,
        items: ['Orc Axe', 'Berserker Helm'],
      },
    },
    {
      id: 'dragon1',
      name: 'Ancient Dragon',
      level: 50,
      health: 1200,
      maxHealth: 1200,
      attack: 180,
      defense: 120,
      avatar: '/assets/img/avatars/ancient_dragon.png',
      type: 'Dragon',
      rarity: 'legendary',
      rewards: {
        experience: 300,
        gold: 1000,
        items: ['Dragon Scale', 'Ancient Sword', 'Dragon Heart'],
      },
    },
  ]);

  const [selectedEnemy, setSelectedEnemy] = useState<Enemy | null>(null);
  const [isCombatActive, setIsCombatActive] = useState(false);
  const [combatLog, setCombatLog] = useState<string[]>([]);

  const startCombat = (enemy: Enemy) => {
    setSelectedEnemy(enemy);
    setIsCombatActive(true);
    setCombatLog([`${player.name} challenges ${enemy.name} to battle!`]);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return '#9ca3af';
      case 'uncommon':
        return '#10b981';
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

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'rgba(156, 163, 175, 0.3)';
      case 'uncommon':
        return 'rgba(16, 185, 129, 0.3)';
      case 'rare':
        return 'rgba(59, 130, 246, 0.3)';
      case 'epic':
        return 'rgba(139, 92, 246, 0.3)';
      case 'legendary':
        return 'rgba(245, 158, 11, 0.3)';
      default:
        return 'rgba(156, 163, 175, 0.3)';
    }
  };

  return (
    <div className={styles.dungeon}>
      <div className={styles.header}>
        <Sword className={styles.headerIcon} size={32} />
        <div className={styles.headerContent}>
          <h1>Dungeon Arena</h1>
          <p>Face your fears and battle legendary creatures in epic combat!</p>
        </div>
      </div>

      <div className={styles.scenerySection}>
        <div className={styles.sceneryImage}>
          <img
            src='/assets/img/scenery/dungeon.png'
            alt='Epic Dungeon Arena'
            className={styles.sceneryImg}
          />
        </div>
        <div className={styles.sceneryDescription}>
          <h2>Shadowfang Dungeon</h2>
          <p>
            Welcome to the legendary Shadowfang Dungeon, where only the bravest
            warriors dare to enter. This ancient arena has witnessed countless
            battles between heroes and monsters. The walls echo with the sounds
            of clashing steel and magical spells. Each chamber holds new
            challenges, from lowly goblins to ancient dragons. Prove your worth
            and claim the treasures within!
          </p>
        </div>
      </div>

      {!isCombatActive ? (
        <div className={styles.dungeonContent}>
          {/* Player Profile */}
          <div className={styles.playerSection}>
            <div className={styles.sectionHeader}>
              <Crown className={styles.sectionIcon} size={20} />
              <h3>Your Character</h3>
            </div>
            <div className={styles.playerCard}>
              <div className={styles.avatarContainer}>
                <img
                  src={player.avatar}
                  alt={player.name}
                  className={styles.avatar}
                />
                <div
                  className={styles.rarityBadge}
                  style={{
                    backgroundColor: getRarityColor(player.rarity),
                    boxShadow: `0 0 20px ${getRarityGlow(player.rarity)}`,
                  }}
                >
                  {player.rarity.toUpperCase()}
                </div>
              </div>
              <div className={styles.playerInfo}>
                <h4 className={styles.playerName}>{player.name}</h4>
                <p className={styles.playerClass}>
                  Level {player.level} {player.class}
                </p>
                <div className={styles.statsGrid}>
                  <div className={styles.stat}>
                    <Heart size={16} />
                    <span>
                      {player.health}/{player.maxHealth}
                    </span>
                  </div>
                  <div className={styles.stat}>
                    <Zap size={16} />
                    <span>
                      {player.mana}/{player.maxMana}
                    </span>
                  </div>
                  <div className={styles.stat}>
                    <Sword size={16} />
                    <span>{player.attack}</span>
                  </div>
                  <div className={styles.stat}>
                    <Shield size={16} />
                    <span>{player.defense}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enemies Section */}
          <div className={styles.enemiesSection}>
            <div className={styles.sectionHeader}>
              <Skull className={styles.sectionIcon} size={20} />
              <h3>Choose Your Opponent</h3>
            </div>
            <div className={styles.enemiesGrid}>
              {enemies.map(enemy => (
                <div
                  key={enemy.id}
                  className={styles.enemyCard}
                  onClick={() => startCombat(enemy)}
                >
                  <div className={styles.enemyAvatar}>
                    <img
                      src={enemy.avatar}
                      alt={enemy.name}
                      className={styles.avatar}
                    />
                    <div
                      className={styles.rarityBadge}
                      style={{
                        backgroundColor: getRarityColor(enemy.rarity),
                        boxShadow: `0 0 20px ${getRarityGlow(enemy.rarity)}`,
                      }}
                    >
                      {enemy.rarity.toUpperCase()}
                    </div>
                  </div>
                  <div className={styles.enemyInfo}>
                    <h4 className={styles.enemyName}>{enemy.name}</h4>
                    <p className={styles.enemyType}>
                      Level {enemy.level} {enemy.type}
                    </p>
                    <div className={styles.enemyStats}>
                      <div className={styles.stat}>
                        <Heart size={14} />
                        <span>{enemy.health}</span>
                      </div>
                      <div className={styles.stat}>
                        <Sword size={14} />
                        <span>{enemy.attack}</span>
                      </div>
                      <div className={styles.stat}>
                        <Shield size={14} />
                        <span>{enemy.defense}</span>
                      </div>
                    </div>
                    <div className={styles.rewards}>
                      <Star size={14} />
                      <span>+{enemy.rewards.experience} XP</span>
                      <span>+{enemy.rewards.gold} Gold</span>
                    </div>
                  </div>
                  <button className={styles.challengeButton}>
                    <SwordIcon size={16} />
                    Challenge
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.combatArena}>
          <div className={styles.combatHeader}>
            <h2>⚔️ BATTLE IN PROGRESS ⚔️</h2>
            <button
              className={styles.fleeButton}
              onClick={() => setIsCombatActive(false)}
            >
              Flee Battle
            </button>
          </div>

          <div className={styles.vsLayout}>
            {/* Player Side */}
            <div className={styles.combatant}>
              <div className={styles.combatantCard}>
                <div className={styles.combatAvatar}>
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className={styles.avatar}
                  />
                  <div
                    className={styles.rarityBadge}
                    style={{
                      backgroundColor: getRarityColor(player.rarity),
                      boxShadow: `0 0 20px ${getRarityGlow(player.rarity)}`,
                    }}
                  >
                    {player.rarity.toUpperCase()}
                  </div>
                </div>
                <div className={styles.combatInfo}>
                  <h3 className={styles.combatName}>{player.name}</h3>
                  <p className={styles.combatLevel}>
                    Level {player.level} {player.class}
                  </p>
                  <div className={styles.healthBar}>
                    <div
                      className={styles.healthFill}
                      style={{
                        width: `${(player.health / player.maxHealth) * 100}%`,
                      }}
                    />
                    <span className={styles.healthText}>
                      {player.health}/{player.maxHealth}
                    </span>
                  </div>
                  <div className={styles.manaBar}>
                    <div
                      className={styles.manaFill}
                      style={{
                        width: `${(player.mana / player.maxMana) * 100}%`,
                      }}
                    />
                    <span className={styles.manaText}>
                      {player.mana}/{player.maxMana}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* VS Divider */}
            <div className={styles.vsDivider}>
              <div className={styles.vsText}>VS</div>
              <div className={styles.vsEffects}>
                <Flame className={styles.effectIcon} size={24} />
                <Target className={styles.effectIcon} size={24} />
                <Sword className={styles.effectIcon} size={24} />
              </div>
            </div>

            {/* Enemy Side */}
            <div className={styles.combatant}>
              <div className={styles.combatantCard}>
                <div className={styles.combatAvatar}>
                  <img
                    src={selectedEnemy?.avatar}
                    alt={selectedEnemy?.name}
                    className={styles.avatar}
                  />
                  <div
                    className={styles.rarityBadge}
                    style={{
                      backgroundColor: getRarityColor(
                        selectedEnemy?.rarity || 'common'
                      ),
                      boxShadow: `0 0 20px ${getRarityGlow(selectedEnemy?.rarity || 'common')}`,
                    }}
                  >
                    {selectedEnemy?.rarity.toUpperCase()}
                  </div>
                </div>
                <div className={styles.combatInfo}>
                  <h3 className={styles.combatName}>{selectedEnemy?.name}</h3>
                  <p className={styles.combatLevel}>
                    Level {selectedEnemy?.level} {selectedEnemy?.type}
                  </p>
                  <div className={styles.healthBar}>
                    <div
                      className={styles.healthFill}
                      style={{
                        width: `${((selectedEnemy?.health || 0) / (selectedEnemy?.maxHealth || 1)) * 100}%`,
                      }}
                    />
                    <span className={styles.healthText}>
                      {selectedEnemy?.health}/{selectedEnemy?.maxHealth}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Combat Log */}
          <div className={styles.combatLog}>
            <h4>Combat Log</h4>
            <div className={styles.logEntries}>
              {combatLog.map((entry, index) => (
                <div key={index} className={styles.logEntry}>
                  {entry}
                </div>
              ))}
            </div>
          </div>

          {/* Combat Actions */}
          <div className={styles.combatActions}>
            <button className={styles.actionButton}>
              <Sword size={16} />
              Attack
            </button>
            <button className={styles.actionButton}>
              <Shield size={16} />
              Defend
            </button>
            <button className={styles.actionButton}>
              <Zap size={16} />
              Magic
            </button>
            <button className={styles.actionButton}>
              <Activity size={16} />
              Special
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dungeon;

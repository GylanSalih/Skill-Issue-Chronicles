import React, { useState, useEffect } from 'react';
import { 
  Building2 as Tower, 
  Crown, 
  Sword, 
  Shield, 
  Heart, 
  Zap, 
  Star,
  Flame,
  Target,
  Activity,
  ArrowUp,
  Lock,
  CheckCircle,
  Gem
} from 'lucide-react';
import styles from './BossTower.module.scss';
import { 
  bossTowerFloors, 
  getRarityColor, 
  getRarityGlow, 
  getDifficultyColor,
  type Boss,
  type TowerFloor 
} from '../../config/bossConfig';
import { useBossCombat } from '../../hooks/useBossCombat';

const BossTower: React.FC = () => {
  const [player] = useState({
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
    rarity: 'epic' as const
  });

  const [towerFloors, setTowerFloors] = useState<TowerFloor[]>(bossTowerFloors);

  const [selectedBoss, setSelectedBoss] = useState<Boss | null>(null);
  const [isCombatActive, setIsCombatActive] = useState(false);

  const {
    combatState,
    playerAttack,
    playerDefend,
    playerMagic,
    playerSpecial,
    resetCombat,
    fleeCombat
  } = useBossCombat(player, selectedBoss || bossTowerFloors[0].boss);

  const startCombat = (boss: Boss) => {
    setSelectedBoss(boss);
    setIsCombatActive(true);
    resetCombat();
  };

  const completeFloor = (floorId: number) => {
    setTowerFloors(prev => prev.map(floor => {
      if (floor.id === floorId) {
        return { ...floor, isCompleted: true, isCurrent: false };
      } else if (floor.id === floorId + 1) {
        return { ...floor, isUnlocked: true, isCurrent: true };
      }
      return floor;
    }));
    setIsCombatActive(false);
  };

  // Handle combat victory
  useEffect(() => {
    if (combatState.isVictory && selectedBoss) {
      const currentFloorData = towerFloors.find(floor => floor.boss.id === selectedBoss.id);
      if (currentFloorData) {
        completeFloor(currentFloorData.id);
      }
    }
  }, [combatState.isVictory, selectedBoss, towerFloors]);

  const handleFleeCombat = () => {
    fleeCombat();
    setIsCombatActive(false);
  };


  return (
    <div className={styles.bossTower}>
      <div className={styles.header}>
        <Tower className={styles.headerIcon} size={32} />
        <div className={styles.headerContent}>
          <h1>Boss Tower</h1>
          <p>Climb the tower and defeat powerful bosses on each floor!</p>
        </div>
      </div>

      <div className={styles.scenerySection}>
        <div className={styles.sceneryImage}>
          <img 
            src="/assets/img/scenery/dungeon2.png" 
            alt="Boss Tower"
            className={styles.sceneryImg}
          />
        </div>
        <div className={styles.sceneryDescription}>
          <h2>Ancient Boss Tower</h2>
          <p>
            Welcome to the legendary Boss Tower, a mystical structure that reaches into the clouds. 
            Each floor houses a powerful boss that must be defeated to progress higher. The tower 
            tests your strength, strategy, and determination. Only the most skilled warriors can 
            reach the top and claim the ultimate prize!
          </p>
        </div>
      </div>

      {!isCombatActive ? (
        <div className={styles.towerContent}>
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
                <div className={styles.rarityBadge} style={{ 
                  backgroundColor: getRarityColor(player.rarity),
                  boxShadow: `0 0 20px ${getRarityGlow(player.rarity)}`
                }}>
                  {player.rarity.toUpperCase()}
                </div>
              </div>
              <div className={styles.playerInfo}>
                <h4 className={styles.playerName}>{player.name}</h4>
                <p className={styles.playerClass}>Level {player.level} {player.class}</p>
                <div className={styles.statsGrid}>
                  <div className={styles.stat}>
                    <Heart size={16} />
                    <span>{player.health}/{player.maxHealth}</span>
                  </div>
                  <div className={styles.stat}>
                    <Zap size={16} />
                    <span>{player.mana}/{player.maxMana}</span>
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

          {/* Tower Floors */}
          <div className={styles.towerSection}>
            <div className={styles.sectionHeader}>
              <Tower className={styles.sectionIcon} size={20} />
              <h3>Tower Floors</h3>
            </div>
            <div className={styles.towerFloors}>
              {towerFloors.map((floor) => (
                <div 
                  key={floor.id} 
                  className={`${styles.floorCard} ${floor.isCurrent ? styles.currentFloor : ''} ${!floor.isUnlocked ? styles.lockedFloor : ''}`}
                  onClick={() => floor.isUnlocked && !floor.isCompleted && startCombat(floor.boss)}
                >
                  <div className={styles.floorHeader}>
                    <div className={styles.floorNumber}>
                      <Tower size={20} />
                      <span>Floor {floor.id}</span>
                    </div>
                    <div className={styles.floorStatus}>
                      {floor.isCompleted ? (
                        <CheckCircle className={styles.statusIcon} size={20} />
                      ) : floor.isCurrent ? (
                        <ArrowUp className={styles.statusIcon} size={20} />
                      ) : !floor.isUnlocked ? (
                        <Lock className={styles.statusIcon} size={20} />
                      ) : (
                        <Sword className={styles.statusIcon} size={20} />
                      )}
                    </div>
                  </div>

                  <div className={styles.bossPreview}>
                    <div className={styles.bossAvatar}>
                      <img 
                        src={floor.boss.avatar} 
                        alt={floor.boss.name}
                        className={styles.avatar}
                      />
                      <div className={styles.rarityBadge} style={{ 
                        backgroundColor: getRarityColor(floor.boss.rarity),
                        boxShadow: `0 0 20px ${getRarityGlow(floor.boss.rarity)}`
                      }}>
                        {floor.boss.rarity.toUpperCase()}
                      </div>
                    </div>
                    <div className={styles.bossInfo}>
                      <h5 className={styles.bossName}>{floor.boss.name}</h5>
                      <p className={styles.bossType}>Level {floor.boss.level} {floor.boss.type}</p>
                      <div className={styles.bossStats}>
                        <div className={styles.stat}>
                          <Heart size={12} />
                          <span>{floor.boss.health}</span>
                        </div>
                        <div className={styles.stat}>
                          <Sword size={12} />
                          <span>{floor.boss.attack}</span>
                        </div>
                        <div className={styles.stat}>
                          <Shield size={12} />
                          <span>{floor.boss.defense}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.floorInfo}>
                    <h4 className={styles.floorName}>{floor.name}</h4>
                    <div 
                      className={styles.difficultyBadge}
                      style={{ backgroundColor: getDifficultyColor(floor.difficulty) }}
                    >
                      {floor.difficulty}
                    </div>
                  </div>

                  <div className={styles.rewards}>
                    <div className={styles.rewardItem}>
                      <Star size={14} />
                      <span>+{floor.boss.rewards.experience} XP</span>
                    </div>
                    <div className={styles.rewardItem}>
                      <Gem size={14} />
                      <span>+{floor.boss.rewards.gold} Gold</span>
                    </div>
                  </div>

                  {floor.isUnlocked && !floor.isCompleted && (
                    <button className={styles.challengeButton}>
                      <Sword size={16} />
                      Challenge Boss
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.combatArena}>
          <div className={styles.combatHeader}>
            <h2>⚔️ BOSS BATTLE ⚔️</h2>
            {combatState.isVictory && <div className={styles.victoryMessage}>🎉 VICTORY! 🎉</div>}
            {combatState.isDefeat && <div className={styles.defeatMessage}>💀 DEFEAT! 💀</div>}
            <button 
              className={styles.fleeButton}
              onClick={handleFleeCombat}
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
                  <div className={styles.rarityBadge} style={{ 
                    backgroundColor: getRarityColor(player.rarity),
                    boxShadow: `0 0 20px ${getRarityGlow(player.rarity)}`
                  }}>
                    {player.rarity.toUpperCase()}
                  </div>
                </div>
                <div className={styles.combatInfo}>
                  <h3 className={styles.combatName}>{player.name}</h3>
                  <p className={styles.combatLevel}>Level {player.level} {player.class}</p>
                  <div className={styles.healthBar}>
                    <div className={styles.healthFill} style={{ 
                      width: `${(combatState.playerHealth / player.maxHealth) * 100}%` 
                    }} />
                    <span className={styles.healthText}>{combatState.playerHealth}/{player.maxHealth}</span>
                  </div>
                  <div className={styles.manaBar}>
                    <div className={styles.manaFill} style={{ 
                      width: `${(combatState.playerMana / player.maxMana) * 100}%` 
                    }} />
                    <span className={styles.manaText}>{combatState.playerMana}/{player.maxMana}</span>
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

            {/* Boss Side */}
            <div className={styles.combatant}>
              <div className={styles.combatantCard}>
                <div className={styles.combatAvatar}>
                  <img 
                    src={selectedBoss?.avatar} 
                    alt={selectedBoss?.name}
                    className={styles.avatar}
                  />
                  <div className={styles.rarityBadge} style={{ 
                    backgroundColor: getRarityColor(selectedBoss?.rarity || 'common'),
                    boxShadow: `0 0 20px ${getRarityGlow(selectedBoss?.rarity || 'common')}`
                  }}>
                    {selectedBoss?.rarity.toUpperCase()}
                  </div>
                </div>
                <div className={styles.combatInfo}>
                  <h3 className={styles.combatName}>{selectedBoss?.name}</h3>
                  <p className={styles.combatLevel}>Level {selectedBoss?.level} {selectedBoss?.type}</p>
                  <div className={styles.healthBar}>
                    <div className={styles.healthFill} style={{ 
                      width: `${(combatState.bossHealth / (selectedBoss?.maxHealth || 1)) * 100}%` 
                    }} />
                    <span className={styles.healthText}>{combatState.bossHealth}/{selectedBoss?.maxHealth}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boss Description */}
          {selectedBoss && (
            <div className={styles.bossDescription}>
              <h4>{selectedBoss.name} - {selectedBoss.description}</h4>
              <div className={styles.specialAbilities}>
                <h5>Special Abilities:</h5>
                <div className={styles.abilitiesList}>
                  {selectedBoss.specialAbilities.map((ability, index) => (
                    <span key={index} className={styles.ability}>
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Combat Log */}
          <div className={styles.combatLog}>
            <h4>Combat Log</h4>
            <div className={styles.logEntries}>
              {combatState.combatLog.map((entry, index) => (
                <div key={index} className={styles.logEntry}>
                  {entry}
                </div>
              ))}
            </div>
          </div>

          {/* Combat Actions */}
          {!combatState.isVictory && !combatState.isDefeat && (
            <div className={styles.combatActions}>
              <button 
                className={styles.actionButton}
                onClick={playerAttack}
                disabled={!combatState.isPlayerTurn}
              >
                <Sword size={16} />
                Attack
              </button>
              <button 
                className={styles.actionButton}
                onClick={playerDefend}
                disabled={!combatState.isPlayerTurn}
              >
                <Shield size={16} />
                Defend
              </button>
              <button 
                className={styles.actionButton}
                onClick={playerMagic}
                disabled={!combatState.isPlayerTurn || combatState.playerMana < 20}
              >
                <Zap size={16} />
                Magic (20 MP)
              </button>
              <button 
                className={styles.actionButton}
                onClick={playerSpecial}
                disabled={!combatState.isPlayerTurn || combatState.playerMana < 50}
              >
                <Activity size={16} />
                Special (50 MP)
              </button>
            </div>
          )}

          {/* Victory/Defeat Actions */}
          {(combatState.isVictory || combatState.isDefeat) && (
            <div className={styles.combatActions}>
              <button 
                className={styles.actionButton}
                onClick={() => setIsCombatActive(false)}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BossTower;

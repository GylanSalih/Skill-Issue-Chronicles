import React from 'react';
import {
  Plus,
  Minus,
  Crown,
  Heart,
  Zap,
  Activity,
  Coins,
  Star,
  Target,
  Shield,
  Sword,
  TreePine,
  Pickaxe,
  Fish,
  FlaskConical,
  ChefHat,
  Hammer,
  Gem,
  Wand2,
  Snowflake,
  Egg,
  Skull,
  Mountain,
  Baby,
  Shield as ShieldIcon,
  Gem as Crystal,
  Flower,
} from 'lucide-react';
import {
  useCharacter,
  useCharacterClasses,
  useStatAllocation,
} from '../../../../core/contexts/GameContext';
import { useGameState } from '../../../../core/hooks/useGameState';
// import { useActivityManager } from '../../../../core/contexts/ActivityManager';
import { formatDate } from '../../../../core/services/dateUtils';
import styles from '../Character.module.scss';

// Import avatar images
import warriorImg from '@assets/img/avatars/warrior.png';

const ProfileTab: React.FC = () => {
  const { currentCharacter } = useCharacter();
  const { getClassById } = useCharacterClasses();
  const {
    allocateStatPoint,
    resetStatAllocation,
    getPendingStatChanges,
    applyStatChanges,
  } = useStatAllocation();
  const { gameState } = useGameState();
  // const { getSkillLevel, getAllSkills } = useActivityManager();

  // Use current character or fallback to default - memoized to prevent re-renders
  const character = React.useMemo(() => {
    return (
      currentCharacter || {
        name: 'Kein Charakter',
        gender: 'Unbekannt',
        characterClass: 'Unbekannt',
        characterClassId: 'warrior',
        level: 1,
        experience: 0,
        maxExperience: 100,
        stats: {
          strength: 10,
          agility: 10,
          intelligence: 10,
          vitality: 10,
          luck: 10,
        },
        availableStatPoints: 0,
        slotId: 0,
        createdAt: 'Unbekannt',
        lastLogin: 'Unbekannt',
      }
    );
  }, [currentCharacter]);

  // Get class information from context
  const classInfo = getClassById(character.characterClassId);

  // Skills data - Activity Levels (using real data from GameState)
  const skills = [
    {
      id: 'woodcutting',
      name: 'Woodcutting',
      icon: TreePine,
      level: gameState.skills.woodcutting?.level || 1,
      color: '#8B4513',
    },
    {
      id: 'mining',
      name: 'Mining',
      icon: Pickaxe,
      level: gameState.skills.mining?.level || 1,
      color: '#CD7F32',
    },
    { id: 'fishing', name: 'Fishing', icon: Fish, level: 1, color: '#4169E1' },
    {
      id: 'alchemy',
      name: 'Alchemy',
      icon: FlaskConical,
      level: 1,
      color: '#9370DB',
    },
    {
      id: 'cooking',
      name: 'Cooking',
      icon: ChefHat,
      level: gameState.skills.cooking?.level || 1,
      color: '#FF6347',
    },
    {
      id: 'smithing',
      name: 'Smithing',
      icon: Hammer,
      level: 1,
      color: '#708090',
    },
    { id: 'farming', name: 'Farming', icon: Gem, level: 1, color: '#32CD32' },
    { id: 'magic', name: 'Magic', icon: Wand2, level: 1, color: '#FF69B4' },
    {
      id: 'enchanting',
      name: 'Enchanting',
      icon: Snowflake,
      level: 1,
      color: '#87CEEB',
    },
    { id: 'breeding', name: 'Breeding', icon: Egg, level: 1, color: '#FFD700' },
    { id: 'combat', name: 'Combat', icon: Sword, level: 1, color: '#DC143C' },
    {
      id: 'exploration',
      name: 'Exploration',
      icon: Mountain,
      level: 1,
      color: '#8B0000',
    },
    { id: 'taming', name: 'Taming', icon: Baby, level: 1, color: '#20B2AA' },
    {
      id: 'defense',
      name: 'Defense',
      icon: ShieldIcon,
      level: 1,
      color: '#4682B4',
    },
    {
      id: 'jewelry',
      name: 'Jewelry',
      icon: Crystal,
      level: 1,
      color: '#DDA0DD',
    },
    {
      id: 'herbalism',
      name: 'Herbalism',
      icon: Flower,
      level: 1,
      color: '#90EE90',
    },
    {
      id: 'archery',
      name: 'Archery',
      icon: Target,
      level: 1,
      color: '#DEB887',
    },
    { id: 'stealth', name: 'Stealth', icon: Skull, level: 1, color: '#2F4F4F' },
  ];

  const getClassIcon = (characterClassId: string) => {
    const classData = getClassById(characterClassId);
    return classData?.image || warriorImg;
  };

  // Stat allocation functions
  const pendingChanges = getPendingStatChanges();

  const getCurrentStatValue = (statKey: keyof typeof character.stats) => {
    const baseValue = character.stats[statKey];
    const pendingChange = pendingChanges[statKey] || 0;
    return baseValue + pendingChange;
  };

  const getTotalPendingPoints = () => {
    return Object.values(pendingChanges).reduce(
      (sum, change) => sum + change,
      0
    );
  };

  const getRemainingPoints = () => {
    return character.availableStatPoints - getTotalPendingPoints();
  };

  const handleStatChange = (
    statKey: keyof typeof character.stats,
    amount: number
  ) => {
    const success = allocateStatPoint(statKey, amount);
    if (!success) {
      console.log('Cannot allocate stat point');
    }
  };

  const handleApply = () => {
    const success = applyStatChanges();
    if (!success) {
      console.log('Failed to apply stat changes');
    }
  };

  const handleReset = () => {
    resetStatAllocation();
  };

  const hasChanges = Object.values(pendingChanges).some(change => change !== 0);

  // Mock data for player stats and activities
  const playerStats = {
    level: character.level,
    experience: character.experience,
    experienceToNext: character.maxExperience - character.experience,
    health: 850,
    maxHealth: 1000,
    mana: 320,
    maxMana: 400,
    stamina: 180,
    maxStamina: 200,
    gold: 12500,
    gems: 45,
  };

  const recentActivities = [
    {
      id: 1,
      type: 'woodcutting',
      action: 'Chopped Normal Wood',
      time: '2 minutes ago',
      xp: 15,
    },
    {
      id: 2,
      type: 'mining',
      action: 'Mined Iron Ore',
      time: '5 minutes ago',
      xp: 25,
    },
    {
      id: 3,
      type: 'combat',
      action: 'Defeated Goblin',
      time: '8 minutes ago',
      xp: 40,
    },
    {
      id: 4,
      type: 'fishing',
      action: 'Caught Salmon',
      time: '12 minutes ago',
      xp: 20,
    },
  ];

  // Active skills using real data from GameState
  const activeSkills = [
    {
      name: 'Woodcutting',
      level: gameState.skills.woodcutting?.level || 1,
      progress: gameState.skills.woodcutting?.progress || 0,
      xp: gameState.skills.woodcutting?.experience || 0,
      nextLevel: (gameState.skills.woodcutting?.level || 1) * 100,
    },
    {
      name: 'Mining',
      level: gameState.skills.mining?.level || 1,
      progress: gameState.skills.mining?.progress || 0,
      xp: gameState.skills.mining?.experience || 0,
      nextLevel: (gameState.skills.mining?.level || 1) * 100,
    },
    {
      name: 'Cooking',
      level: gameState.skills.cooking?.level || 1,
      progress: gameState.skills.cooking?.progress || 0,
      xp: gameState.skills.cooking?.experience || 0,
      nextLevel: (gameState.skills.cooking?.level || 1) * 100,
    },
    {
      name: 'Fishing',
      level: 1,
      progress: 0,
      xp: 0,
      nextLevel: 100,
    },
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Reach level 10',
      icon: Star,
      completed: true,
    },
    {
      id: 2,
      title: 'Wood Master',
      description: 'Chop 1000 pieces of wood',
      icon: Target,
      completed: true,
    },
    {
      id: 3,
      title: 'Mining Expert',
      description: 'Mine 500 ores',
      icon: Shield,
      completed: false,
    },
    {
      id: 4,
      title: 'Combat Veteran',
      description: 'Win 100 battles',
      icon: Sword,
      completed: false,
    },
  ];

  const inventory = [
    { name: 'Eisenschwert', type: 'Waffe', quantity: 1 },
    { name: 'Heiltrank', type: 'Verbrauch', quantity: 5 },
    { name: 'Magischer Ring', type: 'Zubehör', quantity: 1 },
    { name: 'Holz', type: 'Ressource', quantity: 50 },
  ];

  const pets = [
    { name: 'Kosmischer Drache', rank: 'SSSS+', level: 50, isActive: true },
    { name: 'Flammentiger', rank: 'SS', level: 28, isActive: false },
    { name: 'Waldgeist', rank: 'S', level: 22, isActive: false },
  ];

  return (
    <div className={styles.tabContent}>
      {/* Charakter-Übersicht */}
      <div className={`${styles.section} ${styles.characterOverview}`}>
        <h2>Charakter-Übersicht</h2>
        <div className={styles.characterHeader}>
          <div className={styles.characterImage}>
            <img
              src={getClassIcon(character.characterClassId)}
              alt={character.name}
              className={styles.characterAvatar}
              onError={e => {
                e.currentTarget.src = warriorImg;
              }}
            />
            <div className={styles.levelBadge}>{character.level}</div>
          </div>
          <div className={styles.characterInfo}>
            <p>
              <strong>Name:</strong> {character.name}
            </p>
            <p>
              <strong>Geschlecht:</strong> {character.gender}
            </p>
            <p>
              <strong>Klasse:</strong>{' '}
              {classInfo?.name || character.characterClass}
            </p>
            <p>
              <strong>Level:</strong> {character.level}
            </p>
            <p>
              <strong>Erfahrung:</strong> {character.experience} /{' '}
              {character.maxExperience}
            </p>
          </div>
        </div>
      </div>

      {/* Player Stats Overview */}
      <div className={`${styles.section} ${styles.playerStats}`}>
        <h2>Player Stats</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Crown className={styles.statIcon} size={20} />
              <span className={styles.statTitle}>Level</span>
            </div>
            <div className={styles.statValue}>{playerStats.level}</div>
            <div className={styles.statSubtext}>
              {playerStats.experience} /{' '}
              {playerStats.experience + playerStats.experienceToNext} XP
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${(playerStats.experience / (playerStats.experience + playerStats.experienceToNext)) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Heart className={styles.statIcon} size={20} />
              <span className={styles.statTitle}>Health</span>
            </div>
            <div className={styles.statValue}>{playerStats.health}</div>
            <div className={styles.statSubtext}>/ {playerStats.maxHealth}</div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${(playerStats.health / playerStats.maxHealth) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Zap className={styles.statIcon} size={20} />
              <span className={styles.statTitle}>Mana</span>
            </div>
            <div className={styles.statValue}>{playerStats.mana}</div>
            <div className={styles.statSubtext}>/ {playerStats.maxMana}</div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${(playerStats.mana / playerStats.maxMana) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Activity className={styles.statIcon} size={20} />
              <span className={styles.statTitle}>Stamina</span>
            </div>
            <div className={styles.statValue}>{playerStats.stamina}</div>
            <div className={styles.statSubtext}>/ {playerStats.maxStamina}</div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${(playerStats.stamina / playerStats.maxStamina) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Coins className={styles.statIcon} size={20} />
              <span className={styles.statTitle}>Gold</span>
            </div>
            <div className={styles.statValue}>
              {playerStats.gold.toLocaleString()}
            </div>
            <div className={styles.statSubtext}>Coins</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Star className={styles.statIcon} size={20} />
              <span className={styles.statTitle}>Gems</span>
            </div>
            <div className={styles.statValue}>{playerStats.gems}</div>
            <div className={styles.statSubtext}>Premium Currency</div>
          </div>
        </div>
      </div>

      {/* Attribute und Spielinformationen nebeneinander */}
      <div className={styles.attributesAndInfoContainer}>
        {/* Attribute */}
        <div className={`${styles.section} ${styles.attributes}`}>
          <h2>Attribute</h2>

          {/* Verfügbare Punkte Info */}
          {character.availableStatPoints > 0 && (
            <div className={styles.pointsInfo}>
              <span className={styles.availablePoints}>
                Verfügbare Attributpunkte: {getRemainingPoints()}
                {getTotalPendingPoints() > 0 && (
                  <span className={styles.pendingPoints}>
                    (verwendet: {getTotalPendingPoints()})
                  </span>
                )}
              </span>
            </div>
          )}

          {/* Stat Items mit Plus/Minus Buttons */}
          <div className={styles.statItem}>
            <span>Stärke:</span>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>
                {getCurrentStatValue('strength')}
                {pendingChanges.strength && pendingChanges.strength !== 0 && (
                  <span
                    className={`${styles.pendingChange} ${pendingChanges.strength > 0 ? styles.positive : styles.negative}`}
                  >
                    ({pendingChanges.strength > 0 ? '+' : ''}
                    {pendingChanges.strength})
                  </span>
                )}
              </span>
              {character.availableStatPoints > 0 && (
                <div className={styles.statControls}>
                  <button
                    className={`${styles.statButton} ${styles.decreaseButton}`}
                    onClick={() => handleStatChange('strength', -1)}
                    disabled={
                      !pendingChanges.strength || pendingChanges.strength <= 0
                    }
                    title='Verringern'
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    className={`${styles.statButton} ${styles.increaseButton}`}
                    onClick={() => handleStatChange('strength', 1)}
                    disabled={getRemainingPoints() <= 0}
                    title='Erhöhen'
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.statItem}>
            <span>Geschicklichkeit:</span>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>
                {getCurrentStatValue('agility')}
                {pendingChanges.agility && pendingChanges.agility !== 0 && (
                  <span
                    className={`${styles.pendingChange} ${pendingChanges.agility > 0 ? styles.positive : styles.negative}`}
                  >
                    ({pendingChanges.agility > 0 ? '+' : ''}
                    {pendingChanges.agility})
                  </span>
                )}
              </span>
              {character.availableStatPoints > 0 && (
                <div className={styles.statControls}>
                  <button
                    className={`${styles.statButton} ${styles.decreaseButton}`}
                    onClick={() => handleStatChange('agility', -1)}
                    disabled={
                      !pendingChanges.agility || pendingChanges.agility <= 0
                    }
                    title='Verringern'
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    className={`${styles.statButton} ${styles.increaseButton}`}
                    onClick={() => handleStatChange('agility', 1)}
                    disabled={getRemainingPoints() <= 0}
                    title='Erhöhen'
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.statItem}>
            <span>Intelligenz:</span>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>
                {getCurrentStatValue('intelligence')}
                {pendingChanges.intelligence &&
                  pendingChanges.intelligence !== 0 && (
                    <span
                      className={`${styles.pendingChange} ${pendingChanges.intelligence > 0 ? styles.positive : styles.negative}`}
                    >
                      ({pendingChanges.intelligence > 0 ? '+' : ''}
                      {pendingChanges.intelligence})
                    </span>
                  )}
              </span>
              {character.availableStatPoints > 0 && (
                <div className={styles.statControls}>
                  <button
                    className={`${styles.statButton} ${styles.decreaseButton}`}
                    onClick={() => handleStatChange('intelligence', -1)}
                    disabled={
                      !pendingChanges.intelligence ||
                      pendingChanges.intelligence <= 0
                    }
                    title='Verringern'
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    className={`${styles.statButton} ${styles.increaseButton}`}
                    onClick={() => handleStatChange('intelligence', 1)}
                    disabled={getRemainingPoints() <= 0}
                    title='Erhöhen'
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.statItem}>
            <span>Vitalität:</span>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>
                {getCurrentStatValue('vitality')}
                {pendingChanges.vitality && pendingChanges.vitality !== 0 && (
                  <span
                    className={`${styles.pendingChange} ${pendingChanges.vitality > 0 ? styles.positive : styles.negative}`}
                  >
                    ({pendingChanges.vitality > 0 ? '+' : ''}
                    {pendingChanges.vitality})
                  </span>
                )}
              </span>
              {character.availableStatPoints > 0 && (
                <div className={styles.statControls}>
                  <button
                    className={`${styles.statButton} ${styles.decreaseButton}`}
                    onClick={() => handleStatChange('vitality', -1)}
                    disabled={
                      !pendingChanges.vitality || pendingChanges.vitality <= 0
                    }
                    title='Verringern'
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    className={`${styles.statButton} ${styles.increaseButton}`}
                    onClick={() => handleStatChange('vitality', 1)}
                    disabled={getRemainingPoints() <= 0}
                    title='Erhöhen'
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.statItem}>
            <span>Glück:</span>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>
                {getCurrentStatValue('luck')}
                {pendingChanges.luck && pendingChanges.luck !== 0 && (
                  <span
                    className={`${styles.pendingChange} ${pendingChanges.luck > 0 ? styles.positive : styles.negative}`}
                  >
                    ({pendingChanges.luck > 0 ? '+' : ''}
                    {pendingChanges.luck})
                  </span>
                )}
              </span>
              {character.availableStatPoints > 0 && (
                <div className={styles.statControls}>
                  <button
                    className={`${styles.statButton} ${styles.decreaseButton}`}
                    onClick={() => handleStatChange('luck', -1)}
                    disabled={!pendingChanges.luck || pendingChanges.luck <= 0}
                    title='Verringern'
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    className={`${styles.statButton} ${styles.increaseButton}`}
                    onClick={() => handleStatChange('luck', 1)}
                    disabled={getRemainingPoints() <= 0}
                    title='Erhöhen'
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons - nur anzeigen wenn Änderungen vorhanden sind */}
          {hasChanges && (
            <div className={styles.statActions}>
              <button
                className={styles.resetButton}
                onClick={handleReset}
                title='Änderungen zurücksetzen'
              >
                Zurücksetzen
              </button>
              <button
                className={styles.applyButton}
                onClick={handleApply}
                title='Änderungen anwenden'
              >
                Anwenden
              </button>
            </div>
          )}
        </div>

        {/* Spielinformationen */}
        <div className={`${styles.section} ${styles.gameInfo}`}>
          <h2>Spielinformationen</h2>
          <div className={styles.infoItem}>
            <span>Slot:</span>
            <span>{character.slotId}</span>
          </div>
          <div className={styles.infoItem}>
            <span>Erstellt am:</span>
            <span>
              {character.createdAt !== 'Unbekannt'
                ? formatDate(character.createdAt)
                : character.createdAt}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>Letzter Login:</span>
            <span>
              {character.lastLogin !== 'Unbekannt'
                ? formatDate(character.lastLogin)
                : character.lastLogin}
            </span>
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div className={`${styles.section} ${styles.inventory}`}>
        <h2>Inventory</h2>
        <div className={styles.inventoryGrid}>
          {inventory.map((item, index) => (
            <div key={index} className={styles.inventoryItem}>
              <p>{item.name}</p>
              <p>({item.type})</p>
              <p>Anzahl: {item.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pets */}
      <div className={`${styles.section} ${styles.pets}`}>
        <h2>Aktive Pets</h2>
        <div className={styles.petsGrid}>
          {pets.map((pet, index) => (
            <div
              key={index}
              className={`${styles.petItem} ${pet.isActive ? styles.active : ''}`}
            >
              <p>{pet.name}</p>
              <p>
                {pet.rank} - Level {pet.level}
              </p>
              <p>{pet.isActive ? 'Aktiv' : 'Inaktiv'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className={`${styles.section} ${styles.recentActivities}`}>
        <h2>Recent Activities</h2>
        <div className={styles.activitiesList}>
          {recentActivities.map(activity => (
            <div key={activity.id} className={styles.activityItem}>
              <div className={styles.activityIcon}>
                {activity.type === 'woodcutting' && <Target size={16} />}
                {activity.type === 'mining' && <Shield size={16} />}
                {activity.type === 'combat' && <Sword size={16} />}
                {activity.type === 'fishing' && <Activity size={16} />}
              </div>
              <div className={styles.activityInfo}>
                <div className={styles.activityAction}>{activity.action}</div>
                <div className={styles.activityTime}>{activity.time}</div>
              </div>
              <div className={styles.activityXp}>+{activity.xp} XP</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Progress */}
      <div className={`${styles.section} ${styles.skillProgress}`}>
        <h2>Skill Progress</h2>
        <div className={styles.skillsList}>
          {activeSkills.map((skill, index) => (
            <div key={index} className={styles.skillItem}>
              <div className={styles.skillInfo}>
                <div className={styles.skillName}>{skill.name}</div>
                <div className={styles.skillLevel}>Level {skill.level}</div>
              </div>
              <div className={styles.skillProgressBar}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
                <div className={styles.skillXp}>
                  {skill.xp} / {skill.nextLevel} XP
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Skills Grid */}
      <div className={`${styles.section} ${styles.skillsGrid}`}>
        <h2>Activity Skills</h2>
        <div className={styles.skillsGridContainer}>
          {skills.map(skill => {
            const IconComponent = skill.icon;
            return (
              <div key={skill.id} className={styles.skillCard}>
                <div
                  className={styles.skillIcon}
                  style={{ color: skill.color }}
                >
                  <IconComponent size={24} />
                </div>
                <div className={styles.skillLevelBadge}>Lv. {skill.level}</div>
                <div className={styles.skillName}>{skill.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className={`${styles.section} ${styles.achievements}`}>
        <h2>Achievements</h2>
        <div className={styles.achievementsList}>
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className={`${styles.achievementItem} ${achievement.completed ? styles.completed : ''}`}
            >
              <div className={styles.achievementIcon}>
                <achievement.icon size={18} />
              </div>
              <div className={styles.achievementInfo}>
                <div className={styles.achievementTitle}>
                  {achievement.title}
                </div>
                <div className={styles.achievementDescription}>
                  {achievement.description}
                </div>
              </div>
              {achievement.completed && (
                <div className={styles.achievementBadge}>✓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;

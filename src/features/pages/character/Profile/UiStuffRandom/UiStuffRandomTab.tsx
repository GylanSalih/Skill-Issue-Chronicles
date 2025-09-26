import {
  Activity,
  ArrowUpDown,
  Coins,
  Crown,
  Heart,
  Star,
  Zap,
} from 'lucide-react';
import React from 'react';
import {
  useCharacter,
  useCharacterClasses,
} from '../../../../../core/contexts/GameContext';
import { useResources } from '../../../../../core/engine';
import styles from './UiStuffRandomTab.module.scss';

const UiStuffRandomTab: React.FC = () => {
  const { currentCharacter } = useCharacter();
  const { getClassById } = useCharacterClasses();
  const { resources } = useResources();

  // Use current character or fallback to default
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

  // Real inventory from engine resources
  const inventory = Object.entries(resources)
    .filter(([, amount]) => amount > 0)
    .map(([resourceId, amount]) => ({
      name: resourceId.charAt(0).toUpperCase() + resourceId.slice(1),
      type: 'Resource',
      quantity: amount,
      id: resourceId,
    }))
    .slice(0, 20);

  const pets = [
    { name: 'Kosmischer Drache', rank: 'SSSS+', level: 50, isActive: true },
    { name: 'Flammentiger', rank: 'SS', level: 28, isActive: false },
    { name: 'Waldgeist', rank: 'S', level: 22, isActive: false },
  ];

  return (
    <>
      {/* UI Components Header */}
      <div className={`${styles.section} ${styles.uiStuffRandomHeader}`}>
        <div className={styles.uiStuffRandomHeaderContent}>
          <div className={styles.uiStuffRandomHeaderIcon}>
            <ArrowUpDown size={32} />
          </div>
          <div className={styles.uiStuffRandomHeaderText}>
            <h2>UI Stuff Random</h2>
            <p>Verschiedene UI-Komponenten und Activity-Anzeigen</p>
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

      {/* Inventory */}
      <div className={`${styles.section} ${styles.inventory}`}>
        <h2>Inventory Resources</h2>
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
    </>
  );
};

export default UiStuffRandomTab;

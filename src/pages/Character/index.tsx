import React from 'react';
import { User } from 'lucide-react';
import styles from './Character.module.scss';

const Character = () => {
  // Statische Daten - später dynamisch
  const character = {
    name: "Mira",
    gender: "Männlich",
    characterClass: "Tüftler",
    characterClassId: "tinkerer",
    level: 1,
    experience: 0,
    maxExperience: 100,
    stats: {
      strength: 10,
      agility: 11,
      intelligence: 13,
      vitality: 10,
      luck: 10
    },
    availableStatPoints: 5,
    slot: 1,
    createdAt: "21.09.2025, 01:29",
    lastLogin: "21.09.2025, 01:29"
  };

  const getClassIcon = (characterClassId: string) => {
    const iconMap: Record<string, string> = {
      'warrior': '/assets/img/avatars/warrior.png',
      'mage': '/assets/img/avatars/magier.png',
      'rogue': '/assets/img/avatars/schurke2.png',
      'archer': '/assets/img/avatars/elfe.png',
      'healer': '/assets/img/avatars/heilerin.png',
      'berserker': '/assets/img/avatars/berserk.png',
      'paladin': '/assets/img/avatars/paladin.png',
      'assassin': '/assets/img/avatars/assassine2.png',
      'tinkerer': '/assets/img/avatars/tuefftler.png',
      'elementalist': '/assets/img/avatars/elementarist.png'
    };
    return iconMap[characterClassId] || '/assets/img/avatars/warrior.png';
  };

  const inventory = [
    { name: "Eisenschwert", type: "Waffe", quantity: 1 },
    { name: "Heiltrank", type: "Verbrauch", quantity: 5 },
    { name: "Magischer Ring", type: "Zubehör", quantity: 1 },
    { name: "Holz", type: "Ressource", quantity: 50 }
  ];

  const pets = [
    { name: "Kosmischer Drache", rank: "SSSS+", level: 50, isActive: true },
    { name: "Flammentiger", rank: "SS", level: 28, isActive: false },
    { name: "Waldgeist", rank: "S", level: 22, isActive: false }
  ];

  return (
    <div className={styles.characterPage}>
      <div className={styles.header}>
        <User className={styles.headerIcon} size={24} />
        <div className={styles.headerContent}>
          <h1>Charakter-Details</h1>
          <p>Verwalte deinen Charakter und seine Eigenschaften</p>
        </div>
      </div>
      
      <div className={styles.content}>
        {/* Charakter-Übersicht */}
        <div className={`${styles.section} ${styles.characterOverview}`}>
          <h2>Charakter-Übersicht</h2>
          <div className={styles.characterHeader}>
            <div className={styles.characterImage}>
              <img 
                src={getClassIcon(character.characterClassId)} 
                alt={character.name}
                className={styles.characterAvatar}
                onError={(e) => {
                  e.currentTarget.src = '/assets/img/avatars/warrior.png';
                }}
              />
              <div className={styles.levelBadge}>
                {character.level}
              </div>
            </div>
            <div className={styles.characterInfo}>
              <p><strong>Name:</strong> {character.name}</p>
              <p><strong>Geschlecht:</strong> {character.gender}</p>
              <p><strong>Klasse:</strong> {character.characterClass}</p>
              <p><strong>Level:</strong> {character.level}</p>
              <p><strong>Erfahrung:</strong> {character.experience} / {character.maxExperience}</p>
            </div>
          </div>
        </div>

        {/* Attribute */}
        <div className={`${styles.section} ${styles.attributes}`}>
          <h2>Attribute</h2>
          <div className={styles.statItem}>
            <span>Stärke:</span>
            <span>{character.stats.strength}</span>
          </div>
          <div className={styles.statItem}>
            <span>Geschicklichkeit:</span>
            <span>{character.stats.agility}</span>
          </div>
          <div className={styles.statItem}>
            <span>Intelligenz:</span>
            <span>{character.stats.intelligence}</span>
          </div>
          <div className={styles.statItem}>
            <span>Vitalität:</span>
            <span>{character.stats.vitality}</span>
          </div>
          <div className={styles.statItem}>
            <span>Glück:</span>
            <span>{character.stats.luck}</span>
          </div>
          <div className={styles.statItem}>
            <span>Verfügbare Attributpunkte:</span>
            <span>{character.availableStatPoints}</span>
          </div>
        </div>

        {/* Spielinformationen */}
        <div className={`${styles.section} ${styles.gameInfo}`}>
          <h2>Spielinformationen</h2>
          <div className={styles.infoItem}>
            <span>Slot:</span>
            <span>{character.slot}</span>
          </div>
          <div className={styles.infoItem}>
            <span>Erstellt am:</span>
            <span>{character.createdAt}</span>
          </div>
          <div className={styles.infoItem}>
            <span>Letzter Login:</span>
            <span>{character.lastLogin}</span>
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
              <div key={index} className={`${styles.petItem} ${pet.isActive ? styles.active : ''}`}>
                <p>{pet.name}</p>
                <p>{pet.rank} - Level {pet.level}</p>
                <p>{pet.isActive ? 'Aktiv' : 'Inaktiv'}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Character;

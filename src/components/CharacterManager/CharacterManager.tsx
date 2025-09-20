'use client'

// components/CharacterManager.js
import { useState, useEffect } from 'react';
import CharacterSlot from './CharacterSlot.js';
import CharacterCreator from './CharacterCreator.js';
import CharacterDetails from './CharacterDetails.js';
import styles from './CharacterManager.module.scss';

const CharacterManager = () => {
  const [characters, setCharacters] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentView, setCurrentView] = useState('overview'); // 'overview', 'create', 'details'

  // Lade Charaktere beim Mount
  useEffect(() => {
    const savedCharacters = localStorage.getItem('idleGameCharacters');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    }
  }, []);

  // Speichere Charaktere bei Änderungen
  useEffect(() => {
    localStorage.setItem('idleGameCharacters', JSON.stringify(characters));
  }, [characters]);

  const createCharacter = (slotId, characterData) => {
    const newCharacter = {
      ...characterData,
      id: `char_${slotId}_${Date.now()}`,
      slotId: slotId,
      level: 1,
      experience: 0,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      stats: getClassBaseStats(characterData.characterClass),
      availableStatPoints: 5
    };

    setCharacters(prev => ({
      ...prev,
      [slotId]: newCharacter
    }));

    setCurrentView('overview');
    setSelectedSlot(null);
  };

  const deleteCharacter = (slotId) => {
    const newCharacters = { ...characters };
    delete newCharacters[slotId];
    setCharacters(newCharacters);
    setCurrentView('overview');
    setSelectedSlot(null);
  };

  const getClassBaseStats = (characterClass) => {
    const baseStats = {
      strength: 10,
      agility: 10,
      intelligence: 10,
      vitality: 10,
      luck: 10
    };

    // Klassen-spezifische Boni
    switch (characterClass) {
      case 'warrior':
        return { ...baseStats, strength: 15, vitality: 13 };
      case 'mage':
        return { ...baseStats, intelligence: 15, vitality: 8 };
      case 'rogue':
        return { ...baseStats, agility: 15, luck: 12 };
      case 'archer':
        return { ...baseStats, agility: 13, luck: 12 };
      case 'healer':
        return { ...baseStats, intelligence: 12, vitality: 13 };
      case 'berserker':
        return { ...baseStats, strength: 17, vitality: 8 };
      case 'paladin':
        return { ...baseStats, strength: 12, intelligence: 11, vitality: 12 };
      case 'assassin':
        return { ...baseStats, agility: 16, luck: 11 };
      case 'tinkerer':
        return { ...baseStats, intelligence: 13, agility: 11 };
      case 'elementalist':
        return { ...baseStats, intelligence: 16, vitality: 9 };
      default:
        return baseStats;
    }
  };

  const handleSlotClick = (slotId) => {
    setSelectedSlot(slotId);
    if (characters[slotId]) {
      setCurrentView('details');
    } else {
      setCurrentView('create');
    }
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
    setSelectedSlot(null);
  };

  // Übersichts-View
  if (currentView === 'overview') {
    return (
      <div className={styles.characterManager}>
        <div className={styles.characterHeader}>
          <h1>Charakter-Verwaltung</h1>
          <p>Wähle einen Slot aus, um einen neuen Charakter zu erstellen oder einen bestehenden zu verwalten.</p>
        </div>
        
        <div className={styles.characterSlotsGrid}>
          {Array.from({ length: 10 }, (_, index) => (
            <CharacterSlot
              key={index + 1}
              slotId={index + 1}
              character={characters[index + 1]}
              onClick={() => handleSlotClick(index + 1)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Charakter-Erstellung
  if (currentView === 'create') {
    return (
      <CharacterCreator
        slotId={selectedSlot}
        onCreateCharacter={createCharacter}
        onBack={handleBackToOverview}
      />
    );
  }

  // Charakter-Details
  if (currentView === 'details') {
    return (
      <CharacterDetails
        character={characters[selectedSlot]}
        onBack={handleBackToOverview}
        onDelete={() => deleteCharacter(selectedSlot)}
      />
    );
  }
};

export default CharacterManager;
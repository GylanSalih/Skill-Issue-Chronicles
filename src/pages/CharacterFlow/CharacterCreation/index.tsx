import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CharacterCreator from '../components/CharacterCreator';
import CharacterSlot from '../CharacterSelection/CharacterSlot';
import styles from './CharacterCreation.module.scss';

const CharacterCreation = () => {
  const navigate = useNavigate();
  const { slotId } = useParams<{ slotId: string }>();
  const [characters, setCharacters] = useState<Record<number, any>>({});
  const [currentView, setCurrentView] = useState('create'); // 'overview', 'create'

  // Automatisch zum Character Creator springen wenn Slot-Parameter vorhanden ist
  useEffect(() => {
    if (slotId && !characters[parseInt(slotId)]) {
      setCurrentView('create');
    } else if (!slotId) {
      setCurrentView('overview');
    }
  }, [slotId, characters]);

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

  const getClassBaseStats = (characterClass: string) => {
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

  const createCharacter = (slotId: number, characterData: any) => {
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

    // Charakter wurde erstellt - bleibt im Preview
    console.log('Character created:', newCharacter);
  };

  const handleSlotClick = (slotId: number) => {
    if (characters[slotId]) {
      // Wenn bereits ein Charakter vorhanden ist, zum Spiel weiterleiten
      navigate('/');
    } else {
      // Zur Character Creation für diesen Slot weiterleiten
      navigate(`/character-creation/${slotId}`);
    }
  };

  const handleBackToSelection = () => {
    navigate('/character-selection');
  };

  const handleCreateForSlot = () => {
    if (slotId) {
      setCurrentView('create');
    }
  };

  // Wenn Slot-Parameter vorhanden ist, zeige direkt den Character Creator
  if (slotId) {
    return (
      <div className={styles.characterCreationPage}>
        <CharacterCreator
          slotId={parseInt(slotId)}
          onCreateCharacter={createCharacter}
          onBack={handleBackToSelection}
        />
      </div>
    );
  }

  // Übersichts-View - Zeige alle Slots (nur wenn kein Slot-Parameter)
  if (currentView === 'overview') {
    return (
      <div className={styles.characterCreationPage}>
        <div className={styles.characterGrid}>
          <div className={styles.header}>
            <button className={styles.backButton} onClick={handleBackToSelection}>
              <ArrowLeft size={16} />
              Back to Selection
            </button>
            <div className={styles.headerContent}>
              <h1>Character Creation</h1>
              <p>Choose a slot to create your character</p>
            </div>
          </div>

          <div className={styles.characterSlotsGrid}>
            {Array.from({ length: 6 }, (_, index) => (
              <CharacterSlot
                key={index + 1}
                slotId={index + 1}
                character={characters[index + 1]}
                onClick={() => handleSlotClick(index + 1)}
              />
            ))}
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.createForSlotButton}
              onClick={handleCreateForSlot}
            >
              Create New Character
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CharacterCreation;

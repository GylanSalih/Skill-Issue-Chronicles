import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCharacterStats, useCharacter, Character } from '../../../contexts/GameContext';
import CharacterCreator from '../components/CharacterCreator';
import CharacterSlot from '../CharacterSelection/CharacterSlot';
import styles from './CharacterCreation.module.scss';

const CharacterCreation = () => {
  const navigate = useNavigate();
  const { slotId } = useParams<{ slotId: string }>();
  const [characters, setCharacters] = useState<Record<number, Character>>({});
  const [currentView, setCurrentView] = useState('create'); // 'overview', 'create'
  const { getClassBaseStats } = useCharacterStats();
  const { setCurrentCharacter } = useCharacter();

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


  const createCharacter = (slotId: number, characterData: any) => {
    const baseStats = getClassBaseStats(characterData.characterClass);
    
    const newCharacter: Character = {
      id: `char_${slotId}_${Date.now()}`,
      name: characterData.playerName,
      gender: characterData.gender || 'Unbekannt',
      characterClass: characterData.characterClass,
      characterClassId: characterData.characterClass,
      slotId: slotId,
      level: 1,
      experience: 0,
      maxExperience: 100,
      stats: baseStats,
      availableStatPoints: 5,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    setCharacters(prev => ({
      ...prev,
      [slotId]: newCharacter
    }));

    // Set as current character
    setCurrentCharacter(newCharacter);

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

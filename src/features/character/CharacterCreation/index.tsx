import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCharacterStats, useCharacter, Character } from '../../../core/contexts/GameContext';
import { SaveManager } from '../../../core/services/saveManager';
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
  }, [slotId]); // Nur slotId als Dependency, nicht characters

  // Lade Charaktere nur beim Mount
  useEffect(() => {
    loadCharacters();
  }, []); // Nur beim Mount

  // Funktion zum Laden der Charaktere aus beiden Quellen
  const loadCharacters = () => {
    // Lade zuerst aus dem alten Format
    const savedCharacters = localStorage.getItem('idleGameCharacters');
    let charactersFromOldFormat: Record<number, Character> = {};
    
    if (savedCharacters) {
      try {
        charactersFromOldFormat = JSON.parse(savedCharacters);
      } catch (error) {
        console.error('Error parsing old character format:', error);
      }
    }

    // Lade dann aus dem neuen SaveManager Format
    const saveData = SaveManager.loadGame();
    let charactersFromSaveManager: Record<number, Character> = {};
    
    if (saveData && saveData.characters) {
      charactersFromSaveManager = saveData.characters;
    }

    // Merge beide Quellen (SaveManager hat Priorität)
    const mergedCharacters = {
      ...charactersFromOldFormat,
      ...charactersFromSaveManager
    };

    console.log('Character Creation - Loading characters:', {
      fromOldFormat: charactersFromOldFormat,
      fromSaveManager: charactersFromSaveManager,
      merged: mergedCharacters
    });

    setCharacters(mergedCharacters);
  };

  // Funktion zum Speichern der Charaktere
  const saveCharacters = (charactersToSave: Record<number, Character>) => {
    console.log('Saving characters:', charactersToSave);
    
    // Speichere im alten Format für Kompatibilität
    localStorage.setItem('idleGameCharacters', JSON.stringify(charactersToSave));
    console.log('Saved to localStorage (old format)');
    
    // Speichere auch im SaveManager Format
    const saveData = SaveManager.loadGame();
    if (saveData) {
      // Aktualisiere nur die Charaktere, behalte den Rest bei
      SaveManager.saveGame(saveData.gameState, charactersToSave, saveData.description);
      console.log('Updated SaveManager with characters');
    } else {
      // Falls kein Save existiert, erstelle einen neuen
      const defaultGameState = {
        resources: {
          primary: 0,
          secondary: {
            wood: 0, stone: 0, metal: 0, food: 0,
            normalWood: 0, softwood: 0, willowWood: 0, glowwood: 0,
            frostbark: 0, ebonyWood: 0, voidbark: 0, yangWood: 0, yingWood: 0,
            essences: 0, rareItems: 0
          }
        },
        character: {
          id: '1', name: 'Player', level: 1, experience: 0, totalLevel: 1,
          stats: { attack: 1, defense: 1, intelligence: 1, stamina: 1, melee: 1, ranged: 1, magic: 1 },
          equipment: {}
        },
        skills: {
          woodcutting: { id: 'woodcutting', name: 'Woodcutting', level: 1, experience: 0, isActive: false, progress: 0, baseTime: 5 },
          cooking: { id: 'cooking', name: 'Cooking', level: 1, experience: 0, isActive: false, progress: 0, baseTime: 8 },
          mining: { id: 'mining', name: 'Mining', level: 1, experience: 0, isActive: false, progress: 0, baseTime: 10 }
        },
        inventory: { items: [], maxSlots: 50 },
        settings: { autoSave: true, notifications: true, soundEnabled: true, theme: 'dark' as const }
      };
      SaveManager.saveGame(defaultGameState, charactersToSave, 'Character Creation Save');
      console.log('Created new SaveManager save with characters');
    }
  };


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

    console.log('Creating character for slot:', slotId, 'Character data:', newCharacter);
    console.log('Current characters before update:', characters);

    setCharacters(prev => {
      const updated = {
        ...prev,
        [slotId]: newCharacter
      };
      console.log('Updated characters after setState:', updated);
      
      // Speichere die Charaktere direkt nach dem Update
      saveCharacters(updated);
      
      return updated;
    });

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

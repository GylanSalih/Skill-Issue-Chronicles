import { ArrowLeft } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Character,
  useCharacter,
  useCharacterStats,
} from '../../../../core/contexts/GameContext';
import { SaveManager } from '../../../../core/services/saveManager';
import CharacterSlot from '../CharacterSelection/CharacterSlot';
import CharacterCreator from '../components/CharacterCreator';
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

  // Funktion zum Laden der Charaktere aus beiden Quellen
  const loadCharacters = useCallback(() => {
    // Lade zuerst aus dem alten Format
    const savedCharacters = localStorage.getItem('idleGameCharacters');
    let charactersFromOldFormat: Record<number, Character> = {};

    if (savedCharacters && savedCharacters.trim() !== '') {
      try {
        charactersFromOldFormat = JSON.parse(savedCharacters);
      } catch (error) {
        console.error('Error parsing old character format:', error);
        // Clear corrupted data
        localStorage.removeItem('idleGameCharacters');
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
      ...charactersFromSaveManager,
    };

    setCharacters(mergedCharacters);
  }, []);

  // Lade Charaktere nur beim Mount
  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  // Funktion zum Speichern der Charaktere
  const saveCharacters = useCallback(
    (charactersToSave: Record<number, Character>) => {
      // Speichere im alten Format für Kompatibilität
      localStorage.setItem(
        'idleGameCharacters',
        JSON.stringify(charactersToSave)
      );

      // Speichere auch im neuen SaveManager Format
      const defaultGameState = {
        resources: {
          primary: 0,
          wood: 0,
          stone: 0,
          iron: 0,
          gold: 0,
        },
        skills: {
          woodcutting: {
            level: 1,
            experience: 0,
            isActive: false,
            currentActivity: null,
          },
        },
        settings: {
          autoSave: false,
          autoSaveInterval: 0,
        },
      };

      if (Object.keys(charactersToSave).length > 0) {
        SaveManager.saveGame(
          defaultGameState,
          charactersToSave,
          'Character Creation Save'
        );
      }
    },
    []
  );

  const createCharacter = useCallback(
    (slotId: number, characterData: any) => {
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
        lastLogin: new Date().toISOString(),
      };

      setCharacters(prev => {
        const updated = {
          ...prev,
          [slotId]: newCharacter,
        };

        // Speichere die Charaktere direkt nach dem Update
        saveCharacters(updated);

        return updated;
      });

      // Set as current character
      setCurrentCharacter(newCharacter);
    },
    [getClassBaseStats, setCurrentCharacter, saveCharacters]
  );

  const handleSlotClick = useCallback(
    (slotId: number) => {
      if (characters[slotId]) {
        // Wenn bereits ein Charakter vorhanden ist, zum Spiel weiterleiten
        navigate('/');
      } else {
        // Zur Character Creation für diesen Slot weiterleiten
        navigate(`/character-creation/${slotId}`);
      }
    },
    [characters, navigate]
  );

  const handleBackToSelection = useCallback(() => {
    navigate('/character-selection');
  }, [navigate]);

  const handleCreateForSlot = useCallback(() => {
    if (slotId) {
      setCurrentView('create');
    }
  }, [slotId]);

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
            <button
              className={styles.backButton}
              onClick={handleBackToSelection}
            >
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

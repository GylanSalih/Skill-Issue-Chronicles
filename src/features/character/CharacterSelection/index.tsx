import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterSlot from './CharacterSlot';
import SaveLoadManager from '../../../shared/components/SaveLoadManager/SaveLoadManager';
import { SaveManager } from '../../../core/services/saveManager';
import { useCharacter } from '../../../core/contexts/GameContext';
import styles from './CharacterSelection.module.scss';

const CharacterSelection = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Record<number, any>>({});
  const [activeCharacter, setActiveCharacter] = useState<any>(null);
  const { setCurrentCharacter } = useCharacter();

  const getClassIcon = (characterClass: string) => {
  const iconMap: Record<string, string> = {
    'warrior': '/img/avatars/warrior.png',
    'mage': '/img/avatars/magier.png',
    'rogue': '/img/avatars/schurke2.png',
    'archer': '/img/avatars/elfe.png',
    'healer': '/img/avatars/heilerin.png',
    'berserker': '/img/avatars/berserk.png',
    'paladin': '/img/avatars/paladin.png',
    'assassin': '/img/avatars/assassine2.png',
    'tinkerer': '/img/avatars/tuefftler.png',
    'elementalist': '/img/avatars/elementarist.png'
  };
  return iconMap[characterClass] || '/img/avatars/warrior.png';
  };

  // Lade Charaktere beim Mount
  useEffect(() => {
    loadCharacters();
  }, []);

  // Funktion zum Laden der Charaktere aus beiden Quellen
  const loadCharacters = () => {
    // Lade zuerst aus dem alten Format
    const savedCharacters = localStorage.getItem('idleGameCharacters');
    let charactersFromOldFormat: Record<number, any> = {};
    
    if (savedCharacters) {
      try {
        charactersFromOldFormat = JSON.parse(savedCharacters);
      } catch (error) {
        console.error('Error parsing old character format:', error);
      }
    }

    // Lade dann aus dem neuen SaveManager Format
    const saveData = SaveManager.loadGame();
    let charactersFromSaveManager: Record<number, any> = {};
    
    if (saveData && saveData.characters) {
      charactersFromSaveManager = saveData.characters;
    }

    // Merge beide Quellen (SaveManager hat Priorität)
    const mergedCharacters = {
      ...charactersFromOldFormat,
      ...charactersFromSaveManager
    };

    console.log('Character Selection - Loading characters:', {
      fromOldFormat: charactersFromOldFormat,
      fromSaveManager: charactersFromSaveManager,
      merged: mergedCharacters
    });

    setCharacters(mergedCharacters);
  };

  const handleSlotClick = (slotId: number) => {
    if (characters[slotId]) {
      // Charakter existiert - setze als aktiven Charakter
      console.log('Setting active character from slot:', slotId, characters[slotId]);
      setActiveCharacter(characters[slotId]);
    } else {
      // Kein Charakter - direkt zur Character Creation für diesen Slot weiterleiten
      navigate(`/character-creation/${slotId}`);
    }
  };

  const handleStartGame = () => {
    // Starte das Spiel mit dem aktiven Charakter
    if (activeCharacter) {
      console.log('Starting game with active character:', activeCharacter);
      setCurrentCharacter(activeCharacter);
      navigate('/');
    } else {
      // Falls kein aktiver Charakter, nimm den ersten verfügbaren
      const firstCharacter = Object.values(characters).find(char => char);
      if (firstCharacter) {
        console.log('Starting game with first available character:', firstCharacter);
        setCurrentCharacter(firstCharacter);
        navigate('/');
      }
    }
  };

  const handleCreateNewCharacter = () => {
    // Finde den ersten leeren Slot
    const emptySlot = Array.from({ length: 6 }, (_, index) => index + 1)
      .find(slotId => !characters[slotId]);
    
    if (emptySlot) {
      navigate(`/character-creation/${emptySlot}`);
    } else {
      // Alle Slots belegt - zum ersten Slot gehen
      navigate('/character-creation/1');
    }
  };

  // Lade Charaktere neu nach Save/Load
  const handleSaveLoaded = () => {
    loadCharacters();
  };


  return (
    <div className={styles.characterSelectionPage}>
      {/* Active Character Panel - Links */}
      {activeCharacter && (
        <div className={styles.activeCharacterPanel}>
          <div className={styles.activeCharacterHeader}>
            <div className={styles.headerContent}>
              <h3>Character Details</h3>
              <p>View detailed information about your selected character</p>
            </div>
          </div>
          <div className={styles.activeCharacterContent}>
            <div className={styles.activeCharacterBasicInfo}>
              <img 
                src={getClassIcon(activeCharacter.characterClassId)}
                alt={activeCharacter.name}
                className={styles.activeCharacterImage}
                onError={(e) => {
                  e.currentTarget.src = '/img/avatars/warrior.png';
                }}
              />
              <div className={styles.activeCharacterInfo}>
                <h4>{activeCharacter.name}</h4>
                <p className={styles.activeCharacterClass}>
                  {activeCharacter.characterClassId.charAt(0).toUpperCase() + activeCharacter.characterClassId.slice(1)}
                </p>
                <p className={styles.activeCharacterLevel}>Level {activeCharacter.level}</p>
                <p className={styles.activeCharacterGender}>
                  {activeCharacter.gender === 'male' ? 'Männlich' : activeCharacter.gender === 'female' ? 'Weiblich' : activeCharacter.gender}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className={styles.activeCharacterStats}>
              <h5>Stats</h5>
              <div className={styles.activeStatsGrid}>
                <div className={styles.activeStatItem}>
                  <span>Strength:</span>
                  <span>{activeCharacter.stats.strength}</span>
                </div>
                <div className={styles.activeStatItem}>
                  <span>Agility:</span>
                  <span>{activeCharacter.stats.agility}</span>
                </div>
                <div className={styles.activeStatItem}>
                  <span>Intelligence:</span>
                  <span>{activeCharacter.stats.intelligence}</span>
                </div>
                <div className={styles.activeStatItem}>
                  <span>Vitality:</span>
                  <span>{activeCharacter.stats.vitality}</span>
                </div>
                <div className={styles.activeStatItem}>
                  <span>Luck:</span>
                  <span>{activeCharacter.stats.luck}</span>
                </div>
                <div className={styles.activeStatItem}>
                  <span>Available Points:</span>
                  <span>{activeCharacter.availableStatPoints}</span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className={styles.activeCharacterExperience}>
              <h5>Experience</h5>
              <div className={styles.activeExperienceBar}>
                <div className={styles.activeExperienceProgress}>
                  <div 
                    className={styles.activeExperienceFill}
                    style={{ width: `${(activeCharacter.experience / activeCharacter.maxExperience) * 100}%` }}
                  ></div>
                </div>
                <span className={styles.activeExperienceText}>
                  {activeCharacter.experience} / {activeCharacter.maxExperience} XP
                </span>
              </div>
            </div>

            {/* Meta Info */}
            <div className={styles.activeCharacterMeta}>
              <div className={styles.activeMetaItem}>
                <span>Created:</span>
                <span>{new Date(activeCharacter.createdAt).toLocaleDateString('de-DE')}</span>
              </div>
              <div className={styles.activeMetaItem}>
                <span>Slot:</span>
                <span>Slot {activeCharacter.slotId}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.characterGrid}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Character Selection</h1>
            <p>Choose your character or create a new one to start your adventure</p>
          </div>
        </div>

        <div className={styles.characterSlotsGrid}>
          {Array.from({ length: 6 }, (_, index) => (
            <CharacterSlot
              key={index + 1}
              slotId={index + 1}
              character={characters[index + 1]}
              isActive={activeCharacter && activeCharacter.slotId === index + 1}
              onClick={() => handleSlotClick(index + 1)}
              onPlay={handleStartGame}
            />
          ))}
        </div>

        <div className={styles.actions}>
          <div className={styles.topActions}>
            <SaveLoadManager onSaveLoaded={handleSaveLoaded} />
            <button 
              className={styles.createNewButton}
              onClick={handleCreateNewCharacter}
            >
              Create New Character
            </button>
          </div>
          
          {activeCharacter && (
            <button 
              className={styles.startGameButton}
              onClick={handleStartGame}
            >
              Start Game with {activeCharacter.name}
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default CharacterSelection;


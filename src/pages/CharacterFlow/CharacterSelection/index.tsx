import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown } from 'lucide-react';
import CharacterSlot from './CharacterSlot';
import styles from './CharacterSelection.module.scss';

const CharacterSelection = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Record<number, any>>({});

  // Lade Charaktere beim Mount
  useEffect(() => {

    const savedCharacters = localStorage.getItem('idleGameCharacters');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    }
  }, []);

  const handleSlotClick = (slotId: number) => {
    if (characters[slotId]) {
      // Charakter existiert - zum Spiel weiterleiten
      navigate('/');
    } else {
      // Kein Charakter - direkt zur Character Creation für diesen Slot weiterleiten
      navigate(`/character-creation/${slotId}`);
    }
  };

  const handleStartGame = () => {
    // Finde den ersten belegten Slot und starte das Spiel
    const occupiedSlot = Object.keys(characters).find(slotId => characters[parseInt(slotId)]);
    if (occupiedSlot) {
      navigate('/');
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

  return (
    <div className={styles.characterSelectionPage}>
      <div className={styles.characterGrid}>
        <div className={styles.header}>
          <Crown className={styles.headerIcon} size={32} />
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
              onClick={() => handleSlotClick(index + 1)}
            />
          ))}
        </div>

        <div className={styles.actions}>
          <button 
            className={styles.createNewButton}
            onClick={handleCreateNewCharacter}
          >
            Create New Character
          </button>
          
          {Object.keys(characters).length > 0 && (
            <button 
              className={styles.startGameButton}
              onClick={handleStartGame}
            >
              Start Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterSelection;


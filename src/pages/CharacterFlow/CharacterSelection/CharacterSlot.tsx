import React from 'react';
import styles from './CharacterSlot.module.scss';

interface Character {
  playerName: string;
  characterClass: string;
  gender: string;
  level: number;
  createdAt: string;
}

interface CharacterSlotProps {
  slotId: number;
  character: Character | null;
  onClick: () => void;
}

const CharacterSlot: React.FC<CharacterSlotProps> = ({ slotId, character, onClick }) => {
  const getClassIcon = (characterClass: string) => {
    const iconMap = {
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
    return iconMap[characterClass] || '/assets/img/avatars/warrior.png';
  };

  const getClassDisplayName = (characterClass: string) => {
    const names = {
      warrior: 'Krieger',
      mage: 'Magier',
      rogue: 'Schurke',
      archer: 'Bogenschütze',
      healer: 'Heiler',
      berserker: 'Berserker',
      paladin: 'Paladin',
      assassin: 'Assassine',
      tinkerer: 'Tüftler',
      elementalist: 'Elementarist'
    };
    return names[characterClass] || characterClass;
  };

  return (
    <div 
      className={`${styles.characterSlot} ${character ? styles.occupied : styles.empty}`}
      onClick={onClick}
    >
      <div className={styles.slotHeader}>
        <span className={styles.slotNumber}>Slot {slotId}</span>
      </div>

      <div className={styles.slotContent}>
        {character ? (
          <>
            <div className={styles.characterAvatar}>
              <img 
                src={getClassIcon(character.characterClass)} 
                alt={character.playerName}
                className={styles.characterImage}
                onError={(e) => {
                  e.currentTarget.src = '/assets/img/avatars/warrior.png';
                }}
              />
            </div>
            
            <div className={styles.characterInfo}>
              <h3 className={styles.characterName}>{character.playerName}</h3>
              <p className={styles.characterClass}>
                {getClassDisplayName(character.characterClass)}
              </p>
              <div className={styles.characterStats}>
                <span className={styles.level}>Level {character.level}</span>
                <span className={styles.gender}>
                  {character.gender === 'male' ? 'Männlich' : 'Weiblich'}
                </span>
                <span className={styles.createdAt}>
                  {new Date(character.createdAt).toLocaleDateString('de-DE')}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.emptySlot}>
            <div className={styles.createIcon}>+</div>
            <p>Neuen Charakter erstellen</p>
          </div>
        )}
      </div>

      <div className={styles.slotFooter}>
        {character ? (
          <button className={styles.playButton}>Spielen</button>
        ) : (
          <button className={styles.createButton}>Erstellen</button>
        )}
      </div>
    </div>
  );
};

export default CharacterSlot;

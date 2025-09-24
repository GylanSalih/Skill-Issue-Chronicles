import React from 'react';
import { Character } from '../../../../core/contexts/GameContext';
import { formatDate } from '../../../../core/services/dateUtils';
import styles from './CharacterSlot.module.scss';

// Import avatar images
import warriorImg from '@assets/img/avatars/warrior.png';
import magierImg from '@assets/img/avatars/magier.png';
import schurke2Img from '@assets/img/avatars/schurke2.png';
import elfeImg from '@assets/img/avatars/elfe.png';
import heilerinImg from '@assets/img/avatars/heilerin.png';
import berserkImg from '@assets/img/avatars/berserk.png';
import paladinImg from '@assets/img/avatars/paladin.png';
import assassine2Img from '@assets/img/avatars/assassine2.png';
import tuefftlerImg from '@assets/img/avatars/tuefftler.png';
import elementaristImg from '@assets/img/avatars/elementarist.png';

interface CharacterSlotProps {
  slotId: number;
  character: Character | null;
  isActive?: boolean;
  onClick: () => void;
  onPlay?: () => void;
}

const CharacterSlot: React.FC<CharacterSlotProps> = ({
  slotId,
  character,
  isActive = false,
  onClick,
  onPlay,
}) => {
  const getClassIcon = (characterClass: string) => {
    const iconMap: Record<string, string> = {
      warrior: warriorImg,
      mage: magierImg,
      rogue: schurke2Img,
      archer: elfeImg,
      healer: heilerinImg,
      berserker: berserkImg,
      paladin: paladinImg,
      assassin: assassine2Img,
      tinkerer: tuefftlerImg,
      elementalist: elementaristImg,
    };
    return iconMap[characterClass] || warriorImg;
  };

  const getClassDisplayName = (characterClass: string) => {
    const names: Record<string, string> = {
      warrior: 'Krieger',
      mage: 'Magier',
      rogue: 'Schurke',
      archer: 'Bogenschütze',
      healer: 'Heiler',
      berserker: 'Berserker',
      paladin: 'Paladin',
      assassin: 'Assassine',
      tinkerer: 'Tüftler',
      elementalist: 'Elementarist',
    };
    return names[characterClass] || characterClass;
  };

  return (
    <div
      className={`${styles.characterSlot} ${character ? styles.occupied : styles.empty} ${isActive ? styles.active : ''}`}
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
                src={getClassIcon(character.characterClassId)}
                alt={character.name}
                className={styles.characterImage}
                onError={e => {
                  e.currentTarget.src = warriorImg;
                }}
              />
            </div>

            <div className={styles.characterInfo}>
              <h3 className={styles.characterName}>{character.name}</h3>
              <p className={styles.characterClass}>
                {getClassDisplayName(character.characterClassId)}
              </p>
              <div className={styles.characterStats}>
                <span className={styles.level}>Level {character.level}</span>
                <span className={styles.gender}>
                  {character.gender === 'male'
                    ? 'Männlich'
                    : character.gender === 'female'
                      ? 'Weiblich'
                      : character.gender}
                </span>
                <span className={styles.createdAt}>
                  {formatDate(character.createdAt)}
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
          isActive ? (
            <button className={styles.playButton} onClick={onPlay}>
              Spielen
            </button>
          ) : null
        ) : (
          <button className={styles.createButton}>Erstellen</button>
        )}
      </div>
    </div>
  );
};

export default CharacterSlot;

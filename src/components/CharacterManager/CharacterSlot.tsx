// components/CharacterSlot.js
import styles from './CharacterManager.module.scss';

const CharacterSlot = ({ slotId, character, onClick }) => {
  const getClassIcon = (characterClass) => {
    const icons = {
      warrior: '⚔️',
      mage: '🔮',
      rogue: '🗡️',
      archer: '🏹',
      healer: '✚',
      berserker: '🪓',
      paladin: '🛡️',
      assassin: '🗡️',
      tinkerer: '🔧',
      elementalist: '⚡'
    };
    return icons[characterClass] || '❓';
  };

  const getClassDisplayName = (characterClass) => {
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

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Heute';
    if (diffDays === 2) return 'Gestern';
    if (diffDays <= 7) return `vor ${diffDays} Tagen`;
    return date.toLocaleDateString('de-DE');
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
              <span className={styles.classIcon}>
                {getClassIcon(character.characterClass)}
              </span>
              {character.gender && (
                <span className={styles.genderIndicator}>
                  {character.gender === 'male' ? '♂' : '♀'}
                </span>
              )}
            </div>
            
            <div className={styles.characterInfo}>
              <h3 className={styles.characterName}>{character.playerName}</h3>
              <p className={styles.characterClass}>
                {getClassDisplayName(character.characterClass)}
              </p>
              <div className={styles.characterStats}>
                <span className={styles.level}>Level {character.level}</span>
                <span className={styles.lastLogin}>
                  {formatLastLogin(character.lastLogin)}
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
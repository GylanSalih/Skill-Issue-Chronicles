// components/CharacterSlot.js
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
      className={`character-slot ${character ? 'occupied' : 'empty'}`}
      onClick={onClick}
    >
      <div className="slot-header">
        <span className="slot-number">Slot {slotId}</span>
      </div>

      <div className="slot-content">
        {character ? (
          <>
            <div className="character-avatar">
              <span className="class-icon">
                {getClassIcon(character.characterClass)}
              </span>
              {character.gender && (
                <span className="gender-indicator">
                  {character.gender === 'male' ? '♂' : '♀'}
                </span>
              )}
            </div>
            
            <div className="character-info">
              <h3 className="character-name">{character.playerName}</h3>
              <p className="character-class">
                {getClassDisplayName(character.characterClass)}
              </p>
              <div className="character-stats">
                <span className="level">Level {character.level}</span>
                <span className="last-login">
                  {formatLastLogin(character.lastLogin)}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-slot">
            <div className="create-icon">+</div>
            <p>Neuen Charakter erstellen</p>
          </div>
        )}
      </div>

      <div className="slot-footer">
        {character ? (
          <button className="play-button">Spielen</button>
        ) : (
          <button className="create-button">Erstellen</button>
        )}
      </div>
    </div>
  );
};

export default CharacterSlot;
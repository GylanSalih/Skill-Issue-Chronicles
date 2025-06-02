// components/CharacterDetails.js
import { useState } from 'react';

const CharacterDetails = ({ character, onBack, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatName = (stat) => {
    const names = {
      strength: 'Stärke',
      agility: 'Geschicklichkeit',
      intelligence: 'Intelligenz',
      vitality: 'Vitalität',
      luck: 'Glück'
    };
    return names[stat] || stat;
  };

  const calculateTotalStats = () => {
    return Object.values(character.stats).reduce((sum, value) => sum + value, 0);
  };

  const handleDeleteConfirm = () => {
    onDelete();
  };

  return (
    <div className="character-details">
      <div className="details-header">
        <button className="back-button" onClick={onBack}>
          ← Zurück zur Übersicht
        </button>
        <h1>Charakter-Details</h1>
      </div>

      <div className="character-card">
        {/* Charakter-Header */}
        <div className="character-header-section">
          <div className="character-avatar-large">
            <span className="class-icon-large">
              {getClassIcon(character.characterClass)}
            </span>
            {character.gender && (
              <span className="gender-indicator-large">
                {character.gender === 'male' ? '♂' : '♀'}
              </span>
            )}
          </div>
          
          <div className="character-main-info">
            <h2>{character.playerName}</h2>
            <p className="character-class-title">
              {getClassDisplayName(character.characterClass)}
            </p>
            <div className="level-info">
              <span className="level-badge">Level {character.level}</span>
              <span className="experience">EXP: {character.experience}</span>
            </div>
          </div>
        </div>

        {/* Statistiken */}
        <div className="stats-section">
          <h3>Attribute</h3>
          <div className="stats-grid">
            {Object.entries(character.stats).map(([stat, value]) => (
              <div key={stat} className="stat-item">
                <span className="stat-name">{getStatName(stat)}</span>
                <span className="stat-value">{value}</span>
              </div>
            ))}
          </div>
          <div className="stats-summary">
            <p>Gesamte Attributpunkte: {calculateTotalStats()}</p>
            {character.availableStatPoints > 0 && (
              <p>Verfügbare Punkte: {character.availableStatPoints}</p>
            )}
          </div>
        </div>

        {/* Metadaten */}
        <div className="metadata-section">
          <h3>Spielinformationen</h3>
          <div className="metadata-grid">
            <div className="metadata-item">
              <span className="metadata-label">Slot:</span>
              <span className="metadata-value">{character.slotId}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Erstellt am:</span>
              <span className="metadata-value">{formatDate(character.createdAt)}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Letzter Login:</span>
              <span className="metadata-value">{formatDate(character.lastLogin)}</span>
            </div>
            {character.gender && (
              <div className="metadata-item">
                <span className="metadata-label">Geschlecht:</span>
                <span className="metadata-value">
                  {character.gender === 'male' ? 'Männlich' : 'Weiblich'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Aktionen */}
        <div className="character-actions">
          <button className="play-button-large">
            🎮 Spiel starten
          </button>
          <button 
            className="delete-button"
            onClick={() => setShowDeleteConfirm(true)}
          >
            🗑️ Charakter löschen
          </button>
        </div>
      </div>

      {/* Löschbestätigung */}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-modal">
            <h3>Charakter löschen?</h3>
            <p>
              Möchtest du <strong>{character.playerName}</strong> wirklich löschen? 
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="confirm-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Abbrechen
              </button>
              <button 
                className="confirm-delete-button"
                onClick={handleDeleteConfirm}
              >
                Ja, löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetails;
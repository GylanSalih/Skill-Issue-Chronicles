// components/CharacterCreator.js
import { useState } from 'react';

const CharacterCreator = ({ slotId, onCreateCharacter, onBack }) => {
  const [formData, setFormData] = useState({
    playerName: '',
    characterClass: '',
    gender: ''
  });
  const [errors, setErrors] = useState({});

  const characterClasses = [
    { id: 'warrior', name: 'Krieger', icon: '⚔️', description: 'Starker Nahkämpfer mit hoher Verteidigung' },
    { id: 'mage', name: 'Magier', icon: '🔮', description: 'Mächtiger Zauberer mit Fernkampf-Magie' },
    { id: 'rogue', name: 'Schurke', icon: '🗡️', description: 'Schneller Kämpfer mit kritischen Treffern' },
    { id: 'archer', name: 'Bogenschütze', icon: '🏹', description: 'Präziser Fernkämpfer mit hoher Trefferquote' },
    { id: 'healer', name: 'Heiler', icon: '✚', description: 'Unterstützer mit Heilfähigkeiten' },
    { id: 'berserker', name: 'Berserker', icon: '🪓', description: 'Brutaler Kämpfer mit enormem Schaden' },
    { id: 'paladin', name: 'Paladin', icon: '🛡️', description: 'Ausgewogener Kämpfer mit Heilung' },
    { id: 'assassin', name: 'Assassine', icon: '🗡️', description: 'Heimlicher Kämpfer mit Stealth-Fähigkeiten' },
    { id: 'tinkerer', name: 'Tüftler', icon: '🔧', description: 'Handwerker mit technischen Fähigkeiten' },
    { id: 'elementalist', name: 'Elementarist', icon: '⚡', description: 'Meister der Elementar-Magie' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Fehler löschen wenn Feld ausgefüllt wird
    if (errors[field] && value) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Spielername validieren
    if (!formData.playerName.trim()) {
      newErrors.playerName = 'Spielername ist erforderlich';
    } else if (formData.playerName.length < 3) {
      newErrors.playerName = 'Spielername muss mindestens 3 Zeichen lang sein';
    } else if (formData.playerName.length > 20) {
      newErrors.playerName = 'Spielername darf maximal 20 Zeichen lang sein';
    } else if (!/^[a-zA-Z0-9äöüÄÖÜß_-]+$/.test(formData.playerName)) {
      newErrors.playerName = 'Spielername darf nur Buchstaben, Zahlen, Unterstriche und Bindestriche enthalten';
    }

    // Klasse validieren
    if (!formData.characterClass) {
      newErrors.characterClass = 'Bitte wähle eine Klasse aus';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onCreateCharacter(slotId, formData);
    }
  };

  return (
    <div className="character-creator">
      <div className="creator-header">
        <button className="back-button" onClick={onBack}>
          ← Zurück zur Übersicht
        </button>
        <h1>Neuen Charakter erstellen</h1>
        <p>Slot {slotId}</p>
      </div>

      <form onSubmit={handleSubmit} className="creator-form">
        {/* Spielername */}
        <div className="form-section">
          <h2>Grundinformationen</h2>
          
          <div className="form-group">
            <label htmlFor="playerName">Spielername *</label>
            <input
              type="text"
              id="playerName"
              value={formData.playerName}
              onChange={(e) => handleInputChange('playerName', e.target.value)}
              placeholder="Gib deinen Charakternamen ein..."
              maxLength="20"
              className={errors.playerName ? 'error' : ''}
            />
            {errors.playerName && (
              <span className="error-message">{errors.playerName}</span>
            )}
            <small>3-20 Zeichen, nur Buchstaben, Zahlen, _ und -</small>
          </div>

          <div className="form-group">
            <label>Geschlecht (optional)</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                />
                <span className="radio-custom">♂ Männlich</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                />
                <span className="radio-custom">♀ Weiblich</span>
              </label>
            </div>
          </div>
        </div>

        {/* Klassenauswahl */}
        <div className="form-section">
          <h2>Klasse auswählen *</h2>
          {errors.characterClass && (
            <span className="error-message">{errors.characterClass}</span>
          )}
          
          <div className="class-grid">
            {characterClasses.map((charClass) => (
              <div
                key={charClass.id}
                className={`class-option ${formData.characterClass === charClass.id ? 'selected' : ''}`}
                onClick={() => handleInputChange('characterClass', charClass.id)}
              >
                <div className="class-icon">{charClass.icon}</div>
                <h3>{charClass.name}</h3>
                <p>{charClass.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="button" onClick={onBack} className="cancel-button">
            Abbrechen
          </button>
          <button type="submit" className="create-button">
            Charakter erstellen
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterCreator;
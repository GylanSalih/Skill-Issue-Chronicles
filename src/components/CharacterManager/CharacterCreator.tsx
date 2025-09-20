// components/CharacterCreator.js
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from './CharacterCreator.module.scss';

interface CharacterCreatorProps {
  slotId: number;
  onCreateCharacter: (slotId: number, characterData: any) => void;
  onBack: () => void;
}

interface FormData {
  playerName: string;
  characterClass: string;
  gender: string;
}

interface Errors {
  playerName?: string;
  characterClass?: string;
  gender?: string;
}

const CharacterCreator: React.FC<CharacterCreatorProps> = ({ slotId, onCreateCharacter, onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    playerName: '',
    characterClass: '',
    gender: ''
  });
  const [errors, setErrors] = useState<Errors>({});

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

  const handleInputChange = (field: keyof FormData, value: string) => {
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
    const newErrors: Errors = {};

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onCreateCharacter(slotId, formData);
    }
  };

  return (
    <div className={styles.characterCreator}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={16} />
          Zurück zur Übersicht
        </button>
        <div className={styles.headerContent}>
          <h1>Character Creation</h1>
          <p>Create a new character for slot {slotId}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.creatorForm}>
        {/* Spielername */}
        <div className={styles.formSection}>
          <h2>Basic Information</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="playerName">Character Name *</label>
            <input
              type="text"
              id="playerName"
              value={formData.playerName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('playerName', e.target.value)}
              placeholder="Enter your character name..."
              maxLength={20}
              className={errors.playerName ? styles.error : ''}
            />
            {errors.playerName && (
              <span className={styles.errorMessage}>{errors.playerName}</span>
            )}
            <small>3-20 characters, letters, numbers, _ and - only</small>
          </div>

          <div className={styles.formGroup}>
            <label>Gender (optional)</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('gender', e.target.value)}
                />
                <span className={styles.radioCustom}>♂ Male</span>
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('gender', e.target.value)}
                />
                <span className={styles.radioCustom}>♀ Female</span>
              </label>
            </div>
          </div>
        </div>

        {/* Klassenauswahl */}
        <div className={styles.formSection}>
          <h2>Choose Class *</h2>
          {errors.characterClass && (
            <span className={styles.errorMessage}>{errors.characterClass}</span>
          )}
          
          <div className={styles.classGrid}>
            {characterClasses.map((charClass) => (
              <div
                key={charClass.id}
                className={`${styles.classOption} ${formData.characterClass === charClass.id ? styles.selected : ''}`}
                onClick={() => handleInputChange('characterClass', charClass.id)}
              >
                <div className={styles.classIcon}>{charClass.icon}</div>
                <h3>{charClass.name}</h3>
                <p>{charClass.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className={styles.formActions}>
          <button type="button" onClick={onBack} className={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={styles.createButton}>
            Create Character
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterCreator;
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  useCharacterClasses,
  useCharacterStats,
} from '../../../../core/contexts/GameContext';
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

const CharacterCreator: React.FC<CharacterCreatorProps> = ({
  slotId,
  onCreateCharacter,
  onBack,
}) => {
  const [formData, setFormData] = useState<FormData>({
    playerName: '',
    characterClass: '',
    gender: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [characterCreated, setCharacterCreated] = useState(false);

  // Use global context for character classes and stats
  const { getAllClasses } = useCharacterClasses();
  const { getClassStats } = useCharacterStats();
  const characterClasses = getAllClasses();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Fehler löschen wenn Feld ausgefüllt wird
    if (errors[field] && value) {
      setErrors(prev => ({
        ...prev,
        [field]: null,
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
      newErrors.playerName =
        'Spielername darf nur Buchstaben, Zahlen, Unterstriche und Bindestriche enthalten';
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
      setCharacterCreated(true);
    }
  };

  return (
    <div className={styles.characterCreatorPage}>
      <div className={styles.characterCreator}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onBack}>
            <ArrowLeft size={20} />
            Back
          </button>
          <h1>Character Creation</h1>
        </div>

        <div className={styles.content}>
          {/* Linke Seite - Klassenauswahl */}
          <div className={styles.classesSection}>
            <h2>Choose Class *</h2>
            {errors.characterClass && (
              <span className={styles.errorMessage}>
                {errors.characterClass}
              </span>
            )}

            <div className={styles.classesGrid}>
              {characterClasses.map(charClass => (
                <div
                  key={charClass.id}
                  className={`${styles.classCard} ${formData.characterClass === charClass.id ? styles.selected : ''}`}
                  onClick={() =>
                    handleInputChange('characterClass', charClass.id)
                  }
                >
                  <div
                    className={styles.classImage}
                    style={{
                      backgroundImage: `url(${charClass.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                  <div className={styles.className}>{charClass.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rechte Seite - Charakter Details */}
          <div className={styles.detailsSection}>
            {formData.characterClass ? (
              <>
                <div className={styles.characterPreview}>
                  {(() => {
                    const selectedClass = characterClasses.find(
                      c => c.id === formData.characterClass
                    );
                    const stats = getClassStats(formData.characterClass);
                    if (!selectedClass) return null;

                    return (
                      <>
                        <div className={styles.attributesLeft}>
                          <div className={styles.attributeItem}>
                            <div className={styles.attributeLabel}>Attack</div>
                            <div className={styles.attributeBar}>
                              <div
                                className={styles.attributeFill}
                                style={{ width: `${stats.attack}%` }}
                              ></div>
                            </div>
                            <div className={styles.attributeValue}>
                              {stats.attack}
                            </div>
                          </div>
                          <div className={styles.attributeItem}>
                            <div className={styles.attributeLabel}>Defense</div>
                            <div className={styles.attributeBar}>
                              <div
                                className={styles.attributeFill}
                                style={{ width: `${stats.defense}%` }}
                              ></div>
                            </div>
                            <div className={styles.attributeValue}>
                              {stats.defense}
                            </div>
                          </div>
                          <div className={styles.attributeItem}>
                            <div className={styles.attributeLabel}>Magic</div>
                            <div className={styles.attributeBar}>
                              <div
                                className={styles.attributeFill}
                                style={{ width: `${stats.magic}%` }}
                              ></div>
                            </div>
                            <div className={styles.attributeValue}>
                              {stats.magic}
                            </div>
                          </div>
                        </div>

                        <div className={styles.characterImage}>
                          <img
                            src={selectedClass.image}
                            alt='Selected Character'
                            className={styles.previewImage}
                          />
                        </div>

                        <div className={styles.attributesRight}>
                          <div className={styles.attributeItem}>
                            <div className={styles.attributeLabel}>Speed</div>
                            <div className={styles.attributeBar}>
                              <div
                                className={styles.attributeFill}
                                style={{ width: `${stats.speed}%` }}
                              ></div>
                            </div>
                            <div className={styles.attributeValue}>
                              {stats.speed}
                            </div>
                          </div>
                          <div className={styles.attributeItem}>
                            <div className={styles.attributeLabel}>Health</div>
                            <div className={styles.attributeBar}>
                              <div
                                className={styles.attributeFill}
                                style={{ width: `${stats.health}%` }}
                              ></div>
                            </div>
                            <div className={styles.attributeValue}>
                              {stats.health}
                            </div>
                          </div>
                          <div className={styles.attributeItem}>
                            <div className={styles.attributeLabel}>Mana</div>
                            <div className={styles.attributeBar}>
                              <div
                                className={styles.attributeFill}
                                style={{ width: `${stats.mana}%` }}
                              ></div>
                            </div>
                            <div className={styles.attributeValue}>
                              {stats.mana}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className={styles.characterInfo}>
                  <h3>
                    {
                      characterClasses.find(
                        c => c.id === formData.characterClass
                      )?.name
                    }
                  </h3>
                  <p>
                    {
                      characterClasses.find(
                        c => c.id === formData.characterClass
                      )?.description
                    }
                  </p>
                </div>
              </>
            ) : (
              <div className={styles.noSelection}>
                <h3>Select a Class</h3>
                <p>
                  Choose a character class from the left to see details here.
                </p>
              </div>
            )}

            {/* Erfolgsmeldung */}
            {characterCreated && (
              <div className={styles.successMessage}>
                <h3>Character erfolgreich erstellt!</h3>
                <p>
                  Dein Charakter "{formData.playerName}" wurde erstellt und ist
                  bereit zum Spielen.
                </p>
                <button
                  type='button'
                  className={styles.playButton}
                  onClick={() => (window.location.href = '/')}
                >
                  Jetzt spielen
                </button>
              </div>
            )}

            {/* Formular unten */}
            {!characterCreated && (
              <form onSubmit={handleSubmit} className={styles.characterForm}>
                <div className={styles.formGroup}>
                  <label htmlFor='playerName'>Character Name *</label>
                  <input
                    type='text'
                    id='playerName'
                    value={formData.playerName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('playerName', e.target.value)
                    }
                    placeholder='Enter your character name...'
                    maxLength={20}
                    className={errors.playerName ? styles.error : ''}
                  />
                  {errors.playerName && (
                    <span className={styles.errorMessage}>
                      {errors.playerName}
                    </span>
                  )}
                  <small>3-20 characters, letters, numbers, _ and - only</small>
                </div>

                <div className={styles.formGroup}>
                  <label>Gender (optional)</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioOption}>
                      <input
                        type='radio'
                        name='gender'
                        value='male'
                        checked={formData.gender === 'male'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange('gender', e.target.value)
                        }
                      />
                      <span className={styles.radioCustom}>♂ Male</span>
                    </label>
                    <label className={styles.radioOption}>
                      <input
                        type='radio'
                        name='gender'
                        value='female'
                        checked={formData.gender === 'female'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange('gender', e.target.value)
                        }
                      />
                      <span className={styles.radioCustom}>♀ Female</span>
                    </label>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type='button'
                    onClick={onBack}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                  <button type='submit' className={styles.createButton}>
                    Create Character
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCreator;

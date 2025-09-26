import { Minus, Plus } from 'lucide-react';
import React from 'react';
import {
  useCharacter,
  useCharacterClasses,
  useStatAllocation,
} from '../../../../core/contexts/GameContext';
// import { useActivityManager } from '../../../../core/contexts/ActivityManager';
import { formatDate } from '../../../../core/services/dateUtils';
import styles from './ProfileTab.module.scss';

// Import avatar images
import warriorImg from '@assets/img/avatars/warrior.png';

function ProfileTab() {
  const { currentCharacter } = useCharacter();
  const { getClassById } = useCharacterClasses();
  const {
    allocateStatPoint,
    resetStatAllocation,
    getPendingStatChanges,
    applyStatChanges,
  } = useStatAllocation();
  // const { getSkillLevel, getAllSkills } = useActivityManager();

  // Use current character or fallback to default - memoized to prevent re-renders
  const character = React.useMemo(() => {
    return (
      currentCharacter || {
        name: 'Kein Charakter',
        gender: 'Unbekannt',
        characterClass: 'Unbekannt',
        characterClassId: 'warrior',
        level: 1,
        experience: 0,
        maxExperience: 100,
        stats: {
          strength: 10,
          agility: 10,
          intelligence: 10,
          vitality: 10,
          luck: 10,
        },
        availableStatPoints: 0,
        slotId: 0,
        createdAt: 'Unbekannt',
        lastLogin: 'Unbekannt',
      }
    );
  }, [currentCharacter]);

  // Get class information from context
  const classInfo = getClassById(character.characterClassId);

  const getClassIcon = (characterClassId: string) => {
    const classData = getClassById(characterClassId);
    return classData?.image || warriorImg;
  };

  // Stat allocation functions
  const pendingChanges = getPendingStatChanges();

  const getCurrentStatValue = (statKey: keyof typeof character.stats) => {
    const baseValue = character.stats[statKey];
    const pendingChange = pendingChanges[statKey] || 0;
    return baseValue + pendingChange;
  };

  const getTotalPendingPoints = () => {
    return Object.values(pendingChanges).reduce(
      (sum, change) => sum + change,
      0
    );
  };

  const getRemainingPoints = () => {
    return character.availableStatPoints - getTotalPendingPoints();
  };

  const handleStatChange = (
    statKey: keyof typeof character.stats,
    amount: number
  ) => {
    const success = allocateStatPoint(statKey, amount);
    if (!success) {
      console.log('Cannot allocate stat point');
    }
  };

  const handleApply = () => {
    const success = applyStatChanges();
    if (!success) {
      console.log('Failed to apply stat changes');
    }
  };

  const handleReset = () => {
    resetStatAllocation();
  };

  const hasChanges = Object.values(pendingChanges).some(change => change !== 0);

  return (
    <div className={styles.tabContent}>
      {/* Charakter-Übersicht */}
      <div className={`${styles.section} ${styles.characterOverview}`}>
        <h2>Charakter-Übersicht</h2>
        <div className={styles.characterHeader}>
          <div className={styles.characterImage}>
            <img
              src={getClassIcon(character.characterClassId)}
              alt={character.name}
              className={styles.characterAvatar}
              onError={e => {
                e.currentTarget.src = warriorImg;
              }}
            />
            <div className={styles.levelBadge}>{character.level}</div>
          </div>
          <div className={styles.characterInfo}>
            <p>
              <strong>Name:</strong> {character.name}
            </p>
            <p>
              <strong>Geschlecht:</strong> {character.gender}
            </p>
            <p>
              <strong>Klasse:</strong>{' '}
              {classInfo?.name || character.characterClass}
            </p>
            <p>
              <strong>Level:</strong> {character.level}
            </p>
            <p>
              <strong>Erfahrung:</strong> {character.experience} /{' '}
              {character.maxExperience}
            </p>
          </div>
        </div>
      </div>

      {/* Attribute und Spielinformationen nebeneinander */}
      <div className={styles.attributesAndInfoContainer}>
        {/* Attribute */}
        <div className={`${styles.section} ${styles.attributes}`}>
          <h2>Attribute</h2>

          {/* Verfügbare Punkte Info */}
          {character.availableStatPoints > 0 && (
            <div className={styles.pointsInfo}>
              <span className={styles.availablePoints}>
                Verfügbare Attributpunkte: {getRemainingPoints()}
                {getTotalPendingPoints() > 0 && (
                  <span className={styles.pendingPoints}>
                    (verwendet: {getTotalPendingPoints()})
                  </span>
                )}
              </span>
            </div>
          )}

          {/* Stat Items mit Plus/Minus Buttons */}
          <div className={styles.statItem}>
            <span>Stärke:</span>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>
                {getCurrentStatValue('strength')}
                {pendingChanges.strength && pendingChanges.strength !== 0 && (
                  <span
                    className={`${styles.pendingChange} ${pendingChanges.strength > 0 ? styles.positive : styles.negative}`}
                  >
                    ({pendingChanges.strength > 0 ? '+' : ''}
                    {pendingChanges.strength})
                  </span>
                )}
              </span>
              {character.availableStatPoints > 0 && (
                <div className={styles.statControls}>
                  <button
                    className={`${styles.statButton} ${styles.decreaseButton}`}
                    onClick={() => handleStatChange('strength', -1)}
                    disabled={
                      !pendingChanges.strength || pendingChanges.strength <= 0
                    }
                    title='Verringern'
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    className={`${styles.statButton} ${styles.increaseButton}`}
                    onClick={() => handleStatChange('strength', 1)}
                    disabled={getRemainingPoints() <= 0}
                    title='Erhöhen'
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.statItem}>
            <span>Geschicklichkeit:</span>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>
                {getCurrentStatValue('agility')}
                {pendingChanges.agility && pendingChanges.agility !== 0 && (
                  <span
                    className={`${styles.pendingChange} ${pendingChanges.agility > 0 ? styles.positive : styles.negative}`}
                  >
                    ({pendingChanges.agility > 0 ? '+' : ''}
                    {pendingChanges.agility})
                  </span>
                )}
              </span>
              {character.availableStatPoints > 0 && (
                <div className={styles.statControls}>
                  <button
                    className={`${styles.statButton} ${styles.decreaseButton}`}
                    onClick={() => handleStatChange('agility', -1)}
                    disabled={
                      !pendingChanges.agility || pendingChanges.agility <= 0
                    }
                    title='Verringern'
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    className={`${styles.statButton} ${styles.increaseButton}`}
                    onClick={() => handleStatChange('agility', 1)}
                    disabled={getRemainingPoints() <= 0}
                    title='Erhöhen'
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.statItem}>
            <span>Intelligenz:</span>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>
                {getCurrentStatValue('intelligence')}
                {pendingChanges.intelligence &&
                  pendingChanges.intelligence !== 0 && (
                    <span
                      className={`${styles.pendingChange} ${pendingChanges.intelligence > 0 ? styles.positive : styles.negative}`}
                    >
                      ({pendingChanges.intelligence > 0 ? '+' : ''}
                      {pendingChanges.intelligence})
                    </span>
                  )}
              </span>
              {character.availableStatPoints > 0 && (
                <div className={styles.statControls}>
                  <button
                    className={`${styles.statButton} ${styles.decreaseButton}`}
                    onClick={() => handleStatChange('intelligence', -1)}
                    disabled={
                      !pendingChanges.intelligence ||
                      pendingChanges.intelligence <= 0
                    }
                    title='Verringern'
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    className={`${styles.statButton} ${styles.increaseButton}`}
                    onClick={() => handleStatChange('intelligence', 1)}
                    disabled={getRemainingPoints() <= 0}
                    title='Erhöhen'
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.statItem}>
            <span>Vitalität:</span>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>
                {getCurrentStatValue('vitality')}
                {pendingChanges.vitality && pendingChanges.vitality !== 0 && (
                  <span
                    className={`${styles.pendingChange} ${pendingChanges.vitality > 0 ? styles.positive : styles.negative}`}
                  >
                    ({pendingChanges.vitality > 0 ? '+' : ''}
                    {pendingChanges.vitality})
                  </span>
                )}
              </span>
              {character.availableStatPoints > 0 && (
                <div className={styles.statControls}>
                  <button
                    className={`${styles.statButton} ${styles.decreaseButton}`}
                    onClick={() => handleStatChange('vitality', -1)}
                    disabled={
                      !pendingChanges.vitality || pendingChanges.vitality <= 0
                    }
                    title='Verringern'
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    className={`${styles.statButton} ${styles.increaseButton}`}
                    onClick={() => handleStatChange('vitality', 1)}
                    disabled={getRemainingPoints() <= 0}
                    title='Erhöhen'
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.statItem}>
            <span>Glück:</span>
            <div className={styles.statValueContainer}>
              <span className={styles.statValue}>
                {getCurrentStatValue('luck')}
                {pendingChanges.luck && pendingChanges.luck !== 0 && (
                  <span
                    className={`${styles.pendingChange} ${pendingChanges.luck > 0 ? styles.positive : styles.negative}`}
                  >
                    ({pendingChanges.luck > 0 ? '+' : ''}
                    {pendingChanges.luck})
                  </span>
                )}
              </span>
              {character.availableStatPoints > 0 && (
                <div className={styles.statControls}>
                  <button
                    className={`${styles.statButton} ${styles.decreaseButton}`}
                    onClick={() => handleStatChange('luck', -1)}
                    disabled={!pendingChanges.luck || pendingChanges.luck <= 0}
                    title='Verringern'
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    className={`${styles.statButton} ${styles.increaseButton}`}
                    onClick={() => handleStatChange('luck', 1)}
                    disabled={getRemainingPoints() <= 0}
                    title='Erhöhen'
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons - nur anzeigen wenn Änderungen vorhanden sind */}
          {hasChanges && (
            <div className={styles.statActions}>
              <button
                className={styles.resetButton}
                onClick={handleReset}
                title='Änderungen zurücksetzen'
              >
                Zurücksetzen
              </button>
              <button
                className={styles.applyButton}
                onClick={handleApply}
                title='Änderungen anwenden'
              >
                Anwenden
              </button>
            </div>
          )}
        </div>

        {/* Spielinformationen */}
        <div className={`${styles.section} ${styles.gameInfo}`}>
          <h2>Spielinformationen</h2>
          <div className={styles.infoItem}>
            <span>Slot:</span>
            <span>{character.slotId}</span>
          </div>
          <div className={styles.infoItem}>
            <span>Erstellt am:</span>
            <span>
              {character.createdAt !== 'Unbekannt'
                ? formatDate(character.createdAt)
                : character.createdAt}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>Letzter Login:</span>
            <span>
              {character.lastLogin !== 'Unbekannt'
                ? formatDate(character.lastLogin)
                : character.lastLogin}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;

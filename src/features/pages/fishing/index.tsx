import { Fish, Star } from 'lucide-react';
import React, { useState } from 'react';
import styles from './Fishing.module.scss';

const Fishing: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('lake');
  const [isActive, setIsActive] = useState(false);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const fishingLocations = [
    {
      id: 'lake',
      name: 'Peaceful Lake',
      level: 1,
      fish: ['Trout', 'Bass', 'Pike'],
      experience: 20,
      icon: '🏞️',
    },
    {
      id: 'river',
      name: 'Swift River',
      level: 5,
      fish: ['Salmon', 'Catfish', 'Sturgeon'],
      experience: 40,
      icon: '🌊',
    },
    {
      id: 'ocean',
      name: 'Deep Ocean',
      level: 10,
      fish: ['Tuna', 'Shark', 'Marlin'],
      experience: 80,
      icon: '🌊',
    },
  ];

  const selectedLocationData = fishingLocations.find(location => location.id === selectedLocation);

  return (
    <div className={styles.fishing}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Fish className={styles.titleIcon} />
          <h1>Fishing</h1>
          <span className={styles.level}>Level {level}</span>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Experience</span>
            <span className={styles.statValue}>{experience.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className={styles.fishingContent}>
        <div className={styles.locationSelection}>
          <h2>Select Fishing Location</h2>
          <div className={styles.locationGrid}>
            {fishingLocations.map(location => (
              <div
                key={location.id}
                className={`${styles.locationCard} ${selectedLocation === location.id ? styles.selected : ''}`}
                onClick={() => setSelectedLocation(location.id)}
              >
                <div className={styles.locationIcon}>{location.icon}</div>
                <div className={styles.locationName}>{location.name}</div>
                <div className={styles.locationLevel}>Level {location.level}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.fishingArea}>
          <h2>Fishing</h2>
          {selectedLocationData && (
            <div className={styles.fishingInfo}>
              <div className={styles.locationDetails}>
                <h3>{selectedLocationData.name}</h3>
                <div className={styles.fishList}>
                  <h4>Available Fish:</h4>
                  <ul>
                    {selectedLocationData.fish.map((fish, index) => (
                      <li key={index}>{fish}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.experience}>
                  <span>Experience: {selectedLocationData.experience}</span>
                </div>
              </div>

              <div className={styles.fishingAction}>
                <button
                  className={`${styles.fishButton} ${isActive ? styles.active : ''}`}
                  onClick={() => setIsActive(!isActive)}
                >
                  <Fish className={styles.fishIcon} />
                  {isActive ? 'Fishing...' : 'Start Fishing'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fishing;
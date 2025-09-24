import { Compass, Map, MapPin, Shield, Star } from 'lucide-react';
import React, { useState } from 'react';
import styles from './WorldMap.module.scss';

const WorldMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('forest');
  const [mapView, setMapView] = useState('overworld');

  const locations = [
    {
      id: 'forest',
      name: 'Mystic Forest',
      level: '1-20',
      type: 'training',
      icon: '🌲',
      description: 'A peaceful forest perfect for beginners',
      resources: ['Wood', 'Herbs', 'Berries'],
      monsters: ['Goblin', 'Wolf', 'Bear'],
      color: '#10b981',
    },
    {
      id: 'mountains',
      name: 'Iron Mountains',
      level: '15-35',
      type: 'mining',
      icon: '⛰️',
      description: 'Rich in ore deposits and precious metals',
      resources: ['Iron', 'Coal', 'Gold', 'Gems'],
      monsters: ['Mountain Troll', 'Stone Golem'],
      color: '#6b7280',
    },
    {
      id: 'ocean',
      name: 'Crystal Ocean',
      level: '20-40',
      type: 'fishing',
      icon: '🌊',
      description: 'Deep waters filled with exotic fish',
      resources: ['Fish', 'Pearls', 'Seaweed'],
      monsters: ['Sea Serpent', 'Kraken'],
      color: '#3b82f6',
    },
    {
      id: 'desert',
      name: 'Scorching Desert',
      level: '30-50',
      type: 'exploration',
      icon: '🏜️',
      description: 'A harsh desert with hidden treasures',
      resources: ['Sand', 'Cactus', 'Ancient Artifacts'],
      monsters: ['Sand Worm', 'Desert Djinn'],
      color: '#f59e0b',
    },
    {
      id: 'volcano',
      name: 'Fire Peak',
      level: '40-60',
      type: 'dangerous',
      icon: '🌋',
      description: 'An active volcano with rare materials',
      resources: ['Lava Stone', 'Fire Crystals', 'Obsidian'],
      monsters: ['Fire Elemental', 'Lava Dragon'],
      color: '#ef4444',
    },
    {
      id: 'tundra',
      name: 'Frozen Tundra',
      level: '50-70',
      type: 'extreme',
      icon: '❄️',
      description: 'A frozen wasteland of ice and snow',
      resources: ['Ice Crystals', 'Frost Metal', 'Arctic Herbs'],
      monsters: ['Ice Giant', 'Frost Wolf', 'Yeti'],
      color: '#87ceeb',
    },
    {
      id: 'dungeon',
      name: 'Shadow Dungeon',
      level: '60-80',
      type: 'dungeon',
      icon: '🏰',
      description: 'A dark dungeon filled with undead',
      resources: ['Shadow Essence', 'Bone Fragments'],
      monsters: ['Skeleton', 'Zombie', 'Lich'],
      color: '#8b5cf6',
    },
    {
      id: 'sky',
      name: 'Floating Islands',
      level: '70-90',
      type: 'sky',
      icon: '☁️',
      description: 'Mystical islands floating in the sky',
      resources: ['Cloud Essence', 'Sky Gems', 'Wind Crystals'],
      monsters: ['Sky Dragon', 'Cloud Elemental'],
      color: '#a78bfa',
    },
  ];

  const selectedLocationData = locations.find(
    loc => loc.id === selectedLocation
  );

  return (
    <div className={styles.worldMap}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Map className={styles.titleIcon} />
          <h1>World Map</h1>
        </div>
        <div className={styles.mapControls}>
          <div className={styles.viewSelector}>
            <button
              className={`${styles.viewButton} ${mapView === 'overworld' ? styles.active : ''}`}
              onClick={() => setMapView('overworld')}
            >
              <Compass className={styles.viewIcon} />
              Overworld
            </button>
            <button
              className={`${styles.viewButton} ${mapView === 'underground' ? styles.active : ''}`}
              onClick={() => setMapView('underground')}
            >
              <MapPin className={styles.viewIcon} />
              Underground
            </button>
          </div>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <div className={styles.mapView}>
          <div className={styles.mapGrid}>
            {locations.map(location => (
              <div
                key={location.id}
                className={`${styles.locationCard} ${selectedLocation === location.id ? styles.selected : ''}`}
                onClick={() => setSelectedLocation(location.id)}
                style={
                  { '--location-color': location.color } as React.CSSProperties
                }
              >
                <div className={styles.locationIcon}>{location.icon}</div>
                <div className={styles.locationName}>{location.name}</div>
                <div className={styles.locationLevel}>Lv. {location.level}</div>
                <div className={styles.locationType}>{location.type}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.locationDetails}>
          {selectedLocationData && (
            <>
              <div className={styles.locationHeader}>
                <div className={styles.locationTitle}>
                  <span className={styles.locationIcon}>
                    {selectedLocationData.icon}
                  </span>
                  <h3>{selectedLocationData.name}</h3>
                </div>
                <div className={styles.locationLevel}>
                  Level {selectedLocationData.level}
                </div>
              </div>

              <div className={styles.locationInfo}>
                <p className={styles.description}>
                  {selectedLocationData.description}
                </p>

                <div className={styles.infoSection}>
                  <h4>Resources</h4>
                  <div className={styles.resourceList}>
                    {selectedLocationData.resources.map((resource, index) => (
                      <span key={index} className={styles.resource}>
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.infoSection}>
                  <h4>Monsters</h4>
                  <div className={styles.monsterList}>
                    {selectedLocationData.monsters.map((monster, index) => (
                      <span key={index} className={styles.monster}>
                        {monster}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.locationActions}>
                <button className={styles.travelButton}>
                  <MapPin className={styles.actionIcon} />
                  Travel Here
                </button>
                <button className={styles.exploreButton}>
                  <Compass className={styles.actionIcon} />
                  Explore
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.quickTravel}>
        <h3>Quick Travel</h3>
        <div className={styles.quickTravelGrid}>
          <button className={styles.quickTravelButton}>
            <Star className={styles.quickIcon} />
            <span>Home</span>
          </button>
          <button className={styles.quickTravelButton}>
            <Shield className={styles.quickIcon} />
            <span>Safe Zone</span>
          </button>
          <button className={styles.quickTravelButton}>
            <MapPin className={styles.quickIcon} />
            <span>Last Location</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;

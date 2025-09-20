'use client'

import React, { useState } from 'react';
import { 
  Heart,
  Star,
  Zap,
  Shield,
  Sword,
  Activity,
  Award,
  Eye,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import styles from './Pets.module.css';

const Pets = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [collapsedRanks, setCollapsedRanks] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  const pets = [
    // SSSS+ Rang
    { id: 1, name: "Kosmischer Drache", rank: "SSSS+", type: "Legendary", health: 9999, attack: 999, defense: 999, speed: 850, element: "Cosmic", rarity: "Mythical", description: "Ein legendärer Drache aus den Tiefen des Kosmos. Seine Macht ist unermesslich.", abilities: ["Sternenexplosion", "Zeitverzerrung", "Kosmische Heilung"], image: "/assets/img/pets/dog.jpg" },
    { id: 2, name: "Phönix der Ewigkeit", rank: "SSSS+", type: "Legendary", health: 8888, attack: 950, defense: 800, speed: 900, element: "Fire", rarity: "Mythical", description: "Ein unsterblicher Phönix der aus der Asche der Zeit entstanden ist.", abilities: ["Ewige Flamme", "Wiedergeburt", "Feuersturm"], image: "/assets/pets/eternal-phoenix.png" },
    
    // SSS Rang
    { id: 3, name: "Schattenbestie", rank: "SSS", type: "Dark", health: 7500, attack: 850, defense: 700, speed: 800, element: "Shadow", rarity: "Epic", description: "Eine mysteriöse Kreatur aus den Schatten der Unterwelt.", abilities: ["Schattenschlag", "Unsichtbarkeit", "Dunkle Magie"], image: "/assets/pets/shadow-beast.png" },
    { id: 4, name: "Blitzwolf", rank: "SSS", type: "Beast", health: 6800, attack: 800, defense: 650, speed: 950, element: "Thunder", rarity: "Epic", description: "Ein schneller Wolf mit der Macht des Donners.", abilities: ["Blitzschlag", "Geschwindigkeitsschub", "Donnerschrei"], image: "/assets/pets/thunder-wolf.png" },
    { id: 5, name: "Kristalldrache", rank: "SSS", type: "Dragon", health: 8200, attack: 750, defense: 900, speed: 600, element: "Crystal", rarity: "Epic", description: "Ein majestätischer Drache mit kristalliner Haut.", abilities: ["Kristallspitzen", "Heilkristall", "Prismaschild"], image: "/assets/pets/crystal-dragon.png" },
    
    // SS Rang
    { id: 6, name: "Flammentiger", rank: "SS", type: "Beast", health: 5500, attack: 700, defense: 550, speed: 750, element: "Fire", rarity: "Rare", description: "Ein wilder Tiger mit brennenden Streifen.", abilities: ["Feuerkrallen", "Sprungattacke", "Brandwunde"], image: "/assets/pets/flame-tiger.png" },
    { id: 7, name: "Eisbär König", rank: "SS", type: "Beast", health: 6200, attack: 650, defense: 800, speed: 400, element: "Ice", rarity: "Rare", description: "Der Herrscher der eisigen Wildnis.", abilities: ["Eisschlag", "Frostpanzer", "Kälteschock"], image: "/assets/pets/ice-bear.png" },
    { id: 8, name: "Windfalke", rank: "SS", type: "Beast", health: 4800, attack: 600, defense: 400, speed: 900, element: "Wind", rarity: "Rare", description: "Ein eleganter Falke der die Winde beherrscht.", abilities: ["Windstoß", "Sturzflug", "Tornado"], image: "/assets/pets/wind-falcon.png" },
    { id: 9, name: "Erdgolem", rank: "SS", type: "Golem", health: 7000, attack: 550, defense: 950, speed: 200, element: "Earth", rarity: "Rare", description: "Ein mächtiger Golem aus purem Stein.", abilities: ["Felsbrocken", "Erdbeben", "Steinpanzer"], image: "/assets/pets/earth-golem.png" },
    
    // S Rang
    { id: 10, name: "Waldgeist", rank: "S", type: "Spirit", health: 4500, attack: 500, defense: 600, speed: 650, element: "Nature", rarity: "Uncommon", description: "Ein friedlicher Geist des Waldes.", abilities: ["Naturheilung", "Rankengriff", "Blätterschild"], image: "/assets/pets/forest-spirit.png" },
    { id: 11, name: "Wasserschlange", rank: "S", type: "Beast", health: 4200, attack: 550, defense: 500, speed: 700, element: "Water", rarity: "Uncommon", description: "Eine geschmeidige Schlange der Gewässer.", abilities: ["Wasserstrahl", "Giftzähne", "Flutattacke"], image: "/assets/pets/water-snake.png" },
    { id: 12, name: "Kampfhund", rank: "S", type: "Beast", health: 4000, attack: 600, defense: 450, speed: 600, element: "Normal", rarity: "Uncommon", description: "Ein treuer Kampfgefährte.", abilities: ["Bissattacke", "Sprung", "Kampfgeist"], image: "/assets/pets/battle-dog.png" },
    
    // A Rang
    { id: 13, name: "Feldmaus", rank: "A", type: "Beast", health: 3200, attack: 400, defense: 350, speed: 550, element: "Normal", rarity: "Common", description: "Eine flinke kleine Maus.", abilities: ["Schnellbiss", "Ausweichen", "Kratzer"], image: "/assets/pets/field-mouse.png" },
    { id: 14, name: "Gartenschlange", rank: "A", type: "Beast", health: 3500, attack: 420, defense: 380, speed: 500, element: "Nature", rarity: "Common", description: "Eine harmlose Gartenschlange.", abilities: ["Wickeln", "Giftspritzer", "Tarnung"], image: "/assets/pets/garden-snake.png" },
    
    // B Rang
    { id: 15, name: "Stubenkater", rank: "B", type: "Beast", health: 2800, attack: 350, defense: 300, speed: 450, element: "Normal", rarity: "Common", description: "Ein gewöhnlicher Hauskater.", abilities: ["Krallen", "Sprung", "Miauen"], image: "/assets/pets/house-cat.png" },
    { id: 16, name: "Stadttaube", rank: "B", type: "Beast", health: 2500, attack: 300, defense: 250, speed: 500, element: "Normal", rarity: "Common", description: "Eine alltägliche Stadttaube.", abilities: ["Flattern", "Picken", "Flucht"], image: "/assets/pets/city-pigeon.png" },
    
    // C Rang
    { id: 17, name: "Goldfisch", rank: "C", type: "Beast", health: 2000, attack: 200, defense: 180, speed: 300, element: "Water", rarity: "Common", description: "Ein einfacher Goldfisch.", abilities: ["Blubbern", "Schwimmen", "Glitzern"], image: "/assets/pets/goldfish.png" },
    { id: 18, name: "Hamster", rank: "C", type: "Beast", health: 1800, attack: 180, defense: 150, speed: 400, element: "Normal", rarity: "Common", description: "Ein niedlicher Hamster.", abilities: ["Knabbern", "Rennen", "Verstecken"], image: "/assets/pets/hamster.png" },
    
    // D Rang
    { id: 19, name: "Regenwurm", rank: "D", type: "Beast", health: 1200, attack: 100, defense: 80, speed: 150, element: "Earth", rarity: "Common", description: "Ein gewöhnlicher Regenwurm.", abilities: ["Graben", "Schleim", "Verstecken"], image: "/assets/pets/earthworm.png" },
    { id: 20, name: "Schnecke", rank: "D", type: "Beast", health: 1500, attack: 80, defense: 120, speed: 50, element: "Normal", rarity: "Common", description: "Eine langsame aber zähe Schnecke.", abilities: ["Schleimspurt", "Panzer", "Zeitlupe"], image: "/assets/pets/snail.png" },
    
    // F Rang
    { id: 21, name: "Käfer", rank: "F", type: "Insect", health: 800, attack: 60, defense: 50, speed: 200, element: "Normal", rarity: "Common", description: "Ein gewöhnlicher Käfer.", abilities: ["Krabbeln", "Kneifen", "Surren"], image: "/assets/pets/beetle.png" },
    { id: 22, name: "Ameise", rank: "F", type: "Insect", health: 600, attack: 40, defense: 30, speed: 180, element: "Normal", rarity: "Common", description: "Eine fleißige Arbeiterameise.", abilities: ["Beißen", "Teamwork", "Tragen"], image: "/assets/pets/ant.png" }
  ];

  const rankOrder = ["SSSS+", "SSS", "SS", "S", "A", "B", "C", "D", "F"];
  const rankColors = {
    "SSSS+": "#ff0080",
    "SSS": "#8b00ff",
    "SS": "#ff4500", 
    "S": "#ffd700",
    "A": "#00ff00",
    "B": "#00bfff",
    "C": "#ff69b4",
    "D": "#ffa500",
    "F": "#808080"
  };

  const groupedPets = rankOrder.reduce((acc, rank) => {
    acc[rank] = pets.filter(pet => pet.rank === rank);
    return acc;
  }, {});

  const toggleRankCollapse = (rank) => {
    setCollapsedRanks(prev => ({
      ...prev,
      [rank]: !prev[rank]
    }));
  };

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'Mythical': return '#ff0080';
      case 'Epic': return '#8b00ff';
      case 'Rare': return '#0080ff';
      case 'Uncommon': return '#00ff00';
      default: return '#ffffff';
    }
  };

  const handleImageError = (petId) => {
    setImageErrors(prev => ({
      ...prev,
      [petId]: true
    }));
  };

  const PetIcon = ({ pet, size = 'normal' }) => {
    const hasImageError = imageErrors[pet.id];
    
    if (pet.image && !hasImageError) {
      return (
        <img 
          src={pet.image} 
          alt={pet.name}
          className={size === 'large' ? styles.petDetailIcon : styles.petIcon}
          onError={() => handleImageError(pet.id)}
        />
      );
    }
    
    return (
      <div 
        className={size === 'large' ? styles.petDetailIcon : styles.petIcon}
        style={{ backgroundColor: rankColors[pet.rank] }}
      >
        <Heart />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            <Heart className={styles.titleIcon} />
            Pet Collection
          </h1>
          <p className={styles.subtitle}>
            Sammle und verwalte deine mächtigen Begleiter
          </p>
        </header>

        <div className={styles.mainContent}>
          
          {/* Pet Collection */}
          <div className={styles.petCollection}>
            {rankOrder.map(rank => {
              const rankPets = groupedPets[rank];
              if (rankPets.length === 0) return null;
              
              const isCollapsed = collapsedRanks[rank];
              
              return (
                <div key={rank} className={styles.rankSection}>
                  <div 
                    className={styles.rankHeader}
                    onClick={() => toggleRankCollapse(rank)}
                    style={{ borderLeftColor: rankColors[rank] }}
                  >
                    <div className={styles.rankTitle}>
                      <span 
                        className={styles.rankBadge}
                        style={{ backgroundColor: rankColors[rank] }}
                      >
                        {rank}
                      </span>
                      <span className={styles.petCount}>
                        {rankPets.length} Pets
                      </span>
                    </div>
                    {isCollapsed ? <ChevronDown /> : <ChevronUp />}
                  </div>
                  
                  {!isCollapsed && (
                    <div className={styles.petGrid}>
                      {rankPets.map(pet => (
                        <div 
                          key={pet.id}
                          className={`${styles.petCard} ${selectedPet?.id === pet.id ? styles.selected : ''}`}
                          onClick={() => setSelectedPet(pet)}
                        >
                          <div className={styles.cardTopLine} />
                          
                          <div className={styles.petImage}>
                            <PetIcon pet={pet} />
                          </div>
                          
                          <div className={styles.petInfo}>
                            <h4 className={styles.petName}>{pet.name}</h4>
                            <div className={styles.petType}>{pet.type}</div>
                            <div 
                              className={styles.petRarity}
                              style={{ color: getRarityColor(pet.rarity) }}
                            >
                              {pet.rarity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pet Details Panel */}
          <div className={styles.detailsPanel}>
            {selectedPet ? (
              <>
                <div className={styles.detailsHeader}>
                  <div className={styles.detailsTitle}>
                    <Info className={styles.detailsIcon} />
                    Pet Details
                  </div>
                </div>
                
                <div className={styles.detailsContent}>
                  <div className={styles.petDetailImage}>
                    <PetIcon pet={selectedPet} size="large" />
                  </div>
                  
                  <div className={styles.petDetailInfo}>
                    <h3 className={styles.petDetailName}>{selectedPet.name}</h3>
                    <div 
                      className={styles.petDetailRank}
                      style={{ color: rankColors[selectedPet.rank] }}
                    >
                      Rang {selectedPet.rank}
                    </div>
                    <div className={styles.petDetailType}>{selectedPet.type} • {selectedPet.element}</div>
                    <div 
                      className={styles.petDetailRarity}
                      style={{ color: getRarityColor(selectedPet.rarity) }}
                    >
                      {selectedPet.rarity}
                    </div>
                  </div>
                  
                  <div className={styles.petStats}>
                    <div className={styles.statItem}>
                      <Heart className={styles.statIcon} />
                      <span className={styles.statLabel}>Leben</span>
                      <span className={styles.statValue}>{selectedPet.health.toLocaleString()}</span>
                    </div>
                    <div className={styles.statItem}>
                      <Sword className={styles.statIcon} />
                      <span className={styles.statLabel}>Angriff</span>
                      <span className={styles.statValue}>{selectedPet.attack}</span>
                    </div>
                    <div className={styles.statItem}>
                      <Shield className={styles.statIcon} />
                      <span className={styles.statLabel}>Verteidigung</span>
                      <span className={styles.statValue}>{selectedPet.defense}</span>
                    </div>
                    <div className={styles.statItem}>
                      <Zap className={styles.statIcon} />
                      <span className={styles.statLabel}>Geschwindigkeit</span>
                      <span className={styles.statValue}>{selectedPet.speed}</span>
                    </div>
                  </div>
                  
                  <div className={styles.petDescription}>
                    <h4>Beschreibung</h4>
                    <p>{selectedPet.description}</p>
                  </div>
                  
                  <div className={styles.petAbilities}>
                    <h4>Fähigkeiten</h4>
                    <div className={styles.abilitiesList}>
                      {selectedPet.abilities.map((ability, index) => (
                        <div key={index} className={styles.abilityItem}>
                          <Star className={styles.abilityIcon} />
                          <span>{ability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.noSelection}>
                <div className={styles.noSelectionContent}>
                  <Eye className={styles.noSelectionIcon} />
                  <h3>Kein Pet ausgewählt</h3>
                  <p>Wähle ein Pet aus der Liste aus, um Details zu sehen</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pets;
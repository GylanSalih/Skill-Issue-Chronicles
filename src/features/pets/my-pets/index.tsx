import React, { useState } from 'react';
import { 
  Heart,
  Star,
  Zap,
  Shield,
  Sword,
  Eye,
  Info
} from 'lucide-react';
import styles from './MyPets.module.scss';

interface Pet {
  id: number;
  name: string;
  rank: string;
  type: string;
  health: number;
  attack: number;
  defense: number;
  speed: number;
  element: string;
  rarity: string;
  description: string;
  abilities: string[];
  image: string;
  level: number;
  experience: number;
  maxExperience: number;
}

// TrainingSession interface removed - handled in separate PetTraining page

const MyPets = () => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const pets: Pet[] = [
    // SSSS+ Rang
    { id: 1, name: "Kosmischer Drache", rank: "SSSS+", type: "Legendary", health: 9999, attack: 999, defense: 999, speed: 850, element: "Cosmic", rarity: "Mythical", description: "Ein legendärer Drache aus den Tiefen des Kosmos. Seine Macht ist unermesslich.", abilities: ["Sternenexplosion", "Zeitverzerrung", "Kosmische Heilung"], image: "/assets/img/pets/dog.jpg", level: 50, experience: 2500, maxExperience: 5000 },
    { id: 2, name: "Phönix der Ewigkeit", rank: "SSSS+", type: "Legendary", health: 8888, attack: 950, defense: 800, speed: 900, element: "Fire", rarity: "Mythical", description: "Ein unsterblicher Phönix der aus der Asche der Zeit entstanden ist.", abilities: ["Ewige Flamme", "Wiedergeburt", "Feuersturm"], image: "/assets/pets/eternal-phoenix.png", level: 45, experience: 1800, maxExperience: 4000 },
    { id: 3, name: "Schattenlord", rank: "SSSS+", type: "Legendary", health: 9500, attack: 920, defense: 850, speed: 880, element: "Shadow", rarity: "Mythical", description: "Der Herrscher der Schattenwelt, geborener aus ewiger Dunkelheit.", abilities: ["Schattenherrschaft", "Dunkle Macht", "Schattenwand"], image: "/assets/pets/shadow-lord.png", level: 48, experience: 3200, maxExperience: 4500 },
    { id: 4, name: "Eisgott", rank: "SSSS+", type: "Legendary", health: 9200, attack: 880, defense: 920, speed: 750, element: "Ice", rarity: "Mythical", description: "Ein göttliches Wesen aus purem Eis, das die Kälte beherrscht.", abilities: ["Ewiger Frost", "Eispanzer", "Kältewelle"], image: "/assets/pets/ice-god.png", level: 42, experience: 1500, maxExperience: 3500 },
    
    // SSS Rang
    { id: 5, name: "Schattenbestie", rank: "SSS", type: "Dark", health: 7500, attack: 850, defense: 700, speed: 800, element: "Shadow", rarity: "Epic", description: "Eine mysteriöse Kreatur aus den Schatten der Unterwelt.", abilities: ["Schattenschlag", "Unsichtbarkeit", "Dunkle Magie"], image: "/assets/pets/shadow-beast.png", level: 35, experience: 800, maxExperience: 2000 },
    { id: 6, name: "Blitzwolf", rank: "SSS", type: "Beast", health: 6800, attack: 800, defense: 650, speed: 950, element: "Thunder", rarity: "Epic", description: "Ein schneller Wolf mit der Macht des Donners.", abilities: ["Blitzschlag", "Geschwindigkeitsschub", "Donnerschrei"], image: "/assets/pets/thunder-wolf.png", level: 38, experience: 1200, maxExperience: 2500 },
    
    // SS Rang
    { id: 7, name: "Flammentiger", rank: "SS", type: "Beast", health: 5500, attack: 700, defense: 550, speed: 750, element: "Fire", rarity: "Rare", description: "Ein wilder Tiger mit brennenden Streifen.", abilities: ["Feuerkrallen", "Sprungattacke", "Brandwunde"], image: "/assets/pets/flame-tiger.png", level: 28, experience: 600, maxExperience: 1500 },
    { id: 8, name: "Eisbär König", rank: "SS", type: "Beast", health: 6200, attack: 650, defense: 800, speed: 400, element: "Ice", rarity: "Rare", description: "Der Herrscher der eisigen Wildnis.", abilities: ["Eisschlag", "Frostpanzer", "Kälteschock"], image: "/assets/pets/ice-bear.png", level: 32, experience: 900, maxExperience: 1800 },
    
    // S Rang
    { id: 9, name: "Waldgeist", rank: "S", type: "Spirit", health: 4500, attack: 500, defense: 600, speed: 650, element: "Nature", rarity: "Uncommon", description: "Ein friedlicher Geist des Waldes.", abilities: ["Naturheilung", "Rankengriff", "Blätterschild"], image: "/assets/pets/forest-spirit.png", level: 22, experience: 400, maxExperience: 1000 },
    { id: 10, name: "Wasserschlange", rank: "S", type: "Beast", health: 4200, attack: 550, defense: 500, speed: 700, element: "Water", rarity: "Uncommon", description: "Eine geschmeidige Schlange der Gewässer.", abilities: ["Wasserstrahl", "Giftzähne", "Flutattacke"], image: "/assets/pets/water-snake.png", level: 25, experience: 500, maxExperience: 1200 },
    
    // A Rang
    { id: 11, name: "Kampfhund", rank: "A", type: "Beast", health: 4000, attack: 600, defense: 450, speed: 600, element: "Normal", rarity: "Common", description: "Ein treuer Kampfgefährte.", abilities: ["Bissattacke", "Sprung", "Kampfgeist"], image: "/assets/pets/battle-dog.png", level: 18, experience: 300, maxExperience: 800 },
    { id: 12, name: "Feldmaus", rank: "A", type: "Beast", health: 3200, attack: 400, defense: 350, speed: 550, element: "Normal", rarity: "Common", description: "Eine flinke kleine Maus.", abilities: ["Schnellbiss", "Ausweichen", "Kratzer"], image: "/assets/pets/field-mouse.png", level: 15, experience: 200, maxExperience: 600 }
  ];

  const rankColors = {
    "SSSS+": "#8b0000", // Dunkles Rot
    "SSS": "#4b0082", // Dunkles Violett
    "SS": "#8b4513", // Dunkles Braun
    "S": "#b8860b", // Dunkles Gold
    "A": "#006400", // Dunkles Grün
    "B": "#000080", // Dunkles Blau
    "C": "#800080", // Dunkles Magenta
    "D": "#ff8c00", // Dunkles Orange
    "F": "#696969" // Dunkles Grau
  };

  // Rarity colors removed - using rank colors instead

  // Training functions removed - handled in separate PetTraining page

  return (
    <div className={styles.myPets}>
      <div className={styles.header}>
        <Heart className={styles.headerIcon} size={32} />
        <div className={styles.headerContent}>
          <h1>My Pets</h1>
          <p>Manage your pet collection and battle companions</p>
        </div>
      </div>

      <div className={styles.scenerySection}>
        <div className={styles.sceneryImage}>
          <img 
            src="/assets/img/scenery/halloffame_scenery.png" 
            alt="Pet Sanctuary" 
            className={styles.sceneryImg}
            onError={(e) => {
              e.currentTarget.src = "/assets/img/scenery/dungeon.png";
            }}
          />
        </div>
        <div className={styles.sceneryDescription}>
          <h2>Pet Sanctuary</h2>
          <p>
            Welcome to your personal pet sanctuary! Here you can manage your collection of magical creatures, 
            train them for battle, and watch them grow stronger. Each pet has unique abilities and can be 
            trained to become a powerful companion in your adventures.
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainGrid}>
          {/* Pet Collection Section */}
          <div className={styles.petCollectionSection}>
            <div className={styles.sectionHeader}>
              <Heart className={styles.sectionIcon} size={24} />
              <h2>Pet Collection</h2>
            </div>
            
            <div className={styles.petCollection}>
              <div className={styles.petGrid}>
                {pets.map(pet => (
                  <div 
                    key={pet.id}
                    className={`${styles.petCard} ${selectedPet?.id === pet.id ? styles.selected : ''}`}
                    onClick={() => setSelectedPet(pet)}
                  >
                    <div className={styles.petImage}>
                      <img 
                        src={pet.image} 
                        alt={pet.name}
                        className={styles.petAvatar}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    
                    <div className={styles.petInfo}>
                      <h4 className={styles.petName}>{pet.name}</h4>
                      <div className={styles.petType}>{pet.type}</div>
                      <div className={styles.petLevel}>Level {pet.level}</div>
                      <div 
                        className={styles.petRank}
                        style={{ backgroundColor: rankColors[pet.rank] }}
                      >
                        {pet.rank}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pet Details Panel */}
          <div className={styles.detailsPanel}>
            {selectedPet ? (
              <div className={styles.petDetails}>
                <div className={styles.detailsHeader}>
                  <Info className={styles.detailsIcon} size={20} />
                  <h3>Pet Details</h3>
                </div>
                
                <div className={styles.petDetailImage}>
                  <img 
                    src={selectedPet.image} 
                    alt={selectedPet.name}
                    className={styles.petDetailAvatar}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                
                  <div className={styles.petDetailInfo}>
                    <h4 className={styles.petDetailName}>{selectedPet.name}</h4>
                    <div 
                      className={styles.petDetailRank}
                      style={{ color: rankColors[selectedPet.rank] }}
                    >
                      Rank {selectedPet.rank}
                    </div>
                    <div className={styles.petDetailType}>{selectedPet.type} • {selectedPet.element}</div>
                  </div>
                
                <div className={styles.petStats}>
                  <div className={styles.statItem}>
                    <Heart size={16} />
                    <span>Health</span>
                    <span>{selectedPet.health.toLocaleString()}</span>
                  </div>
                  <div className={styles.statItem}>
                    <Sword size={16} />
                    <span>Attack</span>
                    <span>{selectedPet.attack}</span>
                  </div>
                  <div className={styles.statItem}>
                    <Shield size={16} />
                    <span>Defense</span>
                    <span>{selectedPet.defense}</span>
                  </div>
                  <div className={styles.statItem}>
                    <Zap size={16} />
                    <span>Speed</span>
                    <span>{selectedPet.speed}</span>
                  </div>
                </div>
                
                <div className={styles.petDescription}>
                  <h5>Description</h5>
                  <p>{selectedPet.description}</p>
                </div>
                
                <div className={styles.petAbilities}>
                  <h5>Abilities</h5>
                  <div className={styles.abilitiesList}>
                    {selectedPet.abilities.map((ability, index) => (
                      <div key={index} className={styles.abilityItem}>
                        <Star size={14} />
                        <span>{ability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.noSelection}>
                <Eye size={48} />
                <h3>No Pet Selected</h3>
                <p>Select a pet from the collection to view details</p>
              </div>
            )}
          </div>


        </div>
      </div>
    </div>
  );
};

export default MyPets;

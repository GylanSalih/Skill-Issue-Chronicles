import React, { useState, useEffect } from 'react';
import { 
  Heart,
  Star,
  Zap,
  Shield,
  Sword,
  Activity,
  Award,
  Eye,
  Target,
  TrendingUp,
  Clock,
  Coins,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import styles from './PetTraining.module.scss';

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

interface TrainingSession {
  id: string;
  petId: number;
  trainingType: 'health' | 'attack' | 'defense' | 'speed';
  duration: number; // in minutes
  cost: number;
  experienceGain: number;
  statIncrease: number;
  startTime: number;
  endTime: number;
  isActive: boolean;
}

const PetTraining = () => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([]);
  const [availablePets, setAvailablePets] = useState<Pet[]>([]);
  const [selectedTrainingType, setSelectedTrainingType] = useState<'health' | 'attack' | 'defense' | 'speed'>('health');
  const [trainingDuration, setTrainingDuration] = useState(30); // minutes
  const [playerCoins, setPlayerCoins] = useState(10000);

  // Sample pets data
  useEffect(() => {
    const pets: Pet[] = [
      { id: 1, name: "Kosmischer Drache", rank: "SSSS+", type: "Legendary", health: 9999, attack: 999, defense: 999, speed: 850, element: "Cosmic", rarity: "Mythical", description: "Ein legendärer Drache aus den Tiefen des Kosmos.", abilities: ["Sternenexplosion", "Zeitverzerrung", "Kosmische Heilung"], image: "/assets/img/pets/dog.jpg", level: 50, experience: 2500, maxExperience: 5000 },
      { id: 2, name: "Phönix der Ewigkeit", rank: "SSSS+", type: "Legendary", health: 8888, attack: 950, defense: 800, speed: 900, element: "Fire", rarity: "Mythical", description: "Ein unsterblicher Phönix der aus der Asche der Zeit entstanden ist.", abilities: ["Ewige Flamme", "Wiedergeburt", "Feuersturm"], image: "/assets/pets/eternal-phoenix.png", level: 45, experience: 1800, maxExperience: 4000 },
      { id: 3, name: "Schattenlord", rank: "SSSS+", type: "Legendary", health: 9500, attack: 920, defense: 850, speed: 880, element: "Shadow", rarity: "Mythical", description: "Der Herrscher der Schattenwelt.", abilities: ["Schattenherrschaft", "Dunkle Macht", "Schattenwand"], image: "/assets/pets/shadow-lord.png", level: 48, experience: 3200, maxExperience: 4500 },
      { id: 4, name: "Eisgott", rank: "SSSS+", type: "Legendary", health: 9200, attack: 880, defense: 920, speed: 750, element: "Ice", rarity: "Mythical", description: "Ein göttliches Wesen aus purem Eis.", abilities: ["Ewiger Frost", "Eispanzer", "Kältewelle"], image: "/assets/pets/ice-god.png", level: 42, experience: 1500, maxExperience: 3500 },
      { id: 5, name: "Schattenbestie", rank: "SSS", type: "Dark", health: 7500, attack: 850, defense: 700, speed: 800, element: "Shadow", rarity: "Epic", description: "Eine mysteriöse Kreatur aus den Schatten.", abilities: ["Schattenschlag", "Unsichtbarkeit", "Dunkle Magie"], image: "/assets/pets/shadow-beast.png", level: 35, experience: 800, maxExperience: 2000 },
      { id: 6, name: "Blitzwolf", rank: "SSS", type: "Beast", health: 6800, attack: 800, defense: 650, speed: 950, element: "Thunder", rarity: "Epic", description: "Ein schneller Wolf mit der Macht des Donners.", abilities: ["Blitzschlag", "Geschwindigkeitsschub", "Donnerschrei"], image: "/assets/pets/thunder-wolf.png", level: 38, experience: 1200, maxExperience: 2500 }
    ];
    setAvailablePets(pets);
  }, []);

  const trainingTypes = [
    { id: 'health', name: 'Health Training', icon: Heart, color: '#8b0000', description: 'Increases maximum health' },
    { id: 'attack', name: 'Attack Training', icon: Sword, color: '#4b0082', description: 'Increases attack power' },
    { id: 'defense', name: 'Defense Training', icon: Shield, color: '#8b4513', description: 'Increases defense rating' },
    { id: 'speed', name: 'Speed Training', icon: Zap, color: '#b8860b', description: 'Increases speed and agility' }
  ];

  const getTrainingCost = (pet: Pet, trainingType: string, duration: number) => {
    const baseCost = pet.level * 10;
    const typeMultiplier = trainingType === 'health' ? 1.2 : trainingType === 'attack' ? 1.5 : trainingType === 'defense' ? 1.3 : 1.1;
    const durationMultiplier = duration / 30;
    return Math.floor(baseCost * typeMultiplier * durationMultiplier);
  };

  const getTrainingRewards = (pet: Pet, trainingType: string, duration: number) => {
    const baseExp = pet.level * 5;
    const baseStatIncrease = Math.floor(pet.level / 10) + 1;
    const durationMultiplier = duration / 30;
    
    return {
      experience: Math.floor(baseExp * durationMultiplier),
      statIncrease: Math.floor(baseStatIncrease * durationMultiplier)
    };
  };

  const startTraining = () => {
    if (!selectedPet) return;

    const cost = getTrainingCost(selectedPet, selectedTrainingType, trainingDuration);
    if (playerCoins < cost) return;

    const rewards = getTrainingRewards(selectedPet, selectedTrainingType, trainingDuration);
    const now = Date.now();
    const endTime = now + (trainingDuration * 60 * 1000);

    const newSession: TrainingSession = {
      id: `training_${now}_${selectedPet.id}`,
      petId: selectedPet.id,
      trainingType: selectedTrainingType,
      duration: trainingDuration,
      cost,
      experienceGain: rewards.experience,
      statIncrease: rewards.statIncrease,
      startTime: now,
      endTime,
      isActive: true
    };

    setTrainingSessions(prev => [...prev, newSession]);
    setPlayerCoins(prev => prev - cost);
    setSelectedPet(null);
  };

  const completeTraining = (sessionId: string) => {
    const session = trainingSessions.find(s => s.id === sessionId);
    if (!session) return;

    const petIndex = availablePets.findIndex(p => p.id === session.petId);
    if (petIndex === -1) return;

    // Update pet stats
    const updatedPets = [...availablePets];
    const pet = updatedPets[petIndex];
    pet.experience += session.experienceGain;
    
    // Check for level up
    if (pet.experience >= pet.maxExperience) {
      pet.level += 1;
      pet.experience = pet.experience - pet.maxExperience;
      pet.maxExperience = Math.floor(pet.maxExperience * 1.2);
    }

    // Apply stat increase
    switch (session.trainingType) {
      case 'health':
        pet.health += session.statIncrease;
        break;
      case 'attack':
        pet.attack += session.statIncrease;
        break;
      case 'defense':
        pet.defense += session.statIncrease;
        break;
      case 'speed':
        pet.speed += session.statIncrease;
        break;
    }

    setAvailablePets(updatedPets);
    setTrainingSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  const cancelTraining = (sessionId: string) => {
    const session = trainingSessions.find(s => s.id === sessionId);
    if (!session) return;

    // Refund 50% of cost
    setPlayerCoins(prev => prev + Math.floor(session.cost * 0.5));
    setTrainingSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  const getRemainingTime = (endTime: number) => {
    const remaining = endTime - Date.now();
    if (remaining <= 0) return 'Completed';
    
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'health': return Heart;
      case 'attack': return Sword;
      case 'defense': return Shield;
      case 'speed': return Zap;
      default: return Activity;
    }
  };

  // Check for completed training sessions
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      trainingSessions.forEach(session => {
        if (session.isActive && now >= session.endTime) {
          completeTraining(session.id);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [trainingSessions]);

  return (
    <div className={styles.petTraining}>
      <div className={styles.header}>
        <Activity className={styles.headerIcon} size={32} />
        <div className={styles.headerContent}>
          <h1>Pet Training</h1>
          <p>Train your pets to increase their stats and level up</p>
        </div>
        <div className={styles.coinsDisplay}>
          <Coins size={20} />
          <span>{playerCoins.toLocaleString()}</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.trainingArea}>
          <div className={styles.petSelection}>
            <h2>Select Pet to Train</h2>
            <div className={styles.petGrid}>
              {availablePets.map(pet => (
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
                    <h4>{pet.name}</h4>
                    <div className={styles.petLevel}>Level {pet.level}</div>
                    <div className={styles.experienceBar}>
                      <div 
                        className={styles.experienceFill}
                        style={{ width: `${(pet.experience / pet.maxExperience) * 100}%` }}
                      />
                    </div>
                    <div className={styles.petStats}>
                      <div className={styles.statItem}>
                        <Heart size={12} />
                        <span>{pet.health}</span>
                      </div>
                      <div className={styles.statItem}>
                        <Sword size={12} />
                        <span>{pet.attack}</span>
                      </div>
                      <div className={styles.statItem}>
                        <Shield size={12} />
                        <span>{pet.defense}</span>
                      </div>
                      <div className={styles.statItem}>
                        <Zap size={12} />
                        <span>{pet.speed}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedPet && (
            <div className={styles.trainingOptions}>
              <h2>Training Options</h2>
              <div className={styles.trainingTypes}>
                {trainingTypes.map(type => {
                  const IconComponent = type.icon;
                  const cost = getTrainingCost(selectedPet, type.id, trainingDuration);
                  const rewards = getTrainingRewards(selectedPet, type.id, trainingDuration);
                  
                  return (
                    <div 
                      key={type.id}
                      className={`${styles.trainingType} ${selectedTrainingType === type.id ? styles.selected : ''}`}
                      onClick={() => setSelectedTrainingType(type.id as any)}
                    >
                      <div className={styles.typeIcon} style={{ color: type.color }}>
                        <IconComponent size={24} />
                      </div>
                      <div className={styles.typeInfo}>
                        <h4>{type.name}</h4>
                        <p>{type.description}</p>
                        <div className={styles.typeRewards}>
                          <span>+{rewards.statIncrease} {type.id}</span>
                          <span>+{rewards.experience} XP</span>
                        </div>
                      </div>
                      <div className={styles.typeCost}>
                        <Coins size={16} />
                        <span>{cost}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.durationSelector}>
                <label>Training Duration:</label>
                <div className={styles.durationOptions}>
                  {[15, 30, 60, 120].map(duration => (
                    <button
                      key={duration}
                      className={`${styles.durationButton} ${trainingDuration === duration ? styles.active : ''}`}
                      onClick={() => setTrainingDuration(duration)}
                    >
                      {duration}min
                    </button>
                  ))}
                </div>
              </div>

              <button 
                className={styles.startTrainingButton}
                onClick={startTraining}
                disabled={playerCoins < getTrainingCost(selectedPet, selectedTrainingType, trainingDuration)}
              >
                <Activity size={20} />
                Start Training
                <span className={styles.cost}>
                  <Coins size={16} />
                  {getTrainingCost(selectedPet, selectedTrainingType, trainingDuration)}
                </span>
              </button>
            </div>
          )}
        </div>

        <div className={styles.activeTraining}>
          <h2>Active Training Sessions</h2>
          {trainingSessions.length === 0 ? (
            <div className={styles.noTraining}>
              <Clock size={48} />
              <h3>No Active Training</h3>
              <p>Select a pet and start training to see active sessions here</p>
            </div>
          ) : (
            <div className={styles.trainingSessions}>
              {trainingSessions.map(session => {
                const pet = availablePets.find(p => p.id === session.petId);
                const IconComponent = getStatIcon(session.trainingType);
                const remainingTime = getRemainingTime(session.endTime);
                
                return (
                  <div key={session.id} className={styles.trainingSession}>
                    <div className={styles.sessionInfo}>
                      <div className={styles.petInfo}>
                        <img 
                          src={pet?.image || ''} 
                          alt={pet?.name || ''}
                          className={styles.sessionPetAvatar}
                        />
                        <div>
                          <h4>{pet?.name}</h4>
                          <div className={styles.trainingType}>
                            <IconComponent size={16} />
                            <span>{session.trainingType.charAt(0).toUpperCase() + session.trainingType.slice(1)} Training</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.sessionStats}>
                        <div className={styles.statItem}>
                          <TrendingUp size={16} />
                          <span>+{session.statIncrease}</span>
                        </div>
                        <div className={styles.statItem}>
                          <Star size={16} />
                          <span>+{session.experienceGain} XP</span>
                        </div>
                        <div className={styles.statItem}>
                          <Clock size={16} />
                          <span>{remainingTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.sessionActions}>
                      {remainingTime === 'Completed' ? (
                        <button 
                          className={styles.completeButton}
                          onClick={() => completeTraining(session.id)}
                        >
                          <CheckCircle size={16} />
                          Complete
                        </button>
                      ) : (
                        <button 
                          className={styles.cancelButton}
                          onClick={() => cancelTraining(session.id)}
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetTraining;

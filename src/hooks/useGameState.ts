import { useState, useEffect, useCallback } from 'react';
import { GameState, Resources, Character, Skill } from '../types/game';
import { SaveManager } from '../lib/saveManager';

// Globaler State außerhalb der Komponente
let globalGameState: GameState = {
  resources: {
    primary: 0,
    secondary: {
      wood: 0,
      stone: 0,
      metal: 0,
      food: 0,
      // Verschiedene Holzarten
      normalWood: 0,
      softwood: 0,
      willowWood: 0,
      glowwood: 0,
      frostbark: 0,
      ebonyWood: 0,
      voidbark: 0,
      yangWood: 0,
      yingWood: 0,
      // Spezielle Ressourcen
      essences: 0,
      rareItems: 0
    }
  },
  character: {
    id: '1',
    name: 'Player',
    level: 1,
    experience: 0,
    totalLevel: 1,
    stats: {
      attack: 1,
      defense: 1,
      intelligence: 1,
      stamina: 1,
      melee: 1,
      ranged: 1,
      magic: 1
    },
    equipment: {}
  },
  skills: {
    woodcutting: {
      id: 'woodcutting',
      name: 'Woodcutting',
      level: 1,
      experience: 0,
      isActive: false,
      progress: 0,
      baseTime: 5
    },
    cooking: {
      id: 'cooking',
      name: 'Cooking',
      level: 1,
      experience: 0,
      isActive: false,
      progress: 0,
      baseTime: 8
    },
    mining: {
      id: 'mining',
      name: 'Mining',
      level: 1,
      experience: 0,
      isActive: false,
      progress: 0,
      baseTime: 10
    }
  },
  inventory: {
    items: [],
    maxSlots: 50
  },
  settings: {
    autoSave: true,
    notifications: true,
    soundEnabled: true,
    theme: 'dark'
  }
};

// Globaler State für isRunning
let globalIsRunning = false;

// Event-System für State-Updates
type StateUpdateCallback = (newState: GameState) => void;
const stateUpdateListeners: StateUpdateCallback[] = [];

const notifyStateUpdate = (newState: GameState) => {
  globalGameState = newState;
  stateUpdateListeners.forEach(callback => callback(newState));
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(globalGameState);
  const [isRunning, setIsRunning] = useState(globalIsRunning);

  // Höre auf globale State-Updates
  useEffect(() => {
    const handleStateUpdate = (newState: GameState) => {
      setGameState(newState);
    };

    stateUpdateListeners.push(handleStateUpdate);

    return () => {
      const index = stateUpdateListeners.indexOf(handleStateUpdate);
      if (index > -1) {
        stateUpdateListeners.splice(index, 1);
      }
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const newState = { ...globalGameState };
      
      // Update active skills
      Object.values(newState.skills).forEach(skill => {
        if (skill.isActive) {
          // Increase progress
          const progressIncrement = 100 / skill.baseTime;
          skill.progress = Math.min(100, skill.progress + progressIncrement);
          
          // Complete cycle
          if (skill.progress >= 100) {
            skill.progress = 0;
            skill.experience += 10;
            
            // Add resources based on skill
            switch (skill.id) {
              case 'woodcutting':
                newState.resources.secondary.wood += 1;
                break;
              case 'cooking':
                newState.resources.secondary.food += 1;
                break;
              case 'mining':
                newState.resources.secondary.stone += 1;
                break;
            }
          }
        }
      });

      notifyStateUpdate(newState);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startGame = useCallback(() => {
    globalIsRunning = true;
    setIsRunning(true);
  }, []);

  const stopGame = useCallback(() => {
    globalIsRunning = false;
    setIsRunning(false);
  }, []);

  const toggleSkill = useCallback((skillId: string) => {
    const newState = {
      ...globalGameState,
      skills: {
        ...globalGameState.skills,
        [skillId]: {
          ...globalGameState.skills[skillId],
          isActive: !globalGameState.skills[skillId].isActive
        }
      }
    };
    notifyStateUpdate(newState);
  }, []);

  const addResource = useCallback((type: string, amount: number) => {
    const currentValue = globalGameState.resources.secondary[type as keyof typeof globalGameState.resources.secondary] || 0;
    const newValue = currentValue + amount;
    console.log(`Adding ${amount} ${type}, current: ${currentValue}, new: ${newValue}`);
    console.log('Current secondary resources before:', globalGameState.resources.secondary);
    
    const newState = {
      ...globalGameState,
      resources: {
        ...globalGameState.resources,
        secondary: {
          ...globalGameState.resources.secondary,
          [type]: newValue
        }
      }
    };
    
    console.log('New secondary resources after:', newState.resources.secondary);
    notifyStateUpdate(newState);
  }, []);

  const processWoodcuttingResult = useCallback((woodTypeId: string, woodAmount: number, experience: number, essences?: number, rareItems?: number) => {
    const newState = { ...globalGameState };
    
    // Füge Wood hinzu
    const currentWood = newState.resources.secondary[woodTypeId as keyof typeof newState.resources.secondary] || 0;
    newState.resources.secondary[woodTypeId as keyof typeof newState.resources.secondary] = currentWood + woodAmount;
    
    // Füge Essences hinzu falls vorhanden
    if (essences) {
      newState.resources.secondary.essences += essences;
    }
    
    // Füge Rare Items hinzu falls vorhanden
    if (rareItems) {
      newState.resources.secondary.rareItems += rareItems;
    }
    
    // Füge Experience hinzu
    newState.skills.woodcutting.experience += experience;
    
    // Level-Up Check
    const requiredExp = newState.skills.woodcutting.level * 100; // Einfache Formel
    if (newState.skills.woodcutting.experience >= requiredExp) {
      newState.skills.woodcutting.level += 1;
      newState.skills.woodcutting.experience -= requiredExp;
    }
    
    notifyStateUpdate(newState);
  }, []);

  // Lade Save-Daten beim Mount
  useEffect(() => {
    const saveData = SaveManager.loadGame();
    if (saveData) {
      globalGameState = saveData.gameState;
      notifyStateUpdate(globalGameState);
    }
  }, []);

  return {
    gameState,
    isRunning,
    startGame,
    stopGame,
    toggleSkill,
    addResource,
    processWoodcuttingResult
  };
};
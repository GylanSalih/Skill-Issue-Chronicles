import { useState, useEffect, useCallback } from 'react';
import { GameState, Resources, Character, Skill } from '../types/game';

const initialGameState: GameState = {
  resources: {
    primary: 0,
    secondary: {
      wood: 0,
      stone: 0,
      metal: 0,
      food: 0
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

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [isRunning, setIsRunning] = useState(false);

  // Load game state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('idleGameState');
    if (saved) {
      try {
        setGameState(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load game state:', error);
      }
    }
  }, []);

  // Auto-save game state
  useEffect(() => {
    if (gameState.settings.autoSave) {
      localStorage.setItem('idleGameState', JSON.stringify(gameState));
    }
  }, [gameState]);

  // Game loop - runs every second
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setGameState(prevState => {
        const newState = { ...prevState };
        
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
                  newState.resources.secondary.wood += skill.level;
                  break;
                case 'cooking':
                  newState.resources.secondary.food += skill.level;
                  break;
                case 'mining':
                  newState.resources.secondary.stone += skill.level;
                  break;
              }
              
              // Check for level up
              const expNeeded = skill.level * 100;
              if (skill.experience >= expNeeded) {
                skill.level += 1;
                skill.experience -= expNeeded;
                newState.character.totalLevel += 1;
              }
            }
          }
        });
        
        return newState;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startGame = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stopGame = useCallback(() => {
    setIsRunning(false);
  }, []);

  const toggleSkill = useCallback((skillId: string) => {
    setGameState(prevState => ({
      ...prevState,
      skills: {
        ...prevState.skills,
        [skillId]: {
          ...prevState.skills[skillId],
          isActive: !prevState.skills[skillId].isActive
        }
      }
    }));
  }, []);

  const addResource = useCallback((type: string, amount: number) => {
    setGameState(prevState => ({
      ...prevState,
      resources: {
        ...prevState.resources,
        [type]: prevState.resources[type] + amount
      }
    }));
  }, []);

  return {
    gameState,
    isRunning,
    startGame,
    stopGame,
    toggleSkill,
    addResource
  };
};

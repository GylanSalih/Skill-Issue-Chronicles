import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useGameState } from '../hooks/useGameState';

// Activity Skill Types
export interface ActivitySkill {
  id: string;
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  isActive: boolean;
  progress: number; // 0-100
  baseTime: number; // base time for one cycle in seconds
  timeRemaining?: number; // in seconds
  efficiency: number; // 0-100
  color: string;
  icon: string;
}

export interface ActivityManagerState {
  skills: Record<string, ActivitySkill>;
  totalLevel: number;
  isRunning: boolean;
}

interface ActivityManagerContextType {
  // State
  state: ActivityManagerState;

  // Skill Management
  getSkill: (skillId: string) => ActivitySkill | null;
  getAllSkills: () => ActivitySkill[];
  getSkillLevel: (skillId: string) => number;
  getSkillExperience: (skillId: string) => number;
  getSkillProgress: (skillId: string) => number;

  // Actions
  startSkill: (skillId: string) => boolean;
  stopSkill: (skillId: string) => void;
  stopAllSkills: () => void;
  addExperience: (skillId: string, amount: number) => void;
  setSkillLevel: (skillId: string, level: number) => void;
  setSkillExperience: (skillId: string, experience: number) => void;

  // Game Control
  startGame: () => void;
  stopGame: () => void;
  toggleGame: () => void;

  // Calculations
  calculateRequiredExperience: (level: number) => number;
  calculateEfficiency: (skillId: string) => number;
  getTotalLevel: () => number;
}

const ActivityManagerContext = createContext<
  ActivityManagerContextType | undefined
>(undefined);

// Default Skills Configuration
const DEFAULT_SKILLS: Record<
  string,
  Omit<ActivitySkill, 'experience' | 'maxExperience' | 'efficiency'>
> = {
  woodcutting: {
    id: 'woodcutting',
    name: 'Woodcutting',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 5,
    color: '#8B4513',
    icon: 'TreePine',
  },
  mining: {
    id: 'mining',
    name: 'Mining',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 10,
    color: '#CD7F32',
    icon: 'Pickaxe',
  },
  fishing: {
    id: 'fishing',
    name: 'Fishing',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 8,
    color: '#4169E1',
    icon: 'Fish',
  },
  alchemy: {
    id: 'alchemy',
    name: 'Alchemy',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 12,
    color: '#9370DB',
    icon: 'FlaskConical',
  },
  cooking: {
    id: 'cooking',
    name: 'Cooking',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 6,
    color: '#FF6347',
    icon: 'ChefHat',
  },
  smithing: {
    id: 'smithing',
    name: 'Smithing',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 15,
    color: '#708090',
    icon: 'Hammer',
  },
  farming: {
    id: 'farming',
    name: 'Farming',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 20,
    color: '#32CD32',
    icon: 'Gem',
  },
  magic: {
    id: 'magic',
    name: 'Magic',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 8,
    color: '#FF69B4',
    icon: 'Wand2',
  },
  enchanting: {
    id: 'enchanting',
    name: 'Enchanting',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 10,
    color: '#87CEEB',
    icon: 'Snowflake',
  },
  breeding: {
    id: 'breeding',
    name: 'Breeding',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 30,
    color: '#FFD700',
    icon: 'Egg',
  },
  combat: {
    id: 'combat',
    name: 'Combat',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 5,
    color: '#DC143C',
    icon: 'Sword',
  },
  exploration: {
    id: 'exploration',
    name: 'Exploration',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 25,
    color: '#8B0000',
    icon: 'Mountain',
  },
  taming: {
    id: 'taming',
    name: 'Taming',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 18,
    color: '#20B2AA',
    icon: 'Baby',
  },
  defense: {
    id: 'defense',
    name: 'Defense',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 7,
    color: '#4682B4',
    icon: 'Shield',
  },
  jewelry: {
    id: 'jewelry',
    name: 'Jewelry',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 12,
    color: '#DDA0DD',
    icon: 'Gem',
  },
  herbalism: {
    id: 'herbalism',
    name: 'Herbalism',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 9,
    color: '#90EE90',
    icon: 'Flower',
  },
  archery: {
    id: 'archery',
    name: 'Archery',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 6,
    color: '#DEB887',
    icon: 'Target',
  },
  stealth: {
    id: 'stealth',
    name: 'Stealth',
    level: 1,
    isActive: false,
    progress: 0,
    baseTime: 8,
    color: '#2F4F4F',
    icon: 'Skull',
  },
};

interface ActivityManagerProviderProps {
  children: ReactNode;
}

export const ActivityManagerProvider: React.FC<
  ActivityManagerProviderProps
> = ({ children }) => {
  const {
    gameState,
    startGame: startGameState,
    stopGame: stopGameState,
  } = useGameState();

  // Calculate required experience for a level
  const calculateRequiredExperience = useCallback((level: number): number => {
    return Math.floor(level * 100 * Math.pow(1.1, level - 1));
  }, []);

  // Calculate efficiency based on level
  const calculateEfficiencyForLevel = useCallback((level: number): number => {
    return Math.min(100, Math.floor(50 + level * 2.5));
  }, []);

  // Initialize skills from default config
  const initializeSkills = useCallback((): Record<string, ActivitySkill> => {
    const skills: Record<string, ActivitySkill> = {};

    Object.entries(DEFAULT_SKILLS).forEach(([skillId, skillConfig]) => {
      // Get current level from gameState if available, otherwise use default
      const currentLevel =
        gameState.skills[skillId]?.level || skillConfig.level;
      const currentExp = gameState.skills[skillId]?.experience || 0;

      skills[skillId] = {
        ...skillConfig,
        level: currentLevel,
        experience: currentExp,
        maxExperience: calculateRequiredExperience(currentLevel),
        efficiency: calculateEfficiencyForLevel(currentLevel),
      };
    });

    return skills;
  }, [
    gameState.skills,
    calculateRequiredExperience,
    calculateEfficiencyForLevel,
  ]);

  const initialSkills = useMemo(() => initializeSkills(), [initializeSkills]);

  const [state, setState] = useState<ActivityManagerState>({
    skills: initialSkills,
    totalLevel: 0,
    isRunning: false,
  });

  // Update total level when skills change
  useEffect(() => {
    const totalLevel = Object.values(state.skills).reduce(
      (sum, skill) => sum + skill.level,
      0
    );
    setState(prev => ({ ...prev, totalLevel }));
  }, [state.skills]);

  // Sync with gameState when it changes
  useEffect(() => {
    setState(prev => {
      const updatedSkills = { ...prev.skills };

      Object.entries(gameState.skills).forEach(([skillId, gameSkill]) => {
        if (updatedSkills[skillId]) {
          updatedSkills[skillId] = {
            ...updatedSkills[skillId],
            level: gameSkill.level,
            experience: gameSkill.experience,
            isActive: gameSkill.isActive,
            progress: gameSkill.progress,
            maxExperience: calculateRequiredExperience(gameSkill.level),
          };
        }
      });

      return { ...prev, skills: updatedSkills };
    });
  }, [gameState.skills, calculateRequiredExperience]);

  // Game loop for active skills
  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      setState(prev => {
        const updatedSkills = { ...prev.skills };
        let hasChanges = false;

        Object.values(updatedSkills).forEach(skill => {
          if (skill.isActive) {
            // Increase progress
            const progressIncrement = 100 / skill.baseTime;
            const newProgress = Math.min(
              100,
              skill.progress + progressIncrement
            );

            if (newProgress !== skill.progress) {
              skill.progress = newProgress;
              hasChanges = true;
            }

            // Complete cycle
            if (skill.progress >= 100) {
              skill.progress = 0;
              skill.experience += 10;
              hasChanges = true;

              // Check for level up
              const requiredExp = calculateRequiredExperience(skill.level);
              if (skill.experience >= requiredExp) {
                skill.level += 1;
                skill.experience -= requiredExp;
                skill.maxExperience = calculateRequiredExperience(skill.level);
                skill.efficiency = calculateEfficiencyForLevel(skill.level);
                hasChanges = true;
              }
            }
          }
        });

        return hasChanges ? { ...prev, skills: updatedSkills } : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    state.isRunning,
    calculateRequiredExperience,
    calculateEfficiencyForLevel,
  ]);

  // Get skill by ID
  const getSkill = useCallback(
    (skillId: string): ActivitySkill | null => {
      return state.skills[skillId] || null;
    },
    [state.skills]
  );

  // Get all skills
  const getAllSkills = useCallback((): ActivitySkill[] => {
    return Object.values(state.skills);
  }, [state.skills]);

  // Get skill level
  const getSkillLevel = useCallback(
    (skillId: string): number => {
      return state.skills[skillId]?.level || 1;
    },
    [state.skills]
  );

  // Get skill experience
  const getSkillExperience = useCallback(
    (skillId: string): number => {
      return state.skills[skillId]?.experience || 0;
    },
    [state.skills]
  );

  // Get skill progress
  const getSkillProgress = useCallback(
    (skillId: string): number => {
      return state.skills[skillId]?.progress || 0;
    },
    [state.skills]
  );

  // Start skill
  const startSkill = useCallback(
    (skillId: string): boolean => {
      if (!state.skills[skillId]) return false;

      setState(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillId]: {
            ...prev.skills[skillId],
            isActive: true,
          },
        },
      }));

      return true;
    },
    [state.skills]
  );

  // Stop skill
  const stopSkill = useCallback(
    (skillId: string): void => {
      if (!state.skills[skillId]) return;

      setState(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillId]: {
            ...prev.skills[skillId],
            isActive: false,
            progress: 0,
          },
        },
      }));
    },
    [state.skills]
  );

  // Stop all skills
  const stopAllSkills = useCallback((): void => {
    setState(prev => {
      const updatedSkills = { ...prev.skills };
      Object.keys(updatedSkills).forEach(skillId => {
        updatedSkills[skillId] = {
          ...updatedSkills[skillId],
          isActive: false,
          progress: 0,
        };
      });
      return { ...prev, skills: updatedSkills };
    });
  }, []);

  // Add experience to skill
  const addExperience = useCallback(
    (skillId: string, amount: number): void => {
      if (!state.skills[skillId]) return;

      setState(prev => {
        const skill = prev.skills[skillId];
        const newExperience = skill.experience + amount;
        const requiredExp = calculateRequiredExperience(skill.level);

        let newLevel = skill.level;
        let remainingExp = newExperience;

        // Check for level ups
        while (remainingExp >= requiredExp) {
          newLevel += 1;
          remainingExp -= requiredExp;
        }

        return {
          ...prev,
          skills: {
            ...prev.skills,
            [skillId]: {
              ...skill,
              level: newLevel,
              experience: remainingExp,
              maxExperience: calculateRequiredExperience(newLevel),
              efficiency: calculateEfficiencyForLevel(newLevel),
            },
          },
        };
      });
    },
    [state.skills, calculateRequiredExperience, calculateEfficiencyForLevel]
  );

  // Set skill level
  const setSkillLevel = useCallback(
    (skillId: string, level: number): void => {
      if (!state.skills[skillId] || level < 1) return;

      setState(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillId]: {
            ...prev.skills[skillId],
            level,
            maxExperience: calculateRequiredExperience(level),
            efficiency: calculateEfficiencyForLevel(level),
          },
        },
      }));
    },
    [state.skills, calculateRequiredExperience, calculateEfficiencyForLevel]
  );

  // Set skill experience
  const setSkillExperience = useCallback(
    (skillId: string, experience: number): void => {
      if (!state.skills[skillId] || experience < 0) return;

      setState(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillId]: {
            ...prev.skills[skillId],
            experience: Math.min(
              experience,
              prev.skills[skillId].maxExperience
            ),
          },
        },
      }));
    },
    [state.skills]
  );

  // Calculate efficiency
  const calculateEfficiency = useCallback(
    (skillId: string): number => {
      const skill = state.skills[skillId];
      if (!skill) return 0;
      return calculateEfficiencyForLevel(skill.level);
    },
    [state.skills, calculateEfficiencyForLevel]
  );

  // Get total level
  const getTotalLevel = useCallback((): number => {
    return state.totalLevel;
  }, [state.totalLevel]);

  // Start game
  const startGame = useCallback((): void => {
    setState(prev => ({ ...prev, isRunning: true }));
    startGameState();
  }, [startGameState]);

  // Stop game
  const stopGame = useCallback((): void => {
    setState(prev => ({ ...prev, isRunning: false }));
    stopAllSkills();
    stopGameState();
  }, [stopAllSkills, stopGameState]);

  // Toggle game
  const toggleGame = useCallback((): void => {
    if (state.isRunning) {
      stopGame();
    } else {
      startGame();
    }
  }, [state.isRunning, startGame, stopGame]);

  const contextValue: ActivityManagerContextType = {
    state,
    getSkill,
    getAllSkills,
    getSkillLevel,
    getSkillExperience,
    getSkillProgress,
    startSkill,
    stopSkill,
    stopAllSkills,
    addExperience,
    setSkillLevel,
    setSkillExperience,
    calculateRequiredExperience,
    calculateEfficiency,
    getTotalLevel,
    startGame,
    stopGame,
    toggleGame,
  };

  return (
    <ActivityManagerContext.Provider value={contextValue}>
      {children}
    </ActivityManagerContext.Provider>
  );
};

// Custom hook to use the activity manager
export const useActivityManager = (): ActivityManagerContextType => {
  const context = useContext(ActivityManagerContext);
  if (context === undefined) {
    throw new Error(
      'useActivityManager must be used within an ActivityManagerProvider'
    );
  }
  return context;
};

// Export individual hooks for specific functionality
export const useActivitySkills = () => {
  const {
    getSkill,
    getAllSkills,
    getSkillLevel,
    getSkillExperience,
    getSkillProgress,
  } = useActivityManager();
  return {
    getSkill,
    getAllSkills,
    getSkillLevel,
    getSkillExperience,
    getSkillProgress,
  };
};

export const useActivityControl = () => {
  const {
    startSkill,
    stopSkill,
    stopAllSkills,
    addExperience,
    startGame,
    stopGame,
    toggleGame,
  } = useActivityManager();
  return {
    startSkill,
    stopSkill,
    stopAllSkills,
    addExperience,
    startGame,
    stopGame,
    toggleGame,
  };
};

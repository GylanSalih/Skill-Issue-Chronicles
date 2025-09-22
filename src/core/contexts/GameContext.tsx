import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import {
  CHARACTER_CLASSES,
  CharacterClass,
  CharacterClassStats,
  getClassStats,
  getClassBaseStats,
  getAllCharacterClasses,
} from '../services/characterClasses';

// Character interface
export interface Character {
  id: string;
  name: string;
  gender: string;
  characterClass: string;
  characterClassId: string;
  level: number;
  experience: number;
  maxExperience: number;
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
    vitality: number;
    luck: number;
  };
  availableStatPoints: number;
  slotId: number;
  createdAt: string;
  lastLogin: string;
}

interface GameContextType {
  // Character Classes
  characterClasses: Record<string, CharacterClass>;
  getAllClasses: () => CharacterClass[];
  getClassById: (id: string) => CharacterClass | undefined;
  getClassStats: (characterClass: string) => CharacterClassStats;
  getClassBaseStats: (characterClass: string) => any;

  // Character Management
  currentCharacter: Character | null;
  characters: Record<number, Character>;
  setCurrentCharacter: (character: Character | null) => void;
  loadCharacters: () => void;
  saveCharacters: () => void;
  getCharacterBySlot: (slotId: number) => Character | null;

  // Stat Allocation
  allocateStatPoint: (
    statName: keyof Character['stats'],
    amount: number
  ) => boolean;
  resetStatAllocation: () => void;
  getPendingStatChanges: () => Record<string, number>;
  applyStatChanges: () => boolean;

  // Future: Add more game-related context here
  // - Game state
  // - Resources
  // - etc.
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(
    null
  );
  const [characters, setCharacters] = useState<Record<number, Character>>({});
  const [pendingStatChanges, setPendingStatChanges] = useState<
    Record<string, number>
  >({});

  // Load characters from localStorage
  const loadCharacters = () => {
    try {
      const savedCharacters = localStorage.getItem('idleGameCharacters');
      if (savedCharacters) {
        const parsedCharacters = JSON.parse(savedCharacters);
        setCharacters(parsedCharacters);
        console.log('GameContext - Loaded characters:', parsedCharacters);

        // Set first character as current if none is set
        if (!currentCharacter && Object.keys(parsedCharacters).length > 0) {
          const firstCharacter = Object.values(
            parsedCharacters
          )[0] as Character;
          setCurrentCharacter(firstCharacter);
        }
      }
    } catch (error) {
      console.error('Error loading characters:', error);
    }
  };

  // Lade Charaktere beim Mount - nur einmal
  useEffect(() => {
    loadCharacters();
  }, []); // Empty dependency array - only run once

  // Save characters to localStorage
  const saveCharacters = () => {
    try {
      localStorage.setItem('idleGameCharacters', JSON.stringify(characters));
    } catch (error) {
      console.error('Error saving characters:', error);
    }
  };

  // Get character by slot ID
  const getCharacterBySlot = (slotId: number): Character | null => {
    return characters[slotId] || null;
  };

  // Stat Allocation Functions
  const allocateStatPoint = (
    statName: keyof Character['stats'],
    amount: number
  ): boolean => {
    if (!currentCharacter) return false;

    const currentChanges = pendingStatChanges[statName] || 0;
    const newAmount = currentChanges + amount;
    const currentStatValue = currentCharacter.stats[statName];
    const newTotalValue = currentStatValue + newAmount;

    // Check if we have enough available points
    const totalUsedPoints = Object.values(pendingStatChanges).reduce(
      (sum, change) => sum + change,
      0
    );
    const availablePoints = currentCharacter.availableStatPoints;

    if (amount > 0 && totalUsedPoints + amount > availablePoints) {
      return false; // Not enough points
    }

    if (amount < 0 && newAmount < 0) {
      return false; // Can't go below base stats
    }

    if (newTotalValue < 0) {
      return false; // Can't have negative stats
    }

    // Update pending changes
    setPendingStatChanges(prev => ({
      ...prev,
      [statName]: newAmount,
    }));

    return true;
  };

  const resetStatAllocation = () => {
    setPendingStatChanges({});
  };

  const getPendingStatChanges = () => {
    return pendingStatChanges;
  };

  // Apply stat changes to character
  const applyStatChanges = () => {
    if (!currentCharacter) return false;

    const totalChanges = Object.values(pendingStatChanges).reduce(
      (sum, change) => sum + change,
      0
    );

    if (totalChanges > currentCharacter.availableStatPoints) {
      return false; // Not enough points
    }

    // Update character with new stats
    const updatedCharacter = {
      ...currentCharacter,
      stats: {
        ...currentCharacter.stats,
        strength:
          currentCharacter.stats.strength + (pendingStatChanges.strength || 0),
        agility:
          currentCharacter.stats.agility + (pendingStatChanges.agility || 0),
        intelligence:
          currentCharacter.stats.intelligence +
          (pendingStatChanges.intelligence || 0),
        vitality:
          currentCharacter.stats.vitality + (pendingStatChanges.vitality || 0),
        luck: currentCharacter.stats.luck + (pendingStatChanges.luck || 0),
      },
      availableStatPoints: currentCharacter.availableStatPoints - totalChanges,
    };

    // Update characters and current character
    setCharacters(prev => ({
      ...prev,
      [currentCharacter.slotId]: updatedCharacter,
    }));
    setCurrentCharacter(updatedCharacter);
    setPendingStatChanges({});

    return true;
  };

  // Save characters when they change
  useEffect(() => {
    if (Object.keys(characters).length > 0) {
      saveCharacters();
    }
  }, [characters]);

  const contextValue: GameContextType = {
    characterClasses: CHARACTER_CLASSES,
    getAllClasses: getAllCharacterClasses,
    getClassById: (id: string) => CHARACTER_CLASSES[id],
    getClassStats,
    getClassBaseStats,

    // Character Management
    currentCharacter,
    characters,
    setCurrentCharacter,
    loadCharacters,
    saveCharacters,
    getCharacterBySlot,

    // Stat Allocation
    allocateStatPoint,
    resetStatAllocation,
    getPendingStatChanges,
    applyStatChanges,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// Export individual hooks for specific functionality
export const useCharacterClasses = () => {
  const { characterClasses, getAllClasses, getClassById } = useGame();
  return { characterClasses, getAllClasses, getClassById };
};

export const useCharacterStats = () => {
  const { getClassStats, getClassBaseStats } = useGame();
  return { getClassStats, getClassBaseStats };
};

export const useCharacter = () => {
  const {
    currentCharacter,
    characters,
    setCurrentCharacter,
    loadCharacters,
    saveCharacters,
    getCharacterBySlot,
  } = useGame();
  return {
    currentCharacter,
    characters,
    setCurrentCharacter,
    loadCharacters,
    saveCharacters,
    getCharacterBySlot,
  };
};

export const useStatAllocation = () => {
  const {
    currentCharacter,
    allocateStatPoint,
    resetStatAllocation,
    getPendingStatChanges,
    applyStatChanges,
  } = useGame();
  return {
    currentCharacter,
    allocateStatPoint,
    resetStatAllocation,
    getPendingStatChanges,
    applyStatChanges,
  };
};

export interface WoodTypeConfig {
  id: string;
  name: string;
  image: string;
  requiredLevel: number;
  baseReward: number;
  baseTime: number; // in Sekunden
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  description: string;
  // Individuelle Stats pro Holzart
  stats: {
    minReward: number;
    maxReward: number;
    essenceChance: number;
    rareChance: number;
    experienceGain: number;
    staminaCost: number;
  };
  // Spezielle Eigenschaften
  specialProperties?: {
    glowing?: boolean;
    magical?: boolean;
    elemental?: 'fire' | 'ice' | 'light' | 'dark' | 'void';
    durability?: number;
  };
}

export const WOOD_TYPES: Record<string, WoodTypeConfig> = {
  normalWood: {
    id: 'normalWood',
    name: 'Normal Wood',
    image: '/img/img/Resources/Wood/NormalWood.png',
    requiredLevel: 1,
    baseReward: 1,
    baseTime: 3,
    rarity: 'common',
    description: 'Basic wood for crafting',
    stats: {
      minReward: 1,
      maxReward: 2,
      essenceChance: 0.01,
      rareChance: 0.001,
      experienceGain: 5,
      staminaCost: 1,
    },
  },
  softwood: {
    id: 'softwood',
    name: 'Softwood',
    image: '/img/img/Resources/Wood/Softwood.png',
    requiredLevel: 3,
    baseReward: 2,
    baseTime: 4,
    rarity: 'common',
    description: 'Light and easy to work with',
    stats: {
      minReward: 2,
      maxReward: 4,
      essenceChance: 0.015,
      rareChance: 0.002,
      experienceGain: 8,
      staminaCost: 1,
    },
  },
  willowWood: {
    id: 'willowWood',
    name: 'Willow Wood',
    image: '/img/img/Resources/Wood/WillowWood.png',
    requiredLevel: 5,
    baseReward: 3,
    baseTime: 5,
    rarity: 'uncommon',
    description: 'Flexible and durable',
    stats: {
      minReward: 3,
      maxReward: 6,
      essenceChance: 0.02,
      rareChance: 0.003,
      experienceGain: 12,
      staminaCost: 2,
    },
  },
  glowwood: {
    id: 'glowwood',
    name: 'Glowwood',
    image: '/img/img/Resources/Wood/Glowwood.png',
    requiredLevel: 8,
    baseReward: 5,
    baseTime: 6,
    rarity: 'rare',
    description: 'Magically glowing wood',
    stats: {
      minReward: 5,
      maxReward: 10,
      essenceChance: 0.03,
      rareChance: 0.005,
      experienceGain: 18,
      staminaCost: 3,
    },
    specialProperties: {
      glowing: true,
      magical: true,
    },
  },
  frostbark: {
    id: 'frostbark',
    name: 'Frostbark',
    image: '/img/img/Resources/Wood/Frostbark.png',
    requiredLevel: 12,
    baseReward: 7,
    baseTime: 8,
    rarity: 'rare',
    description: 'Ice-cold bark from frozen trees',
    stats: {
      minReward: 7,
      maxReward: 14,
      essenceChance: 0.04,
      rareChance: 0.008,
      experienceGain: 25,
      staminaCost: 4,
    },
    specialProperties: {
      elemental: 'ice',
      magical: true,
    },
  },
  ebonyWood: {
    id: 'ebonyWood',
    name: 'Ebony Wood',
    image: '/img/img/Resources/Wood/EbonyWood.png',
    requiredLevel: 15,
    baseReward: 10,
    baseTime: 10,
    rarity: 'epic',
    description: 'Dark and mysterious wood',
    stats: {
      minReward: 10,
      maxReward: 20,
      essenceChance: 0.05,
      rareChance: 0.01,
      experienceGain: 35,
      staminaCost: 5,
    },
    specialProperties: {
      elemental: 'dark',
      magical: true,
      durability: 100,
    },
  },
  voidbark: {
    id: 'voidbark',
    name: 'Voidbark',
    image: '/img/img/Resources/Wood/Voidbark.png',
    requiredLevel: 20,
    baseReward: 15,
    baseTime: 12,
    rarity: 'epic',
    description: 'Wood from the void dimension',
    stats: {
      minReward: 15,
      maxReward: 30,
      essenceChance: 0.06,
      rareChance: 0.015,
      experienceGain: 50,
      staminaCost: 6,
    },
    specialProperties: {
      elemental: 'void',
      magical: true,
      durability: 150,
    },
  },
  yangWood: {
    id: 'yangWood',
    name: 'Yang Wood',
    image: '/img/img/Resources/Wood/YangWood.png',
    requiredLevel: 25,
    baseReward: 20,
    baseTime: 15,
    rarity: 'legendary',
    description: 'Wood of pure light energy',
    stats: {
      minReward: 20,
      maxReward: 40,
      essenceChance: 0.08,
      rareChance: 0.02,
      experienceGain: 75,
      staminaCost: 8,
    },
    specialProperties: {
      elemental: 'light',
      magical: true,
      glowing: true,
      durability: 200,
    },
  },
  yingWood: {
    id: 'yingWood',
    name: 'Ying Wood',
    image: '/img/img/Resources/Wood/YingWood.png',
    requiredLevel: 25,
    baseReward: 20,
    baseTime: 15,
    rarity: 'legendary',
    description: 'Wood of pure dark energy',
    stats: {
      minReward: 20,
      maxReward: 40,
      essenceChance: 0.08,
      rareChance: 0.02,
      experienceGain: 75,
      staminaCost: 8,
    },
    specialProperties: {
      elemental: 'dark',
      magical: true,
      durability: 200,
    },
  },
};

// Hilfsfunktionen für Wood-Types
export const getWoodTypeById = (id: string): WoodTypeConfig | undefined => {
  return WOOD_TYPES[id];
};

export const getAllWoodTypes = (): WoodTypeConfig[] => {
  return Object.values(WOOD_TYPES);
};

export const getWoodTypesByRarity = (rarity: string): WoodTypeConfig[] => {
  return Object.values(WOOD_TYPES).filter(wood => wood.rarity === rarity);
};

export const getUnlockedWoodTypes = (
  currentLevel: number
): WoodTypeConfig[] => {
  return Object.values(WOOD_TYPES).filter(
    wood => wood.requiredLevel <= currentLevel
  );
};

export const getWoodRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'common':
      return '#9ca3af';
    case 'uncommon':
      return '#10b981';
    case 'rare':
      return '#3b82f6';
    case 'epic':
      return '#8b5cf6';
    case 'legendary':
      return '#f59e0b';
    default:
      return '#9ca3af';
  }
};

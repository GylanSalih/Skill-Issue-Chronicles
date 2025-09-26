/**
 * 🎯 SKILL DEFINITIONS - ALLE SKILLS & AKTIVITÄTEN
 *
 * Hier werden ALLE Skills und deren Aktivitäten definiert.
 * Diese Datei ist die zentrale Quelle für alle Skill-Daten.
 *
 * ✨ Unterstützte Skills:
 * - Woodcutting (Holzfällen)
 * - Mining (Bergbau)
 * - Fishing (Angeln)
 * - Cooking (Kochen)
 * - Smithing (Schmieden)
 * - Fletching (Bogenbau)
 * - Firemaking (Feuermachen)
 * - Runecrafting (Runenkunde)
 * - Herblore (Kräuterkunde)
 */

import { ActivityDefinition, SkillDefinition, SkillType } from './MelvorEngine';

// Import wood images
import ebonyWoodImg from '../../assets/img/Resources/Wood/EbonyWood.png';
import frostbarkImg from '../../assets/img/Resources/Wood/Frostbark.png';
import glowwoodImg from '../../assets/img/Resources/Wood/Glowwood.png';
import normalWoodImg from '../../assets/img/Resources/Wood/NormalWood.png';
import softwoodImg from '../../assets/img/Resources/Wood/Softwood.png';
import voidbarkImg from '../../assets/img/Resources/Wood/Voidbark.png';
import willowWoodImg from '../../assets/img/Resources/Wood/WillowWood.png';
import yangWoodImg from '../../assets/img/Resources/Wood/YangWood.png';
import yingWoodImg from '../../assets/img/Resources/Wood/YingWood.png';

// ==================== EXPERIENCE TABLES ====================

/**
 * Standard Melvor Idle Experience Table
 * Level 1-99: Standard progression
 * Level 100+: Extended progression für High-Level Content
 */
export const STANDARD_EXPERIENCE_TABLE: number[] = [
  // Level 1-10
  83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358,
  // Level 11-20
  1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470, 5018,
  // Level 21-30
  5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833,
  // Level 31-40
  16456, 18247, 20224, 22406, 24815, 27473, 30408, 33648, 37224, 41171,
  // Level 41-50
  45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333, 111945,
  // Level 51-60
  123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742,
  302288,
  // Level 61-70
  333804, 368599, 407015, 449428, 496254, 547953, 605032, 668051, 737627,
  814445,
  // Level 71-80
  899257, 992895, 1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 1986068,
  2192818,
  // Level 81-90
  2421087, 2672296, 2948062, 3250287, 3581171, 3943616, 4340637, 4776353,
  5254093, 5777380,
  // Level 91-99
  6349924, 6975636, 7658648, 8404398, 9217642, 10103414, 11066047, 12111111,
  13243667, 14470411,
  // Level 100+ (Extended)
  15800000, 17250000, 18820000, 20530000, 22400000, 24450000, 26700000,
  29170000, 31880000, 34860000,
];

/**
 * Schnellere Progression für bestimmte Skills
 */
export const FAST_EXPERIENCE_TABLE: number[] = STANDARD_EXPERIENCE_TABLE.map(
  xp => Math.floor(xp * 0.8)
);

/**
 * Langsamere Progression für Elite Skills
 */
export const SLOW_EXPERIENCE_TABLE: number[] = STANDARD_EXPERIENCE_TABLE.map(
  xp => Math.floor(xp * 1.3)
);

// ==================== WOODCUTTING SKILL ====================

const WOODCUTTING_ACTIVITIES: Record<string, ActivityDefinition> = {
  normalWood: {
    id: 'normalWood',
    name: 'Normal Wood',
    skillId: 'woodcutting',
    requiredLevel: 1,
    baseTime: 3,
    baseRewards: [
      {
        resourceType: 'wood',
        resourceId: 'normalWood',
        minAmount: 1,
        maxAmount: 2,
        chance: 1.0,
        experienceGain: 5,
      },
      {
        resourceType: 'essence',
        resourceId: 'woodcuttingEssence',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.01,
        experienceGain: 0,
      },
    ],
    requirements: [{ type: 'stamina', amount: 1 }],
    rarity: 'common',
    image: normalWoodImg,
    description: 'Basic wood perfect for beginners. Easy to chop and abundant.',
  },

  softwood: {
    id: 'softwood',
    name: 'Softwood',
    skillId: 'woodcutting',
    requiredLevel: 3,
    baseTime: 4,
    baseRewards: [
      {
        resourceType: 'wood',
        resourceId: 'softwood',
        minAmount: 2,
        maxAmount: 4,
        chance: 1.0,
        experienceGain: 8,
      },
      {
        resourceType: 'essence',
        resourceId: 'woodcuttingEssence',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.015,
        experienceGain: 0,
      },
    ],
    requirements: [{ type: 'stamina', amount: 1 }],
    rarity: 'common',
    image: softwoodImg,
    description: 'Light and easy to work with. Popular among crafters.',
  },

  willowWood: {
    id: 'willowWood',
    name: 'Willow Wood',
    skillId: 'woodcutting',
    requiredLevel: 5,
    baseTime: 5,
    baseRewards: [
      {
        resourceType: 'wood',
        resourceId: 'willowWood',
        minAmount: 3,
        maxAmount: 6,
        chance: 1.0,
        experienceGain: 12,
      },
      {
        resourceType: 'essence',
        resourceId: 'woodcuttingEssence',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.02,
        experienceGain: 0,
      },
      {
        resourceType: 'rare_items',
        resourceId: 'willowBark',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.003,
        experienceGain: 0,
      },
    ],
    requirements: [{ type: 'stamina', amount: 2 }],
    rarity: 'uncommon',
    image: willowWoodImg,
    description: 'Flexible and durable. Excellent for advanced crafting.',
  },

  glowwood: {
    id: 'glowwood',
    name: 'Glowwood',
    skillId: 'woodcutting',
    requiredLevel: 8,
    baseTime: 6,
    baseRewards: [
      {
        resourceType: 'wood',
        resourceId: 'glowwood',
        minAmount: 5,
        maxAmount: 10,
        chance: 1.0,
        experienceGain: 18,
      },
      {
        resourceType: 'essence',
        resourceId: 'magicalEssence',
        minAmount: 1,
        maxAmount: 2,
        chance: 0.03,
        experienceGain: 0,
      },
      {
        resourceType: 'rare_items',
        resourceId: 'glowingResin',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.005,
        experienceGain: 0,
      },
    ],
    requirements: [{ type: 'stamina', amount: 3 }],
    rarity: 'rare',
    image: glowwoodImg,
    description:
      'Magically glowing wood that emanates a warm light. Highly sought after.',
  },

  frostbark: {
    id: 'frostbark',
    name: 'Frostbark',
    skillId: 'woodcutting',
    requiredLevel: 12,
    baseTime: 8,
    baseRewards: [
      {
        resourceType: 'wood',
        resourceId: 'frostbark',
        minAmount: 7,
        maxAmount: 14,
        chance: 1.0,
        experienceGain: 25,
      },
      {
        resourceType: 'essence',
        resourceId: 'iceEssence',
        minAmount: 1,
        maxAmount: 2,
        chance: 0.04,
        experienceGain: 0,
      },
      {
        resourceType: 'rare_items',
        resourceId: 'frozenSap',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.008,
        experienceGain: 0,
      },
    ],
    requirements: [{ type: 'stamina', amount: 4 }],
    rarity: 'rare',
    image: frostbarkImg,
    description:
      'Ice-cold bark from frozen trees. Contains elemental ice properties.',
  },

  ebonyWood: {
    id: 'ebonyWood',
    name: 'Ebony Wood',
    skillId: 'woodcutting',
    requiredLevel: 15,
    baseTime: 10,
    baseRewards: [
      {
        resourceType: 'wood',
        resourceId: 'ebonyWood',
        minAmount: 10,
        maxAmount: 20,
        chance: 1.0,
        experienceGain: 35,
      },
      {
        resourceType: 'essence',
        resourceId: 'darkEssence',
        minAmount: 1,
        maxAmount: 3,
        chance: 0.05,
        experienceGain: 0,
      },
      {
        resourceType: 'rare_items',
        resourceId: 'shadowCore',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.01,
        experienceGain: 0,
      },
    ],
    requirements: [{ type: 'stamina', amount: 5 }],
    rarity: 'epic',
    image: ebonyWoodImg,
    description:
      'Dark and mysterious wood imbued with shadow magic. Extremely valuable.',
  },

  voidbark: {
    id: 'voidbark',
    name: 'Voidbark',
    skillId: 'woodcutting',
    requiredLevel: 20,
    baseTime: 12,
    baseRewards: [
      {
        resourceType: 'wood',
        resourceId: 'voidbark',
        minAmount: 15,
        maxAmount: 30,
        chance: 1.0,
        experienceGain: 50,
      },
      {
        resourceType: 'essence',
        resourceId: 'voidEssence',
        minAmount: 2,
        maxAmount: 4,
        chance: 0.06,
        experienceGain: 0,
      },
      {
        resourceType: 'rare_items',
        resourceId: 'voidCrystal',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.015,
        experienceGain: 0,
      },
    ],
    requirements: [{ type: 'stamina', amount: 6 }],
    rarity: 'epic',
    image: voidbarkImg,
    description:
      'Wood from the void dimension. Pulsates with otherworldly energy.',
  },

  yangWood: {
    id: 'yangWood',
    name: 'Yang Wood',
    skillId: 'woodcutting',
    requiredLevel: 25,
    baseTime: 15,
    baseRewards: [
      {
        resourceType: 'wood',
        resourceId: 'yangWood',
        minAmount: 20,
        maxAmount: 40,
        chance: 1.0,
        experienceGain: 75,
      },
      {
        resourceType: 'essence',
        resourceId: 'lightEssence',
        minAmount: 3,
        maxAmount: 5,
        chance: 0.08,
        experienceGain: 0,
      },
      {
        resourceType: 'rare_items',
        resourceId: 'celestialCore',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.02,
        experienceGain: 0,
      },
    ],
    requirements: [{ type: 'stamina', amount: 8 }],
    rarity: 'legendary',
    image: yangWoodImg,
    description: 'Wood of pure light energy. Radiates divine power and warmth.',
  },

  yingWood: {
    id: 'yingWood',
    name: 'Ying Wood',
    skillId: 'woodcutting',
    requiredLevel: 25,
    baseTime: 15,
    baseRewards: [
      {
        resourceType: 'wood',
        resourceId: 'yingWood',
        minAmount: 20,
        maxAmount: 40,
        chance: 1.0,
        experienceGain: 75,
      },
      {
        resourceType: 'essence',
        resourceId: 'darkEssence',
        minAmount: 3,
        maxAmount: 5,
        chance: 0.08,
        experienceGain: 0,
      },
      {
        resourceType: 'rare_items',
        resourceId: 'abyssalCore',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.02,
        experienceGain: 0,
      },
    ],
    requirements: [{ type: 'stamina', amount: 8 }],
    rarity: 'legendary',
    image: yingWoodImg,
    description:
      'Wood of pure dark energy. Absorbs light and emanates mysterious power.',
  },
};

// ==================== MINING SKILL ====================

const MINING_ACTIVITIES: Record<string, ActivityDefinition> = {
  copperOre: {
    id: 'copperOre',
    name: 'Copper Ore',
    skillId: 'mining',
    requiredLevel: 1,
    baseTime: 4,
    baseRewards: [
      {
        resourceType: 'ore',
        resourceId: 'copperOre',
        minAmount: 1,
        maxAmount: 2,
        chance: 1.0,
        experienceGain: 6,
      },
    ],
    requirements: [{ type: 'stamina', amount: 2 }],
    rarity: 'common',
    description: 'Basic copper ore. Foundation of all smithing.',
  },

  ironOre: {
    id: 'ironOre',
    name: 'Iron Ore',
    skillId: 'mining',
    requiredLevel: 5,
    baseTime: 6,
    baseRewards: [
      {
        resourceType: 'ore',
        resourceId: 'ironOre',
        minAmount: 1,
        maxAmount: 3,
        chance: 1.0,
        experienceGain: 10,
      },
    ],
    requirements: [{ type: 'stamina', amount: 3 }],
    rarity: 'common',
    description: 'Strong iron ore. Essential for quality equipment.',
  },

  goldOre: {
    id: 'goldOre',
    name: 'Gold Ore',
    skillId: 'mining',
    requiredLevel: 10,
    baseTime: 8,
    baseRewards: [
      {
        resourceType: 'ore',
        resourceId: 'goldOre',
        minAmount: 1,
        maxAmount: 2,
        chance: 1.0,
        experienceGain: 20,
      },
    ],
    requirements: [{ type: 'stamina', amount: 4 }],
    rarity: 'uncommon',
    description: 'Precious gold ore. Valuable and beautiful.',
  },

  mithrilOre: {
    id: 'mithrilOre',
    name: 'Mithril Ore',
    skillId: 'mining',
    requiredLevel: 20,
    baseTime: 12,
    baseRewards: [
      {
        resourceType: 'ore',
        resourceId: 'mithrilOre',
        minAmount: 1,
        maxAmount: 2,
        chance: 1.0,
        experienceGain: 40,
      },
    ],
    requirements: [{ type: 'stamina', amount: 6 }],
    rarity: 'rare',
    description: 'Legendary mithril ore. Light as a feather, strong as steel.',
  },
};

// ==================== FISHING SKILL ====================

const FISHING_ACTIVITIES: Record<string, ActivityDefinition> = {
  rawShrimp: {
    id: 'rawShrimp',
    name: 'Raw Shrimp',
    skillId: 'fishing',
    requiredLevel: 1,
    baseTime: 3,
    baseRewards: [
      {
        resourceType: 'fish',
        resourceId: 'rawShrimp',
        minAmount: 1,
        maxAmount: 1,
        chance: 1.0,
        experienceGain: 4,
      },
    ],
    requirements: [{ type: 'stamina', amount: 1 }],
    rarity: 'common',
    description: 'Small shrimp. Perfect for beginners.',
  },

  rawSardine: {
    id: 'rawSardine',
    name: 'Raw Sardine',
    skillId: 'fishing',
    requiredLevel: 3,
    baseTime: 4,
    baseRewards: [
      {
        resourceType: 'fish',
        resourceId: 'rawSardine',
        minAmount: 1,
        maxAmount: 2,
        chance: 1.0,
        experienceGain: 7,
      },
    ],
    requirements: [{ type: 'stamina', amount: 1 }],
    rarity: 'common',
    description: 'Common sardine. Good source of nutrition.',
  },

  rawSalmon: {
    id: 'rawSalmon',
    name: 'Raw Salmon',
    skillId: 'fishing',
    requiredLevel: 10,
    baseTime: 8,
    baseRewards: [
      {
        resourceType: 'fish',
        resourceId: 'rawSalmon',
        minAmount: 1,
        maxAmount: 1,
        chance: 1.0,
        experienceGain: 25,
      },
    ],
    requirements: [{ type: 'stamina', amount: 3 }],
    rarity: 'uncommon',
    description: 'Prized salmon. Excellent for cooking.',
  },
};

// ==================== COOKING SKILL ====================

const COOKING_ACTIVITIES: Record<string, ActivityDefinition> = {
  cookedShrimp: {
    id: 'cookedShrimp',
    name: 'Cooked Shrimp',
    skillId: 'cooking',
    requiredLevel: 1,
    baseTime: 2,
    baseRewards: [
      {
        resourceType: 'food',
        resourceId: 'cookedShrimp',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.9, // 10% burn chance
        experienceGain: 6,
      },
    ],
    requirements: [{ type: 'resource', amount: 1, resourceId: 'rawShrimp' }],
    rarity: 'common',
    description: 'Simple cooked shrimp. Restores health.',
  },

  cookedSardine: {
    id: 'cookedSardine',
    name: 'Cooked Sardine',
    skillId: 'cooking',
    requiredLevel: 3,
    baseTime: 3,
    baseRewards: [
      {
        resourceType: 'food',
        resourceId: 'cookedSardine',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.85,
        experienceGain: 10,
      },
    ],
    requirements: [{ type: 'resource', amount: 1, resourceId: 'rawSardine' }],
    rarity: 'common',
    description: 'Tasty cooked sardine. Good healing properties.',
  },

  cookedSalmon: {
    id: 'cookedSalmon',
    name: 'Cooked Salmon',
    skillId: 'cooking',
    requiredLevel: 10,
    baseTime: 5,
    baseRewards: [
      {
        resourceType: 'food',
        resourceId: 'cookedSalmon',
        minAmount: 1,
        maxAmount: 1,
        chance: 0.8,
        experienceGain: 30,
      },
    ],
    requirements: [{ type: 'resource', amount: 1, resourceId: 'rawSalmon' }],
    rarity: 'uncommon',
    description: 'Delicious cooked salmon. Excellent healing and buffs.',
  },
};

// ==================== SMITHING SKILL ====================

const SMITHING_ACTIVITIES: Record<string, ActivityDefinition> = {
  copperBar: {
    id: 'copperBar',
    name: 'Copper Bar',
    skillId: 'smithing',
    requiredLevel: 1,
    baseTime: 5,
    baseRewards: [
      {
        resourceType: 'bars',
        resourceId: 'copperBar',
        minAmount: 1,
        maxAmount: 1,
        chance: 1.0,
        experienceGain: 8,
      },
    ],
    requirements: [{ type: 'resource', amount: 2, resourceId: 'copperOre' }],
    rarity: 'common',
    description: 'Basic copper bar. Used for beginner equipment.',
  },

  ironBar: {
    id: 'ironBar',
    name: 'Iron Bar',
    skillId: 'smithing',
    requiredLevel: 5,
    baseTime: 7,
    baseRewards: [
      {
        resourceType: 'bars',
        resourceId: 'ironBar',
        minAmount: 1,
        maxAmount: 1,
        chance: 1.0,
        experienceGain: 15,
      },
    ],
    requirements: [{ type: 'resource', amount: 3, resourceId: 'ironOre' }],
    rarity: 'common',
    description: 'Strong iron bar. Foundation of quality weapons.',
  },
};

// ==================== SKILL DEFINITIONS EXPORT ====================

export const SKILL_DEFINITIONS: Record<SkillType, SkillDefinition> = {
  woodcutting: {
    id: 'woodcutting',
    name: 'Woodcutting',
    description:
      'Chop trees to gather various types of wood for crafting and construction.',
    maxLevel: 100,
    experienceTable: STANDARD_EXPERIENCE_TABLE,
    activities: WOODCUTTING_ACTIVITIES,
  },

  mining: {
    id: 'mining',
    name: 'Mining',
    description:
      'Extract precious ores and gems from the earth for smithing and crafting.',
    maxLevel: 100,
    experienceTable: STANDARD_EXPERIENCE_TABLE,
    activities: MINING_ACTIVITIES,
  },

  fishing: {
    id: 'fishing',
    name: 'Fishing',
    description:
      'Catch fish from various water sources for cooking and trading.',
    maxLevel: 100,
    experienceTable: FAST_EXPERIENCE_TABLE,
    activities: FISHING_ACTIVITIES,
  },

  cooking: {
    id: 'cooking',
    name: 'Cooking',
    description:
      'Prepare food that restores health and provides various buffs.',
    maxLevel: 100,
    experienceTable: FAST_EXPERIENCE_TABLE,
    activities: COOKING_ACTIVITIES,
  },

  smithing: {
    id: 'smithing',
    name: 'Smithing',
    description:
      'Forge weapons, armor, and tools from metal bars and materials.',
    maxLevel: 100,
    experienceTable: SLOW_EXPERIENCE_TABLE,
    activities: SMITHING_ACTIVITIES,
  },

  fletching: {
    id: 'fletching',
    name: 'Fletching',
    description:
      'Craft bows, arrows, and ranged weapons from wood and other materials.',
    maxLevel: 100,
    experienceTable: STANDARD_EXPERIENCE_TABLE,
    activities: {}, // TODO: Add fletching activities
  },

  firemaking: {
    id: 'firemaking',
    name: 'Firemaking',
    description: 'Light fires for warmth, cooking, and magical rituals.',
    maxLevel: 100,
    experienceTable: FAST_EXPERIENCE_TABLE,
    activities: {}, // TODO: Add firemaking activities
  },

  runecrafting: {
    id: 'runecrafting',
    name: 'Runecrafting',
    description: 'Create magical runes for spellcasting and enchantments.',
    maxLevel: 100,
    experienceTable: SLOW_EXPERIENCE_TABLE,
    activities: {}, // TODO: Add runecrafting activities
  },

  herblore: {
    id: 'herblore',
    name: 'Herblore',
    description:
      'Brew potions and create magical concoctions from herbs and materials.',
    maxLevel: 100,
    experienceTable: SLOW_EXPERIENCE_TABLE,
    activities: {}, // TODO: Add herblore activities
  },
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Hole Skill-Definition nach ID
 */
export function getSkillDefinition(
  skillId: SkillType
): SkillDefinition | undefined {
  return SKILL_DEFINITIONS[skillId];
}

/**
 * Hole alle Skill-Definitionen
 */
export function getAllSkillDefinitions(): Record<SkillType, SkillDefinition> {
  return SKILL_DEFINITIONS;
}

/**
 * Hole Activity-Definition
 */
export function getActivityDefinition(
  skillId: SkillType,
  activityId: string
): ActivityDefinition | undefined {
  const skill = SKILL_DEFINITIONS[skillId];
  return skill?.activities[activityId];
}

/**
 * Hole alle Activities für einen Skill
 */
export function getSkillActivities(
  skillId: SkillType
): Record<string, ActivityDefinition> {
  const skill = SKILL_DEFINITIONS[skillId];
  return skill?.activities || {};
}

/**
 * Hole verfügbare Activities basierend auf Level
 */
export function getUnlockedActivities(
  skillId: SkillType,
  currentLevel: number
): ActivityDefinition[] {
  const activities = getSkillActivities(skillId);
  return Object.values(activities).filter(
    activity => activity.requiredLevel <= currentLevel
  );
}

/**
 * Hole Activities nach Rarity
 */
export function getActivitiesByRarity(
  skillId: SkillType,
  rarity: string
): ActivityDefinition[] {
  const activities = getSkillActivities(skillId);
  return Object.values(activities).filter(
    activity => activity.rarity === rarity
  );
}

/**
 * Berechne Experience für Level
 */
export function getExperienceForLevel(
  skillId: SkillType,
  level: number
): number {
  const skill = SKILL_DEFINITIONS[skillId];
  if (!skill || level <= 1) return 0;

  let totalExp = 0;
  for (let i = 0; i < Math.min(level - 1, skill.experienceTable.length); i++) {
    totalExp += skill.experienceTable[i];
  }

  return totalExp;
}

/**
 * Berechne Level aus Experience
 */
export function getLevelFromExperience(
  skillId: SkillType,
  totalExperience: number
): number {
  const skill = SKILL_DEFINITIONS[skillId];
  if (!skill) return 1;

  let level = 1;
  let expRequired = 0;

  for (let i = 0; i < skill.experienceTable.length; i++) {
    expRequired += skill.experienceTable[i];
    if (totalExperience >= expRequired) {
      level = i + 2; // +2 because array starts at 0 but level starts at 1
    } else {
      break;
    }
  }

  return Math.min(level, skill.maxLevel);
}

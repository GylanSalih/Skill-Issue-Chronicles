// Character Classes Configuration
export interface CharacterClassStats {
  attack: number;
  defense: number;
  magic: number;
  speed: number;
  health: number;
  mana: number;
}

export interface CharacterClass {
  id: string;
  name: string;
  description: string;
  image: string;
  stats: CharacterClassStats;
  baseStats: {
    strength: number;
    agility: number;
    intelligence: number;
    vitality: number;
    luck: number;
  };
}

export const CHARACTER_CLASSES: Record<string, CharacterClass> = {
  warrior: {
    id: 'warrior',
    name: 'Krieger',
    description: 'Starker Nahkämpfer mit hoher Verteidigung und Lebenspunkten',
    image: '/img/avatars/warrior.png',
    stats: {
      attack: 90,
      defense: 85,
      magic: 30,
      speed: 50,
      health: 95,
      mana: 40,
    },
    baseStats: {
      strength: 15,
      agility: 8,
      intelligence: 6,
      vitality: 13,
      luck: 8,
    },
  },
  mage: {
    id: 'mage',
    name: 'Magier',
    description: 'Mächtiger Zauberer mit hoher Magie und Mana',
    image: '/img/avatars/magier.png',
    stats: {
      attack: 40,
      defense: 35,
      magic: 95,
      speed: 60,
      health: 60,
      mana: 100,
    },
    baseStats: {
      strength: 4,
      agility: 6,
      intelligence: 15,
      vitality: 8,
      luck: 7,
    },
  },
  rogue: {
    id: 'rogue',
    name: 'Schurke',
    description:
      'Schneller Kämpfer mit hoher Geschwindigkeit und kritischen Treffern',
    image: '/img/avatars/schurke2.png',
    stats: {
      attack: 80,
      defense: 45,
      magic: 50,
      speed: 95,
      health: 70,
      mana: 60,
    },
    baseStats: {
      strength: 8,
      agility: 15,
      intelligence: 7,
      vitality: 10,
      luck: 12,
    },
  },
  archer: {
    id: 'archer',
    name: 'Bogenschütze',
    description: 'Präziser Fernkämpfer mit hoher Trefferquote',
    image: '/img/avatars/elfe.png',
    stats: {
      attack: 75,
      defense: 50,
      magic: 40,
      speed: 85,
      health: 75,
      mana: 55,
    },
    baseStats: {
      strength: 7,
      agility: 13,
      intelligence: 8,
      vitality: 10,
      luck: 12,
    },
  },
  healer: {
    id: 'healer',
    name: 'Heiler',
    description: 'Unterstützer mit Heilfähigkeiten und Buffs',
    image: '/img/avatars/heilerin.png',
    stats: {
      attack: 35,
      defense: 60,
      magic: 90,
      speed: 55,
      health: 85,
      mana: 95,
    },
    baseStats: {
      strength: 5,
      agility: 6,
      intelligence: 12,
      vitality: 13,
      luck: 9,
    },
  },
  berserker: {
    id: 'berserker',
    name: 'Berserker',
    description:
      'Brutaler Kämpfer mit enormem Schaden aber niedriger Verteidigung',
    image: '/img/avatars/berserk.png',
    stats: {
      attack: 100,
      defense: 40,
      magic: 20,
      speed: 70,
      health: 80,
      mana: 30,
    },
    baseStats: {
      strength: 17,
      agility: 9,
      intelligence: 4,
      vitality: 8,
      luck: 7,
    },
  },
  paladin: {
    id: 'paladin',
    name: 'Paladin',
    description: 'Ausgewogener Kämpfer mit Heilung und hoher Verteidigung',
    image: '/img/avatars/paladin.png',
    stats: {
      attack: 70,
      defense: 80,
      magic: 70,
      speed: 45,
      health: 90,
      mana: 80,
    },
    baseStats: {
      strength: 12,
      agility: 6,
      intelligence: 11,
      vitality: 12,
      luck: 9,
    },
  },
  assassin: {
    id: 'assassin',
    name: 'Assassine',
    description: 'Heimlicher Kämpfer mit Stealth-Fähigkeiten und hohem Schaden',
    image: '/img/avatars/assassine2.png',
    stats: {
      attack: 85,
      defense: 35,
      magic: 45,
      speed: 100,
      health: 65,
      mana: 50,
    },
    baseStats: {
      strength: 9,
      agility: 16,
      intelligence: 8,
      vitality: 9,
      luck: 11,
    },
  },
  tinkerer: {
    id: 'tinkerer',
    name: 'Tüftler',
    description: 'Handwerker mit technischen Fähigkeiten und Fallen',
    image: '/img/avatars/tuefftler.png',
    stats: {
      attack: 50,
      defense: 70,
      magic: 80,
      speed: 60,
      health: 75,
      mana: 85,
    },
    baseStats: {
      strength: 6,
      agility: 8,
      intelligence: 13,
      vitality: 10,
      luck: 8,
    },
  },
  elementalist: {
    id: 'elementalist',
    name: 'Elementarist',
    description: 'Meister der Elementar-Magie mit verschiedenen Elementen',
    image: '/img/avatars/elementarist.png',
    stats: {
      attack: 45,
      defense: 40,
      magic: 100,
      speed: 65,
      health: 70,
      mana: 90,
    },
    baseStats: {
      strength: 5,
      agility: 7,
      intelligence: 16,
      vitality: 9,
      luck: 8,
    },
  },
};

// Helper function to get class stats
export const getClassStats = (characterClass: string): CharacterClassStats => {
  const classData = CHARACTER_CLASSES[characterClass];
  return classData ? classData.stats : CHARACTER_CLASSES.warrior.stats;
};

// Helper function to get base stats for character creation
export const getClassBaseStats = (characterClass: string) => {
  const classData = CHARACTER_CLASSES[characterClass];
  return classData ? classData.baseStats : CHARACTER_CLASSES.warrior.baseStats;
};

// Get all character classes as array
export const getAllCharacterClasses = (): CharacterClass[] => {
  return Object.values(CHARACTER_CLASSES);
};

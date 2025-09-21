export interface Boss {
  id: string;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  avatar: string;
  type: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  rewards: {
    experience: number;
    gold: number;
    items: string[];
  };
  description: string;
  specialAbilities: string[];
}

export interface TowerFloor {
  id: number;
  name: string;
  boss: Boss;
  isUnlocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme' | 'Nightmare';
}

export const bossTowerFloors: TowerFloor[] = [
  {
    id: 1,
    name: 'Ground Floor',
    isUnlocked: true,
    isCompleted: false,
    isCurrent: true,
    difficulty: 'Easy',
    boss: {
      id: 'goblin_king',
      name: 'Goblin King',
      level: 20,
      health: 500,
      maxHealth: 500,
      attack: 60,
      defense: 30,
      avatar: '/assets/img/avatars/elfe.png',
      type: 'Goblin',
      rarity: 'common',
      rewards: { 
        experience: 100, 
        gold: 200, 
        items: ['Goblin Crown', 'Rusty Dagger', 'Goblin Tooth'] 
      },
      description: 'The first challenge in your tower ascent. A goblin king with basic combat skills.',
      specialAbilities: ['Goblin Swarm', 'Dirty Strike', 'King\'s Command']
    }
  },
  {
    id: 2,
    name: 'Second Floor',
    isUnlocked: false,
    isCompleted: false,
    isCurrent: false,
    difficulty: 'Easy',
    boss: {
      id: 'orc_warlord',
      name: 'Orc Warlord',
      level: 30,
      health: 800,
      maxHealth: 800,
      attack: 90,
      defense: 50,
      avatar: '/assets/img/avatars/assassine2.png',
      type: 'Orc',
      rarity: 'uncommon',
      rewards: { 
        experience: 200, 
        gold: 400, 
        items: ['Warlord Axe', 'Orc Armor', 'Berserker Helm'] 
      },
      description: 'A fierce orc warrior with enhanced combat abilities and tribal leadership.',
      specialAbilities: ['Berserker Rage', 'War Cry', 'Tribal Strike']
    }
  },
  {
    id: 3,
    name: 'Third Floor',
    isUnlocked: false,
    isCompleted: false,
    isCurrent: false,
    difficulty: 'Medium',
    boss: {
      id: 'dark_mage',
      name: 'Dark Mage',
      level: 40,
      health: 600,
      maxHealth: 600,
      attack: 120,
      defense: 40,
      avatar: '/assets/img/avatars/elementarist.png',
      type: 'Mage',
      rarity: 'rare',
      rewards: { 
        experience: 350, 
        gold: 700, 
        items: ['Dark Staff', 'Mage Robes', 'Magic Crystal', 'Spell Book'] 
      },
      description: 'A powerful dark mage with devastating magical abilities and arcane knowledge.',
      specialAbilities: ['Dark Bolt', 'Shadow Shield', 'Mana Drain', 'Arcane Explosion']
    }
  },
  {
    id: 4,
    name: 'Fourth Floor',
    isUnlocked: false,
    isCompleted: false,
    isCurrent: false,
    difficulty: 'Hard',
    boss: {
      id: 'dragon_knight',
      name: 'Dragon Knight',
      level: 50,
      health: 1200,
      maxHealth: 1200,
      attack: 150,
      defense: 80,
      avatar: '/assets/img/avatars/berserk.png',
      type: 'Dragon',
      rarity: 'epic',
      rewards: { 
        experience: 500, 
        gold: 1200, 
        items: ['Dragon Sword', 'Knight Armor', 'Dragon Scale', 'Dragon Heart'] 
      },
      description: 'A legendary dragon knight with both physical and magical prowess from ancient times.',
      specialAbilities: ['Dragon Breath', 'Knight Charge', 'Dragon Roar', 'Scale Armor']
    }
  },
  {
    id: 5,
    name: 'Fifth Floor',
    isUnlocked: false,
    isCompleted: false,
    isCurrent: false,
    difficulty: 'Extreme',
    boss: {
      id: 'shadow_lord',
      name: 'Shadow Lord',
      level: 60,
      health: 1500,
      maxHealth: 1500,
      attack: 180,
      defense: 100,
      avatar: '/assets/img/avatars/assassine2.png',
      type: 'Demon',
      rarity: 'legendary',
      rewards: { 
        experience: 800, 
        gold: 2000, 
        items: ['Shadow Blade', 'Demon Armor', 'Soul Gem', 'Dark Crown'] 
      },
      description: 'The ultimate challenge - a demon lord of immense power and dark magic.',
      specialAbilities: ['Shadow Strike', 'Demon Summon', 'Soul Drain', 'Dark Aura', 'Hellfire']
    }
  },
  {
    id: 6,
    name: 'Sixth Floor',
    isUnlocked: false,
    isCompleted: false,
    isCurrent: false,
    difficulty: 'Nightmare',
    boss: {
      id: 'ancient_dragon',
      name: 'Ancient Dragon',
      level: 75,
      health: 2000,
      maxHealth: 2000,
      attack: 250,
      defense: 150,
      avatar: '/assets/img/avatars/elementarist.png',
      type: 'Dragon',
      rarity: 'legendary',
      rewards: { 
        experience: 1200, 
        gold: 3000, 
        items: ['Ancient Scale', 'Dragon Claw', 'Eternal Flame', 'Dragon Soul'] 
      },
      description: 'The final boss - an ancient dragon of unimaginable power and wisdom.',
      specialAbilities: ['Ancient Roar', 'Dragon Storm', 'Eternal Flame', 'Time Warp', 'Dragon\'s Wrath']
    }
  }
];

export const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'common': return '#9ca3af';
    case 'uncommon': return '#10b981';
    case 'rare': return '#3b82f6';
    case 'epic': return '#8b5cf6';
    case 'legendary': return '#f59e0b';
    default: return '#9ca3af';
  }
};

export const getRarityGlow = (rarity: string): string => {
  switch (rarity) {
    case 'common': return 'rgba(156, 163, 175, 0.3)';
    case 'uncommon': return 'rgba(16, 185, 129, 0.3)';
    case 'rare': return 'rgba(59, 130, 246, 0.3)';
    case 'epic': return 'rgba(139, 92, 246, 0.3)';
    case 'legendary': return 'rgba(245, 158, 11, 0.3)';
    default: return 'rgba(156, 163, 175, 0.3)';
  }
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'Easy': return '#10b981';
    case 'Medium': return '#f59e0b';
    case 'Hard': return '#ef4444';
    case 'Extreme': return '#8b5cf6';
    case 'Nightmare': return '#dc2626';
    default: return '#9ca3af';
  }
};

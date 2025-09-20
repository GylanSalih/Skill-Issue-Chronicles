// Core game types for the idle game
export interface GameState {
  resources: Resources;
  character: Character;
  skills: Record<string, Skill>;
  inventory: Inventory;
  settings: GameSettings;
}

export interface Resources {
  primary: number; // Main currency (like "Cheese")
  secondary: Record<string, number>; // Other resources
}

export interface Character {
  id: string;
  name: string;
  level: number;
  experience: number;
  totalLevel: number;
  stats: CharacterStats;
  equipment: Equipment;
}

export interface CharacterStats {
  attack: number;
  defense: number;
  intelligence: number;
  stamina: number;
  melee: number;
  ranged: number;
  magic: number;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  experience: number;
  isActive: boolean;
  progress: number; // 0-100
  timeRemaining?: number; // in seconds
  baseTime: number; // base time for one cycle
}

export interface Equipment {
  mainHand?: Item;
  offHand?: Item;
  twoHand?: Item;
  head?: Item;
  body?: Item;
  legs?: Item;
  feet?: Item;
  hands?: Item;
}

export interface Item {
  id: string;
  name: string;
  type: 'material' | 'tool' | 'equipment' | 'consumable';
  quantity: number;
  level: number;
  stats?: Partial<CharacterStats>;
  description: string;
  icon: string;
}

export interface Inventory {
  items: Item[];
  maxSlots: number;
}

export interface GameSettings {
  autoSave: boolean;
  notifications: boolean;
  soundEnabled: boolean;
  theme: 'dark' | 'light';
}

export interface Task {
  id: string;
  name: string;
  description: string;
  reward: Partial<Resources>;
  requirements: Partial<CharacterStats>;
  completed: boolean;
}

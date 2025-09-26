/**
 * 🚀 MELVOR ENGINE - MAIN EXPORT
 *
 * Zentrale Export-Datei für die gesamte Melvor Engine.
 * Importiere alles was du brauchst von hier!
 */

// ==================== ENGINE SETUP ====================
// Import this first to initialize the engine
import './engineSetup';

// ==================== CORE ENGINE ====================
export {
  MelvorEngine,
  melvorEngine,
  type ActiveActivity,
  type ActivityDefinition,
  type ActivityRequirement,
  type ActivityResult,
  type ActivityStatus,
  type GameEvents,
  type GameSettings,
  type GameState,
  type GameStatistics,
  type ResourceType,
  type RewardDefinition,
  type RewardResult,
  type SkillDefinition,
  type SkillState,
  type SkillStatistics,
  // Types
  type SkillType,
  type UnlockCondition,
} from './MelvorEngine';

// ==================== ENGINE METHODS ====================
// Import the engine instance
import { melvorEngine } from './MelvorEngine';

// Export engine methods through the melvorEngine instance
export const addResource = (resourceId: string, amount: number) =>
  melvorEngine.addResource(resourceId, amount);
export const addExperience = (skillId: SkillType, amount: number) =>
  melvorEngine.addExperience(skillId, amount);
export const getResource = (resourceId: string) =>
  melvorEngine.getResource(resourceId);
export const hasResource = (resourceId: string, amount: number) =>
  melvorEngine.hasResource(resourceId, amount);
export const removeResource = (resourceId: string, amount: number) =>
  melvorEngine.removeResource(resourceId, amount);
export const startActivity = (
  skillId: SkillType,
  activityId: string,
  options?: { loop?: boolean }
) => melvorEngine.startActivity(skillId, activityId, options);
export const stopActivity = (skillId: SkillType) =>
  melvorEngine.stopActivity(skillId);
export const toggleActivityLoop = (skillId: SkillType) =>
  melvorEngine.toggleActivityLoop(skillId);
export const canPerformActivity = (skillId: SkillType, activityId: string) =>
  melvorEngine.canPerformActivity(skillId, activityId);
export const getActiveActivity = (skillId: SkillType) =>
  melvorEngine.getActiveActivity(skillId);
export const getActivityProgress = (skillId: SkillType) =>
  melvorEngine.getActivityProgress(skillId);
export const startGame = () => melvorEngine.startGame();
export const pauseGame = () => melvorEngine.pauseGame();
export const saveGame = () => melvorEngine.saveGame();
export const loadGame = (saveData: string) => melvorEngine.loadGame(saveData);
export const getGameState = () => melvorEngine.getGameState();
export const isGameRunning = () => melvorEngine.isGameRunning();
export const addEventListener = (event: string, callback: Function) =>
  melvorEngine.addEventListener(event, callback);
export const removeEventListener = (event: string, callback: Function) =>
  melvorEngine.removeEventListener(event, callback);

// ==================== SKILL DEFINITIONS ====================
export {
  FAST_EXPERIENCE_TABLE,
  SKILL_DEFINITIONS,
  SLOW_EXPERIENCE_TABLE,
  STANDARD_EXPERIENCE_TABLE,
  getActivitiesByRarity,
  getActivityDefinition,
  getAllSkillDefinitions,
  getExperienceForLevel,
  getLevelFromExperience,
  getSkillActivities,
  // Utility Functions
  getSkillDefinition,
  getUnlockedActivities,
} from './SkillDefinitions';

// ==================== MODAL MANAGER ====================
export {
  modalManager,
  type ActivityModalData,
  type CustomModalData,
  type ItemModalData,
  type ModalData,
  type ModalState,
  type ResourceModalData,
  type SkillModalData,
} from './ModalManager';

// ==================== REACT HOOKS ====================
export {
  useActivities,
  useMelvorEngine,
  useResources,
  useSkill,
  // Hook Types
  type UseMelvorEngineReturn,
} from './useMelvorEngine';

// ==================== CONVENIENCE EXPORTS ====================

/**
 * Quick access to the main engine instance
 */
export const engine = melvorEngine;

/**
 * All skill types as array for iteration
 */
export const ALL_SKILLS = [
  'woodcutting',
  'mining',
  'fishing',
  'cooking',
  'smithing',
  'fletching',
  'firemaking',
  'runecrafting',
  'herblore',
] as const;

/**
 * All resource types as array
 */
export const ALL_RESOURCE_TYPES = [
  'wood',
  'ore',
  'fish',
  'food',
  'bars',
  'arrows',
  'runes',
  'potions',
  'essence',
  'rare_items',
] as const;

/**
 * Rarity levels in order
 */
export const RARITY_LEVELS = [
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
] as const;

/**
 * Default game settings
 */
export const DEFAULT_GAME_SETTINGS = {
  autoSave: true,
  autoSaveInterval: 30000,
  notifications: true,
  soundEnabled: true,
  theme: 'dark' as const,
  performanceMode: false,
};

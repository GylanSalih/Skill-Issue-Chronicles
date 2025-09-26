/**
 * 🎮 REACT HOOK FOR MELVOR ENGINE
 *
 * Dieser Hook stellt die zentrale MelvorEngine für React-Komponenten bereit.
 * Automatisches State-Management und Event-Handling für die UI.
 *
 * ✨ Features:
 * - Reaktive Updates bei Game State Änderungen
 * - Automatische Event-Listener Registration
 * - Performance-optimierte Re-Renders
 * - Type-Safe API für alle Engine-Features
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActiveActivity,
  ActivityResult,
  GameEvents,
  GameState,
  SkillState,
  SkillType,
  melvorEngine,
} from './MelvorEngine';

// ==================== HOOK INTERFACE ====================

export interface UseMelvorEngineReturn {
  // Game State
  gameState: GameState;
  isGameRunning: boolean;

  // Skills
  skills: Record<SkillType, SkillState>;
  getSkill: (skillId: SkillType) => SkillState;
  getSkillLevel: (skillId: SkillType) => number;
  getSkillExperience: (skillId: SkillType) => number;
  getLevelProgress: (skillId: SkillType) => number;
  getNextLevelExperience: (skillId: SkillType) => number;

  // Activities
  activeActivities: Record<SkillType, ActiveActivity | null>;
  getActiveActivity: (skillId: SkillType) => ActiveActivity | null;
  getActivityProgress: (skillId: SkillType) => number;
  isSkillActive: (skillId: SkillType) => boolean;
  canPerformActivity: (skillId: SkillType, activityId: string) => boolean;

  // Resources
  resources: Record<string, number>;
  getResource: (resourceId: string) => number;
  hasResource: (resourceId: string, amount: number) => boolean;

  // Actions
  startGame: () => void;
  pauseGame: () => void;
  startActivity: (
    skillId: SkillType,
    activityId: string,
    options?: { loop?: boolean }
  ) => boolean;
  stopActivity: (skillId: SkillType) => void;
  toggleActivityLoop: (skillId: SkillType) => boolean;
  saveGame: () => boolean;

  // Statistics
  statistics: GameState['statistics'];

  // Event Handlers (optional - für custom logic)
  addEventListener: <K extends keyof GameEvents>(
    event: K,
    handler: GameEvents[K]
  ) => void;
  removeEventListener: <K extends keyof GameEvents>(
    event: K,
    handler: GameEvents[K]
  ) => void;
}

// ==================== MAIN HOOK ====================

export const useMelvorEngine = (): UseMelvorEngineReturn => {
  // Local state for reactive updates
  const [gameState, setGameState] = useState<GameState>(
    melvorEngine.getGameState()
  );
  const [isGameRunning, setIsGameRunning] = useState<boolean>(
    melvorEngine.isGameRunning()
  );
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  // ==================== EVENT HANDLERS ====================

  // Handle game state updates
  const handleGameTick = useCallback(() => {
    setGameState(melvorEngine.getGameState());
    setLastUpdate(Date.now());
  }, []);

  const handleGamePaused = useCallback(() => {
    setIsGameRunning(false);
  }, []);

  const handleGameResumed = useCallback(() => {
    setIsGameRunning(true);
  }, []);

  const handleActivityStarted = useCallback((activity: ActiveActivity) => {
    setGameState(melvorEngine.getGameState());
  }, []);

  const handleActivityCompleted = useCallback((result: ActivityResult) => {
    setGameState(melvorEngine.getGameState());
  }, []);

  const handleActivityStopped = useCallback(() => {
    setGameState(melvorEngine.getGameState());
  }, []);

  const handleSkillLevelUp = useCallback(
    (skillId: SkillType, newLevel: number, oldLevel: number) => {
      setGameState(melvorEngine.getGameState());
      // You can add custom level up logic here (notifications, etc.)
      console.log(`🎉 ${skillId} leveled up! ${oldLevel} → ${newLevel}`);
    },
    []
  );

  const handleSkillExperience = useCallback(() => {
    setGameState(melvorEngine.getGameState());
  }, []);

  const handleResourceGained = useCallback(() => {
    setGameState(melvorEngine.getGameState());
  }, []);

  const handleResourceLost = useCallback(() => {
    setGameState(melvorEngine.getGameState());
  }, []);

  const handleGameSaved = useCallback(() => {
    // Handle save notifications
    console.log('💾 Game saved successfully!');
  }, []);

  const handleGameLoaded = useCallback((loadedState: GameState) => {
    setGameState(loadedState);
    console.log('📁 Game loaded successfully!');
  }, []);

  const handleError = useCallback((error: string, context?: string) => {
    console.error(`❌ Game Error${context ? ` (${context})` : ''}: ${error}`);
  }, []);

  // ==================== EFFECT HOOKS ====================

  // Setup event listeners
  useEffect(() => {
    // Core game events
    melvorEngine.on('game:tick', handleGameTick);
    melvorEngine.on('game:paused', handleGamePaused);
    melvorEngine.on('game:resumed', handleGameResumed);
    melvorEngine.on('game:saved', handleGameSaved);
    melvorEngine.on('game:loaded', handleGameLoaded);

    // Activity events
    melvorEngine.on('activity:started', handleActivityStarted);
    melvorEngine.on('activity:completed', handleActivityCompleted);
    melvorEngine.on('activity:stopped', handleActivityStopped);

    // Skill events
    melvorEngine.on('skill:levelup', handleSkillLevelUp);
    melvorEngine.on('skill:experience', handleSkillExperience);

    // Resource events
    melvorEngine.on('resource:gained', handleResourceGained);
    melvorEngine.on('resource:lost', handleResourceLost);

    // Error events
    melvorEngine.on('error:activity', handleError);
    melvorEngine.on('error:save', handleError);

    // Cleanup function
    return () => {
      melvorEngine.off('game:tick', handleGameTick);
      melvorEngine.off('game:paused', handleGamePaused);
      melvorEngine.off('game:resumed', handleGameResumed);
      melvorEngine.off('game:saved', handleGameSaved);
      melvorEngine.off('game:loaded', handleGameLoaded);

      melvorEngine.off('activity:started', handleActivityStarted);
      melvorEngine.off('activity:completed', handleActivityCompleted);
      melvorEngine.off('activity:stopped', handleActivityStopped);

      melvorEngine.off('skill:levelup', handleSkillLevelUp);
      melvorEngine.off('skill:experience', handleSkillExperience);

      melvorEngine.off('resource:gained', handleResourceGained);
      melvorEngine.off('resource:lost', handleResourceLost);

      melvorEngine.off('error:activity', handleError);
      melvorEngine.off('error:save', handleError);
    };
  }, [
    handleGameTick,
    handleGamePaused,
    handleGameResumed,
    handleGameSaved,
    handleGameLoaded,
    handleActivityStarted,
    handleActivityCompleted,
    handleActivityStopped,
    handleSkillLevelUp,
    handleSkillExperience,
    handleResourceGained,
    handleResourceLost,
    handleError,
  ]);

  // ==================== MEMOIZED VALUES ====================

  // Skill-related getters
  const skills = useMemo(() => gameState.skills, [gameState.skills]);
  const activeActivities = useMemo(
    () => gameState.activeActivities,
    [gameState.activeActivities]
  );
  const resources = useMemo(() => gameState.resources, [gameState.resources]);
  const statistics = useMemo(
    () => gameState.statistics,
    [gameState.statistics]
  );

  // ==================== CALLBACK FUNCTIONS ====================

  const getSkill = useCallback((skillId: SkillType): SkillState => {
    return melvorEngine.getSkill(skillId);
  }, []);

  const getSkillLevel = useCallback((skillId: SkillType): number => {
    return melvorEngine.getSkill(skillId).level;
  }, []);

  const getSkillExperience = useCallback((skillId: SkillType): number => {
    return melvorEngine.getSkill(skillId).experience;
  }, []);

  const getLevelProgress = useCallback((skillId: SkillType): number => {
    return melvorEngine.getLevelProgress(skillId);
  }, []);

  const getNextLevelExperience = useCallback((skillId: SkillType): number => {
    return melvorEngine.getNextLevelExperience(skillId);
  }, []);

  const getActiveActivity = useCallback(
    (skillId: SkillType): ActiveActivity | null => {
      return melvorEngine.getActiveActivity(skillId);
    },
    []
  );

  const getActivityProgress = useCallback((skillId: SkillType): number => {
    return melvorEngine.getActivityProgress(skillId);
  }, []);

  const isSkillActive = useCallback((skillId: SkillType): boolean => {
    return melvorEngine.isSkillActive(skillId);
  }, []);

  const canPerformActivity = useCallback(
    (skillId: SkillType, activityId: string): boolean => {
      return melvorEngine.canPerformActivity(skillId, activityId);
    },
    []
  );

  const getResource = useCallback((resourceId: string): number => {
    return melvorEngine.getResource(resourceId);
  }, []);

  const hasResource = useCallback(
    (resourceId: string, amount: number): boolean => {
      return melvorEngine.hasResource(resourceId, amount);
    },
    []
  );

  // Action callbacks
  const startGame = useCallback(() => {
    melvorEngine.startGame();
  }, []);

  const pauseGame = useCallback(() => {
    melvorEngine.pauseGame();
  }, []);

  const startActivity = useCallback(
    (
      skillId: SkillType,
      activityId: string,
      options?: { loop?: boolean }
    ): boolean => {
      return melvorEngine.startActivity(skillId, activityId, options);
    },
    []
  );

  const stopActivity = useCallback((skillId: SkillType): void => {
    melvorEngine.stopActivity(skillId);
  }, []);

  const toggleActivityLoop = useCallback((skillId: SkillType): boolean => {
    return melvorEngine.toggleActivityLoop(skillId);
  }, []);

  const saveGame = useCallback((): boolean => {
    return melvorEngine.saveGame();
  }, []);

  // Event listener management
  const addEventListener = useCallback(
    <K extends keyof GameEvents>(event: K, handler: GameEvents[K]) => {
      melvorEngine.on(event, handler);
    },
    []
  );

  const removeEventListener = useCallback(
    <K extends keyof GameEvents>(event: K, handler: GameEvents[K]) => {
      melvorEngine.off(event, handler);
    },
    []
  );

  // ==================== RETURN OBJECT ====================

  return {
    // Game State
    gameState,
    isGameRunning,

    // Skills
    skills,
    getSkill,
    getSkillLevel,
    getSkillExperience,
    getLevelProgress,
    getNextLevelExperience,

    // Activities
    activeActivities,
    getActiveActivity,
    getActivityProgress,
    isSkillActive,
    canPerformActivity,

    // Resources
    resources,
    getResource,
    hasResource,

    // Actions
    startGame,
    pauseGame,
    startActivity,
    stopActivity,
    toggleActivityLoop,
    saveGame,

    // Statistics
    statistics,

    // Event Handlers
    addEventListener,
    removeEventListener,
  };
};

// ==================== SPECIALIZED HOOKS ====================

/**
 * Hook speziell für Skill-Management
 */
export const useSkill = (skillId: SkillType) => {
  const engine = useMelvorEngine();

  return useMemo(
    () => ({
      skill: engine.getSkill(skillId),
      level: engine.getSkillLevel(skillId),
      experience: engine.getSkillExperience(skillId),
      levelProgress: engine.getLevelProgress(skillId),
      nextLevelExperience: engine.getNextLevelExperience(skillId),
      isActive: engine.isSkillActive(skillId),
      activeActivity: engine.getActiveActivity(skillId),
      progress: engine.getActivityProgress(skillId),

      // Actions
      startActivity: (activityId: string, options?: { loop?: boolean }) =>
        engine.startActivity(skillId, activityId, options),
      stopActivity: () => engine.stopActivity(skillId),
      toggleLoop: () => engine.toggleActivityLoop(skillId),
      canPerformActivity: (activityId: string) =>
        engine.canPerformActivity(skillId, activityId),
    }),
    [engine, skillId]
  );
};

/**
 * Hook für Resource-Management
 */
export const useResources = (resourceIds?: string[]) => {
  const engine = useMelvorEngine();

  return useMemo(() => {
    const resources = resourceIds
      ? resourceIds.reduce(
          (acc, id) => {
            acc[id] = engine.getResource(id);
            return acc;
          },
          {} as Record<string, number>
        )
      : engine.resources;

    return {
      resources,
      getResource: engine.getResource,
      hasResource: engine.hasResource,
      totalResources: Object.values(resources).reduce(
        (sum, amount) => sum + amount,
        0
      ),
    };
  }, [engine, resourceIds]);
};

/**
 * Hook für Activity-Management
 */
export const useActivities = () => {
  const engine = useMelvorEngine();

  return useMemo(
    () => ({
      activeActivities: engine.activeActivities,
      hasAnyActiveActivity: Object.values(engine.activeActivities).some(
        activity => activity !== null
      ),
      activeSkills: Object.entries(engine.activeActivities)
        .filter(([, activity]) => activity !== null)
        .map(([skillId]) => skillId as SkillType),

      // Actions
      startActivity: engine.startActivity,
      stopActivity: engine.stopActivity,
      stopAllActivities: () => {
        Object.keys(engine.activeActivities).forEach(skillId => {
          if (engine.isSkillActive(skillId as SkillType)) {
            engine.stopActivity(skillId as SkillType);
          }
        });
      },
    }),
    [engine]
  );
};

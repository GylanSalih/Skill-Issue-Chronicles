import { useState, useEffect, useCallback } from 'react';
import { useGameState } from './useGameState';
import { woodManager, WoodcuttingSession, WoodcuttingResult } from '../lib/woodManager';
import { WoodTypeConfig, getAllWoodTypes } from '../config/woodConfig';

export interface UseWoodcuttingReturn {
  // Session State
  activeSession: WoodcuttingSession | null;
  isChopping: boolean;
  progress: number;
  isLooping: boolean;
  
  // Wood Data
  woodTypes: WoodTypeConfig[];
  currentWoodAmounts: Record<string, number>;
  
  // Actions
  startChopping: (woodTypeId: string, loop?: boolean) => boolean;
  stopChopping: () => void;
  canChopWood: (woodTypeId: string) => boolean;
  toggleLooping: () => boolean;
  setLooping: (loop: boolean) => boolean;
  
  // Calculations
  getEstimatedRewards: (woodTypeId: string) => any;
  getWoodAmount: (woodTypeId: string) => number;
}

export const useWoodcutting = (): UseWoodcuttingReturn => {
  const { gameState, processWoodcuttingResult } = useGameState();
  const [activeSession, setActiveSession] = useState<WoodcuttingSession | null>(null);
  const [currentWoodAmounts, setCurrentWoodAmounts] = useState<Record<string, number>>({});

  const woodcuttingSkill = gameState.skills.woodcutting;
  const playerLevel = woodcuttingSkill.level;

  // Initialisiere Wood-Amounts aus GameState
  useEffect(() => {
    const amounts: Record<string, number> = {};
    getAllWoodTypes().forEach(woodType => {
      amounts[woodType.id] = gameState.resources.secondary[woodType.id as keyof typeof gameState.resources.secondary] || 0;
    });
    setCurrentWoodAmounts(amounts);
  }, [gameState.resources.secondary]);

  // Höre auf WoodManager Session-Updates
  useEffect(() => {
    const handleSessionUpdate = (session: WoodcuttingSession | null) => {
      setActiveSession(session);
    };

    const handleCompletion = (result: WoodcuttingResult) => {
      // Verarbeite das Woodcutting-Result
      processWoodcuttingResult(
        result.woodTypeId,
        result.woodAmount,
        result.experienceGained,
        result.essences,
        result.rareItems
      );

      // Update local state
      setCurrentWoodAmounts(prev => ({
        ...prev,
        [result.woodTypeId]: (prev[result.woodTypeId] || 0) + result.woodAmount
      }));

      console.log('Woodcutting completed:', result);
    };

    woodManager.addListener(handleSessionUpdate);
    woodManager.addCompletionListener(handleCompletion);

    return () => {
      woodManager.removeListener(handleSessionUpdate);
      woodManager.removeCompletionListener(handleCompletion);
    };
  }, [processWoodcuttingResult]);

  // Entferne die alte handleWoodcuttingResult Funktion da sie nicht mehr benötigt wird

  // Starte Woodcutting
  const startChopping = useCallback((woodTypeId: string, loop: boolean = false): boolean => {
    const success = woodManager.startWoodcutting(woodTypeId, playerLevel, loop);
    
    if (success) {
      // Starte auch den allgemeinen Skill-Timer
      // (falls gewünscht für UI-Updates)
    }
    
    return success;
  }, [playerLevel]);

  // Stoppe Woodcutting
  const stopChopping = useCallback(() => {
    woodManager.stopWoodcutting();
  }, []);

  // Prüfe ob Holzart gechopt werden kann
  const canChopWood = useCallback((woodTypeId: string): boolean => {
    return woodManager.canChopWood(woodTypeId, playerLevel);
  }, [playerLevel]);

  // Berechne geschätzte Rewards
  const getEstimatedRewards = useCallback((woodTypeId: string) => {
    return woodManager.calculateEstimatedRewards(woodTypeId);
  }, []);

  // Hole aktuelle Wood-Amount
  const getWoodAmount = useCallback((woodTypeId: string): number => {
    return currentWoodAmounts[woodTypeId] || 0;
  }, [currentWoodAmounts]);

  // Toggle Loop-Modus
  const toggleLooping = useCallback((): boolean => {
    return woodManager.toggleLooping();
  }, []);

  // Setze Loop-Modus
  const setLooping = useCallback((loop: boolean): boolean => {
    return woodManager.setLooping(loop);
  }, []);


  return {
    // Session State
    activeSession,
    isChopping: activeSession?.isActive || false,
    progress: activeSession?.progress || 0,
    isLooping: activeSession?.isLooping || false,
    
    // Wood Data
    woodTypes: getAllWoodTypes(),
    currentWoodAmounts,
    
    // Actions
    startChopping,
    stopChopping,
    canChopWood,
    toggleLooping,
    setLooping,
    
    // Calculations
    getEstimatedRewards,
    getWoodAmount
  };
};

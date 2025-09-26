/**
 * 🐛 DEBUG HOOK
 *
 * Hook für Debug-Funktionalitäten die in der gesamten App verwendet werden können.
 */

import { useEffect, useState } from 'react';

interface DebugSettings {
  maxLevel: number;
  godMode: boolean;
  unlimitedResources: boolean;
  fastActions: boolean;
  showHitboxes: boolean;
  showFPS: boolean;
  showMemoryUsage: boolean;
  showTooltipDebug: boolean;
  showStateDebug: boolean;
  logAllActions: boolean;
}

const DEFAULT_SETTINGS: DebugSettings = {
  maxLevel: 99,
  godMode: false,
  unlimitedResources: false,
  fastActions: false,
  showHitboxes: false,
  showFPS: false,
  showMemoryUsage: false,
  showTooltipDebug: false,
  showStateDebug: false,
  logAllActions: false,
};

export const useDebug = () => {
  const [settings, setSettings] = useState<DebugSettings>(DEFAULT_SETTINGS);
  const isDevelopment = import.meta.env.DEV;

  // Load settings from localStorage
  useEffect(() => {
    if (!isDevelopment) return;

    const saved = localStorage.getItem('debugSettings');
    if (saved) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      } catch (error) {
        console.warn('Failed to load debug settings:', error);
      }
    }
  }, [isDevelopment]);

  // Listen for changes from DebugPanel
  useEffect(() => {
    if (!isDevelopment) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'debugSettings' && e.newValue) {
        try {
          setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(e.newValue) });
        } catch (error) {
          console.warn('Failed to parse debug settings:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isDevelopment]);

  // Debug logging function
  const debugLog = (action: string, data?: any) => {
    if (!isDevelopment || !settings.logAllActions) return;

    console.log(`[DEBUG] ${action}`, data);
  };

  // Get modified values based on debug settings
  const getDebugValue = (
    originalValue: number,
    type: 'level' | 'time' | 'resource'
  ) => {
    if (!isDevelopment) return originalValue;

    switch (type) {
      case 'level':
        return settings.godMode ? settings.maxLevel : originalValue;
      case 'time':
        return settings.fastActions
          ? Math.max(originalValue / 10, 0.1)
          : originalValue;
      case 'resource':
        return settings.unlimitedResources
          ? Number.MAX_SAFE_INTEGER
          : originalValue;
      default:
        return originalValue;
    }
  };

  // Check if a requirement should be bypassed
  const canBypassRequirement = (requirement: string) => {
    if (!isDevelopment) return false;
    return settings.godMode;
  };

  // Get tooltip debug info
  const getTooltipDebugInfo = () => {
    if (!isDevelopment || !settings.showTooltipDebug) return null;

    return {
      renderTime: performance.now(),
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
      debugMode: true,
    };
  };

  return {
    // Settings
    settings,
    isDevelopment,
    isDebugMode: isDevelopment && Object.values(settings).some(Boolean),

    // Utilities
    debugLog,
    getDebugValue,
    canBypassRequirement,
    getTooltipDebugInfo,

    // Specific checks
    isGodMode: isDevelopment && settings.godMode,
    hasFastActions: isDevelopment && settings.fastActions,
    hasUnlimitedResources: isDevelopment && settings.unlimitedResources,
    shouldShowHitboxes: isDevelopment && settings.showHitboxes,
    shouldLogActions: isDevelopment && settings.logAllActions,
  };
};

export type { DebugSettings };
export default useDebug;

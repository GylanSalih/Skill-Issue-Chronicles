import { WoodTypeConfig, getWoodTypeById } from './woodConfig';

export interface WoodcuttingSession {
  woodTypeId: string;
  startTime: number;
  duration: number; // in ms
  progress: number; // 0-100
  isActive: boolean;
  isLooping: boolean; // Neue Eigenschaft für Loop-Modus
}

export interface WoodcuttingResult {
  woodTypeId: string;
  woodAmount: number;
  experienceGained: number;
  essences?: number;
  rareItems?: number;
  staminaUsed: number;
}

class WoodManager {
  private activeSession: WoodcuttingSession | null = null;
  private listeners: Array<(session: WoodcuttingSession | null) => void> = [];
  private progressInterval: NodeJS.Timeout | null = null;

  // Event-System für Session-Updates
  addListener(callback: (session: WoodcuttingSession | null) => void) {
    this.listeners.push(callback);
  }

  removeListener(callback: (session: WoodcuttingSession | null) => void) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private notifyListeners() {
    this.listeners.forEach(callback => callback(this.activeSession));
  }

  // Starte eine neue Woodcutting-Session
  startWoodcutting(woodTypeId: string, playerLevel: number, loop: boolean = false): boolean {
    const woodType = getWoodTypeById(woodTypeId);
    if (!woodType) {
      console.error(`Wood type ${woodTypeId} not found`);
      return false;
    }

    // Prüfe ob Level ausreicht
    if (playerLevel < woodType.requiredLevel) {
      console.error(`Player level ${playerLevel} too low for ${woodType.name} (required: ${woodType.requiredLevel})`);
      return false;
    }

    // Stoppe aktuelle Session falls vorhanden
    this.stopWoodcutting();

    // Erstelle neue Session
    this.activeSession = {
      woodTypeId,
      startTime: Date.now(),
      duration: woodType.baseTime * 1000, // Konvertiere zu ms
      progress: 0,
      isActive: true,
      isLooping: loop
    };

    this.startProgressTimer();
    this.notifyListeners();
    return true;
  }

  // Stoppe aktuelle Session
  stopWoodcutting(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }

    this.activeSession = null;
    this.notifyListeners();
  }

  // Starte Progress-Timer
  private startProgressTimer(): void {
    if (!this.activeSession) return;

    this.progressInterval = setInterval(() => {
      if (!this.activeSession) return;

      const now = Date.now();
      const elapsed = now - this.activeSession.startTime;
      const progress = Math.min(100, (elapsed / this.activeSession.duration) * 100);

      this.activeSession.progress = progress;

      // Session abgeschlossen
      if (progress >= 100) {
        this.completeWoodcutting();
      } else {
        this.notifyListeners();
      }
    }, 100); // Update alle 100ms für smooth progress
  }

  // Schließe Woodcutting ab und gib Resultat zurück
  private completeWoodcutting(): WoodcuttingResult | null {
    if (!this.activeSession) return null;

    const woodType = getWoodTypeById(this.activeSession.woodTypeId);
    if (!woodType) return null;

    const result: WoodcuttingResult = {
      woodTypeId: this.activeSession.woodTypeId,
      woodAmount: this.calculateWoodAmount(woodType),
      experienceGained: woodType.stats.experienceGain,
      staminaUsed: woodType.stats.staminaCost
    };

    // Berechne Essences und Rare Items
    if (Math.random() < woodType.stats.essenceChance) {
      result.essences = 1;
    }
    if (Math.random() < woodType.stats.rareChance) {
      result.rareItems = 1;
    }

    // Notify listeners about completion
    this.notifyCompletion(result);

    // Prüfe ob Looping aktiv ist
    if (this.activeSession.isLooping) {
      // Starte neue Session für Loop
      this.restartWoodcutting();
    } else {
      // Stoppe Session normal
      this.stopWoodcutting();
    }

    return result;
  }

  // Starte Woodcutting neu für Loop
  private restartWoodcutting(): void {
    if (!this.activeSession) return;

    const woodType = getWoodTypeById(this.activeSession.woodTypeId);
    if (!woodType) return;

    // Reset Session für neuen Zyklus
    this.activeSession.startTime = Date.now();
    this.activeSession.progress = 0;

    this.notifyListeners();
  }

  // Event-System für Completion
  private completionListeners: Array<(result: WoodcuttingResult) => void> = [];

  addCompletionListener(callback: (result: WoodcuttingResult) => void) {
    this.completionListeners.push(callback);
  }

  removeCompletionListener(callback: (result: WoodcuttingResult) => void) {
    this.completionListeners = this.completionListeners.filter(listener => listener !== callback);
  }

  private notifyCompletion(result: WoodcuttingResult) {
    this.completionListeners.forEach(callback => callback(result));
  }

  // Berechne Wood-Amount basierend auf Level und Stats
  private calculateWoodAmount(woodType: WoodTypeConfig): number {
    const baseAmount = Math.floor(
      Math.random() * (woodType.stats.maxReward - woodType.stats.minReward + 1)
    ) + woodType.stats.minReward;

    // Level-Bonus (optional)
    // const levelBonus = Math.floor(baseAmount * 0.1); // 10% Bonus pro Level über Required
    return baseAmount;
  }

  // Getter für aktuelle Session
  getActiveSession(): WoodcuttingSession | null {
    return this.activeSession;
  }

  // Prüfe ob eine bestimmte Holzart verfügbar ist
  canChopWood(woodTypeId: string, playerLevel: number): boolean {
    const woodType = getWoodTypeById(woodTypeId);
    return woodType ? playerLevel >= woodType.requiredLevel : false;
  }

  // Berechne geschätzte Rewards für Tooltip
  calculateEstimatedRewards(woodTypeId: string) {
    const woodType = getWoodTypeById(woodTypeId);
    if (!woodType) return null;

    return {
      minWood: woodType.stats.minReward,
      maxWood: woodType.stats.maxReward,
      experience: woodType.stats.experienceGain,
      duration: woodType.baseTime,
      essenceChance: woodType.stats.essenceChance,
      rareChance: woodType.stats.rareChance,
      staminaCost: woodType.stats.staminaCost
    };
  }

  // Toggle Loop-Modus für aktuelle Session
  toggleLooping(): boolean {
    if (!this.activeSession) return false;
    
    this.activeSession.isLooping = !this.activeSession.isLooping;
    this.notifyListeners();
    return this.activeSession.isLooping;
  }

  // Setze Loop-Modus für aktuelle Session
  setLooping(loop: boolean): boolean {
    if (!this.activeSession) return false;
    
    this.activeSession.isLooping = loop;
    this.notifyListeners();
    return this.activeSession.isLooping;
  }
}

// Globale Instanz
export const woodManager = new WoodManager();

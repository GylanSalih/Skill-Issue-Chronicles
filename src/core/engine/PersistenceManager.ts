/**
 * 🔄 PERSISTENCE MANAGER
 *
 * Verwaltet das Speichern und Laden von Spieldaten.
 * Teil der Core Engine - alle Daten bleiben erhalten.
 *
 * ✨ Features:
 * - Auto-Save System
 * - LocalStorage Integration
 * - Versioning Support
 * - Backup System
 * - Progress Recovery
 */

import { GameState } from './MelvorEngine';

// ==================== TYPES ====================

export interface SaveData {
  version: string;
  timestamp: number;
  gameState: GameState;
  checksum?: string;
}

export interface PersistenceConfig {
  maxBackups: number;
  storageKey: string;
}

// ==================== PERSISTENCE MANAGER CLASS ====================

class PersistenceManager {
  private config: PersistenceConfig = {
    maxBackups: 5,
    storageKey: 'melvor-idle-game-save',
  };
  private lastSaveTime: number = 0;

  // ==================== CONFIGURATION ====================

  public configure(config: Partial<PersistenceConfig>): void {
    this.config = { ...this.config, ...config };
  }

  // ==================== SAVE OPERATIONS ====================

  public saveGame(gameState: GameState): boolean {
    try {
      const saveData: SaveData = {
        version: gameState.gameVersion || '1.0.0',
        timestamp: Date.now(),
        gameState: { ...gameState, lastSaved: Date.now() },
      };

      // Generate checksum for data integrity
      saveData.checksum = this.generateChecksum(saveData.gameState);

      // Save to localStorage
      localStorage.setItem(this.config.storageKey, JSON.stringify(saveData));

      // Create backup
      this.createBackup(saveData);

      this.lastSaveTime = Date.now();
      console.log('💾 Game saved successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to save game:', error);
      return false;
    }
  }

  public loadGame(): GameState | null {
    try {
      const saveDataString = localStorage.getItem(this.config.storageKey);
      if (!saveDataString) {
        console.log('📂 No save data found');
        return null;
      }

      const saveData: SaveData = JSON.parse(saveDataString);

      // Verify data integrity
      if (!this.verifySaveData(saveData)) {
        console.warn('⚠️ Save data corrupted, trying backup...');
        return this.loadFromBackup();
      }

      console.log('📂 Game loaded successfully');
      return saveData.gameState;
    } catch (error) {
      console.error('❌ Failed to load game:', error);
      return this.loadFromBackup();
    }
  }

  // ==================== BACKUP SYSTEM ====================

  private createBackup(saveData: SaveData): void {
    try {
      const backupKey = `${this.config.storageKey}-backup-${Date.now()}`;
      localStorage.setItem(backupKey, JSON.stringify(saveData));

      // Clean old backups
      this.cleanOldBackups();
    } catch (error) {
      console.error('❌ Failed to create backup:', error);
    }
  }

  private loadFromBackup(): GameState | null {
    try {
      const backupKeys = this.getBackupKeys();

      // Try backups from newest to oldest
      for (const key of backupKeys.reverse()) {
        try {
          const backupDataString = localStorage.getItem(key);
          if (backupDataString) {
            const backupData: SaveData = JSON.parse(backupDataString);

            if (this.verifySaveData(backupData)) {
              console.log('📂 Loaded from backup:', key);
              return backupData.gameState;
            }
          }
        } catch (backupError) {
          console.warn('⚠️ Backup corrupted:', key);
          continue;
        }
      }

      console.error('❌ All backups failed');
      return null;
    } catch (error) {
      console.error('❌ Failed to load from backup:', error);
      return null;
    }
  }

  private getBackupKeys(): string[] {
    const keys: string[] = [];
    const prefix = `${this.config.storageKey}-backup-`;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        keys.push(key);
      }
    }

    // Sort by timestamp (newest first)
    return keys.sort((a, b) => {
      const timestampA = parseInt(a.split('-').pop() || '0');
      const timestampB = parseInt(b.split('-').pop() || '0');
      return timestampB - timestampA;
    });
  }

  private cleanOldBackups(): void {
    const backupKeys = this.getBackupKeys();

    // Remove excess backups
    if (backupKeys.length > this.config.maxBackups) {
      const keysToRemove = backupKeys.slice(this.config.maxBackups);
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      console.log(`🧹 Cleaned ${keysToRemove.length} old backups`);
    }
  }

  // ==================== DATA VERIFICATION ====================

  private verifySaveData(saveData: SaveData): boolean {
    try {
      // Basic structure validation
      if (!saveData.gameState || !saveData.version || !saveData.timestamp) {
        return false;
      }

      // Checksum validation
      if (saveData.checksum) {
        const expectedChecksum = this.generateChecksum(saveData.gameState);
        if (saveData.checksum !== expectedChecksum) {
          console.warn('⚠️ Checksum mismatch');
          return false;
        }
      }

      // Game state validation
      const { gameState } = saveData;
      if (!gameState.skills || !gameState.resources) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('❌ Save data verification failed:', error);
      return false;
    }
  }

  private generateChecksum(gameState: GameState): string {
    // Simple checksum generation
    const dataString = JSON.stringify({
      skills: gameState.skills,
      resources: gameState.resources,
      totalPlayTime: gameState.totalPlayTime,
    });

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
      const char = dataString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    return hash.toString(36);
  }

  // ==================== UTILITY METHODS ====================

  public hasExistingSave(): boolean {
    return localStorage.getItem(this.config.storageKey) !== null;
  }

  public getSaveInfo(): { timestamp: number; version: string } | null {
    try {
      const saveDataString = localStorage.getItem(this.config.storageKey);
      if (!saveDataString) return null;

      const saveData: SaveData = JSON.parse(saveDataString);
      return {
        timestamp: saveData.timestamp,
        version: saveData.version,
      };
    } catch (error) {
      return null;
    }
  }

  public deleteSave(): boolean {
    try {
      localStorage.removeItem(this.config.storageKey);

      // Also remove backups
      const backupKeys = this.getBackupKeys();
      backupKeys.forEach(key => localStorage.removeItem(key));

      console.log('🗑️ Save data deleted');
      return true;
    } catch (error) {
      console.error('❌ Failed to delete save:', error);
      return false;
    }
  }

  public exportSave(): string | null {
    try {
      const saveDataString = localStorage.getItem(this.config.storageKey);
      if (!saveDataString) return null;

      // Create exportable format
      const exportData = {
        ...JSON.parse(saveDataString),
        exportedAt: Date.now(),
      };

      return btoa(JSON.stringify(exportData));
    } catch (error) {
      console.error('❌ Failed to export save:', error);
      return null;
    }
  }

  public importSave(importString: string): boolean {
    try {
      const importData = JSON.parse(atob(importString));

      if (!this.verifySaveData(importData)) {
        console.error('❌ Invalid import data');
        return false;
      }

      localStorage.setItem(
        this.config.storageKey,
        JSON.stringify({
          version: importData.version,
          timestamp: importData.timestamp,
          gameState: importData.gameState,
          checksum: importData.checksum,
        })
      );

      console.log('📥 Save imported successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to import save:', error);
      return false;
    }
  }

  // ==================== LIFECYCLE ====================

  public init(): void {
    console.log('🔧 PersistenceManager initialized');
  }

  public destroy(): void {
    console.log('🔧 PersistenceManager destroyed');
  }
}

// ==================== SINGLETON INSTANCE ====================

export const persistenceManager = new PersistenceManager();

// Auto-initialize
if (typeof window !== 'undefined') {
  persistenceManager.init();
}

export default persistenceManager;

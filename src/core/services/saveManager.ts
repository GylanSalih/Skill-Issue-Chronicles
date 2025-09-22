// Save Manager für JSON Export/Import des gesamten GameState
import { GameState } from '../types/game';

export interface SaveData {
  gameState: GameState;
  characters: Record<number, any>;
  version: string;
  timestamp: number;
  description?: string;
}

export class SaveManager {
  private static readonly SAVE_KEY = 'idleGameSaveData';
  private static readonly VERSION = '1.0.0';

  // Speichere den gesamten GameState
  static saveGame(gameState: GameState, characters: Record<number, any>, description?: string): SaveData {
    const saveData: SaveData = {
      gameState,
      characters,
      version: this.VERSION,
      timestamp: Date.now(),
      description
    };

    localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
    return saveData;
  }

  // Lade den gesamten GameState
  static loadGame(): SaveData | null {
    try {
      const savedData = localStorage.getItem(this.SAVE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData) as SaveData;
        return parsed;
      }
    } catch (error) {
      console.error('Error loading save data:', error);
    }
    return null;
  }

  // Exportiere als JSON-Datei
  static exportToFile(gameState: GameState, characters: Record<number, any>, filename?: string): void {
    const saveData = this.saveGame(gameState, characters, 'Exported Save');
    
    const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `idle-game-save-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Importiere von JSON-Datei
  static importFromFile(file: File): Promise<SaveData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const saveData = JSON.parse(content) as SaveData;
          
          // Validiere die Save-Daten
          if (this.validateSaveData(saveData)) {
            // Speichere die importierten Daten
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
            
            // Speichere auch die Charaktere im alten Format für Kompatibilität
            if (saveData.characters && Object.keys(saveData.characters).length > 0) {
              localStorage.setItem('idleGameCharacters', JSON.stringify(saveData.characters));
              console.log('Imported characters saved to localStorage:', saveData.characters);
            }
            
            resolve(saveData);
          } else {
            reject(new Error('Invalid save file format'));
          }
        } catch (error) {
          reject(new Error('Failed to parse save file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }

  // Validiere Save-Daten
  private static validateSaveData(data: any): data is SaveData {
    return (
      data &&
      typeof data === 'object' &&
      data.gameState &&
      data.characters &&
      typeof data.version === 'string' &&
      typeof data.timestamp === 'number'
    );
  }

  // Erstelle Backup
  static createBackup(): SaveData | null {
    const currentSave = this.loadGame();
    if (currentSave) {
      const backupData = {
        ...currentSave,
        description: `Backup - ${new Date().toLocaleString()}`,
        timestamp: Date.now()
      };
      
      const backupKey = `${this.SAVE_KEY}_backup_${Date.now()}`;
      localStorage.setItem(backupKey, JSON.stringify(backupData));
      return backupData;
    }
    return null;
  }

  // Liste alle Backups auf
  static listBackups(): SaveData[] {
    const backups: SaveData[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`${this.SAVE_KEY}_backup_`)) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '');
          if (this.validateSaveData(data)) {
            backups.push(data);
          }
        } catch (error) {
          // Ignore invalid entries
        }
      }
    }
    
    return backups.sort((a, b) => b.timestamp - a.timestamp);
  }

  // Lösche alle Daten
  static clearAllData(): void {
    // Lösche Haupt-Save
    localStorage.removeItem(this.SAVE_KEY);
    
    // Lösche alle Backups
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`${this.SAVE_KEY}_backup_`)) {
        localStorage.removeItem(key);
      }
    }
    
    // Lösche alte Character-Daten
    localStorage.removeItem('idleGameCharacters');
  }

  // Erstelle neuen Save mit Standard-Werten
  static createNewSave(): SaveData {
    const defaultGameState: GameState = {
      resources: {
        primary: 0,
        secondary: {
          wood: 0,
          stone: 0,
          metal: 0,
          food: 0,
          normalWood: 0,
          softwood: 0,
          willowWood: 0,
          glowwood: 0,
          frostbark: 0,
          ebonyWood: 0,
          voidbark: 0,
          yangWood: 0,
          yingWood: 0,
          essences: 0,
          rareItems: 0
        }
      },
      character: {
        id: '1',
        name: 'New Player',
        level: 1,
        experience: 0,
        totalLevel: 1,
        stats: {
          attack: 1,
          defense: 1,
          intelligence: 1,
          stamina: 1,
          melee: 1,
          ranged: 1,
          magic: 1
        },
        equipment: {}
      },
      skills: {
        woodcutting: {
          id: 'woodcutting',
          name: 'Woodcutting',
          level: 1,
          experience: 0,
          isActive: false,
          progress: 0,
          baseTime: 5
        },
        cooking: {
          id: 'cooking',
          name: 'Cooking',
          level: 1,
          experience: 0,
          isActive: false,
          progress: 0,
          baseTime: 8
        },
        mining: {
          id: 'mining',
          name: 'Mining',
          level: 1,
          experience: 0,
          isActive: false,
          progress: 0,
          baseTime: 10
        }
      },
      inventory: {
        items: [],
        maxSlots: 50
      },
      settings: {
        autoSave: true,
        notifications: true,
        soundEnabled: true,
        theme: 'dark'
      }
    };

    const defaultCharacters: Record<number, any> = {};

    return this.saveGame(defaultGameState, defaultCharacters, 'New Game');
  }
}

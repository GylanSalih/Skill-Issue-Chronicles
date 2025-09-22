import React, { useState, useRef } from 'react';
import { Download, Upload, Save, RotateCcw, Trash2, FileText, Clock } from 'lucide-react';
import { SaveManager, SaveData } from '../../../core/services/saveManager';
import { useGameState } from '../../../core/hooks/useGameState';
// useCharacter wird nicht mehr benötigt
import styles from './SaveLoadManager.module.scss';

interface SaveLoadManagerProps {
  onSaveLoaded?: () => void;
}

const SaveLoadManager: React.FC<SaveLoadManagerProps> = ({ onSaveLoaded }) => {
  const { gameState } = useGameState();
  // characters wird jetzt direkt aus localStorage geladen
  const [isOpen, setIsOpen] = useState(false);
  const [backups, setBackups] = useState<SaveData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lade Backups beim Öffnen
  const loadBackups = () => {
    setBackups(SaveManager.listBackups());
  };

  const handleOpen = () => {
    setIsOpen(true);
    loadBackups();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Exportiere aktuellen Save
  const handleExport = () => {
    // Lade Charaktere aus localStorage für den Export
    const savedCharacters = localStorage.getItem('idleGameCharacters');
    let charactersToExport: Record<number, any> = {};
    
    if (savedCharacters) {
      try {
        charactersToExport = JSON.parse(savedCharacters);
      } catch (error) {
        console.error('Error parsing characters for export:', error);
      }
    }
    
    console.log('Exporting with characters:', charactersToExport);
    SaveManager.exportToFile(gameState, charactersToExport);
  };

  // Importiere Save von Datei
  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await SaveManager.importFromFile(file);
        onSaveLoaded?.();
        loadBackups();
        alert('Save erfolgreich importiert!');
      } catch (error) {
        alert('Fehler beim Importieren: ' + (error as Error).message);
      }
    }
  };

  // Erstelle Backup
  const handleCreateBackup = () => {
    const backup = SaveManager.createBackup();
    if (backup) {
      loadBackups();
      alert('Backup erstellt!');
    } else {
      alert('Kein aktueller Save gefunden!');
    }
  };

  // Lade Backup
  const handleLoadBackup = (backup: SaveData) => {
    if (window.confirm(`Backup vom ${new Date(backup.timestamp).toLocaleString()} laden?`)) {
      localStorage.setItem('idleGameSaveData', JSON.stringify(backup));
      onSaveLoaded?.();
      alert('Backup geladen!');
    }
  };

  // Lösche Backup
  const handleDeleteBackup = (backup: SaveData) => {
    if (window.confirm('Backup wirklich löschen?')) {
      const backupKey = `idleGameSaveData_backup_${backup.timestamp}`;
      localStorage.removeItem(backupKey);
      loadBackups();
    }
  };

  // Erstelle neuen Save
  const handleNewGame = () => {
    if (window.confirm('Alle Daten zurücksetzen und neues Spiel starten?')) {
      SaveManager.clearAllData();
      const newSave = SaveManager.createNewSave();
      onSaveLoaded?.();
      alert('Neues Spiel erstellt!');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('de-DE');
  };

  if (!isOpen) {
    return (
      <button 
        className={styles.openButton}
        onClick={handleOpen}
        title="Save/Load Manager"
      >
        <FileText size={20} />
      </button>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Save/Load Manager</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          {/* Aktuelle Aktionen */}
          <div className={styles.section}>
            <h3>Aktuelle Aktionen</h3>
            <div className={styles.buttonGrid}>
              <button className={styles.exportButton} onClick={handleExport}>
                <Download size={16} />
                Export Save
              </button>
              
              <button className={styles.importButton} onClick={handleImport}>
                <Upload size={16} />
                Import Save
              </button>
              
              <button className={styles.backupButton} onClick={handleCreateBackup}>
                <Save size={16} />
                Backup erstellen
              </button>
              
              <button className={styles.newGameButton} onClick={handleNewGame}>
                <RotateCcw size={16} />
                Neues Spiel
              </button>
            </div>
          </div>

          {/* Backups */}
          <div className={styles.section}>
            <h3>Backups ({backups.length})</h3>
            {backups.length === 0 ? (
              <p className={styles.noBackups}>Keine Backups vorhanden</p>
            ) : (
              <div className={styles.backupList}>
                {backups.map((backup, index) => (
                  <div key={backup.timestamp} className={styles.backupItem}>
                    <div className={styles.backupInfo}>
                      <div className={styles.backupDate}>
                        <Clock size={14} />
                        {formatDate(backup.timestamp)}
                      </div>
                      <div className={styles.backupDescription}>
                        {backup.description || 'Backup'}
                      </div>
                      <div className={styles.backupVersion}>
                        Version: {backup.version}
                      </div>
                    </div>
                    <div className={styles.backupActions}>
                      <button 
                        className={styles.loadButton}
                        onClick={() => handleLoadBackup(backup)}
                      >
                        Laden
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => handleDeleteBackup(backup)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Versteckter File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default SaveLoadManager;

/**
 * 🐛 DEBUG PANEL
 *
 * Lokales Debug-Panel für Entwicklung mit verschiedenen Toggles und Einstellungen.
 * Nur in Development-Mode sichtbar.
 */

import { Bug, Database, Eye, Settings, X, Zap } from 'lucide-react';
import React, { useState } from 'react';
import styles from './DebugPanel.module.scss';

interface DebugSettings {
  // Game Settings
  maxLevel: number;
  godMode: boolean;
  unlimitedResources: boolean;
  fastActions: boolean;

  // UI Settings
  showHitboxes: boolean;
  showFPS: boolean;
  showMemoryUsage: boolean;

  // Debug Info
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

export const DebugPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [settings, setSettings] = useState<DebugSettings>(DEFAULT_SETTINGS);
  const [isMinimized, setIsMinimized] = useState(false);

  // Only show in development
  const isDevelopment = import.meta.env.DEV;

  // TODO: Später localStorage loading hinzufügen

  // TODO: Später Logic-Verbindungen hinzufügen
  // Für jetzt nur statische UI

  const updateSetting = <K extends keyof DebugSettings>(
    key: K,
    value: DebugSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    // TODO: Später Logic-Verbindungen hinzufügen
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    // TODO: Später Reset-Logic hinzufügen
  };

  const exportSettings = () => {
    // TODO: Später Export-Funktionalität hinzufügen
    console.log('Export Settings:', settings);
  };

  // Don't render in production
  if (!isDevelopment) {
    return null;
  }

  return (
    <>
      {/* Debug Icon */}
      {!isVisible && (
        <button
          className={styles.debugIcon}
          onClick={() => setIsVisible(true)}
          title='Open Debug Panel'
        >
          <Bug size={16} />
        </button>
      )}

      {/* Debug Panel */}
      {isVisible && (
        <div
          className={`${styles.debugPanel} ${isMinimized ? styles.minimized : ''}`}
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.title}>
              <Bug size={16} />
              <span>Debug Panel</span>
            </div>
            <div className={styles.controls}>
              <button
                className={styles.minimizeBtn}
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? <Eye size={14} /> : <Settings size={14} />}
              </button>
              <button
                className={styles.closeBtn}
                onClick={() => setIsVisible(false)}
                title='Close Debug Panel'
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <div className={styles.content}>
              {/* Game Settings */}
              <div className={styles.section}>
                <h3>
                  <Zap size={14} />
                  Game Settings
                </h3>

                <div className={styles.setting}>
                  <label>Max Level</label>
                  <input
                    type='number'
                    value={settings.maxLevel}
                    onChange={e =>
                      updateSetting('maxLevel', parseInt(e.target.value) || 99)
                    }
                    min='1'
                    max='999'
                  />
                </div>

                <div className={styles.setting}>
                  <label>
                    <input
                      type='checkbox'
                      checked={settings.godMode}
                      onChange={e => updateSetting('godMode', e.target.checked)}
                    />
                    God Mode
                  </label>
                </div>

                <div className={styles.setting}>
                  <label>
                    <input
                      type='checkbox'
                      checked={settings.unlimitedResources}
                      onChange={e =>
                        updateSetting('unlimitedResources', e.target.checked)
                      }
                    />
                    Unlimited Resources
                  </label>
                </div>

                <div className={styles.setting}>
                  <label>
                    <input
                      type='checkbox'
                      checked={settings.fastActions}
                      onChange={e =>
                        updateSetting('fastActions', e.target.checked)
                      }
                    />
                    Fast Actions (10x Speed)
                  </label>
                </div>
              </div>

              {/* UI Debug */}
              <div className={styles.section}>
                <h3>
                  <Eye size={14} />
                  UI Debug
                </h3>

                <div className={styles.setting}>
                  <label>
                    <input
                      type='checkbox'
                      checked={settings.showHitboxes}
                      onChange={e =>
                        updateSetting('showHitboxes', e.target.checked)
                      }
                    />
                    Show Hitboxes
                  </label>
                </div>

                <div className={styles.setting}>
                  <label>
                    <input
                      type='checkbox'
                      checked={settings.showFPS}
                      onChange={e => updateSetting('showFPS', e.target.checked)}
                    />
                    Show FPS Counter
                  </label>
                </div>

                <div className={styles.setting}>
                  <label>
                    <input
                      type='checkbox'
                      checked={settings.showMemoryUsage}
                      onChange={e =>
                        updateSetting('showMemoryUsage', e.target.checked)
                      }
                    />
                    Show Memory Usage
                  </label>
                </div>
              </div>

              {/* Development Debug */}
              <div className={styles.section}>
                <h3>
                  <Database size={14} />
                  Development
                </h3>

                <div className={styles.setting}>
                  <label>
                    <input
                      type='checkbox'
                      checked={settings.showTooltipDebug}
                      onChange={e =>
                        updateSetting('showTooltipDebug', e.target.checked)
                      }
                    />
                    Tooltip Debug Info
                  </label>
                </div>

                <div className={styles.setting}>
                  <label>
                    <input
                      type='checkbox'
                      checked={settings.showStateDebug}
                      onChange={e =>
                        updateSetting('showStateDebug', e.target.checked)
                      }
                    />
                    State Debug Info
                  </label>
                </div>

                <div className={styles.setting}>
                  <label>
                    <input
                      type='checkbox'
                      checked={settings.logAllActions}
                      onChange={e =>
                        updateSetting('logAllActions', e.target.checked)
                      }
                    />
                    Log All Actions
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button className={styles.resetBtn} onClick={resetSettings}>
                  Reset All
                </button>
                <button className={styles.exportBtn} onClick={exportSettings}>
                  Export Settings
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TODO: Später FPS Counter und Memory Usage hinzufügen */}
    </>
  );
};

// TODO: Später FPS Counter und Memory Usage Komponenten hinzufügen

// Component is already exported above with "export const DebugPanel"

/**
 * 🚀 ENGINE SETUP & INITIALIZATION
 *
 * Setup-Datei die die MelvorEngine mit allen Skill-Definitionen initialisiert.
 * Diese Datei sollte einmal beim App-Start importiert werden.
 */

import { melvorEngine } from './MelvorEngine';
import { SKILL_DEFINITIONS } from './SkillDefinitions';

/**
 * Initialisiert die Engine mit allen Skill-Definitionen
 */
export function initializeMelvorEngine(): void {
  // Lade Skill-Definitionen in die Engine
  melvorEngine.setSkillDefinitions(SKILL_DEFINITIONS);

  console.log(
    '🎮 Melvor Engine initialized with',
    Object.keys(SKILL_DEFINITIONS).length,
    'skills'
  );
}

/**
 * Auto-Initialisierung beim Import
 */
initializeMelvorEngine();

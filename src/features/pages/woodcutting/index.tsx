import { useEffect } from 'react';
import { useMelvorEngine } from '../../../core/engine';
import { initializeMelvorEngine } from '../../../core/engine/engineSetup';
import WoodcuttingEngineComponent from './WoodcuttingEngineComponent';

export default function WoodcuttingPage() {
  const engine = useMelvorEngine();

  // Initialisiere Engine und starte Game
  useEffect(() => {
    console.log('🚀 Initializing Melvor Engine...');
    initializeMelvorEngine();

    if (!engine.isGameRunning) {
      console.log('🎮 Starting game engine...');
      engine.startGame();
    }
  }, []); // Leere Dependency Array - nur einmal ausführen

  return <WoodcuttingEngineComponent />;
}

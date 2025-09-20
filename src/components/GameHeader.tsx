import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { Play, Pause, Settings } from 'lucide-react';

const GameHeader: React.FC = () => {
  const { gameState, isRunning, startGame, stopGame } = useGameState();

  return (
    <header className="bg-gray-900 text-white p-4 border-b border-gray-700">
      <div className="flex justify-between items-center">
        {/* Left: Game Title & Stats */}
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold">Skill Issue Chronicles</h1>
          <div className="text-sm text-gray-300">
            Active Characters: 1
          </div>
        </div>

        {/* Center: Resources & Progress */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400">💰</span>
            <span className="font-semibold">Gold ({gameState.resources.primary})</span>
          </div>
          
          {/* Active Skill Progress */}
          {Object.values(gameState.skills).find(skill => skill.isActive) && (
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${Object.values(gameState.skills).find(skill => skill.isActive)?.progress || 0}%` 
                  }}
                />
              </div>
              <span className="text-xs text-gray-300">
                {Math.ceil((Object.values(gameState.skills).find(skill => skill.isActive)?.baseTime || 0) * 
                  (1 - (Object.values(gameState.skills).find(skill => skill.isActive)?.progress || 0) / 100))}s
              </span>
            </div>
          )}
        </div>

        {/* Right: Player Info & Controls */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="font-semibold">Player</div>
            <div className="text-sm text-gray-300">Total Level: {gameState.character.totalLevel}</div>
          </div>
          
          <button
            onClick={isRunning ? stopGame : startGame}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isRunning 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            <span>{isRunning ? 'Stop' : 'Start'}</span>
          </button>
          
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;

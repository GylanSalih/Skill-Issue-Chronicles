import React from 'react';
import { useGameState } from '../hooks/useGameState';

const ResourcePanel: React.FC = () => {
  const { gameState } = useGameState();

  const resourceIcons: Record<string, string> = {
    primary: '💰',
    wood: '🪵',
    stone: '🪨',
    metal: '⚒️',
    food: '🍎'
  };

  return (
    <div className="bg-gray-800 p-4 border-b border-gray-700">
      <h3 className="text-lg font-semibold mb-3 text-white">Resources</h3>
      <div className="grid grid-cols-2 gap-3">
        {/* Primary Resource */}
        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{resourceIcons.primary}</span>
            <span className="text-white font-medium">Gold</span>
          </div>
          <span className="text-yellow-400 font-bold text-lg">
            {gameState.resources.primary.toLocaleString()}
          </span>
        </div>

        {/* Secondary Resources */}
        {Object.entries(gameState.resources.secondary).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-xl">{resourceIcons[key] || '📦'}</span>
              <span className="text-white font-medium capitalize">{key}</span>
            </div>
            <span className="text-blue-400 font-bold">
              {value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcePanel;

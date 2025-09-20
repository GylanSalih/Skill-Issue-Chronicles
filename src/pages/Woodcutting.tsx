import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { TreePine, Axe, Zap } from 'lucide-react';

export default function WoodcuttingPage() {
  const { gameState, toggleSkill } = useGameState();
  const woodcuttingSkill = gameState.skills.woodcutting;

  const upgrades = [
    {
      id: 'faster_chopping',
      name: 'Faster Chopping',
      description: 'Reduces chopping time by 20%',
      cost: 100,
      level: 1,
      effect: 'time_reduction'
    },
    {
      id: 'more_wood',
      name: 'More Wood',
      description: 'Increases wood gained per cycle',
      cost: 250,
      level: 1,
      effect: 'resource_multiplier'
    },
    {
      id: 'auto_chopping',
      name: 'Auto Chopping',
      description: 'Automatically starts chopping when available',
      cost: 500,
      level: 1,
      effect: 'auto_start'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <TreePine className="text-green-500" size={32} />
        <div>
          <h1 className="text-3xl font-bold text-white">Woodcutting</h1>
          <p className="text-gray-400">Chop wood to gather resources and gain experience</p>
        </div>
      </div>

      {/* Skill Status */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Woodcutting Skill</h2>
            <p className="text-gray-400">Level {woodcuttingSkill.level} • {woodcuttingSkill.experience} XP</p>
          </div>
          <button
            onClick={() => toggleSkill('woodcutting')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              woodcuttingSkill.isActive
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {woodcuttingSkill.isActive ? 'Stop Chopping' : 'Start Chopping'}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Progress</span>
            <span>{Math.round(woodcuttingSkill.progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${woodcuttingSkill.progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-400 text-sm">Wood per Cycle</p>
            <p className="text-xl font-bold text-green-400">{woodcuttingSkill.level}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Cycle Time</p>
            <p className="text-xl font-bold text-blue-400">{woodcuttingSkill.baseTime}s</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Wood</p>
            <p className="text-xl font-bold text-yellow-400">{gameState.resources.secondary.wood}</p>
          </div>
        </div>
      </div>

      {/* Upgrades */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Upgrades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upgrades.map(upgrade => (
            <div key={upgrade.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <Axe className="text-orange-500" size={20} />
                <h3 className="text-lg font-semibold text-white">{upgrade.name}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-3">{upgrade.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 font-semibold">{upgrade.cost} Gold</span>
                <button 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  disabled={gameState.resources.primary < upgrade.cost}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Zap className="text-blue-400 mt-1" size={20} />
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Pro Tips</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Higher level = more wood per cycle</li>
              <li>• Upgrade your tools to chop faster</li>
              <li>• Wood is used for crafting and building</li>
              <li>• Leave the game running to gain resources while idle!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useGameState } from '../hooks/useGameState';
import SkillCard from '../components/SkillCard';

export default function Home() {
  const { gameState, toggleSkill } = useGameState();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to Skill Issue Chronicles!</h1>
        <p className="text-gray-400">Your idle adventure begins here. Start by activating skills to generate resources!</p>
      </div>

      {/* Active Skills Section */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Active Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(gameState.skills).map(skill => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onToggle={toggleSkill}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Character Level</h3>
          <p className="text-3xl font-bold text-blue-400">{gameState.character.totalLevel}</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Active Skills</h3>
          <p className="text-3xl font-bold text-green-400">
            {Object.values(gameState.skills).filter(skill => skill.isActive).length}
          </p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Total Resources</h3>
          <p className="text-3xl font-bold text-yellow-400">
            {Object.values(gameState.resources.secondary).reduce((sum, val) => sum + val, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

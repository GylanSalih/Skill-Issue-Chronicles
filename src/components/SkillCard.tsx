import React from 'react';
import { Skill } from '../types/game';
import { Play, Pause, TrendingUp } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
  onToggle: (skillId: string) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onToggle }) => {
  const expNeeded = skill.level * 100;
  const expProgress = (skill.experience / expNeeded) * 100;

  return (
    <div className={`p-4 rounded-lg border-2 transition-all ${
      skill.isActive 
        ? 'border-blue-500 bg-blue-900/20' 
        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
          <span className="text-sm text-gray-400">(Lv.{skill.level})</span>
        </div>
        
        <button
          onClick={() => onToggle(skill.id)}
          className={`p-2 rounded-lg transition-colors ${
            skill.isActive 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {skill.isActive ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Progress</span>
          <span>{Math.round(skill.progress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${skill.progress}%` }}
          />
        </div>
      </div>

      {/* Experience Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Experience</span>
          <span>{skill.experience}/{expNeeded}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${expProgress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-1">
          <TrendingUp size={14} />
          <span>+{skill.level}/cycle</span>
        </div>
        <span>{skill.baseTime}s/cycle</span>
      </div>
    </div>
  );
};export default SkillCard;



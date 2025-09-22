import React from 'react';
import { useActivityManager } from '../contexts/ActivityManager';
import { TreePine, Pickaxe, Fish, FlaskConical, ChefHat, Hammer, Gem, Wand2, Snowflake, Egg, Sword, Mountain, Baby, Shield, Target, Skull } from 'lucide-react';

const ActivityManagerDemo: React.FC = () => {
  const { getAllSkills, getSkillLevel, startSkill, stopSkill, addExperience, getTotalLevel } = useActivityManager();

  const skills = getAllSkills();
  const totalLevel = getTotalLevel();

  const iconMap: Record<string, React.ComponentType<any>> = {
    TreePine,
    Pickaxe,
    Fish,
    FlaskConical,
    ChefHat,
    Hammer,
    Gem,
    Wand2,
    Snowflake,
    Egg,
    Sword,
    Mountain,
    Baby,
    Shield,
    Target,
    Skull
  };

  const handleAddExperience = (skillId: string) => {
    addExperience(skillId, 50);
  };

  const handleStartSkill = (skillId: string) => {
    startSkill(skillId);
  };

  const handleStopSkill = (skillId: string) => {
    stopSkill(skillId);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1>Activity Manager Demo</h1>
      <p>Total Level: {totalLevel}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '20px' }}>
        {skills.map(skill => {
          const IconComponent = iconMap[skill.icon] || TreePine;
          return (
            <div key={skill.id} style={{ 
              border: '1px solid #333', 
              padding: '15px', 
              borderRadius: '8px',
              backgroundColor: '#2a2a2a'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <IconComponent size={24} style={{ color: skill.color, marginRight: '10px' }} />
                <div>
                  <h3 style={{ margin: 0 }}>{skill.name}</h3>
                  <p style={{ margin: 0, fontSize: '14px' }}>Level {skill.level}</p>
                </div>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '12px', marginBottom: '5px' }}>
                  EXP: {skill.experience} / {skill.maxExperience}
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '4px', 
                  backgroundColor: '#333', 
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(skill.experience / skill.maxExperience) * 100}%`,
                    height: '100%',
                    backgroundColor: skill.color,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '12px', marginBottom: '5px' }}>
                  Progress: {Math.round(skill.progress)}%
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '4px', 
                  backgroundColor: '#333', 
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${skill.progress}%`,
                    height: '100%',
                    backgroundColor: '#4CAF50',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => handleAddExperience(skill.id)}
                  style={{
                    padding: '5px 10px',
                    fontSize: '12px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  +50 EXP
                </button>
                
                {skill.isActive ? (
                  <button 
                    onClick={() => handleStopSkill(skill.id)}
                    style={{
                      padding: '5px 10px',
                      fontSize: '12px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Stop
                  </button>
                ) : (
                  <button 
                    onClick={() => handleStartSkill(skill.id)}
                    style={{
                      padding: '5px 10px',
                      fontSize: '12px',
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Start
                  </button>
                )}
              </div>

              {skill.isActive && (
                <div style={{ 
                  marginTop: '10px', 
                  padding: '5px', 
                  backgroundColor: '#4CAF50', 
                  borderRadius: '4px',
                  fontSize: '12px',
                  textAlign: 'center'
                }}>
                  ACTIVE
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityManagerDemo;

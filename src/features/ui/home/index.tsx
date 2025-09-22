import React from 'react';
import { useGameState } from '../../../core/hooks/useGameState';
import { Crown, Zap, Coins, TreePine, Pickaxe, Fish, ChefHat } from 'lucide-react';
import styles from './Home.module.scss';

export default function Home() {
  const { gameState, toggleSkill } = useGameState();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to Skill Issue Chronicles!</h1>
        <p className={styles.subtitle}>Your idle adventure begins here. Start by activating skills to generate resources!</p>
      </div>

      {/* Active Skills Section */}
      <div className={styles.skillsSection}>
        <h2 className={styles.sectionTitle}>Active Skills</h2>
        <div className={styles.skillsGrid}>
          {Object.values(gameState.skills).map(skill => {
            const getSkillIcon = (skillId: string) => {
              switch (skillId) {
                case 'woodcutting': return <TreePine size={24} />;
                case 'mining': return <Pickaxe size={24} />;
                case 'fishing': return <Fish size={24} />;
                case 'cooking': return <ChefHat size={24} />;
                default: return <Zap size={24} />;
              }
            };

            return (
              <div 
                key={skill.id} 
                className={`${styles.skillCard} ${skill.isActive ? styles.active : ''}`}
                onClick={() => toggleSkill(skill.id)}
              >
                <div className={styles.skillIcon}>
                  {getSkillIcon(skill.id)}
                </div>
                <div className={styles.skillInfo}>
                  <h3 className={styles.skillName}>{skill.name}</h3>
                  <p className={styles.skillLevel}>Level {skill.level}</p>
                  <p className={styles.skillStatus}>
                    {skill.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Crown size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Character Level</h3>
            <p className={styles.statValue}>{gameState.character.totalLevel}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Zap size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Active Skills</h3>
            <p className={styles.statValue}>
              {Object.values(gameState.skills).filter(skill => skill.isActive).length}
            </p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Coins size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Total Resources</h3>
            <p className={styles.statValue}>
              {Object.values(gameState.resources.secondary).reduce((sum, val) => sum + val, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

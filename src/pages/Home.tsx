import React from 'react';
import { useGameState } from '../hooks/useGameState';
import SkillCard from '../components/SkillCard';
import { Crown, Zap, Coins } from 'lucide-react';
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

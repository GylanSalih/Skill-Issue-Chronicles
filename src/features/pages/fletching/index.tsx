import { ArrowRight, Shield, Target, Zap } from 'lucide-react';
import React, { useState } from 'react';
import styles from './Fletching.module.scss';

const Fletching: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('basic-arrow');
  const [isActive, setIsActive] = useState(false);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  const projects = [
    {
      id: 'basic-arrow',
      name: 'Basic Arrow',
      level: 1,
      xp: 15,
      materials: ['Wood', 'Feather'],
      color: '#8B4513',
      icon: '🏹',
    },
    {
      id: 'bronze-arrow',
      name: 'Bronze Arrow',
      level: 5,
      xp: 25,
      materials: ['Wood', 'Bronze Head', 'Feather'],
      color: '#CD7F32',
      icon: '🏹',
    },
    {
      id: 'iron-arrow',
      name: 'Iron Arrow',
      level: 20,
      xp: 40,
      materials: ['Wood', 'Iron Head', 'Feather'],
      color: '#C0C0C0',
      icon: '🏹',
    },
    {
      id: 'steel-arrow',
      name: 'Steel Arrow',
      level: 35,
      xp: 65,
      materials: ['Wood', 'Steel Head', 'Feather'],
      color: '#A8A8A8',
      icon: '🏹',
    },
    {
      id: 'mithril-arrow',
      name: 'Mithril Arrow',
      level: 50,
      xp: 100,
      materials: ['Wood', 'Mithril Head', 'Feather'],
      color: '#87CEEB',
      icon: '🏹',
    },
    {
      id: 'adamant-arrow',
      name: 'Adamant Arrow',
      level: 65,
      xp: 150,
      materials: ['Wood', 'Adamant Head', 'Feather'],
      color: '#4B0082',
      icon: '🏹',
    },
    {
      id: 'rune-arrow',
      name: 'Rune Arrow',
      level: 80,
      xp: 200,
      materials: ['Wood', 'Rune Head', 'Feather'],
      color: '#FFD700',
      icon: '🏹',
    },
  ];

  const handleStartFletching = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.fletching}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Target className={styles.titleIcon} />
          <h1>Fletching</h1>
          <span className={styles.level}>Level {level}</span>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Experience</span>
            <span className={styles.statValue}>
              {experience.toLocaleString()}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Next Level</span>
            <span className={styles.statValue}>
              {(level * 1000 - experience).toLocaleString()} XP
            </span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.projectSelection}>
          <h3>Select Project</h3>
          <div className={styles.projectGrid}>
            {projects.map(project => (
              <div
                key={project.id}
                className={`${styles.projectCard} ${selectedProject === project.id ? styles.selected : ''} ${level < project.level ? styles.locked : ''}`}
                onClick={() =>
                  level >= project.level && setSelectedProject(project.id)
                }
              >
                <div className={styles.projectIcon}>{project.icon}</div>
                <div className={styles.projectInfo}>
                  <h4>{project.name}</h4>
                  <p>Level {project.level}</p>
                  <p>{project.xp} XP</p>
                  <div className={styles.materials}>
                    {project.materials.map((material, index) => (
                      <span key={index} className={styles.material}>
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                {level < project.level && (
                  <div className={styles.lockIcon}>🔒</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.fletchingArea}>
          <div className={styles.workshop}>
            <div className={styles.workbench}>
              <div className={styles.tools}>
                <div className={styles.knife}>🔪</div>
                <div className={styles.feathers}>🪶</div>
                <div className={styles.wood}>🪵</div>
              </div>
              <div
                className={`${styles.crafting} ${isActive ? styles.active : ''}`}
              >
                <ArrowRight className={styles.arrowIcon} />
                <div className={styles.craftingParticles}>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={styles.particle} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <button
              className={`${styles.startButton} ${isActive ? styles.active : ''}`}
              onClick={handleStartFletching}
              disabled={
                level < projects.find(p => p.id === selectedProject)?.level!
              }
            >
              {isActive ? 'Stop Fletching' : 'Start Fletching'}
            </button>
          </div>
        </div>

        <div className={styles.bonuses}>
          <h3>Fletching Bonuses</h3>
          <div className={styles.bonusGrid}>
            <div className={styles.bonusCard}>
              <Zap className={styles.bonusIcon} />
              <h4>Precision Strike</h4>
              <p>Chance to create perfect arrows</p>
            </div>
            <div className={styles.bonusCard}>
              <Shield className={styles.bonusIcon} />
              <h4>Master Craftsman</h4>
              <p>Reduced material consumption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fletching;

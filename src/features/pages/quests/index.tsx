import React, { useState } from 'react';
import { BookOpen, Star, Clock, Trophy, MapPin } from 'lucide-react';
import styles from './Quests.module.scss';

const Quests: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('active');
  const [selectedQuest, setSelectedQuest] = useState(1);

  const quests = [
    {
      id: 1,
      title: 'The Mystic Forest',
      description:
        'Explore the depths of the Mystic Forest and discover its secrets.',
      type: 'exploration',
      level: 5,
      rewards: ['1000 XP', '500 Gold', 'Forest Amulet'],
      objectives: [
        { text: 'Enter the Mystic Forest', completed: true },
        { text: 'Find 3 Ancient Runes', completed: true },
        { text: 'Defeat the Forest Guardian', completed: false },
      ],
      progress: 67,
      timeLimit: '2 days',
      difficulty: 'Easy',
      icon: '🌲',
    },
    {
      id: 2,
      title: 'Mining Mastery',
      description:
        'Prove your mining skills by gathering rare ores from the Iron Mountains.',
      type: 'skill',
      level: 15,
      rewards: ['2000 XP', '1000 Gold', 'Mining Pickaxe'],
      objectives: [
        { text: 'Mine 50 Iron Ore', completed: true },
        { text: 'Mine 25 Gold Ore', completed: false },
        { text: 'Mine 10 Mithril Ore', completed: false },
      ],
      progress: 33,
      timeLimit: '5 days',
      difficulty: 'Medium',
      icon: '⛏️',
    },
    {
      id: 3,
      title: 'Dragon Slayer',
      description:
        'Face the ancient dragon that terrorizes the northern lands.',
      type: 'combat',
      level: 50,
      rewards: ['5000 XP', '5000 Gold', 'Dragon Scale Armor'],
      objectives: [
        { text: "Reach the Dragon's Lair", completed: false },
        { text: 'Defeat the Dragon', completed: false },
        { text: 'Return with the Dragon Scale', completed: false },
      ],
      progress: 0,
      timeLimit: '7 days',
      difficulty: 'Hard',
      icon: '🐉',
    },
  ];

  const completedQuests = [
    {
      id: 4,
      title: 'First Steps',
      description: 'Complete your first training session.',
      type: 'tutorial',
      level: 1,
      rewards: ['100 XP', '50 Gold'],
      completedDate: '2024-01-15',
      icon: '👶',
    },
  ];

  const selectedQuestData = quests.find(q => q.id === selectedQuest);

  return (
    <div className={styles.quests}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <BookOpen className={styles.titleIcon} />
          <h1>Quests</h1>
        </div>
        <div className={styles.questStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Active Quests</span>
            <span className={styles.statValue}>{quests.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Completed</span>
            <span className={styles.statValue}>{completedQuests.length}</span>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${selectedTab === 'active' ? styles.active : ''}`}
          onClick={() => setSelectedTab('active')}
        >
          <Star className={styles.tabIcon} />
          Active Quests
        </button>
        <button
          className={`${styles.tab} ${selectedTab === 'completed' ? styles.active : ''}`}
          onClick={() => setSelectedTab('completed')}
        >
          <Trophy className={styles.tabIcon} />
          Completed
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.questList}>
          <h3>
            {selectedTab === 'active' ? 'Active Quests' : 'Completed Quests'}
          </h3>
          <div className={styles.questGrid}>
            {(selectedTab === 'active' ? quests : completedQuests).map(
              quest => (
                <div
                  key={quest.id}
                  className={`${styles.questCard} ${selectedQuest === quest.id ? styles.selected : ''}`}
                  onClick={() => setSelectedQuest(quest.id)}
                >
                  <div className={styles.questIcon}>{quest.icon}</div>
                  <div className={styles.questInfo}>
                    <h4>{quest.title}</h4>
                    <p className={styles.questLevel}>Level {quest.level}</p>
                    <p className={styles.questDifficulty}>{quest.difficulty}</p>
                    {selectedTab === 'active' && (
                      <div className={styles.questProgress}>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: `${quest.progress}%` }}
                          />
                        </div>
                        <span className={styles.progressText}>
                          {quest.progress}%
                        </span>
                      </div>
                    )}
                  </div>
                  {selectedTab === 'active' && (
                    <div className={styles.questTime}>
                      <Clock className={styles.timeIcon} />
                      <span>{quest.timeLimit}</span>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        <div className={styles.questDetails}>
          {selectedQuestData && (
            <>
              <div className={styles.questHeader}>
                <div className={styles.questTitle}>
                  <span className={styles.questIcon}>
                    {selectedQuestData.icon}
                  </span>
                  <h3>{selectedQuestData.title}</h3>
                </div>
                <div className={styles.questMeta}>
                  <span className={styles.questType}>
                    {selectedQuestData.type}
                  </span>
                  <span className={styles.questLevel}>
                    Level {selectedQuestData.level}
                  </span>
                </div>
              </div>

              <div className={styles.questDescription}>
                <p>{selectedQuestData.description}</p>
              </div>

              <div className={styles.questObjectives}>
                <h4>Objectives</h4>
                <div className={styles.objectivesList}>
                  {selectedQuestData.objectives.map((objective, index) => (
                    <div key={index} className={styles.objective}>
                      <div
                        className={`${styles.objectiveCheck} ${objective.completed ? styles.completed : ''}`}
                      >
                        {objective.completed ? '✓' : '○'}
                      </div>
                      <span
                        className={
                          objective.completed ? styles.completedText : ''
                        }
                      >
                        {objective.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.questRewards}>
                <h4>Rewards</h4>
                <div className={styles.rewardsList}>
                  {selectedQuestData.rewards.map((reward, index) => (
                    <span key={index} className={styles.reward}>
                      {reward}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.questActions}>
                <button className={styles.abandonButton}>Abandon Quest</button>
                <button className={styles.trackButton}>
                  <MapPin className={styles.actionIcon} />
                  Track Quest
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quests;

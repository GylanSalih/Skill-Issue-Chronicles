import React from 'react';
import { 
  Home, 
  TrendingUp, 
  Clock, 
  Star, 
  Zap, 
  Shield, 
  Sword, 
  Crown,
  Coins,
  Heart,
  Activity,
  Target
} from 'lucide-react';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const playerStats = {
    level: 42,
    experience: 15420,
    experienceToNext: 580,
    health: 850,
    maxHealth: 1000,
    mana: 320,
    maxMana: 400,
    stamina: 180,
    maxStamina: 200,
    gold: 12500,
    gems: 45
  };

  const recentActivities = [
    { id: 1, type: 'woodcutting', action: 'Chopped Normal Wood', time: '2 minutes ago', xp: 15 },
    { id: 2, type: 'mining', action: 'Mined Iron Ore', time: '5 minutes ago', xp: 25 },
    { id: 3, type: 'combat', action: 'Defeated Goblin', time: '8 minutes ago', xp: 40 },
    { id: 4, type: 'fishing', action: 'Caught Salmon', time: '12 minutes ago', xp: 20 }
  ];

  const activeSkills = [
    { name: 'Woodcutting', level: 15, progress: 75, xp: 1250, nextLevel: 1500 },
    { name: 'Mining', level: 12, progress: 60, xp: 900, nextLevel: 1200 },
    { name: 'Combat', level: 18, progress: 45, xp: 1800, nextLevel: 2000 },
    { name: 'Fishing', level: 8, progress: 90, xp: 450, nextLevel: 500 }
  ];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Reach level 10', icon: Star, completed: true },
    { id: 2, title: 'Wood Master', description: 'Chop 1000 pieces of wood', icon: Target, completed: true },
    { id: 3, title: 'Mining Expert', description: 'Mine 500 ores', icon: Shield, completed: false },
    { id: 4, title: 'Combat Veteran', description: 'Win 100 battles', icon: Sword, completed: false }
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <Home className={styles.headerIcon} size={32} />
        <div className={styles.headerContent}>
          <h1>Dashboard</h1>
          <p>Welcome back, adventurer! Here's your current progress and activities.</p>
        </div>
      </div>

      <div className={styles.scenerySection}>
        <div className={styles.sceneryImage}>
          <img 
            src="/assets/img/scenery/halloffame2.png" 
            alt="Dungeon"
            className={styles.sceneryImg}
          />
        </div>
        <div className={styles.sceneryDescription}>
          <h2>Adventurer's Camp</h2>
          <p>
            Welcome to your personal camp, where your journey begins and legends are forged. 
            From this central hub, you can manage your character, track your progress, and plan 
            your next adventures. Every skill you master, every resource you gather, and every 
            battle you win brings you closer to becoming a true hero of the realm.
          </p>
        </div>
      </div>

      {/* Player Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <Crown className={styles.statIcon} size={20} />
            <span className={styles.statTitle}>Level</span>
          </div>
          <div className={styles.statValue}>{playerStats.level}</div>
          <div className={styles.statSubtext}>
            {playerStats.experience} / {playerStats.experience + playerStats.experienceToNext} XP
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(playerStats.experience / (playerStats.experience + playerStats.experienceToNext)) * 100}%` }}
            />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <Heart className={styles.statIcon} size={20} />
            <span className={styles.statTitle}>Health</span>
          </div>
          <div className={styles.statValue}>{playerStats.health}</div>
          <div className={styles.statSubtext}>/ {playerStats.maxHealth}</div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(playerStats.health / playerStats.maxHealth) * 100}%` }}
            />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <Zap className={styles.statIcon} size={20} />
            <span className={styles.statTitle}>Mana</span>
          </div>
          <div className={styles.statValue}>{playerStats.mana}</div>
          <div className={styles.statSubtext}>/ {playerStats.maxMana}</div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(playerStats.mana / playerStats.maxMana) * 100}%` }}
            />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <Activity className={styles.statIcon} size={20} />
            <span className={styles.statTitle}>Stamina</span>
          </div>
          <div className={styles.statValue}>{playerStats.stamina}</div>
          <div className={styles.statSubtext}>/ {playerStats.maxStamina}</div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(playerStats.stamina / playerStats.maxStamina) * 100}%` }}
            />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <Coins className={styles.statIcon} size={20} />
            <span className={styles.statTitle}>Gold</span>
          </div>
          <div className={styles.statValue}>{playerStats.gold.toLocaleString()}</div>
          <div className={styles.statSubtext}>Coins</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <Star className={styles.statIcon} size={20} />
            <span className={styles.statTitle}>Gems</span>
          </div>
          <div className={styles.statValue}>{playerStats.gems}</div>
          <div className={styles.statSubtext}>Premium Currency</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Recent Activities */}
        <div className={styles.widget}>
          <div className={styles.widgetHeader}>
            <Clock className={styles.widgetIcon} size={20} />
            <h3>Recent Activities</h3>
          </div>
          <div className={styles.widgetContent}>
            {recentActivities.map((activity) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  {activity.type === 'woodcutting' && <Target size={16} />}
                  {activity.type === 'mining' && <Shield size={16} />}
                  {activity.type === 'combat' && <Sword size={16} />}
                  {activity.type === 'fishing' && <Activity size={16} />}
                </div>
                <div className={styles.activityInfo}>
                  <div className={styles.activityAction}>{activity.action}</div>
                  <div className={styles.activityTime}>{activity.time}</div>
                </div>
                <div className={styles.activityXp}>+{activity.xp} XP</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Progress */}
        <div className={styles.widget}>
          <div className={styles.widgetHeader}>
            <TrendingUp className={styles.widgetIcon} size={20} />
            <h3>Skill Progress</h3>
          </div>
          <div className={styles.widgetContent}>
            {activeSkills.map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                <div className={styles.skillInfo}>
                  <div className={styles.skillName}>{skill.name}</div>
                  <div className={styles.skillLevel}>Level {skill.level}</div>
                </div>
                <div className={styles.skillProgress}>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                  <div className={styles.skillXp}>
                    {skill.xp} / {skill.nextLevel} XP
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className={styles.widget}>
          <div className={styles.widgetHeader}>
            <Star className={styles.widgetIcon} size={20} />
            <h3>Achievements</h3>
          </div>
          <div className={styles.widgetContent}>
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`${styles.achievementItem} ${achievement.completed ? styles.completed : ''}`}
              >
                <div className={styles.achievementIcon}>
                  <achievement.icon size={18} />
                </div>
                <div className={styles.achievementInfo}>
                  <div className={styles.achievementTitle}>{achievement.title}</div>
                  <div className={styles.achievementDescription}>{achievement.description}</div>
                </div>
                {achievement.completed && (
                  <div className={styles.achievementBadge}>✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.widget}>
          <div className={styles.widgetHeader}>
            <Zap className={styles.widgetIcon} size={20} />
            <h3>Quick Actions</h3>
          </div>
          <div className={styles.widgetContent}>
            <div className={styles.quickActions}>
              <button className={styles.quickActionBtn}>
                <Target size={16} />
                Start Woodcutting
              </button>
              <button className={styles.quickActionBtn}>
                <Shield size={16} />
                Go Mining
              </button>
              <button className={styles.quickActionBtn}>
                <Sword size={16} />
                Enter Dungeon
              </button>
              <button className={styles.quickActionBtn}>
                <Activity size={16} />
                Go Fishing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard
import { Crown, Shield, Star, Trophy, Users } from 'lucide-react';
import React, { useState } from 'react';
import styles from './Guilds.module.scss';

const Guilds: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('my-guild');

  const myGuild = {
    name: 'Dragon Slayers',
    level: 15,
    members: 45,
    maxMembers: 50,
    description:
      'A guild dedicated to slaying dragons and protecting the realm.',
    leader: 'DragonMaster',
    founded: '2025-06-15',
    achievements: [
      'Guild War Champions',
      'Dragon Slayer Guild',
      'Elite Status',
    ],
    icon: '🐉',
  };

  const guilds = [
    {
      name: 'Shadow Assassins',
      level: 20,
      members: 48,
      maxMembers: 50,
      description: 'Stealth and precision are our weapons.',
      leader: 'ShadowKing',
      founded: '2025-03-10',
      icon: '🗡️',
    },
    {
      name: 'Mystic Mages',
      level: 18,
      members: 42,
      maxMembers: 50,
      description: 'Master the arcane arts with us.',
      leader: 'ArchMage',
      founded: '2025-05-20',
      icon: '🔮',
    },
  ];

  return (
    <div className={styles.guilds}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Users className={styles.titleIcon} />
          <h1>Guilds</h1>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${selectedTab === 'my-guild' ? styles.active : ''}`}
          onClick={() => setSelectedTab('my-guild')}
        >
          <Crown className={styles.tabIcon} />
          My Guild
        </button>
        <button
          className={`${styles.tab} ${selectedTab === 'browse' ? styles.active : ''}`}
          onClick={() => setSelectedTab('browse')}
        >
          <Star className={styles.tabIcon} />
          Browse Guilds
        </button>
      </div>

      {selectedTab === 'my-guild' && (
        <div className={styles.myGuild}>
          <div className={styles.guildHeader}>
            <div className={styles.guildIcon}>{myGuild.icon}</div>
            <div className={styles.guildInfo}>
              <h2>{myGuild.name}</h2>
              <p className={styles.guildLevel}>Level {myGuild.level}</p>
              <p className={styles.guildDescription}>{myGuild.description}</p>
            </div>
          </div>

          <div className={styles.guildStats}>
            <div className={styles.stat}>
              <Users className={styles.statIcon} />
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Members</span>
                <span className={styles.statValue}>
                  {myGuild.members}/{myGuild.maxMembers}
                </span>
              </div>
            </div>
            <div className={styles.stat}>
              <Crown className={styles.statIcon} />
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Leader</span>
                <span className={styles.statValue}>{myGuild.leader}</span>
              </div>
            </div>
            <div className={styles.stat}>
              <Shield className={styles.statIcon} />
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Founded</span>
                <span className={styles.statValue}>{myGuild.founded}</span>
              </div>
            </div>
          </div>

          <div className={styles.achievements}>
            <h3>Achievements</h3>
            <div className={styles.achievementsList}>
              {myGuild.achievements.map((achievement, index) => (
                <div key={index} className={styles.achievement}>
                  <Trophy className={styles.achievementIcon} />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'browse' && (
        <div className={styles.browseGuilds}>
          <div className={styles.guildsGrid}>
            {guilds.map((guild, index) => (
              <div key={index} className={styles.guildCard}>
                <div className={styles.guildHeader}>
                  <div className={styles.guildIcon}>{guild.icon}</div>
                  <div className={styles.guildInfo}>
                    <h3>{guild.name}</h3>
                    <p className={styles.guildLevel}>Level {guild.level}</p>
                  </div>
                </div>

                <div className={styles.guildDescription}>
                  <p>{guild.description}</p>
                </div>

                <div className={styles.guildMeta}>
                  <div className={styles.metaItem}>
                    <Users className={styles.metaIcon} />
                    <span>
                      {guild.members}/{guild.maxMembers} members
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <Crown className={styles.metaIcon} />
                    <span>Leader: {guild.leader}</span>
                  </div>
                </div>

                <button className={styles.joinButton}>Request to Join</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Guilds;

import React, { useState } from 'react';
import { Calendar, Star, Clock, Trophy, Gift } from 'lucide-react';
import styles from './Events.module.scss';

const Events: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('active');

  const activeEvents = [
    {
      id: 1,
      name: 'Winter Festival',
      description:
        'Celebrate the winter season with special rewards and activities.',
      type: 'seasonal',
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      rewards: ['Festival Hat', 'Winter Cloak', 'Snow Globe'],
      participants: 1250,
      icon: '❄️',
      color: '#87ceeb',
    },
    {
      id: 2,
      name: 'Double XP Weekend',
      description: 'Gain double experience from all activities this weekend.',
      type: 'bonus',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      rewards: ['2x XP', 'Bonus Gold'],
      participants: 2500,
      icon: '⚡',
      color: '#fbbf24',
    },
  ];

  const upcomingEvents = [
    {
      id: 3,
      name: "Valentine's Day Event",
      description: 'Special romantic quests and heart-themed rewards.',
      type: 'holiday',
      startDate: '2024-02-14',
      endDate: '2024-02-20',
      rewards: ['Heart Amulet', 'Love Potion', 'Cupid Wings'],
      participants: 0,
      icon: '💕',
      color: '#ec4899',
    },
  ];

  return (
    <div className={styles.events}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Calendar className={styles.titleIcon} />
          <h1>Events</h1>
        </div>
        <div className={styles.eventStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Active Events</span>
            <span className={styles.statValue}>{activeEvents.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Upcoming</span>
            <span className={styles.statValue}>{upcomingEvents.length}</span>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${selectedTab === 'active' ? styles.active : ''}`}
          onClick={() => setSelectedTab('active')}
        >
          <Star className={styles.tabIcon} />
          Active Events
        </button>
        <button
          className={`${styles.tab} ${selectedTab === 'upcoming' ? styles.active : ''}`}
          onClick={() => setSelectedTab('upcoming')}
        >
          <Clock className={styles.tabIcon} />
          Upcoming
        </button>
      </div>

      <div className={styles.eventsGrid}>
        {(selectedTab === 'active' ? activeEvents : upcomingEvents).map(
          event => (
            <div
              key={event.id}
              className={styles.eventCard}
              style={{ '--event-color': event.color } as React.CSSProperties}
            >
              <div className={styles.eventHeader}>
                <div className={styles.eventIcon}>{event.icon}</div>
                <div className={styles.eventInfo}>
                  <h3>{event.name}</h3>
                  <p className={styles.eventType}>{event.type}</p>
                </div>
              </div>

              <div className={styles.eventDescription}>
                <p>{event.description}</p>
              </div>

              <div className={styles.eventDetails}>
                <div className={styles.eventDate}>
                  <Clock className={styles.detailIcon} />
                  <span>
                    {event.startDate} - {event.endDate}
                  </span>
                </div>

                <div className={styles.eventParticipants}>
                  <Trophy className={styles.detailIcon} />
                  <span>
                    {event.participants.toLocaleString()} participants
                  </span>
                </div>
              </div>

              <div className={styles.eventRewards}>
                <h4>Rewards</h4>
                <div className={styles.rewardsList}>
                  {event.rewards.map((reward, index) => (
                    <span key={index} className={styles.reward}>
                      {reward}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.eventActions}>
                <button className={styles.joinButton}>
                  {selectedTab === 'active' ? 'Join Event' : 'Set Reminder'}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Events;

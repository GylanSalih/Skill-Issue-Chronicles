import React from 'react';
import { Newspaper } from 'lucide-react';
import styles from './News.module.scss';

const News: React.FC = () => {
  return (
    <div className={styles.news}>
      <div className={styles.header}>
        <Newspaper className={styles.headerIcon} size={32} />
        <div className={styles.headerContent}>
          <h1>Latest News</h1>
          <p>
            Stay updated with the latest announcements and events in Skill-Issue
            Chronicles
          </p>
        </div>
      </div>

      <div className={styles.scenerySection}>
        <div className={styles.sceneryImage}>
          <img
            src='/assets/img/scenery/news_scenery.png'
            alt='News and Updates'
            className={styles.sceneryImg}
          />
        </div>
        <div className={styles.sceneryDescription}>
          <h2>News & Updates Center</h2>
          <p>
            Welcome to the official news center of Skill-Issue Chronicles! Here
            you'll find all the latest updates, patch notes, events, and
            announcements. Stay informed about new features, balance changes,
            community events, and special promotions. Our development team works
            tirelessly to bring you the best idle RPG experience possible.
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.newsArticle}>
          <div className={styles.articleHeader}>
            <h2 className={styles.articleTitle}>Patch 1.0.1 Released!</h2>
            <p className={styles.articleDate}>October 26, 2023</p>
          </div>
          <div className={styles.articleContent}>
            <p>
              We've just pushed a new patch with several bug fixes and
              performance improvements. Key changes include:
            </p>
            <ul>
              <li>
                Fixed an issue with double resource collection in Woodcutting
              </li>
              <li>Improved UI responsiveness in various menus</li>
              <li>Minor balance adjustments to early-game combat</li>
              <li>Added new character customization options</li>
              <li>Enhanced mobile device compatibility</li>
            </ul>
            <p>
              Read the full patch notes on our Discord server and let us know
              what you think!
            </p>
          </div>
        </div>

        <div className={styles.newsArticle}>
          <div className={styles.articleHeader}>
            <h2 className={styles.articleTitle}>Upcoming Halloween Event!</h2>
            <p className={styles.articleDate}>October 20, 2023</p>
          </div>
          <div className={styles.articleContent}>
            <p>
              Get ready for our spooky Halloween event starting next week!
              Collect special candies, defeat haunted creatures, and earn
              exclusive cosmetic rewards. The event will feature:
            </p>
            <ul>
              <li>Special Halloween-themed dungeons</li>
              <li>Limited-time spooky character skins</li>
              <li>Exclusive Halloween achievements</li>
              <li>Double XP weekends</li>
              <li>Special event currency and rewards</li>
            </ul>
            <p>
              More details coming soon! Make sure to follow our social media for
              updates.
            </p>
          </div>
        </div>

        <div className={styles.newsArticle}>
          <div className={styles.articleHeader}>
            <h2 className={styles.articleTitle}>
              Community Spotlight: Top Players
            </h2>
            <p className={styles.articleDate}>October 15, 2023</p>
          </div>
          <div className={styles.articleContent}>
            <p>
              This week we're highlighting some of our most dedicated players
              who have achieved incredible milestones in Skill-Issue Chronicles:
            </p>
            <ul>
              <li>
                <strong>DragonSlayer99</strong> - First player to reach level
                100
              </li>
              <li>
                <strong>WoodMaster</strong> - Collected over 1 million wood
                resources
              </li>
              <li>
                <strong>GemHunter</strong> - Discovered all rare gem types
              </li>
              <li>
                <strong>SpeedRunner</strong> - Completed the main quest in
                record time
              </li>
            </ul>
            <p>
              Congratulations to all our amazing players! Keep up the great work
              and who knows, you might be featured next!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;

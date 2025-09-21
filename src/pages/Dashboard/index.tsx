import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Zap, 
  Shield, 
  Sword, 
  Activity,
  Target,
  Star,
  Crown,
  Trophy,
  Flame,
  Pickaxe,
  Fish,
  ChefHat,
  Anvil,
  Wand2,
  Scroll,
  ChevronRight,
  Calendar,
  Users,
  TrendingUp,
  AlertCircle,
  BookOpen,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Image slider data
  const sliderImages = [
    {
      src: '/assets/img/scenery/halloffame2.png',
      title: 'Hall of Fame',
      description: 'See the greatest warriors of our realm'
    },
    {
      src: '/assets/img/scenery/dungeon.png',
      title: 'Dark Dungeons',
      description: 'Explore dangerous underground realms'
    },
    {
      src: '/assets/img/scenery/dungeon2.png',
      title: 'Forest Adventures',
      description: 'Gather resources in mystical forests'
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // News data
  const newsItems = [
    {
      id: 1,
      title: 'New Dungeon Update Released!',
      description: 'Explore the mysterious Shadowrealm with new bosses and legendary loot.',
      date: '2024-01-15',
      type: 'update',
      readMore: '/news'
    },
    {
      id: 2,
      title: 'Winter Event Coming Soon',
      description: 'Prepare for the annual Winter Festival with exclusive rewards and activities.',
      date: '2024-01-20',
      type: 'event',
      readMore: '/news'
    },
    {
      id: 3,
      title: 'Balance Changes',
      description: 'Combat system improvements and skill adjustments based on community feedback.',
      date: '2024-01-18',
      type: 'patch',
      readMore: '/news'
    }
  ];

  // Quick access pages
  const quickPages = [
    { name: 'Woodcutting', icon: Target, path: '/woodcutting', color: '#10b981' },
    { name: 'Mining', icon: Pickaxe, path: '/mining', color: '#f59e0b' },
    { name: 'Combat', icon: Sword, path: '/dungeon', color: '#ef4444' },
    { name: 'Fishing', icon: Fish, path: '/fishing', color: '#3b82f6' },
    { name: 'Cooking', icon: ChefHat, path: '/cooking', color: '#f97316' },
    { name: 'Smithing', icon: Anvil, path: '/smithing', color: '#6b7280' },
    { name: 'Magic', icon: Wand2, path: '/magic', color: '#8b5cf6' },
    { name: 'Statistics', icon: TrendingUp, path: '/statistics', color: '#06b6d4' }
  ];

  const handlePageClick = (path: string) => {
    navigate(path);
  };

  const handleNewsClick = (readMore: string) => {
    navigate(readMore);
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Home className={styles.headerIcon} size={24} />
          <div className={styles.headerContent}>
            <h1>Adventure Hub</h1>
            <p>Welcome back, brave adventurer! Choose your next quest.</p>
          </div>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.statItem}>
            <Users size={16} />
            <span>48,500 Online</span>
          </div>
          <div className={styles.statItem}>
            <Calendar size={16} />
            <span>Server: Online</span>
          </div>
        </div>
      </div>

      {/* Hero Slider */}
      <div className={styles.heroSection}>
        <div className={styles.sliderContainer}>
          <div className={styles.slider}>
            {sliderImages.map((image, index) => (
              <div 
                key={index}
                className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
              >
                <img src={image.src} alt={image.title} />
                <div className={styles.slideContent}>
                  <h2>{image.title}</h2>
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.sliderDots}>
            {sliderImages.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* News Section */}
        <div className={styles.newsSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Scroll className={styles.sectionIcon} size={20} />
              <h2>Latest News & Updates</h2>
            </div>
            <button 
              className={styles.readMoreBtn}
              onClick={() => handleNewsClick('/news')}
            >
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          <div className={styles.newsList}>
            {newsItems.map((item) => (
              <div key={item.id} className={styles.newsItem}>
                <div className={styles.newsHeader}>
                  <div className={`${styles.newsType} ${styles[item.type]}`}>
                    {item.type === 'update' && <Zap size={14} />}
                    {item.type === 'event' && <Star size={14} />}
                    {item.type === 'patch' && <AlertCircle size={14} />}
                    <span>{item.type.toUpperCase()}</span>
                  </div>
                  <span className={styles.newsDate}>{item.date}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button 
                  className={styles.newsReadMore}
                  onClick={() => handleNewsClick(item.readMore)}
                >
                  Read More <ExternalLink size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access Section */}
        <div className={styles.quickAccessSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Target className={styles.sectionIcon} size={20} />
              <h2>Quick Access</h2>
            </div>
          </div>
          
          <div className={styles.quickPagesGrid}>
            {quickPages.map((page, index) => {
              const IconComponent = page.icon;
              return (
                <button
                  key={index}
                  className={styles.quickPageBtn}
                  onClick={() => handlePageClick(page.path)}
                  style={{ '--accent-color': page.color } as React.CSSProperties}
                >
                  <div className={styles.quickPageIcon}>
                    <IconComponent size={20} />
                  </div>
                  <span>{page.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Game Stats */}
        <div className={styles.statsSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Trophy className={styles.sectionIcon} size={20} />
              <h2>Your Progress</h2>
            </div>
          </div>
          
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Crown size={20} />
              </div>
              <div className={styles.statContent}>
                <h3>Level 1</h3>
                <p>Adventurer</p>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '25%' }} />
                </div>
                <span className={styles.progressText}>250 / 1000 XP</span>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Target size={20} />
              </div>
              <div className={styles.statContent}>
                <h3>Skills</h3>
                <p>8 Available</p>
                <div className={styles.skillList}>
                  <span>Woodcutting</span>
                  <span>Mining</span>
                  <span>Fishing</span>
                </div>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Trophy size={20} />
              </div>
              <div className={styles.statContent}>
                <h3>Achievements</h3>
                <p>3 / 50 Unlocked</p>
                <div className={styles.achievementList}>
                  <span>First Steps</span>
                  <span>Resource Gatherer</span>
                  <span>Explorer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className={styles.communitySection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Users className={styles.sectionIcon} size={20} />
              <h2>Community & Support</h2>
            </div>
          </div>
          
          <div className={styles.communityButtons}>
            <button className={styles.communityBtn}>
              <Users size={16} />
              Discord
            </button>
            <button className={styles.communityBtn}>
              <BookOpen size={16} />
              Game Rules
            </button>
            <button className={styles.communityBtn}>
              <Scroll size={16} />
              News
            </button>
            <button className={styles.communityBtn}>
              <AlertCircle size={16} />
              Support
            </button>
            <button className={styles.communityBtn}>
              <Trophy size={16} />
              Leaderboard
            </button>
            <button className={styles.communityBtn}>
              <Star size={16} />
              Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
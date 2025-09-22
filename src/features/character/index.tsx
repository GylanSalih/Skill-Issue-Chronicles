import React from 'react';
import { User, Palette, Award } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileTab from './tabs/ProfileTab';
import SkinsTab from './tabs/SkinsTab';
import BadgesTab from './tabs/BadgesTab';
import styles from './Character.module.scss';

const Character = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Characters are already loaded by GameContext, no need to load again

  // Get current tab from URL
  const getCurrentTab = () => {
    const path = location.pathname;
    if (path.includes('/skins')) return 'skins';
    if (path.includes('/badges')) return 'badges';
    return 'profile';
  };

  const activeTab = getCurrentTab();

  const handleTabClick = (tab: 'profile' | 'skins' | 'badges') => {
    navigate(`/character/${tab}`);
  };

  return (
    <div className={styles.characterPage}>
      <div className={styles.header}>
        <User className={styles.headerIcon} size={24} />
        <div className={styles.headerContent}>
          <h1>Charakter-Details</h1>
          <p>Verwalte deinen Charakter und seine Eigenschaften</p>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={() => handleTabClick('profile')}
        >
          <User size={16} />
          <span>Profile</span>
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'skins' ? styles.active : ''}`}
          onClick={() => handleTabClick('skins')}
        >
          <Palette size={16} />
          <span>Skins</span>
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'badges' ? styles.active : ''}`}
          onClick={() => handleTabClick('badges')}
        >
          <Award size={16} />
          <span>Badges</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'skins' && <SkinsTab />}
        {activeTab === 'badges' && <BadgesTab />}
      </div>
    </div>
  );
};

export default Character;

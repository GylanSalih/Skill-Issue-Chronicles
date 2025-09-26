import { Award, BarChart3, Package, Palette, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Character.module.scss';
import {
  BadgesTab,
  InventoryTab,
  ProfileTab,
  SkinsTab,
  UiStuffRandomTab,
} from './Profile';

const Character = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Characters are already loaded by GameContext, no need to load again

  // Get current tab from URL
  const getCurrentTab = ():
    | 'profile'
    | 'skins'
    | 'badges'
    | 'uistuffrandom'
    | 'inventory' => {
    const path = location.pathname;
    if (path.includes('/skins')) return 'skins';
    if (path.includes('/badges')) return 'badges';
    if (path.includes('/uistuffrandom')) return 'uistuffrandom';
    if (path.includes('/inventory')) return 'inventory';

    return 'profile';
  };

  const activeTab = getCurrentTab();

  const handleTabClick = (
    tab: 'profile' | 'skins' | 'badges' | 'uistuffrandom' | 'inventory'
  ) => {
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
        <button
          className={`${styles.tabButton} ${activeTab === 'uistuffrandom' ? styles.active : ''}`}
          onClick={() => handleTabClick('uistuffrandom')}
        >
          <BarChart3 size={16} />
          <span>UI Stuff</span>
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'inventory' ? styles.active : ''}`}
          onClick={() => handleTabClick('inventory')}
        >
          <Package size={16} />
          <span>Inventory</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'skins' && <SkinsTab />}
        {activeTab === 'badges' && <BadgesTab />}
        {activeTab === 'uistuffrandom' && <UiStuffRandomTab />}
        {activeTab === 'inventory' && <InventoryTab />}
      </div>
    </div>
  );
};

export default Character;

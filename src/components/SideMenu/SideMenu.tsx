// SideMenu.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SideMenu.module.scss';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  path?: string;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  path: string;
}
import { 
  Home, 
  Sword, 
  Shield, 
  ShoppingBag, 
  Pickaxe, 
  TreePine, 
  Hammer, 
  Flame, 
  Trophy, 
  Settings, 
  ChevronRight,
  Coins,
  Star,
  Activity,
  Heart,
  Handshake
} from 'lucide-react';

const SideMenu = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

const menuCategories: { items: MenuItem[] }[] = [
  {
    items: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        icon: Home,
        path: '/'
      },
      {
        id: 'character',
        title: 'Character',
        icon: Shield,
        path: '/character'
      }
    ]
  },
  {
    items: [
      {
        id: 'combat',
        title: 'Combat',
        icon: Sword,
        hasSubmenu: true,
        submenu: [
          { id: 'dungeon', title: 'Dungeons', icon: Shield, path: '/dungeon' },
          { id: 'slayer', title: 'Slayer', icon: Sword, path: '/slayer' },
          { id: 'combat_areas', title: 'Combat Areas', icon: Activity, path: '/combat-areas' }
        ]
      }
    ]
  },
  {
    items: [
      {
        id: 'skills',
        title: 'Skills',
        icon: Activity,
        hasSubmenu: true,
        submenu: [
          { id: 'woodcutting', title: 'Woodcutting', icon: TreePine, path: '/woodcutting' },
          { id: 'fishing', title: 'Fishing', icon: Star, path: '/fishing' },
          { id: 'firemaking', title: 'Firemaking', icon: Flame, path: '/firemaking' },
          { id: 'cooking', title: 'Cooking', icon: Flame, path: '/cooking' },
          { id: 'mining', title: 'Mining', icon: Pickaxe, path: '/mining' },
          { id: 'smithing', title: 'Smithing', icon: Hammer, path: '/smithing' }
        ]
      }
    ]
  },
  {
    items: [
      {
        id: 'pets',
        title: 'Pets',
        icon: Heart,
        hasSubmenu: true,
        submenu: [
          { id: 'my-pets', title: 'My Pets', icon: Heart, path: '/pets' },
          { id: 'pet-training', title: 'Training', icon: Activity, path: '/pets/training' },
          { id: 'pet-battles', title: 'Battles', icon: Sword, path: '/pets/battles' },
          { id: 'pet-evolution', title: 'Evolution', icon: Star, path: '/pets/evolution' },
          { id: 'pet-trading', title: 'Trading', icon: Handshake, path: '/pets/trade' }
        ]
      }
    ]
  },
  {
    items: [
      {
        id: 'bank',
        title: 'Bank',
        icon: ShoppingBag,
        path: '/bank'
      },
      {
        id: 'shop',
        title: 'Shop',
        icon: Coins,
        path: '/shop'
      }
    ]
  },
  {
    items: [
      {
        id: 'statistics',
        title: 'Statistics',
        icon: Trophy,
        path: '/statistics'
      },
      {
        id: 'settings',
        title: 'Settings',
        icon: Settings,
        path: '/settings'
      }
    ]
  }
];


  // Menu is now always visible, no toggle needed

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

const handleItemClick = (item: MenuItem) => {
  if (item.hasSubmenu) {
    toggleCategory(item.id);
  } else {
    setActiveItem(item.id);
    if (item.path) {
      navigate(item.path);
    }
  }
};

const handleSubmenuClick = (subItem: SubMenuItem) => {
  setActiveItem(subItem.id);
  navigate(`/${subItem.id}`);
};


  return (
    <>
      {/* Side Menu - Always Visible */}
      <div className={styles.sideMenu}>
        
        {/* Header with Logo */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <Flame className={styles.logoIcon} />
            <h2 className={styles.logoText}>Skill Issue Chronicles</h2>
          </div>
          <p className={styles.version}>v0.0.1</p>
        </div>

          {/* Menu Categories */}
          <div className={styles.menuContainer}>
            {menuCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {categoryIndex > 0 && <div className={styles.categorySeparator} />}

                {category.items.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeItem === item.id;
                  const isExpanded = expandedCategories[item.id];

                  return (
                    <div key={item.id} className={styles.menuItem}>
                      {/* Main Menu Item */}
                      <button
                        onClick={() => handleItemClick(item)}
                        className={`${styles.menuButton} ${isActive ? styles.active : ''}`}
                      >
                        <div className={styles.menuButtonContent}>
                          <IconComponent className={styles.menuIcon} />
                          <span>{item.title}</span>
                        </div>

                        {item.hasSubmenu && (
                          <ChevronRight
                            className={`${styles.chevronIcon} ${isExpanded ? styles.expanded : ''}`}
                          />
                        )}
                      </button>

                      {/* Submenu */}
                      {item.hasSubmenu && (
                        <div className={`${styles.submenu} ${isExpanded ? styles.expanded : ''}`}>
                          <div className={styles.submenuContainer}>
                            {item.submenu?.map((subItem) => {
                              const SubIconComponent = subItem.icon;
                              const isSubActive = activeItem === subItem.id;

                              return (
                                <button
                                  key={subItem.id}
                                  onClick={() => handleSubmenuClick(subItem)}
                                  className={`${styles.submenuButton} ${isSubActive ? styles.active : ''}`}
                                >
                                  <SubIconComponent className={styles.submenuIcon} />
                                  <span>{subItem.title}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <p className={styles.footerText}>Online</p>
            <span className={styles.statusDot}></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
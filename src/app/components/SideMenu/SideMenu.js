'use client'

// SideMenu.jsx
import { useState } from 'react';
import styles from './SideMenu.module.css';
import { 
  Home, 
  Sword, 
  Shield, 
  ShoppingBag, 
  Pickaxe, 
  TreePine, 
  Hammer, 
  Flame, 
  Scroll, 
  Users, 
  Trophy, 
  Settings, 
  ChevronRight,
  Menu,
  X,
  Coins,
  Star,
  Zap,
  Crown,
  Activity
} from 'lucide-react';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedCategories, setExpandedCategories] = useState({});

  const menuCategories = [
    {
      label: 'Overview',
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
          icon: Crown,
          path: '/character'
        }
      ]
    },
    {
      label: 'Combat',
      items: [
        {
          id: 'combat',
          title: 'Combat',
          icon: Sword,
          hasSubmenu: true,
          submenu: [
            { id: 'dungeon', title: 'Dungeons', icon: Shield },
            { id: 'slayer', title: 'Slayer', icon: Sword },
            { id: 'combat_areas', title: 'Combat Areas', icon: Activity }
          ]
        }
      ]
    },
    {
      label: 'Skills',
      items: [
        {
          id: 'skills',
          title: 'Skills',
          icon: Activity,
          hasSubmenu: true,
          submenu: [
            { id: 'woodcutting', title: 'Woodcutting', icon: TreePine },
            { id: 'fishing', title: 'Fishing', icon: Star },
            { id: 'firemaking', title: 'Firemaking', icon: Flame },
            { id: 'cooking', title: 'Cooking', icon: Flame },
            { id: 'mining', title: 'Mining', icon: Pickaxe },
            { id: 'smithing', title: 'Smithing', icon: Hammer }
          ]
        }
      ]
    },
    {
      label: 'Items',
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
        },
        {
          id: 'equipment',
          title: 'Equipment',
          icon: Shield,
          path: '/equipment'
        }
      ]
    },
    {
      label: 'Other',
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleItemClick = (item) => {
    if (item.hasSubmenu) {
      toggleCategory(item.id);
    } else {
      setActiveItem(item.id);
      // Hier würdest du die Navigation implementieren
      console.log(`Navigating to: ${item.path || item.id}`);
      // Beispiel für NextJS Router:
      // router.push(item.path || `/${item.id}`);
    }
  };

  const handleSubmenuClick = (subItem) => {
    setActiveItem(subItem.id);
    console.log(`Navigating to submenu: ${subItem.id}`);
    // Hier würdest du die Navigation implementieren
    // router.push(`/${subItem.id}`);
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={toggleMenu}
        className={styles.toggleButton}
        aria-label="Menu öffnen/schließen"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className={styles.overlay}
          onClick={toggleMenu}
        />
      )}

      {/* Side Menu */}
      <div className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
        
        {/* Header with Logo */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <Crown className={styles.logoIcon} />
            <h2 className={styles.logoText}>Melvor</h2>
          </div>
          <p className={styles.version}>v1.3.1</p>
        </div>

        {/* Menu Categories */}
        <div className={styles.menuContainer}>
          {menuCategories.map((category, categoryIndex) => (
            <div key={category.label}>
              {categoryIndex > 0 && <div className={styles.categorySeparator} />}
              <div className={styles.categoryLabel}>{category.label}</div>
              
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
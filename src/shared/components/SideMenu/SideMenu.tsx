// SideMenu.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoutePersistence } from '../../../core/hooks/useRoutePersistence';
import styles from './SideMenu.module.scss';

// Import logo images
import logoImg from '@assets/logo/logo.png';
import {
  Activity,
  Anvil,
  ArrowRight,
  BookOpen,
  ChefHat,
  ChevronDown,
  Coins,
  Compass,
  Crosshair,
  Crown,
  Eye,
  FileText,
  Fish,
  Flame,
  Gem,
  Hammer,
  Handshake,
  Heart,
  Home,
  Leaf,
  LogOut,
  MapPin,
  MessageCircle,
  MessageSquare,
  Newspaper,
  Pickaxe,
  RefreshCw,
  Scroll,
  ScrollText,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Skull,
  Sparkles,
  Star,
  Sword,
  SwordIcon,
  Target,
  Building2 as Tower,
  TreePine,
  Trophy,
  Users,
  Wand2,
  BookOpen as Wiki,
} from 'lucide-react';

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

interface SideMenuProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const SideMenu = ({ isCollapsed = false, onToggle }: SideMenuProps) => {
  const navigate = useNavigate();
  const { activeItem, expandedCategories, setActiveItem, toggleCategory } =
    useRoutePersistence();

  const menuCategories: { items: MenuItem[] }[] = [
    // 1. Dashboard – Startpunkt
    {
      items: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          icon: Home,
          path: '/',
        },
      ],
    },
    // 2. Character – Verwaltung der Spielfigur
    {
      items: [
        {
          id: 'character',
          title: 'Character',
          icon: Crown,
          path: '/character/profile',
        },
      ],
    },
    // 3. Combat – zentrale Kernmechanik
    {
      items: [
        {
          id: 'combat',
          title: 'Combat',
          icon: Sword,
          hasSubmenu: true,
          submenu: [
            { id: 'dungeon', title: 'Dungeons', icon: Skull, path: '/dungeon' },
            {
              id: 'boss-tower',
              title: 'Boss Tower',
              icon: Tower,
              path: '/boss-tower',
            },
            { id: 'slayer', title: 'Slayer', icon: Crosshair, path: '/slayer' },
            { id: 'pvp', title: 'PvP Arena', icon: SwordIcon, path: '/pvp' },
            {
              id: 'bosses',
              title: 'Boss Battles',
              icon: Target,
              path: '/bosses',
            },
            { id: 'raids', title: 'Raids', icon: ShieldCheck, path: '/raids' },
          ],
        },
      ],
    },
    // 4. Gathering – Rohstoffe beschaffen
    {
      items: [
        {
          id: 'gathering',
          title: 'Gathering',
          icon: Compass,
          hasSubmenu: true,
          submenu: [
            {
              id: 'woodcutting',
              title: 'Woodcutting',
              icon: TreePine,
              path: '/woodcutting',
            },
            { id: 'fishing', title: 'Fishing', icon: Fish, path: '/fishing' },
            { id: 'mining', title: 'Mining', icon: Pickaxe, path: '/mining' },
            {
              id: 'hunting',
              title: 'Hunting',
              icon: Crosshair,
              path: '/hunting',
            },
            {
              id: 'foraging',
              title: 'Foraging',
              icon: Leaf,
              path: '/foraging',
            },
          ],
        },
      ],
    },
    // 5. Crafting – aus Rohstoffen herstellen
    {
      items: [
        {
          id: 'crafting',
          title: 'Crafting',
          icon: Hammer,
          hasSubmenu: true,
          submenu: [
            {
              id: 'smithing',
              title: 'Smithing',
              icon: Anvil,
              path: '/smithing',
            },
            {
              id: 'cooking',
              title: 'Cooking',
              icon: ChefHat,
              path: '/cooking',
            },
            {
              id: 'firemaking',
              title: 'Firemaking',
              icon: Flame,
              path: '/firemaking',
            },
            {
              id: 'fletching',
              title: 'Fletching',
              icon: ArrowRight,
              path: '/fletching',
            },
            {
              id: 'herblore',
              title: 'Herblore',
              icon: ScrollText,
              path: '/herblore',
            },
            {
              id: 'runecrafting',
              title: 'Runecrafting',
              icon: Wand2,
              path: '/runecrafting',
            },
          ],
        },
      ],
    },
    // 6. Magic – erweiterte Fähigkeiten
    {
      items: [
        {
          id: 'magic',
          title: 'Magic',
          icon: Wand2,
          hasSubmenu: true,
          submenu: [
            { id: 'spells', title: 'Spells', icon: Sparkles, path: '/spells' },
            {
              id: 'enchanting',
              title: 'Enchanting',
              icon: Gem,
              path: '/enchanting',
            },
            { id: 'alchemy', title: 'Alchemy', icon: Scroll, path: '/alchemy' },
            {
              id: 'divination',
              title: 'Divination',
              icon: Eye,
              path: '/divination',
            },
          ],
        },
      ],
    },
    // 7. Pets & Companions – Unterstützungssystem
    {
      items: [
        {
          id: 'pets',
          title: 'Pets & Companions',
          icon: Heart,
          hasSubmenu: true,
          submenu: [
            { id: 'my-pets', title: 'My Pets', icon: Heart, path: '/my-pets' },
            {
              id: 'pet-training',
              title: 'Training',
              icon: Activity,
              path: '/pet-training',
            },
            {
              id: 'pet-battles',
              title: 'Battles',
              icon: Sword,
              path: '/pets/battles',
            },
            {
              id: 'pet-evolution',
              title: 'Evolution',
              icon: Sparkles,
              path: '/pets/evolution',
            },
            {
              id: 'pet-trading',
              title: 'Trading',
              icon: Handshake,
              path: '/pets/trade',
            },
            { id: 'mounts', title: 'Mounts', icon: Crown, path: '/mounts' },
          ],
        },
      ],
    },
    // 8. Economy – Handel und Ressourcenmanagement
    {
      items: [
        {
          id: 'economy',
          title: 'Economy',
          icon: Coins,
          hasSubmenu: true,
          submenu: [
            { id: 'bank', title: 'Bank', icon: ShoppingBag, path: '/bank' },
            { id: 'shop', title: 'Shop', icon: Coins, path: '/shop' },
            {
              id: 'auction',
              title: 'Auction House',
              icon: Gem,
              path: '/auction',
            },
            {
              id: 'trading',
              title: 'Trading Post',
              icon: Handshake,
              path: '/trading',
            },
            {
              id: 'guild',
              title: 'Guild Bank',
              icon: Shield,
              path: '/guild-bank',
            },
          ],
        },
      ],
    },
    // 9. World – Umgebung, Karten, Exploration
    {
      items: [
        {
          id: 'world',
          title: 'World',
          icon: MapPin,
          hasSubmenu: true,
          submenu: [
            { id: 'map', title: 'World Map', icon: MapPin, path: '/map' },
            { id: 'quests', title: 'Quests', icon: Scroll, path: '/quests' },
            { id: 'events', title: 'Events', icon: Star, path: '/events' },
            { id: 'guilds', title: 'Guilds', icon: Shield, path: '/guilds' },
            {
              id: 'achievements',
              title: 'Achievements',
              icon: Trophy,
              path: '/achievements',
            },
          ],
        },
      ],
    },
    // 10. Statistics – Fortschritt, Werte
    {
      items: [
        {
          id: 'statistics',
          title: 'Statistics',
          icon: BookOpen,
          path: '/statistics',
        },
      ],
    },
    // 11. Community – Interaktion mit anderen
    {
      items: [
        {
          id: 'community',
          title: 'Community',
          icon: Users,
          hasSubmenu: true,
          submenu: [
            { id: 'news', title: 'News', icon: Newspaper, path: '/news' },
            {
              id: 'discord',
              title: 'Discord',
              icon: MessageSquare,
              path: '/discord',
            },
            {
              id: 'reddit',
              title: 'Reddit',
              icon: MessageCircle,
              path: '/reddit',
            },
            { id: 'wiki', title: 'Wiki', icon: Wiki, path: '/wiki' },
            {
              id: 'game-rules',
              title: 'Game Rules',
              icon: FileText,
              path: '/game-rules',
            },
          ],
        },
      ],
    },
    // 12. Character Selection – alternative Spielfiguren
    {
      items: [
        {
          id: 'character-selection',
          title: 'Character Selection',
          icon: RefreshCw,
          path: '/character-selection',
        },
      ],
    },
    // 13. Settings – technische und persönliche Anpassungen
    {
      items: [
        {
          id: 'settings',
          title: 'Settings',
          icon: Settings,
          path: '/settings',
        },
      ],
    },
  ];

  // Menu is now always visible, no toggle needed

  const handleItemClick = (item: MenuItem) => {
    console.log(
      'Clicked:',
      item.id,
      'hasSubmenu:',
      item.hasSubmenu,
      'isCollapsed:',
      isCollapsed
    );

    if (item.hasSubmenu) {
      // Always toggle submenu for items with submenus
      console.log('Toggling category:', item.id);
      toggleCategory(item.id);
    } else {
      // No submenu, navigate directly
      setActiveItem(item.id);
      if (item.path) {
        navigate(item.path);
      }
    }
  };

  const handleSubmenuClick = (subItem: SubMenuItem) => {
    console.log('Submenu item clicked:', subItem);
    setActiveItem(subItem.id);
    if (subItem.path) {
      console.log('Navigating to submenu path:', subItem.path);
      navigate(subItem.path);
    } else {
      console.log('Navigating to submenu id:', `/${subItem.id}`);
      navigate(`/${subItem.id}`);
    }
  };

  return (
    <>
      {/* Side Menu - Collapsible */}
      <div
        className={`${styles.sideMenu} ${isCollapsed ? styles.collapsed : ''}`}
      >
        {/* Header with Logo */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <img
              src={logoImg}
              alt='Skill Issue Chronicles'
              className={styles.logoImage}
            />
          </div>
          <p className={styles.version}>v0.0.1</p>
        </div>

        {/* Menu Categories */}
        <div className={styles.menuContainer}>
          {menuCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {categoryIndex > 0 && (
                <div className={styles.categorySeparator} />
              )}

              {category.items.map(item => {
                const IconComponent = item.icon;
                const isActive = activeItem === item.id;
                const isExpanded = expandedCategories[item.id];

                return (
                  <div key={item.id} className={styles.menuItem}>
                    {/* Main Menu Item */}
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`${styles.menuButton} ${isActive ? styles.active : ''}`}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <div className={styles.menuButtonContent}>
                        <IconComponent className={styles.menuIcon} />
                        <span className={isCollapsed ? styles.hiddenText : ''}>
                          {item.title}
                        </span>
                      </div>

                      {item.hasSubmenu && !isCollapsed && (
                        <ChevronDown
                          className={`${styles.chevronIcon} ${isExpanded ? styles.expanded : ''}`}
                        />
                      )}
                    </button>

                    {/* Submenu */}
                    {item.hasSubmenu && (
                      <div
                        className={`${styles.submenu} ${isExpanded ? styles.expanded : ''} ${isCollapsed ? styles.collapsedSubmenu : ''}`}
                      >
                        <div className={styles.submenuContainer}>
                          {item.submenu?.map(subItem => {
                            const SubIconComponent = subItem.icon;
                            const isSubActive = activeItem === subItem.id;

                            return (
                              <button
                                key={subItem.id}
                                onClick={() => handleSubmenuClick(subItem)}
                                className={`${styles.submenuButton} ${isSubActive ? styles.active : ''} ${isCollapsed ? styles.collapsedSubmenuButton : ''}`}
                                title={subItem.title}
                              >
                                <SubIconComponent
                                  className={styles.submenuIcon}
                                />
                                <span
                                  className={
                                    isCollapsed ? styles.hiddenText : ''
                                  }
                                >
                                  {subItem.title}
                                </span>
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
        <div
          className={`${styles.footer} ${isCollapsed ? styles.collapsedFooter : ''}`}
        >
          <div className={styles.footerContent}>
            {!isCollapsed ? (
              <>
                <div className={styles.activePlayers}>
                  <span className={styles.playerCount}>48,500</span>
                  <span className={styles.playerLabel}>Active Players</span>
                </div>
                <div className={styles.footerRight}>
                  <div className={styles.onlineStatus}>
                    <p className={styles.footerText}>Online</p>
                    <span className={styles.statusDot}></span>
                  </div>

                  {/* Logout Button */}
                  <button
                    className={styles.logoutButton}
                    onClick={() => {
                      // Lösche alle gespeicherten Daten
                      localStorage.removeItem('idleGameCharacters');
                      localStorage.removeItem('isLoggedIn');
                      // Navigiere zur Login-Seite
                      navigate('/login');
                    }}
                  >
                    <LogOut className={styles.logoutIcon} size={12} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              // Collapsed footer - only icons
              <div className={styles.collapsedFooterContent}>
                <div className={styles.collapsedPlayerInfo}>
                  <span className={styles.collapsedPlayerCount}>48.5k</span>
                  <div className={styles.collapsedOnlineStatus}>
                    <span className={styles.statusDot}></span>
                  </div>
                </div>

                {/* Collapsed Logout Button */}
                <button
                  className={styles.collapsedLogoutButton}
                  onClick={() => {
                    localStorage.removeItem('idleGameCharacters');
                    localStorage.removeItem('isLoggedIn');
                    navigate('/login');
                  }}
                  title='Logout'
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;

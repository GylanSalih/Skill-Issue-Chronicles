import {
  Apple,
  ChevronDown,
  Coins,
  Gem,
  Hammer,
  Heart,
  Mountain,
  Package,
  Scroll,
  Shield,
  ShieldCheck,
  Star,
  Sword,
  TreePine,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../../../core/hooks/useGameState';
import styles from './ResourcePanel.module.scss';

interface ResourceItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  hasSubmenu?: boolean;
  submenu?: SubResourceItem[];
}

interface SubResourceItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  resourceKey: string;
}

interface ResourcePanelProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const ResourcePanel = ({
  isCollapsed = false,
  onToggle,
}: ResourcePanelProps) => {
  const { gameState } = useGameState();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('inventory');
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [forceUpdate, setForceUpdate] = useState(0);

  // Force re-render when gameState changes
  useEffect(() => {
    console.log(
      'ResourcePanel: gameState.resources.secondary changed:',
      gameState.resources.secondary
    );
    setForceUpdate(prev => prev + 1);
  }, [gameState.resources.secondary]);

  const resourceCategories: { items: ResourceItem[] }[] = [
    // 1. Inventory – Grundressourcen
    {
      items: [
        {
          id: 'inventory',
          title: 'Inventory',
          icon: Package,
          hasSubmenu: true,
          submenu: [
            {
              id: 'primary',
              title: 'Gold',
              icon: Coins,
              resourceKey: 'primary',
            },
            { id: 'wood', title: 'Wood', icon: TreePine, resourceKey: 'wood' },
            {
              id: 'stone',
              title: 'Stone',
              icon: Mountain,
              resourceKey: 'stone',
            },
            { id: 'metal', title: 'Metal', icon: Hammer, resourceKey: 'metal' },
            { id: 'food', title: 'Food', icon: Apple, resourceKey: 'food' },
          ],
        },
      ],
    },
    // 2. Wood Types – Holzarten
    {
      items: [
        {
          id: 'wood-types',
          title: 'Wood Types',
          icon: TreePine,
          hasSubmenu: true,
          submenu: [
            {
              id: 'normalWood',
              title: 'Normal Wood',
              icon: TreePine,
              resourceKey: 'normalWood',
            },
            {
              id: 'softwood',
              title: 'Softwood',
              icon: TreePine,
              resourceKey: 'softwood',
            },
            {
              id: 'willowWood',
              title: 'Willow Wood',
              icon: TreePine,
              resourceKey: 'willowWood',
            },
            {
              id: 'glowwood',
              title: 'Glowwood',
              icon: TreePine,
              resourceKey: 'glowwood',
            },
            {
              id: 'frostbark',
              title: 'Frostbark',
              icon: TreePine,
              resourceKey: 'frostbark',
            },
            {
              id: 'ebonyWood',
              title: 'Ebony Wood',
              icon: TreePine,
              resourceKey: 'ebonyWood',
            },
            {
              id: 'voidbark',
              title: 'Voidbark',
              icon: TreePine,
              resourceKey: 'voidbark',
            },
            {
              id: 'yangWood',
              title: 'Yang Wood',
              icon: TreePine,
              resourceKey: 'yangWood',
            },
            {
              id: 'yingWood',
              title: 'Ying Wood',
              icon: TreePine,
              resourceKey: 'yingWood',
            },
          ],
        },
      ],
    },
    // 3. Equipment – Ausrüstung
    {
      items: [
        {
          id: 'equipment',
          title: 'Equipment',
          icon: ShieldCheck,
          hasSubmenu: true,
          submenu: [
            { id: 'gems', title: 'Gems', icon: Gem, resourceKey: 'gems' },
            {
              id: 'scrolls',
              title: 'Scrolls',
              icon: Scroll,
              resourceKey: 'scrolls',
            },
            { id: 'energy', title: 'Energy', icon: Zap, resourceKey: 'energy' },
          ],
        },
      ],
    },
    // 4. Character – Charakterwerte
    {
      items: [
        {
          id: 'character',
          title: 'Character',
          icon: Heart,
          hasSubmenu: true,
          submenu: [
            {
              id: 'health',
              title: 'Health',
              icon: Heart,
              resourceKey: 'health',
            },
            {
              id: 'experience',
              title: 'Experience',
              icon: Star,
              resourceKey: 'experience',
            },
            {
              id: 'defense',
              title: 'Defense',
              icon: Shield,
              resourceKey: 'defense',
            },
            {
              id: 'attack',
              title: 'Attack',
              icon: Sword,
              resourceKey: 'attack',
            },
          ],
        },
      ],
    },
  ];

  const getResourceValue = (resourceKey: string): number => {
    if (resourceKey === 'primary') {
      return gameState.resources.primary;
    }
    const value = gameState.resources.secondary[resourceKey] || 0;
    if (resourceKey === 'normalWood') {
      console.log(`ResourcePanel reading ${resourceKey}:`, value);
      console.log('Full secondary resources:', gameState.resources.secondary);
    }
    return value;
  };

  const handleItemClick = (item: ResourceItem) => {
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
      // No submenu, set as active
      setActiveItem(item.id);
    }
  };

  const handleSubmenuClick = (subItem: SubResourceItem) => {
    console.log('Submenu item clicked:', subItem);
    setActiveItem(subItem.id);

    const resourceToPageMap: Record<string, string> = {
      wood: '/woodcutting',
      stone: '/mining',
      metal: '/smithing',
      food: '/cooking',
      primary: '/bank',
      // Wood Types - alle führen zur Woodcutting Seite
      normalWood: '/woodcutting',
      softwood: '/woodcutting',
      willowWood: '/woodcutting',
      glowwood: '/woodcutting',
      frostbark: '/woodcutting',
      ebonyWood: '/woodcutting',
      voidbark: '/woodcutting',
      yangWood: '/woodcutting',
      yingWood: '/woodcutting',
    };

    const page = resourceToPageMap[subItem.resourceKey];
    if (page) {
      console.log('Navigating to resource page:', page);
      navigate(page);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <>
      {/* Resource Panel - Collapsible */}
      <div
        className={`${styles.resourcePanel} ${isCollapsed ? styles.collapsed : ''}`}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <Package className={styles.logoIcon} />
          </div>
          <p className={styles.version}>Resources</p>
        </div>

        {/* Resource Categories */}
        <div className={styles.menuContainer}>
          {resourceCategories.map((category, categoryIndex) => (
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
                            const resourceValue = getResourceValue(
                              subItem.resourceKey
                            );

                            return (
                              <button
                                key={subItem.id}
                                onClick={() => handleSubmenuClick(subItem)}
                                className={`${styles.submenuButton} ${isSubActive ? styles.active : ''} ${isCollapsed ? styles.collapsedSubmenuButton : ''}`}
                                title={subItem.title}
                              >
                                <div className={styles.submenuContent}>
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
                                </div>
                                {!isCollapsed && (
                                  <span className={styles.resourceValue}>
                                    {resourceValue.toLocaleString()}
                                  </span>
                                )}
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
                <div className={styles.footerStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>
                      {Object.keys(gameState.resources.secondary).length}
                    </span>
                    <span className={styles.statLabel}>Types</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>
                      {Object.values(gameState.resources.secondary)
                        .reduce((sum, val) => sum + (val || 0), 0)
                        .toLocaleString()}
                    </span>
                    <span className={styles.statLabel}>Total</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>
                      {gameState.resources.primary.toLocaleString()}
                    </span>
                    <span className={styles.statLabel}>Gold</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>
                      {Math.max(
                        ...Object.values(gameState.resources.secondary).map(
                          v => v || 0
                        )
                      )}
                    </span>
                    <span className={styles.statLabel}>Max</span>
                  </div>
                </div>
              </>
            ) : (
              // Collapsed footer - only icons
              <div className={styles.collapsedFooterContent}>
                <div className={styles.collapsedResourceInfo}>
                  <div className={styles.collapsedStat}>
                    <span className={styles.collapsedStatValue}>
                      {Object.keys(gameState.resources.secondary).length}
                    </span>
                    <Package size={10} className={styles.collapsedIcon} />
                  </div>
                  <div className={styles.collapsedOnlineStatus}>
                    <span className={styles.statusDot}></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourcePanel;

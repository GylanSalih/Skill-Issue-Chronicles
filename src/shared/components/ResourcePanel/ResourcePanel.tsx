import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../../../core/hooks/useGameState';
import {
  Coins,
  TreePine,
  Mountain,
  Hammer,
  Apple,
  Gem,
  Scroll,
  Heart,
  Star,
  Zap,
  Shield,
  Sword,
  Package,
  ShieldCheck,
} from 'lucide-react';
import styles from './ResourcePanel.module.scss';

interface ResourceTab {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  resources: string[];
}

const ResourcePanel: React.FC = () => {
  const { gameState } = useGameState();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventory');
  const [forceUpdate, setForceUpdate] = useState(0);

  // Force re-render when gameState changes
  useEffect(() => {
    console.log(
      'ResourcePanel: gameState.resources.secondary changed:',
      gameState.resources.secondary
    );
    setForceUpdate(prev => prev + 1);
  }, [gameState.resources.secondary]);

  const resourceIcons: Record<string, React.ComponentType<any>> = {
    primary: Coins,
    wood: TreePine,
    stone: Mountain,
    metal: Hammer,
    food: Apple,
    gems: Gem,
    scrolls: Scroll,
    health: Heart,
    energy: Zap,
    experience: Star,
    defense: Shield,
    attack: Sword,
    // Wood Types - alle verwenden TreePine Icon
    normalWood: TreePine,
    softwood: TreePine,
    willowWood: TreePine,
    glowwood: TreePine,
    frostbark: TreePine,
    ebonyWood: TreePine,
    voidbark: TreePine,
    yangWood: TreePine,
    yingWood: TreePine,
  };

  const tabs: ResourceTab[] = [
    {
      id: 'inventory',
      name: 'Inventory',
      icon: Package,
      resources: ['primary', 'wood', 'stone', 'metal', 'food'],
    },
    {
      id: 'wood',
      name: 'Wood Types',
      icon: TreePine,
      resources: [
        'normalWood',
        'softwood',
        'willowWood',
        'glowwood',
        'frostbark',
        'ebonyWood',
        'voidbark',
        'yangWood',
        'yingWood',
      ],
    },
    {
      id: 'equipment',
      name: 'Equipment',
      icon: ShieldCheck,
      resources: ['gems', 'scrolls', 'energy'],
    },
    {
      id: 'character',
      name: 'Character',
      icon: Heart,
      resources: ['health', 'experience', 'defense', 'attack'],
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

  const getResourceName = (resourceKey: string): string => {
    const names: Record<string, string> = {
      primary: 'Gold',
      wood: 'Wood',
      stone: 'Stone',
      metal: 'Metal',
      food: 'Food',
      gems: 'Gems',
      scrolls: 'Scrolls',
      health: 'Health',
      energy: 'Energy',
      experience: 'Experience',
      defense: 'Defense',
      attack: 'Attack',
      // Holzarten
      normalWood: 'Normal Wood',
      softwood: 'Softwood',
      willowWood: 'Willow Wood',
      glowwood: 'Glowwood',
      frostbark: 'Frostbark',
      ebonyWood: 'Ebony Wood',
      voidbark: 'Voidbark',
      yangWood: 'Yang Wood',
      yingWood: 'Ying Wood',
    };
    return names[resourceKey] || resourceKey;
  };

  const handleResourceClick = (resourceKey: string) => {
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

    const page = resourceToPageMap[resourceKey];
    if (page) {
      navigate(page);
    }
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={styles.sidebar}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h3 className={styles.title}>{activeTabData?.name || 'Resources'}</h3>
          <div className={styles.tabContainer}>
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                  title={tab.name}
                >
                  <IconComponent className={styles.tabIcon} />
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.resourceGrid}>
            {activeTabData?.resources.map(resourceKey => {
              const IconComponent = resourceIcons[resourceKey];
              const value = getResourceValue(resourceKey);
              const name = getResourceName(resourceKey);

              return (
                <div
                  key={resourceKey}
                  className={styles.resourceItem}
                  onClick={() => handleResourceClick(resourceKey)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.resourceInfo}>
                    <div className={styles.resourceIconContainer}>
                      <IconComponent className={styles.resourceIcon} />
                    </div>
                    <span className={styles.resourceName}>{name}</span>
                  </div>
                  <span className={styles.resourceValue}>
                    {value.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePanel;

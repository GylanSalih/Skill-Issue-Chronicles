import { Lock, Palette, Star } from 'lucide-react';
import React, { useState } from 'react';
import styles from './SkinsTab.module.scss';

// Import avatar images
import assassineImg from '@assets/img/avatars/assassine.png';
import elfeImg from '@assets/img/avatars/elfe.png';
import magierImg from '@assets/img/avatars/magier.png';
import paladinImg from '@assets/img/avatars/paladin.png';
import warriorImg from '@assets/img/avatars/warrior.png';
import warrior2Img from '@assets/img/avatars/warrior2.png';

const SkinsTab: React.FC = () => {
  const [selectedSkin, setSelectedSkin] = useState<string>('default');

  const skins = [
    {
      id: 'default',
      name: 'Default Skin',
      description: 'The classic look for your character',
      rarity: 'common',
      price: 0,
      owned: true,
      image: warriorImg,
    },
    {
      id: 'fire',
      name: 'Flame Warrior',
      description: 'Burning with the power of fire',
      rarity: 'rare',
      price: 500,
      owned: false,
      image: warrior2Img,
    },
    {
      id: 'ice',
      name: 'Frost Mage',
      description: 'Chilling enemies with ice magic',
      rarity: 'epic',
      price: 1000,
      owned: true,
      image: magierImg,
    },
    {
      id: 'shadow',
      name: 'Shadow Assassin',
      description: 'Strike from the shadows',
      rarity: 'legendary',
      price: 2500,
      owned: false,
      image: assassineImg,
    },
    {
      id: 'nature',
      name: 'Forest Guardian',
      description: 'One with nature and the wild',
      rarity: 'epic',
      price: 1200,
      owned: true,
      image: elfeImg,
    },
    {
      id: 'divine',
      name: 'Divine Paladin',
      description: 'Blessed by the gods themselves',
      rarity: 'legendary',
      price: 3000,
      owned: false,
      image: paladinImg,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'rgba(156, 163, 175, 0.8)';
      case 'rare':
        return 'rgba(59, 130, 246, 0.8)';
      case 'epic':
        return 'rgba(147, 51, 234, 0.8)';
      case 'legendary':
        return 'rgba(245, 158, 11, 0.8)';
      default:
        return 'rgba(156, 163, 175, 0.8)';
    }
  };

  const ownedSkins = skins.filter(skin => skin.owned);
  const currentSkin = skins.find(skin => skin.id === selectedSkin);

  return (
    <div className={styles.normalWidth}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Character Skins</h1>
          <p>Verwalte und wechsle zwischen verschiedenen Charakteraussehen</p>
        </div>
      </div>

      <div className={styles.content}>
        {/* Stats Overview */}
        <div className={styles.statsOverview}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Palette size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{ownedSkins.length}</span>
              <span className={styles.statLabel}>Owned Skins</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Star size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{skins.length}</span>
              <span className={styles.statLabel}>Total Skins</span>
            </div>
          </div>
        </div>

        {/* Skin Collection */}
        <div className={styles.section}>
          <h2>Skin Collection</h2>
          <div className={styles.skinGrid}>
            {skins.map(skin => (
              <div
                key={skin.id}
                className={`${styles.skinCard} ${
                  skin.owned ? styles.owned : styles.locked
                } ${selectedSkin === skin.id ? styles.equipped : ''}`}
              >
                <div className={styles.skinIcon}>
                  <img
                    src={skin.image}
                    alt={skin.name}
                    className={styles.skinImage}
                  />
                  {!skin.owned && (
                    <div className={styles.lockedOverlay}>
                      <Lock size={24} />
                    </div>
                  )}
                </div>

                <div className={styles.skinInfo}>
                  <h4 className={styles.skinName}>{skin.name}</h4>
                  <p className={styles.skinDescription}>{skin.description}</p>
                </div>

                <div className={styles.skinActions}>
                  {skin.owned ? (
                    <button
                      className={`${styles.skinButton} ${
                        selectedSkin === skin.id
                          ? styles.equipped
                          : styles.normal
                      }`}
                      onClick={() => setSelectedSkin(skin.id)}
                    >
                      {selectedSkin === skin.id ? 'Equipped' : 'Equip'}
                    </button>
                  ) : (
                    <button className={`${styles.skinButton} ${styles.locked}`}>
                      Buy {skin.price}g
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinsTab;

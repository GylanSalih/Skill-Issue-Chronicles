import { Check, Lock, Palette, Star } from 'lucide-react';
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
      description: 'One with nature and wildlife',
      rarity: 'rare',
      price: 750,
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
        return '#9ca3af';
      case 'uncommon':
        return '#22c55e';
      case 'rare':
        return '#3b82f6';
      case 'epic':
        return '#a855f7';
      case 'legendary':
        return '#f59e0b';
      default:
        return '#9ca3af';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'rgba(156, 163, 175, 0.1)';
      case 'uncommon':
        return 'rgba(34, 197, 94, 0.1)';
      case 'rare':
        return 'rgba(59, 130, 246, 0.1)';
      case 'epic':
        return 'rgba(168, 85, 247, 0.1)';
      case 'legendary':
        return 'rgba(245, 158, 11, 0.1)';
      default:
        return 'rgba(156, 163, 175, 0.1)';
    }
  };

  return (
    <>
      {/* Skin Collection Header */}
      <div className={`${styles.section} ${styles.skinHeader}`}>
        <div className={styles.skinHeaderContent}>
          <div className={styles.skinHeaderIcon}>
            <Palette size={32} />
          </div>
          <div className={styles.skinHeaderText}>
            <h2>Skin Collection</h2>
            <p>Customize your character's appearance with unique skins</p>
          </div>
        </div>
        <div className={styles.skinStats}>
          <div className={styles.skinStat}>
            <span className={styles.skinStatValue}>3</span>
            <span className={styles.skinStatLabel}>Owned</span>
          </div>
          <div className={styles.skinStat}>
            <span className={styles.skinStatValue}>6</span>
            <span className={styles.skinStatLabel}>Total</span>
          </div>
        </div>
      </div>

      {/* Currently Selected Skin */}
      <div className={`${styles.section} ${styles.currentSkin}`}>
        <h3>Currently Selected</h3>
        <div className={styles.currentSkinCard}>
          {(() => {
            const current = skins.find(skin => skin.id === selectedSkin);
            return current ? (
              <>
                <div className={styles.currentSkinImage}>
                  <img src={current.image} alt={current.name} />
                  <div className={styles.currentSkinBadge}>Active</div>
                </div>
                <div className={styles.currentSkinInfo}>
                  <h4>{current.name}</h4>
                  <p>{current.description}</p>
                  <div className={styles.currentSkinRarity}>
                    <span
                      className={styles.rarityTag}
                      style={{
                        color: getRarityColor(current.rarity),
                        backgroundColor: getRarityBg(current.rarity),
                      }}
                    >
                      {current.rarity.toUpperCase()}
                    </span>
                  </div>
                </div>
              </>
            ) : null;
          })()}
        </div>
      </div>

      {/* Skin Gallery */}
      <div className={`${styles.section} ${styles.skinGallery}`}>
        <h3>Available Skins</h3>
        <div className={styles.skinGrid}>
          {skins.map(skin => (
            <div
              key={skin.id}
              className={`${styles.skinCard} ${selectedSkin === skin.id ? styles.selected : ''} ${!skin.owned ? styles.locked : ''}`}
              onClick={() => skin.owned && setSelectedSkin(skin.id)}
            >
              <div className={styles.skinCardImage}>
                <img src={skin.image} alt={skin.name} />
                {!skin.owned && (
                  <div className={styles.lockOverlay}>
                    <Lock size={24} />
                  </div>
                )}
                {skin.owned && selectedSkin === skin.id && (
                  <div className={styles.selectedOverlay}>
                    <Check size={20} />
                  </div>
                )}
              </div>
              <div className={styles.skinCardInfo}>
                <h4>{skin.name}</h4>
                <p>{skin.description}</p>
                <div className={styles.skinCardFooter}>
                  <span
                    className={styles.rarityTag}
                    style={{
                      color: getRarityColor(skin.rarity),
                      backgroundColor: getRarityBg(skin.rarity),
                    }}
                  >
                    {skin.rarity.toUpperCase()}
                  </span>
                  {skin.owned ? (
                    <span className={styles.ownedTag}>Owned</span>
                  ) : (
                    <span className={styles.priceTag}>
                      <Star size={14} />
                      {skin.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skin Preview */}
      <div className={`${styles.section} ${styles.skinPreview}`}>
        <h3>Preview</h3>
        <div className={styles.previewContainer}>
          <div className={styles.previewCharacter}>
            {(() => {
              const current = skins.find(skin => skin.id === selectedSkin);
              return current ? (
                <img src={current.image} alt={current.name} />
              ) : null;
            })()}
          </div>
          <div className={styles.previewInfo}>
            <h4>Character Preview</h4>
            <p>See how your character will look with this skin</p>
            <button className={styles.previewButton}>Apply Skin</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkinsTab;

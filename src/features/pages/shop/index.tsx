import React, { useState } from 'react';
import { ShoppingCart, DollarSign, Package, Coins } from 'lucide-react';
import styles from './Shop.module.scss';

interface ShopItem {
  id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface PlayerItem {
  id: string;
  name: string;
  type: string;
  quantity: number;
  sellPrice: number;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const Shop = () => {
  const [playerGold, setPlayerGold] = useState(1000);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedQuantity, setSelectedQuantity] = useState<{
    [key: string]: number;
  }>({});

  // Shop Items zum Verkauf
  const shopItems: ShopItem[] = [
    {
      id: 'sword1',
      name: 'Eisenschwert',
      type: 'Waffe',
      price: 150,
      quantity: 10,
      description: 'Ein scharfes Eisenschwert für Anfänger',
      rarity: 'common',
    },
    {
      id: 'potion1',
      name: 'Heiltrank',
      type: 'Verbrauch',
      price: 25,
      quantity: 50,
      description: 'Stellt 50 HP wieder her',
      rarity: 'common',
    },
    {
      id: 'ring1',
      name: 'Magischer Ring',
      type: 'Zubehör',
      price: 300,
      quantity: 5,
      description: 'Erhöht Magie um +5',
      rarity: 'rare',
    },
    {
      id: 'armor1',
      name: 'Drachenrüstung',
      type: 'Rüstung',
      price: 800,
      quantity: 3,
      description: 'Schutz vor Feuerangriffen',
      rarity: 'epic',
    },
    {
      id: 'scroll1',
      name: 'Teleportationsrolle',
      type: 'Verbrauch',
      price: 100,
      quantity: 20,
      description: 'Teleportiert dich zu einem gespeicherten Ort',
      rarity: 'rare',
    },
  ];

  // Spieler Items zum Verkauf
  const playerItems: PlayerItem[] = [
    {
      id: 'wood1',
      name: 'Holz',
      type: 'Ressource',
      quantity: 50,
      sellPrice: 2,
      description: 'Grundlegendes Baumaterial',
      rarity: 'common',
    },
    {
      id: 'ore1',
      name: 'Eisenerz',
      type: 'Ressource',
      quantity: 25,
      sellPrice: 5,
      description: 'Wertvolles Erz für Schmiedekunst',
      rarity: 'common',
    },
    {
      id: 'gem1',
      name: 'Rubin',
      type: 'Edelstein',
      quantity: 3,
      sellPrice: 150,
      description: 'Seltener roter Edelstein',
      rarity: 'rare',
    },
    {
      id: 'potion2',
      name: 'Stärketrank',
      type: 'Verbrauch',
      quantity: 8,
      sellPrice: 30,
      description: 'Erhöht Stärke temporär um +10',
      rarity: 'rare',
    },
  ];

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: '#9ca3af',
      rare: '#3b82f6',
      epic: '#8b5cf6',
      legendary: '#f59e0b',
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const handleBuyItem = (item: ShopItem) => {
    const quantity = selectedQuantity[item.id] || 1;
    const totalPrice = item.price * quantity;

    if (playerGold >= totalPrice && item.quantity >= quantity) {
      setPlayerGold(playerGold - totalPrice);
      // Hier würde normalerweise das Item zum Inventar hinzugefügt werden
      console.log(`Gekauft: ${quantity}x ${item.name} für ${totalPrice} Gold`);
    }
  };

  const handleSellItem = (item: PlayerItem) => {
    const quantity = selectedQuantity[item.id] || 1;
    const totalPrice = item.sellPrice * quantity;

    if (item.quantity >= quantity) {
      setPlayerGold(playerGold + totalPrice);
      // Hier würde normalerweise das Item aus dem Inventar entfernt werden
      console.log(`Verkauft: ${quantity}x ${item.name} für ${totalPrice} Gold`);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setSelectedQuantity(prev => ({
      ...prev,
      [itemId]: Math.max(1, quantity),
    }));
  };

  return (
    <div className={styles.shopPage}>
      <div className={styles.header}>
        <ShoppingCart className={styles.headerIcon} size={24} />
        <div className={styles.headerContent}>
          <h1>Shop</h1>
          <p>Kaufe und verkaufe Items beim Händler</p>
        </div>
        <div className={styles.goldDisplay}>
          <Coins className={styles.goldIcon} size={20} />
          <span>{playerGold.toLocaleString()} Gold</span>
        </div>
      </div>

      <div className={styles.content}>
        {/* Shop Vendor */}
        <div className={`${styles.section} ${styles.vendorSection}`}>
          <h2>Händler</h2>
          <div className={styles.vendorContainer}>
            <img
              src='/assets/img/characters/shopVendor.png'
              alt='Shop Vendor'
              className={styles.vendorImage}
              onError={e => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className={styles.vendorInfo}>
              <h3>Gareth der Händler</h3>
              <p>
                "Willkommen in meinem Laden! Ich habe die besten Waren der
                Stadt."
              </p>
              <div className={styles.vendorStats}>
                <div className={styles.statItem}>
                  <span>Verfügbare Items:</span>
                  <span>{shopItems.length}</span>
                </div>
                <div className={styles.statItem}>
                  <span>Deine Items:</span>
                  <span>{playerItems.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`${styles.section} ${styles.tabSection}`}>
          <div className={styles.tabNavigation}>
            <button
              className={`${styles.tabButton} ${activeTab === 'buy' ? styles.active : ''}`}
              onClick={() => setActiveTab('buy')}
            >
              <Package size={20} />
              Kaufen
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'sell' ? styles.active : ''}`}
              onClick={() => setActiveTab('sell')}
            >
              <DollarSign size={20} />
              Verkaufen
            </button>
          </div>
        </div>

        {/* Buy Tab */}
        {activeTab === 'buy' && (
          <div className={`${styles.section} ${styles.itemsSection}`}>
            <h2>Verfügbare Items</h2>
            <div className={styles.itemsGrid}>
              {shopItems.map(item => (
                <div key={item.id} className={styles.itemCard}>
                  <div className={styles.itemHeader}>
                    <h3 style={{ color: getRarityColor(item.rarity) }}>
                      {item.name}
                    </h3>
                    <span className={styles.itemType}>{item.type}</span>
                  </div>
                  <p className={styles.itemDescription}>{item.description}</p>
                  <div className={styles.itemStats}>
                    <div className={styles.statRow}>
                      <span>Preis:</span>
                      <span className={styles.price}>{item.price} Gold</span>
                    </div>
                    <div className={styles.statRow}>
                      <span>Verfügbar:</span>
                      <span>{item.quantity}</span>
                    </div>
                  </div>
                  <div className={styles.itemActions}>
                    <div className={styles.quantitySelector}>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            (selectedQuantity[item.id] || 1) - 1
                          )
                        }
                        disabled={selectedQuantity[item.id] <= 1}
                      >
                        -
                      </button>
                      <input
                        type='number'
                        min='1'
                        max={item.quantity}
                        value={selectedQuantity[item.id] || 1}
                        onChange={e =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                      />
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            (selectedQuantity[item.id] || 1) + 1
                          )
                        }
                        disabled={selectedQuantity[item.id] >= item.quantity}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className={styles.buyButton}
                      onClick={() => handleBuyItem(item)}
                      disabled={
                        playerGold <
                        item.price * (selectedQuantity[item.id] || 1)
                      }
                    >
                      Kaufen (
                      {(
                        item.price * (selectedQuantity[item.id] || 1)
                      ).toLocaleString()}{' '}
                      Gold)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sell Tab */}
        {activeTab === 'sell' && (
          <div className={`${styles.section} ${styles.itemsSection}`}>
            <h2>Deine Items</h2>
            <div className={styles.itemsGrid}>
              {playerItems.map(item => (
                <div key={item.id} className={styles.itemCard}>
                  <div className={styles.itemHeader}>
                    <h3 style={{ color: getRarityColor(item.rarity) }}>
                      {item.name}
                    </h3>
                    <span className={styles.itemType}>{item.type}</span>
                  </div>
                  <p className={styles.itemDescription}>{item.description}</p>
                  <div className={styles.itemStats}>
                    <div className={styles.statRow}>
                      <span>Verkaufspreis:</span>
                      <span className={styles.sellPrice}>
                        {item.sellPrice} Gold
                      </span>
                    </div>
                    <div className={styles.statRow}>
                      <span>Anzahl:</span>
                      <span>{item.quantity}</span>
                    </div>
                  </div>
                  <div className={styles.itemActions}>
                    <div className={styles.quantitySelector}>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            (selectedQuantity[item.id] || 1) - 1
                          )
                        }
                        disabled={selectedQuantity[item.id] <= 1}
                      >
                        -
                      </button>
                      <input
                        type='number'
                        min='1'
                        max={item.quantity}
                        value={selectedQuantity[item.id] || 1}
                        onChange={e =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                      />
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            (selectedQuantity[item.id] || 1) + 1
                          )
                        }
                        disabled={selectedQuantity[item.id] >= item.quantity}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className={styles.sellButton}
                      onClick={() => handleSellItem(item)}
                    >
                      Verkaufen (
                      {(
                        item.sellPrice * (selectedQuantity[item.id] || 1)
                      ).toLocaleString()}{' '}
                      Gold)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

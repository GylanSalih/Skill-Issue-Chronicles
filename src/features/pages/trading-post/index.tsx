import { Clock, Filter, Search, Star, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import styles from './TradingPost.module.scss';

const TradingPost: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price');

  const categories = [
    { id: 'all', name: 'All Items', icon: '📦' },
    { id: 'weapons', name: 'Weapons', icon: '⚔️' },
    { id: 'armor', name: 'Armor', icon: '🛡️' },
    { id: 'tools', name: 'Tools', icon: '🔨' },
    { id: 'materials', name: 'Materials', icon: '💎' },
    { id: 'potions', name: 'Potions', icon: '🧪' },
    { id: 'runes', name: 'Runes', icon: '📜' },
  ];

  const tradingItems = [
    {
      id: 1,
      name: 'Dragon Sword',
      seller: 'Player123',
      price: 50000,
      category: 'weapons',
      image: '⚔️',
      rating: 4.8,
      sales: 12,
      timeLeft: '2h 15m',
      description: 'A legendary sword forged from dragon scales',
    },
    {
      id: 2,
      name: 'Mithril Armor Set',
      seller: 'WarriorKing',
      price: 25000,
      category: 'armor',
      image: '🛡️',
      rating: 4.6,
      sales: 8,
      timeLeft: '5h 30m',
      description: 'Lightweight armor with excellent protection',
    },
    {
      id: 3,
      name: 'Pure Essence x1000',
      seller: 'MageMaster',
      price: 15000,
      category: 'materials',
      image: '💎',
      rating: 4.9,
      sales: 25,
      timeLeft: '1h 45m',
      description: 'High-quality essence for runecrafting',
    },
    {
      id: 4,
      name: 'Health Potion x50',
      seller: 'Alchemist',
      price: 5000,
      category: 'potions',
      image: '🧪',
      rating: 4.7,
      sales: 15,
      timeLeft: '30m',
      description: 'Restores health over time',
    },
    {
      id: 5,
      name: 'Fire Rune x500',
      seller: 'Runecrafter',
      price: 8000,
      category: 'runes',
      image: '📜',
      rating: 4.5,
      sales: 20,
      timeLeft: '3h 20m',
      description: 'Basic fire magic runes',
    },
  ];

  const filteredItems = tradingItems.filter(item => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.tradingPost}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <TrendingUp className={styles.titleIcon} />
          <h1>Trading Post</h1>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Active Listings</span>
            <span className={styles.statValue}>{tradingItems.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total Value</span>
            <span className={styles.statValue}>
              ₽
              {tradingItems
                .reduce((sum, item) => sum + item.price, 0)
                .toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} />
          <input
            type='text'
            placeholder='Search items...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.categoryFilter}>
          <Filter className={styles.filterIcon} />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.sortFilter}>
          <TrendingUp className={styles.sortIcon} />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value='price'>Price</option>
            <option value='rating'>Rating</option>
            <option value='sales'>Sales</option>
            <option value='time'>Time Left</option>
          </select>
        </div>
      </div>

      <div className={styles.listings}>
        <h3>Available Items ({filteredItems.length})</h3>
        <div className={styles.itemsGrid}>
          {filteredItems.map(item => (
            <div key={item.id} className={styles.itemCard}>
              <div className={styles.itemImage}>
                <span className={styles.itemIcon}>{item.image}</span>
              </div>

              <div className={styles.itemInfo}>
                <h4 className={styles.itemName}>{item.name}</h4>
                <p className={styles.seller}>Seller: {item.seller}</p>
                <p className={styles.description}>{item.description}</p>

                <div className={styles.itemStats}>
                  <div className={styles.rating}>
                    <Star className={styles.starIcon} />
                    <span>{item.rating}</span>
                  </div>
                  <div className={styles.sales}>
                    <span>{item.sales} sales</span>
                  </div>
                </div>

                <div className={styles.itemMeta}>
                  <div className={styles.price}>
                    <span className={styles.priceLabel}>Price:</span>
                    <span className={styles.priceValue}>
                      ₽{item.price.toLocaleString()}
                    </span>
                  </div>

                  <div className={styles.timeLeft}>
                    <Clock className={styles.timeIcon} />
                    <span>{item.timeLeft}</span>
                  </div>
                </div>
              </div>

              <div className={styles.itemActions}>
                <button className={styles.buyButton}>Buy Now</button>
                <button className={styles.wishlistButton}>
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.myListings}>
        <h3>My Listings</h3>
        <div className={styles.emptyState}>
          <TrendingUp className={styles.emptyIcon} />
          <p>You don't have any active listings</p>
          <button className={styles.createListingButton}>
            Create New Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingPost;

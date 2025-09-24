import { Clock, Filter, Gavel, Search, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import styles from './AuctionHouse.module.scss';

const AuctionHouse: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('time');

  const categories = [
    { id: 'all', name: 'All Items', icon: '📦' },
    { id: 'weapons', name: 'Weapons', icon: '⚔️' },
    { id: 'armor', name: 'Armor', icon: '🛡️' },
    { id: 'tools', name: 'Tools', icon: '🔨' },
    { id: 'materials', name: 'Materials', icon: '💎' },
    { id: 'potions', name: 'Potions', icon: '🧪' },
    { id: 'runes', name: 'Runes', icon: '📜' },
  ];

  const auctions = [
    {
      id: 1,
      item: 'Dragon Sword',
      seller: 'Player123',
      currentBid: 50000,
      buyout: 75000,
      timeLeft: '2h 15m',
      category: 'weapons',
      image: '⚔️',
      bids: 12,
    },
    {
      id: 2,
      item: 'Mithril Armor Set',
      seller: 'WarriorKing',
      currentBid: 25000,
      buyout: 40000,
      timeLeft: '5h 30m',
      category: 'armor',
      image: '🛡️',
      bids: 8,
    },
    {
      id: 3,
      item: 'Pure Essence x1000',
      seller: 'MageMaster',
      currentBid: 15000,
      buyout: 20000,
      timeLeft: '1h 45m',
      category: 'materials',
      image: '💎',
      bids: 3,
    },
    {
      id: 4,
      item: 'Health Potion x50',
      seller: 'Alchemist',
      currentBid: 5000,
      buyout: 8000,
      timeLeft: '30m',
      category: 'potions',
      image: '🧪',
      bids: 1,
    },
    {
      id: 5,
      item: 'Fire Rune x500',
      seller: 'Runecrafter',
      currentBid: 8000,
      buyout: 12000,
      timeLeft: '3h 20m',
      category: 'runes',
      image: '📜',
      bids: 5,
    },
  ];

  const filteredAuctions = auctions.filter(auction => {
    const matchesSearch = auction.item
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || auction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.auctionHouse}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Gavel className={styles.titleIcon} />
          <h1>Auction House</h1>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Active Auctions</span>
            <span className={styles.statValue}>{auctions.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total Value</span>
            <span className={styles.statValue}>
              ₽
              {auctions
                .reduce((sum, a) => sum + a.currentBid, 0)
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
            <option value='time'>Time Left</option>
            <option value='price'>Price</option>
            <option value='bids'>Bids</option>
          </select>
        </div>
      </div>

      <div className={styles.auctions}>
        <h3>Active Auctions ({filteredAuctions.length})</h3>
        <div className={styles.auctionGrid}>
          {filteredAuctions.map(auction => (
            <div key={auction.id} className={styles.auctionCard}>
              <div className={styles.auctionImage}>
                <span className={styles.itemIcon}>{auction.image}</span>
              </div>

              <div className={styles.auctionInfo}>
                <h4 className={styles.itemName}>{auction.item}</h4>
                <p className={styles.seller}>Seller: {auction.seller}</p>

                <div className={styles.bidInfo}>
                  <div className={styles.currentBid}>
                    <span className={styles.bidLabel}>Current Bid:</span>
                    <span className={styles.bidAmount}>
                      ₽{auction.currentBid.toLocaleString()}
                    </span>
                  </div>

                  <div className={styles.buyout}>
                    <span className={styles.buyoutLabel}>Buyout:</span>
                    <span className={styles.buyoutAmount}>
                      ₽{auction.buyout.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className={styles.auctionMeta}>
                  <div className={styles.timeLeft}>
                    <Clock className={styles.timeIcon} />
                    <span>{auction.timeLeft}</span>
                  </div>
                  <div className={styles.bidCount}>
                    <span>{auction.bids} bids</span>
                  </div>
                </div>
              </div>

              <div className={styles.auctionActions}>
                <button className={styles.bidButton}>Place Bid</button>
                <button className={styles.buyoutButton}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.myAuctions}>
        <h3>My Auctions</h3>
        <div className={styles.emptyState}>
          <Gavel className={styles.emptyIcon} />
          <p>You don't have any active auctions</p>
          <button className={styles.createAuctionButton}>Create Auction</button>
        </div>
      </div>
    </div>
  );
};

export default AuctionHouse;

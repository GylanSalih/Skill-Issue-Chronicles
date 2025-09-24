import React, { useState } from 'react';
import { Users, Shield, Star, Lock, Unlock } from 'lucide-react';
import styles from './GuildBank.module.scss';

const GuildBank: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('deposit');
  const [searchTerm, setSearchTerm] = useState('');

  const guildBankItems = [
    {
      id: 1,
      name: 'Dragon Scale Armor',
      type: 'armor',
      rarity: 'legendary',
      value: 50000,
      depositedBy: 'DragonMaster',
      depositedDate: '2024-01-15',
      icon: '🛡️',
    },
    {
      id: 2,
      name: 'Mithril Sword',
      type: 'weapon',
      rarity: 'epic',
      value: 25000,
      depositedBy: 'WarriorKing',
      depositedDate: '2024-01-14',
      icon: '⚔️',
    },
    {
      id: 3,
      name: 'Health Potion x100',
      type: 'consumable',
      rarity: 'common',
      value: 5000,
      depositedBy: 'Alchemist',
      depositedDate: '2024-01-13',
      icon: '🧪',
    },
    {
      id: 4,
      name: 'Gold Ingot x50',
      type: 'material',
      rarity: 'rare',
      value: 15000,
      depositedBy: 'Miner',
      depositedDate: '2024-01-12',
      icon: '🥇',
    },
  ];

  const guildStats = {
    totalValue: 95000,
    totalItems: 4,
    members: 45,
    permissions: 'Officer',
  };

  const filteredItems = guildBankItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.guildBank}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Users className={styles.titleIcon} />
          <h1>Guild Bank</h1>
          <span className={styles.guildName}>Dragon Slayers</span>
        </div>
        <div className={styles.guildStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total Value</span>
            <span className={styles.statValue}>₽{guildStats.totalValue.toLocaleString()}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Items</span>
            <span className={styles.statValue}>{guildStats.totalItems}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Members</span>
            <span className={styles.statValue}>{guildStats.members}</span>
          </div>
        </div>
      </div>

      <div className={styles.permissions}>
        <div className={styles.permissionInfo}>
          <Shield className={styles.permissionIcon} />
          <span>Your Permission Level: {guildStats.permissions}</span>
        </div>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${selectedTab === 'deposit' ? styles.active : ''}`}
          onClick={() => setSelectedTab('deposit')}
        >
          <Lock className={styles.tabIcon} />
          Deposit Items
        </button>
        <button 
          className={`${styles.tab} ${selectedTab === 'withdraw' ? styles.active : ''}`}
          onClick={() => setSelectedTab('withdraw')}
        >
          <Unlock className={styles.tabIcon} />
          Withdraw Items
        </button>
        <button 
          className={`${styles.tab} ${selectedTab === 'history' ? styles.active : ''}`}
          onClick={() => setSelectedTab('history')}
        >
          <Star className={styles.tabIcon} />
          Transaction History
        </button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.content}>
        {selectedTab === 'deposit' && (
          <div className={styles.depositSection}>
            <h3>Deposit Items to Guild Bank</h3>
            <div className={styles.inventory}>
              <div className={styles.emptyState}>
                <p>No items available to deposit</p>
                <p className={styles.hint}>Items from your inventory will appear here</p>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'withdraw' && (
          <div className={styles.withdrawSection}>
            <h3>Guild Bank Items</h3>
            <div className={styles.bankItems}>
              {filteredItems.map(item => (
                <div key={item.id} className={styles.bankItem}>
                  <div className={styles.itemIcon}>{item.icon}</div>
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemType}>{item.type}</p>
                    <p className={styles.itemRarity}>{item.rarity}</p>
                    <p className={styles.itemValue}>₽{item.value.toLocaleString()}</p>
                    <p className={styles.depositedBy}>
                      Deposited by {item.depositedBy} on {item.depositedDate}
                    </p>
                  </div>
                  <div className={styles.itemActions}>
                    <button className={styles.withdrawButton}>
                      Withdraw
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'history' && (
          <div className={styles.historySection}>
            <h3>Transaction History</h3>
            <div className={styles.historyList}>
              <div className={styles.historyItem}>
                <div className={styles.historyIcon}>📥</div>
                <div className={styles.historyInfo}>
                  <p><strong>DragonMaster</strong> deposited Dragon Scale Armor</p>
                  <p className={styles.historyDate}>2024-01-15 14:30</p>
                </div>
                <div className={styles.historyValue}>+₽50,000</div>
              </div>
              <div className={styles.historyItem}>
                <div className={styles.historyIcon}>📤</div>
                <div className={styles.historyInfo}>
                  <p><strong>WarriorKing</strong> withdrew Mithril Sword</p>
                  <p className={styles.historyDate}>2024-01-14 09:15</p>
                </div>
                <div className={styles.historyValue}>-₽25,000</div>
              </div>
              <div className={styles.historyItem}>
                <div className={styles.historyIcon}>📥</div>
                <div className={styles.historyInfo}>
                  <p><strong>Alchemist</strong> deposited Health Potion x100</p>
                  <p className={styles.historyDate}>2024-01-13 16:45</p>
                </div>
                <div className={styles.historyValue}>+₽5,000</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuildBank;

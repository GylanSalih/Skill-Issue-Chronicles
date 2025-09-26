import {
  Archive,
  Package,
  Plus,
  Search,
  Shield,
  Sword,
  Trash2,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import { useGameState } from '../../../../../core/hooks/useGameState';
import { Item } from '../../../../../core/types/game';
import styles from './InventoryTab.module.scss';

const InventoryTab: React.FC = () => {
  const { gameState } = useGameState();
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'equipment' | 'materials' | 'consumables' | 'tools'
  >('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Mock inventory items - in real app this would come from gameState.inventory
  const mockItems: Item[] = [
    {
      id: 'wood_normal',
      name: 'Normal Wood',
      type: 'material',
      quantity: 45,
      level: 1,
      icon: '🪵',
      description: 'Basic wood material for crafting',
    },
    {
      id: 'wood_softwood',
      name: 'Softwood',
      type: 'material',
      quantity: 23,
      level: 5,
      icon: '🌲',
      description: 'Soft wood from young trees',
    },
    {
      id: 'sword_iron',
      name: 'Iron Sword',
      type: 'equipment',
      quantity: 1,
      level: 10,
      stats: { attack: 15, defense: 2 },
      icon: '⚔️',
      description: 'A sturdy iron blade for combat',
    },
    {
      id: 'shield_wooden',
      name: 'Wooden Shield',
      type: 'equipment',
      quantity: 1,
      level: 5,
      stats: { defense: 8 },
      icon: '🛡️',
      description: 'Basic wooden shield for protection',
    },
    {
      id: 'potion_health',
      name: 'Health Potion',
      type: 'consumable',
      quantity: 12,
      level: 1,
      icon: '🧪',
      description: 'Restores health when consumed',
    },
    {
      id: 'axe_bronze',
      name: 'Bronze Axe',
      type: 'tool',
      quantity: 1,
      level: 8,
      stats: { attack: 5 },
      icon: '🪓',
      description: 'Bronze axe for woodcutting',
    },
    {
      id: 'stone_granite',
      name: 'Granite Stone',
      type: 'material',
      quantity: 18,
      level: 15,
      icon: '🪨',
      description: 'Hard granite stone for construction',
    },
    {
      id: 'gem_ruby',
      name: 'Ruby',
      type: 'material',
      quantity: 3,
      level: 25,
      icon: '💎',
      description: 'Precious ruby gemstone',
    },
  ];

  const inventory = gameState.inventory || { items: mockItems, maxSlots: 50 };

  const categories = [
    { id: 'all', name: 'All', icon: Package },
    { id: 'equipment', name: 'Equipment', icon: Shield },
    { id: 'materials', name: 'Materials', icon: Archive },
    { id: 'consumables', name: 'Consumables', icon: Zap },
    { id: 'tools', name: 'Tools', icon: Sword },
  ];

  const getRarityColor = (level: number) => {
    if (level >= 25) return '#f59e0b'; // legendary
    if (level >= 15) return '#a855f7'; // epic
    if (level >= 8) return '#3b82f6'; // rare
    if (level >= 3) return '#22c55e'; // uncommon
    return '#9ca3af'; // common
  };

  const getRarityBg = (level: number) => {
    if (level >= 25) return 'rgba(245, 158, 11, 0.1)';
    if (level >= 15) return 'rgba(168, 85, 247, 0.1)';
    if (level >= 8) return 'rgba(59, 130, 246, 0.1)';
    if (level >= 3) return 'rgba(34, 197, 94, 0.1)';
    return 'rgba(156, 163, 175, 0.1)';
  };

  const getRarityName = (level: number) => {
    if (level >= 25) return 'Legendary';
    if (level >= 15) return 'Epic';
    if (level >= 8) return 'Rare';
    if (level >= 3) return 'Uncommon';
    return 'Common';
  };

  const filteredItems = inventory.items.filter(item => {
    const matchesCategory =
      selectedCategory === 'all' || item.type === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalItems = inventory.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const uniqueItems = inventory.items.length;
  const usedSlots = Math.min(uniqueItems, inventory.maxSlots);

  const handleItemClick = (item: Item) => {
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };

  const handleDeleteItem = (item: Item) => {
    // In real app, this would update the game state
    console.log(`Deleting ${item.name}`);
    setSelectedItem(null);
  };

  return (
    <>
      {/* Inventory Header */}
      <div className={`${styles.section} ${styles.inventoryHeader}`}>
        <div className={styles.inventoryHeaderContent}>
          <div className={styles.inventoryHeaderIcon}>
            <Package size={32} />
          </div>
          <div className={styles.inventoryHeaderText}>
            <h2>Inventory</h2>
            <p>Manage your items, equipment, and materials</p>
          </div>
        </div>
        <div className={styles.inventoryStats}>
          <div className={styles.inventoryStat}>
            <span className={styles.inventoryStatValue}>{totalItems}</span>
            <span className={styles.inventoryStatLabel}>Total Items</span>
          </div>
          <div className={styles.inventoryStat}>
            <span className={styles.inventoryStatValue}>{uniqueItems}</span>
            <span className={styles.inventoryStatLabel}>Unique</span>
          </div>
          <div className={styles.inventoryStat}>
            <span className={styles.inventoryStatValue}>
              {usedSlots}/{inventory.maxSlots}
            </span>
            <span className={styles.inventoryStatLabel}>Slots</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className={`${styles.section} ${styles.inventoryControls}`}>
        <div className={styles.searchContainer}>
          <Search size={16} />
          <input
            type='text'
            placeholder='Search items...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.categoryButtons}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.id as any)}
            >
              <category.icon size={16} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Grid */}
      <div className={`${styles.section} ${styles.inventoryGrid}`}>
        <h3>
          {selectedCategory === 'all'
            ? 'All Items'
            : `${categories.find(c => c.id === selectedCategory)?.name}`}{' '}
          ({filteredItems.length})
        </h3>
        <div className={styles.itemGrid}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`${styles.itemCard} ${selectedItem?.id === item.id ? styles.selected : ''}`}
              onClick={() => handleItemClick(item)}
            >
              <div className={styles.itemIcon}>
                <span className={styles.itemEmoji}>{item.icon}</span>
                <div className={styles.itemQuantity}>
                  {item.quantity > 1 && (
                    <span className={styles.quantityBadge}>
                      {item.quantity}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.itemInfo}>
                <h4>{item.name}</h4>
                <div className={styles.itemMeta}>
                  <span
                    className={styles.rarityTag}
                    style={{
                      color: getRarityColor(item.level),
                      backgroundColor: getRarityBg(item.level),
                    }}
                  >
                    {getRarityName(item.level)}
                  </span>
                  <span className={styles.levelTag}>Lv. {item.level}</span>
                </div>
                {item.stats && (
                  <div className={styles.itemStats}>
                    {Object.entries(item.stats).map(([stat, value]) => (
                      <span key={stat} className={styles.statBadge}>
                        {stat}: +{value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({
            length: Math.max(0, inventory.maxSlots - uniqueItems),
          }).map((_, index) => (
            <div key={`empty-${index}`} className={styles.emptySlot}>
              <Plus size={24} className={styles.emptySlotIcon} />
            </div>
          ))}
        </div>
      </div>

      {/* Item Details Panel */}
      {selectedItem && (
        <div className={`${styles.section} ${styles.itemDetails}`}>
          <div className={styles.itemDetailsHeader}>
            <div className={styles.itemDetailsIcon}>
              <span className={styles.itemEmoji}>{selectedItem.icon}</span>
            </div>
            <div className={styles.itemDetailsInfo}>
              <h3>{selectedItem.name}</h3>
              <div className={styles.itemDetailsMeta}>
                <span
                  className={styles.rarityTag}
                  style={{
                    color: getRarityColor(selectedItem.level),
                    backgroundColor: getRarityBg(selectedItem.level),
                  }}
                >
                  {getRarityName(selectedItem.level)}
                </span>
                <span className={styles.levelTag}>
                  Level {selectedItem.level}
                </span>
                <span className={styles.typeTag}>
                  {selectedItem.type.charAt(0).toUpperCase() +
                    selectedItem.type.slice(1)}
                </span>
              </div>
            </div>
            <div className={styles.itemDetailsActions}>
              <button
                className={styles.actionButton}
                onClick={() => handleDeleteItem(selectedItem)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {selectedItem.stats && (
            <div className={styles.itemDetailsStats}>
              <h4>Stats</h4>
              <div className={styles.statsGrid}>
                {Object.entries(selectedItem.stats).map(([stat, value]) => (
                  <div key={stat} className={styles.statItem}>
                    <span className={styles.statName}>
                      {stat.charAt(0).toUpperCase() + stat.slice(1)}
                    </span>
                    <span className={styles.statValue}>+{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.itemDetailsQuantity}>
            <h4>Quantity</h4>
            <div className={styles.quantityControls}>
              <span className={styles.quantityValue}>
                {selectedItem.quantity}
              </span>
              <span className={styles.quantityLabel}>
                {selectedItem.quantity === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className={`${styles.section} ${styles.quickActions}`}>
        <h3>Quick Actions</h3>
        <div className={styles.actionButtons}>
          <button className={styles.quickActionButton}>
            <Archive size={16} />
            <span>Sort Items</span>
          </button>
          <button className={styles.quickActionButton}>
            <Trash2 size={16} />
            <span>Clear Junk</span>
          </button>
          <button className={styles.quickActionButton}>
            <Package size={16} />
            <span>Expand Slots</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default InventoryTab;

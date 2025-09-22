'use client'

import React, { useState, useEffect } from 'react';
import { 
  TreePine,
  Axe,
  Clock,
  TrendingUp,
  Star,
  Zap,
  Award,
  Package,
  Activity,
  Timer,
  Lock,
  CheckCircle
} from 'lucide-react';
import styles from './Woodcutting.module.scss';

const Woodcutting = () => {
  const [playerLevel, setPlayerLevel] = useState(100);
  const [currentExp, setCurrentExp] = useState(12450);
  const [expToNext, setExpToNext] = useState(2550);
  const [activeWood, setActiveWood] = useState(null);
  const [cuttingProgress, setCuttingProgress] = useState(0);
  const [inventory, setInventory] = useState({});

const woodTypes = [
  { name: "Normal Wood", level: 1, exp: 5, time: 2000, color: "#8B4513", img: "/assets/img/Resources/Wood/NormalWood.png" },
  { name: "Softwood", level: 5, exp: 8, time: 2500, color: "#DEB887", img: "/assets/img/Resources/Wood/EbonyWood.png" },
  { name: "Oak Wood", level: 10, exp: 12, time: 3000, color: "#CD853F", img: "/assets/img/Resources/Wood/Frostbark.png" },
  { name: "Willow Wood", level: 20, exp: 18, time: 3500, color: "#90EE90", img: "/assets/img/Resources/Wood/Glowwood.png" },
  { name: "Maple Wood", level: 30, exp: 25, time: 4000, color: "#FF6347", img: "/assets/img/Resources/Wood/Softwood.png" },
  { name: "Ash Wood", level: 40, exp: 35, time: 4500, color: "#D2B48C", img: "/assets/img/Resources/Wood/Voidbark.png" },
  { name: "Yew Wood", level: 50, exp: 50, time: 5000, color: "#228B22", img: "/assets/img/Resources/Wood/WillowWood.png" },
  { name: "Mahogany Wood", level: 60, exp: 70, time: 5500, color: "#C04000", img: "/assets/img/Resources/Wood/YangWood.png" },
  { name: "Ebony Wood", level: 70, exp: 95, time: 6000, color: "#2F4F2F", img: "/assets/img/Resources/Wood/YingWood.png" },
  { name: "Redwood", level: 80, exp: 125, time: 6500, color: "#A0522D", img: "/assets/img/Resources/Wood/WillowWood.png" },
  { name: "Glowwood", level: 90, exp: 160, time: 7000, color: "#FFD700", img: "/assets/img/Resources/Wood/YingWood.png" },
  { name: "Soulwood", level: 100, exp: 200, time: 7500, color: "#9370DB", img: "/assets/img/Resources/Wood/Softwood.png" },
  { name: "Voidbark", level: 110, exp: 250, time: 8000, color: "#191970", img: "/assets/img/Resources/Wood/Frostbark.png" },
  { name: "Frostbark", level: 120, exp: 310, time: 8500, color: "#87CEEB", img: "/assets/img/Resources/Wood/normal.png" },
  { name: "Scorchwood", level: 130, exp: 380, time: 9000, color: "#FF4500", img: "/assets/img/Resources/Wood/normal.png" },
  { name: "Ancient Wood", level: 140, exp: 460, time: 9500, color: "#800080", img: "/assets/img/Resources/Wood/normal.png" },
  { name: "Dreamwood", level: 150, exp: 550, time: 10000, color: "#FF69B4", img: "/assets/img/Resources/Wood/normal.png" }
];

  const isUnlocked = (wood) => playerLevel >= wood.level;

  const startCutting = (wood) => {
    if (!isUnlocked(wood) || activeWood) return;
    
    setActiveWood(wood);
    setCuttingProgress(0);
    
    const interval = setInterval(() => {
      setCuttingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Add wood to inventory
          setInventory(prevInv => ({
            ...prevInv,
            [wood.name]: (prevInv[wood.name] || 0) + 1
          }));
          // Add experience
          setCurrentExp(prevExp => prevExp + wood.exp);
          setActiveWood(null);
          setCuttingProgress(0);
          return 0;
        }
        return prev + (100 / (wood.time / 100));
      });
    }, 100);
  };

  const stopCutting = () => {
    setActiveWood(null);
    setCuttingProgress(0);
  };

  const getTotalWoodCount = () => {
    return Object.values(inventory).reduce((sum, count) => sum + count, 0);
  };

  const getExpPercentage = () => {
    return (currentExp / (currentExp + expToNext)) * 100;
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            <TreePine className={styles.titleIcon} />
            Woodcutting
          </h1>
          <p className={styles.subtitle}>
            Fälle Bäume und sammle verschiedene Holzarten
          </p>
        </header>

        
        {/* Inventory Summary */}
        <div className={styles.inventorySection}>
          <div className={styles.cardTopLine} />
          
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderContent}>
              <div className={styles.cardIcon}>
                <Package />
              </div>
              <h3 className={styles.cardTitle}>
                Holz Inventar
              </h3>
            </div>
          </div>
          
          <div className={styles.inventoryGrid}>
            {Object.entries(inventory).map(([woodName, count]) => {
              const wood = woodTypes.find(w => w.name === woodName);
              return (
                <div key={woodName} className={styles.inventoryItem}>
                  <div 
                    className={styles.inventoryIcon}
                    style={{ backgroundColor: wood?.color || '#666' }}
                  >
                    <TreePine />
                  </div>
                  <div className={styles.inventoryInfo}>
                    <div className={styles.inventoryName}>{woodName}</div>
                    <div className={styles.inventoryCount}>{count.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
            
            {Object.keys(inventory).length === 0 && (
              <div className={styles.emptyInventory}>
                <Package className={styles.emptyIcon} />
                <span>Noch kein Holz gesammelt</span>
              </div>
            )}
          </div>
        </div>

        {/* Player Stats */}
        <div className={styles.playerStats}>
          <div className={styles.statCard}>
            <div className={styles.cardTopLine} />
            <div className={styles.statHeader}>
              <TrendingUp className={styles.statIcon} />
              <span>Level {playerLevel}</span>
            </div>
            <div className={styles.expBar}>
              <div 
                className={styles.expFill}
                style={{ width: `${getExpPercentage()}%` }}
              />
            </div>
            <div className={styles.expText}>
              {currentExp.toLocaleString()} / {(currentExp + expToNext).toLocaleString()} EXP
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.cardTopLine} />
            <div className={styles.statHeader}>
              <Package className={styles.statIcon} />
              <span>Gesammeltes Holz</span>
            </div>
            <div className={styles.statValue}>
              {getTotalWoodCount().toLocaleString()}
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.cardTopLine} />
            <div className={styles.statHeader}>
              <Award className={styles.statIcon} />
              <span>Freigeschaltet</span>
            </div>
            <div className={styles.statValue}>
              {woodTypes.filter(wood => isUnlocked(wood)).length} / {woodTypes.length}
            </div>
          </div>
        </div>

        {/* Active Cutting Display */}
        {activeWood && (
          <div className={styles.activeCutting}>
            <div className={styles.cardTopLine} />
            <div className={styles.activeCuttingContent}>
              <div className={styles.activeCuttingInfo}>
                <Axe className={styles.axeIcon} />
                <div>
                  <div className={styles.activeCuttingTitle}>
                    Fällen: {activeWood.name}
                  </div>
                  <div className={styles.activeCuttingSubtitle}>
                    +{activeWood.exp} EXP pro Holz
                  </div>
                </div>
              </div>
              
              <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${cuttingProgress}%` }}
                  />
                </div>
                <button 
                  className={styles.stopButton}
                  onClick={stopCutting}
                >
                  Stoppen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Wood Types Grid */}
        <div className={styles.woodGrid}>
          {woodTypes.map((wood, index) => {
            const unlocked = isUnlocked(wood);
            const isActive = activeWood?.name === wood.name;
            const woodCount = inventory[wood.name] || 0;
            
            return (
              <div 
                key={wood.name}
                className={`
                  ${styles.woodCard} 
                  ${!unlocked ? styles.locked : ''} 
                  ${isActive ? styles.active : ''}
                `}
                onClick={() => unlocked && !isActive ? startCutting(wood) : null}
              >
                <div className={styles.cardTopLine} />
                
                {/* Wood Image Placeholder */}
                    <div className={styles.woodImage}>
                    {unlocked ? (
                        <img 
                        src={wood.img} 
                        alt={wood.name} 
                        className={styles.woodImg} 
                        />
                    ) : (
                        <Lock className={styles.lockIcon} />
                    )}
                    </div>


                {/* Wood Info */}
                <div className={styles.woodInfo}>
                  <h3 className={styles.woodName}>
                    {wood.name}
                  </h3>
                  
                  <div className={styles.woodDetails}>
                    <div className={styles.woodDetail}>
                      <span className={styles.detailLabel}>Level:</span>
                      <span className={styles.detailValue}>{wood.level}</span>
                    </div>
                    
                    {unlocked && (
                      <>
                        <div className={styles.woodDetail}>
                          <span className={styles.detailLabel}>EXP:</span>
                          <span className={styles.detailValue}>+{wood.exp}</span>
                        </div>
                        
                        <div className={styles.woodDetail}>
                          <span className={styles.detailLabel}>Zeit:</span>
                          <span className={styles.detailValue}>{wood.time / 1000}s</span>
                        </div>
                        
                        <div className={styles.woodDetail}>
                          <span className={styles.detailLabel}>Anzahl:</span>
                          <span className={styles.detailValue}>{woodCount}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {!unlocked && (
                    <div className={styles.lockedText}>
                      Level {wood.level} benötigt
                    </div>
                  )}

                  {unlocked && !isActive && (
                    <div className={styles.cutButton}>
                      <Axe className={styles.buttonIcon} />
                      Fällen
                    </div>
                  )}

                  {isActive && (
                    <div className={styles.cuttingIndicator}>
                      <Activity className={styles.activityIcon} />
                      Wird gefällt...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Woodcutting;
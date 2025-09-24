import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GameProvider } from '../core/contexts/GameContext';
import { SaveManager } from '../core/services/saveManager';
// import { ActivityManagerProvider } from '../core/contexts/ActivityManager'
import {
  Achievements,
  Alchemy,
  AuctionHouse,
  Bank,
  BossTower,
  Character,
  CharacterCreation,
  CharacterSelection,
  Cooking,
  Dashboard,
  Divination,
  Dungeon,
  Enchanting,
  Events,
  Firemaking,
  Fishing,
  Fletching,
  Foraging,
  GameRules,
  GuildBank,
  Guilds,
  Herblore,
  Home,
  Hunting,
  Login,
  Mining,
  MyPets,
  News,
  Quests,
  Runecrafting,
  Settings,
  Shop,
  Smithing,
  Spells,
  Statistics,
  TradingPost,
  Woodcutting,
  WorldMap,
} from '../features/pages';
import { GameHeader, ResourcePanel, SideMenu } from '../shared/components';
import styles from './App.module.scss';
// import ActivityManagerDemo from '../shared/components/ActivityManagerDemo'

function App() {
  const [isResourcePanelVisible, setIsResourcePanelVisible] = useState(true);
  const [isResourcePanelCollapsed, setIsResourcePanelCollapsed] =
    useState(false);
  const [isSideMenuCollapsed, setIsSideMenuCollapsed] = useState(false);

  // Clear corrupted localStorage data on app start
  useEffect(() => {
    try {
      // Check if there are any corrupted entries
      const hasCorruptedData = Array.from(
        { length: localStorage.length },
        (_, i) => {
          const key = localStorage.key(i);
          if (key && (key.includes('idleGame') || key.includes('game'))) {
            try {
              const value = localStorage.getItem(key);
              if (value && value.trim() !== '') {
                JSON.parse(value);
              }
              return false;
            } catch {
              console.warn(`Corrupted data found for key: ${key}`);
              return true;
            }
          }
          return false;
        }
      ).some(Boolean);

      if (hasCorruptedData) {
        console.log('Corrupted localStorage data detected, clearing...');
        SaveManager.clearCorruptedData();
      }
    } catch (error) {
      console.error('Error checking localStorage:', error);
      // If we can't even check localStorage, clear everything
      SaveManager.clearCorruptedData();
    }
  }, []);

  const toggleResourcePanel = () => {
    setIsResourcePanelVisible(!isResourcePanelVisible);
  };

  const toggleResourcePanelCollapse = () => {
    setIsResourcePanelCollapsed(!isResourcePanelCollapsed);
  };

  const toggleSideMenu = () => {
    setIsSideMenuCollapsed(!isSideMenuCollapsed);
  };

  return (
    <GameProvider>
      <div className={styles.app}>
        <Routes>
          {/* Standalone routes (no layout) */}
          <Route path='/login' element={<Login />} />
          <Route path='/character-selection' element={<CharacterSelection />} />
          <Route path='/character-creation' element={<CharacterCreation />} />
          <Route
            path='/character-creation/:slotId'
            element={<CharacterCreation />}
          />

          {/* Main app routes with layout */}
          <Route
            path='/*'
            element={
              <>
                <SideMenu
                  isCollapsed={isSideMenuCollapsed}
                  onToggle={toggleSideMenu}
                />
                <div
                  className={`${styles.mainContent} ${isSideMenuCollapsed ? styles.sideMenuCollapsed : ''} ${isResourcePanelCollapsed ? styles.resourcePanelCollapsed : ''}`}
                >
                  <GameHeader
                    onToggleResourcePanel={toggleResourcePanel}
                    isResourcePanelVisible={isResourcePanelVisible}
                    onToggleResourcePanelCollapse={toggleResourcePanelCollapse}
                    isResourcePanelCollapsed={isResourcePanelCollapsed}
                    onToggleSideMenu={toggleSideMenu}
                    isSideMenuCollapsed={isSideMenuCollapsed}
                  />
                  <main className={styles.content}>
                    <div className={styles.pageContent}>
                      <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/character' element={<Character />} />
                        <Route
                          path='/character/profile'
                          element={<Character />}
                        />
                        <Route
                          path='/character/skins'
                          element={<Character />}
                        />
                        <Route
                          path='/character/badges'
                          element={<Character />}
                        />
                        {/* Skills */}
                        <Route path='/woodcutting' element={<Woodcutting />} />
                        <Route path='/fishing' element={<Fishing />} />
                        <Route path='/cooking' element={<Cooking />} />
                        <Route path='/mining' element={<Mining />} />
                        <Route path='/hunting' element={<Hunting />} />
                        <Route path='/foraging' element={<Foraging />} />
                        <Route path='/smithing' element={<Smithing />} />
                        <Route path='/firemaking' element={<Firemaking />} />
                        <Route path='/fletching' element={<Fletching />} />
                        <Route path='/herblore' element={<Herblore />} />
                        <Route
                          path='/runecrafting'
                          element={<Runecrafting />}
                        />
                        <Route path='/spells' element={<Spells />} />
                        <Route path='/enchanting' element={<Enchanting />} />
                        <Route path='/alchemy' element={<Alchemy />} />
                        <Route path='/divination' element={<Divination />} />

                        {/* Economy */}
                        <Route path='/bank' element={<Bank />} />
                        <Route path='/shop' element={<Shop />} />
                        <Route
                          path='/auction-house'
                          element={<AuctionHouse />}
                        />
                        <Route path='/trading-post' element={<TradingPost />} />
                        <Route path='/guild-bank' element={<GuildBank />} />

                        {/* World */}
                        <Route path='/world-map' element={<WorldMap />} />
                        <Route path='/quests' element={<Quests />} />
                        <Route path='/events' element={<Events />} />
                        <Route path='/guilds' element={<Guilds />} />
                        <Route
                          path='/achievements'
                          element={<Achievements />}
                        />

                        {/* Other */}
                        <Route path='/statistics' element={<Statistics />} />
                        <Route path='/settings' element={<Settings />} />
                        <Route path='/my-pets' element={<MyPets />} />
                        <Route path='/dungeon' element={<Dungeon />} />
                        <Route path='/boss-tower' element={<BossTower />} />
                        <Route path='/news' element={<News />} />
                        <Route path='/game-rules' element={<GameRules />} />
                        {/* Fallback route */}
                        <Route path='*' element={<Dashboard />} />
                        {/* <Route path="/activity-demo" element={<ActivityManagerDemo />} /> */}
                      </Routes>
                    </div>
                    {isResourcePanelVisible && (
                      <ResourcePanel
                        isCollapsed={isResourcePanelCollapsed}
                        onToggle={toggleResourcePanelCollapse}
                      />
                    )}
                  </main>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </GameProvider>
  );
}

export default App;

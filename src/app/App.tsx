import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { GameProvider } from '../core/contexts/GameContext'
// import { ActivityManagerProvider } from '../core/contexts/ActivityManager'
import { 
  SideMenu, 
  GameHeader, 
  ResourcePanel 
} from '../shared/components'
import { 
  Home, 
  Dashboard, 
  Woodcutting, 
  Fishing, 
  Cooking, 
  Mining, 
  Smithing, 
  Bank, 
  Shop, 
  Statistics, 
  Settings, 
  MyPets, 
  Dungeon, 
  BossTower, 
  News, 
  Login, 
  GameRules, 
  Character,
  CharacterSelection, 
  CharacterCreation 
} from '../features'
import styles from './App.module.scss'
// import ActivityManagerDemo from '../shared/components/ActivityManagerDemo'

function App() {
  const [isResourcePanelVisible, setIsResourcePanelVisible] = useState(true);

  const toggleResourcePanel = () => {
    setIsResourcePanelVisible(!isResourcePanelVisible);
  };

  return (
    <GameProvider>
      <div className={styles.app}>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/character-selection" element={<CharacterSelection />} />
        <Route path="/character-creation" element={<CharacterCreation />} />
        <Route path="/character-creation/:slotId" element={<CharacterCreation />} />
        <Route path="/*" element={
          <>
            <SideMenu />
            <div className={styles.mainContent}>
              <GameHeader 
                onToggleResourcePanel={toggleResourcePanel}
                isResourcePanelVisible={isResourcePanelVisible}
              />
              <main className={styles.content}>
                <div className={styles.pageContent}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/character" element={<Character />} />
                    <Route path="/character/profile" element={<Character />} />
                    <Route path="/character/skins" element={<Character />} />
                    <Route path="/character/badges" element={<Character />} />
                    <Route path="/character-selection" element={<CharacterSelection />} />
                    <Route path="/woodcutting" element={<Woodcutting />} />
                    <Route path="/fishing" element={<Fishing />} />
                    <Route path="/cooking" element={<Cooking />} />
                    <Route path="/mining" element={<Mining />} />
                    <Route path="/smithing" element={<Smithing />} />
                    <Route path="/bank" element={<Bank />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/my-pets" element={<MyPets />} />
                    <Route path="/dungeon" element={<Dungeon />} />
                    <Route path="/boss-tower" element={<BossTower />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/game-rules" element={<GameRules />} />
                    {/* <Route path="/activity-demo" element={<ActivityManagerDemo />} /> */}
                  </Routes>
                </div>
                {isResourcePanelVisible && <ResourcePanel />}
              </main>
            </div>
          </>
        } />
        </Routes>
        </div>
    </GameProvider>
  )
}

export default App

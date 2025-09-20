import { Routes, Route } from 'react-router-dom'
import SideMenu from './components/SideMenu/SideMenu'
import GameHeader from './components/GameHeader'
import ResourcePanel from './components/ResourcePanel'
import Home from './pages/Home'
import Character from './pages/Character'
import Woodcutting from './pages/Woodcutting'
import Fishing from './pages/Fishing'
import Cooking from './pages/Cooking'
import Mining from './pages/Mining'
import Smithing from './pages/Smithing'
import Bank from './pages/Bank'
import Shop from './pages/Shop'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'
import MyPets from './pages/MyPets'
import Dungeon from './pages/Dungeon'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <SideMenu />
      <div className={styles.mainContent}>
        <GameHeader />
        <main className={styles.content}>
          <div className={styles.pageContent}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/character" element={<Character />} />
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
            </Routes>
          </div>
          <div className={styles.sidebar}>
            <ResourcePanel />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

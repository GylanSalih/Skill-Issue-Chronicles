// app/page.js oder pages/index.js (je nach Next.js Version)
import SideMenu from "./components/SideMenu/SideMenu";
import Equipment from "./components/Equipment/Equipment";
import StatsPanel from "./components/StatsPanel/StatsPanel";
import CharacterManager from "./components/CharacterManager/CharacterManager";

export default function Home() {
  return (
    <main>
      < SideMenu />
      < Equipment />
      < StatsPanel />
      < CharacterManager />
    </main>
  );
}
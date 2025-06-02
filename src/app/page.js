// app/page.js oder pages/index.js (je nach Next.js Version)
import SideMenu from "./components/SideMenu/SideMenu";
import Equipment from "./components/Equipment/Equipment";
import StatsPanel from "./components/StatsPanel/StatsPanel";

export default function Home() {
  return (
    <main>
      < SideMenu />
      < Equipment />
      < StatsPanel />
    </main>
  );
}
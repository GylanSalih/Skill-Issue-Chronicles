// app/page.js oder pages/index.js (je nach Next.js Version)
import CharacterManager from "./components/CharacterManager/CharacterManager";

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Main Dashboard Page!</h1>
      < CharacterManager />
    </main>
  );
}
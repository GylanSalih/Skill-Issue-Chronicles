// app/character/page.jsx
import EquipmentInterface from "../components/EquipmentInterface/EquipmentInterface";
import StatsPanel from "../components/StatsPanel/StatsPanel";

export default function Page() {
  return (
    <>
      <h1>Welcome to the Character Page!</h1>
      < EquipmentInterface />
      < StatsPanel />
    </>
  );
}

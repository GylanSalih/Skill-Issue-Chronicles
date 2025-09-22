// Einfaches Event-System für Slider-Kommunikation
type SliderEventCallback = (woodType?: string) => void;

class SliderEventManager {
  private listeners: SliderEventCallback[] = [];
  private currentWoodType: string | null = null;

  // Registriere einen Listener
  addListener(callback: SliderEventCallback) {
    this.listeners.push(callback);
  }

  // Entferne einen Listener
  removeListener(callback: SliderEventCallback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Starte den Slider mit Wood-Type
  startSlider(woodType?: string) {
    this.currentWoodType = woodType || null;
    this.listeners.forEach(callback => callback(woodType));
  }

  // Get current wood type
  getCurrentWoodType() {
    return this.currentWoodType;
  }
}

// Globale Instanz
export const sliderEvents = new SliderEventManager();

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Mapping von Pfaden zu Menu-IDs
const PATH_TO_MENU_ID: Record<string, string> = {
  '/': 'dashboard',
  '/character': 'character',
  '/character/profile': 'character',
  '/character/skins': 'character',
  '/character/badges': 'character',
  '/dungeon': 'dungeon',
  '/boss-tower': 'boss-tower',
  '/slayer': 'slayer',
  '/pvp': 'pvp',
  '/bosses': 'bosses',
  '/raids': 'raids',
  '/woodcutting': 'woodcutting',
  '/fishing': 'fishing',
  '/mining': 'mining',
  '/hunting': 'hunting',
  '/foraging': 'foraging',
  '/smithing': 'smithing',
  '/cooking': 'cooking',
  '/firemaking': 'firemaking',
  '/fletching': 'fletching',
  '/herblore': 'herblore',
  '/runecrafting': 'runecrafting',
  '/bank': 'bank',
  '/shop': 'shop',
  '/statistics': 'statistics',
  '/settings': 'settings',
  '/my-pets': 'my-pets',
  '/pet-training': 'pet-training',
  '/news': 'news',
  '/game-rules': 'game-rules',
};

// Mapping von Menu-IDs zu übergeordneten Kategorien
const MENU_ID_TO_CATEGORY: Record<string, string> = {
  dashboard: 'dashboard',
  character: 'character',
  dungeon: 'combat',
  'boss-tower': 'combat',
  slayer: 'combat',
  pvp: 'combat',
  bosses: 'combat',
  raids: 'combat',
  woodcutting: 'gathering',
  fishing: 'gathering',
  mining: 'gathering',
  hunting: 'gathering',
  foraging: 'gathering',
  smithing: 'crafting',
  cooking: 'crafting',
  firemaking: 'crafting',
  fletching: 'crafting',
  herblore: 'crafting',
  runecrafting: 'crafting',
  bank: 'economy',
  shop: 'economy',
  statistics: 'progress',
  settings: 'settings',
  'my-pets': 'pets',
  'pet-training': 'pets',
  news: 'community',
  'game-rules': 'community',
};

const STORAGE_KEY = 'activeRoute';

export const useRoutePersistence = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>('dashboard');
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  // Lade gespeicherte Route beim Mount
  useEffect(() => {
    const savedRoute = localStorage.getItem(STORAGE_KEY);
    if (savedRoute) {
      const parsedRoute = JSON.parse(savedRoute);
      setActiveItem(parsedRoute.activeItem || 'dashboard');
      setExpandedCategories(parsedRoute.expandedCategories || {});
    }
  }, []);

  // Speichere aktuelle Route bei Änderungen
  useEffect(() => {
    const currentPath = location.pathname;
    const menuId = PATH_TO_MENU_ID[currentPath] || 'dashboard';
    const categoryId = MENU_ID_TO_CATEGORY[menuId];

    // Setze aktiven Menüpunkt
    setActiveItem(menuId);

    // Erweitere die entsprechende Kategorie und speichere in localStorage
    if (categoryId && categoryId !== menuId) {
      setExpandedCategories(prev => {
        const newExpanded = {
          ...prev,
          [categoryId]: true,
        };

        // Speichere in localStorage mit den neuen expandedCategories
        const routeData = {
          activeItem: menuId,
          expandedCategories: newExpanded,
          path: currentPath,
          timestamp: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(routeData));

        return newExpanded;
      });
    } else {
      // Speichere in localStorage ohne Kategorie-Änderung
      setExpandedCategories(prev => {
        const routeData = {
          activeItem: menuId,
          expandedCategories: prev,
          path: currentPath,
          timestamp: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(routeData));
        return prev;
      });
    }
  }, [location.pathname]);

  // Manuelle Funktionen für SideMenu
  const setActiveItemManually = (itemId: string) => {
    setActiveItem(itemId);

    // Speichere sofort
    const routeData = {
      activeItem: itemId,
      expandedCategories,
      path: location.pathname,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routeData));
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newExpanded = {
        ...prev,
        [categoryId]: !prev[categoryId],
      };

      // Speichere sofort
      const routeData = {
        activeItem,
        expandedCategories: newExpanded,
        path: location.pathname,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(routeData));

      return newExpanded;
    });
  };

  return {
    activeItem,
    expandedCategories,
    setActiveItem: setActiveItemManually,
    toggleCategory,
  };
};

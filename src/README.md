# 🎮 Skill Issue Chronicles - Project Structure

## 📁 Ordnerstruktur

```
src/
├── app/                          # App-Level Konfiguration
│   ├── App.tsx                   # Haupt-App-Komponente
│   ├── App.module.scss           # App-spezifische Styles
│   └── main.tsx                  # App-Entry-Point
│
├── core/                         # Kern-Systeme
│   ├── contexts/                 # React Contexts
│   │   ├── GameContext.tsx       # Haupt-Spiel-Context
│   │   ├── ActivityManager.tsx   # Aktivitäts-Manager
│   │   └── index.ts              # Barrel Export
│   ├── hooks/                    # Custom Hooks
│   │   ├── useGameState.ts       # Spiel-Status Hook
│   │   ├── useBossCombat.ts      # Boss-Kampf Hook
│   │   ├── useRoutePersistence.ts # Route-Persistierung
│   │   ├── useWoodcutting.ts     # Holzfällen Hook
│   │   └── index.ts              # Barrel Export
│   ├── services/                 # Business Logic Services
│   │   ├── saveManager.ts        # Speicher-Manager
│   │   ├── woodManager.ts        # Holz-Manager
│   │   ├── dateUtils.ts          # Datum-Utilities
│   │   ├── sliderEvents.ts       # Slider-Events
│   │   ├── utils.js              # Allgemeine Utilities
│   │   ├── bossConfig.ts         # Boss-Konfiguration
│   │   ├── characterClasses.ts   # Charakter-Klassen
│   │   ├── woodConfig.ts         # Holz-Konfiguration
│   │   └── index.ts              # Barrel Export
│   ├── types/                    # TypeScript Types
│   │   ├── game.ts               # Spiel-Types
│   │   ├── scss.d.ts             # SCSS Module Types
│   │   └── index.ts              # Barrel Export
│   └── index.ts                  # Core Barrel Export
│
├── features/                     # Feature-basierte Module
│   ├── auth/                     # Authentifizierung
│   │   ├── index.tsx             # Login-Komponente
│   │   ├── Login.module.scss     # Login-Styles
│   │   └── index.ts              # Barrel Export
│   ├── character/                # Charakter-System
│   │   ├── index.tsx             # Charakter-Hauptseite
│   │   ├── Character.module.scss # Charakter-Styles
│   │   ├── tabs/                 # Charakter-Tabs
│   │   │   ├── ProfileTab.tsx
│   │   │   ├── SkinsTab.tsx
│   │   │   └── BadgesTab.tsx
│   │   ├── CharacterFlow/        # Charakter-Erstellung
│   │   │   ├── CharacterCreation/
│   │   │   ├── CharacterSelection/
│   │   │   └── components/
│   │   └── index.ts              # Barrel Export
│   ├── skills/                   # Skill-System
│   │   ├── woodcutting/          # Holzfällen
│   │   ├── mining/               # Bergbau
│   │   ├── fishing/              # Angeln
│   │   ├── cooking/              # Kochen
│   │   ├── smithing/             # Schmieden
│   │   └── index.ts              # Barrel Export
│   ├── combat/                   # Kampf-System
│   │   ├── dungeon/              # Dungeon
│   │   ├── boss-tower/           # Boss-Turm
│   │   └── index.ts              # Barrel Export
│   ├── pets/                     # Pet-System
│   │   ├── my-pets/              # Meine Haustiere
│   │   ├── pet-training/         # Haustier-Training
│   │   └── index.ts              # Barrel Export
│   ├── economy/                  # Wirtschaft
│   │   ├── bank/                 # Bank
│   │   ├── shop/                 # Shop
│   │   └── index.ts              # Barrel Export
│   ├── ui/                       # UI Features
│   │   ├── home/                 # Startseite
│   │   ├── dashboard/            # Dashboard
│   │   ├── statistics/           # Statistiken
│   │   ├── settings/             # Einstellungen
│   │   ├── news/                 # Nachrichten
│   │   ├── game-rules/           # Spielregeln
│   │   └── index.ts              # Barrel Export
│   └── index.ts                  # Features Barrel Export
│
├── shared/                       # Geteilte Komponenten
│   ├── components/               # Wiederverwendbare UI-Komponenten
│   │   ├── SideMenu/             # Seitenmenü
│   │   ├── GameHeader/           # Spiel-Header
│   │   ├── ResourcePanel/        # Ressourcen-Panel
│   │   ├── StatsPanel/           # Statistiken-Panel
│   │   ├── Statistics/           # Statistiken-Komponente
│   │   ├── SaveLoadManager/      # Speicher/Laden-Manager
│   │   ├── EquipmentInterface/   # Ausrüstungs-Interface
│   │   ├── Pets/                 # Haustiere-Komponente
│   │   ├── SkillCard/            # Skill-Karte
│   │   ├── Woodcutting/          # Holzfällen-Komponenten
│   │   ├── ui/                   # UI-Komponenten
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── tooltip/
│   │   └── index.ts              # Barrel Export
│   ├── layouts/                  # Layout-Komponenten
│   ├── utils/                    # Utility-Funktionen
│   ├── constants/                # Konstanten
│   ├── styles/                   # Globale Styles
│   │   ├── globals.scss
│   │   ├── fonts.css
│   │   ├── globals.css
│   │   ├── home-page.css
│   │   └── index.scss
│   └── index.ts                  # Shared Barrel Export
│
├── assets/                       # Statische Assets
│   ├── images/                   # Bilder
│   │   ├── avatars/              # Avatar-Bilder
│   │   ├── characters/           # Charakter-Bilder
│   │   ├── pets/                 # Haustier-Bilder
│   │   ├── Resources/            # Ressourcen-Bilder
│   │   └── scenery/              # Landschafts-Bilder
│   ├── icons/                    # Icons
│   └── sounds/                   # Sounds
│
└── README.md                     # Diese Datei
```

## 🎯 Prinzipien

### 1. **Feature-basierte Struktur**

- Jedes Feature hat seinen eigenen Ordner
- Klare Trennung zwischen Features
- Einfache Navigation und Wartung

### 2. **Barrel Exports**

- `index.ts` Dateien für saubere Imports
- Reduziert Import-Pfade
- Bessere Code-Organisation

### 3. **Geteilte Komponenten**

- Wiederverwendbare UI-Komponenten in `shared/`
- Konsistente Design-Sprache
- Einfache Wartung

### 4. **Core-Systeme**

- Geschäftslogik in `core/services/`
- Hooks in `core/hooks/`
- Types in `core/types/`
- Contexts in `core/contexts/`

## 📦 Import-Beispiele

```typescript
// Alte Struktur
import SideMenu from '../components/SideMenu/SideMenu';
import GameHeader from '../components/GameHeader';
import { useGameState } from '../hooks/useGameState';

// Neue Struktur
import { SideMenu, GameHeader } from '../shared/components';
import { useGameState } from '../core/hooks';
```

## 🚀 Vorteile

1. **Skalierbarkeit**: Einfach neue Features hinzufügen
2. **Wartbarkeit**: Klare Struktur, einfache Navigation
3. **Teamarbeit**: Konsistente Struktur für alle Entwickler
4. **Performance**: Barrel exports für bessere Tree-shaking
5. **Zukunftssicher**: Erweiterbar für neue Features

## 🔧 Nächste Schritte

1. Alle Import-Pfade aktualisieren
2. Komponenten-Tests anpassen
3. Storybook-Konfiguration aktualisieren
4. CI/CD-Pipeline anpassen

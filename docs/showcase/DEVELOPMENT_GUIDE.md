# Skill Issue Chronicles - Development Guide

> **An epic RPG adventure with cutting-edge web technology**

## 🚀 **Quick Start for New Developers**

### **1. Project Setup (5 minutes)**

```bash
# Clone repository
git clone [repository-url]
cd Skill-Issue-Chronicles

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser: http://localhost:3003
```

### **2. Understanding Project Structure**

```
src/
├── app/                           # Main App Component & Routing
│   ├── App.tsx                   # Root component with routes
│   └── App.module.scss           # App-specific styles
│
├── core/                         # Game Logic & State Management
│   ├── contexts/                 # React Contexts
│   │   ├── GameContext.tsx      # Main game state
│   │   └── ActivityManager.tsx  # Activity management
│   ├── hooks/                    # Custom Hooks
│   │   ├── useGameState.ts      # Game state hook
│   │   ├── useWoodcutting.ts    # Woodcutting logic
│   │   └── useBossCombat.ts     # Combat logic
│   ├── services/                 # Game Services
│   │   ├── saveManager.ts       # Save/load system
│   │   ├── bossConfig.ts        # Boss configurations
│   │   └── woodConfig.ts        # Wood configurations
│   └── types/                    # TypeScript Definitions
│       └── game.ts              # Game type definitions
│
├── features/                     # Feature-based Architecture
│   ├── pages/                   # All pages with URLs
│   │   ├── dashboard/           # Main dashboard (/)
│   │   │   ├── index.tsx       # Dashboard component
│   │   │   └── Dashboard.module.scss
│   │   ├── character/           # Character system
│   │   │   ├── index.tsx       # Character page
│   │   │   ├── CharacterCreation/ # Character creation
│   │   │   ├── CharacterSelection/ # Character selection
│   │   │   └── tabs/           # Character tabs
│   │   ├── woodcutting/         # Woodcutting skill
│   │   │   └── index.tsx       # Woodcutting page
│   │   ├── mining/              # Mining skill
│   │   ├── fishing/             # Fishing skill
│   │   ├── cooking/             # Cooking skill
│   │   ├── smithing/            # Smithing skill
│   │   ├── dungeon/             # Dungeon combat
│   │   ├── boss-tower/          # Boss tower combat
│   │   ├── bank/                # Bank system
│   │   ├── shop/                # Shop system
│   │   ├── my-pets/             # Pet management
│   │   ├── statistics/          # Player statistics
│   │   ├── settings/            # Game settings
│   │   ├── news/                # News system
│   │   ├── game-rules/          # Game rules
│   │   └── login/               # Login page
│   └── ui/                      # Reusable UI components only
│       └── index.ts            # UI exports
│
└── shared/                      # Shared Components & Utilities
    ├── components/              # Reusable UI Components
    │   ├── GameHeader/          # Game header component
    │   ├── SideMenu/            # Navigation menu
    │   ├── ResourcePanel/       # Resource display
    │   ├── Woodcutting/         # Woodcutting components
    │   ├── Statistics/          # Statistics components
    │   └── ui/                  # Basic UI components
    ├── styles/                  # Global Styles
    │   ├── globals.scss         # Global SCSS
    │   ├── fonts.css            # Font definitions
    │   └── index.scss           # Style imports
    └── utils/                   # Helper Functions
        └── index.ts            # Utility exports
```

### **3. File Organization Rules**

| **Type**       | **Location**                 | **Naming Convention**   | **Example**                   |
| -------------- | ---------------------------- | ----------------------- | ----------------------------- |
| **Pages**      | `src/features/pages/[page]/` | `index.tsx`             | `dashboard/index.tsx`         |
| **Components** | `src/shared/components/`     | `PascalCase.tsx`        | `WoodcuttingCard.tsx`         |
| **Styles**     | Same folder as component     | `Component.module.scss` | `WoodcuttingCard.module.scss` |
| **Hooks**      | `src/core/hooks/`            | `useHookName.ts`        | `useWoodcutting.ts`           |
| **Services**   | `src/core/services/`         | `camelCase.ts`          | `saveManager.ts`              |
| **Types**      | `src/core/types/`            | `camelCase.ts`          | `game.ts`                     |
| **Utils**      | `src/shared/utils/`          | `camelCase.ts`          | `dateUtils.ts`                |

## 🎮 **Game Features Overview**

### **✅ Implemented:**

- **Character System**: Creation, Selection, Management
- **Skills**: Woodcutting, Mining, Fishing, Cooking, Smithing, Magic
- **Combat**: Dungeon, Boss Tower
- **Economy**: Bank, Shop, Resources
- **Pets**: Collection, Training, Management
- **UI/UX**: Dashboard, Navigation, Statistics

### **🔄 In Development:**

- Performance Optimization
- Mobile Responsiveness
- Audio System

### **📋 Planned:**

- Multiplayer Support
- Achievement System
- World Map
- Mobile App

## 🛠️ **Development Workflow**

### **Code Quality Standards**

```bash
# Format code (automatic on save)
npm run format

# Check linting
npm run lint

# Test build
npm run build

# Check TypeScript
npx tsc --noEmit
```

### **Git Workflow**

```bash
# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push & create Pull Request
git push origin feature/new-feature
```

### **Prettier & ESLint**

- **Auto-Format**: Saves format automatically
- **ESLint**: Code quality monitoring
- **TypeScript**: Full type safety

## 🎯 **Next Development Steps**

### **1. Immediate Improvements** (1-2 days)

**A. Performance Optimization:**

```typescript
// React.memo for heavy components
const WoodcuttingCard = React.memo(({ wood, onCut }) => {
  // Component logic
});

// useMemo for expensive calculations
const woodcuttingStats = useMemo(() => {
  return calculateStats(wood, level, upgrades);
}, [wood, level, upgrades]);
```

**B. Mobile Responsiveness:**

- Touch controls for mobile
- Optimize responsive breakpoints
- Touch-friendly UI elements

**C. Loading States:**

```typescript
// Loading states for all async operations
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
```

### **2. Game Features** (1 week)

**A. Achievement System:**

```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: (gameState: GameState) => boolean;
  reward: Reward;
  unlocked: boolean;
}
```

**B. Audio System:**

```typescript
// Sound Manager for Game Audio
class SoundManager {
  playSound(soundId: string, volume: number = 1) {
    // Audio implementation
  }
}
```

**C. Save System Enhancement:**

```typescript
// Cloud Save Integration
interface SaveData {
  gameState: GameState;
  timestamp: number;
  version: string;
  checksum: string;
}
```

### **3. Advanced Features** (2-3 weeks)

**A. Multiplayer Foundation:**

```typescript
// WebSocket Connection for Real-time
interface MultiplayerState {
  players: Player[];
  events: GameEvent[];
  syncData: SyncData;
}
```

**B. World Map System:**

```typescript
// Expandable World Areas
interface WorldArea {
  id: string;
  name: string;
  unlocked: boolean;
  requirements: Requirement[];
  content: AreaContent;
}
```

## 🔧 **Technical Implementation**

### **State Management Pattern**

```typescript
// GameContext for global state
const GameContext = createContext<GameContextType | null>(null);

// Custom Hooks for specific features
const useWoodcutting = () => {
  const { gameState, updateGameState } = useGameContext();
  // Woodcutting logic
};
```

### **Component Architecture**

```typescript
// Page Components (with URLs)
export default function WoodcuttingPage() {
  return <WoodcuttingGrid />;
}

// UI Components (reusable)
export const WoodcuttingCard = ({ wood, onCut }) => {
  // Component logic
};
```

### **Styling Guidelines**

```scss
// Use SCSS Modules
.woodcuttingCard {
  // Component-specific styles

  &__header {
    // BEM naming convention
  }

  &--active {
    // Modifier
  }
}
```

## 🚀 **Deployment & Build**

### **Production Build**

```bash
# Build for production
npm run build

# Preview locally
npm run preview

# Deploy to Vercel
vercel --prod
```

### **Environment Setup**

```bash
# .env.local for local development
VITE_API_URL=http://localhost:3000
VITE_DEBUG_MODE=true

# .env.production for production
VITE_API_URL=https://api.skillissuechronicles.com
VITE_DEBUG_MODE=false
```

## 📊 **Testing Strategy**

### **Unit Tests** (Planned)

```bash
# Test setup
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Run tests
npm run test
```

### **E2E Tests** (Planned)

```bash
# Playwright setup
npm install --save-dev @playwright/test

# E2E tests
npm run test:e2e
```

## 🎮 **Game Design Principles**

### **RPG Core Loop**

1. **Character Creation** → Choose class, distribute stats
2. **Skill Training** → Collect resources, level skills
3. **Combat** → Explore dungeons, fight bosses
4. **Progression** → Upgrade equipment, unlock new areas
5. **Repeat** → With stronger characters

### **Retention Hooks**

- **Daily Rewards**: Daily login bonuses
- **Skill Progression**: Visible progress
- **Achievement System**: Goals and rewards
- **Social Features**: Leaderboards, guilds

## 🔧 **Development Tools**

### **VS Code Extensions** (Recommended)

- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **TypeScript Importer**
- **SCSS IntelliSense**
- **Auto Rename Tag**

### **Browser Tools**

- **React Developer Tools**
- **Redux DevTools** (if Redux is added)
- **Performance Profiler**
- **Network Tab** for API calls

## 📝 **Code Standards**

### **TypeScript Guidelines**

```typescript
// Interfaces for Props
interface WoodcuttingCardProps {
  wood: WoodType;
  onCut: (woodId: string) => void;
  disabled?: boolean;
}

// Enums for constants
enum SkillType {
  WOODCUTTING = 'woodcutting',
  MINING = 'mining',
  FISHING = 'fishing',
}
```

### **Component Guidelines**

```typescript
// Functional Components with TypeScript
const WoodcuttingCard: React.FC<WoodcuttingCardProps> = ({
  wood,
  onCut,
  disabled = false
}) => {
  // Component logic
  return (
    <div className={styles.woodcuttingCard}>
      {/* JSX */}
    </div>
  );
};
```

### **File Naming**

- **Components**: `PascalCase.tsx` (e.g. `WoodcuttingCard.tsx`)
- **Pages**: `index.tsx` in corresponding folder
- **Styles**: `ComponentName.module.scss`
- **Hooks**: `useHookName.ts`
- **Types**: `types.ts` or `interfaceName.ts`

## 🚨 **Common Problems & Solutions**

### **Import Errors after Restructure**

```typescript
// Wrong (old paths)
import { useGameState } from '../../../core/hooks/useGameState';

// Correct (new paths)
import { useGameState } from '../../../../core/hooks/useGameState';
```

### **SCSS Module Imports**

```typescript
// Always use .module.scss
import styles from './Component.module.scss';

// Not: import './Component.scss'
```

### **Build Errors**

```bash
# Fix TypeScript errors
npx tsc --noEmit

# Check dependencies
npm ls

# Reinstall node modules
rm -rf node_modules package-lock.json
npm install
```

## 📞 **Support & Contact**

- **Issues**: Use GitHub Issues
- **Discussions**: GitHub Discussions for questions
- **Code Review**: Pull Requests for feedback

---

**Welcome to the Skill Issue Chronicles Development Team! 🎮✨**

_"From scattered code to a masterpiece of modern web development"_

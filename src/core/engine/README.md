# 🎮 Melvor Engine - Central Game Logic

The **Melvor Engine** is the core of your idle game. It unifies ALL skill activities, timers, rewards, and events into a single central system.

## 🚀 Quickstart

```tsx
import { useMelvorEngine, useSkill, engine } from '../core/engine';

// In your React component
const MyComponent = () => {
  const gameEngine = useMelvorEngine();
  const woodcutting = useSkill('woodcutting');

  // Start Game Loop
  useEffect(() => {
    gameEngine.startGame();
  }, []);

  // Start Woodcutting
  const startChopping = () => {
    woodcutting.startActivity('normalWood', { loop: true });
  };

  return (
    <div>
      <h2>Level: {woodcutting.level}</h2>
      <button onClick={startChopping}>Start Chopping</button>
    </div>
  );
};
```

## 📁 File Structure

```
src/core/engine/
├── MelvorEngine.ts          # 🎯 Main engine class
├── SkillDefinitions.ts      # 📋 All skills & activities
├── useMelvorEngine.ts       # ⚛️  React hooks
├── engineSetup.ts           # 🔧 Setup & initialization
├── index.ts                 # 📤 Main export
└── README.md                # 📖 This file
```

## 🎯 Core Features

### ✅ Unified Skill Logic

- **All skills** (Woodcutting, Mining, Fishing, etc.) use the same API
- **Consistent timer management** for all activities
- **Unified reward calculation** with chances and variations

### ✅ Event-Based System

```tsx
// Listen to events
engine.on('skill:levelup', (skillId, newLevel, oldLevel) => {
  console.log(`${skillId} leveled up! ${oldLevel} → ${newLevel}`);
});

engine.on('activity:completed', result => {
  console.log('Activity completed:', result.rewards);
});
```

### ✅ Reactive UI Updates

```tsx
const woodcutting = useSkill('woodcutting');

// Automatic updates when something changes
console.log(woodcutting.level); // Current level
console.log(woodcutting.progress); // Activity progress (0-100)
console.log(woodcutting.isActive); // Whether currently active
```

### ✅ Performance Optimized

- **Central game loop** with configurable tick rate
- **Memoized calculations** for UI performance
- **Event-based updates** instead of polling

## 🛠️ API Overview

### Game Control

```tsx
const engine = useMelvorEngine();

engine.startGame(); // Start game loop
engine.pauseGame(); // Pause game loop
engine.saveGame(); // Save game
engine.isGameRunning; // Game status
```

### Skill Management

```tsx
const skill = useSkill('woodcutting');

skill.startActivity('normalWood', { loop: true });
skill.stopActivity();
skill.toggleLoop();
skill.canPerformActivity('ebonyWood'); // Level check
```

### Resource Management

```tsx
const resources = useResources(['normalWood', 'softwood']);

resources.getResource('normalWood'); // Quantity
resources.hasResource('normalWood', 10); // Enough available?
resources.totalResources; // Total amount
```

## 📋 Skill Definitions

All skills and activities are defined in `SkillDefinitions.ts`:

```tsx
// Example: Woodcutting Activity
{
  id: 'normalWood',
  name: 'Normal Wood',
  skillId: 'woodcutting',
  requiredLevel: 1,
  baseTime: 3,
  baseRewards: [
    {
      resourceType: 'wood',
      resourceId: 'normalWood',
      minAmount: 1,
      maxAmount: 2,
      chance: 1.0,
      experienceGain: 5,
    }
  ],
  rarity: 'common',
  description: 'Basic wood perfect for beginners.',
}
```

## 🎨 UI Integration

### Woodcutting Example

```tsx
const WoodcuttingPage = () => {
  const woodcutting = useSkill('woodcutting');
  const availableWoods = getUnlockedActivities(
    'woodcutting',
    woodcutting.level
  );

  return (
    <div>
      {/* Skill Info */}
      <SkillHeader skill={woodcutting} />

      {/* Current Activity */}
      {woodcutting.isActive && (
        <ActiveActivity
          activity={woodcutting.activeActivity}
          progress={woodcutting.progress}
          onStop={woodcutting.stopActivity}
          onToggleLoop={woodcutting.toggleLoop}
        />
      )}

      {/* Available Activities */}
      <ActivityGrid
        activities={availableWoods}
        onStart={woodcutting.startActivity}
        canPerform={woodcutting.canPerformActivity}
      />
    </div>
  );
};
```

## 🔄 Migration from Old Systems

### Before (scattered logic):

```tsx
// Different hooks and managers
const { gameState } = useGameState();
const { activeSession } = useWoodcutting();
const woodManager = new WoodManager();
// ... more scattered logic
```

### After (central engine):

```tsx
// A single source of truth
const engine = useMelvorEngine();
const woodcutting = useSkill('woodcutting');

// Everything is consistent and type-safe
woodcutting.startActivity('normalWood');
```

## 🎯 Advantages of the New Engine

### ✅ **No More Scattered Logic**

- Everything runs through a central engine
- Consistent APIs for all skills
- Unified timer management

### ✅ **Type-Safe**

- Full TypeScript support
- Auto-completion for all APIs
- Compile-time error checking

### ✅ **Performance**

- Central game loop (instead of multiple timers)
- Event-based updates
- Memoized calculations

### ✅ **Extensible**

- New skills easy to add
- Modular skill definitions
- Plugin system possible

### ✅ **Testable**

- Central logic = simpler tests
- Engine mocking possible
- Deterministic results

## 🚀 Next Steps

1. **Import the engine** into your app:

   ```tsx
   import { engine } from './core/engine';
   ```

2. **Replace old hooks** with new engine hooks:

   ```tsx
   // Old
   const { gameState } = useGameState();

   // New
   const engine = useMelvorEngine();
   ```

3. **Migrate UI components** to the new API

4. **Extend skills** in `SkillDefinitions.ts`

5. **Test everything** 🧪

---

**The engine is ready. Time to unify the scattered logic. 🎮✨**

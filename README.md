# Skill Issue Chronicles

<div align="center">

[![Discord][discord-shield]][discord-url]
[![Stargazers][stars-shield]][stars-url]
[![Version][version-shield]][version-url]
[![Status][status-shield]][status-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

</div>

#

### ⚠️ Attention Developer

- **Interested in this project?** Explore the codebase and docs.
- **Questions?** Reach out privately.
- **Support Needed!** Contributions for this Idle RPG 🎮✨

### 👥 We're Looking For

**Currently seeking talented individuals to join our team:**

- **🎨 UI/UX Designer** - Help create stunning game interfaces and user experiences
- **🛡️ Discord Moderator** - Manage our community and keep Discord server active
- **💻 Developer** - Contribute to game features, bug fixes, and new functionality

**Interested?** [Join our Discord](https://discord.gg/KFm8vhJrJ4) and write me directly!

### 📚 Developer Documentation

- **[📖 Development Guide](docs/showcase/DEVELOPMENT_GUIDE.md)** – Complete setup and development workflow
- **[📋 Changelog](docs/showcase/CHANGELOG.md)** – Version history and updates
- **[🗺️ Roadmap](docs/showcase/ROADMAP.md)** – Future features and development goals

#

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="docs/showcase/showcase_21_09_25_1.jpeg" width="300" height="300" min-height="300" alt="Game Screenshot 1">
        <br><sub>Character Selection</sub>
      </td>
      <td align="center">
        <img src="docs/showcase/showcase_21_09_25_2.jpeg" width="300" height="300" min-height="300" alt="Game Screenshot 2">
        <br><sub>Game Interface</sub>
      </td>
      <td align="center">
        <img src="docs/showcase/showcase_21_09_25_3.jpeg" width="300" height="300" min-height="300" alt="Game Screenshot 3">
        <br><sub>Resource Management</sub>
      </td>
      <td align="center">
        <img src="docs/showcase/showcase_21_09_25_4.jpeg" width="300" height="300" min-height="300" alt="Game Screenshot 4">
        <br><sub>Character Stats</sub>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="docs/showcase/showcase_21_09_25_5.jpeg" width="300" height="300" min-height="300" alt="Game Screenshot 5">
        <br><sub>Equipment System</sub>
      </td>
      <td align="center">
        <img src="docs/showcase/showcase_21_09_25_6.jpeg" width="300" height="300" min-height="300" alt="Game Screenshot 6">
        <br><sub>Boss Combat</sub>
      </td>
      <td align="center">
        <img src="docs/showcase/showcase_21_09_25_7.jpeg" width="300" height="300" min-height="300" alt="Game Screenshot 7">
        <br><sub>Game Dashboard</sub>
      </td>
      <td align="center">
        <img src="docs/showcase/showcase_21_09_25_8.jpeg" width="300" height="300" min-height="300" alt="Game Screenshot 8">
        <br><sub>Activity Manager</sub>
      </td>
    </tr>
  </table>
</div>

## 🎮 Key Features

### Character Management

- **Character Creation** - 10 unique classes (Warrior, Mage, Rogue, etc.)
- **Character Selection** - Multiple character slots with detailed stats
- **Stat Allocation** - Customize character attributes
- **Character Progression** - Level up system with experience points

### Resource Management

- **Woodcutting System** - Gather different wood types with varying rarities
- **Resource Panel** - Real-time resource tracking and management
- **Save/Load System** - Persistent character and progress data
- **Inventory Management** - Equipment and item storage

### Game Systems

- **Activity Manager** - Automated resource gathering with timers
- **Boss Combat** - Turn-based combat system with different boss tiers
- **Pet System** - Collect and train pets with unique abilities
- **Statistics Tracking** - Detailed progress monitoring and analytics

## 🛠️ Core Managers & Systems

### Game State Management

**Path**: `src/hooks/useGameState.ts`

- **Global State** - Centralized game state management
- **Resource Tracking** - Primary/secondary resources with 15+ wood types
- **Character Stats** - Attack, defense, intelligence, stamina, melee, ranged, magic
- **Skill System** - Woodcutting, cooking, mining with experience tracking
- **Auto-save** - Persistent data storage with localStorage

### Save Manager

**Path**: `src/lib/saveManager.ts`

- **SaveData Interface** - Structured save file format
- **Load/Save Functions** - `loadGame()`, `saveGame()`, `createNewSave()`
- **Character Persistence** - Multiple character slots with metadata
- **Data Validation** - Error handling and data integrity
- **Export/Import** - JSON-based save file system

### Activity Manager

**Path**: `src/contexts/ActivityManager.tsx`

- **Skill Management** - Start/stop skills with experience tracking
- **Progress Calculation** - Real-time progress bars and timers
- **Efficiency System** - Skill-based efficiency calculations
- **Game Control** - Start/stop/toggle game state
- **Level Progression** - Experience requirements and level calculations

### Wood Manager

**Path**: `src/lib/woodManager.ts`

- **Session Management** - Active woodcutting sessions with timers
- **Event System** - Real-time session updates and listeners
- **Progress Tracking** - Time-based progress with stamina consumption
- **Result Calculation** - Wood type, amount, and experience rewards

### Equipment System

**Path**: `src/components/EquipmentInterface/EquipmentInterface.tsx`

- **10 Equipment Slots** - Helmet, amulet, weapon, chest, shield, legs, gloves, boots, ring, cape
- **Rarity System** - Common, uncommon, rare, epic, legendary with color coding
- **Stat Bonuses** - Defense, attack, magic, agility, health, mana, luck
- **Item Management** - Equip/unequip with stat calculations
- **Visual Interface** - Character silhouette with equipment slots

### Character Classes

**Path**: `src/config/characterClasses.ts`

- **10 Unique Classes** - Warrior, Mage, Rogue, Archer, Healer, Berserker, Paladin, Assassin, Tinkerer, Elementalist
- **Base Stats** - Starting attributes for each class
- **Class Stats** - Attack, defense, magic, speed, health, mana ratings
- **Helper Functions** - `getClassStats()`, `getClassBaseStats()`, `getAllCharacterClasses()`

### Boss Combat System

**Path**: `src/config/bossConfig.ts`, `src/hooks/useBossCombat.ts`

- **Boss Tower** - Multiple floors with increasing difficulty
- **Turn-based Combat** - Attack, defend, magic, special abilities
- **Rarity System** - Boss rarity affects rewards and difficulty
- **Reward System** - Experience, gold, and item drops
- **Combat State** - Real-time combat tracking and management

## 🚀 Installation

```bash
# Clone repository
git clone https://github.com/GylanSalih/Skill-Issue-Chronicles

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build**: Vite + SCSS Modules
- **State**: React Context + Custom Hooks
- **Routing**: React Router v6
- **Icons**: Lucide React
- **3D**: Three.js + React Three Fiber
- **Animations**: GSAP + React Spring
- **Deployment**: Vercel

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## ⚠️ Alpha Status

This project is currently in **Alpha v0.0.4**. Features may be incomplete or subject to change.

## 🎯 Core Mechanics

### Character Classes

- **Warrior** - High defense and health
- **Mage** - High magic and mana
- **Rogue** - High speed and critical hits
- **Archer** - Ranged combat specialist
- **Healer** - Support and healing abilities
- **Berserker** - High damage, low defense
- **Paladin** - Balanced fighter with healing
- **Assassin** - Stealth and high damage
- **Tinkerer** - Technical abilities and traps
- **Elementalist** - Master of elemental magic

### Resource Gathering

- **Woodcutting** - Primary resource gathering activity
- **Rarity System** - Common to Legendary wood types
- **Time-based** - Automated gathering with progress bars
- **Experience Gain** - Skill progression through activities

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/GylanSalih">
        <img src="https://github.com/GylanSalih.png" width="100px;" alt="Gylan Salih"/>
        <br />
        <b>Gylan Salih</b>
      </a>
    </td>
    <td align="center">
      <img src="https://avatar.iran.liara.run/public/43" width="100px;" alt="Developer 2"/>
      <br />
      <b>Developer 2</b>
    </td>
    <td align="center">
      <img src="https://avatar.iran.liara.run/public/59" width="100px;" alt="Developer 3"/>
      <br />
      <b>Developer 3</b>
    </td>
    <td align="center">
      <img src="https://avatar.iran.liara.run/public/44" width="100px;" alt="Developer 4"/>
      <br />
      <b>Developer 4</b>
    </td>
  </tr>
</table>

---

**Status**: Alpha Development | **Version**: 0.0.1 | **Team Member**: 1

<!-- Badges Shields -->

[contributors-shield]: https://custom-icon-badges.demolab.com/github/contributors/GylanSalih/Skill-Issue-Chronicles?color=FF0000&logo=group&label=Contributors&logoColor=white&style=for-the-badge&labelColor=000000
[forks-shield]: https://custom-icon-badges.demolab.com/github/forks/GylanSalih/Skill-Issue-Chronicles?color=FF0000&logo=repo-forked&label=Forks&logoColor=white&style=for-the-badge&labelColor=000000
[stars-shield]: https://custom-icon-badges.demolab.com/github/stars/GylanSalih/Skill-Issue-Chronicles?color=FF0000&label=Stars&style=for-the-badge&logo=star&logoColor=white&labelColor=000000
[issues-shield]: https://custom-icon-badges.demolab.com/github/issues/GylanSalih/Skill-Issue-Chronicles?color=FF0000&logo=issue-opened&label=Issues&logoColor=white&labelColor=000000&style=for-the-badge
[license-shield]: https://custom-icon-badges.demolab.com/github/license/GylanSalih/Skill-Issue-Chronicles?color=FF0000&logo=law&label=License&logoColor=white&style=for-the-badge&labelColor=000000
[discord-shield]: https://img.shields.io/badge/Discord-Join%20Server-5865F2?style=for-the-badge&logo=discord&logoColor=white&labelColor=000000
[version-shield]: https://img.shields.io/badge/Version-0.0.1-FF0000?style=for-the-badge&logoColor=white&labelColor=000000
[status-shield]: https://img.shields.io/badge/Status-Alpha%20Development-FF0000?style=for-the-badge&logoColor=white&labelColor=000000

<!-- Badges Links -->

[contributors-url]: https://github.com/GylanSalih/Skill-Issue-Chronicles/graphs/contributors
[forks-url]: https://github.com/GylanSalih/Skill-Issue-Chronicles/network/members
[stars-url]: https://github.com/GylanSalih/Skill-Issue-Chronicles/stargazers
[issues-url]: https://github.com/GylanSalih/Skill-Issue-Chronicles/issues
[license-url]: https://github.com/GylanSalih/Skill-Issue-Chronicles/blob/main/LICENSE
[discord-url]: https://discord.gg/qwfa4c3bSH
[version-url]: https://github.com/GylanSalih/Skill-Issue-Chronicles
[status-url]: https://github.com/GylanSalih/Skill-Issue-Chronicles

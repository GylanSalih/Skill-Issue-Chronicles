# Skill Issue Chronicles

A fantasy RPG game built with React, TypeScript, and Vite.

## Features

- Character management system
- Multiple skill trees (Woodcutting, Fishing, Cooking, Mining, Smithing)
- Pet system
- Bank and shop functionality
- Statistics tracking
- Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CharacterManager/
│   ├── SideMenu/
│   ├── Woodcutting/
│   └── ui/             # Basic UI components
├── pages/              # Page components
├── styles/             # Global styles
└── lib/                # Utility functions
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Radix UI** - Accessible UI primitives

## Development

The project uses Vite for fast development with hot module replacement. All components are written in TypeScript for better type safety and developer experience.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request
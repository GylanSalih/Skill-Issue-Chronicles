# Color Harmony Guide - Skill-Issue-Chronicles

## Harmonized Color Palette

Alle Farben wurden an die Character Profile Farben angepasst, um eine einheitliche, professionelle Farbpalette zu schaffen.

### Primary Colors

- **Dark**: `#0f0f0f` - Haupt-Hintergrund
- **Darker**: `#1a1a1a` - Karten-Hintergrund
- **Gray**: `#2a2a2a` - Sekundär-Hintergrund
- **Light**: `#444` - Primäre Border
- **Lighter**: `#555` - Sekundäre Border

### Accent Colors (Harmonized)

- **Green**: `#10b981` - Erfolg, Natur, Woodcutting
- **Blue**: `#0ea5e9` - Info, Wasser, Fishing
- **Yellow**: `#f59e0b` - Warnung, Gold, Cooking
- **Red**: `#ef4444` - Fehler, Gefahr, Smithing
- **Orange**: `#ff6b35` - Primär, Feuer, Firemaking

### Skill Colors

- **Woodcutting**: `#10b981` (Grün)
- **Mining**: `#6b7280` (Grau)
- **Fishing**: `#0ea5e9` (Blau)
- **Cooking**: `#f59e0b` (Gelb)
- **Smithing**: `#ef4444` (Rot)
- **Firemaking**: `#ff6b35` (Orange)
- **Fletching**: `#8b5cf6` (Lila)
- **Herblore**: `#10b981` (Grün)
- **Runecrafting**: `#6366f1` (Indigo)
- **Magic**: `#8b5cf6` (Lila)
- **Enchanting**: `#a855f7` (Violett)
- **Alchemy**: `#f59e0b` (Gelb)
- **Divination**: `#06b6d4` (Cyan)

### Button Gradients

- **Primary**: `linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)`
- **Success**: `linear-gradient(135deg, #10b981 0%, #059669 100%)`
- **Warning**: `linear-gradient(135deg, #f59e0b 0%, #d97706 100%)`
- **Danger**: `linear-gradient(135deg, #ef4444 0%, #dc2626 100%)`
- **Info**: `linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)`

### Text Colors

- **Primary**: `#ffffff` - Haupttext
- **Secondary**: `#e5e7eb` - Sekundärtext
- **Muted**: `#9ca3af` - Gedämpfter Text
- **Subtle**: `#d1d5db` - Subtiler Text

### Usage Examples

```scss
// Import colors
@import '../shared/styles/colors.scss';

// Use harmonized colors
.my-component {
  background: $bg-card;
  color: $text-primary;
  border: 1px solid $border-primary;

  .button {
    background: $btn-primary;
    color: $text-primary;
  }

  .success-message {
    color: $accent-green;
    background: rgba(16, 185, 129, 0.1);
  }
}
```

## Color Harmony Principles

1. **Consistent Orange Theme**: Orange (`#ff6b35`) als primäre Akzentfarbe
2. **Natural Greens**: Grün für Natur-bezogene Skills
3. **Cool Blues**: Blau für Wasser und Information
4. **Warm Yellows**: Gelb für Gold und Warnungen
5. **Alert Reds**: Rot für Gefahr und Fehler

Alle Farben sind aufeinander abgestimmt und schaffen eine professionelle, einheitliche Benutzeroberfläche.

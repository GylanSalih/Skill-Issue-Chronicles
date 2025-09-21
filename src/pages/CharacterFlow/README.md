# Character Flow Pages

Dieser Ordner enthält alle Seiten, die zum Character-Erstellungs- und Auswahlprozess gehören.

## Seiten

### CharacterSelection (`/character-selection`)
- **Zweck**: Hauptseite für die Character-Auswahl
- **Features**: 
  - Zeigt alle 6 Character Slots
  - "Create New Character" Button
  - Navigation zu Character Creation oder direkt ins Spiel

### CharacterCreation (`/character-creation` und `/character-creation/:slotId`)
- **Zweck**: Character-Erstellung für spezifische Slots
- **Features**:
  - Slot-übergreifende Übersicht
  - Spezifische Character-Erstellung für bestimmten Slot
  - Back-Navigation zur Character Selection

## URL-Struktur

```
/login → Character Selection
/character-selection → Character Selection
/character-creation → Character Creation Übersicht
/character-creation/1 → Character Creation für Slot 1
/character-creation/2 → Character Creation für Slot 2
...
```

## Navigation Flow

1. **Login** → Character Selection
2. **Character Selection** → Character Creation (mit Slot-Parameter)
3. **Character Creation** → Character Selection (nach Erstellung)
4. **Character Selection** → Spiel (bei belegtem Slot)

## Technische Details

- **State Management**: LocalStorage für Character-Daten
- **URL-Parameter**: `:slotId` für spezifische Slots
- **Navigation**: React Router mit `useNavigate` und `useParams`
- **Styling**: Kompakte, responsive Slots ohne Scrollen

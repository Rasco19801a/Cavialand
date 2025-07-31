# 🐹 Cavia Avonturen Wereld

Een interactief webspel waar je met je eigen cavia verschillende werelden kunt verkennen!

## 🎮 Functies

- **8 Verschillende Werelden**: Verken de stad, natuur, strand, winter wonderland, woestijn, jungle, zwembad en dierenstad
- **Interactieve Gebouwen**: Bezoek hotels, cafés, winkels, kapper, supermarkt en ziekenhuis
- **Aanpasbare Cavia**: Ontwerp je eigen cavia met verschillende kleuren voor lichaam, oren, buik, voeten en neus
- **Meerdere Besturingsopties**: Gebruik muis/touch om te klikken waar je naartoe wilt, of gebruik de pijltjestoetsen/WASD
- **Responsive Design**: Werkt op desktop, tablet en mobiel

## 🚀 Installatie & Start

1. Zorg dat Node.js is geïnstalleerd op je systeem
2. Clone of download dit project
3. Navigeer naar de projectmap:
   ```bash
   cd cavia-adventure-app
   ```
4. Installeer de dependencies:
   ```bash
   npm install
   ```
5. Start de server:
   ```bash
   npm start
   ```
6. Open je browser en ga naar: http://localhost:3000

## 🎯 Hoe te Spelen

### Besturing
- **Muis/Touch**: Klik of tik waar je naartoe wilt lopen
- **Toetsenbord**: Gebruik de pijltjestoetsen of WASD om te bewegen
- **Gebouwen**: Klik op gebouwen in de stad of dierenstad om naar binnen te gaan
- **Uitgang**: Klik op de uitgang onderaan het scherm om een gebouw te verlaten

### Werelden
1. **🏙️ Stad**: Verken de stad met verschillende gebouwen
2. **🌲 Natuur**: Wandel door het bos en ontdek de natuur
3. **🏖️ Strand**: Geniet van zon, zee en strand
4. **⛷️ Winter**: Speel in de sneeuw en bezoek de iglo
5. **🏜️ Woestijn**: Ontdek de piramide in de woestijn
6. **🌴 Jungle**: Verken de tropische jungle
7. **🏊 Zwembad**: Neem een duik in verschillende baden
8. **🏪 Dierenstad**: Bezoek speciale winkels voor dieren

### Cavia Aanpassen
- Gebruik het kleurenpaneel rechts om je cavia aan te passen
- Kies kleuren voor: lichaam, oren, buik, voeten en neus
- Klik op "💾 Opslaan" om je ontwerp op te slaan

## 🏗️ Technische Details

### Project Structuur
```
cavia-adventure-app/
├── public/
│   ├── index.html
│   ├── styles/
│   │   └── main.css
│   └── js/
│       └── game/
│           ├── Game.js
│           ├── Player.js
│           ├── WorldManager.js
│           ├── UIManager.js
│           ├── InputManager.js
│           └── Renderer.js
├── server.js
├── package.json
└── README.md
```

### Gebruikte Technologieën
- **Frontend**: Vanilla JavaScript met ES6 modules
- **Graphics**: HTML5 Canvas API
- **Styling**: CSS3 met animaties en responsive design
- **Backend**: Express.js voor het serveren van de statische bestanden
- **Storage**: LocalStorage voor het opslaan van cavia kleuren

## 🎨 Features in Detail

### Modulaire Architectuur
- **Game.js**: Hoofdgame loop en coördinatie
- **Player.js**: Speler beweging en eigenschappen
- **WorldManager.js**: Wereld rendering en gebouw data
- **UIManager.js**: UI interacties en updates
- **InputManager.js**: Verwerking van gebruikersinput
- **Renderer.js**: Alle teken operaties

### Animaties
- Vloeiende camera beweging die de speler volgt
- Bounce effect bij het lopen
- UI panel slide-in animaties
- Kleur verandering feedback

### Responsive Design
- Automatische canvas grootte aanpassing
- Touch support voor mobiele apparaten
- UI panels passen zich aan voor kleine schermen

## 🐛 Troubleshooting

### Server start niet
- Controleer of Node.js correct is geïnstalleerd: `node --version`
- Zorg dat je in de juiste map bent: `cd cavia-adventure-app`
- Probeer de dependencies opnieuw te installeren: `rm -rf node_modules && npm install`

### Spel laadt niet
- Controleer de browser console voor errors (F12)
- Zorg dat JavaScript is ingeschakeld in je browser
- Probeer een andere browser (Chrome, Firefox, Safari)

### Performance problemen
- Sluit andere zware applicaties
- Probeer een kleinere browser window
- Update je browser naar de laatste versie

## 📝 Licentie

Dit project is gemaakt voor educatieve doeleinden. Voel je vrij om het te gebruiken en aan te passen!

## 🤝 Bijdragen

Suggesties en verbeteringen zijn welkom! Voel je vrij om issues te openen of pull requests te maken.

---

Veel plezier met het verkennen van de wereld met je cavia! 🐹✨
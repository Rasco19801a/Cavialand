# 🐹 Cavia Adventure Game

A modern, interactive web-based adventure game where players can customize and control a guinea pig (cavia) exploring various themed worlds.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org)
[![npm Version](https://img.shields.io/badge/npm-%3E%3D6.0.0-brightgreen)](https://www.npmjs.com)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Building for Production](#building-for-production)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Character Customization**: Design your guinea pig with various colors for different body parts
- **Multiple Worlds**: Explore 8 unique themed environments (City, Nature, Beach, Winter, Desert, Jungle, Swimming Pool, Animal City)
- **Interactive Buildings**: Enter and explore buildings in city environments
- **Responsive Controls**: Support for mouse, touch, and keyboard controls
- **Performance Optimized**: FPS limiting and efficient rendering
- **Error Handling**: Comprehensive error boundaries and logging
- **Modular Architecture**: Clean separation of concerns with modern JavaScript patterns

## 🛠 Technology Stack

- **Frontend Framework**: Vanilla JavaScript (ES6+)
- **Build Tool**: Webpack 5
- **Code Quality**: ESLint (Airbnb config) + Prettier
- **Testing**: Jest
- **CSS**: Modern CSS3 with animations
- **Graphics**: HTML5 Canvas API
- **Server**: Express.js
- **Package Manager**: npm

## 📁 Project Structure

```
cavia-adventure-app/
├── src/
│   ├── index.js              # Main entry point
│   ├── index.html            # HTML template
│   ├── App.js                # Application controller
│   ├── config/
│   │   └── constants.js      # Game configuration
│   ├── game/
│   │   ├── GameEngine.js     # Core game engine
│   │   ├── Player.js         # Player entity
│   │   ├── WorldManager.js   # World rendering
│   │   └── ...
│   ├── components/
│   │   ├── UIManager.js      # UI components
│   │   └── CustomizationScreen.js
│   ├── services/
│   │   ├── Logger.js         # Logging service
│   │   ├── EventBus.js       # Event management
│   │   └── AssetLoader.js    # Asset management
│   ├── utils/
│   │   └── ErrorBoundary.js  # Error handling
│   └── styles/
│       └── main.css          # Main stylesheet
├── tests/
│   ├── setup.js              # Jest setup
│   └── services/
│       └── Logger.test.js    # Example test
├── public/
│   └── dist/                 # Build output
├── webpack.config.js         # Webpack configuration
├── .eslintrc.js             # ESLint configuration
├── .prettierrc              # Prettier configuration
├── jest.config.js           # Jest configuration
├── .babelrc                 # Babel configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/cavia-adventure-app.git
cd cavia-adventure-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The game will open automatically at `http://localhost:3000`

## 💻 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Run production server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Analyze bundle size
npm run analyze
```

### Code Style

This project follows the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with some modifications. Code is automatically formatted using Prettier.

### Debugging

In development mode, the game instance is available at `window.__CAVIA_APP__` for debugging purposes.

## 🧪 Testing

Tests are written using Jest. Run the test suite with:

```bash
npm test
```

For test coverage:

```bash
npm test -- --coverage
```

### Writing Tests

Place test files adjacent to the code they test or in the `tests/` directory. Test files should be named `*.test.js`.

Example:
```javascript
import Logger from '../src/services/Logger';

describe('Logger', () => {
  test('should log messages', () => {
    Logger.info('Test message');
    expect(Logger.getLogs()).toHaveLength(1);
  });
});
```

## 📦 Building for Production

Build the optimized production bundle:

```bash
npm run build
```

This will:
- Minify JavaScript and CSS
- Optimize assets
- Generate source maps
- Create hashed filenames for cache busting
- Output to `public/dist/`

## 🏗 Architecture

### Design Patterns

- **Singleton Pattern**: Services (Logger, EventBus, ErrorBoundary)
- **Observer Pattern**: EventBus for decoupled communication
- **Module Pattern**: ES6 modules for code organization
- **Factory Pattern**: Asset creation in AssetLoader

### State Management

The application uses an event-driven architecture with the EventBus service for state management and component communication.

### Error Handling

Comprehensive error handling with:
- Global error boundaries
- Promise rejection handling
- Logging service with different log levels
- User-friendly error messages

### Performance Optimizations

- FPS limiting (60 FPS)
- Efficient Canvas rendering
- Asset preloading
- Code splitting (vendor/app bundles)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint rules
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for educational purposes
- Inspired by classic adventure games
- Special thanks to all contributors

---

For more information or support, please open an issue on GitHub.
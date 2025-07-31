/**
 * Game configuration constants
 * @module config/constants
 */

export const GAME_CONFIG = {
  CANVAS: {
    DEFAULT_WIDTH: 800,
    DEFAULT_HEIGHT: 600,
  },
  PLAYER: {
    DEFAULT_SPEED: 5,
    DEFAULT_POSITION: { x: 400, y: 500 },
    ANIMATION_SPEED: 0.1,
    MOVEMENT_THRESHOLD: 5,
  },
  WORLD: {
    DEFAULT_WIDTH: 2000,
    DEFAULT_HEIGHT: 1000,
    DEFAULT_WORLD: 'stad',
  },
  CAMERA: {
    SMOOTH_FACTOR: 0.1,
  },
  PERFORMANCE: {
    TARGET_FPS: 60,
    ENABLE_FPS_LIMIT: true,
  },
};

export const COLORS = {
  AVAILABLE: [
    { value: 'white', name: 'Wit' },
    { value: '#8B4513', name: 'Bruin' },
    { value: '#2c2c2c', name: 'Zwart' },
    { value: '#D2B48C', name: 'Beige' },
    { value: '#FFB6C1', name: 'Licht Roze' },
    { value: '#FF69B4', name: 'Roze' },
    { value: '#FFA500', name: 'Oranje' },
    { value: '#90EE90', name: 'Licht Groen' },
  ],
  DEFAULT_CAVIA: {
    body: 'white',
    ears: '#FFB6C1',
    belly: '#FFF5EE',
    feet: '#FFB6C1',
    nose: '#FF69B4',
  },
};

export const WORLDS = {
  stad: {
    name: 'Stad',
    icon: '🏙️',
    backgroundColor: '#87CEEB',
    groundColor: '#696969',
  },
  natuur: {
    name: 'Natuur',
    icon: '🌲',
    backgroundColor: '#87CEEB',
    groundColor: '#228B22',
  },
  strand: {
    name: 'Strand',
    icon: '🏖️',
    backgroundColor: '#87CEEB',
    groundColor: '#F4A460',
  },
  winter: {
    name: 'Winter',
    icon: '⛷️',
    backgroundColor: '#B0E0E6',
    groundColor: '#FFFFFF',
  },
  woestijn: {
    name: 'Woestijn',
    icon: '🏜️',
    backgroundColor: '#FFE4B5',
    groundColor: '#DEB887',
  },
  jungle: {
    name: 'Jungle',
    icon: '🌴',
    backgroundColor: '#98FB98',
    groundColor: '#556B2F',
  },
  zwembad: {
    name: 'Zwembad',
    icon: '🏊',
    backgroundColor: '#F0F8FF',
    groundColor: '#4682B4',
  },
  dierenstad: {
    name: 'Dierenstad',
    icon: '🏪',
    backgroundColor: '#FFE4B5',
    groundColor: '#D2691E',
  },
};

export const ERROR_MESSAGES = {
  GAME_INIT_FAILED: 'Game initialization failed',
  WORLD_LOAD_FAILED: 'Failed to load world',
  ASSET_LOAD_FAILED: 'Failed to load game assets',
  CANVAS_NOT_SUPPORTED: 'Canvas is not supported in your browser',
};

export const STORAGE_KEYS = {
  CAVIA_COLORS: 'caviaColors',
  GAME_SETTINGS: 'gameSettings',
  HIGH_SCORES: 'highScores',
};
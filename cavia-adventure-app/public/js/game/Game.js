import Player from './Player.js';
import WorldManager from './WorldManager.js';
import UIManager from './UIManager.js';
import InputManager from './InputManager.js';
import Renderer from './Renderer.js';

export default class Game {
    constructor() {
        // Get canvas and context
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Game state
        this.currentWorld = 'stad';
        this.isInside = false;
        this.currentBuilding = null;
        this.camera = { x: 0, y: 0 };
        this.worldBounds = { width: 2000, height: 1000 };
        
        // Initialize components
        this.player = new Player(400, 500);
        this.worldManager = new WorldManager();
        this.uiManager = new UIManager(this);
        this.inputManager = new InputManager(this);
        this.renderer = new Renderer(this.ctx);
        
        // Animation frame ID
        this.animationId = null;
        
        // Performance monitoring
        this.lastTime = 0;
        this.fps = 0;
        this.frameTime = 0;
        this.targetFPS = 60;
        this.targetFrameTime = 1000 / this.targetFPS;
        
        // Performance settings
        this.enableFPSLimit = true;
        this.showFPS = false;
        
        // Dirty rectangles for optimization
        this.dirtyRegions = [];
        this.fullRedraw = true;
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    changeWorld(worldName) {
        this.currentWorld = worldName;
        this.isInside = false;
        this.currentBuilding = null;
        this.player.reset();
        this.camera.x = 0;
        this.camera.y = 0;
        this.uiManager.updateWorldDisplay(worldName);
    }
    
    enterBuilding(building) {
        this.isInside = true;
        this.currentBuilding = building;
        this.player.x = 400;
        this.player.y = 300;
        this.player.clearTarget();
        this.uiManager.updateLocationDisplay(building.name);
    }
    
    exitBuilding() {
        this.isInside = false;
        this.player.x = this.currentBuilding.x + this.currentBuilding.w / 2;
        this.player.y = this.currentBuilding.y + this.currentBuilding.h + 50;
        this.currentBuilding = null;
        this.player.clearTarget();
        this.uiManager.updateLocationDisplay('Buiten');
    }
    
    update(deltaTime) {
        // Update player
        this.player.update(deltaTime);
        
        // Update camera to follow player (only when outside)
        if (!this.isInside) {
            this.updateCamera();
        }
        
        // Check boundaries
        this.checkBoundaries();
    }
    
    updateCamera() {
        // Center camera on player
        const targetX = this.player.x - this.canvas.width / 2;
        const targetY = this.player.y - this.canvas.height / 2;
        
        // Smooth camera movement
        this.camera.x += (targetX - this.camera.x) * 0.1;
        this.camera.y += (targetY - this.camera.y) * 0.1;
        
        // Clamp camera to world bounds
        this.camera.x = Math.max(0, Math.min(this.worldBounds.width - this.canvas.width, this.camera.x));
        this.camera.y = Math.max(0, Math.min(this.worldBounds.height - this.canvas.height, this.camera.y));
    }
    
    checkBoundaries() {
        if (!this.isInside) {
            // Keep player within world bounds
            this.player.x = Math.max(30, Math.min(this.worldBounds.width - 30, this.player.x));
            this.player.y = Math.max(30, Math.min(this.worldBounds.height - 30, this.player.y));
        } else {
            // Keep player within building
            this.player.x = Math.max(30, Math.min(770, this.player.x));
            this.player.y = Math.max(30, Math.min(570, this.player.y));
        }
    }
    
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (!this.isInside) {
            // Render world
            this.ctx.save();
            this.ctx.translate(-this.camera.x, -this.camera.y);
            
            // Draw world background
            this.worldManager.renderWorld(this.ctx, this.currentWorld);
            
            // Draw buildings if in city
            if (this.currentWorld === 'stad' || this.currentWorld === 'dierenstad') {
                const buildings = this.worldManager.getBuildings(this.currentWorld);
                buildings.forEach(building => {
                    this.renderer.drawBuilding(building);
                });
            }
            
            // Draw player target
            if (this.player.hasTarget()) {
                this.renderer.drawTarget(this.player.targetX, this.player.targetY);
            }
            
            // Draw player
            this.renderer.drawCavia(this.player.x, this.player.y, this.player.colors, 0.5);
            
            this.ctx.restore();
        } else {
            // Render building interior
            this.worldManager.renderInterior(this.ctx, this.currentBuilding);
            
            // Draw player
            this.renderer.drawCavia(this.player.x, this.player.y, this.player.colors, 0.5);
        }
        
        // Draw FPS counter (debug)
        // Uncomment to show FPS counter
        // this.ctx.fillStyle = 'black';
        // this.ctx.font = '16px Arial';
        // this.ctx.fillText(`FPS: ${Math.round(this.fps)}`, 10, 20);
    }
    
    gameLoop(currentTime) {
        // Calculate delta time
        const deltaTime = currentTime - this.lastTime;
        
        // FPS limiting
        if (this.enableFPSLimit) {
            this.frameTime += deltaTime;
            
            if (this.frameTime < this.targetFrameTime) {
                // Skip frame to maintain target FPS
                this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
                return;
            }
            
            // Reset frame time, keeping remainder
            this.frameTime = this.frameTime % this.targetFrameTime;
        }
        
        this.lastTime = currentTime;
        
        // Calculate FPS
        this.fps = 1000 / deltaTime;
        
        // Update game state
        this.update(deltaTime);
        
        // Render game
        this.render();
        
        // Show FPS if enabled
        if (this.showFPS) {
            this.renderFPS();
        }
        
        // Continue loop
        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    renderFPS() {
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(5, 5, 100, 25);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`FPS: ${Math.round(this.fps)}`, 10, 22);
        this.ctx.restore();
    }
    
    start() {
        // Initialize UI
        this.uiManager.initialize();
        
        // Setup performance monitoring
        if (window.location.hash === '#debug') {
            this.showFPS = true;
        }
        
        // Start game loop
        this.lastTime = performance.now();
        this.frameTime = 0;
        this.gameLoop(this.lastTime);
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}
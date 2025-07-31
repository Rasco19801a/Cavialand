export default class InputManager {
    constructor(game) {
        this.game = game;
        this.keys = {};
        this.touchStartX = null;
        this.touchStartY = null;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Keyboard events
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Mouse events
        this.game.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.game.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Touch events
        this.game.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.game.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.game.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Prevent context menu on right click
        this.game.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    handleKeyDown(e) {
        this.keys[e.key] = true;
        
        // Handle keyboard movement
        if (this.isMovementKey(e.key)) {
            e.preventDefault();
            this.game.player.moveWithKeys(this.keys);
        }
        
        // Handle special keys
        if (e.key === 'Escape' && this.game.isInside) {
            this.game.exitBuilding();
        }
    }
    
    handleKeyUp(e) {
        this.keys[e.key] = false;
    }
    
    handleClick(e) {
        const rect = this.game.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        if (!this.game.isInside) {
            // Convert to world coordinates
            const worldX = clickX + this.game.camera.x;
            const worldY = clickY + this.game.camera.y;
            
            // Check if clicked on a building
            if (this.game.currentWorld === 'stad' || this.game.currentWorld === 'dierenstad') {
                const buildings = this.game.worldManager.getBuildings(this.game.currentWorld);
                
                for (const building of buildings) {
                    if (this.isPointInRectangle(worldX, worldY, building)) {
                        this.game.enterBuilding(building);
                        return;
                    }
                }
            }
            
            // If not clicked on building, move player
            this.game.player.setTarget(worldX, worldY);
        } else {
            // Inside building
            if (clickY > 500 && clickX > 350 && clickX < 450) {
                // Clicked on exit
                this.game.exitBuilding();
            } else {
                // Move inside building
                this.game.player.setTarget(clickX, clickY);
            }
        }
    }
    
    handleMouseMove(e) {
        const rect = this.game.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Update cursor based on hover state
        if (this.game.isInside && mouseY > 500 && mouseX > 350 && mouseX < 450) {
            this.game.canvas.style.cursor = 'pointer';
        } else if (!this.game.isInside) {
            const worldX = mouseX + this.game.camera.x;
            const worldY = mouseY + this.game.camera.y;
            
            if (this.game.currentWorld === 'stad' || this.game.currentWorld === 'dierenstad') {
                const buildings = this.game.worldManager.getBuildings(this.game.currentWorld);
                const overBuilding = buildings.some(building => 
                    this.isPointInRectangle(worldX, worldY, building)
                );
                
                this.game.canvas.style.cursor = overBuilding ? 'pointer' : 'crosshair';
            } else {
                this.game.canvas.style.cursor = 'crosshair';
            }
        } else {
            this.game.canvas.style.cursor = 'crosshair';
        }
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        
        // Simulate click for single touch
        if (e.touches.length === 1) {
            this.handleClick({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        }
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        
        if (e.touches.length === 1 && this.touchStartX !== null) {
            const touch = e.touches[0];
            const deltaX = touch.clientX - this.touchStartX;
            const deltaY = touch.clientY - this.touchStartY;
            
            // Swipe detection for movement
            if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    // Horizontal swipe
                    if (deltaX > 0) {
                        this.keys['ArrowRight'] = true;
                        this.keys['ArrowLeft'] = false;
                    } else {
                        this.keys['ArrowLeft'] = true;
                        this.keys['ArrowRight'] = false;
                    }
                } else {
                    // Vertical swipe
                    if (deltaY > 0) {
                        this.keys['ArrowDown'] = true;
                        this.keys['ArrowUp'] = false;
                    } else {
                        this.keys['ArrowUp'] = true;
                        this.keys['ArrowDown'] = false;
                    }
                }
                
                this.game.player.moveWithKeys(this.keys);
            }
        }
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        this.touchStartX = null;
        this.touchStartY = null;
        
        // Clear all movement keys
        this.keys['ArrowLeft'] = false;
        this.keys['ArrowRight'] = false;
        this.keys['ArrowUp'] = false;
        this.keys['ArrowDown'] = false;
    }
    
    isMovementKey(key) {
        return ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 
                'w', 'W', 'a', 'A', 's', 'S', 'd', 'D'].includes(key);
    }
    
    isPointInRectangle(x, y, rect) {
        return x >= rect.x && x <= rect.x + rect.w &&
               y >= rect.y && y <= rect.y + rect.h;
    }
    
    update() {
        // Continuous keyboard movement
        if (Object.values(this.keys).some(key => key)) {
            this.game.player.moveWithKeys(this.keys);
        }
    }
}
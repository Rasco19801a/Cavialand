export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.targetX = null;
        this.targetY = null;
        
        // Cavia colors with defaults
        this.colors = {
            body: 'white',
            ears: '#FFB6C1',
            belly: '#FFF5EE',
            feet: '#FFB6C1',
            nose: '#FF69B4'
        };
        
        // Animation state
        this.animationFrame = 0;
        this.animationSpeed = 0.1;
        this.isMoving = false;
    }
    
    setTarget(x, y) {
        this.targetX = x;
        this.targetY = y;
    }
    
    clearTarget() {
        this.targetX = null;
        this.targetY = null;
    }
    
    hasTarget() {
        return this.targetX !== null && this.targetY !== null;
    }
    
    update(deltaTime) {
        this.isMoving = false;
        
        // Move towards target if set
        if (this.hasTarget()) {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 5) {
                // Normalize and apply speed
                const moveX = (dx / distance) * this.speed;
                const moveY = (dy / distance) * this.speed;
                
                this.x += moveX;
                this.y += moveY;
                this.isMoving = true;
            } else {
                // Reached target
                this.clearTarget();
            }
        }
        
        // Update animation
        if (this.isMoving) {
            this.animationFrame += this.animationSpeed;
            if (this.animationFrame > 1) {
                this.animationFrame = 0;
            }
        } else {
            this.animationFrame = 0;
        }
    }
    
    moveWithKeys(keys) {
        let moved = false;
        
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            this.x -= this.speed;
            moved = true;
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            this.x += this.speed;
            moved = true;
        }
        if (keys['ArrowUp'] || keys['w'] || keys['W']) {
            this.y -= this.speed;
            moved = true;
        }
        if (keys['ArrowDown'] || keys['s'] || keys['S']) {
            this.y += this.speed;
            moved = true;
        }
        
        if (moved) {
            this.clearTarget();
            this.isMoving = true;
        }
    }
    
    setColor(part, color) {
        if (this.colors.hasOwnProperty(part)) {
            this.colors[part] = color;
        }
    }
    
    reset() {
        this.x = 400;
        this.y = 500;
        this.clearTarget();
        this.animationFrame = 0;
        this.isMoving = false;
    }
    
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    
    getPosition() {
        return { x: this.x, y: this.y };
    }
    
    getAnimationOffset() {
        // Create a subtle bounce effect when moving
        if (this.isMoving) {
            return Math.sin(this.animationFrame * Math.PI * 2) * 2;
        }
        return 0;
    }
}
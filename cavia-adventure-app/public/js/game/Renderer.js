export default class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }
    
    drawCavia(x, y, colors, scale = 1, animationOffset = 0) {
        this.ctx.save();
        this.ctx.translate(x, y + animationOffset);
        this.ctx.scale(scale, scale);
        
        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.beginPath();
        this.ctx.ellipse(0, 35, 30, 10, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Body
        this.ctx.fillStyle = colors.body;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, 40, 30, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Body outline
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Belly
        this.ctx.fillStyle = colors.belly;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 10, 25, 15, 0, 0, Math.PI);
        this.ctx.fill();
        
        // Head
        this.ctx.fillStyle = colors.body;
        this.ctx.beginPath();
        this.ctx.ellipse(0, -20, 30, 25, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Head outline
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.stroke();
        
        // Ears
        this.ctx.fillStyle = colors.ears;
        // Left ear
        this.ctx.beginPath();
        this.ctx.ellipse(-15, -30, 10, 15, -0.3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.stroke();
        
        // Right ear
        this.ctx.beginPath();
        this.ctx.ellipse(15, -30, 10, 15, 0.3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Inner ears
        this.ctx.fillStyle = colors.nose;
        this.ctx.beginPath();
        this.ctx.ellipse(-15, -30, 5, 8, -0.3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.ellipse(15, -30, 5, 8, 0.3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Feet
        this.ctx.fillStyle = colors.feet;
        // Left foot
        this.ctx.beginPath();
        this.ctx.ellipse(-20, 20, 10, 15, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.stroke();
        
        // Right foot
        this.ctx.beginPath();
        this.ctx.ellipse(20, 20, 10, 15, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Eyes
        // Eye whites
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(-10, -20, 5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(10, -20, 5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Pupils
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.arc(-10, -20, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(10, -20, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Eye shine
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(-11, -21, 1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(9, -21, 1, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Nose
        this.ctx.fillStyle = colors.nose;
        this.ctx.beginPath();
        this.ctx.ellipse(0, -10, 3, 2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Mouth
        this.ctx.strokeStyle = colors.nose;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -10);
        this.ctx.lineTo(-3, -7);
        this.ctx.moveTo(0, -10);
        this.ctx.lineTo(3, -7);
        this.ctx.stroke();
        
        // Whiskers
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.lineWidth = 0.5;
        // Left whiskers
        this.ctx.beginPath();
        this.ctx.moveTo(-20, -15);
        this.ctx.lineTo(-30, -17);
        this.ctx.moveTo(-20, -10);
        this.ctx.lineTo(-30, -10);
        this.ctx.stroke();
        
        // Right whiskers
        this.ctx.beginPath();
        this.ctx.moveTo(20, -15);
        this.ctx.lineTo(30, -17);
        this.ctx.moveTo(20, -10);
        this.ctx.lineTo(30, -10);
        this.ctx.stroke();
        
        this.ctx.restore();
    }
    
    drawBuilding(building) {
        // Building shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fillRect(building.x + 5, building.y + 5, building.w, building.h);
        
        // Building body
        this.ctx.fillStyle = building.color || '#696969';
        this.ctx.fillRect(building.x, building.y, building.w, building.h);
        
        // Building outline
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(building.x, building.y, building.w, building.h);
        
        // Windows
        this.ctx.fillStyle = '#FFD700';
        const windowRows = Math.floor((building.h - 60) / 50);
        const windowCols = Math.floor((building.w - 40) / 40);
        
        for (let row = 0; row < windowRows; row++) {
            for (let col = 0; col < windowCols; col++) {
                const wx = building.x + 20 + col * 40;
                const wy = building.y + 20 + row * 50;
                
                // Window glow effect
                const gradient = this.ctx.createRadialGradient(wx + 12, wy + 15, 0, wx + 12, wy + 15, 20);
                gradient.addColorStop(0, '#FFFF00');
                gradient.addColorStop(1, '#FFD700');
                this.ctx.fillStyle = gradient;
                
                this.ctx.fillRect(wx, wy, 25, 30);
                
                // Window frame
                this.ctx.strokeStyle = '#654321';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(wx, wy, 25, 30);
                
                // Window cross
                this.ctx.beginPath();
                this.ctx.moveTo(wx + 12.5, wy);
                this.ctx.lineTo(wx + 12.5, wy + 30);
                this.ctx.moveTo(wx, wy + 15);
                this.ctx.lineTo(wx + 25, wy + 15);
                this.ctx.stroke();
            }
        }
        
        // Door
        const doorWidth = 40;
        const doorHeight = 60;
        const doorX = building.x + (building.w - doorWidth) / 2;
        const doorY = building.y + building.h - doorHeight;
        
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(doorX, doorY, doorWidth, doorHeight);
        
        // Door knob
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(doorX + doorWidth - 10, doorY + doorHeight / 2, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Building name
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 3;
        this.ctx.font = 'bold 16px Comic Sans MS';
        this.ctx.textAlign = 'center';
        this.ctx.strokeText(building.name, building.x + building.w/2, building.y - 10);
        this.ctx.fillText(building.name, building.x + building.w/2, building.y - 10);
    }
    
    drawTarget(x, y) {
        this.ctx.strokeStyle = '#FF69B4';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([5, 5]);
        
        // Outer circle
        this.ctx.beginPath();
        this.ctx.arc(x, y, 20, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Inner circle
        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Center dot
        this.ctx.fillStyle = '#FF69B4';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.setLineDash([]);
    }
    
    drawLoadingScreen() {
        // Background
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        // Loading text
        this.ctx.fillStyle = '#764ba2';
        this.ctx.font = 'bold 48px Comic Sans MS';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Cavia Avonturen Wereld', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 50);
        
        // Loading animation
        this.ctx.font = '24px Comic Sans MS';
        this.ctx.fillText('Laden...', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 50);
        
        // Draw a cute cavia
        const caviaColors = {
            body: 'white',
            ears: '#FFB6C1',
            belly: '#FFF5EE',
            feet: '#FFB6C1',
            nose: '#FF69B4'
        };
        
        this.drawCavia(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 150, caviaColors, 1.5);
    }
}
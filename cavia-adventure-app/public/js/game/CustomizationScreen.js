import { createElement, clearElement } from '../utils/DOMHelpers.js';

export default class CustomizationScreen {
    constructor(onComplete) {
        this.onComplete = onComplete;
        this.screen = document.getElementById('customizationScreen');
        this.colorPicker = document.getElementById('colorPicker');
        this.previewCanvas = document.getElementById('previewCanvas');
        this.previewCtx = this.previewCanvas.getContext('2d');
        this.startBtn = document.getElementById('startGameBtn');
        
        // Default cavia colors
        this.caviaColors = {
            body: 'white',
            ears: '#FFB6C1',
            belly: '#FFF5EE',
            feet: '#FFB6C1',
            nose: '#FF69B4'
        };
        
        // Available colors
        this.availableColors = [
            'white', 
            '#8B4513',  // brown
            '#2c2c2c',  // black
            '#D2B48C',  // tan
            '#FFB6C1',  // light pink
            '#FF69B4',  // hot pink
            '#FFA500',  // orange
            '#90EE90'   // light green
        ];
        
        this.initialize();
    }
    
    initialize() {
        this.setupColorPicker();
        this.setupStartButton();
        this.animatePreview();
        
        // Load saved colors if available
        this.loadSavedColors();
    }
    
    setupColorPicker() {
        const parts = [
            { key: 'body', label: 'Lichaam' },
            { key: 'ears', label: 'Oren' },
            { key: 'belly', label: 'Buik' },
            { key: 'feet', label: 'Voeten' },
            { key: 'nose', label: 'Neus' }
        ];
        
        clearElement(this.colorPicker);
        
        parts.forEach(part => {
            const partDiv = createElement('div', {}, [
                createElement('strong', {}, [part.label + ':']),
                ...this.availableColors.map(color => {
                    const btn = createElement('button', {
                        className: 'color-btn' + (this.caviaColors[part.key] === color ? ' active' : ''),
                        style: { backgroundColor: color },
                        title: this.getColorName(color),
                        onClick: () => this.selectColor(part.key, color)
                    });
                    return btn;
                })
            ]);
            
            this.colorPicker.appendChild(partDiv);
        });
    }
    
    selectColor(part, color) {
        this.caviaColors[part] = color;
        this.setupColorPicker(); // Refresh to update active states
        this.saveCaviaColors();
    }
    
    getColorName(color) {
        const colorNames = {
            'white': 'Wit',
            '#8B4513': 'Bruin',
            '#2c2c2c': 'Zwart',
            '#D2B48C': 'Beige',
            '#FFB6C1': 'Licht Roze',
            '#FF69B4': 'Roze',
            '#FFA500': 'Oranje',
            '#90EE90': 'Licht Groen'
        };
        return colorNames[color] || color;
    }
    
    animatePreview() {
        let bounceY = 0;
        let bounceDirection = 1;
        
        const animate = () => {
            // Clear canvas
            this.previewCtx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
            
            // Calculate bounce
            bounceY += bounceDirection * 0.5;
            if (bounceY > 5 || bounceY < -5) {
                bounceDirection *= -1;
            }
            
            // Draw cavia
            this.drawCavia(150, 150 + bounceY, 1.5);
            
            // Continue animation
            if (!this.screen.classList.contains('hidden')) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    drawCavia(x, y, scale = 1) {
        const ctx = this.previewCtx;
        
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(x, y + 30 * scale, 25 * scale, 10 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Body
        ctx.fillStyle = this.caviaColors.body;
        ctx.beginPath();
        ctx.ellipse(x, y, 30 * scale, 25 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Belly
        ctx.fillStyle = this.caviaColors.belly;
        ctx.beginPath();
        ctx.ellipse(x, y + 5 * scale, 20 * scale, 15 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Ears
        ctx.fillStyle = this.caviaColors.ears;
        ctx.beginPath();
        ctx.ellipse(x - 15 * scale, y - 15 * scale, 8 * scale, 10 * scale, -0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x + 15 * scale, y - 15 * scale, 8 * scale, 10 * scale, 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Feet
        ctx.fillStyle = this.caviaColors.feet;
        for (let i = -1; i <= 1; i += 2) {
            ctx.beginPath();
            ctx.ellipse(x + i * 15 * scale, y + 20 * scale, 7 * scale, 5 * scale, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Eyes
        ctx.fillStyle = 'black';
        for (let i = -1; i <= 1; i += 2) {
            ctx.beginPath();
            ctx.arc(x + i * 10 * scale, y - 5 * scale, 3 * scale, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Nose
        ctx.fillStyle = this.caviaColors.nose;
        ctx.beginPath();
        ctx.ellipse(x, y, 4 * scale, 3 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    setupStartButton() {
        this.startBtn.addEventListener('click', () => {
            this.hide();
            if (this.onComplete) {
                this.onComplete(this.caviaColors);
            }
        });
    }
    
    saveCaviaColors() {
        localStorage.setItem('caviaColors', JSON.stringify(this.caviaColors));
    }
    
    loadSavedColors() {
        const saved = localStorage.getItem('caviaColors');
        if (saved) {
            try {
                this.caviaColors = JSON.parse(saved);
                this.setupColorPicker(); // Refresh UI
            } catch (e) {
                console.error('Failed to load saved colors:', e);
            }
        }
    }
    
    show() {
        this.screen.classList.remove('hidden');
        this.animatePreview();
    }
    
    hide() {
        this.screen.classList.add('hidden');
    }
}
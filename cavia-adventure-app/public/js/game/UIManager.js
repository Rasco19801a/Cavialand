export default class UIManager {
    constructor(game) {
        this.game = game;
        this.worldSelector = document.getElementById('worldSelector');
        this.colorPicker = document.getElementById('colorPicker');
        this.currentWorldDisplay = document.getElementById('currentWorldDisplay');
        this.currentLocation = document.getElementById('currentLocation');
    }
    
    initialize() {
        this.createWorldButtons();
        this.setupColorPicker();
        this.setupSaveButton();
    }
    
    createWorldButtons() {
        const worlds = this.game.worldManager.getWorlds();
        
        // Clear existing buttons
        while (this.worldSelector.firstChild) {
            this.worldSelector.removeChild(this.worldSelector.firstChild);
        }
        
        Object.entries(worlds).forEach(([key, world]) => {
            const button = document.createElement('button');
            button.className = 'world-btn';
            button.textContent = `${world.icon} ${world.name}`;
            button.dataset.world = key;
            
            if (key === this.game.currentWorld) {
                button.classList.add('active');
            }
            
            button.addEventListener('click', (e) => {
                this.handleWorldChange(key, e.target);
            });
            
            this.worldSelector.appendChild(button);
        });
    }
    
    handleWorldChange(worldName, buttonElement) {
        // Update active button
        document.querySelectorAll('.world-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        buttonElement.classList.add('active');
        
        // Change world
        this.game.changeWorld(worldName);
    }
    
    setupColorPicker() {
        const colors = ['white', '#8B4513', '#2c2c2c', '#D2B48C', '#FFB6C1', '#FF69B4', '#FFA500', '#90EE90'];
        const parts = ['body', 'ears', 'belly', 'feet', 'nose'];
        
        // Clear existing content
        while (this.colorPicker.firstChild) {
            this.colorPicker.removeChild(this.colorPicker.firstChild);
        }
        
        parts.forEach(part => {
            const partDiv = document.createElement('div');
            const partLabel = document.createElement('strong');
            partLabel.textContent = this.translatePart(part) + ':';
            partDiv.appendChild(partLabel);
            
            const colorContainer = document.createElement('div');
            
            colors.forEach(color => {
                const btn = document.createElement('button');
                btn.className = 'color-btn';
                btn.style.backgroundColor = color;
                btn.title = this.getColorName(color);
                
                if (this.game.player.colors[part] === color) {
                    btn.classList.add('active');
                }
                
                btn.addEventListener('click', () => {
                    this.handleColorChange(part, color);
                });
                
                colorContainer.appendChild(btn);
            });
            
            partDiv.appendChild(colorContainer);
            this.colorPicker.appendChild(partDiv);
        });
    }
    
    handleColorChange(part, color) {
        // Update player color
        this.game.player.setColor(part, color);
        
        // Update UI
        this.setupColorPicker();
        
        // Show feedback
        this.showColorChangeFeedback();
    }
    
    showColorChangeFeedback() {
        const feedback = document.createElement('div');
        feedback.textContent = '✨ Kleur opgeslagen!';
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(118, 75, 162, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-size: 18px;
            z-index: 1000;
            animation: fadeInOut 1.5s ease-in-out;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 1500);
    }
    
    setupSaveButton() {
        // Make save button globally accessible
        window.saveDesign = () => {
            this.game.player.saveColors();
            this.showColorChangeFeedback();
        };
    }
    
    updateWorldDisplay(worldName) {
        const world = this.game.worldManager.getWorlds()[worldName];
        this.currentWorldDisplay.textContent = world.name;
    }
    
    updateLocationDisplay(location) {
        this.currentLocation.textContent = location;
    }
    
    translatePart(part) {
        const translations = {
            body: 'Lichaam',
            ears: 'Oren',
            belly: 'Buik',
            feet: 'Voeten',
            nose: 'Neus'
        };
        return translations[part] || part;
    }
    
    getColorName(color) {
        const colorNames = {
            'white': 'Wit',
            '#8B4513': 'Bruin',
            '#2c2c2c': 'Zwart',
            '#D2B48C': 'Beige',
            '#FFB6C1': 'Roze',
            '#FF69B4': 'Fel Roze',
            '#FFA500': 'Oranje',
            '#90EE90': 'Licht Groen'
        };
        return colorNames[color] || color;
    }
    
    showMessage(message, duration = 3000) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'game-message';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.9);
            padding: 15px 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            font-size: 16px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => messageDiv.remove(), 300);
        }, duration);
    }
}
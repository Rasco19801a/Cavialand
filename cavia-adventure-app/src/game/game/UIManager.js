export default class UIManager {
    constructor(game) {
        this.game = game;
        this.worldSelector = document.getElementById('worldSelector');
        this.currentWorldDisplay = document.getElementById('currentWorldDisplay');
        this.currentLocation = document.getElementById('currentLocation');
    }
    
    initialize() {
        this.createWorldButtons();
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
    
    updateWorldDisplay(worldName) {
        const worlds = this.game.worldManager.getWorlds();
        if (worlds[worldName]) {
            this.currentWorldDisplay.textContent = worlds[worldName].name;
        }
    }
    
    updateLocationDisplay(location) {
        this.currentLocation.textContent = location;
    }
    
    showTooltip(x, y, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    }
}
export default class WorldManager {
    constructor() {
        this.worlds = {
            stad: {
                name: 'Stad',
                icon: '🏙️',
                buildings: [
                    {x: 100, y: 300, w: 200, h: 250, name: 'Hotel', color: '#696969'},
                    {x: 350, y: 320, w: 150, h: 230, name: 'Café', color: '#8B7355'},
                    {x: 550, y: 280, w: 180, h: 270, name: 'Huis 1', color: '#778899'},
                    {x: 780, y: 300, w: 160, h: 250, name: 'Winkel', color: '#4682B4'},
                    {x: 990, y: 310, w: 170, h: 240, name: 'Huis 2', color: '#6B8E23'}
                ]
            },
            natuur: { name: 'Natuur', icon: '🌲' },
            strand: { name: 'Strand', icon: '🏖️' },
            winter: { name: 'Winter', icon: '⛷️' },
            woestijn: { name: 'Woestijn', icon: '🏜️' },
            jungle: { name: 'Jungle', icon: '🌴' },
            zwembad: { name: 'Zwembad', icon: '🏊' },
            dierenstad: {
                name: 'Dierenstad',
                icon: '🏪',
                buildings: [
                    {x: 200, y: 350, w: 200, h: 250, name: 'Kapper', color: '#FFB6C1'},
                    {x: 500, y: 350, w: 200, h: 250, name: 'Supermarkt', color: '#90EE90'},
                    {x: 800, y: 350, w: 200, h: 250, name: 'Dierenwinkel', color: '#87CEEB'},
                    {x: 1100, y: 350, w: 200, h: 250, name: 'Ziekenhuis', color: '#FF6347'}
                ]
            }
        };
    }
    
    getWorlds() {
        return this.worlds;
    }
    
    getBuildings(worldName) {
        return this.worlds[worldName]?.buildings || [];
    }
    
    renderWorld(ctx, worldName) {
        switch(worldName) {
            case 'stad': this.drawStad(ctx); break;
            case 'natuur': this.drawNatuur(ctx); break;
            case 'strand': this.drawStrand(ctx); break;
            case 'winter': this.drawWinter(ctx); break;
            case 'woestijn': this.drawWoestijn(ctx); break;
            case 'jungle': this.drawJungle(ctx); break;
            case 'zwembad': this.drawZwembad(ctx); break;
            case 'dierenstad': this.drawDierenstad(ctx); break;
        }
    }
    
    renderInterior(ctx, building) {
        // Room background
        ctx.fillStyle = '#F5DEB3';
        ctx.fillRect(0, 0, 800, 600);
        
        // Floor
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, 400, 800, 200);
        
        // Exit area
        ctx.fillStyle = '#654321';
        ctx.fillRect(350, 500, 100, 100);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Uitgang', 400, 550);
        
        // Render specific interior based on building type
        switch(building.name) {
            case 'Hotel': this.drawHotelInterior(ctx); break;
            case 'Café': this.drawCafeInterior(ctx); break;
            case 'Kapper': this.drawKapperInterior(ctx); break;
            case 'Supermarkt': this.drawSupermarktInterior(ctx); break;
            case 'Ziekenhuis': this.drawZiekenhuisInterior(ctx); break;
            default: this.drawHouseInterior(ctx); break;
        }
    }
    
    drawStad(ctx) {
        // Sky gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 550);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98D8E8');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 2000, 550);
        
        // Street
        ctx.fillStyle = '#2F4F4F';
        ctx.fillRect(0, 550, 2000, 450);
        
        // Street lines
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 5;
        ctx.setLineDash([20, 10]);
        ctx.beginPath();
        ctx.moveTo(0, 650);
        ctx.lineTo(2000, 650);
        ctx.stroke();
        ctx.setLineDash([]);
    }
    
    drawNatuur(ctx) {
        // Sky
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, 2000, 1000);
        
        // Grass
        ctx.fillStyle = '#228B22';
        ctx.fillRect(0, 500, 2000, 500);
        
        // Trees
        for (let i = 0; i < 10; i++) {
            const x = 200 + i * 150;
            const y = 450;
            
            // Tree trunk
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(x - 10, y, 20, 40);
            
            // Tree leaves
            ctx.fillStyle = '#228B22';
            ctx.beginPath();
            ctx.arc(x, y - 20, 30, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Pond
        ctx.fillStyle = '#4682B4';
        ctx.beginPath();
        ctx.ellipse(1000, 650, 150, 80, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Flowers
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * 2000;
            const y = 520 + Math.random() * 200;
            
            ctx.fillStyle = ['#FF69B4', '#FFD700', '#FF6347', '#9370DB'][Math.floor(Math.random() * 4)];
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    drawStrand(ctx) {
        // Sky
        const skyGradient = ctx.createLinearGradient(0, 0, 0, 400);
        skyGradient.addColorStop(0, '#87CEEB');
        skyGradient.addColorStop(1, '#98D8E8');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, 2000, 400);
        
        // Sea with waves
        ctx.fillStyle = '#4682B4';
        ctx.fillRect(0, 400, 2000, 200);
        
        // Beach
        ctx.fillStyle = '#F4A460';
        ctx.fillRect(0, 600, 2000, 400);
        
        // Sun
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(1500, 100, 50, 0, Math.PI * 2);
        ctx.fill();
        
        // Sun rays
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        for (let i = 0; i < 12; i++) {
            const angle = (i * 30) * Math.PI / 180;
            ctx.beginPath();
            ctx.moveTo(1500 + Math.cos(angle) * 60, 100 + Math.sin(angle) * 60);
            ctx.lineTo(1500 + Math.cos(angle) * 80, 100 + Math.sin(angle) * 80);
            ctx.stroke();
        }
        
        // Beach umbrellas
        for (let i = 0; i < 3; i++) {
            const x = 400 + i * 400;
            ctx.fillStyle = ['#FF6347', '#FFD700', '#87CEEB'][i];
            ctx.beginPath();
            ctx.arc(x, 650, 60, Math.PI, 0);
            ctx.fill();
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(x - 5, 650, 10, 80);
        }
    }
    
    drawWinter(ctx) {
        // Sky
        ctx.fillStyle = '#B0E0E6';
        ctx.fillRect(0, 0, 2000, 1000);
        
        // Snow ground
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 500, 2000, 500);
        
        // Mountains
        ctx.fillStyle = '#DCDCDC';
        ctx.beginPath();
        ctx.moveTo(0, 500);
        ctx.lineTo(500, 200);
        ctx.lineTo(1000, 500);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(800, 500);
        ctx.lineTo(1300, 250);
        ctx.lineTo(1800, 500);
        ctx.fill();
        
        // Snow on mountains
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(400, 280);
        ctx.lineTo(500, 200);
        ctx.lineTo(600, 280);
        ctx.fill();
        
        // Igloo
        ctx.fillStyle = '#F0F8FF';
        ctx.beginPath();
        ctx.arc(300, 600, 80, Math.PI, 0);
        ctx.fill();
        
        // Igloo entrance
        ctx.fillStyle = '#4682B4';
        ctx.beginPath();
        ctx.arc(300, 600, 30, Math.PI, 0);
        ctx.fill();
        
        // Snowflakes
        ctx.fillStyle = 'white';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 2000;
            const y = Math.random() * 1000;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    drawWoestijn(ctx) {
        // Sky
        const skyGradient = ctx.createLinearGradient(0, 0, 0, 400);
        skyGradient.addColorStop(0, '#87CEFA');
        skyGradient.addColorStop(1, '#FFE4B5');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, 2000, 400);
        
        // Desert sand
        ctx.fillStyle = '#F4A460';
        ctx.fillRect(0, 400, 2000, 600);
        
        // Sand dunes
        ctx.fillStyle = '#DEB887';
        for (let i = 0; i < 5; i++) {
            const x = i * 400;
            ctx.beginPath();
            ctx.arc(x + 200, 600, 150, 0, Math.PI);
            ctx.fill();
        }
        
        // Pyramid
        ctx.fillStyle = '#DEB887';
        ctx.beginPath();
        ctx.moveTo(600, 300);
        ctx.lineTo(400, 600);
        ctx.lineTo(800, 600);
        ctx.closePath();
        ctx.fill();
        
        // Pyramid entrance
        ctx.fillStyle = '#654321';
        ctx.fillRect(580, 500, 40, 100);
        
        // Cactus
        for (let i = 0; i < 3; i++) {
            const x = 1200 + i * 200;
            ctx.fillStyle = '#228B22';
            ctx.fillRect(x, 450, 30, 100);
            ctx.fillRect(x - 20, 480, 20, 40);
            ctx.fillRect(x + 30, 470, 20, 40);
        }
        
        // Sun
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(1600, 100, 60, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawJungle(ctx) {
        // Dark green background
        ctx.fillStyle = '#228B22';
        ctx.fillRect(0, 0, 2000, 1000);
        
        // Jungle trees
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * 2000;
            const y = 300 + Math.random() * 300;
            
            // Tree trunk
            ctx.fillStyle = '#654321';
            ctx.fillRect(x - 15, y, 30, 100);
            
            // Leaves
            ctx.fillStyle = '#006400';
            ctx.beginPath();
            ctx.arc(x, y - 20, 40, 0, Math.PI * 2);
            ctx.fill();
            
            // Vines
            ctx.strokeStyle = '#556B2F';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x + 20, y + 40, x - 20, y + 80, x, y + 120);
            ctx.stroke();
        }
        
        // Exotic flowers
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * 2000;
            const y = 600 + Math.random() * 200;
            
            ctx.fillStyle = ['#FF1493', '#FF69B4', '#DA70D6', '#FF00FF'][Math.floor(Math.random() * 4)];
            for (let j = 0; j < 6; j++) {
                const angle = (j * 60) * Math.PI / 180;
                ctx.beginPath();
                ctx.ellipse(x + Math.cos(angle) * 10, y + Math.sin(angle) * 10, 8, 15, angle, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    drawZwembad(ctx) {
        // Building interior
        ctx.fillStyle = '#F0F8FF';
        ctx.fillRect(0, 0, 2000, 1000);
        
        // Floor tiles
        ctx.fillStyle = '#4682B4';
        for (let x = 0; x < 2000; x += 50) {
            for (let y = 700; y < 1000; y += 50) {
                if ((x + y) % 100 === 0) {
                    ctx.fillRect(x, y, 50, 50);
                }
            }
        }
        
        // Pools
        const pools = [
            {x: 200, y: 400, w: 200, h: 150, color: '#DAA520', name: 'Stro Bad'},
            {x: 500, y: 400, w: 200, h: 150, color: '#00CED1', name: 'Water Bad'},
            {x: 800, y: 400, w: 200, h: 150, color: '#F4A460', name: 'Zand Bad'},
            {x: 1100, y: 400, w: 200, h: 150, color: '#E0FFFF', name: 'Bubbel Bad'}
        ];
        
        pools.forEach(pool => {
            // Pool shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(pool.x + 5, pool.y + 5, pool.w, pool.h);
            
            // Pool
            ctx.fillStyle = pool.color;
            ctx.fillRect(pool.x, pool.y, pool.w, pool.h);
            
            // Pool edge
            ctx.strokeStyle = '#4682B4';
            ctx.lineWidth = 3;
            ctx.strokeRect(pool.x, pool.y, pool.w, pool.h);
            
            // Pool name
            ctx.fillStyle = 'black';
            ctx.font = 'bold 18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(pool.name, pool.x + pool.w/2, pool.y - 10);
        });
    }
    
    drawDierenstad(ctx) {
        // Sky
        ctx.fillStyle = '#FFE4B5';
        ctx.fillRect(0, 0, 2000, 600);
        
        // Ground
        ctx.fillStyle = '#D2691E';
        ctx.fillRect(0, 600, 2000, 400);
        
        // Sidewalk
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(0, 580, 2000, 20);
    }
    
    // Interior drawing methods
    drawHotelInterior(ctx) {
        // Reception desk
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(300, 300, 200, 80);
        ctx.fillStyle = '#D2691E';
        ctx.fillRect(310, 310, 180, 60);
        
        // Bell on desk
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(400, 320, 15, Math.PI, 0);
        ctx.fill();
        
        // Straw beds
        for (let i = 0; i < 4; i++) {
            ctx.fillStyle = '#DAA520';
            ctx.fillRect(100 + i * 150, 200, 100, 60);
            ctx.fillStyle = '#F4A460';
            ctx.fillRect(110 + i * 150, 210, 80, 40);
            
            // Pillow
            ctx.fillStyle = '#FFF5EE';
            ctx.fillRect(115 + i * 150, 215, 30, 20);
        }
        
        // Sign
        ctx.fillStyle = 'black';
        ctx.font = 'bold 24px Comic Sans MS';
        ctx.textAlign = 'center';
        ctx.fillText('Welkom bij Hotel Helzingten!', 400, 50);
        ctx.font = '16px Comic Sans MS';
        ctx.fillText('Speciaal voor alle dieren', 400, 80);
    }
    
    drawCafeInterior(ctx) {
        // Counter
        ctx.fillStyle = '#DEB887';
        ctx.fillRect(50, 100, 700, 50);
        
        // Coffee machine
        ctx.fillStyle = '#696969';
        ctx.fillRect(600, 60, 80, 90);
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(640, 120, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Tables
        for (let i = 0; i < 3; i++) {
            const x = 200 + i * 200;
            const y = 250;
            
            // Table
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.arc(x, y, 40, 0, Math.PI * 2);
            ctx.fill();
            
            // Chairs
            ctx.fillStyle = '#654321';
            for (let j = 0; j < 4; j++) {
                const angle = (j * 90) * Math.PI / 180;
                const cx = x + Math.cos(angle) * 60;
                const cy = y + Math.sin(angle) * 60;
                ctx.beginPath();
                ctx.arc(cx, cy, 15, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Food on table
            ctx.fillStyle = '#DAA520';
            ctx.fillRect(x - 15, y - 15, 30, 30);
        }
        
        // Menu board
        ctx.fillStyle = '#2F4F4F';
        ctx.fillRect(100, 20, 200, 60);
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.fillText('Menu:', 110, 40);
        ctx.fillText('Hooi Latte - €2', 110, 55);
        ctx.fillText('Wortel Cake - €3', 110, 70);
    }
    
    drawHouseInterior(ctx) {
        // Living room setup
        // Couch
        ctx.fillStyle = '#4682B4';
        ctx.fillRect(100, 250, 150, 80);
        ctx.fillRect(80, 270, 20, 60);
        ctx.fillRect(250, 270, 20, 60);
        
        // TV
        ctx.fillStyle = '#2F4F4F';
        ctx.fillRect(120, 150, 110, 70);
        ctx.fillStyle = '#000000';
        ctx.fillRect(125, 155, 100, 60);
        
        // Coffee table
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(350, 280, 100, 60);
        
        // Bookshelf
        ctx.fillStyle = '#654321';
        ctx.fillRect(550, 150, 80, 200);
        
        // Books
        const bookColors = ['#FF6347', '#4169E1', '#32CD32', '#FFD700'];
        for (let i = 0; i < 4; i++) {
            ctx.fillStyle = bookColors[i];
            ctx.fillRect(560, 160 + i * 45, 60, 35);
        }
        
        // Kitchen area
        ctx.fillStyle = '#DCDCDC';
        ctx.fillRect(50, 50, 200, 80);
        
        // Stove burners
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(100, 90, 20, 0, Math.PI * 2);
        ctx.arc(150, 90, 20, 0, Math.PI * 2);
        ctx.arc(200, 90, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // Rug
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(200, 350, 150, 100);
    }
    
    drawKapperInterior(ctx) {
        // Salon chairs
        for (let i = 0; i < 3; i++) {
            const x = 150 + i * 200;
            
            // Chair
            ctx.fillStyle = '#FF69B4';
            ctx.fillRect(x, 300, 80, 100);
            ctx.fillRect(x - 10, 320, 100, 20);
            
            // Mirror
            ctx.fillStyle = '#E0FFFF';
            ctx.beginPath();
            ctx.ellipse(x + 40, 200, 40, 60, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        
        // Sink
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(600, 350, 100, 50);
        ctx.fillStyle = '#C0C0C0';
        ctx.beginPath();
        ctx.arc(650, 340, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Hair products shelf
        ctx.fillStyle = '#DEB887';
        ctx.fillRect(50, 150, 150, 100);
        
        // Products
        const colors = ['#FF69B4', '#9370DB', '#00CED1'];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                ctx.fillStyle = colors[j];
                ctx.fillRect(60 + j * 40, 160 + i * 30, 30, 25);
            }
        }
        
        // Sign
        ctx.fillStyle = '#FF1493';
        ctx.font = 'bold 24px Comic Sans MS';
        ctx.textAlign = 'center';
        ctx.fillText('Kapper Knabbel', 400, 50);
    }
    
    drawSupermarktInterior(ctx) {
        // Shelves
        for (let i = 0; i < 4; i++) {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(100 + i * 150, 200, 120, 150);
            
            // Shelf levels
            for (let j = 0; j < 3; j++) {
                ctx.fillStyle = '#D2691E';
                ctx.fillRect(105 + i * 150, 210 + j * 45, 110, 5);
            }
        }
        
        // Products on shelves
        const products = [
            {color: '#90EE90', name: 'Sla'},
            {color: '#FFA500', name: 'Wortel'},
            {color: '#DAA520', name: 'Hooi'},
            {color: '#8B4513', name: 'Pellets'}
        ];
        
        products.forEach((product, i) => {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 4; k++) {
                    ctx.fillStyle = product.color;
                    ctx.fillRect(110 + i * 150 + k * 25, 220 + j * 45, 20, 30);
                }
            }
        });
        
        // Checkout counter
        ctx.fillStyle = '#4682B4';
        ctx.fillRect(300, 450, 200, 80);
        
        // Cash register
        ctx.fillStyle = '#696969';
        ctx.fillRect(380, 430, 60, 40);
        
        // Shopping basket
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(50, 400);
        ctx.lineTo(60, 450);
        ctx.lineTo(100, 450);
        ctx.lineTo(110, 400);
        ctx.closePath();
        ctx.stroke();
    }
    
    drawZiekenhuisInterior(ctx) {
        // Hospital beds
        for (let i = 0; i < 3; i++) {
            // Bed frame
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(100 + i * 200, 250, 120, 80);
            ctx.strokeStyle = '#C0C0C0';
            ctx.lineWidth = 2;
            ctx.strokeRect(100 + i * 200, 250, 120, 80);
            
            // Pillow
            ctx.fillStyle = '#E0FFFF';
            ctx.fillRect(105 + i * 200, 255, 40, 25);
            
            // Blanket
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(105 + i * 200, 280, 110, 45);
        }
        
        // Medical cabinet
        ctx.fillStyle = '#F0F8FF';
        ctx.fillRect(600, 150, 100, 150);
        ctx.strokeStyle = '#4682B4';
        ctx.strokeRect(600, 150, 100, 150);
        
        // Red cross
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(640, 200, 20, 50);
        ctx.fillRect(625, 215, 50, 20);
        
        // Reception desk
        ctx.fillStyle = '#DEB887';
        ctx.fillRect(50, 400, 150, 80);
        
        // Sign
        ctx.fillStyle = '#FF0000';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Dierenziekenhuis', 400, 50);
        ctx.font = '16px Arial';
        ctx.fillText('24/7 Spoedhulp', 400, 80);
    }
}
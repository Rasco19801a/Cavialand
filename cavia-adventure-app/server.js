const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🎮 Cavia Avonturen Wereld is running!`);
    console.log(`🌐 Open http://localhost:${PORT} in your browser`);
    console.log(`✨ Have fun exploring with your guinea pig!`);
});
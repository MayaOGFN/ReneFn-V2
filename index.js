const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware for Fortnite Game Requests
app.use(express.json());
app.use((req, res, next) => {
    // Basic logging to see if the game is connecting
    if (req.url.includes('/fortnite/api')) {
        console.log(`[GAME CONNECTED] ${req.method} ${req.url}`);
    }
    next();
});

// --- THE HOMEPAGE (The "Bunch of Stuff") ---
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ReneFn Backend | Dashboard</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; background: #0a0a0a; color: white; text-align: center; padding: 50px; }
            .container { max-width: 800px; margin: auto; background: #111; padding: 30px; border-radius: 15px; border: 1px solid #333; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            h1 { color: #007bff; margin-bottom: 10px; }
            .status { display: inline-block; padding: 10px 20px; border-radius: 50px; background: #28a745; font-weight: bold; margin-bottom: 20px; }
            .links-box { text-align: left; background: #1a1a1a; padding: 20px; border-radius: 10px; margin-top: 20px; }
            .link-item { margin: 10px 0; font-size: 14px; color: #aaa; }
            a { color: #007bff; text-decoration: none; font-weight: bold; }
            a:hover { text-decoration: underline; }
            .version { font-size: 12px; color: #555; margin-top: 30px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>RENEFN V2 BACKEND</h1>
            <div class="status">● SERVER ONLINE</div>
            <p>Your 14.50 Private Server backend is running successfully on Render.</p>
            
            <div class="links-box">
                <h3>System Information</h3>
                <div class="link-item"><strong>Backend:</strong> renefn-v2.onrender.com</div>
                <div class="link-item"><strong>News API:</strong> fynox.ddns.net:8080/news</div>
                <div class="link-item"><strong>Download:</strong> <a href="https://public.simplyblk.xyz/10.40.7z">v10.40 Build</a></div>
                <div class="link-item"><strong>Shop API:</strong> fynox.ddns.net:81/Fynox/shop/code</div>
            </div>

            <div class="links-box">
                <h3>API Endpoints (For Testing)</h3>
                <div class="link-item"><a href="/fortnite/api/calendar/v1/any">Calendar API</a> (Check if working)</div>
                <div class="link-item"><a href="/fortnite/api/game/v2/enabled_features">Features API</a></div>
            </div>

            <div class="version">Running on Node.js | ReneFn 14.50 Support</div>
        </div>
    </body>
    </html>
    `);
});

// --- BASIC MCP ENDPOINTS (Placeholders for your game logic) ---
app.get('/fortnite/api/calendar/v1/any', (req, res) => {
    res.json({ "channels": { "client-events": { "states": [{ "validFrom": "2024-01-01T00:00:00.000Z", "activeEvents": [] }] } } });
});

app.get('/fortnite/api/game/v2/enabled_features', (req, res) => {
    res.json([]);
});

// Port Binding for Render
app.listen(PORT, '0.0.0.0', () => {
    console.log(`ReneFn Backend is live on port ${PORT}`);
});

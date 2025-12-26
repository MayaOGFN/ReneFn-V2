const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// Log Fortnite traffic
app.use((req, res, next) => {
    if (req.url.includes('/fortnite') || req.url.includes('/account')) {
        console.log(`[FN] ${req.method} ${req.url}`);
    }
    next();
});

// ------------------------------
// HOMEPAGE
// ------------------------------
app.get('/', (req, res) => {
    res.send(`
        <h1>ReneFN 14.50 Backend</h1>
        <p>Server is running.</p>
        <p>All core OGFN endpoints are active.</p>
    `);
});

// ------------------------------
// LIGHTSWITCH (Required)
// ------------------------------
app.get('/lightswitch/api/service/bulk/status', (req, res) => {
    res.json([{
        "serviceInstanceId": "fortnite",
        "status": "UP",
        "message": "Fortnite is online",
        "maintenanceUri": null,
        "overrideCatalogIds": [],
        "allowedActions": ["PLAY", "DOWNLOAD"],
        "banned": false
    }]);
});

// ------------------------------
// LAUNCHER AUTH (Required)
// ------------------------------
app.post('/account/api/oauth/token', (req, res) => {
    res.json({
        access_token: "ReneFN-Access",
        expires_in: 28800,
        token_type: "bearer",
        refresh_token: "ReneFN-Refresh",
        refresh_expires: 86400,
        account_id: "ReneFN",
        client_id: "ReneFN",
        internal_client: true,
        client_service: "fortnite"
    });
});

// ------------------------------
// ACCOUNT INFO
// ------------------------------
app.get('/account/api/public/account/:id', (req, res) => {
    res.json({
        id: req.params.id,
        displayName: "ReneFN",
        externalAuths: {}
    });
});

// ------------------------------
// CONTENT PAGES (News, MOTD)
// ------------------------------
app.get('/content/api/pages/fortnite-game', (req, res) => {
    res.json({
        "news": {
            "motd": {
                "title": "ReneFN 14.50",
                "body": "Welcome to the OG Private Server!",
                "image": "https://i.imgur.com/8QfQZ7v.png"
            }
        }
    });
});

// ------------------------------
// CALENDAR
// ------------------------------
app.get('/fortnite/api/calendar/v1/any', (req, res) => {
    res.json({
        channels: {
            "client-events": {
                states: [{
                    validFrom: "2020-01-01T00:00:00.000Z",
                    activeEvents: []
                }]
            }
        }
    });
});

// ------------------------------
// ENABLED FEATURES
// ------------------------------
app.get('/fortnite/api/game/v2/enabled_features', (req, res) => {
    res.json([]);
});

// ------------------------------
// CLOUDSTORAGE (Required for loading screen)
// ------------------------------
app.get('/fortnite/api/cloudstorage/system', (req, res) => {
    res.json([]);
});

app.get('/fortnite/api/cloudstorage/user/:id', (req, res) => {
    res.json([]);
});

// ------------------------------
// PROFILE SYSTEM (MCP)
// ------------------------------
app.post('/fortnite/api/game/v2/profile/:accountId/client/:command', (req, res) => {
    res.json({
        profileRevision: 1,
        profileId: "athena",
        profileChangesBaseRevision: 1,
        profileChanges: [],
        serverTime: new Date().toISOString(),
        responseVersion: 1
    });
});

// ------------------------------
// MATCHMAKING (Fake)
// ------------------------------
app.post('/fortnite/api/matchmaking/session/matchMakingRequest', (req, res) => {
    res.json({
        "matchId": "ReneFN-Match",
        "joinDelaySec": 1
    });
});

// ------------------------------
// START SERVER
// ------------------------------
app.listen(PORT, '0.0.0.0', () => {
    console.log(`ReneFN Backend running on port ${PORT}`);
});

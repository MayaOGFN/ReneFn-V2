const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Basic Auth Endpoint
app.post('/account/api/oauth/token', (req, res) => {
    res.json({
        access_token: "renefn_token",
        expires_in: 28800,
        token_type: "bearer",
        account_id: "rene_user_id"
    });
});

// Basic Profile Endpoint (The game needs this to load the lobby)
app.post('/fortnite/api/game/v2/profile/:accountId/client/:command', (req, res) => {
    res.json({
        profileRevision: 1,
        profileId: req.params.command.includes('athena') ? 'athena' : 'common_core',
        profileChanges: []
    });
});

app.listen(PORT, () => {
    console.log(`ReneFn Backend running on port ${PORT}`);
});

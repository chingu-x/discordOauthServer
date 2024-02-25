import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/auth/discord', (req, res) => {
  const redirectUri = encodeURIComponent('https://discordoauthserver-production.up.railway.app/auth/discord/callback');
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=1209870662475190303&redirect_uri=${redirectUri}&response_type=code&scope=identify`);
});

app.get('/auth/discord/callback', (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.redirect('https://www.chingu.io/'); // Redirect to home page if no code provided
  }
  const data = {
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'https://discordoauthserver-production.up.railway.app/auth/discord/callback',
    scope: 'identify'
  };

  // Create a URLSearchParams object
  const params = new URLSearchParams(data);

  // Exchange code for an access token
  axios.post('https://discord.com/api/oauth2/token', params.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => {
    const accessToken = response.data.access_token;

    // Get user's Discord information
    axios.get('https://discord.com/api/users/@me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(userResponse => {
      const user = userResponse.data;

      // Redirect to Google Form with pre-filled information
      const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSccsjBpqCPhvZFCInDvk8qkr1aic1zaDQTjCIGxYMEBGeUvrA/viewform?usp=pp_url&entry.538830894=${encodeURIComponent(user.username)}&entry.266729264=${encodeURIComponent(user.id)}`;
      res.redirect(formUrl);
    }).catch(error => {
      console.error(error);
      res.status(500).send('An error occurred while trying to fetch user information from Discord.');
    });
  }).catch(error => {
    console.error(error);
    res.status(500).send('An error occurred while trying to authenticate with Discord.');
  });
});

const serverPort = process.env.PORT || 3100
app.listen(serverPort, () => {
  console.log(`🚀 Server is listening on port: ${serverPort}`)
})


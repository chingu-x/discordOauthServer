# Discord OAuth with Express.js
This is a simple Express.js server that implements Discord OAuth2.0 for user authentication. It redirects users to Discord's OAuth page, handles the OAuth callback, fetches user information from Discord, and then redirects the user to a Google form with the Discord user information is pre-filled.
## Getting Started
1. Clone the repository
2. Intall the dependencies 
   * `npm install`
3. Create a .env in the root directory and add Discord client ID and client secret
   * `DISCORD_CLIENT_ID=your-discord-client-id`
   * `DISCORD_CLIENT_SECRET=your-discord-client-secret`
4. Start the server
   * `npm start`
   * The server will run at `http://localhost:3000`

## Built With
* Express.js
* axios
* dotenv
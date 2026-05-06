# 🚀 TESO HUB - Quick Start Guide

Get TESO HUB running in 5 minutes!

## Step 1: Clone & Run ⚡

```bash
# Clone the repository
git clone https://github.com/tweakscyber-afk/TESO-HUB.git
cd TESO-HUB

# Open in browser (no installation needed!)
# Option 1: Direct open
open index.html

# Option 2: Using Python
python -m http.server 8000
# Visit http://localhost:8000

# Option 3: Using Node.js
npx http-server
```

## Step 2: Activate Spotify Integration 🎵

### Get Your Spotify API Key (3 minutes)

1. Go to https://developer.spotify.com/dashboard
2. Sign in or create account (free)
3. Click **"Create an App"**
4. Accept terms and create
5. Copy your **Client ID**

### Add to TESO HUB

Open `index.html` in a text editor:

```javascript
// Find this line (around line 380):
const SPOTIFY_CONFIG = {
    clientId: 'YOUR_SPOTIFY_CLIENT_ID',
    // ...
};

// Replace with YOUR actual Client ID:
const SPOTIFY_CONFIG = {
    clientId: 'abc123def456ghi789jkl012mno345pqr',
    // ...
};
```

Save and refresh! 🎉

## Step 3: Customize Your Platform 🎨

### Change Colors

```javascript
// In the theme section:
const THEME = {
    primaryColor: '#00ffff',      // Change cyan to your color
    secondaryColor: '#ff00ff',    // Change magenta to your color
    accentColor: '#ff6b35'        // Change orange to your color
};
```

### Add More Artists

```javascript
const REAL_ARTISTS = [
    // Add your artists
    { 
        id: 'my_artist', 
        name: 'Artist Name', 
        genre: 'Your Genre',
        country: 'Country',
        city: 'City',
        image: 'https://link-to-spotify-image.jpg',
        spotifyUri: 'spotify:artist:...',
        plays: '50M'
    }
];
```

### Add More Music Hubs

```javascript
const MUSIC_HUBS = [
    // Add your locations
    {
        id: 'my_hub',
        name: 'City Name',
        country: 'Country',
        lat: 0.0,      // Latitude (get from Google Maps)
        lon: 0.0,      // Longitude
        genre: 'Genre',
        artists: ['Artist1', 'Artist2'],
        color: '#XXXXXX'  // Your color in hex
    }
];
```

## Step 4: Enable Advanced Features 🚀

### 1. Live Concert Finder

```javascript
import { ConcertFinder } from './features.js';

const concerts = new ConcertFinder('YOUR_TICKETMASTER_KEY');
const events = await concerts.findConcertsNearHub(lagoHub);
concerts.displayConcerts(events, 'concertContainer');
```

### 2. Collaborative Playlists

```javascript
import { CollaborativePlaylists } from './features.js';

const playlists = new CollaborativePlaylists();
const myPlaylist = playlists.createPlaylist('My Global Hits');
playlists.addArtistToPlaylist(myPlaylist.id, burnaboy);
const shareLink = playlists.sharePlaylist(myPlaylist.id);
```

### 3. Artist Analytics

```javascript
import { ArtistAnalytics } from './features.js';

const analytics = new ArtistAnalytics(REAL_ARTISTS);
analytics.generateReport('analyticsContainer');
```

### 4. Virtual Radio Stations

```javascript
import { VirtualRadioStation } from './features.js';

const afrobeatStation = new VirtualRadioStation(
    'Afrobeats', 
    REAL_ARTISTS.filter(a => a.genre === 'Afrobeats')
);
afrobeatStation.play();
afrobeatStation.displayPlayer('radioContainer');
```

### 5. AI Artist Discovery

```javascript
import { AIDiscovery } from './features.js';

const ai = new AIDiscovery(REAL_ARTISTS);
ai.trackUserPreference(burnaboy);
const recommendations = ai.getPersonalizedRecommendations(5);
```

### 6. Music Network Graph

```javascript
import { MusicNetworkGraph } from './features.js';

const network = new MusicNetworkGraph(REAL_ARTISTS);
const data = network.getNetworkData();
// Use with vis.js or D3.js for visualization
```

### 7. Multi-Language Support

```javascript
import { MultiLanguageSupport } from './features.js';

const i18n = new MultiLanguageSupport();
i18n.setLanguage('es'); // Switch to Spanish
const translated = i18n.translate('search'); // Get "Buscar"
```

## Step 5: Deploy Globally 🌍

### Deploy to GitHub Pages (Free)

```bash
# Push your changes
git add .
git commit -m "Deploy TESO HUB with Spotify"
git push origin main

# Enable GitHub Pages in repo settings
# Select "main" branch as source
# Your site: https://tweakscyber-afk.github.io/TESO-HUB
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Your site: https://teso-hub.vercel.app
```

### Deploy to Netlify

```bash
# Option 1: CLI
npm i -g netlify-cli
netlify deploy --prod

# Option 2: Drag and drop
# Visit https://app.netlify.com
# Drag your folder
```

## FAQ ❓

### Q: Do I need to code to use this?
**A:** No! Just add your Spotify Client ID and it works. Code is optional for advanced features.

### Q: Is my API key safe?
**A:** Client ID is public-safe. Never share your Client Secret. For production, use a backend server.

### Q: Can I use my own artists?
**A:** Yes! Edit `REAL_ARTISTS` array and add your data.

### Q: How do I add more music hubs?
**A:** Edit `MUSIC_HUBS` array and add city coordinates (get from Google Maps).

### Q: Can I host this on my own server?
**A:** Yes! It's static HTML. Works anywhere - GitHub Pages, Netlify, Vercel, Apache, Nginx.

### Q: How do I enable Ticketmaster concerts?
**A:** Get API key from https://developer.ticketmaster.com, then uncomment the ConcertFinder code.

### Q: Can I customize the 3D globe?
**A:** Yes! Edit the Three.js configuration in the `<script>` tag.

## Troubleshooting 🔧

### Spotify links not working?
```
✓ Check Client ID is correct
✓ Verify Spotify dashboard has your redirect URI
✓ Use HTTPS in production
✓ Check browser console for errors
```

### Map not showing?
```
✓ Ensure Leaflet.js loaded: console.log(window.L)
✓ Check internet connection
✓ Try a different browser
```

### 3D Globe not rendering?
```
✓ Check WebGL support: chrome://gpu
✓ Update graphics drivers
✓ Try Firefox or Chrome instead
```

### Search not finding artists?
```
✓ Check spelling (case-insensitive)
✓ Ensure artist is in REAL_ARTISTS array
✓ Refresh the page
```

## Next Steps 📚

1. ✅ **Running locally?** → Go to production
2. ✅ **Want more artists?** → Add to database
3. ✅ **Need concerts?** → Implement ConcertFinder
4. ✅ **Want sharing?** → Enable CollaborativePlaylists
5. ✅ **Need analytics?** → Activate ArtistAnalytics

## API Keys You Might Need

| Service | URL | Purpose |
|---------|-----|---------|
| **Spotify** | https://developer.spotify.com/dashboard | Play music |
| **Google Maps** | https://console.cloud.google.com | Find venues |
| **Ticketmaster** | https://developer.ticketmaster.com | Find concerts |
| **YouTube** | https://console.cloud.google.com | Embed videos |
| **Last.fm** | https://www.last.fm/api | Music stats |

## Support 🆘

- 📧 Email: tweakscyber@gmail.com
- 💬 GitHub Issues: Report bugs
- 🐦 Twitter: [@tweakscyber](https://twitter.com/tweakscyber)

## Success! 🎉

You now have a **fully functional global music discovery platform** with:

✅ Interactive 3D globe  
✅ Real artists & venues  
✅ Spotify integration  
✅ Live maps  
✅ Advanced features ready  
✅ Global deployment  

**Happy music exploring! 🎵**

---

*"MUSIC IN A CLICK - Connecting the world, one hub at a time."*

# 🎵 TESO HUB - Ultimate Interactive Music Discovery Platform

> **MUSIC IN A CLICK** - Explore global music hubs, discover real artists, and connect with the world's music ecosystem through an interactive 3D globe and live maps.

## 🌟 What is TESO HUB?

TESO HUB is a revolutionary music discovery platform that combines:

- 🌍 **Interactive 3D Globe** - Visualize 15+ major music hubs worldwide
- 🗺️ **Live OpenStreetMap Integration** - Real-time geographic data
- 🎤 **Real Artist Database** - Integrated with Spotify for authentic music discovery
- 🎙️ **Spotify Integration** - Direct links to play artists on Spotify Web Player
- 💫 **Glass-morphism UI** - Modern, futuristic aesthetic
- ⚡ **Real-time Stats** - Tracks trending artists, plays, and music movements

## 🎯 Features

### Core Features
✅ **15 Music Hubs Worldwide** - Lagos, Nairobi, Seoul, New York, Los Angeles, and more  
✅ **40+ Real Artists** - Including Burna Boy, Wizkid, BTS, Taylor Swift, Bad Bunny  
✅ **Interactive 3D Visualization** - Three.js powered globe with real coordinates  
✅ **Live Maps** - Leaflet.js for real OpenStreetMap integration  
✅ **Spotify Integration** - Search and play artists directly  
✅ **Genre Filtering** - Browse by Afrobeats, K-Pop, Hip-Hop, Reggaeton, and more  
✅ **Global Search** - Find artists, genres, and locations  

### Recommended Features (Ready to Implement)
🎬 **Live Concert Finder** - Discover upcoming concerts near you  
👥 **Collaborative Playlists** - Share music across global communities  
📊 **Artist Analytics Dashboard** - Real-time trending data  
📻 **Virtual Radio Stations** - 24/7 genre-based stations  
🤖 **Artist Discovery AI** - Smart recommendations based on listening habits  
🎥 **Behind-the-Scenes Content** - Exclusive artist interviews and studio sessions  
🕸️ **Music Network Graph** - Visualize artist connections globally  
🌐 **Multi-Language Support** - 50+ languages planned  

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/tweakscyber-afk/TESO-HUB.git
cd TESO-HUB

# No build needed - just open in browser!
open index.html
# or
python -m http.server 8000
# Then visit http://localhost:8000
```

### Spotify Integration Setup

1. **Create Spotify Developer App**
   - Go to https://developer.spotify.com/dashboard
   - Login or create an account
   - Click "Create an App"
   - Accept terms and create the app
   - Copy your **Client ID**

2. **Update Configuration**
   - Open `index.html`
   - Find the `SPOTIFY_CONFIG` object (around line 380)
   - Replace `'YOUR_SPOTIFY_CLIENT_ID'` with your actual Client ID

```javascript
const SPOTIFY_CONFIG = {
    clientId: 'YOUR_ACTUAL_CLIENT_ID_HERE',
    redirectUri: window.location.origin,
    scopes: ['streaming', 'user-read-private', 'user-read-email']
};
```

3. **Set Redirect URI in Spotify Dashboard**
   - In your app settings, add Redirect URI:
   - `http://localhost:8000` (for development)
   - Your deployed domain (for production)

4. **Enable HTTPS for Production**
   - Spotify API requires HTTPS in production
   - Deploy to Vercel, Netlify, or GitHub Pages

## 🗺️ Music Hubs Included

| Hub | Country | Genre | Artists |
|-----|---------|-------|---------|
| 🇹🇿 Dar es Salaam | Tanzania | Bongo Flava | Diamond Platnumz, Harmonize |
| 🇳🇬 Lagos | Nigeria | Afrobeats | Burna Boy, Wizkid, Davido |
| 🇰🇪 Nairobi | Kenya | Afro-Pop | Sauti Sol, Khaligraph Jones |
| 🇺🇬 Kampala | Uganda | Afrobeats | Eddy Kenzo, Sheebah |
| 🇬🇭 Accra | Ghana | Hiplife | Stonebwoy, Shatta Wale |
| 🇿🇦 Johannesburg | South Africa | Amapiano | Master KG, Kabza De Small |
| 🇺🇸 New York | USA | Hip-Hop | The Weeknd, A Boogie |
| 🇺🇸 Los Angeles | USA | Hip-Hop/Rap | Kendrick Lamar, Ice Cube |
| 🇬🇧 London | UK | Grime/Pop | The 1975, Stormzy |
| 🇫🇷 Paris | France | Electronic | Daft Punk, Justice |
| 🇯🇵 Tokyo | Japan | J-Pop | Perfume, Babymetal |
| 🇰🇷 Seoul | South Korea | K-Pop | BTS, BLACKPINK, Stray Kids |
| 🇵🇷 San Juan | Puerto Rico | Reggaeton | Bad Bunny, J Balvin |
| 🇩🇪 Berlin | Germany | Techno | Paul Kalkbrenner, Ricardo Villalobos |
| 🇦🇺 Melbourne | Australia | Indie | Tones and I, King Gizzard |

## 🎮 How to Use

### Explore the 3D Globe
- **Rotate**: Click and drag on the globe
- **Zoom**: Scroll wheel or pinch on trackpad
- **Auto-rotate**: Watch the globe spin (controlled by orbit controls)

### Click on Music Hubs
- Click any glowing marker on the 3D globe
- Camera flies to that location
- See all artists from that hub
- View artist details, plays, and genres

### Search for Artists
1. Type an artist name in the search bar
2. Press "Search" button
3. Results show all matching artists
4. Click Spotify icon to open artist on Spotify Web Player

### Filter by Genre
1. Select a genre from the dropdown
2. Browse all artists in that genre
3. Click artist to explore their hub location

### Find Music Venues
- Click "Find Music Venues on Google Maps" button
- Google Maps opens with local studios and music venues
- Discover where the best music is made!

## 📱 Technical Stack

- **3D Visualization**: Three.js (v0.128.0)
- **Interactive Maps**: Leaflet.js (v1.9.4)
- **Music API**: Spotify Web API
- **UI Framework**: Vanilla JavaScript + CSS3
- **Animations**: CSS3 + WebGL
- **Icons**: Font Awesome 6.0

## 🔧 Configuration Files

### Current Setup
```
TESO-HUB/
├── index.html          # Main application file
├── README.md           # This file
└── config.example.js   # Configuration template
```

### Add Your Config
Create a `config.js` file for local development:
```javascript
export const CONFIG = {
    spotify: {
        clientId: 'your_client_id',
        redirectUri: 'http://localhost:8000'
    },
    gmaps: {
        apiKey: 'your_google_maps_key'
    }
};
```

## 🌐 Deployment

### Deploy to GitHub Pages
```bash
# Push to main branch
git add .
git commit -m "Deploy TESO HUB"
git push origin main

# Enable GitHub Pages in repository settings
# Select "main" branch as source
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to deploy
```

### Deploy to Netlify
```bash
# Drag and drop the folder or
netlify deploy --prod
```

## 🎯 Next Steps & Roadmap

### Phase 1 (Current)
- ✅ Interactive 3D globe with real artists
- ✅ Live map integration
- ✅ Spotify Web Player links
- ✅ Search and filter functionality

### Phase 2 (Upcoming)
- 🔜 Full Spotify OAuth2 authentication
- 🔜 User authentication & profiles
- 🔜 Personalized recommendations
- 🔜 Playlist creation & sharing

### Phase 3 (Future)
- 🔜 Live concert finder integration (Ticketmaster API)
- 🔜 Artist analytics dashboard
- 🔜 Virtual radio stations
- 🔜 AI-powered discovery engine
- 🔜 Multi-language support (50+ languages)
- 🔜 Mobile app (React Native)

## 💡 Implementation Guide for Recommended Features

### 1. Live Concert Finder
```javascript
// Integrate Ticketmaster API
const TICKETMASTER_CONFIG = {
    apiKey: 'YOUR_TICKETMASTER_API_KEY'
};

async function findConcertsNearHub(hub) {
    const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?` +
        `city=${hub.name}&countryCode=${hub.country}&apikey=${TICKETMASTER_CONFIG.apiKey}`
    );
    return await response.json();
}
```

### 2. Collaborative Playlists
```javascript
// Store playlists in localStorage or backend
const playlists = {
    'global-hits': {
        name: 'Global Hits',
        artists: ['artist1', 'artist2'],
        shared: true,
        created: Date.now()
    }
};
```

### 3. Artist Analytics
```javascript
// Track real-time stats
const analytics = {
    topArtists: REAL_ARTISTS.sort((a, b) => 
        parseInt(b.plays) - parseInt(a.plays)
    ),
    topGenres: aggregateByGenre(),
    topHubs: aggregateByHub()
};
```

## 🔗 API Integration

### Spotify API Endpoints Used
```
GET /v1/search - Search for artists
GET /v1/artists/{id} - Get artist details
GET /v1/artists/{id}/top-tracks - Get top tracks
GET /v1/artists/{id}/related-artists - Get similar artists
```

### Google Maps Integration
```
https://www.google.com/maps/search/[LOCATION]+music+studios
```

### OpenStreetMap (Leaflet)
```
https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

## 🎨 Customization

### Change Colors
```css
/* In the <style> section, modify: */
--primary-color: #00ffff;    /* Cyan */
--secondary-color: #ff00ff;  /* Magenta */
--accent-color: #ff6b35;     /* Orange */
```

### Add More Artists
```javascript
const REAL_ARTISTS = [
    // Add to this array
    { 
        id: 'unique_id', 
        name: 'Artist Name', 
        genre: 'Genre',
        country: 'Country',
        city: 'City',
        image: 'spotify_image_url',
        spotifyUri: 'spotify:artist:...',
        plays: '100M'
    }
];
```

### Add More Music Hubs
```javascript
const MUSIC_HUBS = [
    // Add to this array
    {
        id: 'unique_id',
        name: 'City Name',
        country: 'Country',
        lat: 0.0,      // Latitude
        lon: 0.0,      // Longitude
        genre: 'Genre',
        artists: ['Artist1', 'Artist2'],
        color: '#XXXXXX'
    }
];
```

## 📊 Performance Optimization

- **Lazy loading** for artist images
- **WebGL rendering** for smooth 3D
- **Efficient particle system** with geometry batching
- **CSS animations** with GPU acceleration
- **Map tiles** cached by browser

## 🐛 Troubleshooting

### Map not showing?
```javascript
// Check if Leaflet CSS/JS loaded correctly
console.log(window.L); // Should not be undefined
```

### Spotify links not working?
- Ensure Client ID is correct
- Check Spotify dashboard for redirect URIs
- Use HTTPS in production

### 3D Globe not rendering?
- Check WebGL support: `chrome://gpu` in Chrome
- Update graphics drivers
- Try in a different browser

### Search not finding results?
- Ensure artist name spelling is correct
- Check REAL_ARTISTS database
- Search is case-insensitive

## 📝 License

MIT License - Feel free to use and modify for your projects!

## 🤝 Contributing

Have ideas to improve TESO HUB? Pull requests welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- 📧 Email: tweakscyber@gmail.com
- 🐦 Twitter: [@tweakscyber](https://twitter.com/tweakscyber)
- 💬 GitHub Issues: [Report issues here](https://github.com/tweakscyber-afk/TESO-HUB/issues)

## 🙏 Acknowledgments

- **Spotify** for artist data and Web Player integration
- **Three.js** for 3D visualization
- **Leaflet.js** for mapping
- **OpenStreetMap** for map tiles
- **Font Awesome** for icons
- All the incredible artists from music hubs worldwide!

---

### 🌟 Star this repository if you love music and technology!

**Made with ❤️ by tweakscyber-afk**

*"Music in a click - Connecting the world, one hub at a time."*

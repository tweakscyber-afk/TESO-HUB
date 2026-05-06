// TESO HUB Configuration File
// Copy this to config.js and fill in your actual API keys

export const CONFIG = {
    // ==========================================
    // SPOTIFY CONFIGURATION
    // ==========================================
    spotify: {
        clientId: 'YOUR_SPOTIFY_CLIENT_ID',
        clientSecret: 'YOUR_SPOTIFY_CLIENT_SECRET',
        redirectUri: 'http://localhost:8000',
        scopes: [
            'streaming',
            'user-read-private',
            'user-read-email',
            'user-library-read',
            'user-top-read',
            'playlist-read-private'
        ]
    },

    // ==========================================
    // GOOGLE MAPS CONFIGURATION
    // ==========================================
    googleMaps: {
        apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
        venues: true,
        directions: true
    },

    // ==========================================
    // TICKETMASTER API (for Concert Finder)
    // ==========================================
    ticketmaster: {
        apiKey: 'YOUR_TICKETMASTER_API_KEY'
    },

    // ==========================================
    // APPLICATION SETTINGS
    // ==========================================
    app: {
        name: 'TESO HUB',
        version: '2.0.0',
        environment: 'development', // or 'production'
        debug: true,
        enableAnalytics: true,
        enableOfflineMode: true
    },

    // ==========================================
    // THEME CONFIGURATION
    // ==========================================
    theme: {
        primaryColor: '#00ffff',      // Cyan
        secondaryColor: '#ff00ff',    // Magenta
        accentColor: '#ff6b35',       // Orange
        darkBg: '#000000',
        lightBg: '#0a0a2a',
        textColor: '#ffffff',
        glassOpacity: 0.75
    },

    // ==========================================
    // FEATURE FLAGS
    // ==========================================
    features: {
        liveMap: true,
        spotifyIntegration: true,
        concertFinder: false,
        collaborativePlaylists: false,
        artistAnalytics: false,
        virtualRadio: false,
        aiRecommendations: false,
        multiLanguage: false,
        darkMode: true,
        offlineMode: true
    },

    // ==========================================
    // SOCIAL MEDIA
    // ==========================================
    social: {
        twitter: 'tweakscyber',
        instagram: 'tweakscyber_afk',
        github: 'tweakscyber-afk',
        email: 'tweakscyber@gmail.com'
    },

    // ==========================================
    // ANALYTICS
    // ==========================================
    analytics: {
        googleAnalyticsId: 'YOUR_GA_ID',
        enabled: false
    },

    // ==========================================
    // CACHING
    // ==========================================
    cache: {
        artistDataExpiry: 3600000,    // 1 hour in ms
        mapDataExpiry: 86400000,      // 24 hours in ms
        searchHistoryMax: 50
    }
};

// Export individual configs for easier use
export const SPOTIFY = CONFIG.spotify;
export const GMAPS = CONFIG.googleMaps;
export const THEME = CONFIG.theme;
export const FEATURES = CONFIG.features;

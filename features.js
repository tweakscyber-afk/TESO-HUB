// ============================================
// TESO HUB - RECOMMENDED FEATURES
// Ready-to-use implementations for advanced features
// ============================================

// ============================================
// 1. LIVE CONCERT FINDER
// ============================================

export class ConcertFinder {
    constructor(ticketmasterApiKey) {
        this.apiKey = ticketmasterApiKey;
        this.baseUrl = 'https://app.ticketmaster.com/discovery/v2';
    }

    async findConcertsNearHub(hub) {
        try {
            const response = await fetch(
                `${this.baseUrl}/events.json?` +
                `city=${encodeURIComponent(hub.name)}&` +
                `countryCode=${this.getCountryCode(hub.country)}&` +
                `sort=date,asc&` +
                `apikey=${this.apiKey}`
            );
            const data = await response.json();
            return data._embedded?.events || [];
        } catch (error) {
            console.error('Concert search error:', error);
            return [];
        }
    }

    getCountryCode(countryName) {
        const codes = {
            'Tanzania': 'TZ',
            'Nigeria': 'NG',
            'Kenya': 'KE',
            'Uganda': 'UG',
            'Ghana': 'GH',
            'South Africa': 'ZA',
            'USA': 'US',
            'UK': 'GB',
            'France': 'FR',
            'Japan': 'JP',
            'South Korea': 'KR',
            'Puerto Rico': 'PR',
            'Germany': 'DE',
            'Australia': 'AU'
        };
        return codes[countryName] || 'US';
    }

    displayConcerts(concerts, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = '<h3>🎤 Upcoming Concerts</h3>';
        concerts.forEach(concert => {
            html += `
                <div class="concert-card" style="
                    background: rgba(0,255,255,0.1);
                    border-left: 3px solid #00ffff;
                    padding: 12px;
                    margin: 10px 0;
                    border-radius: 8px;
                ">
                    <h4>${concert.name}</h4>
                    <p><i class="fas fa-calendar"></i> ${new Date(concert.dates.start.localDate).toLocaleDateString()}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${concert._embedded.venues[0].name}</p>
                    <a href="${concert.url}" target="_blank" style="color:#00ffff;">Get Tickets →</a>
                </div>
            `;
        });
        container.innerHTML = html;
    }
}

// ============================================
// 2. COLLABORATIVE PLAYLISTS
// ============================================

export class CollaborativePlaylists {
    constructor() {
        this.playlists = this.loadPlaylists();
    }

    createPlaylist(name, description = '') {
        const playlist = {
            id: `playlist_${Date.now()}`,
            name,
            description,
            artists: [],
            created: Date.now(),
            shared: false,
            collaborators: []
        };
        this.playlists.push(playlist);
        this.savePlaylists();
        return playlist;
    }

    addArtistToPlaylist(playlistId, artist) {
        const playlist = this.playlists.find(p => p.id === playlistId);
        if (playlist && !playlist.artists.find(a => a.id === artist.id)) {
            playlist.artists.push(artist);
            this.savePlaylists();
        }
    }

    sharePlaylist(playlistId) {
        const playlist = this.playlists.find(p => p.id === playlistId);
        if (playlist) {
            playlist.shared = true;
            const shareUrl = `${window.location.origin}?playlist=${playlistId}`;
            this.savePlaylists();
            return shareUrl;
        }
    }

    exportAsSpotifyFormat(playlistId) {
        const playlist = this.playlists.find(p => p.id === playlistId);
        if (!playlist) return null;

        return {
            collaborative: true,
            description: playlist.description,
            external_urls: {
                spotify: ''
            },
            followers: { total: 0 },
            href: '',
            id: playlist.id,
            images: [],
            name: playlist.name,
            owner: { display_name: 'TESO HUB' },
            public: playlist.shared,
            snapshot_id: '',
            tracks: {
                href: '',
                items: playlist.artists.map(artist => ({
                    added_at: new Date().toISOString(),
                    track: {
                        name: artist.name,
                        artists: [{ name: artist.name }],
                        external_urls: { spotify: '' }
                    }
                })),
                limit: 100,
                next: null,
                offset: 0,
                previous: null,
                total: playlist.artists.length
            },
            type: 'playlist',
            uri: `spotify:playlist:${playlist.id}`
        };
    }

    savePlaylists() {
        localStorage.setItem('tesoPlaylists', JSON.stringify(this.playlists));
    }

    loadPlaylists() {
        const data = localStorage.getItem('tesoPlaylists');
        return data ? JSON.parse(data) : [];
    }

    getPlaylist(playlistId) {
        return this.playlists.find(p => p.id === playlistId);
    }

    getAllPlaylists() {
        return this.playlists;
    }
}

// ============================================
// 3. ARTIST ANALYTICS DASHBOARD
// ============================================

export class ArtistAnalytics {
    constructor(artistsData) {
        this.artists = artistsData;
        this.updateStats();
    }

    updateStats() {
        this.topArtists = this.getTopArtists(10);
        this.topGenres = this.getGenreStats();
        this.topCountries = this.getCountryStats();
        this.genreDistribution = this.getGenreDistribution();
    }

    getTopArtists(limit = 10) {
        return this.artists
            .sort((a, b) => parseInt(b.plays) - parseInt(a.plays))
            .slice(0, limit);
    }

    getGenreStats() {
        const genres = {};
        this.artists.forEach(artist => {
            if (!genres[artist.genre]) {
                genres[artist.genre] = { count: 0, plays: 0, artists: [] };
            }
            genres[artist.genre].count++;
            genres[artist.genre].plays += parseInt(artist.plays);
            genres[artist.genre].artists.push(artist.name);
        });
        return genres;
    }

    getCountryStats() {
        const countries = {};
        this.artists.forEach(artist => {
            if (!countries[artist.country]) {
                countries[artist.country] = { count: 0, plays: 0, cities: new Set() };
            }
            countries[artist.country].count++;
            countries[artist.country].plays += parseInt(artist.plays);
            countries[artist.country].cities.add(artist.city);
        });
        return countries;
    }

    getGenreDistribution() {
        const stats = this.getGenreStats();
        return Object.entries(stats).map(([genre, data]) => ({
            genre,
            percentage: ((data.count / this.artists.length) * 100).toFixed(1),
            count: data.count,
            totalPlays: data.plays
        }));
    }

    generateReport(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = `
            <div style="color: white;">
                <h2>📊 Artist Analytics Dashboard</h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                    <div class="stat-box" style="background: rgba(0,255,255,0.1); padding: 15px; border-radius: 10px; border-left: 3px solid #00ffff;">
                        <h3>Top Genres</h3>
                        ${Object.entries(this.getGenreStats())
                            .sort((a, b) => b[1].count - a[1].count)
                            .slice(0, 5)
                            .map(([genre, data]) => `<p>🎵 ${genre}: <strong>${data.count}</strong> artists (${data.plays}M plays)</p>`)
                            .join('')}
                    </div>
                    
                    <div class="stat-box" style="background: rgba(255,0,255,0.1); padding: 15px; border-radius: 10px; border-left: 3px solid #ff00ff;">
                        <h3>Top Countries</h3>
                        ${Object.entries(this.getCountryStats())
                            .sort((a, b) => b[1].count - a[1].count)
                            .slice(0, 5)
                            .map(([country, data]) => `<p>🌍 ${country}: <strong>${data.count}</strong> artists</p>`)
                            .join('')}
                    </div>
                </div>
                
                <h3>🔝 Top 10 Artists</h3>
                <ol style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px;">
                    ${this.getTopArtists().map(artist => `
                        <li>
                            <strong>${artist.name}</strong> - ${artist.genre} 
                            <span style="color: #1DB954;">(${artist.plays} plays)</span>
                        </li>
                    `).join('')}
                </ol>
            </div>
        `;
        container.innerHTML = html;
    }
}

// ============================================
// 4. VIRTUAL RADIO STATIONS
// ============================================

export class VirtualRadioStation {
    constructor(genre, artists) {
        this.genre = genre;
        this.artists = artists;
        this.playlist = this.generatePlaylist();
        this.currentTrackIndex = 0;
        this.isPlaying = false;
    }

    generatePlaylist() {
        // Generate a 24-hour playlist (144 tracks, 10 minutes each)
        const playlist = [];
        for (let i = 0; i < 144; i++) {
            const artist = this.artists[Math.floor(Math.random() * this.artists.length)];
            playlist.push({
                id: `track_${i}`,
                artist: artist.name,
                genre: this.genre,
                duration: 600000, // 10 minutes
                timestamp: Date.now() + (i * 600000)
            });
        }
        return playlist;
    }

    play() {
        this.isPlaying = true;
        console.log(`🎙️ Now playing: ${this.genre} station`);
    }

    pause() {
        this.isPlaying = false;
    }

    nextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        return this.getCurrentTrack();
    }

    previousTrack() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        return this.getCurrentTrack();
    }

    getCurrentTrack() {
        return this.playlist[this.currentTrackIndex];
    }

    displayPlayer(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const track = this.getCurrentTrack();
        container.innerHTML = `
            <div class="radio-player" style="
                background: linear-gradient(135deg, rgba(0,255,255,0.2), rgba(255,0,255,0.2));
                padding: 20px;
                border-radius: 15px;
                text-align: center;
            ">
                <h2>📻 ${this.genre} Station</h2>
                <p style="font-size: 18px; margin: 15px 0;">Now Playing: <strong>${track.artist}</strong></p>
                <div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
                    <button onclick="this.parentElement.parentElement.previousTrack();" style="
                        background: #00ffff; color: black; border: none; padding: 10px 15px; 
                        border-radius: 5px; cursor: pointer; font-weight: bold;">⏮️ Previous
                    </button>
                    <button onclick="this.parentElement.parentElement.play();" style="
                        background: #ff00ff; color: white; border: none; padding: 10px 15px; 
                        border-radius: 5px; cursor: pointer; font-weight: bold;">▶️ Play
                    </button>
                    <button onclick="this.parentElement.parentElement.pause();" style="
                        background: #ff6b35; color: white; border: none; padding: 10px 15px; 
                        border-radius: 5px; cursor: pointer; font-weight: bold;">⏸️ Pause
                    </button>
                    <button onclick="this.parentElement.parentElement.nextTrack();" style="
                        background: #00ffff; color: black; border: none; padding: 10px 15px; 
                        border-radius: 5px; cursor: pointer; font-weight: bold;">⏭️ Next
                    </button>
                </div>
            </div>
        `;
    }
}

// ============================================
// 5. AI-POWERED ARTIST DISCOVERY
// ============================================

export class AIDiscovery {
    constructor(artists) {
        this.artists = artists;
        this.userHistory = [];
        this.loadUserHistory();
    }

    recommendArtists(likedArtist, limit = 5) {
        const recommendations = [];
        const genres = new Set();
        
        // Find artists with similar genres
        this.artists.forEach(artist => {
            if (artist.genre === likedArtist.genre && artist.id !== likedArtist.id) {
                recommendations.push({
                    artist,
                    score: this.calculateSimilarityScore(likedArtist, artist),
                    reason: `Similar ${artist.genre} artist`
                });
            }
        });

        // Find artists from same country
        this.artists.forEach(artist => {
            if (artist.country === likedArtist.country && artist.id !== likedArtist.id) {
                recommendations.push({
                    artist,
                    score: this.calculateSimilarityScore(likedArtist, artist) * 0.8,
                    reason: `From ${artist.country}`
                });
            }
        });

        // Sort by score and return top recommendations
        return recommendations
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(rec => rec);
    }

    calculateSimilarityScore(artist1, artist2) {
        let score = 0;
        if (artist1.genre === artist2.genre) score += 0.5;
        if (artist1.country === artist2.country) score += 0.3;
        if (artist1.city === artist2.city) score += 0.2;
        return score;
    }

    trackUserPreference(artist) {
        this.userHistory.push({
            artist: artist.id,
            timestamp: Date.now()
        });
        this.saveUserHistory();
    }

    getPersonalizedRecommendations(limit = 10) {
        if (this.userHistory.length === 0) {
            return this.artists.sort((a, b) => parseInt(b.plays) - parseInt(a.plays)).slice(0, limit);
        }

        const recommendations = new Map();
        this.userHistory.slice(-5).forEach(history => {
            const likedArtist = this.artists.find(a => a.id === history.artist);
            if (likedArtist) {
                this.recommendArtists(likedArtist, 3).forEach(rec => {
                    if (!recommendations.has(rec.artist.id)) {
                        recommendations.set(rec.artist.id, rec);
                    }
                });
            }
        });

        return Array.from(recommendations.values())
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(rec => rec.artist);
    }

    saveUserHistory() {
        localStorage.setItem('tesoUserHistory', JSON.stringify(this.userHistory));
    }

    loadUserHistory() {
        const data = localStorage.getItem('tesoUserHistory');
        this.userHistory = data ? JSON.parse(data) : [];
    }
}

// ============================================
// 6. MUSIC NETWORK GRAPH
// ============================================

export class MusicNetworkGraph {
    constructor(artists) {
        this.artists = artists;
        this.nodes = this.createNodes();
        this.edges = this.createEdges();
    }

    createNodes() {
        return this.artists.map(artist => ({
            id: artist.id,
            label: artist.name,
            genre: artist.genre,
            country: artist.country,
            plays: parseInt(artist.plays),
            image: artist.image
        }));
    }

    createEdges() {
        const edges = [];
        const genreMap = {};

        // Group artists by genre
        this.artists.forEach(artist => {
            if (!genreMap[artist.genre]) genreMap[artist.genre] = [];
            genreMap[artist.genre].push(artist);
        });

        // Create connections within genres
        Object.values(genreMap).forEach(genreArtists => {
            for (let i = 0; i < genreArtists.length; i++) {
                for (let j = i + 1; j < Math.min(i + 3, genreArtists.length); j++) {
                    edges.push({
                        from: genreArtists[i].id,
                        to: genreArtists[j].id,
                        weight: 1,
                        label: `Similar Genre: ${genreArtists[i].genre}`
                    });
                }
            }
        });

        return edges;
    }

    getNetworkData() {
        return {
            nodes: this.nodes,
            edges: this.edges
        };
    }

    getArtistConnections(artistId) {
        return {
            direct: this.edges.filter(e => e.from === artistId || e.to === artistId),
            artist: this.nodes.find(n => n.id === artistId)
        };
    }

    generateJSON() {
        return JSON.stringify({
            nodes: this.nodes,
            edges: this.edges,
            generated: new Date().toISOString()
        }, null, 2);
    }
}

// ============================================
// 7. MULTI-LANGUAGE SUPPORT
// ============================================

export class MultiLanguageSupport {
    constructor() {
        this.currentLanguage = localStorage.getItem('tesoLanguage') || 'en';
        this.languages = {
            'en': { name: 'English', nativeName: 'English' },
            'es': { name: 'Spanish', nativeName: 'Español' },
            'fr': { name: 'French', nativeName: 'Français' },
            'de': { name: 'German', nativeName: 'Deutsch' },
            'pt': { name: 'Portuguese', nativeName: 'Português' },
            'it': { name: 'Italian', nativeName: 'Italiano' },
            'ja': { name: 'Japanese', nativeName: '日本語' },
            'ko': { name: 'Korean', nativeName: '한국어' },
            'zh': { name: 'Chinese', nativeName: '中文' },
            'ar': { name: 'Arabic', nativeName: 'العربية' },
            'ru': { name: 'Russian', nativeName: 'Русский' },
            'hi': { name: 'Hindi', nativeName: 'हिन्दी' },
        };
        this.translations = this.loadTranslations();
    }

    loadTranslations() {
        const translations = {
            en: {
                'search': 'Search',
                'filter': 'Filter by Genre',
                'artists': 'Artists',
                'hubs': 'Music Hubs',
                'concerts': 'Concerts',
                'playlists': 'Playlists'
            },
            es: {
                'search': 'Buscar',
                'filter': 'Filtrar por Género',
                'artists': 'Artistas',
                'hubs': 'Centros de Música',
                'concerts': 'Conciertos',
                'playlists': 'Listas de reproducción'
            },
            fr: {
                'search': 'Rechercher',
                'filter': 'Filtrer par Genre',
                'artists': 'Artistes',
                'hubs': 'Centres de Musique',
                'concerts': 'Concerts',
                'playlists': 'Listes de lecture'
            },
            de: {
                'search': 'Suchen',
                'filter': 'Nach Genre filtern',
                'artists': 'Künstler',
                'hubs': 'Musikzentren',
                'concerts': 'Konzerte',
                'playlists': 'Wiedergabelisten'
            },
            pt: {
                'search': 'Pesquisar',
                'filter': 'Filtrar por Gênero',
                'artists': 'Artistas',
                'hubs': 'Centros de Música',
                'concerts': 'Concertos',
                'playlists': 'Listas de reprodução'
            },
            ja: {
                'search': '検索',
                'filter': 'ジャンルでフィルター',
                'artists': 'アーティスト',
                'hubs': '音楽ハブ',
                'concerts': 'コンサート',
                'playlists': 'プレイリスト'
            },
            ko: {
                'search': '검색',
                'filter': '장르별 필터',
                'artists': '아티스트',
                'hubs': '음악 허브',
                'concerts': '콘서트',
                'playlists': '플레이리스트'
            }
        };
        return translations;
    }

    setLanguage(languageCode) {
        this.currentLanguage = languageCode;
        localStorage.setItem('tesoLanguage', languageCode);
        this.updateUI();
    }

    translate(key) {
        return this.translations[this.currentLanguage]?.[key] || 
               this.translations['en']?.[key] || 
               key;
    }

    getAvailableLanguages() {
        return Object.entries(this.languages).map(([code, info]) => ({
            code,
            ...info
        }));
    }

    updateUI() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.translate(key);
        });
    }
}

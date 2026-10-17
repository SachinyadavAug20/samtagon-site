/**
 * Samtagon Game Recommendation Engine — Interactive Client Script
 *
 * Implements:
 * 1. Semantic Natural Language Search via 128-dimensional Cosine Similarity
 * 2. Feature 2: Similar Games for Selected Game (Rabbit Hole exploration)
 * 3. Interactive Vector Math Inspector with live Dot Product and Norm calculations
 * 4. System Mode Theme Detection & Procedural Web Audio feedback
 */
import { ProceduralAudio } from './audio-synth.js';
import { GAMES_CATALOG } from './games-data.js';
import { VectorEngine } from './vector-engine.js';
class RecommendationsApp {
    audio;
    catalog = GAMES_CATALOG;
    selectedGame = null;
    rabbitHoleHistory = [];
    currentMatches = [];
    // DOM Elements
    searchInput;
    clearSearchBtn;
    searchResultsContainer;
    resultCountSpan;
    rabbitHoleSection;
    rabbitHoleFocusCard;
    rabbitHoleSimilarGrid;
    breadcrumbsContainer;
    mathInspector;
    constructor() {
        this.audio = new ProceduralAudio();
        this.initDOM();
        this.setupTheme();
        this.setupEventListeners();
        this.setupPresetChips();
        // Default: Start with Detroit: Become Human in the Rabbit Hole view
        const flagship = this.catalog.find((g) => g.id === 'detroit-become-human') || this.catalog[0];
        this.selectGameForRabbitHole(flagship, false);
        // Initial search showcase
        this.performSearch('');
    }
    initDOM() {
        this.searchInput = document.getElementById('search-input');
        this.clearSearchBtn = document.getElementById('clear-search-btn');
        this.searchResultsContainer = document.getElementById('search-results-grid');
        this.resultCountSpan = document.getElementById('result-count');
        this.rabbitHoleSection = document.getElementById('rabbit-hole-section');
        this.rabbitHoleFocusCard = document.getElementById('rabbit-hole-focus');
        this.rabbitHoleSimilarGrid = document.getElementById('rabbit-hole-similar-grid');
        this.breadcrumbsContainer = document.getElementById('rabbit-hole-breadcrumbs');
        this.mathInspector = document.getElementById('vector-math-inspector');
    }
    setupTheme() {
        // Default to system mode preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        let isDarkMode = prefersDark;
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.removeAttribute('data-theme');
        }
        // Listen to OS system color scheme changes
        window.matchMedia?.('(prefers-color-scheme: dark)')?.addEventListener('change', (e) => {
            isDarkMode = e.matches;
            if (isDarkMode) {
                document.documentElement.setAttribute('data-theme', 'dark');
                this.audio.playChime(523.25, 0.08);
            }
            else {
                document.documentElement.removeAttribute('data-theme');
                this.audio.playMorningBirdSong();
            }
        });
        const themeBtn = document.getElementById('theme-toggle-btn');
        themeBtn?.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            if (isDarkMode) {
                document.documentElement.setAttribute('data-theme', 'dark');
                this.audio.playChime(523.25, 0.08);
            }
            else {
                document.documentElement.removeAttribute('data-theme');
                this.audio.playMorningBirdSong();
            }
        });
        // Audio mute toggle
        const audioBtn = document.getElementById('audio-toggle-btn');
        const audioOnIcon = audioBtn?.querySelector('.audio-on-icon');
        const audioOffIcon = audioBtn?.querySelector('.audio-off-icon');
        const updateAudioUI = (unmuted) => {
            if (audioOnIcon && audioOffIcon) {
                audioOnIcon.style.display = unmuted ? 'block' : 'none';
                audioOffIcon.style.display = unmuted ? 'none' : 'block';
            }
        };
        audioBtn?.addEventListener('click', () => {
            const unmuted = this.audio.toggleMute();
            updateAudioUI(unmuted);
        });
        window.addEventListener('keydown', (e) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
                return;
            if (e.code === 'KeyM') {
                const unmuted = this.audio.toggleMute();
                updateAudioUI(unmuted);
            }
        });
    }
    setupEventListeners() {
        let debounceTimer = null;
        this.searchInput?.addEventListener('input', (e) => {
            const target = e.target;
            const val = target.value;
            if (this.clearSearchBtn) {
                this.clearSearchBtn.style.display = val.length > 0 ? 'inline-flex' : 'none';
            }
            if (debounceTimer)
                clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.performSearch(val);
            }, 80);
        });
        this.clearSearchBtn?.addEventListener('click', () => {
            this.searchInput.value = '';
            this.clearSearchBtn.style.display = 'none';
            this.performSearch('');
            this.searchInput.focus();
        });
    }
    setupPresetChips() {
        const chips = document.querySelectorAll('.prompt-chip');
        chips.forEach((chip) => {
            chip.addEventListener('click', () => {
                const query = chip.dataset.query || chip.textContent || '';
                this.searchInput.value = query;
                if (this.clearSearchBtn)
                    this.clearSearchBtn.style.display = 'inline-flex';
                this.audio.playChime(659.25, 0.05);
                this.performSearch(query);
                // Smooth scroll to search results
                document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
    /**
     * Execute Natural Language & Fuzzy Search
     */
    performSearch(query) {
        const matches = VectorEngine.searchCatalog(query, this.catalog, 12);
        this.currentMatches = matches;
        this.renderSearchResults(matches, query);
    }
    renderSearchResults(matches, query) {
        if (!this.searchResultsContainer)
            return;
        if (this.resultCountSpan) {
            this.resultCountSpan.textContent = `${matches.length} matching titles`;
        }
        if (matches.length === 0) {
            this.searchResultsContainer.innerHTML = `
        <div class="empty-state">
          <p>No games matched your query.</p>
          <button class="btn btn-secondary btn-sm" id="reset-search-btn">Reset Search</button>
        </div>
      `;
            document.getElementById('reset-search-btn')?.addEventListener('click', () => {
                this.searchInput.value = '';
                this.performSearch('');
            });
            return;
        }
        this.searchResultsContainer.innerHTML = '';
        matches.forEach((match, idx) => {
            const card = this.createGameCard(match.game, match.similarity, idx < 3, idx + 1);
            this.searchResultsContainer.appendChild(card);
        });
    }
    /**
     * Create an interactive game card with Cosine Similarity meter and store links
     */
    createGameCard(game, similarity, isTopThree = false, rank = 0) {
        const card = document.createElement('article');
        card.className = `game-card ${isTopThree ? 'card-hero' : ''} ${game.isSamtagonOriginal ? 'card-original' : ''}`;
        const percentMatch = Math.round(similarity * 100);
        const scoreColorClass = similarity >= 0.85 ? 'score-excellent' : similarity >= 0.70 ? 'score-good' : 'score-fair';
        const platformBadgesHtml = game.platforms
            .map((p) => {
            const iconSvg = p.badge === 'steam'
                ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 14.819C1.865 20.082 6.474 24 12 24c6.627 0 12-5.373 12-12S18.627 0 11.979 0z"/></svg>`
                : p.badge === 'itch'
                    ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3.193 1.58C1.848 1.93.003 3.488 0 4.634v1.895c0 1.545 1.487 2.872 2.747 2.872 1.517 0 2.747-1.144 2.747-2.585 0 1.44 1.23 2.585 2.747 2.585 1.516 0 2.746-1.144 2.746-2.585 0 1.44 1.23 2.585 2.747 2.585 1.516 0 2.747-1.144 2.747-2.585 0 1.44 1.23 2.585 2.747 2.585 1.516 0 2.747-1.144 2.747-2.585 0 1.44 1.23 2.585 2.747 2.585 1.26 0 2.747-1.327 2.747-2.872V4.634c-.003-1.146-1.848-2.705-3.193-3.054C19.123 1.157 14.935 1 12 1s-7.123.157-8.807.58zM12 9.547c-1.365 0-2.593.707-3.35 1.764-.757-1.057-1.985-1.764-3.35-1.764-2.228 0-4.04 1.83-4.04 4.084V21.5c0 .825.67 1.5 1.5 1.5h18.38c.83 0 1.5-.675 1.5-1.5v-7.869c0-2.254-1.812-4.084-4.04-4.084-1.365 0-2.593.707-3.35 1.764-.757-1.057-1.985-1.764-3.35-1.764z"/></svg>`
                    : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`;
            return `
          <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="platform-badge badge-${p.badge}" title="View on ${p.name}">
            ${iconSvg}
            <span>${p.name}</span>
            <span class="ext-arrow">&nearr;</span>
          </a>
        `;
        })
            .join('');
        const genresHtml = game.genres
            .map((g) => `<span class="genre-pill">${g}</span>`)
            .join('');
        card.innerHTML = `
      <div class="card-cover-wrap">
        <img src="${game.image}" alt="${game.title}" class="card-cover-img" loading="lazy" onerror="this.style.opacity='0.15'" />
        <div class="card-cover-overlay"></div>
        <div class="card-cover-pills">
          <span class="card-sim-badge ${scoreColorClass}">
            ${percentMatch}% Match
          </span>
          ${game.isSamtagonOriginal ? `<span class="badge-samtagon-float">Samtagon Original</span>` : ''}
        </div>
      </div>

      <div class="card-body">
        <div class="card-header-line">
          <h3 class="card-title">${game.title}</h3>
          <span class="release-year">${game.releaseYear}</span>
        </div>
        <div class="card-developer-line">${game.developer}</div>

        <p class="card-desc">${game.description}</p>

        <div class="genres-row">
          ${genresHtml}
        </div>

        <div class="card-actions">
          <div class="platforms-group">
            ${platformBadgesHtml}
          </div>
          <button class="btn btn-secondary btn-sm rabbit-hole-btn" title="Explore Similar Games down the Rabbit Hole">
            <span>Similar</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    `;
        // Clicking "Similar Games" opens the Rabbit Hole view
        const rabbitBtn = card.querySelector('.rabbit-hole-btn');
        rabbitBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.audio.playChime(783.99, 0.08); // G5 chime
            this.selectGameForRabbitHole(game, true);
        });
        // Clicking the card itself previews vector math
        card.addEventListener('click', () => {
            this.audio.playChime(587.33, 0.04);
            this.showVectorMathInspector(game);
        });
        return card;
    }
    /**
     * Feature 2: Select a game to inspect similar games (The Rabbit Hole)
     */
    selectGameForRabbitHole(game, smoothScroll = true) {
        this.selectedGame = game;
        // Manage breadcrumb history
        const existingIdx = this.rabbitHoleHistory.findIndex((g) => g.id === game.id);
        if (existingIdx !== -1) {
            this.rabbitHoleHistory = this.rabbitHoleHistory.slice(0, existingIdx + 1);
        }
        else {
            this.rabbitHoleHistory.push(game);
            // Keep last 6 breadcrumbs
            if (this.rabbitHoleHistory.length > 6) {
                this.rabbitHoleHistory.shift();
            }
        }
        this.renderBreadcrumbs();
        this.renderRabbitHoleFocus(game);
        // Compute Feature 2: Find Top 3 Similar Games
        const similarMatches = VectorEngine.findSimilarGames(game, this.catalog, 3);
        this.renderRabbitHoleSimilar(similarMatches);
        // Update Live Vector Math Inspector
        this.showVectorMathInspector(game, similarMatches[0]?.game);
        if (smoothScroll && this.rabbitHoleSection) {
            this.rabbitHoleSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    renderBreadcrumbs() {
        if (!this.breadcrumbsContainer)
            return;
        this.breadcrumbsContainer.innerHTML = '';
        const trail = document.createElement('div');
        trail.className = 'breadcrumbs-trail';
        this.rabbitHoleHistory.forEach((g, idx) => {
            const isCurrent = idx === this.rabbitHoleHistory.length - 1;
            const chip = document.createElement('button');
            chip.className = `breadcrumb-chip ${isCurrent ? 'active' : ''}`;
            chip.textContent = g.title;
            chip.addEventListener('click', () => {
                if (!isCurrent) {
                    this.audio.playChime(659.25, 0.06);
                    this.selectGameForRabbitHole(g, false);
                }
            });
            trail.appendChild(chip);
            if (idx < this.rabbitHoleHistory.length - 1) {
                const sep = document.createElement('span');
                sep.className = 'breadcrumb-arrow';
                sep.innerHTML = '&rarr;';
                trail.appendChild(sep);
            }
        });
        this.breadcrumbsContainer.appendChild(trail);
    }
    renderRabbitHoleFocus(game) {
        if (!this.rabbitHoleFocusCard)
            return;
        const platformBadgesHtml = game.platforms
            .map((p) => `
        <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="platform-badge badge-${p.badge}">
          <span>${p.name}</span>
          <span class="ext-arrow">&nearr;</span>
        </a>
      `)
            .join('');
        this.rabbitHoleFocusCard.innerHTML = `
      <div class="focus-layout">
        <div class="focus-media">
          <img src="${game.image}" alt="${game.title}" class="focus-img" onerror="this.style.opacity='0.2'" />
        </div>
        <div class="focus-details">
          <div class="focus-badge-row">
            <span class="badge-focus">CURRENT SELECTION</span>
            ${game.isSamtagonOriginal ? `<span class="badge-samtagon">Samtagon Original</span>` : ''}
            <span class="focus-developer">${game.developer} &bull; ${game.releaseYear}</span>
          </div>
          <h2 class="focus-title">${game.title}</h2>
          <p class="focus-subtitle">${game.subtitle}</p>
          <p class="focus-desc">${game.description}</p>
          <div class="focus-genres">
            ${game.genres.map((g) => `<span class="genre-pill">${g}</span>`).join('')}
          </div>
          <div class="focus-platforms">
            ${platformBadgesHtml}
          </div>
        </div>
      </div>
    `;
    }
    renderRabbitHoleSimilar(matches) {
        if (!this.rabbitHoleSimilarGrid)
            return;
        this.rabbitHoleSimilarGrid.innerHTML = '';
        matches.forEach((match, idx) => {
            const card = this.createGameCard(match.game, match.similarity, true, idx + 1);
            this.rabbitHoleSimilarGrid.appendChild(card);
        });
    }
    /**
     * Interactive Vector Math Inspector showing live cosine similarity calculations
     */
    showVectorMathInspector(gameA, gameB) {
        if (!this.mathInspector)
            return;
        const compareGame = gameB || (this.catalog.find((g) => g.id !== gameA.id) || gameA);
        const sim = VectorEngine.cosineSimilarity(gameA.embedding, compareGame.embedding);
        const dot = VectorEngine.dotProduct(gameA.embedding, compareGame.embedding);
        const normA = VectorEngine.vectorNorm(gameA.embedding);
        const normB = VectorEngine.vectorNorm(compareGame.embedding);
        const angleDeg = (Math.acos(Math.max(-1, Math.min(1, sim))) * 180) / Math.PI;
        this.mathInspector.innerHTML = `
      <div class="math-inspector-panel">
        <div class="math-header">
          <div class="math-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
            <span>LIVE VECTOR EMBEDDING &amp; COSINE SIMILARITY INSPECTOR</span>
          </div>
          <span class="math-dimensions">Dimensions: 128-D Float Vector</span>
        </div>

        <div class="math-formula-box">
          <code>Similarity(A, B) = (A &bull; B) / (||A|| &times; ||B||)</code>
        </div>

        <div class="math-metrics-grid">
          <div class="metric-card">
            <span class="metric-label">Game A (Vector A)</span>
            <span class="metric-val">${gameA.title}</span>
            <span class="metric-sub">Norm: ${normA.toFixed(4)}</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Game B (Vector B)</span>
            <span class="metric-val">${compareGame.title}</span>
            <span class="metric-sub">Norm: ${normB.toFixed(4)}</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Dot Product (A &bull; B)</span>
            <span class="metric-val metric-highlight">${dot.toFixed(4)}</span>
            <span class="metric-sub">Dot sum of 128 elements</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Cosine Similarity</span>
            <span class="metric-val metric-emerald">${sim.toFixed(4)} (${Math.round(sim * 100)}%)</span>
            <span class="metric-sub">Angular Distance: ${angleDeg.toFixed(1)}&deg;</span>
          </div>
        </div>
      </div>
    `;
    }
}
// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new RecommendationsApp();
});
//# sourceMappingURL=recommendations-page.js.map
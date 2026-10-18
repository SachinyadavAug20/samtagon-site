/**
 * Samtagon Game Recommendation Engine — Interactive Client Script
 *
 * Implements:
 * 1. 1,000-page high-performance procedural catalog exploration
 * 2. Semantic Natural Language & Fuzzy Search with real differentiated match percentages
 * 3. Game Detail Modal overlay with video trailer embeds, developer studio links, and Steam links
 * 4. Interactive pagination bar with direct page jump
 * 5. Procedural Web Audio tactile soundscapes and System Theme detection
 */

import { ProceduralAudio } from './audio-synth.js';
import { CatalogEngine, ExtendedGameItem } from './catalog-engine.js';
import { GameMatch } from './vector-engine.js';
import gsap from 'gsap';

class RecommendationsApp {
  private audio: ProceduralAudio;
  private currentPage: number = 1;
  private totalPages: number = 1000;
  private totalCount: number = 12000;
  private currentQuery: string = '';
  private currentMatches: GameMatch[] = [];

  // DOM Elements
  private searchInput!: HTMLInputElement;
  private clearSearchBtn!: HTMLElement | null;
  private searchResultsContainer!: HTMLElement;
  private resultCountSpan!: HTMLElement;
  private catalogHeading!: HTMLElement | null;
  private paginationControls!: HTMLElement;
  private pageJumpInput!: HTMLInputElement;
  private pageJumpBtn!: HTMLElement | null;

  // Modal Elements
  private modalBackdrop!: HTMLElement;
  private modalContent!: HTMLElement;
  private modalCloseBtn!: HTMLElement | null;

  constructor() {
    this.audio = new ProceduralAudio();
    this.initDOM();
    this.setupTheme();
    this.setupEventListeners();
    this.loadCatalog();
  }

  private initDOM(): void {
    this.searchInput = document.getElementById('search-input') as HTMLInputElement;
    this.clearSearchBtn = document.getElementById('clear-search-btn');
    this.searchResultsContainer = document.getElementById('search-results-grid') as HTMLElement;
    this.resultCountSpan = document.getElementById('result-count') as HTMLElement;
    this.catalogHeading = document.getElementById('catalog-heading');
    this.paginationControls = document.getElementById('pagination-controls') as HTMLElement;
    this.pageJumpInput = document.getElementById('page-jump-input') as HTMLInputElement;
    this.pageJumpBtn = document.getElementById('page-jump-btn');

    this.modalBackdrop = document.getElementById('game-detail-modal') as HTMLElement;
    this.modalContent = document.getElementById('modal-content') as HTMLElement;
    this.modalCloseBtn = document.getElementById('modal-close-btn');
  }

  private setupTheme(): void {
    const savedTheme = localStorage.getItem('samtagon_theme');
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    let isDarkMode = themeParam ? themeParam === 'dark' : (savedTheme ? savedTheme === 'dark' : true);

    const applyTheme = (dark: boolean) => {
      if (dark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('samtagon_theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('samtagon_theme', 'light');
      }
    };
    applyTheme(isDarkMode);

    window.matchMedia?.('(prefers-color-scheme: dark)')?.addEventListener('change', (e) => {
      isDarkMode = e.matches;
      applyTheme(isDarkMode);
      if (isDarkMode) {
        this.audio.playChime(523.25, 0.08);
      } else {
        this.audio.playMorningBirdSong();
      }
    });

    const themeBtn = document.getElementById('theme-toggle-btn');
    themeBtn?.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      applyTheme(isDarkMode);
      if (isDarkMode) {
        this.audio.playChime(523.25, 0.08);
      } else {
        this.audio.playMorningBirdSong();
      }
    });

    // Audio mute toggle
    const audioBtn = document.getElementById('audio-toggle-btn');
    const audioOnIcon = audioBtn?.querySelector('.audio-on-icon') as HTMLElement | null;
    const audioOffIcon = audioBtn?.querySelector('.audio-off-icon') as HTMLElement | null;

    const updateAudioUI = (unmuted: boolean) => {
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
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'KeyM') {
        const unmuted = this.audio.toggleMute();
        updateAudioUI(unmuted);
      }
    });
  }

  private setupEventListeners(): void {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    this.searchInput?.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const val = target.value;

      if (this.clearSearchBtn) {
        this.clearSearchBtn.style.display = val.length > 0 ? 'inline-flex' : 'none';
      }

      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.currentQuery = val;
        this.currentPage = 1;
        this.loadCatalog();
      }, 120);
    });

    this.clearSearchBtn?.addEventListener('click', () => {
      this.searchInput.value = '';
      this.clearSearchBtn!.style.display = 'none';
      this.currentQuery = '';
      this.currentPage = 1;
      this.loadCatalog();
      this.searchInput.focus();
    });

    // Jump to page listener
    const performJump = () => {
      const pageVal = parseInt(this.pageJumpInput.value, 10);
      if (!isNaN(pageVal) && pageVal >= 1 && pageVal <= this.totalPages) {
        this.goToPage(pageVal);
        this.pageJumpInput.value = '';
      }
    };

    this.pageJumpBtn?.addEventListener('click', performJump);
    this.pageJumpInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        performJump();
      }
    });

    // Modal close listeners
    this.modalCloseBtn?.addEventListener('click', () => this.closeGameDetailModal());
    this.modalBackdrop?.addEventListener('click', (e) => {
      if (e.target === this.modalBackdrop) {
        this.closeGameDetailModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalBackdrop.style.display === 'flex') {
        this.closeGameDetailModal();
      }
    });

    // Sharp GSAP tactile animations for navigation and icon buttons
    document.querySelectorAll<HTMLElement>('.rec-back-btn, .icon-btn').forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { y: -2, duration: 0.14, ease: 'power2.out', overwrite: 'auto' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { y: 0, duration: 0.18, ease: 'power2.out', overwrite: 'auto' });
      });
      btn.addEventListener('mousedown', () => {
        gsap.to(btn, { scale: 0.93, duration: 0.08, ease: 'power1.in', overwrite: 'auto' });
      });
      btn.addEventListener('mouseup', () => {
        gsap.to(btn, { scale: 1, duration: 0.2, ease: 'back.out(2.5)', overwrite: 'auto' });
      });
    });
  }

  /**
   * Load and render the current page of games or search results
   */
  private loadCatalog(): void {
    const isSearching = this.currentQuery.trim().length > 0;
    const result = CatalogEngine.searchCatalog(this.currentQuery, this.currentPage);

    this.currentMatches = result.matches;
    this.totalPages = result.totalPages;
    this.totalCount = result.totalCount;
    this.currentPage = result.currentPage;

    // Update Header
    if (this.catalogHeading) {
      this.catalogHeading.textContent = isSearching
        ? `Search Results for "${this.currentQuery}"`
        : 'Explore Catalog';
    }

    if (this.resultCountSpan) {
      this.resultCountSpan.innerHTML = isSearching
        ? `${this.totalCount} matching titles &bull; Page ${this.currentPage} of ${this.totalPages}`
        : `Page ${this.currentPage.toLocaleString()} of ${this.totalPages.toLocaleString()} &bull; 12,000 titles`;
    }

    // Render Grid
    this.renderGamesGrid(this.currentMatches, isSearching);

    // Render Pagination Bar
    this.renderPaginationBar();
  }

  /**
   * Navigate to target page
   */
  private goToPage(targetPage: number): void {
    if (targetPage < 1 || targetPage > this.totalPages) return;
    this.currentPage = targetPage;
    this.audio.playChime(659.25, 0.05);
    this.loadCatalog();

    // Smooth scroll back to top of catalog section
    const catalogSec = document.getElementById('search-section');
    if (catalogSec) {
      catalogSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Render the 12 game cards
   */
  private renderGamesGrid(matches: GameMatch[], isSearching: boolean): void {
    if (!this.searchResultsContainer) return;

    if (matches.length === 0) {
      this.searchResultsContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 48px 20px;">
          <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 16px;">No games found matching "${this.currentQuery}".</p>
          <button class="page-jump-btn" id="reset-search-btn">Reset Search</button>
        </div>
      `;
      document.getElementById('reset-search-btn')?.addEventListener('click', () => {
        this.searchInput.value = '';
        this.clearSearchBtn!.style.display = 'none';
        this.currentQuery = '';
        this.currentPage = 1;
        this.loadCatalog();
      });
      return;
    }

    this.searchResultsContainer.innerHTML = '';

    matches.forEach((match, idx) => {
      const card = this.createGameCard(match.game as ExtendedGameItem, match.similarity, isSearching, idx + 1);
      this.searchResultsContainer.appendChild(card);
    });
  }

  /**
   * Create interactive game card
   */
  private createGameCard(
    game: ExtendedGameItem,
    similarity: number,
    isSearching: boolean,
    rank: number
  ): HTMLElement {
    const card = document.createElement('article');
    card.className = `game-card ${game.isSamtagonOriginal ? 'card-original' : ''}`;

    let badgeHtml = '';
    if (isSearching && similarity > 0) {
      const percentMatch = Math.round(similarity * 100);
      const scoreClass = similarity >= 0.88 ? 'score-excellent' : similarity >= 0.74 ? 'score-good' : 'score-fair';
      badgeHtml = `<span class="card-sim-badge ${scoreClass}">${percentMatch}% Match</span>`;
    } else {
      const pct = Math.round(game.rating * 20);
      badgeHtml = `<span class="card-rating-badge">&#9733; ${pct}% Positive</span>`;
    }

    const platformBadgesHtml = game.platforms
      .map((p) => {
        const iconSvg =
          p.badge === 'steam'
            ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 14.819C1.865 20.082 6.474 24 12 24c6.627 0 12-5.373 12-12S18.627 0 11.979 0z"/></svg>`
            : p.badge === 'itch'
            ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3.193 1.58C1.848 1.93.003 3.488 0 4.634v1.895c0 1.545 1.487 2.872 2.747 2.872 1.517 0 2.747-1.144 2.747-2.585 0 1.44 1.23 2.585 2.747 2.585 1.516 0 2.746-1.144 2.746-2.585 0 1.44 1.23 2.585 2.747 2.585 1.516 0 2.747-1.144 2.747-2.585 0 1.44 1.23 2.585 2.747 2.585 1.26 0 2.747-1.327 2.747-2.872V4.634c-.003-1.146-1.848-2.705-3.193-3.054C19.123 1.157 14.935 1 12 1s-7.123.157-8.807.58zM12 9.547c-1.365 0-2.593.707-3.35 1.764-.757-1.057-1.985-1.764-3.35-1.764-2.228 0-4.04 1.83-4.04 4.084V21.5c0 .825.67 1.5 1.5 1.5h18.38c.83 0 1.5-.675 1.5-1.5v-7.869c0-2.254-1.812-4.084-4.04-4.084-1.365 0-2.593.707-3.35 1.764-.757-1.057-1.985-1.764-3.35-1.764z"/></svg>`
            : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`;

        return `
          <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="platform-badge badge-${p.badge}" title="View on ${p.name}" onclick="event.stopPropagation()">
            ${iconSvg}
            <span>${p.name}</span>
            <span class="ext-arrow">&nearr;</span>
          </a>
        `;
      })
      .join('');

    card.innerHTML = `
      <div class="card-cover-wrap">
        <img src="${game.image}" alt="${game.title}" class="card-cover-img" loading="eager" onerror="this.onerror=null; this.src='https://cdn.akamai.steamstatic.com/steam/apps/1222140/capsule_616x353.jpg';" />
        <div class="card-cover-pills">
          ${badgeHtml}
          ${game.isSamtagonOriginal ? `<span class="badge-samtagon-float">Original</span>` : ''}
        </div>
      </div>

      <div class="card-body">
        <div class="card-header-line">
          <h3 class="card-title">${game.title}</h3>
          <span class="release-year">${game.releaseYear}</span>
        </div>
        <div class="card-developer-line">${game.developer}</div>

        <p class="card-desc">${(() => {
          const sentences = game.description.match(/[^.!?]+[.!?]+/g) || [game.description];
          return sentences.slice(0, 2).join(' ');
        })()}</p>

        <div class="card-actions">
          <div class="platforms-group">
            ${platformBadgesHtml}
          </div>
          <button class="rabbit-hole-btn" title="View Full Details">
            <span>Details</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    `;

    // Click card opens full Game Detail Modal
    card.addEventListener('click', () => {
      this.audio.playChime(783.99, 0.06);
      this.openGameDetailModal(game);
    });

    // Hover animation
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -4, duration: 0.16, ease: 'power2.out', overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
    });

    return card;
  }

  /**
   * Render modern responsive pagination bar (1 to 1000)
   */
  private renderPaginationBar(): void {
    if (!this.paginationControls) return;

    this.paginationControls.innerHTML = '';
    const current = this.currentPage;
    const total = this.totalPages;

    if (total <= 1) return;

    const createBtn = (label: string, pageTarget: number, disabled: boolean, active: boolean = false) => {
      const btn = document.createElement('button');
      btn.className = `page-btn ${active ? 'active' : ''}`;
      btn.innerHTML = label;
      btn.disabled = disabled;
      if (!disabled && !active) {
        btn.addEventListener('click', () => this.goToPage(pageTarget));
      }
      return btn;
    };

    const createEllipsis = () => {
      const span = document.createElement('span');
      span.className = 'page-ellipsis';
      span.textContent = '...';
      return span;
    };

    // First and Prev
    this.paginationControls.appendChild(createBtn('&laquo; First', 1, current === 1));
    this.paginationControls.appendChild(createBtn('&lsaquo; Prev', current - 1, current === 1));

    // Dynamic numeric pages window
    const pagesToShow = new Set<number>();
    pagesToShow.add(1);
    pagesToShow.add(total);

    for (let p = Math.max(1, current - 2); p <= Math.min(total, current + 2); p++) {
      pagesToShow.add(p);
    }

    const sortedPages = Array.from(pagesToShow).sort((a, b) => a - b);
    let prevPage = 0;

    sortedPages.forEach((p) => {
      if (prevPage > 0 && p - prevPage > 1) {
        this.paginationControls.appendChild(createEllipsis());
      }
      this.paginationControls.appendChild(createBtn(p.toString(), p, false, p === current));
      prevPage = p;
    });

    // Next and Last
    this.paginationControls.appendChild(createBtn('Next &rsaquo;', current + 1, current === total));
    this.paginationControls.appendChild(createBtn('Last &raquo;', total, current === total));
  }

  /**
   * Open full rich Game Detail Modal (less text, rich media, video trailers, store and studio links)
   */
  public openGameDetailModal(game: ExtendedGameItem): void {
    if (!this.modalBackdrop || !this.modalContent) return;

    const similarGames = CatalogEngine.getSimilarGames(game, 3);
    const storeUrl = game.platforms[0]?.url || `https://store.steampowered.com/`;
    const studioUrl = game.studioUrl || `https://store.steampowered.com/search/?developer=${encodeURIComponent(game.developer)}`;

    // Media presentation: High-res poster banner + YouTube video trailer embed
    let mediaHtml = `
      <div class="modal-media-wrap">
        <img src="${game.image}" alt="${game.title}" class="modal-media-poster" />
        ${game.videoTrailer && game.videoTrailer.includes('youtube.com') ? `
          <iframe 
            src="${game.videoTrailer}?autoplay=1&mute=1&loop=1&playlist=${game.videoTrailer.split('/embed/')[1] || ''}" 
            title="${game.title} Trailer" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        ` : ''}
      </div>
    `;

    const tagPillsHtml = game.genres
      .map(g => `<span class="modal-tag-pill">${g}</span>`)
      .concat(game.tags.slice(0, 4).map(t => `<span class="modal-tag-pill">#${t}</span>`))
      .join('');

    const similarCardsHtml = similarGames
      .map(sim => `
        <div class="modal-similar-card" data-sim-id="${sim.id}">
          <img src="${sim.image}" alt="${sim.title}" class="modal-similar-thumb" />
          <div class="modal-similar-info">
            <div class="modal-similar-title">${sim.title}</div>
            <div class="modal-similar-studio">${sim.developer} &bull; ${sim.releaseYear}</div>
          </div>
        </div>
      `)
      .join('');

    this.modalContent.innerHTML = `
      ${mediaHtml}
      <div class="modal-content-inner">
        <div class="modal-header-meta">
          <div class="modal-title-row">
            <h2 class="modal-title" id="modal-game-title">${game.title}</h2>
            <span class="modal-year">${game.releaseYear}</span>
          </div>
          <div>
            <a href="${studioUrl}" target="_blank" rel="noopener noreferrer" class="modal-developer-link" title="Explore ${game.developer}">
              <span>${game.developer}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
          </div>
        </div>

        <div class="modal-review-bar">
          <span class="score-star">&#9733; ${Math.round(game.rating * 20)}% Positive</span>
          <span>&bull;</span>
          <span>${game.reviewsSummary || 'Very Positive'}</span>
          <span>&bull;</span>
          <span>${game.reviewCount || 'Verified Steam Reviews'}</span>
        </div>

        <p class="modal-desc">${game.description}</p>

        <div class="modal-tag-cloud">
          ${tagPillsHtml}
        </div>

        <div class="modal-actions-row">
          <a href="${storeUrl}" target="_blank" rel="noopener noreferrer" class="modal-store-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 14.819C1.865 20.082 6.474 24 12 24c6.627 0 12-5.373 12-12S18.627 0 11.979 0z"/></svg>
            <span>Play on Steam Store</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
          </a>

          <a href="${studioUrl}" target="_blank" rel="noopener noreferrer" class="modal-studio-btn">
            <span>Developer Studio</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
          </a>
        </div>

        <div class="modal-similar-section">
          <div class="modal-similar-heading">Top Similar Experiences</div>
          <div class="modal-similar-grid">
            ${similarCardsHtml}
          </div>
        </div>
      </div>
    `;

    // Hook similar game cards inside modal to transition modal to that game
    this.modalContent.querySelectorAll<HTMLElement>('.modal-similar-card').forEach((simCard) => {
      simCard.addEventListener('click', () => {
        const simId = simCard.getAttribute('data-sim-id');
        const nextGame = similarGames.find(g => g.id === simId);
        if (nextGame) {
          this.audio.playChime(880, 0.06);
          this.openGameDetailModal(nextGame);
        }
      });
    });

    // Reveal modal with GSAP
    this.modalBackdrop.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const dialog = this.modalBackdrop.querySelector('.game-modal-dialog');
    gsap.fromTo(this.modalBackdrop, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'power2.out' });
    if (dialog) {
      gsap.fromTo(dialog, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' });
    }
  }

  /**
   * Close Game Detail Modal
   */
  public closeGameDetailModal(): void {
    if (!this.modalBackdrop) return;

    const dialog = this.modalBackdrop.querySelector('.game-modal-dialog');
    gsap.to(this.modalBackdrop, {
      opacity: 0,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        this.modalBackdrop.style.display = 'none';
        this.modalContent.innerHTML = ''; // Stops iframe video audio
        document.body.style.overflow = '';
      },
    });

    if (dialog) {
      gsap.to(dialog, { y: 16, opacity: 0, duration: 0.18, ease: 'power2.in' });
    }
  }
}

// Bootstrap on DOM load
window.addEventListener('DOMContentLoaded', () => {
  new RecommendationsApp();
});

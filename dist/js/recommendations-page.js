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
import { CatalogEngine } from './catalog-engine.js';
import gsap from 'gsap';
const COOKIE_KEY = 'samtagon_gamer_profile';
const ARCHETYPES = {
    architect: {
        name: 'The Grand Architect',
        badge: '👑 THE GRAND ARCHITECT',
        desc: 'You perceive games as intricate, living tapestries of interconnected rules. You find profound satisfaction in constructing systems, automating workflows, and watching infinite loops tick with clockwork harmony.',
        superpower: 'Macro-Systems Engineering: You see through chaotic complexity and intuitively engineer self-sustaining solutions.',
        catalogSearch: 'Factorio',
    },
    speedster: {
        name: 'The Kinetic Speedster',
        badge: '⚡ THE KINETIC SPEEDSTER',
        desc: 'You thrive in the flow state. Split-second reflexes, dodging bullet barrages by millimetres, and the exhilarating high of clutch victories are what make gaming truly alive for you.',
        superpower: 'Lightning Reflex Flow: When chaos escalates, your reaction time sharpens and the world slows down.',
        catalogSearch: 'DOOM',
    },
    explorer: {
        name: 'The Cozy Explorer',
        badge: '🌿 THE COZY EXPLORER',
        desc: 'You immerse yourself deeply in handcrafted worlds. You notice the small details, cherish quiet campfire moments, search for hidden easter eggs, and value heartfelt emotional atmosphere above all.',
        superpower: 'World Intuition: An uncanny Sixth Sense for discovering secret alcoves, environmental lore, and atmospheric wonder.',
        catalogSearch: 'Stardew Valley',
    },
    tactician: {
        name: 'The Cyber Tactician',
        badge: '🎯 THE CYBER TACTICIAN',
        desc: 'You analyze mechanics down to their foundational frame data. Every move is calculated, every resource optimized, and every defeat is simply data used to guarantee inevitable, flawless victory.',
        superpower: 'Flawless Execution Heuristic: You dissect enemy patterns in real-time and execute precision counters with zero wasted motion.',
        catalogSearch: 'Sekiro',
    },
};
const QUIZ_QUESTIONS = [
    {
        id: 1,
        scenario: 'Scenario 1: The Clockwork Relic',
        situation: 'Deep inside an ancient brass observatory, you discover a colossal mechanism with spinning cogs, pressure dials, and glowing celestial spheres. What is your first move?',
        options: [
            { text: 'Decipher the gear train and deduce the machine’s mathematical blueprint.', archetype: 'architect', hint: 'System Logic' },
            { text: 'Yank the master steam valve and prepare to leap out of the blast radius!', archetype: 'speedster', hint: 'Pure Reflex' },
            { text: 'Trace the engraved astronomical star charts to understand the forgotten culture.', archetype: 'explorer', hint: 'World Lore' },
            { text: 'Measure the torque output and isolate the single gear that controls the whole array.', archetype: 'tactician', hint: 'Optimization' },
        ],
    },
    {
        id: 2,
        scenario: 'Scenario 2: Neon Alley Ambush',
        situation: 'Rain lashes the neon alleyways of Sector 7. A cyber-mercenary squad cuts off your extraction corridor.',
        options: [
            { text: 'Hack the local grid to overload traffic lights and trap them in automated gridlock.', archetype: 'architect', hint: 'Infrastructure' },
            { text: 'Charge forward on your mag-boots, dodging laser fire with split-second reflex slides!', archetype: 'speedster', hint: 'Adrenaline Flow' },
            { text: 'Duck behind a holographic ramen stall, pet a robotic stray cat, and find a maintenance vent.', archetype: 'explorer', hint: 'Curious Paths' },
            { text: 'Calculate their reload cooldown windows and neutralize them with frame-perfect precision.', archetype: 'tactician', hint: 'Calculated Fire' },
        ],
    },
    {
        id: 3,
        scenario: 'Scenario 3: The Deep Space Anomaly',
        situation: 'Your starship’s long-range sensors detect a bizarre harmonic frequency echoing from an uncharted wormhole event horizon.',
        options: [
            { text: 'Deploy an array of sensory probe relays to model the wormhole’s spacetime curvature.', archetype: 'architect', hint: 'Simulation' },
            { text: 'Max out thrusters to 110% and perform a breathtaking slingshot drift through the vortex!', archetype: 'speedster', hint: 'Thrills & Speed' },
            { text: 'Broadcast a peaceful musical greeting and listen closely for alien responses.', archetype: 'explorer', hint: 'Discovery' },
            { text: 'Reinforce forward deflector matrices to mine rare chronal plasma before the rift collapses.', archetype: 'tactician', hint: 'Risk & Reward' },
        ],
    },
    {
        id: 4,
        scenario: 'Scenario 4: The Colossus Awakening',
        situation: 'A towering guardian of stone and clockwork rises from the valley floor, wielding a mountain-shattering war hammer.',
        options: [
            { text: 'Lure it into a canyon chokepoint and detonate the support pillars to cause a structural collapse.', archetype: 'architect', hint: 'Trap Design' },
            { text: 'Grapple onto its hammer mid-swing and sprint up its arm while unleashing explosive strikes!', archetype: 'speedster', hint: 'Kinetic Combat' },
            { text: 'Spot the ancient glowing glyph on its chest and solve the riddle that peacefully puts it to rest.', archetype: 'explorer', hint: 'Empathy' },
            { text: 'Study its 3-phase telegraphs, parry its overhead slam at the exact frame, and stagger its posture.', archetype: 'tactician', hint: 'Parry Timing' },
        ],
    },
    {
        id: 5,
        scenario: 'Scenario 5: A Peaceful Sunday Evening',
        situation: 'You have a cozy evening ahead with a warm cup of tea and zero deadlines. What game are you happiest launching?',
        options: [
            { text: 'A deep automation or cellular simulation where intricate clockwork systems run seamlessly.', archetype: 'architect', hint: 'Infinite Loops' },
            { text: 'A relentless retro arcade shooter with blistering chiptune music and non-stop bullet dodging.', archetype: 'speedster', hint: 'Reflex Flow' },
            { text: 'A hand-drawn pixel RPG with whimsical characters, secret fishing ponds, and cozy fires.', archetype: 'explorer', hint: 'Atmosphere' },
            { text: 'A demanding roguelike or puzzle platformer where you refine your build and master the mechanics.', archetype: 'tactician', hint: 'Mastery' },
        ],
    },
    {
        id: 6,
        scenario: 'Scenario 6: The Shifting Labyrinth',
        situation: 'The dungeon corridors shift and reconfigure every 60 seconds according to an unseen arcane clockwork.',
        options: [
            { text: 'Track the geometric rotation cycle and predict the exact coordinates of the exit chamber.', archetype: 'architect', hint: 'Pattern Heuristics' },
            { text: 'Sprint through corridors at full speed, clearing obstacles before the stone gates slam shut!', archetype: 'speedster', hint: 'Velocity Rush' },
            { text: 'Mark walls with glowing crystal chalk, discover secret alcoves, and enjoy the ambient echoes.', archetype: 'explorer', hint: 'Secret Paths' },
            { text: 'Calculate the shortest-path node graph and manage your sprint stamina with zero wasted steps.', archetype: 'tactician', hint: 'Stamina Control' },
        ],
    },
    {
        id: 7,
        scenario: 'Scenario 7: The Legendary Artifact',
        situation: 'An immortal artisan invites you to choose one relic before departing into the wilderness. Which one is yours?',
        options: [
            { text: 'The Chrono-Compass: Allows you to freeze simulation ticks, test outcomes, and rewind time.', archetype: 'architect', hint: 'Macro Control' },
            { text: 'The Hyper-Kinetic Dash Boots: Multiplies movement speed by 300% and turns dashes into shockwaves.', archetype: 'speedster', hint: 'Max Velocity' },
            { text: 'The Wanderer’s Lantern: Illuminates invisible fairy paths and deciphers ancient forgotten languages.', archetype: 'explorer', hint: 'Lore Sight' },
            { text: 'The Edge of Precision: Grants 100% critical strike rate if timed within a 50-millisecond frame window.', archetype: 'tactician', hint: 'Frame Exactitude' },
        ],
    },
    {
        id: 8,
        scenario: 'Scenario 8: The Checkpoint Wall',
        situation: 'A brutally unforgiving challenge has sent you back to the checkpoint 15 times in a row. What is your reaction?',
        options: [
            { text: 'Pause, analyze the macro dynamics, and reconstruct my character’s entire ability loop.', archetype: 'architect', hint: 'Refactor System' },
            { text: 'Crank up the volume, lean into the monitor, and conquer it with pure hyper-focused reflexes!', archetype: 'speedster', hint: 'Adrenaline High' },
            { text: 'Take a relaxing break, explore a scenic side-valley, collect decorative pins, and return refreshed.', archetype: 'explorer', hint: 'Cozy Reset' },
            { text: 'Break down the exact sequence of errors frame by frame until flawless execution is inevitable.', archetype: 'tactician', hint: 'Dissect Errors' },
        ],
    },
    {
        id: 9,
        scenario: 'Scenario 9: The Spine-Chilling Soundtrack',
        situation: 'Which sound design choice instantly sends shivers down your spine and pulls you into deep immersion?',
        options: [
            { text: 'Hypnotic modular synthesizer pulses, procedural clockwork clicks, and ambient binaural hums.', archetype: 'architect', hint: 'Cadence' },
            { text: 'Thumping 16-bit basslines, roaring thruster exhausts, and punchy mechanical blaster impacts.', archetype: 'speedster', hint: 'Kinetic Punch' },
            { text: 'Fingerpicked acoustic guitar, rain tapping against cabin windows, and distant singing sparrows.', archetype: 'explorer', hint: 'Nostalgia' },
            { text: 'Crisp audio cues with high dynamic range that communicate enemy posture breaks and telegraphs.', archetype: 'tactician', hint: 'Precision Cues' },
        ],
    },
    {
        id: 10,
        scenario: 'Scenario 10: Your Gamer Legacy',
        situation: 'When the credits roll and you look back at your grand journey, what feeling leaves you deeply fulfilled?',
        options: [
            { text: '“I built an intricate, living system that continues humming in beautiful infinite loops.”', archetype: 'architect', hint: 'The Architect’s Dream' },
            { text: '“I reached the outer limits of kinetic speed, danced through chaos, and emerged triumphant.”', archetype: 'speedster', hint: 'The Speedster’s High' },
            { text: '“I lived in an unforgettable handcrafted world, uncovered its soul, and made lasting memories.”', archetype: 'explorer', hint: 'The Wanderer’s Heart' },
            { text: '“I conquered the ultimate challenge through razor-sharp discipline and tactical mastery.”', archetype: 'tactician', hint: 'The Tactician’s Pride' },
        ],
    },
];
const SAMTAGON_STUDIO_GAMES = [
    {
        id: 'conway',
        title: "Conway's Game of Life",
        genre: "Simulation & Cellular Automata Engine",
        desc: "A tactile mathematical simulation engine where living cellular automata evolve according to deterministic algorithmic laws. Features glider synthesizers, high-performance tick generation, and tactile grid manipulation.",
        image: "assets/images/games/conway.svg",
        url: "https://sachinapr20.itch.io/",
        githubUrl: "https://github.com/SachinyadavAug20",
        baseScore: { architect: 99, tactician: 94, explorer: 86, speedster: 78 },
        highlightNotes: {
            architect: "Your #1 Soulmate: Pure emergent simulation beauty and infinite self-sustaining loops.",
            tactician: "Calculated determinism: master cell lifecycles, oscillators, and glider guns.",
            explorer: "Discover rare mathematical curiosities, pulsars, and spaceship patterns.",
            speedster: "Crank simulation ticks to hyper-speed and witness rapid evolutionary bursts.",
        },
    },
    {
        id: 'alien-blaster',
        title: "Alien Blaster",
        genre: "Retro Arcade Action Platformer",
        desc: "A high-octane 2D retro action shooter featuring fluid projectile velocity physics, momentum-conserving dash mechanics, screen-shake feedback, and frantic enemy wave survival.",
        image: "assets/images/games/alien-blaster.svg",
        url: "https://sachinapr20.itch.io/",
        githubUrl: "https://github.com/SachinyadavAug20/AlienBlaster",
        baseScore: { speedster: 99, tactician: 93, architect: 82, explorer: 76 },
        highlightNotes: {
            speedster: "Your #1 Soulmate: Unrelenting kinetic flow state, twitch reflexes, and bullet hell dodging.",
            tactician: "Hitbox precision and frame-accurate threat prioritization.",
            architect: "Engineered state machines and modular projectile physics.",
            explorer: "Classic 16-bit arcade aesthetics with vibrant retro charm.",
        },
    },
    {
        id: 'godot-quest',
        title: "Godot Quest",
        genre: "Pixel Art Adventure RPG",
        desc: "A charming pixel-art exploration adventure engineered in Godot Engine. Features cozy hand-drawn environments, quirky NPC conversations, secret collectible lore, and a soothing ambient soundtrack.",
        image: "assets/images/games/my-first-game.svg",
        url: "https://sachinapr20.itch.io/",
        githubUrl: "https://github.com/SachinyadavAug20",
        baseScore: { explorer: 99, architect: 89, tactician: 84, speedster: 79 },
        highlightNotes: {
            explorer: "Your #1 Soulmate: Handcrafted lore, hidden paths, cozy fires, and whimsical secrets.",
            architect: "Clean Godot scene-tree architecture and emergent RPG inventory systems.",
            tactician: "Efficient quest routing, dialogue branch navigation, and secret hunting.",
            speedster: "Agile 2D platforming navigation and responsive movement curves.",
        },
    },
    {
        id: 'snake-pingpong',
        title: "Snake & Ping Pong (Kinetic Physics)",
        genre: "Reflex Arcade Physics",
        desc: "Kinetic physics reinventions of timeless arcade mechanics with escalating velocity vectors, screen-shake haptic response, and frame-accurate paddle bounce physics.",
        image: "assets/images/games/pingpong.svg",
        url: "https://sachinapr20.itch.io/",
        githubUrl: "https://github.com/SachinyadavAug20",
        baseScore: { speedster: 96, tactician: 92, architect: 84, explorer: 80 },
        highlightNotes: {
            speedster: "Escalating speed multipliers that push your reaction thresholds to the absolute limit.",
            tactician: "Geometric angle calculations and predictive paddle trajectories.",
            architect: "Pure deterministic kinematic physics built from ground up.",
            explorer: "Timeless nostalgic arcade purity with tactile sound feedback.",
        },
    },
];
class RecommendationsApp {
    audio;
    currentPage = 1;
    totalPages = 1000;
    totalCount = 12000;
    currentQuery = '';
    currentMatches = [];
    // Mode Tabs & View Elements
    activeTab = 'quiz';
    tabQuizBtn;
    tabExploreBtn;
    tabQuizLabel;
    viewQuiz;
    viewExplore;
    skipToExploreBtn;
    categoryPillsWrap;
    // Quiz State
    currentQuestionIndex = 0;
    userAnswers = [];
    currentProfile = null;
    // DOM Elements
    quizActiveBox;
    quizProfileBox;
    quizStepIndicator;
    quizTrackFill;
    quizBody;
    quizBackBtn;
    searchInput;
    clearSearchBtn;
    searchResultsContainer;
    resultCountSpan;
    catalogHeading;
    paginationControls;
    pageJumpInput;
    pageJumpBtn;
    // Modal Elements
    modalBackdrop;
    modalContent;
    modalCloseBtn;
    constructor() {
        this.audio = new ProceduralAudio();
        this.initDOM();
        this.setupTheme();
        this.setupTabs();
        this.setupCategoryPills();
        this.setupEventListeners();
        this.setupSmoothPageTransitions();
        this.initQuiz();
        this.loadCatalog();
    }
    initDOM() {
        this.tabQuizBtn = document.getElementById('tab-quiz-btn');
        this.tabExploreBtn = document.getElementById('tab-explore-btn');
        this.tabQuizLabel = document.getElementById('tab-quiz-label');
        this.viewQuiz = document.getElementById('view-quiz');
        this.viewExplore = document.getElementById('view-explore');
        this.skipToExploreBtn = document.getElementById('skip-to-explore-btn');
        this.categoryPillsWrap = document.getElementById('category-pills-wrap');
        this.quizActiveBox = document.getElementById('quiz-active-box');
        this.quizProfileBox = document.getElementById('quiz-profile-box');
        this.quizStepIndicator = document.getElementById('quiz-step-indicator');
        this.quizTrackFill = document.getElementById('quiz-track-fill');
        this.quizBody = document.getElementById('quiz-body');
        this.quizBackBtn = document.getElementById('quiz-back-btn');
        this.searchInput = document.getElementById('search-input');
        this.clearSearchBtn = document.getElementById('clear-search-btn');
        this.searchResultsContainer = document.getElementById('search-results-grid');
        this.resultCountSpan = document.getElementById('result-count');
        this.catalogHeading = document.getElementById('catalog-heading');
        this.paginationControls = document.getElementById('pagination-controls');
        this.pageJumpInput = document.getElementById('page-jump-input');
        this.pageJumpBtn = document.getElementById('page-jump-btn');
        this.modalBackdrop = document.getElementById('game-detail-modal');
        this.modalContent = document.getElementById('modal-content');
        this.modalCloseBtn = document.getElementById('modal-close-btn');
    }
    setupTheme() {
        const savedTheme = localStorage.getItem('samtagon_theme');
        const urlParams = new URLSearchParams(window.location.search);
        const themeParam = urlParams.get('theme');
        let isDarkMode = themeParam ? themeParam === 'dark' : (savedTheme ? savedTheme === 'dark' : true);
        const applyTheme = (dark) => {
            if (dark) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('samtagon_theme', 'dark');
            }
            else {
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
            }
            else {
                this.audio.playMorningBirdSong();
            }
        });
        const themeBtn = document.getElementById('theme-toggle-btn');
        themeBtn?.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            applyTheme(isDarkMode);
            if (isDarkMode) {
                this.audio.playChime(523.25, 0.08);
            }
            else {
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
    setupTabs() {
        this.tabQuizBtn?.addEventListener('click', () => {
            this.switchTab('quiz');
        });
        this.tabExploreBtn?.addEventListener('click', () => {
            this.switchTab('explore');
        });
        this.skipToExploreBtn?.addEventListener('click', () => {
            this.switchTab('explore');
        });
    }
    switchTab(tab, searchKeyword) {
        this.activeTab = tab;
        if (tab === 'quiz') {
            if (this.viewQuiz)
                this.viewQuiz.style.display = 'block';
            if (this.viewExplore)
                this.viewExplore.style.display = 'none';
            this.tabQuizBtn?.classList.add('active');
            this.tabQuizBtn?.setAttribute('aria-selected', 'true');
            this.tabExploreBtn?.classList.remove('active');
            this.tabExploreBtn?.setAttribute('aria-selected', 'false');
            this.audio.playChime(523.25, 0.06);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        else {
            if (this.viewQuiz)
                this.viewQuiz.style.display = 'none';
            if (this.viewExplore)
                this.viewExplore.style.display = 'block';
            this.tabExploreBtn?.classList.add('active');
            this.tabExploreBtn?.setAttribute('aria-selected', 'true');
            this.tabQuizBtn?.classList.remove('active');
            this.tabQuizBtn?.setAttribute('aria-selected', 'false');
            this.audio.playChime(659.25, 0.06);
            if (searchKeyword !== undefined) {
                if (this.searchInput) {
                    this.searchInput.value = searchKeyword;
                    if (this.clearSearchBtn)
                        this.clearSearchBtn.style.display = searchKeyword ? 'inline-flex' : 'none';
                }
                this.currentQuery = searchKeyword;
                this.currentPage = 1;
                this.loadCatalog();
                this.updateCategoryPillActive(searchKeyword);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    setupCategoryPills() {
        if (!this.categoryPillsWrap)
            return;
        const pills = this.categoryPillsWrap.querySelectorAll('.cat-pill');
        pills.forEach((pill) => {
            pill.addEventListener('click', () => {
                pills.forEach((p) => p.classList.remove('active'));
                pill.classList.add('active');
                const genre = pill.getAttribute('data-genre') || '';
                if (this.searchInput) {
                    this.searchInput.value = genre;
                    if (this.clearSearchBtn) {
                        this.clearSearchBtn.style.display = genre ? 'inline-flex' : 'none';
                    }
                }
                this.currentQuery = genre;
                this.currentPage = 1;
                this.audio.playQuizSelection();
                this.loadCatalog();
                const catalogHeading = document.getElementById('catalog-heading');
                catalogHeading?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }
    updateCategoryPillActive(keyword) {
        if (!this.categoryPillsWrap)
            return;
        const pills = this.categoryPillsWrap.querySelectorAll('.cat-pill');
        const lower = keyword.trim().toLowerCase();
        let matched = false;
        pills.forEach((pill) => {
            const g = (pill.getAttribute('data-genre') || '').toLowerCase();
            if ((lower === '' && g === '') || (lower && g && (lower.includes(g) || g.includes(lower)))) {
                pill.classList.add('active');
                matched = true;
            }
            else {
                pill.classList.remove('active');
            }
        });
        if (!matched) {
            pills.forEach((p) => p.classList.remove('active'));
        }
    }
    setupSmoothPageTransitions() {
        // Page load gentle entrance
        gsap.fromTo(document.body, { opacity: 0 }, { opacity: 1, duration: 0.32, ease: 'power2.out' });
        // Back to home button with silky smooth exit
        const backBtn = document.querySelector('.rec-back-btn');
        backBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.audio.playChime(659.25, 0.06);
            setTimeout(() => this.audio.playChime(523.25, 0.08), 80);
            gsap.to(document.body, {
                opacity: 0,
                y: 12,
                duration: 0.26,
                ease: 'power2.inOut',
                onComplete: () => {
                    window.location.href = backBtn.href;
                },
            });
        });
    }
    /* =========================================================================
       10-QUESTION GAMIFIED ARCHETYPE FINDER & COOKIE ENGINE
       ========================================================================= */
    initQuiz() {
        const saved = this.loadGamerProfileCookie();
        if (saved) {
            this.currentProfile = saved;
            this.renderProfileDashboard();
        }
        else {
            this.currentQuestionIndex = 0;
            this.userAnswers = [];
            this.renderQuestion(0);
        }
        this.quizBackBtn?.addEventListener('click', () => {
            this.prevQuestion();
        });
        // Keyboard shortcuts: 1, 2, 3, 4 or A, B, C, D
        window.addEventListener('keydown', (e) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
                return;
            if (!this.quizActiveBox || this.quizActiveBox.style.display === 'none')
                return;
            const key = e.key.toLowerCase();
            if (key === '1' || key === 'a')
                this.selectOption(0);
            else if (key === '2' || key === 'b')
                this.selectOption(1);
            else if (key === '3' || key === 'c')
                this.selectOption(2);
            else if (key === '4' || key === 'd')
                this.selectOption(3);
        });
    }
    renderQuestion(index) {
        if (!this.quizActiveBox || !this.quizBody)
            return;
        this.quizActiveBox.style.display = 'block';
        if (this.quizProfileBox)
            this.quizProfileBox.style.display = 'none';
        this.currentQuestionIndex = index;
        const q = QUIZ_QUESTIONS[index];
        const total = QUIZ_QUESTIONS.length;
        // Update Progress Indicator & Fill Track
        if (this.quizStepIndicator) {
            this.quizStepIndicator.textContent = `Question ${index + 1} of ${total}`;
        }
        if (this.tabQuizLabel) {
            this.tabQuizLabel.textContent = `Question ${index + 1} of ${total}`;
        }
        if (this.quizTrackFill) {
            const pct = ((index + 1) / total) * 100;
            this.quizTrackFill.style.width = `${pct}%`;
        }
        // Toggle Back Button Visibility
        if (this.quizBackBtn) {
            this.quizBackBtn.style.visibility = index > 0 ? 'visible' : 'hidden';
        }
        const keyLabels = ['A', 'B', 'C', 'D'];
        const optionsHtml = q.options.map((opt, i) => `
      <div class="quiz-option-card" data-opt-idx="${i}" role="button" tabindex="0">
        <div class="option-header-row">
          <span class="option-key-badge">${keyLabels[i]}</span>
          <span class="option-hint-tag">${opt.hint}</span>
        </div>
        <div class="option-text">${opt.text}</div>
      </div>
    `).join('');
        this.quizBody.innerHTML = `
      <h2 class="quiz-scenario-title">${q.scenario}</h2>
      <p class="quiz-scenario-text">${q.situation}</p>
      <div class="quiz-options-grid">
        ${optionsHtml}
      </div>
    `;
        // Hook click listeners on options
        this.quizBody.querySelectorAll('.quiz-option-card').forEach((card) => {
            card.addEventListener('click', () => {
                const optIdx = parseInt(card.getAttribute('data-opt-idx') || '0', 10);
                this.selectOption(optIdx);
            });
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -3, duration: 0.14, ease: 'power2.out', overwrite: 'auto' });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, duration: 0.18, ease: 'power2.out', overwrite: 'auto' });
            });
        });
        // Smooth subtle entry animation
        gsap.fromTo(this.quizBody, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    selectOption(optIndex) {
        if (optIndex < 0 || optIndex > 3)
            return;
        this.audio.playQuizSelection();
        this.userAnswers[this.currentQuestionIndex] = optIndex;
        const cards = this.quizBody?.querySelectorAll('.quiz-option-card');
        if (cards && cards[optIndex]) {
            cards[optIndex].classList.add('selected');
        }
        setTimeout(() => {
            if (this.currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
                this.renderQuestion(this.currentQuestionIndex + 1);
            }
            else {
                this.completeQuiz();
            }
        }, 160);
    }
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.audio.playChime(440, 0.05);
            this.renderQuestion(this.currentQuestionIndex - 1);
        }
    }
    completeQuiz() {
        // Tally scores across the 4 archetypes
        const scores = {
            architect: 0,
            speedster: 0,
            explorer: 0,
            tactician: 0,
        };
        this.userAnswers.forEach((ansIdx, qIdx) => {
            const q = QUIZ_QUESTIONS[qIdx];
            if (q && q.options[ansIdx]) {
                scores[q.options[ansIdx].archetype] += 1;
            }
        });
        // Find dominant archetype
        const entries = Object.entries(scores);
        entries.sort((a, b) => b[1] - a[1]);
        const dominantId = entries[0][0];
        const topScore = entries[0][1];
        const alignment = Math.min(99, Math.max(88, Math.round((topScore / QUIZ_QUESTIONS.length) * 100)));
        const archInfo = ARCHETYPES[dominantId];
        const profile = {
            archetypeId: dominantId,
            archetypeName: archInfo.name,
            badge: archInfo.badge,
            desc: archInfo.desc,
            superpower: archInfo.superpower,
            alignment,
            scores,
            answers: [...this.userAnswers],
            completedAt: new Date().toISOString(),
        };
        this.currentProfile = profile;
        this.saveGamerProfileCookie(profile);
        this.audio.playArchetypeFanfare();
        this.renderProfileDashboard();
    }
    renderProfileDashboard() {
        if (!this.currentProfile || !this.quizProfileBox)
            return;
        if (this.quizActiveBox)
            this.quizActiveBox.style.display = 'none';
        this.quizProfileBox.style.display = 'block';
        if (this.tabQuizLabel) {
            this.tabQuizLabel.textContent = 'Gamer Profile';
        }
        const p = this.currentProfile;
        const archInfo = ARCHETYPES[p.archetypeId];
        // Sort Samtagon Studio Games based on archetype alignment
        const arrangedGames = [...SAMTAGON_STUDIO_GAMES].sort((a, b) => {
            return b.baseScore[p.archetypeId] - a.baseScore[p.archetypeId];
        });
        const gamesGridHtml = arrangedGames.map((game, idx) => {
            const matchScore = game.baseScore[p.archetypeId];
            const isTop = idx === 0;
            const highlightNote = game.highlightNotes[p.archetypeId];
            return `
        <div class="arranged-game-card ${isTop ? 'top-soulmate' : ''}">
          <div>
            <div class="game-top-meta">
              <span class="game-match-score">${matchScore}% MATCH</span>
              ${isTop ? '<span class="soulmate-flag-tag">#1 RECOMMENDED SOULMATE</span>' : ''}
            </div>
            <h4 class="arranged-game-name">${game.title}</h4>
            <div class="arranged-game-genre">${game.genre}</div>
            <p class="arranged-game-desc">${game.desc}</p>
            <div class="arranged-game-why">
              <strong>Why you will love it:</strong> ${highlightNote}
            </div>
          </div>
          <div class="arranged-game-actions">
            <a href="${game.url}" target="_blank" rel="noopener noreferrer" class="game-play-btn">
              <span>Play on itch.io</span> &nearr;
            </a>
            ${game.githubUrl ? `
              <a href="${game.githubUrl}" target="_blank" rel="noopener noreferrer" class="game-source-btn">
                <span>GitHub</span>
              </a>
            ` : ''}
          </div>
        </div>
      `;
        }).join('');
        this.quizProfileBox.innerHTML = `
      <div class="profile-hero-card">
        <div class="profile-top-tags">
          <span class="archetype-emblem-pill">${p.badge} &bull; ${p.alignment}% ALIGNMENT</span>
          <span class="cookie-status-badge" title="Stored safely in browser cookies for 365 days. Zero login or account needed.">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/></svg>
            Saved in Cookies (No Sign-in)
          </span>
        </div>

        <h2 class="profile-heading">${p.archetypeName}</h2>
        <p class="profile-bio">${p.desc}</p>

        <div class="superpower-card">
          <div class="superpower-tag">Gamer Superpower</div>
          <div class="superpower-desc">${p.superpower}</div>
        </div>

        <div class="profile-action-bar">
          <button id="retake-quiz-btn" class="profile-cta-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            <span>Retake 10 Questions</span>
          </button>
          <button id="unlock-explore-btn" class="profile-cta-btn accent-cta">
            <span>Explore 12,000+ Games (${archInfo.catalogSearch})</span> &rarr;
          </button>
        </div>
      </div>

      <!-- Tailored Samtagon Lineup Section -->
      <div class="studio-lineup-header">
        <div>
          <h3 class="studio-lineup-title">Your Tailored Samtagon Studio Matches</h3>
          <p class="studio-lineup-subtitle">Arranged dynamically based on your unique ${p.archetypeName} instincts</p>
        </div>
        <a href="https://sachinapr20.itch.io/" target="_blank" rel="noopener noreferrer" class="itch-browse-link">
          <span>Play All on itch.io</span> &nearr;
        </a>
      </div>

      <div class="arranged-games-grid">
        ${gamesGridHtml}
      </div>
    `;
        // Hook Retake Quiz Button
        const retakeBtn = document.getElementById('retake-quiz-btn');
        retakeBtn?.addEventListener('click', () => {
            this.retakeQuiz();
        });
        // Hook Explore Catalog Button
        const unlockBtn = document.getElementById('unlock-explore-btn');
        unlockBtn?.addEventListener('click', () => {
            this.switchTab('explore', archInfo.catalogSearch);
        });
        // Smooth reveal animation
        gsap.fromTo(this.quizProfileBox, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
    }
    filterCatalogByArchetype(keyword) {
        this.switchTab('explore', keyword);
    }
    retakeQuiz() {
        this.clearGamerProfileCookie();
        this.currentProfile = null;
        this.userAnswers = [];
        if (this.tabQuizLabel) {
            this.tabQuizLabel.textContent = 'Question 1 of 10';
        }
        this.audio.playChime(523.25, 0.08);
        this.switchTab('quiz');
        this.renderQuestion(0);
    }
    saveGamerProfileCookie(profile) {
        const jsonStr = JSON.stringify(profile);
        const maxAge = 365 * 24 * 60 * 60; // 1 full year
        document.cookie = `${COOKIE_KEY}=${encodeURIComponent(jsonStr)}; path=/; max-age=${maxAge}; SameSite=Lax`;
        try {
            localStorage.setItem(COOKIE_KEY, jsonStr);
        }
        catch {
            // fallback
        }
    }
    loadGamerProfileCookie() {
        const cookieMatch = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_KEY}=([^;]+)`));
        if (cookieMatch) {
            try {
                return JSON.parse(decodeURIComponent(cookieMatch[1]));
            }
            catch {
                // ignore
            }
        }
        try {
            const local = localStorage.getItem(COOKIE_KEY);
            if (local)
                return JSON.parse(local);
        }
        catch {
            // ignore
        }
        return null;
    }
    clearGamerProfileCookie() {
        document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
        try {
            localStorage.removeItem(COOKIE_KEY);
        }
        catch {
            // ignore
        }
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
                this.currentQuery = val;
                this.currentPage = 1;
                this.loadCatalog();
            }, 120);
        });
        this.clearSearchBtn?.addEventListener('click', () => {
            this.searchInput.value = '';
            this.clearSearchBtn.style.display = 'none';
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
        document.querySelectorAll('.rec-back-btn, .icon-btn').forEach((btn) => {
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
    loadCatalog() {
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
    goToPage(targetPage) {
        if (targetPage < 1 || targetPage > this.totalPages)
            return;
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
    renderGamesGrid(matches, isSearching) {
        if (!this.searchResultsContainer)
            return;
        if (matches.length === 0) {
            this.searchResultsContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 48px 20px;">
          <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 16px;">No games found matching "${this.currentQuery}".</p>
          <button class="page-jump-btn" id="reset-search-btn">Reset Search</button>
        </div>
      `;
            document.getElementById('reset-search-btn')?.addEventListener('click', () => {
                this.searchInput.value = '';
                this.clearSearchBtn.style.display = 'none';
                this.currentQuery = '';
                this.currentPage = 1;
                this.loadCatalog();
            });
            return;
        }
        this.searchResultsContainer.innerHTML = '';
        matches.forEach((match, idx) => {
            const card = this.createGameCard(match.game, match.similarity, isSearching, idx + 1);
            this.searchResultsContainer.appendChild(card);
        });
    }
    /**
     * Create interactive game card
     */
    createGameCard(game, similarity, isSearching, rank) {
        const card = document.createElement('article');
        card.className = `game-card ${game.isSamtagonOriginal ? 'card-original' : ''}`;
        let badgeHtml = '';
        if (isSearching && similarity > 0) {
            const percentMatch = Math.round(similarity * 100);
            const scoreClass = similarity >= 0.88 ? 'score-excellent' : similarity >= 0.74 ? 'score-good' : 'score-fair';
            badgeHtml = `<span class="card-sim-badge ${scoreClass}">${percentMatch}% Match</span>`;
        }
        else {
            const pct = Math.round(game.rating * 20);
            badgeHtml = `<span class="card-rating-badge">&#9733; ${pct}% Positive</span>`;
        }
        const platformBadgesHtml = game.platforms
            .map((p) => {
            const iconSvg = p.badge === 'steam'
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
    renderPaginationBar() {
        if (!this.paginationControls)
            return;
        this.paginationControls.innerHTML = '';
        const current = this.currentPage;
        const total = this.totalPages;
        if (total <= 1)
            return;
        const createBtn = (label, pageTarget, disabled, active = false) => {
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
        const pagesToShow = new Set();
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
    openGameDetailModal(game) {
        if (!this.modalBackdrop || !this.modalContent)
            return;
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
        this.modalContent.querySelectorAll('.modal-similar-card').forEach((simCard) => {
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
    closeGameDetailModal() {
        if (!this.modalBackdrop)
            return;
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
//# sourceMappingURL=recommendations-page.js.map
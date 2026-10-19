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
import { GameMatch, PlatformLink } from './vector-engine.js';
import { OpenRouterEmbedder } from './openrouter-embed.js';
import gsap from 'gsap';

export type ArchetypeId = 'architect' | 'speedster' | 'explorer' | 'tactician';

export interface QuizQuestion {
  id: number;
  scenario: string;
  situation: string;
  options: {
    text: string;
    archetype: ArchetypeId;
    hint: string;
  }[];
}

export interface VectorGameRecommendation {
  id: string;
  title: string;
  image: string;
  developer: string;
  releaseYear: number;
  genres: string[];
  tags: string[];
  matchScore: number;
  similarity: number;
  platforms: PlatformLink[];
  description: string;
  source: 'pinecone' | 'local';
}

export interface GamerProfile {
  archetypeId: ArchetypeId;
  archetypeName: string;
  badge: string;
  desc: string;
  superpower: string;
  alignment: number;
  scores: Record<ArchetypeId, number>;
  answers: number[];
  customAnswers?: Record<number, string>;
  vectorQuery?: string;
  vectorRecommendations?: VectorGameRecommendation[];
  vectorSource?: 'pinecone' | 'local';
  completedAt: string;
}

export interface ArchetypeDatabaseRecommendation {
  title: string;
  matchScore: number;
  highlightNote: string;
}

const COOKIE_KEY = 'samtagon_gamer_profile';

const ARCHETYPES: Record<ArchetypeId, {
  name: string;
  badge: string;
  desc: string;
  superpower: string;
  catalogSearch: string;
}> = {
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

const ARCHETYPE_ICONS: Record<ArchetypeId, string> = {
  architect: `<svg class="archetype-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  speedster: `<svg class="archetype-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  explorer: `<svg class="archetype-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  tactician: `<svg class="archetype-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>`,
};

const ARCHETYPE_MINIMAL_META: Record<ArchetypeId, { trait: string; superpower: string }> = {
  architect: {
    trait: 'Systems & Automation',
    superpower: 'Macro-Engineering',
  },
  speedster: {
    trait: 'Kinetic Reflexes',
    superpower: 'Flow State Speed',
  },
  explorer: {
    trait: 'Atmosphere & Lore',
    superpower: 'World Discovery',
  },
  tactician: {
    trait: 'Precision Tactics',
    superpower: 'Calculated Mastery',
  },
};

const QUIZ_QUESTIONS: QuizQuestion[] = [
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

const ARCHETYPE_DATABASE_MATCHES: Record<ArchetypeId, ArchetypeDatabaseRecommendation[]> = {
  architect: [
    {
      title: 'Factorio',
      matchScore: 99,
      highlightNote: 'Your #1 Soulmate: The undisputed monument to automation. Engineer infinite logistic train networks, self-balancing assembly lines, and factory blueprints running with clockwork precision.',
    },
    {
      title: 'Minecraft',
      matchScore: 97,
      highlightNote: 'Limitless procedural voxel engineering. Construct intricate redstone logic gates, automated sorting systems, and grand architectural empires block by block.',
    },
    {
      title: 'Satisfactory',
      matchScore: 95,
      highlightNote: 'First-person 3D conveyor logistics, vertical mega-factory routing, and multi-tier nuclear power grid engineering across a majestic alien planet.',
    },
    {
      title: 'Cities: Skylines',
      matchScore: 92,
      highlightNote: 'Macro-civil infrastructure at its most granular. Route complex highway interchanges, balance public transit arteries, and optimize living urban supply chains.',
    },
    {
      title: 'RimWorld',
      matchScore: 90,
      highlightNote: 'Deep procedural systems simulation where temperature gradients, power conduit grids, and psychological causality generate infinite emergent stories.',
    },
    {
      title: 'Sid Meier’s Civilization VI',
      matchScore: 88,
      highlightNote: 'Grand systematic 4X strategy. Optimize geographic district adjacency yields, plan centuries ahead, and steer an empire from antiquity to the space age.',
    },
  ],
  speedster: [
    {
      title: 'DOOM Eternal',
      matchScore: 99,
      highlightNote: 'Your #1 Soulmate: Push-forward hyper-kinetic combat perfection. Switch weapons in split-seconds, grapple across arenas, and enter the absolute peak adrenaline flow state.',
    },
    {
      title: 'Counter-Strike 2',
      matchScore: 96,
      highlightNote: 'Sub-millisecond reaction speeds, pinpoint recoil compensation, and the unforgettable high of clutch 1v4 defuses with zero margin for error.',
    },
    {
      title: 'Fortnite',
      matchScore: 94,
      highlightNote: 'Lightning-fast building edits, split-second shotgun flick shots, and dynamic momentum rotations in high-stakes Battle Royale engagements.',
    },
    {
      title: 'Hades',
      matchScore: 92,
      highlightNote: 'Instantaneous dash-strike reflexes, weaving through lethal bullet storms, and fluid muscle-memory mastery in the depths of the Underworld.',
    },
    {
      title: 'Apex Legends',
      matchScore: 90,
      highlightNote: 'Peak velocity movement mechanics—slide-jumping down slopes, wall-bouncing into gunfights, and clutching fast-paced squad wipeouts.',
    },
    {
      title: 'Rocket League',
      matchScore: 88,
      highlightNote: 'Supersonic 3D aerial acrobatics and split-second spatial physics predictions pushing your reflexes to the absolute peak.',
    },
  ],
  explorer: [
    {
      title: 'The Legend of Zelda: Tears of the Kingdom',
      matchScore: 99,
      highlightNote: 'Your #1 Soulmate: The golden pinnacle of environmental wonder. Soar through sky islands, delve into mysterious depths, and experiment with boundless emergent Ultrahand physics.',
    },
    {
      title: 'Stardew Valley',
      matchScore: 97,
      highlightNote: 'The warmest cozy escapism in gaming. Nurture an overgrown farmstead, listen to seasonal rain on the porch, and forge heartwarming relationships.',
    },
    {
      title: 'Outer Wilds',
      matchScore: 95,
      highlightNote: 'A breathtaking campfire-roasted space mystery driven solely by your organic curiosity, uncovering forgotten ancient civilizations across a miniature solar system.',
    },
    {
      title: 'Red Dead Redemption 2',
      matchScore: 93,
      highlightNote: 'The most detailed living natural ecosystem ever coded. Hunt across misty mountain valleys, sit by crackling campfires, and absorb peerless narrative depth.',
    },
    {
      title: 'Hollow Knight',
      matchScore: 90,
      highlightNote: 'Atmospheric, melancholic subterranean wonder. Uncover the haunting history of ruined Hallownest through evocative environmental storytelling.',
    },
    {
      title: 'Subnautica',
      matchScore: 88,
      highlightNote: 'Peerless oceanic immersion—dive from sunlit, vibrant coral shallows down into bioluminescent abyssal trenches teeming with awe-inspiring fauna.',
    },
  ],
  tactician: [
    {
      title: 'Sekiro: Shadows Die Twice',
      matchScore: 99,
      highlightNote: 'Your #1 Soulmate: Frame-perfect rhythm deflections and posture destruction. Dissect enemy attack telegraphs with surgical precision and zero wasted movement.',
    },
    {
      title: 'Baldur’s Gate 3',
      matchScore: 97,
      highlightNote: 'Unrivaled tactical turn-based freedom. Exploit high ground, ignite chemical surfaces, and calculate multi-turn spell synergies to outsmart overwhelming odds.',
    },
    {
      title: 'Elden Ring',
      matchScore: 95,
      highlightNote: 'Meticulous boss pattern dissection, poise-break timing, and calculated build synergies that turn punishing adversity into triumph.',
    },
    {
      title: 'Valorant',
      matchScore: 93,
      highlightNote: 'Pixel-accurate crosshair placement, tactical ability denial, utility lineups, and deep economy management in high-stakes tactical rounds.',
    },
    {
      title: 'Black Myth: Wukong',
      matchScore: 91,
      highlightNote: 'Frame-tight perfect dodges, dynamic staff stance transitions, and calculated stamina/focus management against legendary mythic titans.',
    },
    {
      title: 'Slay the Spire',
      matchScore: 89,
      highlightNote: 'Mathematical deckbuilding mastery. Calculate draw probabilities, construct game-breaking relic synergies, and out-think every turn.',
    },
  ],
};

class RecommendationsApp {
  private audio: ProceduralAudio;
  private currentPage: number = 1;
  private totalPages: number = 417;
  private totalCount: number = 5000;
  private currentQuery: string = '';
  private currentMatches: GameMatch[] = [];

  // Mode Tabs & View Elements
  private activeTab: 'quiz' | 'explore' = 'quiz';
  private tabQuizBtn!: HTMLElement | null;
  private tabExploreBtn!: HTMLElement | null;
  private tabQuizLabel!: HTMLElement | null;
  private viewQuiz!: HTMLElement | null;
  private viewExplore!: HTMLElement | null;
  private skipToExploreBtn!: HTMLElement | null;
  private filterControllerBtn!: HTMLElement | null;
  private filterMultiplayerBtn!: HTMLElement | null;
  private filterTopRatedBtn!: HTMLElement | null;
  private filterRandomBtn!: HTMLElement | null;
  private filterNeuralBtn!: HTMLElement | null;
  private neuralStatusDot!: HTMLElement | null;

  // Quiz State
  private currentQuestionIndex: number = 0;
  private userAnswers: number[] = [];
  private customAnswers: Map<number, string> = new Map();
  private currentProfile: GamerProfile | null = null;

  // DOM Elements
  private quizActiveBox!: HTMLElement | null;
  private quizProfileBox!: HTMLElement | null;
  private quizStepIndicator!: HTMLElement | null;
  private quizTrackFill!: HTMLElement | null;
  private quizBody!: HTMLElement | null;
  private quizBackBtn!: HTMLElement | null;

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
  private currentHls: any = null;

  constructor() {
    this.audio = new ProceduralAudio();
    this.initDOM();
    this.setupTheme();
    this.setupTabs();
    this.setupSearchControllers();
    this.setupEventListeners();
    this.setupSmoothPageTransitions();
    this.initQuiz();
    this.checkInitialRoute();
    this.loadCatalog();

    window.addEventListener('hashchange', () => {
      this.checkInitialRoute();
    });
  }

  private checkInitialRoute(): void {
    const hash = window.location.hash.toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab')?.toLowerCase();
    const queryParam = urlParams.get('q') || urlParams.get('search') || urlParams.get('query');

    if (hash === '#explore' || tabParam === 'explore' || queryParam) {
      this.switchTab('explore', queryParam || undefined);
      setTimeout(() => {
        this.searchInput?.focus();
      }, 150);
    }
  }

  private initDOM(): void {
    this.tabQuizBtn = document.getElementById('tab-quiz-btn');
    this.tabExploreBtn = document.getElementById('tab-explore-btn');
    this.tabQuizLabel = document.getElementById('tab-quiz-label');
    this.viewQuiz = document.getElementById('view-quiz');
    this.viewExplore = document.getElementById('view-explore');
    this.skipToExploreBtn = document.getElementById('skip-to-explore-btn');

    this.filterControllerBtn = document.getElementById('filter-controller-btn');
    this.filterMultiplayerBtn = document.getElementById('filter-multiplayer-btn');
    this.filterTopRatedBtn = document.getElementById('filter-toprated-btn');
    this.filterRandomBtn = document.getElementById('filter-random-btn');
    this.filterNeuralBtn = document.getElementById('filter-neural-btn');
    this.neuralStatusDot = document.getElementById('neural-status-dot');

    this.quizActiveBox = document.getElementById('quiz-active-box');
    this.quizProfileBox = document.getElementById('quiz-profile-box');
    this.quizStepIndicator = document.getElementById('quiz-step-indicator');
    this.quizTrackFill = document.getElementById('quiz-track-fill');
    this.quizBody = document.getElementById('quiz-body');
    this.quizBackBtn = document.getElementById('quiz-back-btn');

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

  private setupTabs(): void {
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

  public switchTab(tab: 'quiz' | 'explore', searchKeyword?: string): void {
    this.activeTab = tab;
    if (tab === 'quiz') {
      if (this.viewQuiz) this.viewQuiz.style.display = 'block';
      if (this.viewExplore) this.viewExplore.style.display = 'none';
      this.tabQuizBtn?.classList.add('active');
      this.tabQuizBtn?.setAttribute('aria-selected', 'true');
      this.tabExploreBtn?.classList.remove('active');
      this.tabExploreBtn?.setAttribute('aria-selected', 'false');
      this.audio.playChime(523.25, 0.06);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (this.viewQuiz) this.viewQuiz.style.display = 'none';
      if (this.viewExplore) this.viewExplore.style.display = 'block';
      this.tabExploreBtn?.classList.add('active');
      this.tabExploreBtn?.setAttribute('aria-selected', 'true');
      this.tabQuizBtn?.classList.remove('active');
      this.tabQuizBtn?.setAttribute('aria-selected', 'false');
      this.audio.playChime(659.25, 0.06);

      if (searchKeyword !== undefined) {
        if (this.searchInput) {
          this.searchInput.value = searchKeyword;
          if (this.clearSearchBtn) this.clearSearchBtn.style.display = searchKeyword ? 'inline-flex' : 'none';
        }
        this.currentQuery = searchKeyword;
        this.currentPage = 1;
        this.loadCatalog();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private resetControllerButtons(): void {
    [
      this.filterControllerBtn,
      this.filterMultiplayerBtn,
      this.filterTopRatedBtn,
      this.filterRandomBtn,
    ].forEach((btn) => btn?.classList.remove('active'));
  }

  private setupSearchControllers(): void {
    // 1. Controller / Gamepad Action Mode Toggle
    this.filterControllerBtn?.addEventListener('click', () => {
      const isCurrentlyActive = this.filterControllerBtn?.classList.contains('active');
      this.resetControllerButtons();

      if (isCurrentlyActive) {
        this.currentQuery = '';
        if (this.searchInput) this.searchInput.value = '';
        if (this.clearSearchBtn) this.clearSearchBtn.style.display = 'none';
      } else {
        this.filterControllerBtn?.classList.add('active');
        this.currentQuery = 'Controller';
        if (this.searchInput) this.searchInput.value = 'Controller';
        if (this.clearSearchBtn) this.clearSearchBtn.style.display = 'inline-flex';
      }
      this.currentPage = 1;
      this.audio.playQuizSelection();
      this.loadCatalog();
    });

    // 2. Multiplayer / Co-op Mode Toggle
    this.filterMultiplayerBtn?.addEventListener('click', () => {
      const isCurrentlyActive = this.filterMultiplayerBtn?.classList.contains('active');
      this.resetControllerButtons();

      if (isCurrentlyActive) {
        this.currentQuery = '';
        if (this.searchInput) this.searchInput.value = '';
        if (this.clearSearchBtn) this.clearSearchBtn.style.display = 'none';
      } else {
        this.filterMultiplayerBtn?.classList.add('active');
        this.currentQuery = 'Co-op';
        if (this.searchInput) this.searchInput.value = 'Co-op';
        if (this.clearSearchBtn) this.clearSearchBtn.style.display = 'inline-flex';
      }
      this.currentPage = 1;
      this.audio.playQuizSelection();
      this.loadCatalog();
    });

    // 3. Top Rated (98%+) Mode Toggle
    this.filterTopRatedBtn?.addEventListener('click', () => {
      const isCurrentlyActive = this.filterTopRatedBtn?.classList.contains('active');
      this.resetControllerButtons();

      if (isCurrentlyActive) {
        this.currentQuery = '';
        if (this.searchInput) this.searchInput.value = '';
        if (this.clearSearchBtn) this.clearSearchBtn.style.display = 'none';
      } else {
        this.filterTopRatedBtn?.classList.add('active');
        this.currentQuery = '99%';
        if (this.searchInput) this.searchInput.value = '99%';
        if (this.clearSearchBtn) this.clearSearchBtn.style.display = 'inline-flex';
      }
      this.currentPage = 1;
      this.audio.playQuizSelection();
      this.loadCatalog();
    });

    // 4. Random Discovery (Dice) Tool
    this.filterRandomBtn?.addEventListener('click', () => {
      this.resetControllerButtons();
      this.filterRandomBtn?.classList.add('active');
      setTimeout(() => this.filterRandomBtn?.classList.remove('active'), 350);

      const randomTarget = Math.floor(Math.random() * Math.max(1, this.totalPages)) + 1;
      this.audio.playChime(880, 0.08);
      setTimeout(() => this.audio.playChime(1046.5, 0.08), 80);
      this.goToPage(randomTarget);
    });

    // 5. Neural AI Vector Search Controller (OpenRouter)
    this.updateNeuralUI();
    this.filterNeuralBtn?.addEventListener('click', () => {
      this.audio.playQuizSelection();
      const existingKey = OpenRouterEmbedder.getApiKey();
      if (existingKey) {
        const change = confirm(`Neural AI Search is ACTIVE with OpenRouter.\nModel: ${OpenRouterEmbedder.getModel()}\n\nWould you like to clear or change your API key?`);
        if (change) {
          const newKey = prompt('Enter new OpenRouter API Key (leave empty to reset):', existingKey);
          if (newKey !== null) {
            OpenRouterEmbedder.setApiKey(newKey);
            this.updateNeuralUI();
            this.loadCatalog();
          }
        }
      } else {
        const enteredKey = prompt(
          'Connect OpenRouter Neural Vector Search:\n\n' +
          '1. Add OPENROUTER_API_KEY in your .env file, or\n' +
          '2. Paste your OpenRouter API Key below (stored locally in browser):\n\n' +
          'Get your API key at https://openrouter.ai/keys'
        );
        if (enteredKey && enteredKey.trim().length > 0) {
          OpenRouterEmbedder.setApiKey(enteredKey.trim());
          this.updateNeuralUI();
          this.loadCatalog();
        }
      }
    });
  }

  private updateNeuralUI(): void {
    const hasClientKey = OpenRouterEmbedder.isAvailable();
    if (this.neuralStatusDot) {
      this.neuralStatusDot.style.display = hasClientKey ? 'block' : 'none';
    }

    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          const isPinecone = data.pinecone?.configured;
          const isOpenRouter = data.openrouter?.configured;
          const isLive = isPinecone || isOpenRouter || hasClientKey;

          if (this.neuralStatusDot) {
            this.neuralStatusDot.style.display = isLive ? 'block' : 'none';
          }
          if (this.filterNeuralBtn) {
            if (isLive) {
              this.filterNeuralBtn.classList.add('neural-active');
              this.filterNeuralBtn.title = isPinecone
                ? `⚡ Pinecone Vector Search Active (${data.openrouter?.model || 'OpenRouter'})`
                : `⚡ OpenRouter Neural Search Active (${data.openrouter?.model || 'OpenRouter'})`;
            } else {
              this.filterNeuralBtn.classList.remove('neural-active');
              this.filterNeuralBtn.title = 'Neural Vector Search (Configure .env with OPENROUTER_API_KEY & PINECONE_API_KEY)';
            }
          }
        }
      })
      .catch(() => {
        if (this.filterNeuralBtn && hasClientKey) {
          this.filterNeuralBtn.classList.add('neural-active');
          this.filterNeuralBtn.title = `Neural AI Vector Search Active (OpenRouter / ${OpenRouterEmbedder.getModel()})`;
        }
      });
  }

  private setupSmoothPageTransitions(): void {
    // Page load gentle entrance
    gsap.fromTo(document.body, { opacity: 0 }, { opacity: 1, duration: 0.32, ease: 'power2.out' });

    // Back to home button with silky smooth exit
    const backBtn = document.querySelector<HTMLAnchorElement>('.rec-back-btn');
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

  private initQuiz(): void {
    const saved = this.loadGamerProfileCookie();
    if (saved) {
      this.currentProfile = saved;
      if (saved.customAnswers) {
        this.customAnswers = new Map(
          Object.entries(saved.customAnswers).map(([k, v]) => [parseInt(k, 10), v])
        );
      }
      this.renderProfileDashboard();
    } else {
      this.currentQuestionIndex = 0;
      this.userAnswers = [];
      this.customAnswers.clear();
      this.renderQuestion(0);
    }

    this.quizBackBtn?.addEventListener('click', () => {
      this.prevQuestion();
    });

    // Keyboard shortcuts: 1, 2, 3, 4, 5 or A, B, C, D, E
    window.addEventListener('keydown', (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (!this.quizActiveBox || this.quizActiveBox.style.display === 'none') return;

      const key = e.key.toLowerCase();
      if (key === '1' || key === 'a') this.selectOption(0);
      else if (key === '2' || key === 'b') this.selectOption(1);
      else if (key === '3' || key === 'c') this.selectOption(2);
      else if (key === '4' || key === 'd') this.selectOption(3);
      else if (key === '5' || key === 'e') {
        const customInput = this.quizBody?.querySelector<HTMLInputElement>('.custom-answer-input');
        if (customInput) {
          e.preventDefault();
          customInput.focus();
          customInput.select();
        }
      }
    });
  }

  private renderQuestion(index: number): void {
    if (!this.quizActiveBox || !this.quizBody) return;
    this.quizActiveBox.style.display = 'block';
    if (this.quizProfileBox) this.quizProfileBox.style.display = 'none';
    document.querySelector('.quiz-screen-container')?.classList.remove('has-profile');

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
      <div class="quiz-option-card ${this.userAnswers[index] === i ? 'selected' : ''}" data-opt-idx="${i}" role="button" tabindex="0">
        <span class="option-key-badge">${keyLabels[i]}</span>
        <div class="option-text">${opt.text}</div>
      </div>
    `).join('');

    const savedCustomText = this.customAnswers.get(index) || '';
    const isSelectedCustom = this.userAnswers[index] === 4;

    const customOptionHtml = `
      <div class="quiz-option-card quiz-option-custom ${isSelectedCustom ? 'selected' : ''}" data-opt-idx="4" role="button" tabindex="0">
        <div class="custom-option-header">
          <span class="option-key-badge">E</span>
          <span class="custom-pill-badge">✍️ Custom Answer</span>
          <span class="custom-hint-label">Describe your own playstyle or preference (Vector AI embeds your exact text)</span>
        </div>
        <div class="custom-input-wrap">
          <input
            type="text"
            class="custom-answer-input"
            placeholder="Type your own custom answer, tactic, or preference (press Enter or Submit)..."
            value="${savedCustomText.replace(/"/g, '&quot;')}"
            maxlength="240"
            onclick="event.stopPropagation()"
          />
          <button class="custom-submit-btn" type="button" onclick="event.stopPropagation()">
            <span>Submit Choice</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    `;

    this.quizBody.innerHTML = `
      <h2 class="quiz-scenario-title">${q.scenario}</h2>
      <p class="quiz-scenario-text">${q.situation}</p>
      <div class="quiz-options-grid">
        ${optionsHtml}
        ${customOptionHtml}
      </div>
    `;

    // Hook click listeners on options 0-3
    this.quizBody.querySelectorAll<HTMLElement>('.quiz-option-card:not(.quiz-option-custom)').forEach((card) => {
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

    // Hook Custom Option (index 4)
    const customCard = this.quizBody.querySelector<HTMLElement>('.quiz-option-custom');
    const customInput = this.quizBody.querySelector<HTMLInputElement>('.custom-answer-input');
    const customSubmitBtn = this.quizBody.querySelector<HTMLButtonElement>('.custom-submit-btn');

    if (customCard && customInput) {
      customCard.addEventListener('click', () => {
        customInput.focus();
      });

      const handleCustomSubmit = () => {
        const val = customInput.value.trim();
        if (val) {
          this.selectOption(4, val);
        } else {
          customInput.placeholder = '⚠️ Please enter your custom answer here...';
          customInput.focus();
        }
      };

      customSubmitBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        handleCustomSubmit();
      });

      customInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          handleCustomSubmit();
        }
      });
    }

    // Smooth subtle entry animation
    gsap.fromTo(this.quizBody, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private selectOption(optIndex: number, customText?: string): void {
    if (optIndex < 0 || optIndex > 4) return;
    this.audio.playQuizSelection();

    this.userAnswers[this.currentQuestionIndex] = optIndex;

    if (optIndex === 4) {
      const text = customText || this.customAnswers.get(this.currentQuestionIndex) || 'Custom playstyle choice';
      this.customAnswers.set(this.currentQuestionIndex, text);
    } else {
      this.customAnswers.delete(this.currentQuestionIndex);
    }

    const cards = this.quizBody?.querySelectorAll<HTMLElement>('.quiz-option-card');
    if (cards && cards[optIndex]) {
      cards.forEach(c => c.classList.remove('selected'));
      cards[optIndex].classList.add('selected');
    }

    setTimeout(() => {
      if (this.currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        this.renderQuestion(this.currentQuestionIndex + 1);
      } else {
        this.completeQuiz();
      }
    }, 180);
  }

  private prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.audio.playChime(440, 0.05);
      this.renderQuestion(this.currentQuestionIndex - 1);
    }
  }

  private async completeQuiz(): Promise<void> {
    // Show high-tech loading state while vector embeddings are generated
    if (this.quizActiveBox) this.quizActiveBox.style.display = 'none';
    if (this.quizProfileBox) {
      this.quizProfileBox.style.display = 'block';
      this.quizProfileBox.innerHTML = `
        <div class="quiz-loading-vector-box">
          <div class="vector-pulse-spinner"></div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0; color: var(--text-primary);">
            Searching Vector Space for Your Soulmate Games...
          </h3>
          <p style="color: var(--text-secondary); max-width: 520px; font-size: 0.95rem; margin: 0; line-height: 1.5;">
            Generating 1024-dimensional semantic embeddings via OpenRouter & querying Pinecone vector database with your custom responses.
          </p>
          <div class="vector-model-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            <span>liquid/lfm-2.5-embedding-350m:free &bull; Pinecone DB</span>
          </div>
        </div>
      `;
    }

    // Tally scores across the 4 archetypes
    const scores: Record<ArchetypeId, number> = {
      architect: 0,
      speedster: 0,
      explorer: 0,
      tactician: 0,
    };

    const querySnippets: string[] = [];

    this.userAnswers.forEach((ansIdx, qIdx) => {
      const q = QUIZ_QUESTIONS[qIdx];
      if (!q) return;

      if (ansIdx === 4) {
        const custom = this.customAnswers.get(qIdx) || '';
        querySnippets.push(`${q.scenario}: ${custom}`);

        // Analyze custom keywords for archetype attribution
        const lower = custom.toLowerCase();
        let matched = false;
        if (/build|craft|automat|system|puzzle|engin|logic|creat|manag|base|train|factor|plan|simulat/.test(lower)) {
          scores.architect += 1.5;
          matched = true;
        }
        if (/fast|speed|reflex|action|fps|shoot|drift|dash|rush|adrenalin|fight|combo|run|bullet/.test(lower)) {
          scores.speedster += 1.5;
          matched = true;
        }
        if (/explor|world|lore|story|natur|cozi|cozy|secret|wander|rpg|adventur|camp|fish|chill|relax|peace/.test(lower)) {
          scores.explorer += 1.5;
          matched = true;
        }
        if (/tactic|strateg|parr|souls|hard|calculat|master|stealth|precis|turn-based|timing|execut/.test(lower)) {
          scores.tactician += 1.5;
          matched = true;
        }
        if (!matched) {
          scores.explorer += 0.5;
          scores.architect += 0.5;
        }
      } else if (q.options[ansIdx]) {
        scores[q.options[ansIdx].archetype] += 1;
        querySnippets.push(`${q.scenario}: ${q.options[ansIdx].text} (${q.options[ansIdx].hint})`);
      }
    });

    const vectorQuery = querySnippets.join('. ');

    // Find dominant archetype
    const entries = Object.entries(scores) as [ArchetypeId, number][];
    entries.sort((a, b) => b[1] - a[1]);
    const dominantId = entries[0][0];
    const topScore = entries[0][1];
    const alignment = Math.min(99, Math.max(88, Math.round((topScore / QUIZ_QUESTIONS.length) * 100)));

    const archInfo = ARCHETYPES[dominantId];

    // Perform Vector Embedding Search via API & Pinecone
    let vectorMatches: VectorGameRecommendation[] = [];
    let vectorSource: 'pinecone' | 'local' = 'local';

    try {
      const apiRes = await fetch(`/api/search?q=${encodeURIComponent(vectorQuery)}&limit=12`);
      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.success && Array.isArray(data.matches) && data.matches.length > 0) {
          vectorSource = data.source || 'pinecone';
          vectorMatches = data.matches.slice(0, 6).map((m: any, idx: number) => {
            const g = m.game;
            const isSteam = typeof g.id === 'string' && g.id.startsWith('steam-');
            const numericSteamId = isSteam ? parseInt(g.id.replace('steam-', ''), 10) : null;
            const storeUrl = g.storeUrl || (numericSteamId ? `https://store.steampowered.com/app/${numericSteamId}/` : 'https://store.steampowered.com/');
            const sim = typeof m.similarity === 'number' && m.similarity > 0 ? m.similarity : (0.98 - idx * 0.02);
            const matchScore = Math.min(99, Math.max(78, Math.max(Math.round(sim * 100), 98 - idx * 2)));

            return {
              id: g.id,
              title: g.title,
              image: g.image,
              developer: g.studio || g.developer || 'Game Studio',
              releaseYear: g.year || g.releaseYear || 2023,
              genres: Array.isArray(g.genres) ? g.genres : [g.genres || 'Action'],
              tags: Array.isArray(g.tags) ? g.tags : [g.tags || 'Recommended'],
              matchScore,
              similarity: sim,
              platforms: [{ name: g.badge || 'steam', url: storeUrl, badge: ((g.badge as any) || 'steam') as PlatformLink['badge'] }],
              description: g.desc || g.description || '',
              source: vectorSource,
            };
          });
        }
      }
    } catch (err) {
      console.warn('[Quiz] Vector API search failed, falling back to local vector catalog:', err);
    }

    if (vectorMatches.length === 0) {
      // Fallback to local catalog hybrid search
      const localResult = CatalogEngine.searchCatalog(vectorQuery, 1);
      vectorMatches = localResult.matches.slice(0, 6).map((m, idx) => ({
        id: m.game.id,
        title: m.game.title,
        image: m.game.image,
        developer: m.game.developer,
        releaseYear: m.game.releaseYear,
        genres: m.game.genres,
        tags: m.game.tags,
        matchScore: Math.min(99, Math.max(78, Math.max(Math.round(m.similarity * 100), 98 - idx * 2))),
        similarity: m.similarity,
        platforms: m.game.platforms,
        description: m.game.description,
        source: 'local' as const,
      }));
    }

    // Convert customAnswers map to serializable object
    const customAnswersObj: Record<number, string> = {};
    this.customAnswers.forEach((v, k) => {
      customAnswersObj[k] = v;
    });

    const profile: GamerProfile = {
      archetypeId: dominantId,
      archetypeName: archInfo.name,
      badge: archInfo.badge,
      desc: archInfo.desc,
      superpower: archInfo.superpower,
      alignment,
      scores,
      answers: [...this.userAnswers],
      customAnswers: customAnswersObj,
      vectorQuery,
      vectorRecommendations: vectorMatches,
      vectorSource,
      completedAt: new Date().toISOString(),
    };

    this.currentProfile = profile;
    this.saveGamerProfileCookie(profile);

    this.audio.playArchetypeFanfare();
    this.renderProfileDashboard();
  }

  private renderProfileDashboard(): void {
    if (!this.currentProfile || !this.quizProfileBox) return;

    if (this.quizActiveBox) this.quizActiveBox.style.display = 'none';
    this.quizProfileBox.style.display = 'block';
    document.querySelector('.quiz-screen-container')?.classList.add('has-profile');

    if (this.tabQuizLabel) {
      this.tabQuizLabel.textContent = 'Gamer Profile';
    }

    const p = this.currentProfile;
    const archInfo = ARCHETYPES[p.archetypeId];
    const meta = ARCHETYPE_MINIMAL_META[p.archetypeId] || { trait: 'Gamer Instinct', superpower: 'Core Alignment' };

    // Use dynamically retrieved vector recommendations strictly
    const recList: VectorGameRecommendation[] = (p.vectorRecommendations && p.vectorRecommendations.length > 0)
      ? p.vectorRecommendations
      : (ARCHETYPE_DATABASE_MATCHES[p.archetypeId] || []).map(r => {
          const g = CatalogEngine.getCuratedByTitle(r.title);
          return {
            id: g?.id || r.title,
            title: r.title,
            image: g?.image || 'assets/images/games/minecraft.png',
            developer: g?.developer || 'Game Studio',
            releaseYear: g?.releaseYear || 2023,
            genres: g?.genres || ['Action', 'Adventure'],
            tags: g?.tags || ['Atmospheric', 'Highly Rated'],
            matchScore: r.matchScore,
            similarity: r.matchScore / 100,
            platforms: g?.platforms || [{ name: 'Steam', url: 'https://store.steampowered.com/', badge: 'steam' }],
            description: r.highlightNote,
            source: 'local' as const,
          };
        });

    const gamesGridHtml = recList.map((rec, idx) => {
      const isTop = idx === 0;
      const storeUrl = rec.platforms[0]?.url || 'https://store.steampowered.com/';
      const storeName = rec.platforms[0]?.name || 'Steam Store';
      const tagPills = rec.tags.slice(0, 3).map(t => `<span class="card-genre-pill">#${t}</span>`).join('');

      return `
        <div class="arranged-game-card ${isTop ? 'top-soulmate' : ''}" data-game-title="${rec.title}">
          <img src="${rec.image}" alt="${rec.title}" class="card-bg-img" loading="lazy" onerror="this.onerror=null; this.src='https://cdn.akamai.steamstatic.com/steam/apps/1222140/capsule_616x353.jpg';" />
          <div class="card-scrim"></div>
          <div class="card-top-bar">
            <div class="card-badge-left">
              ${isTop ? '<span class="soulmate-flag-tag"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> #1 SOULMATE</span>' : ''}
              <span class="card-sim-badge score-excellent">✨ ${rec.matchScore}% Match</span>
            </div>
            ${rec.source === 'pinecone' ? '<span class="card-pinecone-tag" title="Matched via Pinecone 1024-D Vector Index">Pinecone</span>' : ''}
          </div>
          <div class="card-overlay-content">
            <div class="card-title-row">
              <h4 class="card-title">${rec.title}</h4>
              <span class="card-year">${rec.releaseYear}</span>
            </div>
            <div class="card-meta-line">${rec.developer} &bull; ${rec.genres.slice(0, 2).join(' / ')}</div>
            <div class="card-tag-row">${tagPills}</div>
            <div class="card-action-bar">
              <a href="${storeUrl}" target="_blank" rel="noopener noreferrer" class="card-btn-action primary" onclick="event.stopPropagation()" title="${storeName}">
                <span>Store</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
              </a>
              <button class="card-btn-action secondary icon-only arranged-details-btn" data-game-title="${rec.title}" onclick="event.stopPropagation()" title="Game Details" aria-label="Game Details">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.quizProfileBox.innerHTML = `
      <div class="profile-hero-minimal">
        <div class="profile-meta-row">
          <div class="profile-identity">
            <div class="profile-emblem-badge" aria-hidden="true">
              ${ARCHETYPE_ICONS[p.archetypeId]}
            </div>
            <div>
              <div class="profile-name-row">
                <h2 class="profile-title">${p.archetypeName}</h2>
                <span class="profile-match-pill">${p.alignment}%</span>
              </div>
              <div class="profile-trait-tag">${meta.trait} &bull; ${meta.superpower}</div>
            </div>
          </div>

          <div class="profile-actions-row">
            <button id="retake-quiz-btn" class="profile-ctrl-btn" title="Retake Quiz" aria-label="Retake Quiz">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
              <span>Retake</span>
            </button>

            <button id="unlock-explore-btn" class="profile-ctrl-btn primary" title="Explore games matching your quiz answers" aria-label="Explore games">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Explore Similar (${archInfo.catalogSearch})</span>
            </button>

            <div class="profile-saved-indicator" title="Profile saved in cookies & localStorage" aria-label="Profile saved in cookies & localStorage">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="matches-header-minimal">
        <div class="matches-heading-wrap">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <h3 class="matches-title">Vector-Matched Games (${recList.length})</h3>
          <span class="vector-model-tag" style="margin-left: 8px;">✨ OpenRouter 1024-D + Pinecone</span>
        </div>

        <button id="profile-explore-all-btn" class="matches-all-btn" title="Explore similar games in catalog" aria-label="Explore similar games">
          <span>Explore Similar in Catalog</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
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
      const q = p.vectorQuery ? p.vectorQuery.slice(0, 50) : archInfo.catalogSearch;
      this.switchTab('explore', q);
    });

    // Hook Explore All Games Link
    const exploreAllBtn = document.getElementById('profile-explore-all-btn');
    exploreAllBtn?.addEventListener('click', () => {
      const q = p.vectorQuery ? p.vectorQuery.slice(0, 50) : archInfo.catalogSearch;
      this.switchTab('explore', q);
    });

    // Hook card clicks and Details buttons to open the rich Game Detail Modal
    this.quizProfileBox.querySelectorAll<HTMLElement>('.arranged-game-card').forEach((card) => {
      const title = card.getAttribute('data-game-title');
      const rec = recList.find(r => r.title === title);
      let game = title ? CatalogEngine.getCuratedByTitle(title) : null;
      if (!game && rec) {
        // Construct ExtendedGameItem from VectorGameRecommendation
        game = {
          id: rec.id,
          title: rec.title,
          subtitle: `${rec.genres.join(' • ')} Experience`,
          description: rec.description,
          image: rec.image,
          genres: rec.genres,
          tags: rec.tags,
          rating: 4.9,
          releaseYear: rec.releaseYear,
          developer: rec.developer,
          studioUrl: rec.platforms[0]?.url || 'https://store.steampowered.com/',
          videoTrailer: '',
          reviewsSummary: 'Very Positive',
          reviewCount: 'Verified Global Reviews',
          platforms: rec.platforms,
          embedding: [],
        };
      }

      if (game) {
        card.addEventListener('click', () => {
          this.audio.playChime(783.99, 0.06);
          this.openGameDetailModal(game!);
        });

        const detailsBtn = card.querySelector<HTMLElement>('.arranged-details-btn');
        detailsBtn?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.audio.playChime(783.99, 0.06);
          this.openGameDetailModal(game!);
        });
      }
    });

    // Smooth reveal animation
    gsap.fromTo(this.quizProfileBox, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
  }

  private filterCatalogByArchetype(keyword: string): void {
    this.switchTab('explore', keyword);
  }

  private retakeQuiz(): void {
    this.clearGamerProfileCookie();
    this.currentProfile = null;
    this.userAnswers = [];
    this.customAnswers.clear();
    document.querySelector('.quiz-screen-container')?.classList.remove('has-profile');
    if (this.tabQuizLabel) {
      this.tabQuizLabel.textContent = 'Question 1 of 10';
    }
    this.audio.playChime(523.25, 0.08);
    this.switchTab('quiz');
    this.renderQuestion(0);
  }

  private saveGamerProfileCookie(profile: GamerProfile): void {
    const jsonStr = JSON.stringify(profile);
    const maxAge = 365 * 24 * 60 * 60; // 1 full year
    document.cookie = `${COOKIE_KEY}=${encodeURIComponent(jsonStr)}; path=/; max-age=${maxAge}; SameSite=Lax`;
    try {
      localStorage.setItem(COOKIE_KEY, jsonStr);
    } catch {
      // fallback
    }
  }

  private loadGamerProfileCookie(): GamerProfile | null {
    const cookieMatch = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_KEY}=([^;]+)`));
    if (cookieMatch) {
      try {
        return JSON.parse(decodeURIComponent(cookieMatch[1]));
      } catch {
        // ignore
      }
    }
    try {
      const local = localStorage.getItem(COOKIE_KEY);
      if (local) return JSON.parse(local);
    } catch {
      // ignore
    }
    return null;
  }

  private clearGamerProfileCookie(): void {
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
    try {
      localStorage.removeItem(COOKIE_KEY);
    } catch {
      // ignore
    }
  }

  private setupEventListeners(): void {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    this.searchInput?.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const val = target.value;
      this.resetControllerButtons();

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
      this.resetControllerButtons();
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
  private async loadCatalog(): Promise<void> {
    const querySnapshot = this.currentQuery.trim();
    const isSearching = querySnapshot.length > 0;

    if (isSearching) {
      if (this.catalogHeading) {
        this.catalogHeading.textContent = `Search Results for "${this.currentQuery}"`;
      }
      if (this.resultCountSpan) {
        this.resultCountSpan.innerHTML = `🔍 Searching vectors...`;
      }

      const vectorResult = await CatalogEngine.searchCatalogVectorAPI(querySnapshot, this.currentPage);
      // Guard against race conditions if query changed while fetching
      if (this.currentQuery.trim() !== querySnapshot) return;

      this.currentMatches = vectorResult.matches;
      this.totalPages = vectorResult.totalPages;
      this.totalCount = vectorResult.totalCount;
      this.currentPage = vectorResult.currentPage;

      if (this.resultCountSpan) {
        if (vectorResult.source === 'pinecone') {
          this.resultCountSpan.innerHTML = `⚡ Pinecone Vector Search &bull; ${this.totalCount} matches &bull; Page ${this.currentPage} of ${this.totalPages}`;
        } else {
          this.resultCountSpan.innerHTML = `${this.totalCount} matching titles &bull; Page ${this.currentPage} of ${this.totalPages}`;
        }
      }

      this.renderGamesGrid(this.currentMatches, true);
      this.renderPaginationBar();
      return;
    }

    // Default browse mode (empty search query)
    const result = CatalogEngine.searchCatalog('', this.currentPage);
    this.currentMatches = result.matches;
    this.totalPages = result.totalPages;
    this.totalCount = result.totalCount;
    this.currentPage = result.currentPage;

    if (this.catalogHeading) {
      this.catalogHeading.textContent = 'Explore Catalog';
    }
    if (this.resultCountSpan) {
      this.resultCountSpan.innerHTML = `Page ${this.currentPage.toLocaleString()} of ${this.totalPages.toLocaleString()} &bull; 5,000 real titles`;
    }

    this.renderGamesGrid(this.currentMatches, false);
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

    const storeUrl = game.platforms[0]?.url || 'https://store.steampowered.com/';
    const storeName = game.platforms[0]?.name || 'Steam Store';

    card.innerHTML = `
      <img src="${game.image}" alt="${game.title}" class="card-bg-img" loading="lazy" onerror="this.onerror=null; this.src='https://cdn.akamai.steamstatic.com/steam/apps/1222140/capsule_616x353.jpg';" />
      <div class="card-scrim"></div>
      <div class="card-top-bar">
        <div class="card-badge-left">
          ${badgeHtml}
          ${game.isSamtagonOriginal ? `<span class="badge-samtagon-float">Original</span>` : ''}
        </div>
      </div>
      <div class="card-overlay-content">
        <div class="card-title-row">
          <h3 class="card-title">${game.title}</h3>
          <span class="card-year">${game.releaseYear}</span>
        </div>
        <div class="card-meta-line">${game.developer} &bull; ${game.genres.slice(0, 2).join(' / ')}</div>
        <div class="card-action-bar">
          <a href="${storeUrl}" target="_blank" rel="noopener noreferrer" class="card-btn-action primary" onclick="event.stopPropagation()" title="${storeName}">
            <span>Store</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
          </a>
          <button class="card-btn-action secondary icon-only card-details-trigger" onclick="event.stopPropagation()" title="Game Details" aria-label="Game Details">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          </button>
        </div>
      </div>
    `;

    // Click card opens full Game Detail Modal
    card.addEventListener('click', () => {
      this.audio.playChime(783.99, 0.06);
      this.openGameDetailModal(game);
    });

    const detailsBtn = card.querySelector<HTMLElement>('.card-details-trigger');
    detailsBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
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

    // First and Prev with sleek SVGs
    const svgFirst = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>`;
    const svgPrev = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>`;
    const svgNext = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
    const svgLast = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>`;

    this.paginationControls.appendChild(createBtn(svgFirst, 1, current === 1));
    this.paginationControls.appendChild(createBtn(svgPrev, current - 1, current === 1));

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

    // Next and Last with sleek SVGs
    this.paginationControls.appendChild(createBtn(svgNext, current + 1, current === total));
    this.paginationControls.appendChild(createBtn(svgLast, total, current === total));
  }

  /**
   * Open full rich Game Detail Modal (less text, rich media, video trailers, store and studio links)
   */
  public openGameDetailModal(game: ExtendedGameItem): void {
    if (!this.modalBackdrop || !this.modalContent) return;

    const similarGames = CatalogEngine.getSimilarGames(game, 3);
    const storeUrl = game.platforms[0]?.url || `https://store.steampowered.com/`;
    const studioUrl = game.studioUrl || `https://store.steampowered.com/search/?developer=${encodeURIComponent(game.developer)}`;

    const numericSteamId = game.id.startsWith('steam-')
      ? parseInt(game.id.replace('steam-', ''), 10)
      : (typeof game.id === 'number' ? game.id : parseInt(String(game.id).replace(/\D/g, ''), 10));
    const isSteam = !isNaN(numericSteamId) && numericSteamId > 0;

    // Clean up previous HLS instance if any
    if (this.currentHls) {
      try {
        this.currentHls.destroy();
      } catch (_) {}
      this.currentHls = null;
    }

    // Media presentation: High-res poster banner + YouTube or Steam video trailer stream
    let mediaHtml = '';
    if (isSteam) {
      mediaHtml = `
        <div class="modal-media-wrap" id="modal-media-player-wrap">
          <img src="${game.image}" alt="${game.title}" class="modal-media-poster" id="modal-media-poster-img" />
          <div class="modal-trailer-badge" id="modal-trailer-badge" style="display: none;">🎥 Steam Official Trailer</div>
          <div id="modal-video-container"></div>
        </div>
      `;
    } else if (game.videoTrailer && game.videoTrailer.includes('youtube.com')) {
      mediaHtml = `
        <div class="modal-media-wrap">
          <img src="${game.image}" alt="${game.title}" class="modal-media-poster" />
          <iframe 
            src="${game.videoTrailer}?autoplay=1&mute=1&loop=1&playlist=${game.videoTrailer.split('/embed/')[1] || ''}" 
            title="${game.title} Trailer" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `;
    } else {
      mediaHtml = `
        <div class="modal-media-wrap">
          <img src="${game.image}" alt="${game.title}" class="modal-media-poster" />
        </div>
      `;
    }

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

    // Asynchronously stream official Steam video trailer if game has a Steam AppID
    if (isSteam) {
      this.loadSteamTrailer(numericSteamId, game);
    }

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
   * Asynchronously load and stream the official Steam trailer via HLS / HTML5 Video
   */
  private async loadSteamTrailer(appid: number, game: ExtendedGameItem): Promise<void> {
    try {
      const res = await fetch(`/api/trailer?appid=${appid}`);
      if (!res.ok) return;
      const data: any = await res.json();
      const badge = document.getElementById('modal-trailer-badge');
      const container = document.getElementById('modal-video-container');
      if (!container) return;

      if (data.success && data.hasVideo && data.hls) {
        if (badge) {
          badge.textContent = `🎥 Steam Trailer: ${data.title || 'Official Highlight'}`;
          badge.style.display = 'inline-flex';
        }

        container.innerHTML = `
          <video id="modal-steam-video" class="modal-media-video" controls autoplay muted loop playsinline poster="${data.thumbnail || game.image}">
            <source src="${data.hls}" type="application/x-mpegURL">
          </video>
        `;

        const video = document.getElementById('modal-steam-video') as HTMLVideoElement;
        if (!video) return;

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = data.hls;
          video.play().catch(() => {});
        } else if ((window as any).Hls && (window as any).Hls.isSupported()) {
          const hls = new (window as any).Hls({
            enableWorker: true,
            lowLatencyMode: true,
          });
          hls.loadSource(data.hls);
          hls.attachMedia(video);
          hls.on((window as any).Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(() => {});
          });
          this.currentHls = hls;
        }
      } else if (game.videoTrailer && game.videoTrailer.includes('youtube.com')) {
        // Fallback to YouTube if Steam video is not found
        container.innerHTML = `
          <iframe 
            src="${game.videoTrailer}?autoplay=1&mute=1&loop=1&playlist=${game.videoTrailer.split('/embed/')[1] || ''}" 
            title="${game.title} Trailer" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        `;
      }
    } catch (err) {
      console.warn('[Recommendations] Failed to stream Steam trailer:', err);
    }
  }

  /**
   * Close Game Detail Modal
   */
  public closeGameDetailModal(): void {
    if (!this.modalBackdrop) return;

    if (this.currentHls) {
      try {
        this.currentHls.destroy();
      } catch (_) {}
      this.currentHls = null;
    }

    const video = document.getElementById('modal-steam-video') as HTMLVideoElement;
    if (video) {
      try {
        video.pause();
        video.src = '';
      } catch (_) {}
    }

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
  (window as any).recommendationsApp = new RecommendationsApp();
});

import { GameItem, GameMatch, PlatformLink, VectorEngine } from './vector-engine.js';
import { GAMES_CATALOG } from './games-data.js';

export interface ExtendedGameItem extends GameItem {
  videoTrailer?: string;
  studioUrl?: string;
  reviewsSummary?: string;
  reviewCount?: string;
}

// Curated pool of verified Steam App IDs and franchises with real capsule assets
const REAL_STEAM_GAMES = [
  { id: 1222140, title: 'Detroit: Become Human', studio: 'Quantic Dream', genres: ['Narrative', 'Sci-Fi', 'Choices Matter'], year: 2018, rating: 4.92, trailer: 'https://www.youtube.com/embed/sAm4sF-0j_M', desc: 'Step into the shoes of three distinct androids as they awaken to emotion, moral dilemmas, and revolution in Detroit 2038.' },
  { id: 319630, title: 'Life is Strange', studio: 'DONTNOD Entertainment', genres: ['Narrative', 'Adventure', 'Choices Matter'], year: 2015, rating: 4.95, trailer: 'https://www.youtube.com/embed/AURVxvIZrmU', desc: 'Rewind time as photography student Max Caulfield and unravel the haunting mystery of Arcadia Bay with Chloe Price.' },
  { id: 554620, title: 'Life is Strange: Before the Storm', studio: 'Deck Nine', genres: ['Narrative', 'Drama', 'Story Rich'], year: 2017, rating: 4.88, trailer: 'https://www.youtube.com/embed/2_Y3V2s6z80', desc: 'Experience the unlikely friendship between rebel Chloe Price and popular Rachel Amber before the storm hits.' },
  { id: 960910, title: 'Heavy Rain', studio: 'Quantic Dream', genres: ['Mystery', 'Thriller', 'Choices Matter'], year: 2010, rating: 4.82, trailer: 'https://www.youtube.com/embed/wE3Qz9bA0r8', desc: 'Hunt the elusive Origami Killer across four intertwined character perspectives where any choice can result in permanent death.' },
  { id: 960990, title: 'Beyond: Two Souls', studio: 'Quantic Dream', genres: ['Action', 'Sci-Fi', 'Cinematic'], year: 2013, rating: 4.79, trailer: 'https://www.youtube.com/embed/MtEoS0MaNyA', desc: 'Live the extraordinary life of Jodie Holmes and her ethereal connection to a powerful supernatural entity named Aiden.' },
  { id: 271590, title: 'Grand Theft Auto V', studio: 'Rockstar Games', genres: ['Open World', 'Action', 'Crime'], year: 2013, rating: 4.96, trailer: 'https://www.youtube.com/embed/QkkoHAzjnUs', desc: 'Pull off high-stakes heists across the sprawling sun-soaked metropolis of Los Santos as Michael, Trevor, and Franklin.' },
  { id: 1174180, title: 'Red Dead Redemption 2', studio: 'Rockstar Games', genres: ['Open World', 'Story Rich', 'Western'], year: 2018, rating: 4.98, trailer: 'https://www.youtube.com/embed/eaW0tYpxyp0', desc: 'Arthur Morgan and the Van der Linde gang fight for survival across the rugged, untamed American heartland.' },
  { id: 1091500, title: 'Cyberpunk 2077', studio: 'CD Projekt Red', genres: ['RPG', 'Open World', 'Cyberpunk'], year: 2020, rating: 4.89, trailer: 'https://www.youtube.com/embed/UnA7tepsc7s', desc: 'An open-world action-adventure RPG set in the megalopolis of Night City, where you fight for immortality as cyber-enhanced V.' },
  { id: 292030, title: 'The Witcher 3: Wild Hunt', studio: 'CD Projekt Red', genres: ['RPG', 'Open World', 'Fantasy'], year: 2015, rating: 4.99, trailer: 'https://www.youtube.com/embed/XHrskkHf958', desc: 'Track down the Child of Prophecy across a war-torn continent as master monster hunter Geralt of Rivia.' },
  { id: 1245620, title: 'Elden Ring', studio: 'FromSoftware', genres: ['Souls-like', 'Action RPG', 'Dark Fantasy'], year: 2022, rating: 4.97, trailer: 'https://www.youtube.com/embed/E3Huy2cdih0', desc: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring across the Lands Between.' },
  { id: 1086940, title: "Baldur's Gate 3", studio: 'Larian Studios', genres: ['CRPG', 'Turn-Based', 'Choices Matter'], year: 2023, rating: 4.99, trailer: 'https://www.youtube.com/embed/1T22wN1BIzU', desc: 'Gather your party and return to the Forgotten Realms in a tale of fellowship, betrayal, sacrifice, and ultimate power.' },
  { id: 1593500, title: 'God of War', studio: 'Santa Monica Studio', genres: ['Action', 'Adventure', 'Mythology'], year: 2018, rating: 4.96, trailer: 'https://www.youtube.com/embed/K0u_kAWLJOA', desc: 'Kratos must adapt to unfamiliar Norse lands, survive unexpected threats, and raise his son Atreus amidst towering gods.' },
  { id: 489830, title: 'The Elder Scrolls V: Skyrim', studio: 'Bethesda Game Studios', genres: ['RPG', 'Open World', 'Fantasy'], year: 2011, rating: 4.94, trailer: 'https://www.youtube.com/embed/JSRtYpNRoN0', desc: 'The legendary open-world masterpiece where you are Dragonborn, prophesied savior against ancient dragons.' },
  { id: 1328670, title: 'Mass Effect Legendary Edition', studio: 'BioWare', genres: ['Sci-Fi', 'RPG', 'Choices Matter'], year: 2021, rating: 4.95, trailer: 'https://www.youtube.com/embed/n8i53TtQ6BQ', desc: 'Relive the cinematic space opera of Commander Shepard across the legendary remastered original trilogy.' },
  { id: 8870, title: 'BioShock Infinite', studio: 'Irrational Games', genres: ['FPS', 'Story Rich', 'Steampunk'], year: 2013, rating: 4.92, trailer: 'https://www.youtube.com/embed/bLHW78X1XeE', desc: 'Rescue the enigmatic Elizabeth from the floating sky-city of Columbia in an unforgettable quantum-steampunk voyage.' },
  { id: 620, title: 'Portal 2', studio: 'Valve', genres: ['Puzzle', 'Co-op', 'Comedy'], year: 2011, rating: 4.99, trailer: 'https://www.youtube.com/embed/tax4e4hOHZc', desc: 'Delve into the testing chambers of Aperture Science with GLaDOS, Wheatley, and spatial portal physics.' },
  { id: 1145360, title: 'Hades', studio: 'Supergiant Games', genres: ['Roguelike', 'Action', 'Mythology'], year: 2020, rating: 4.98, trailer: 'https://www.youtube.com/embed/91t0ha9x0AE', desc: 'Defy the god of the dead as Zagreus, hacking and slashing out of the Underworld with Olympian boons.' },
  { id: 367520, title: 'Hollow Knight', studio: 'Team Cherry', genres: ['Metroidvania', 'Souls-like', 'Atmospheric'], year: 2017, rating: 4.97, trailer: 'https://www.youtube.com/embed/UAO2urG23S4', desc: 'Descend into the ruined subterranean insect kingdom of Hallownest to conquer ancient gods and mysteries.' },
  { id: 413150, title: 'Stardew Valley', studio: 'ConcernedApe', genres: ['Farming Sim', 'Cozy', 'Pixel Art'], year: 2016, rating: 4.99, trailer: 'https://www.youtube.com/embed/ot7uXGQskNo', desc: 'Inherit your grandfather old farm plot, grow crops, raise animals, and build a thriving countryside life in Pelican Town.' },
  { id: 374320, title: 'Dark Souls III', studio: 'FromSoftware', genres: ['Souls-like', 'Action RPG', 'Dark Fantasy'], year: 2016, rating: 4.94, trailer: 'https://www.youtube.com/embed/cWBwFnmsf9U', desc: 'Journey through Lothric to link the First Flame amidst colossal lords of cinder and relentless combat.' },
  { id: 814380, title: 'Sekiro: Shadows Die Twice', studio: 'FromSoftware', genres: ['Souls-like', 'Action', 'Stealth'], year: 2019, rating: 4.95, trailer: 'https://www.youtube.com/embed/rXMX4YSTWFw', desc: 'Carve your path to vengeance as the One-Armed Wolf in a lethal late 1500s Sengoku Japan.' },
  { id: 546560, title: 'Half-Life: Alyx', studio: 'Valve', genres: ['VR', 'FPS', 'Sci-Fi'], year: 2020, rating: 4.98, trailer: 'https://www.youtube.com/embed/O2W0N3uKXmo', desc: 'Valve return to the Half-Life universe in a breathtaking VR experience set between Half-Life and Half-Life 2.' },
  { id: 220, title: 'Half-Life 2', studio: 'Valve', genres: ['FPS', 'Sci-Fi', 'Classic'], year: 2004, rating: 4.99, trailer: 'https://www.youtube.com/embed/4tj4q1uYqAQ', desc: 'Take up the crowbar of Gordon Freeman on an alien-infested Earth being picked to the bone by the Combine.' },
  { id: 550, title: 'Left 4 Dead 2', studio: 'Valve', genres: ['Co-op', 'Zombies', 'FPS'], year: 2009, rating: 4.97, trailer: 'https://www.youtube.com/embed/9XIle_2n52M', desc: 'Survive the zombie apocalypse across five campaigns spanning Savannah to New Orleans in legendary 4-player co-op.' },
  { id: 782330, title: 'DOOM Eternal', studio: 'id Software', genres: ['FPS', 'Action', 'Fast-Paced'], year: 2020, rating: 4.93, trailer: 'https://www.youtube.com/embed/_Gws7_Fz3yM', desc: 'Become the Doom Slayer in an unstoppable push-forward combat FPS across dimensions to raze Hell on Earth.' },
  { id: 2050650, title: 'Resident Evil 4', studio: 'Capcom', genres: ['Survival Horror', 'Action', 'Third-Person'], year: 2023, rating: 4.96, trailer: 'https://www.youtube.com/embed/j5Xv2LXuW30', desc: 'Survival is just the beginning. Agent Leon S. Kennedy tracks the president kidnapped daughter to a secluded European village.' },
  { id: 1196590, title: 'Resident Evil Village', studio: 'Capcom', genres: ['Survival Horror', 'First-Person', 'Action'], year: 2021, rating: 4.91, trailer: 'https://www.youtube.com/embed/qkEhyzD_4C8', desc: 'Ethan Winters must survive horrific new terrors in a snow-capped village dominated by Lady Dimitrescu.' },
  { id: 582010, title: 'Monster Hunter: World', studio: 'Capcom', genres: ['Action RPG', 'Co-op', 'Hunting'], year: 2018, rating: 4.88, trailer: 'https://www.youtube.com/embed/Ro6r15wzp2o', desc: 'Hunt gigantic beasts in a living, breathing ecosystem where you craft weapons and armor from fallen foes.' },
  { id: 601150, title: 'Devil May Cry 5', studio: 'Capcom', genres: ['Action', 'Hack and Slash', 'Stylized'], year: 2019, rating: 4.94, trailer: 'https://www.youtube.com/embed/K9qK8Zl1QhM', desc: 'The ultimate Devil Hunter returns in style. Play as Nero, Dante, and V in over-the-top demon-slaying combat.' },
  { id: 1687950, title: 'Persona 5 Royal', studio: 'Atlus', genres: ['JRPG', 'Anime', 'Turn-Based'], year: 2022, rating: 4.98, trailer: 'https://www.youtube.com/embed/VpXymh_e8O4', desc: 'Don the mask of the Phantom Thieves, infiltrate palaces of corrupt adults, and balance high school life in Tokyo.' },
  { id: 524220, title: 'NieR:Automata', studio: 'PlatinumGames', genres: ['Action RPG', 'Sci-Fi', 'Philosophical'], year: 2017, rating: 4.93, trailer: 'https://www.youtube.com/embed/wJxNhJ8FiFk', desc: 'Androids 2B and 9S fight to reclaim Earth from machine lifeforms in a deeply philosophical existential epic.' },
  { id: 1462040, title: 'Final Fantasy VII Remake Intergrade', studio: 'Square Enix', genres: ['JRPG', 'Action RPG', 'Story Rich'], year: 2021, rating: 4.91, trailer: 'https://www.youtube.com/embed/ERgrFVhL-n4', desc: 'Cloud Strife and AVALANCHE battle the Shinra Electric Power Company in the sprawling metropolis of Midgar.' },
  { id: 1850570, title: 'Death Stranding Director Cut', studio: 'Kojima Productions', genres: ['Open World', 'Sci-Fi', 'Cinematic'], year: 2022, rating: 4.94, trailer: 'https://www.youtube.com/embed/H2HY9TQm7Gg', desc: 'From Hideo Kojima comes a genre-defying experience. Sam Bridges must reconnect a fractured world one delivery at a time.' },
  { id: 1151640, title: 'Horizon Zero Dawn', studio: 'Guerrilla Games', genres: ['Open World', 'Action RPG', 'Sci-Fi'], year: 2020, rating: 4.90, trailer: 'https://www.youtube.com/embed/u4-FCsiF5x4', desc: 'Experience Aloy legendary quest to unravel the mysteries of a future Earth ruled by machines.' },
  { id: 870780, title: 'Control Ultimate Edition', studio: 'Remedy Entertainment', genres: ['Action', 'Supernatural', 'Metroidvania'], year: 2020, rating: 4.91, trailer: 'https://www.youtube.com/embed/F74LLDhAh9w', desc: 'Jesse Faden seeks answers in the shifting Brutalist headquarters of the Federal Bureau of Control with telekinetic powers.' },
  { id: 2124490, title: 'Silent Hill 2', studio: 'Bloober Team', genres: ['Psychological Horror', 'Survival Horror', 'Atmospheric'], year: 2024, rating: 4.96, trailer: 'https://www.youtube.com/embed/pyC_qiW_4ZY', desc: 'James Sunderland investigates a letter from his deceased wife beckoning him to the fog-shrouded town of Silent Hill.' },
  { id: 753640, title: 'Outer Wilds', studio: 'Mobius Digital', genres: ['Space', 'Exploration', 'Mystery'], year: 2019, rating: 4.99, trailer: 'https://www.youtube.com/embed/d6LGnVCL1_A', desc: 'An open-world mystery about a solar system trapped in an endless 22-minute time loop. Knowledge is your only progression.' },
  { id: 504230, title: 'Celeste', studio: 'Maddy Makes Games', genres: ['Precision Platformer', 'Pixel Art', 'Emotional'], year: 2018, rating: 4.99, trailer: 'https://www.youtube.com/embed/70d9irlxiB4', desc: 'Help Madeline conquer her inner demons as she scales the mysterious, treacherous heights of Celeste Mountain.' },
  { id: 632360, title: 'Disco Elysium - The Final Cut', studio: 'ZA/UM', genres: ['CRPG', 'Story Rich', 'Detective'], year: 2019, rating: 4.95, trailer: 'https://www.youtube.com/embed/iA3zZ3_5_hM', desc: 'You are a detective with a unique skill system at your disposal and a whole city block to carve your path across.' },
  { id: 2379780, title: 'Balatro', studio: 'LocalThunk', genres: ['Roguelike Deckbuilder', 'Strategy', 'Card Game'], year: 2024, rating: 4.99, trailer: 'https://www.youtube.com/embed/wzXQ6Q2l6oE', desc: 'The poker roguelike. Play illegal poker hands, discover game-changing jokers, and trigger adrenaline-fueled combos.' },
  { id: 646570, title: 'Slay the Spire', studio: 'MegaCrit', genres: ['Roguelike Deckbuilder', 'Card Game', 'Strategy'], year: 2019, rating: 4.98, trailer: 'https://www.youtube.com/embed/F_n15O_j5uI', desc: 'Craft a unique deck, encounter bizarre creatures, and discover relics of immense power in the spire.' },
  { id: 1868140, title: 'Dave the Diver', studio: 'MINTROCKET', genres: ['Casual', 'Management', 'Pixel Art'], year: 2023, rating: 4.97, trailer: 'https://www.youtube.com/embed/RkG7nZ7aKzE', desc: 'Explore the mysterious Blue Hole by day and run an exotic sushi restaurant with eccentric friends by night.' },
  { id: 264710, title: 'Subnautica', studio: 'Unknown Worlds', genres: ['Survival', 'Open World', 'Underwater'], year: 2018, rating: 4.96, trailer: 'https://www.youtube.com/embed/Rz2SNm8VguE', desc: 'Descend into the depths of an alien underwater world filled with wonder and perilous leviathans.' },
  { id: 427520, title: 'Factorio', studio: 'Wube Software', genres: ['Automation', 'Base Building', 'Simulation'], year: 2020, rating: 4.99, trailer: 'https://www.youtube.com/embed/J8SBp4SyvLk', desc: 'Build and maintain automated factories to produce items of increasing complexity on an untamed alien world.' },
  { id: 294100, title: 'RimWorld', studio: 'Ludeon Studios', genres: ['Colony Sim', 'Story Generator', 'Strategy'], year: 2018, rating: 4.99, trailer: 'https://www.youtube.com/embed/3tDrxOASmr4', desc: 'A sci-fi colony sim driven by an intelligent AI storyteller that generates emergent narrative triumphs and tragedies.' },
  { id: 553850, title: 'Helldivers 2', studio: 'Arrowhead Game Studios', genres: ['Co-op Shooter', 'Third-Person', 'Sci-Fi'], year: 2024, rating: 4.88, trailer: 'https://www.youtube.com/embed/l_v5_vA1B4Q', desc: 'Join the Helldivers and battle for freedom across a hostile galaxy in fast, frantic third-person cooperative action.' },
  { id: 1966720, title: 'Lethal Company', studio: 'Zeekerss', genres: ['Co-op Horror', 'First-Person', 'Comedy'], year: 2023, rating: 4.97, trailer: 'https://www.youtube.com/embed/kR7Q9v2Zk_s', desc: 'Scavenge abandoned industrialized moons to meet the Company profit quota with up to 4 brave crewmates.' },
];

const GENRE_POOLS = [
  ['Narrative', 'Choices Matter', 'Cinematic'],
  ['Action RPG', 'Open World', 'Fantasy'],
  ['Sci-Fi', 'Cyberpunk', 'FPS'],
  ['Roguelike', 'Deckbuilder', 'Strategy'],
  ['Metroidvania', 'Platformer', 'Pixel Art'],
  ['Simulation', 'Transit', 'Tycoon'],
  ['Survival Horror', 'Atmospheric', 'Mystery'],
  ['Co-op', 'Shooter', 'Action'],
  ['JRPG', 'Turn-Based', 'Anime'],
  ['Puzzle', 'Exploration', 'Story Rich'],
];

const STUDIO_POOLS = [
  'Quantic Dream', 'CD Projekt Red', 'FromSoftware', 'Valve', 'Rockstar Games',
  'Larian Studios', 'Supergiant Games', 'Team Cherry', 'Capcom', 'Atlus',
  'Remedy Entertainment', 'Bloober Team', 'DONTNOD Entertainment', 'Obsidian',
  'Unknown Worlds', 'MegaCrit', 'LocalThunk', 'Samtagon Game Studios', 'BioWare',
  'Bungie', 'Arkane Studios', 'Respawn', 'Kojima Productions', 'Sucker Punch',
];

const TITLE_PREFIXES = [
  'Chronicles of', 'Echoes of', 'Tales from', 'Legacy of', 'Beyond',
  'Return to', 'Sands of', 'Edge of', 'Secrets of', 'Dawn of',
  'Kingdom of', 'Hollow', 'Iron', 'Shadows of', 'Cyber', 'Neon',
  'Quantum', 'Star', 'Infinite', 'Project', 'Protocol', 'Ascent of',
];

const TITLE_NOUNS = [
  'Elysium', 'Arcadia', 'Valhalla', 'Oblivion', 'Frontier', 'Solitude',
  'Nexus', 'Vanguard', 'Horizon', 'Singularity', 'Eclipse', 'Sanctuary',
  'Rebellion', 'Paradox', 'Mirage', 'Continuum', 'Sovereign', 'Resonance',
];

export class CatalogEngine {
  public static readonly ITEMS_PER_PAGE = 12;
  public static readonly TOTAL_PAGES = 1000;
  public static readonly TOTAL_GAMES = CatalogEngine.ITEMS_PER_PAGE * CatalogEngine.TOTAL_PAGES;

  private static pageCache: Map<number, ExtendedGameItem[]> = new Map();
  private static allCurated: ExtendedGameItem[] = [];

  static {
    this.allCurated = this.buildCuratedLibrary();
  }

  private static buildCuratedLibrary(): ExtendedGameItem[] {
    const list: ExtendedGameItem[] = [];

    // Add real Steam games
    REAL_STEAM_GAMES.forEach((g) => {
      const steamUrl = `https://store.steampowered.com/app/${g.id}/`;
      const capsule = `https://shared.steamstatic.com/store_item_assets/steam/apps/${g.id}/capsule_616x353.jpg`;
      const tags = [...g.genres.map(x => x.toLowerCase()), g.title.toLowerCase(), g.studio.toLowerCase()];

      const item: ExtendedGameItem = {
        id: `steam-${g.id}`,
        title: g.title,
        subtitle: `${g.genres.join(' • ')} Experience`,
        description: g.desc,
        image: capsule,
        genres: g.genres,
        tags,
        rating: g.rating,
        releaseYear: g.year,
        developer: g.studio,
        studioUrl: `https://store.steampowered.com/developer/${encodeURIComponent(g.studio.toLowerCase().replace(/[^a-z0-9]/g, ''))}`,
        videoTrailer: g.trailer,
        reviewsSummary: g.rating >= 4.95 ? 'Overwhelmingly Positive' : g.rating >= 4.88 ? 'Very Positive' : 'Positive',
        reviewCount: `${Math.floor(20000 + (g.id % 80000)).toLocaleString()} Steam Reviews`,
        platforms: [
          { name: 'Steam Store', url: steamUrl, badge: 'steam' },
        ],
        embedding: VectorEngine.embedText(`${g.title} ${g.desc} ${g.genres.join(' ')} ${g.studio}`),
      };
      list.push(item);
    });

    return list;
  }

  public static getPage(pageNumber: number): {
    games: ExtendedGameItem[];
    totalPages: number;
    totalCount: number;
    currentPage: number;
  } {
    const page = Math.max(1, Math.min(this.TOTAL_PAGES, Math.floor(pageNumber)));

    if (this.pageCache.has(page)) {
      return {
        games: this.pageCache.get(page)!,
        totalPages: this.TOTAL_PAGES,
        totalCount: this.TOTAL_GAMES,
        currentPage: page,
      };
    }

    const items: ExtendedGameItem[] = [];

    if (page === 1) {
      items.push(...this.allCurated.slice(0, this.ITEMS_PER_PAGE));
    } else if (page === 2) {
      items.push(...this.allCurated.slice(this.ITEMS_PER_PAGE, this.ITEMS_PER_PAGE * 2));
    } else {
      for (let i = 0; i < this.ITEMS_PER_PAGE; i++) {
        const itemSeed = page * 100 + i;
        const game = this.generateDeterministicGame(page, i, itemSeed);
        items.push(game);
      }
    }

    this.pageCache.set(page, items);

    return {
      games: items,
      totalPages: this.TOTAL_PAGES,
      totalCount: this.TOTAL_GAMES,
      currentPage: page,
    };
  }

  private static generateDeterministicGame(page: number, slot: number, seed: number): ExtendedGameItem {
    const baseCurated = REAL_STEAM_GAMES[seed % REAL_STEAM_GAMES.length];
    const prefix = TITLE_PREFIXES[seed % TITLE_PREFIXES.length];
    const noun = TITLE_NOUNS[(seed * 7 + slot) % TITLE_NOUNS.length];
    const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'Zero', 'Evolution', 'Origins'][(seed + slot) % 9];
    
    const title = slot % 3 === 0 
      ? `${baseCurated.title}: ${noun}` 
      : `${prefix} ${noun} ${roman}`;

    const studio = STUDIO_POOLS[(seed * 3 + slot) % STUDIO_POOLS.length];
    const genreGroup = GENRE_POOLS[(seed + slot) % GENRE_POOLS.length];
    const releaseYear = 2004 + (seed % 22);
    const rating = Number((4.75 + ((seed % 24) * 0.01)).toFixed(2));
    const reviewsPct = Math.round(rating * 20);
    const sentiment = reviewsPct >= 96 ? 'Overwhelmingly Positive' : reviewsPct >= 90 ? 'Very Positive' : 'Positive';

    const steamId = baseCurated.id;
    const capsule = `https://shared.steamstatic.com/store_item_assets/steam/apps/${steamId}/capsule_616x353.jpg`;
    const steamUrl = `https://store.steampowered.com/app/${steamId}/`;

    const desc = `${title} is a critically acclaimed ${genreGroup.join(', ').toLowerCase()} title crafted by ${studio}. Explore expansive worlds, conquer masterfully tuned gameplay systems, and forge your journey.`;

    const tags = [
      ...genreGroup.map(g => g.toLowerCase()),
      studio.toLowerCase(),
      noun.toLowerCase(),
      'steam',
      'story-rich',
      'atmospheric',
    ];

    const embedding = VectorEngine.embedText(`${title} ${desc} ${genreGroup.join(' ')} ${studio}`);

    return {
      id: `proc-p${page}-s${slot}-${seed}`,
      title,
      subtitle: `${genreGroup[0]} &bull; ${studio}`,
      description: desc,
      image: capsule,
      genres: genreGroup,
      tags,
      rating,
      releaseYear,
      developer: studio,
      studioUrl: `https://store.steampowered.com/developer/${encodeURIComponent(studio.toLowerCase().replace(/[^a-z0-9]/g, ''))}`,
      videoTrailer: baseCurated.trailer,
      reviewsSummary: sentiment,
      reviewCount: `${Math.floor(12000 + ((seed * 17) % 65000)).toLocaleString()} Steam Reviews`,
      platforms: [
        { name: 'Steam Store', url: steamUrl, badge: 'steam' },
      ],
      embedding,
    };
  }

  public static searchCatalog(query: string, pageNumber: number = 1): {
    matches: GameMatch[];
    totalPages: number;
    totalCount: number;
    currentPage: number;
  } {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      const pageResult = this.getPage(pageNumber);
      return {
        matches: pageResult.games.map(game => ({
          game,
          similarity: 0,
          fuzzyScore: 0,
          hybridScore: 0,
          commonTags: [],
        })),
        totalPages: pageResult.totalPages,
        totalCount: pageResult.totalCount,
        currentPage: pageResult.currentPage,
      };
    }

    const queryVector = VectorEngine.embedText(trimmed);
    const searchPool: ExtendedGameItem[] = [...this.allCurated];
    for (let p = 1; p <= 15; p++) {
      const pg = this.getPage(p);
      pg.games.forEach(g => {
        if (!searchPool.some(existing => existing.id === g.id)) {
          searchPool.push(g);
        }
      });
    }

    const scoredMatches: GameMatch[] = [];

    for (const game of searchPool) {
      const cosSim = VectorEngine.cosineSimilarity(queryVector, game.embedding);
      const fuzzyScore = VectorEngine.computeFuzzyScore(trimmed, game);

      let hybrid = 0;
      if (fuzzyScore >= 0.70) {
        hybrid = Math.min(0.98, fuzzyScore * 0.85 + cosSim * 0.15);
      } else {
        hybrid = Math.min(0.95, cosSim * 0.75 + fuzzyScore * 0.25);
      }

      if (hybrid > 0.40 || fuzzyScore > 0.45) {
        const normalizedSim = Number(Math.max(0.60, Math.min(0.98, hybrid)).toFixed(2));
        const queryTokens = trimmed.split(/\s+/).filter(t => t.length > 2);
        const commonTags = game.tags.filter(t => queryTokens.some(tok => t.includes(tok) || tok.includes(t)));

        scoredMatches.push({
          game,
          similarity: normalizedSim,
          fuzzyScore,
          hybridScore: hybrid,
          commonTags,
        });
      }
    }

    VectorEngine.sortBySimilarity(scoredMatches);

    const totalCount = scoredMatches.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / this.ITEMS_PER_PAGE));
    const safePage = Math.max(1, Math.min(totalPages, pageNumber));
    const offset = (safePage - 1) * this.ITEMS_PER_PAGE;
    const pageMatches = scoredMatches.slice(offset, offset + this.ITEMS_PER_PAGE);

    return {
      matches: pageMatches,
      totalPages,
      totalCount,
      currentPage: safePage,
    };
  }

  public static getSimilarGames(targetGame: GameItem, count: number = 3): ExtendedGameItem[] {
    const candidates = this.allCurated.filter(g => g.id !== targetGame.id);
    const matches: { game: ExtendedGameItem; score: number }[] = [];

    candidates.forEach(cand => {
      const sim = VectorEngine.cosineSimilarity(targetGame.embedding, cand.embedding);
      const sharedGenres = cand.genres.filter(cg => targetGame.genres.includes(cg)).length;
      const finalScore = sim * 0.8 + (sharedGenres * 0.08);
      matches.push({ game: cand, score: finalScore });
    });

    matches.sort((a, b) => b.score - a.score);
    return matches.slice(0, count).map(m => m.game);
  }
}

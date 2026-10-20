import { VectorEngine } from './vector-engine.js';
import { REAL_STEAM_GAMES } from './real-steam-games.js';
// Comprehensive library of the most popular, iconic, and legendary video games in history
export const CURATED_GAMES = [
    // --- PAGE 1: THE BIGGEST GLOBAL ICONS (Minecraft, GTA, CS2, Elden Ring, Fortnite, Zelda) ---
    {
        id: 'minecraft',
        title: 'Minecraft',
        studio: 'Mojang Studios',
        genres: ['Sandbox', 'Survival', 'Crafting'],
        year: 2011,
        rating: 4.99,
        image: 'assets/images/games/minecraft.png',
        storeUrl: 'https://www.minecraft.net/',
        badge: 'web',
        trailer: 'https://www.youtube.com/embed/MmB9b5njVbA',
        desc: 'The undisputed best-selling video game in history. Mine deep into cavernous depths, engineer automated redstone contraptions, survive nocturnal monsters, and construct limitless architectural marvels block by block in an infinite procedural voxel universe.',
        tags: ['minecraft', 'sandbox', 'survival', 'crafting', 'building', 'voxel', 'blocks', 'multiplayer', 'creative', 'cozy', 'open world', 'adventure', 'redstone']
    },
    {
        id: 271590,
        title: 'Grand Theft Auto V',
        studio: 'Rockstar Games',
        genres: ['Open World', 'Action', 'Crime'],
        year: 2013,
        rating: 4.96,
        trailer: 'https://www.youtube.com/embed/QkkoHAzjnUs',
        desc: 'Sprawling open-world gangster and crime epic set across the sun-soaked metropolis of Los Santos and Blaine County. Plan and execute multi-part high-stakes heists, engage in intense street shootouts, outrun aggressive police pursuits, steal getaway vehicles, and navigate criminal underworld syndicates as Michael, Trevor, and Franklin in the definitive open-world action masterpiece.',
        tags: ['gta', 'gta 5', 'gta v', 'grand theft auto', 'open world', 'crime', 'gangster', 'gangsters', 'gang', 'heist', 'heists', 'car theft', 'carjacking', 'police chase', 'multiplayer', 'los santos', 'rockstar', 'action', 'sandbox', 'underworld']
    },
    {
        id: 730,
        title: 'Counter-Strike 2',
        studio: 'Valve',
        genres: ['FPS', 'Tactical Shooter', 'Esports'],
        year: 2023,
        rating: 4.94,
        trailer: 'https://www.youtube.com/embed/nSE38VJhyFs',
        desc: 'The premier competitive tactical 5v5 shooter in the world. Precision gunplay, sub-tick responsive matchmaking, dynamic volumetric smoke grenades, and legendary map design.',
        tags: ['cs2', 'csgo', 'counter-strike', 'counter strike', 'fps', 'competitive', 'tactical shooter', 'multiplayer', 'esports', 'valve']
    },
    {
        id: 1245620,
        title: 'Elden Ring',
        studio: 'FromSoftware',
        genres: ['Souls-like', 'Action RPG', 'Dark Fantasy'],
        year: 2022,
        rating: 4.97,
        trailer: 'https://www.youtube.com/embed/E3Huy2cdih0',
        desc: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between in FromSoftware’s grand open-world masterpiece.',
        tags: ['elden ring', 'fromsoftware', 'souls-like', 'dark fantasy', 'open world', 'difficult', 'action rpg', 'goty']
    },
    {
        id: 'fortnite',
        title: 'Fortnite',
        studio: 'Epic Games',
        genres: ['Battle Royale', 'Shooter', 'Building'],
        year: 2017,
        rating: 4.90,
        image: 'assets/images/games/fortnite.svg',
        storeUrl: 'https://www.fortnite.com/',
        badge: 'web',
        trailer: 'https://www.youtube.com/embed/2gUtfBmw86Y',
        desc: 'Drop onto the island from the Battle Bus, scavenge loot, construct defensive forts at lightning speed, and battle to be the last player standing in Epic Games’ cultural battle royale phenomenon.',
        tags: ['fortnite', 'battle royale', 'shooter', 'building', 'multiplayer', 'pvp', 'epic games', 'action', 'cross-platform']
    },
    {
        id: 'zelda-totk',
        title: 'The Legend of Zelda: Tears of the Kingdom',
        studio: 'Nintendo',
        genres: ['Open World', 'Action Adventure', 'Physics Sandbox'],
        year: 2023,
        rating: 4.99,
        image: 'assets/images/games/zelda.svg',
        storeUrl: 'https://www.zelda.com/tears-of-the-kingdom/',
        badge: 'web',
        trailer: 'https://www.youtube.com/embed/uHGShqcAHlQ',
        desc: 'An epic adventure across the land and skies of Hyrule. Harness the groundbreaking Ultrahand crafting physics to build aircraft, mechs, and contraptions with unlimited creative freedom.',
        tags: ['zelda', 'tears of the kingdom', 'breath of the wild', 'botw', 'totk', 'nintendo', 'link', 'open world', 'physics', 'ultrahand', 'adventure', 'goty']
    },
    {
        id: 1086940,
        title: 'Baldur’s Gate 3',
        studio: 'Larian Studios',
        genres: ['CRPG', 'Turn-Based', 'Choices Matter'],
        year: 2023,
        rating: 4.99,
        trailer: 'https://www.youtube.com/embed/1T22wN1BIzU',
        desc: 'Gather your party and venture back to the Forgotten Realms in a profound tale of fellowship, sacrifice, and ultimate power with unparalleled narrative freedom and reactive D&D 5e systems.',
        tags: ['baldurs gate', 'bg3', 'dnd', 'larian', 'crpg', 'turn-based', 'choices matter', 'story rich', 'rpg', 'goty']
    },
    {
        id: 2358720,
        title: 'Black Myth: Wukong',
        studio: 'Game Science',
        genres: ['Action RPG', 'Souls-like', 'Mythology'],
        year: 2024,
        rating: 4.98,
        trailer: 'https://www.youtube.com/embed/O2nNljv0MOI',
        desc: 'Set out as the Destined One across Chinese mythology based on Journey to the West. Wield staff martial arts, master 72 transformations, and conquer awe-inspiring legendary deities.',
        tags: ['black myth wukong', 'wukong', 'sun wukong', 'action rpg', 'souls-like', 'chinese mythology', 'boss fight', 'game science']
    },
    {
        id: 1091500,
        title: 'Cyberpunk 2077',
        studio: 'CD Projekt Red',
        genres: ['RPG', 'Open World', 'Cyberpunk'],
        year: 2020,
        rating: 4.91,
        trailer: 'https://www.youtube.com/embed/UnA7tepsc7s',
        desc: 'An open-world action-adventure RPG set in the megalopolis of Night City, where you fight for survival and immortality as cyber-enhanced mercenary V alongside Johnny Silverhand.',
        tags: ['cyberpunk 2077', 'cyberpunk', 'night city', 'cd projekt red', 'keanu reeves', 'sci-fi', 'rpg', 'open world', 'first-person']
    },
    {
        id: 1174180,
        title: 'Red Dead Redemption 2',
        studio: 'Rockstar Games',
        genres: ['Open World', 'Story Rich', 'Western'],
        year: 2018,
        rating: 4.98,
        trailer: 'https://www.youtube.com/embed/eaW0tYpxyp0',
        desc: 'Arthur Morgan and the Van der Linde gang fight for survival across the rugged, untamed American frontier at the dawn of the modern age. An undisputed benchmark in narrative world-building.',
        tags: ['red dead redemption', 'rdr2', 'arthur morgan', 'rockstar', 'western', 'cowboy', 'open world', 'story rich', 'masterpiece']
    },
    {
        id: 'valorant',
        title: 'Valorant',
        studio: 'Riot Games',
        genres: ['Tactical Shooter', 'FPS', 'Competitive'],
        year: 2020,
        rating: 4.92,
        image: 'assets/images/games/valorant.png',
        storeUrl: 'https://playvalorant.com/',
        badge: 'web',
        trailer: 'https://www.youtube.com/embed/e_E9W2VSZYQ',
        desc: 'A 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities in high-stakes plant-and-defuse rounds.',
        tags: ['valorant', 'tactical shooter', 'fps', 'riot games', 'hero shooter', 'competitive', 'esports', 'multiplayer']
    },
    {
        id: 'roblox',
        title: 'Roblox',
        studio: 'Roblox Corporation',
        genres: ['Sandbox', 'Creation', 'Multiplayer'],
        year: 2006,
        rating: 4.88,
        image: 'assets/images/games/roblox.png',
        storeUrl: 'https://www.roblox.com/',
        badge: 'web',
        trailer: 'https://www.youtube.com/embed/eAvXhNkyUcg',
        desc: 'The ultimate virtual universe that lets you create, share experiences with friends, and be anything you can imagine across millions of user-generated 3D worlds.',
        tags: ['roblox', 'sandbox', 'creative', 'user-generated', 'casual', 'mini-games', 'multiplayer', 'co-op']
    },
    // --- PAGE 2: MASSIVE MULTIPLAYER & BELOVED TITLES ---
    {
        id: 'mario-odyssey',
        title: 'Super Mario Odyssey',
        studio: 'Nintendo',
        genres: ['3D Platformer', 'Adventure', 'Cozy'],
        year: 2017,
        rating: 4.98,
        image: 'assets/images/games/mario.svg',
        storeUrl: 'https://mario.nintendo.com/odyssey/',
        badge: 'web',
        trailer: 'https://www.youtube.com/embed/wGQHQc_3ycE',
        desc: 'Explore massive 3D kingdoms filled with secrets, power stars, and surprises. Use Cappy to capture and control objects, animals, and enemies in pure Nintendo joy.',
        tags: ['mario', 'super mario odyssey', 'nintendo', 'platformer', '3d', 'cappy', 'collectathon', 'adventure', 'cozy']
    },
    {
        id: 292030,
        title: 'The Witcher 3: Wild Hunt',
        studio: 'CD Projekt Red',
        genres: ['RPG', 'Open World', 'Fantasy'],
        year: 2015,
        rating: 4.99,
        trailer: 'https://www.youtube.com/embed/XHrskkHf958',
        desc: 'Track down the Child of Prophecy across a war-torn continent as master monster hunter Geralt of Rivia in one of the greatest fantasy RPG epics ever created.',
        tags: ['witcher', 'witcher 3', 'geralt', 'cd projekt red', 'fantasy', 'rpg', 'open world', 'masterpiece']
    },
    {
        id: 1172470,
        title: 'Apex Legends',
        studio: 'Respawn / EA',
        genres: ['Battle Royale', 'Hero Shooter', 'FPS'],
        year: 2019,
        rating: 4.90,
        trailer: 'https://www.youtube.com/embed/oQtHENM_GZU',
        desc: 'Conquer with character in Apex Legends, a free-to-play battle royale where legendary competitors with powerful abilities battle for glory on the frontier.',
        tags: ['apex legends', 'apex', 'battle royale', 'hero shooter', 'fps', 'movement', 'ea', 'respawn', 'multiplayer']
    },
    {
        id: 1938090,
        title: 'Call of Duty: Warzone',
        studio: 'Activision',
        genres: ['FPS', 'Battle Royale', 'Action'],
        year: 2020,
        rating: 4.88,
        trailer: 'https://www.youtube.com/embed/0E44DClsX5Q',
        desc: 'The massive free-to-play combat arena featuring signature Call of Duty gunplay, Gulag redeployments, and intense firefights across vast combat maps.',
        tags: ['call of duty', 'cod', 'warzone', 'modern warfare', 'fps', 'battle royale', 'military', 'shooter', 'activision']
    },
    {
        id: 1623730,
        title: 'Palworld',
        studio: 'Pocketpair',
        genres: ['Survival', 'Crafting', 'Open World'],
        year: 2024,
        rating: 4.91,
        trailer: 'https://www.youtube.com/embed/rP3Oxw_E3wA',
        desc: 'Befriend and collect mysterious creatures known as Pals, construct automated factories, and survive against poachers in an expansive open-world survival craft phenomenon.',
        tags: ['palworld', 'pals', 'survival', 'crafting', 'creature collector', 'open world', 'base building', 'co-op', 'pocketpair']
    },
    {
        id: 105600,
        title: 'Terraria',
        studio: 'Re-Logic',
        genres: ['Sandbox', 'Survival', 'Pixel Art'],
        year: 2011,
        rating: 4.99,
        trailer: 'https://www.youtube.com/embed/w7uOhFTrrq0',
        desc: 'Dig, fight, explore, build. Delve deep into cavernous excurses, test your mettle in combat, and construct cities in 2D sandbox perfection.',
        tags: ['terraria', 'sandbox', '2d', 'survival', 'crafting', 'pixel art', 'bosses', 'mining', 'multiplayer', 're-logic']
    },
    {
        id: 252490,
        title: 'Rust',
        studio: 'Facepunch Studios',
        genres: ['Survival', 'Open World', 'PVP'],
        year: 2018,
        rating: 4.90,
        trailer: 'https://www.youtube.com/embed/LGc3Cab8V4A',
        desc: 'The only aim in Rust is to survive. Overcome struggles such as hunger, thirst, and cold. Build a fire, construct a base, and raid rivals.',
        tags: ['rust', 'survival', 'pvp', 'base building', 'multiplayer', 'crafting', 'facepunch']
    },
    {
        id: 'league-of-legends',
        title: 'League of Legends',
        studio: 'Riot Games',
        genres: ['MOBA', 'Strategy', 'Competitive'],
        year: 2009,
        rating: 4.93,
        image: 'assets/images/games/league.svg',
        storeUrl: 'https://www.leagueoflegends.com/',
        badge: 'web',
        trailer: 'https://www.youtube.com/embed/vzHrjPTg43I',
        desc: 'The world’s most played PC MOBA. Master 160+ champions, clash on Summoner’s Rift, and destroy the enemy Nexus with strategy and skill.',
        tags: ['league of legends', 'lol', 'moba', 'strategy', 'riot games', 'esports', 'competitive', 'multiplayer']
    },
    {
        id: 'rocket-league',
        title: 'Rocket League',
        studio: 'Psyonix',
        genres: ['Sports', 'Vehicular Soccer', 'Competitive'],
        year: 2015,
        rating: 4.94,
        image: 'assets/images/games/rocket-league.svg',
        storeUrl: 'https://www.rocketleague.com/',
        badge: 'web',
        trailer: 'https://www.youtube.com/embed/SgSX3gOrKA4',
        desc: 'A high-powered hybrid of arcade-style soccer and vehicular mayhem with physics-driven momentum and aerial rocket acrobatics.',
        tags: ['rocket league', 'cars', 'soccer', 'sports', 'physics', 'competitive', 'esports', 'aerial', 'multiplayer']
    },
    {
        id: 1593500,
        title: 'God of War',
        studio: 'Santa Monica Studio',
        genres: ['Action', 'Adventure', 'Mythology'],
        year: 2018,
        rating: 4.96,
        trailer: 'https://www.youtube.com/embed/K0u_kAWLJOA',
        desc: 'His vengeance against the gods of Olympus far behind him, Kratos must adapt to unfamiliar Norse lands and raise his son Atreus amidst towering gods and monsters.',
        tags: ['god of war', 'kratos', 'norse', 'playstation', 'action', 'mythology', 'goty']
    },
    {
        id: 1888930,
        title: 'The Last of Us Part I',
        studio: 'Naughty Dog',
        genres: ['Story Rich', 'Action', 'Survival'],
        year: 2023,
        rating: 4.95,
        trailer: 'https://www.youtube.com/embed/WxjeV19pfl8',
        desc: 'In a ravaged civilization where infected and hardened survivors run rampant, Joel is hired to smuggle 14-year-old Ellie across a post-apocalyptic United States.',
        tags: ['the last of us', 'tlou', 'naughty dog', 'joel and ellie', 'post-apocalyptic', 'zombies', 'story-rich', 'cinematic']
    },
    {
        id: 1817070,
        title: 'Marvel’s Spider-Man Remastered',
        studio: 'Insomniac Games',
        genres: ['Open World', 'Action', 'Superhero'],
        year: 2022,
        rating: 4.96,
        trailer: 'https://www.youtube.com/embed/mrhrp_24m4Q',
        desc: 'Worlds collide in an original action-packed story. Play as an experienced Peter Parker, fighting iconic villains across Marvel’s New York with fluid web-swinging.',
        tags: ['spider-man', 'spiderman', 'marvel', 'insomniac games', 'open world', 'superhero', 'web swinging', 'action']
    },
    // --- PAGE 3: ICONIC RPGS, SANDBOXES & SOULS-LIKES ---
    {
        id: 1546990,
        title: 'Grand Theft Auto: San Andreas',
        studio: 'Rockstar Games',
        genres: ['Open World', 'Action', 'Crime'],
        year: 2004,
        rating: 4.94,
        trailer: 'https://www.youtube.com/embed/V9TXEI582YQ',
        desc: 'Iconic 90s open-world gangster and street gang saga. Carl CJ Johnson returns to Grove Street in Los Santos, battling corrupt cops, rival Ballas gangs, and betrayal across the entire state of San Andreas. Seize gang turf, customize lowriders, execute drive-bys, and build an unstoppable criminal empire in gaming history most beloved open-world crime epic.',
        tags: ['gta', 'san andreas', 'gta san andreas', 'cj', 'grove street', 'rockstar', 'open world', 'classic', 'crime', 'gangster', 'gangsters', 'gang', 'gang wars', 'drive by', 'car theft', 'los santos']
    },
    {
        id: 2215430,
        title: 'Ghost of Tsushima Director’s Cut',
        studio: 'Sucker Punch',
        genres: ['Open World', 'Action', 'Historical'],
        year: 2024,
        rating: 4.97,
        trailer: 'https://www.youtube.com/embed/rTXhp2_FzP4',
        desc: 'Forge a new path and wage an unconventional war for the freedom of Tsushima as samurai Jin Sakai in a visually breathtaking open-world feudal Japan.',
        tags: ['ghost of tsushima', 'tsushima', 'samurai', 'open world', 'jin sakai', 'sucker punch', 'swordplay', 'historical japan']
    },
    {
        id: 489830,
        title: 'The Elder Scrolls V: Skyrim',
        studio: 'Bethesda Game Studios',
        genres: ['RPG', 'Open World', 'Fantasy'],
        year: 2011,
        rating: 4.94,
        trailer: 'https://www.youtube.com/embed/JSRtYpNRoN0',
        desc: 'The legendary open-world masterpiece where you are Dragonborn, prophesied savior against ancient dragons with total character freedom.',
        tags: ['skyrim', 'elder scrolls', 'dragonborn', 'bethesda', 'rpg', 'open world', 'fantasy', 'magic', 'classic']
    },
    {
        id: 377160,
        title: 'Fallout 4',
        studio: 'Bethesda Game Studios',
        genres: ['RPG', 'Open World', 'Post-Apocalyptic'],
        year: 2015,
        rating: 4.90,
        trailer: 'https://www.youtube.com/embed/X5aJKNwR368',
        desc: 'As the sole survivor of Vault 111, enter the Commonwealth wasteland. Rebuild settlements, craft weapons, and decide Boston’s post-nuclear fate.',
        tags: ['fallout', 'fallout 4', 'bethesda', 'post-apocalyptic', 'rpg', 'open world', 'settlement building', 'wasteland']
    },
    {
        id: 22380,
        title: 'Fallout: New Vegas',
        studio: 'Obsidian Entertainment',
        genres: ['CRPG', 'Story Rich', 'Post-Apocalyptic'],
        year: 2010,
        rating: 4.97,
        trailer: 'https://www.youtube.com/embed/v7xME0aFbB4',
        desc: 'Welcome to Vegas. New Vegas. Fight your way across the heat-blasted Mojave Wasteland, Hoover Dam, and the neon Strip with extraordinary branching narrative choice.',
        tags: ['fallout new vegas', 'fallout', 'new vegas', 'obsidian', 'rpg', 'choices matter', 'classic', 'post-apocalyptic']
    },
    {
        id: 413150,
        title: 'Stardew Valley',
        studio: 'ConcernedApe',
        genres: ['Farming Sim', 'Cozy', 'Pixel Art'],
        year: 2016,
        rating: 4.99,
        trailer: 'https://www.youtube.com/embed/ot7uXGQskNo',
        desc: 'Inherit your grandfather’s overgrown plot in Pelican Town. Clear rocks, sow crops, raise animals, and build an idyllic countryside life in a tranquil indie haven.',
        tags: ['stardew valley', 'stardew', 'cozy', 'farming', 'relaxing', 'pixel art', 'fishing', 'peaceful', 'indie']
    },
    {
        id: 367520,
        title: 'Hollow Knight',
        studio: 'Team Cherry',
        genres: ['Metroidvania', 'Souls-like', 'Atmospheric'],
        year: 2017,
        rating: 4.97,
        trailer: 'https://www.youtube.com/embed/UAO2urG23S4',
        desc: 'Descend into the ruined subterranean insect kingdom of Hallownest to conquer ancient gods, master acrobatic nail combat, and unravel forgotten lore.',
        tags: ['hollow knight', 'metroidvania', 'team cherry', 'souls-like', 'atmospheric', 'difficult', 'hand-drawn', 'masterpiece']
    },
    {
        id: 1145360,
        title: 'Hades',
        studio: 'Supergiant Games',
        genres: ['Roguelike', 'Action', 'Mythology'],
        year: 2020,
        rating: 4.98,
        trailer: 'https://www.youtube.com/embed/91t0ha9x0AE',
        desc: 'Defy the god of the dead as Zagreus, hacking and slashing out of the Underworld with Olympian boons and razor-sharp responsive combat.',
        tags: ['hades', 'roguelike', 'supergiant', 'zagreus', 'greek mythology', 'action', 'goty']
    },
    {
        id: 1145350,
        title: 'Hades II',
        studio: 'Supergiant Games',
        genres: ['Roguelike', 'Action', 'Mythology'],
        year: 2024,
        rating: 4.98,
        trailer: 'https://www.youtube.com/embed/qPnJ5K0x6t0',
        desc: 'Battle beyond the Underworld using dark sorcery as Melinoë to take on the Titan of Time in an expanded roguelike epic with deeper boons and weapons.',
        tags: ['hades 2', 'hades ii', 'supergiant', 'melinoe', 'roguelike', 'action', 'mythology']
    },
    {
        id: 620,
        title: 'Portal 2',
        studio: 'Valve',
        genres: ['Puzzle', 'Co-op', 'Comedy'],
        year: 2011,
        rating: 4.99,
        trailer: 'https://www.youtube.com/embed/tax4e4hOHZc',
        desc: 'Delve into the testing chambers of Aperture Science with GLaDOS, Wheatley, and spatial portal physics in one of Valve’s crowning achievements.',
        tags: ['portal', 'portal 2', 'valve', 'glados', 'puzzle', 'physics', 'comedy', 'co-op', 'classic']
    },
    {
        id: 400,
        title: 'Portal',
        studio: 'Valve',
        genres: ['Puzzle', 'Sci-Fi', 'Classic'],
        year: 2007,
        rating: 4.98,
        trailer: 'https://www.youtube.com/embed/TluRVB395EQ',
        desc: 'Using a handheld portal device, solve physics-based puzzles and survive the increasingly deranged testing of GLaDOS.',
        tags: ['portal', 'valve', 'glados', 'puzzle', 'physics', 'sci-fi', 'classic']
    },
    {
        id: 220,
        title: 'Half-Life 2',
        studio: 'Valve',
        genres: ['FPS', 'Sci-Fi', 'Classic'],
        year: 2004,
        rating: 4.99,
        trailer: 'https://www.youtube.com/embed/4tj4q1uYqAQ',
        desc: 'Take up the crowbar of Gordon Freeman on an alien-infested Earth being picked to the bone by the Combine. Revolutionary physics and storytelling.',
        tags: ['half-life', 'half-life 2', 'hl2', 'gordon freeman', 'valve', 'fps', 'gravity gun', 'classic', 'masterpiece']
    },
    // --- PAGE 4: COMPETITIVE, HORROR & STRATEGY GIANTS ---
    {
        id: 440,
        title: 'Team Fortress 2',
        studio: 'Valve',
        genres: ['Hero Shooter', 'FPS', 'Multiplayer'],
        year: 2007,
        rating: 4.95,
        trailer: 'https://www.youtube.com/embed/h_c3iQImXZg',
        desc: 'Nine distinct classes provide a broad range of tactical abilities in Valve’s beloved classic team-based FPS.',
        tags: ['team fortress 2', 'tf2', 'valve', 'hero shooter', 'fps', 'multiplayer', 'hats', 'classic']
    },
    {
        id: 550,
        title: 'Left 4 Dead 2',
        studio: 'Valve',
        genres: ['Co-op', 'Zombies', 'FPS'],
        year: 2009,
        rating: 4.97,
        trailer: 'https://www.youtube.com/embed/9XIle_2n52M',
        desc: 'Survive the zombie apocalypse across five campaigns spanning Savannah to New Orleans in legendary 4-player co-op.',
        tags: ['left 4 dead', 'l4d2', 'valve', 'zombies', 'co-op', 'fps', 'multiplayer', 'classic']
    },
    {
        id: 570,
        title: 'Dota 2',
        studio: 'Valve',
        genres: ['MOBA', 'Strategy', 'Competitive'],
        year: 2013,
        rating: 4.92,
        trailer: 'https://www.youtube.com/embed/-cSFPIwMEq4',
        desc: 'Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes in endless competitive strategy.',
        tags: ['dota 2', 'dota', 'moba', 'strategy', 'valve', 'esports', 'tactical', 'multiplayer']
    },
    {
        id: 2357570,
        title: 'Overwatch 2',
        studio: 'Blizzard Entertainment',
        genres: ['Hero Shooter', 'FPS', 'Action'],
        year: 2022,
        rating: 4.87,
        trailer: 'https://www.youtube.com/embed/LGgqyp2n48A',
        desc: 'An always-on and ever-evolving free-to-play team-based action game set in an optimistic future with 40+ unique heroes.',
        tags: ['overwatch', 'overwatch 2', 'hero shooter', 'fps', 'team-based', 'blizzard', 'competitive', 'multiplayer']
    },
    {
        id: 'genshin-impact',
        title: 'Genshin Impact',
        studio: 'HoYoverse',
        genres: ['Action RPG', 'Open World', 'Anime'],
        year: 2020,
        rating: 4.93,
        image: 'assets/images/games/genshin.svg',
        storeUrl: 'https://genshin.hoyoverse.com/',
        badge: 'web',
        trailer: 'https://www.youtube.com/embed/HLUY1613DEU',
        desc: 'Step into Teyvat, a vast fantasy world teeming with life and elemental energy. Switch between characters for elemental reactions and explore seven nations.',
        tags: ['genshin impact', 'genshin', 'hoyoverse', 'mihoyo', 'anime', 'open world', 'action rpg', 'elemental', 'gacha', 'co-op']
    },
    {
        id: 945360,
        title: 'Among Us',
        studio: 'Innersloth',
        genres: ['Social Deduction', 'Party', 'Multiplayer'],
        year: 2018,
        rating: 4.92,
        trailer: 'https://www.youtube.com/embed/NSJ4cESNQfE',
        desc: 'An online party game of teamwork and betrayal. Crewmates prep their spaceship while hidden Impostors sabotage and eliminate them.',
        tags: ['among us', 'social deduction', 'party', 'multiplayer', 'impostor', 'space', 'innersloth']
    },
    {
        id: 782330,
        title: 'DOOM Eternal',
        studio: 'id Software',
        genres: ['FPS', 'Action', 'Fast-Paced'],
        year: 2020,
        rating: 4.93,
        trailer: 'https://www.youtube.com/embed/_Gws7_Fz3yM',
        desc: 'Become the Doom Slayer in an unstoppable push-forward combat FPS across dimensions to raze Hell on Earth with visceral glory kills.',
        tags: ['doom', 'doom eternal', 'fps', 'id software', 'heavy metal', 'fast-paced', 'action']
    },
    {
        id: 374320,
        title: 'Dark Souls III',
        studio: 'FromSoftware',
        genres: ['Souls-like', 'Action RPG', 'Dark Fantasy'],
        year: 2016,
        rating: 4.94,
        trailer: 'https://www.youtube.com/embed/cWBwFnmsf9U',
        desc: 'Journey through Lothric to link the First Flame amidst colossal lords of cinder and relentless dark fantasy combat.',
        tags: ['dark souls', 'dark souls 3', 'fromsoftware', 'souls-like', 'difficult', 'action rpg']
    },
    {
        id: 814380,
        title: 'Sekiro: Shadows Die Twice',
        studio: 'FromSoftware',
        genres: ['Souls-like', 'Action', 'Stealth'],
        year: 2019,
        rating: 4.95,
        trailer: 'https://www.youtube.com/embed/rXMX4YSTWFw',
        desc: 'Carve your path to vengeance as the One-Armed Wolf in a lethal late 1500s Sengoku Japan with razor-sharp sword deflection combat.',
        tags: ['sekiro', 'fromsoftware', 'ninja', 'katana', 'deflect', 'souls-like', 'difficult', 'goty']
    },
    {
        id: 2050650,
        title: 'Resident Evil 4',
        studio: 'Capcom',
        genres: ['Survival Horror', 'Action', 'Third-Person'],
        year: 2023,
        rating: 4.96,
        trailer: 'https://www.youtube.com/embed/j5Xv2LXuW30',
        desc: 'Survival is just the beginning. Agent Leon S. Kennedy tracks the president’s kidnapped daughter to a secluded European village.',
        tags: ['resident evil', 're4', 'leon', 'capcom', 'survival horror', 'action']
    },
    {
        id: 1196590,
        title: 'Resident Evil Village',
        studio: 'Capcom',
        genres: ['Survival Horror', 'First-Person', 'Action'],
        year: 2021,
        rating: 4.91,
        trailer: 'https://www.youtube.com/embed/qkEhyzD_4C8',
        desc: 'Ethan Winters must survive horrific new terrors in a snow-capped village dominated by Lady Dimitrescu and mysterious lords.',
        tags: ['resident evil village', 're8', 'capcom', 'lady dimitrescu', 'horror', 'survival horror']
    },
    {
        id: 582010,
        title: 'Monster Hunter: World',
        studio: 'Capcom',
        genres: ['Action RPG', 'Co-op', 'Hunting'],
        year: 2018,
        rating: 4.88,
        trailer: 'https://www.youtube.com/embed/Ro6r15wzp2o',
        desc: 'Hunt gigantic beasts in a living, breathing ecosystem where you craft weapons and armor from fallen foes in 4-player co-op.',
        tags: ['monster hunter', 'capcom', 'hunting', 'co-op', 'action rpg']
    },
    // --- PAGE 5: SIMULATION, AUTOMATION & INDIE DARLINGS ---
    {
        id: 427520,
        title: 'Factorio',
        studio: 'Wube Software',
        genres: ['Automation', 'Base Building', 'Simulation'],
        year: 2020,
        rating: 4.99,
        trailer: 'https://www.youtube.com/embed/J8SBp4SyvLk',
        desc: 'Build and maintain automated factories to produce items of increasing complexity on an untamed alien world. The factory must grow.',
        tags: ['factorio', 'automation', 'factory', 'conveyor', 'base building', 'engineering', 'simulation']
    },
    {
        id: 526870,
        title: 'Satisfactory',
        studio: 'Coffee Stain Studios',
        genres: ['Automation', 'Factory Building', 'First-Person'],
        year: 2024,
        rating: 4.98,
        trailer: 'https://www.youtube.com/embed/1Jj53rK6_eI',
        desc: 'A first-person open-world factory building game with exploration and combat. Construct multi-story factories across alien vistas.',
        tags: ['satisfactory', 'automation', 'factory', 'first person', 'base building', 'crafting', 'co-op']
    },
    {
        id: 294100,
        title: 'RimWorld',
        studio: 'Ludeon Studios',
        genres: ['Colony Sim', 'Story Generator', 'Strategy'],
        year: 2018,
        rating: 4.99,
        trailer: 'https://www.youtube.com/embed/3tDrxOASmr4',
        desc: 'A sci-fi colony sim driven by an intelligent AI storyteller that generates emergent narrative triumphs, eccentricities, and tragedies.',
        tags: ['rimworld', 'colony sim', 'story generator', 'base building', 'survival', 'strategy']
    },
    {
        id: 264710,
        title: 'Subnautica',
        studio: 'Unknown Worlds',
        genres: ['Survival', 'Open World', 'Underwater'],
        year: 2018,
        rating: 4.96,
        trailer: 'https://www.youtube.com/embed/Rz2SNm8VguE',
        desc: 'Descend into the depths of an alien underwater world filled with wonder and perilous leviathans in survival crafting glory.',
        tags: ['subnautica', 'underwater', 'survival', 'ocean', 'ocean exploration', 'crafting', 'open world']
    },
    {
        id: 255710,
        title: 'Cities: Skylines',
        studio: 'Colossal Order',
        genres: ['City Builder', 'Simulation', 'Management'],
        year: 2015,
        rating: 4.92,
        trailer: 'https://www.youtube.com/embed/0gI2nVbPYuc',
        desc: 'A modern take on the classic city simulation with fully realized transport networks, zoning, and municipal management.',
        tags: ['cities skylines', 'city builder', 'simulation', 'traffic', 'urban planning', 'paradox']
    },
    {
        id: 289070,
        title: 'Sid Meier’s Civilization VI',
        studio: 'Firaxis Games',
        genres: ['4X', 'Turn-Based Strategy', 'Historical'],
        year: 2016,
        rating: 4.91,
        trailer: 'https://www.youtube.com/embed/5KdE0p2joJw',
        desc: 'Build an empire to stand the test of time. Advance your culture, conduct diplomacy, and conquer rival world leaders.',
        tags: ['civilization', 'civ 6', '4x', 'turn-based strategy', 'historical', 'firaxis']
    },
    {
        id: 1222670,
        title: 'The Sims 4',
        studio: 'Maxis / EA',
        genres: ['Life Sim', 'Sandbox', 'Building'],
        year: 2014,
        rating: 4.88,
        trailer: 'https://www.youtube.com/embed/z00mK3Pxc8w',
        desc: 'Unleash your imagination and create a unique world of Sims that’s an expression of you. Build dream homes and direct lives.',
        tags: ['the sims 4', 'the sims', 'sims', 'life sim', 'building', 'customization', 'sandbox', 'ea']
    },
    {
        id: 1551360,
        title: 'Forza Horizon 5',
        studio: 'Playground Games',
        genres: ['Racing', 'Open World', 'Automobile'],
        year: 2021,
        rating: 4.93,
        trailer: 'https://www.youtube.com/embed/FYH9n37B7Yw',
        desc: 'Your Ultimate Horizon Adventure awaits! Explore the vibrant landscapes of Mexico with limitless fun driving action in hundreds of world-class cars.',
        tags: ['forza', 'forza horizon 5', 'racing', 'cars', 'open world', 'mexico', 'arcade racing']
    },
    {
        id: 2195250,
        title: 'EA SPORTS FC 24',
        studio: 'EA Sports',
        genres: ['Sports', 'Football', 'Soccer'],
        year: 2023,
        rating: 4.85,
        trailer: 'https://www.youtube.com/embed/XhP3Xh4LMA8',
        desc: 'The World’s Game. Experience HyperMotionV realism, 19,000+ authentic players, 700+ teams, and 30+ leagues.',
        tags: ['fifa', 'ea sports fc 24', 'fc 24', 'football', 'soccer', 'sports', 'ultimate team']
    },
    {
        id: 391540,
        title: 'Undertale',
        studio: 'Toby Fox',
        genres: ['CRPG', 'Story Rich', 'Pixel Art'],
        year: 2015,
        rating: 4.99,
        trailer: 'https://www.youtube.com/embed/1Hojv0JW3l4',
        desc: 'The RPG where you don’t have to destroy anyone. Befriend strange underground creatures, dodge bullets, and decide fates in a timeless classic.',
        tags: ['undertale', 'sans', 'toby fox', 'rpg', 'choices matter', 'soundtrack', 'pixel art']
    },
    {
        id: 504230,
        title: 'Celeste',
        studio: 'Maddy Makes Games',
        genres: ['Precision Platformer', 'Pixel Art', 'Emotional'],
        year: 2018,
        rating: 4.99,
        trailer: 'https://www.youtube.com/embed/70d9irlxiB4',
        desc: 'Help Madeline conquer her inner demons as she scales the mysterious, treacherous heights of Celeste Mountain with razor-sharp jump controls.',
        tags: ['celeste', 'platformer', 'pixel art', 'difficult', 'emotional', 'indie', 'masterpiece']
    },
    {
        id: 2379780,
        title: 'Balatro',
        studio: 'LocalThunk',
        genres: ['Roguelike Deckbuilder', 'Strategy', 'Card Game'],
        year: 2024,
        rating: 4.99,
        trailer: 'https://www.youtube.com/embed/wzXQ6Q2l6oE',
        desc: 'The poker roguelike. Play illegal poker hands, discover game-changing jokers, and trigger adrenaline-fueled combos.',
        tags: ['balatro', 'poker', 'deckbuilder', 'roguelike', 'card game', 'localthunk']
    },
    // --- PAGE 6: CO-OP HITS, DECKBUILDERS & SCI-FI ---
    {
        id: 553850,
        title: 'Helldivers 2',
        studio: 'Arrowhead Game Studios',
        genres: ['Co-op Shooter', 'Third-Person', 'Sci-Fi'],
        year: 2024,
        rating: 4.88,
        trailer: 'https://www.youtube.com/embed/l_v5_vA1B4Q',
        desc: 'Join the Helldivers and battle for freedom across a hostile galaxy in fast, frantic third-person cooperative action against Terminids and Automatons.',
        tags: ['helldivers', 'helldivers 2', 'co-op', 'shooter', 'sci-fi', 'action', 'multiplayer']
    },
    {
        id: 1966720,
        title: 'Lethal Company',
        studio: 'Zeekerss',
        genres: ['Co-op Horror', 'First-Person', 'Comedy'],
        year: 2023,
        rating: 4.97,
        trailer: 'https://www.youtube.com/embed/kR7Q9v2Zk_s',
        desc: 'Scavenge abandoned industrialized moons to meet the Company profit quota with up to 4 brave crewmates with hilarious proximity voice chat.',
        tags: ['lethal company', 'co-op', 'horror', 'comedy', 'first-person', 'zeekerss']
    },
    {
        id: 739630,
        title: 'Phasmophobia',
        studio: 'Kinetic Games',
        genres: ['Horror', 'Co-op', 'Psychological'],
        year: 2020,
        rating: 4.94,
        trailer: 'https://www.youtube.com/embed/srax3Xb6aB4',
        desc: 'A 4-player online co-op psychological horror where paranormal activity is on the rise and ghost hunting begins.',
        tags: ['phasmophobia', 'horror', 'co-op', 'ghost hunting', 'psychological horror', 'vr']
    },
    {
        id: 646570,
        title: 'Slay the Spire',
        studio: 'MegaCrit',
        genres: ['Roguelike Deckbuilder', 'Card Game', 'Strategy'],
        year: 2019,
        rating: 4.98,
        trailer: 'https://www.youtube.com/embed/F_n15O_j5uI',
        desc: 'Craft a unique deck, encounter bizarre creatures, and discover relics of immense power in the spire.',
        tags: ['slay the spire', 'deckbuilder', 'roguelike', 'card game', 'strategy']
    },
    {
        id: 230410,
        title: 'Warframe',
        studio: 'Digital Extremes',
        genres: ['Looter Shooter', 'Action', 'Sci-Fi'],
        year: 2013,
        rating: 4.93,
        trailer: 'https://www.youtube.com/embed/4yZ4o4q9G9M',
        desc: 'Awaken as an unstoppable warrior and fight alongside friends in a story-driven free-to-play online action game with fluid parkour.',
        tags: ['warframe', 'ninja', 'looter shooter', 'co-op', 'sci-fi', 'parkour']
    },
    {
        id: 1085660,
        title: 'Destiny 2',
        studio: 'Bungie',
        genres: ['FPS', 'Looter Shooter', 'MMO'],
        year: 2019,
        rating: 4.88,
        trailer: 'https://www.youtube.com/embed/hdWkPbPTpmE',
        desc: 'Explore the mysteries of the solar system and experience responsive first-person shooter combat and cinematic raids.',
        tags: ['destiny', 'destiny 2', 'bungie', 'looter shooter', 'fps', 'mmo', 'space']
    },
    {
        id: 1172620,
        title: 'Sea of Thieves',
        studio: 'Rare / Xbox',
        genres: ['Open World', 'Co-op', 'Pirates'],
        year: 2020,
        rating: 4.91,
        trailer: 'https://www.youtube.com/embed/r5JIBaSuMRQ',
        desc: 'Offers the essential pirate experience, from sailing and fighting to exploring and looting in a colorful open ocean.',
        tags: ['sea of thieves', 'pirates', 'sailing', 'multiplayer', 'co-op', 'naval combat']
    },
    {
        id: 322170,
        title: 'Geometry Dash',
        studio: 'RobTop Games',
        genres: ['Rhythm', 'Platformer', 'Difficult'],
        year: 2014,
        rating: 4.96,
        trailer: 'https://www.youtube.com/embed/k90y6GoPCUY',
        desc: 'Jump and fly your way through danger in this rhythm-based action platformer with custom community levels and pumping electronic music.',
        tags: ['geometry dash', 'rhythm', 'platformer', 'music', 'fast-paced']
    },
    {
        id: 1364780,
        title: 'Street Fighter 6',
        studio: 'Capcom',
        genres: ['Fighting', 'Action', 'Competitive'],
        year: 2023,
        rating: 4.94,
        trailer: 'https://www.youtube.com/embed/1INKuLNsub0',
        desc: 'Experience three distinct modes: World Tour, Fighting Ground and Battle Hub with Capcom’s deep Drive System mechanics.',
        tags: ['street fighter', 'sf6', 'fighting', 'capcom', 'competitive', 'arcade']
    },
    {
        id: 1778820,
        title: 'Tekken 8',
        studio: 'Bandai Namco',
        genres: ['Fighting', 'Action', 'Competitive'],
        year: 2024,
        rating: 4.92,
        trailer: 'https://www.youtube.com/embed/2hPuRQz6IlM',
        desc: 'Fist Meets Fate. Experience the next chapter in the longest-running video game storyline with devastating Heat mechanics.',
        tags: ['tekken', 'tekken 8', 'fighting', 'bandai namco', '3d fighter']
    },
    {
        id: 359550,
        title: 'Tom Clancy’s Rainbow Six Siege',
        studio: 'Ubisoft',
        genres: ['Tactical Shooter', 'FPS', 'Multiplayer'],
        year: 2015,
        rating: 4.90,
        trailer: 'https://www.youtube.com/embed/6wlvYh0h63k',
        desc: 'Master the art of destruction and gadgetry in intense close-quarters tactical 5v5 team firefights.',
        tags: ['rainbow six', 'r6', 'siege', 'tactical shooter', 'fps', 'competitive']
    },
    {
        id: 381210,
        title: 'Dead by Daylight',
        studio: 'Behaviour Interactive',
        genres: ['Survival Horror', 'Asymmetrical Multiplayer', 'Horror'],
        year: 2016,
        rating: 4.91,
        trailer: 'https://www.youtube.com/embed/JGhIXLO3GZY',
        desc: 'A multiplayer 4v1 horror game where one player takes on the role of the savage Killer and four try to survive.',
        tags: ['dead by daylight', 'dbd', 'horror', 'survival', 'multiplayer', 'killer']
    },
    // --- PAGE 7: CULT MASTERPIECES & NARRATIVE DRAMA ---
    {
        id: 548430,
        title: 'Deep Rock Galactic',
        studio: 'Ghost Ship Games',
        genres: ['Co-op', 'FPS', 'Mining'],
        year: 2020,
        rating: 4.98,
        trailer: 'https://www.youtube.com/embed/2_m6sJ9T7x4',
        desc: '1-4 player co-op FPS featuring badass space Dwarves, 100% destructible environments, procedurally-generated caves, and endless alien hordes.',
        tags: ['deep rock galactic', 'drg', 'dwarves', 'co-op', 'mining', 'fps']
    },
    {
        id: 108600,
        title: 'Project Zomboid',
        studio: 'The Indie Stone',
        genres: ['Survival', 'Zombies', 'Sandbox'],
        year: 2013,
        rating: 4.94,
        trailer: 'https://www.youtube.com/embed/WbWfRzI3aC4',
        desc: 'The ultimate in zombie survival. Hardcore sandbox RPG where you loot, build, craft, fight, farm and fish in a struggle to survive.',
        tags: ['project zomboid', 'survival', 'zombies', 'sandbox', 'isometric', 'permadeath']
    },
    {
        id: 1716740,
        title: 'Starfield',
        studio: 'Bethesda Game Studios',
        genres: ['RPG', 'Open World', 'Space'],
        year: 2023,
        rating: 4.84,
        trailer: 'https://www.youtube.com/embed/kfYEiTdsyas',
        desc: 'In this next generation role-playing game set amongst the stars, create any character you want and explore over 1,000 planets.',
        tags: ['starfield', 'bethesda', 'space', 'rpg', 'open world', 'sci-fi']
    },
    {
        id: 753640,
        title: 'Outer Wilds',
        studio: 'Mobius Digital',
        genres: ['Space', 'Exploration', 'Mystery'],
        year: 2019,
        rating: 4.99,
        trailer: 'https://www.youtube.com/embed/d6LGnVCL1_A',
        desc: 'An open-world mystery about a solar system trapped in an endless 22-minute time loop. Knowledge is your only progression.',
        tags: ['outer wilds', 'space', 'time loop', 'exploration', 'mystery', 'goty']
    },
    {
        id: 632360,
        title: 'Disco Elysium - The Final Cut',
        studio: 'ZA/UM',
        genres: ['CRPG', 'Story Rich', 'Detective'],
        year: 2019,
        rating: 4.95,
        trailer: 'https://www.youtube.com/embed/iA3zZ3_5_hM',
        desc: 'You are a detective with a unique skill system at your disposal and a whole city block to carve your path across in Revachol.',
        tags: ['disco elysium', 'zaum', 'detective', 'crpg', 'story rich', 'choices matter', 'goty']
    },
    {
        id: 1222140,
        title: 'Detroit: Become Human',
        studio: 'Quantic Dream',
        genres: ['Narrative', 'Sci-Fi', 'Choices Matter'],
        year: 2018,
        rating: 4.92,
        trailer: 'https://www.youtube.com/embed/sAm4sF-0j_M',
        desc: 'Step into the shoes of three distinct androids as they awaken to emotion, moral dilemmas, and revolution in Detroit 2038.',
        tags: ['detroit', 'detroit become human', 'quantic dream', 'android', 'connor', 'choices matter']
    },
    {
        id: 319630,
        title: 'Life is Strange',
        studio: 'DONTNOD Entertainment',
        genres: ['Narrative', 'Adventure', 'Choices Matter'],
        year: 2015,
        rating: 4.95,
        trailer: 'https://www.youtube.com/embed/AURVxvIZrmU',
        desc: 'Rewind time as photography student Max Caulfield and unravel the haunting mystery of Arcadia Bay with Chloe Price.',
        tags: ['life is strange', 'max caulfield', 'chloe price', 'choices matter', 'time travel', 'emotional']
    },
    {
        id: 960910,
        title: 'Heavy Rain',
        studio: 'Quantic Dream',
        genres: ['Mystery', 'Thriller', 'Choices Matter'],
        year: 2010,
        rating: 4.82,
        trailer: 'https://www.youtube.com/embed/wE3Qz9bA0r8',
        desc: 'Hunt the elusive Origami Killer across four intertwined character perspectives where any choice can result in permanent death.',
        tags: ['heavy rain', 'origami killer', 'quantic dream', 'mystery', 'choices matter']
    },
    {
        id: 960990,
        title: 'Beyond: Two Souls',
        studio: 'Quantic Dream',
        genres: ['Action', 'Sci-Fi', 'Cinematic'],
        year: 2013,
        rating: 4.79,
        trailer: 'https://www.youtube.com/embed/MtEoS0MaNyA',
        desc: 'Live the extraordinary life of Jodie Holmes and her ethereal connection to a powerful supernatural entity named Aiden.',
        tags: ['beyond two souls', 'jodie holmes', 'quantic dream', 'cinematic']
    },
    {
        id: 8870,
        title: 'BioShock Infinite',
        studio: 'Irrational Games',
        genres: ['FPS', 'Story Rich', 'Steampunk'],
        year: 2013,
        rating: 4.92,
        trailer: 'https://www.youtube.com/embed/bLHW78X1XeE',
        desc: 'Rescue the enigmatic Elizabeth from the floating sky-city of Columbia in an unforgettable quantum-steampunk voyage.',
        tags: ['bioshock', 'bioshock infinite', 'elizabeth', 'steampunk', 'fps']
    },
    {
        id: 1328670,
        title: 'Mass Effect Legendary Edition',
        studio: 'BioWare',
        genres: ['Sci-Fi', 'RPG', 'Choices Matter'],
        year: 2021,
        rating: 4.95,
        trailer: 'https://www.youtube.com/embed/n8i53TtQ6BQ',
        desc: 'Relive the cinematic space opera of Commander Shepard across the legendary remastered original trilogy.',
        tags: ['mass effect', 'shepard', 'bioware', 'sci-fi', 'rpg', 'choices matter']
    },
    {
        id: 1687950,
        title: 'Persona 5 Royal',
        studio: 'Atlus',
        genres: ['JRPG', 'Anime', 'Turn-Based'],
        year: 2022,
        rating: 4.98,
        trailer: 'https://www.youtube.com/embed/VpXymh_e8O4',
        desc: 'Don the mask of the Phantom Thieves, infiltrate palaces of corrupt adults, and balance high school life in Tokyo.',
        tags: ['persona 5', 'p5r', 'atlus', 'jrpg', 'anime', 'turn-based']
    }
];
export class CatalogEngine {
    static ITEMS_PER_PAGE = 12;
    static TOTAL_GAMES = 5000;
    static TOTAL_PAGES = Math.ceil(CatalogEngine.TOTAL_GAMES / CatalogEngine.ITEMS_PER_PAGE);
    static allCurated = [];
    static allGames = [];
    static gamesById = new Map();
    static gamesByTitle = new Map();
    static {
        this.allCurated = this.buildCuratedLibrary();
        this.allGames = this.buildFullLibrary();
        this.allGames.forEach((g) => {
            this.gamesById.set(g.id, g);
            this.gamesByTitle.set(g.title.toLowerCase().trim(), g);
        });
    }
    static getAllCurated() {
        return this.allCurated;
    }
    static getAllGames() {
        return this.allGames;
    }
    static getCuratedByTitle(title) {
        const clean = title.toLowerCase().trim();
        if (this.gamesByTitle.has(clean))
            return this.gamesByTitle.get(clean);
        return this.allGames.find(g => g.title.toLowerCase().trim() === clean || g.title.toLowerCase().includes(clean));
    }
    static getGameById(id) {
        return this.gamesById.get(id);
    }
    static buildCuratedLibrary() {
        const list = [];
        CURATED_GAMES.forEach((g) => {
            const isSteam = typeof g.id === 'number';
            const steamUrl = isSteam
                ? `https://store.steampowered.com/app/${g.id}/`
                : (g.storeUrl || 'https://www.minecraft.net/');
            const capsule = g.image || (isSteam
                ? `https://shared.steamstatic.com/store_item_assets/steam/apps/${g.id}/capsule_616x353.jpg`
                : 'assets/images/games/minecraft.png');
            const badge = g.badge || (isSteam ? 'steam' : 'web');
            const tags = [
                ...g.genres.map(x => x.toLowerCase()),
                g.title.toLowerCase(),
                g.studio.toLowerCase(),
                ...(g.tags || []),
            ];
            const item = {
                id: isSteam ? `steam-${g.id}` : `curated-${g.id}`,
                title: g.title,
                subtitle: `${g.genres.join(' • ')} Experience`,
                description: g.desc,
                image: capsule,
                genres: g.genres,
                tags,
                rating: g.rating,
                releaseYear: g.year,
                developer: g.studio,
                studioUrl: isSteam
                    ? `https://store.steampowered.com/search/?developer=${encodeURIComponent(g.studio)}`
                    : steamUrl,
                videoTrailer: g.trailer,
                reviewsSummary: g.rating >= 4.95 ? 'Overwhelmingly Positive' : g.rating >= 4.88 ? 'Very Positive' : 'Positive',
                reviewCount: `${Math.floor(45000 + (typeof g.id === 'number' ? (g.id % 95000) : 85000)).toLocaleString()} Verified Reviews`,
                platforms: [
                    { name: badge === 'steam' ? 'Steam Store' : 'Official Portal', url: steamUrl, badge },
                ],
                embedding: VectorEngine.embedText(`${g.title} ${g.desc} ${g.genres.join(' ')} ${g.studio} ${tags.join(' ')}`),
            };
            list.push(item);
        });
        return list;
    }
    static generateEnrichedDescription(title, studio, genres, year, sentiment, positiveReviews) {
        const genreSnippets = {
            Shooter: 'Engage in fast-paced tactical firefights with precision weapon handling, ballistic recoil control, and intense combat engagements.',
            Multiplayer: 'Team up with allies or battle rivals in dynamic online lobbies featuring competitive squad coordination and community matchmaking.',
            Survival: 'Overcome harsh environmental hazards, manage hunger and vital resources, craft essential gear, and withstand deadly hostile threats.',
            'Open World': 'Explore a sprawling open world filled with nonlinear quests, dynamic weather events, hidden secrets, and total player autonomy.',
            Crafting: 'Harvest raw materials and assemble advanced tools, weaponry, fortifications, and technological upgrades through extensive crafting trees.',
            RPG: 'Customize your character build, unlock specialized skill trees, collect rare equipment, and embark on epic narrative questlines.',
            'Action RPG': 'Deliver fluid combat combos, master dodge and parry timing, and develop unique class archetypes against formidable bosses.',
            Action: 'Experience high-octane set-pieces, fluid movement mechanics, and thrilling combat encounters that test your reflexes.',
            Adventure: 'Unravel immersive lore, navigate perilous landscapes, interact with intriguing characters, and solve environmental obstacles.',
            Strategy: 'Formulate grand tactical doctrines, command armies, manage supply chains, and outmaneuver opponent factions on the grand map.',
            'City Builder': 'Architect urban zones, balance infrastructure networks, manage citizen needs, and expand a bustling civilization.',
            Simulation: 'Master realistic mechanical systems, authentic physics simulations, and true-to-life operational management.',
            Management: 'Optimize complex logistics, balance fiscal budgets, supervise personnel, and scale efficient operational workflows.',
            Roguelike: 'Embark on permadeath procedural runs where discovering synergistic relic combinations is key to conquering escalating danger.',
            'Survival Horror': 'Endure psychological dread, scarce resources, claustrophobic corridors, and terrifying adversaries in an eerie, unsettling atmosphere.',
            Atmospheric: 'Immerse yourself in haunting ambient audio design, evocative environmental storytelling, and breathtaking visual moods.',
            Automation: 'Design intricate automated conveyor systems, optimize factory production pipelines, and scale continuous manufacturing loops.',
            'Base Building': 'Construct defensive perimeters, automate power grids, and engineer modular bases to support growing industrial operations.',
            Racing: 'Push high-performance vehicles to their limits with realistic drift physics, vehicle tuning, and razor-sharp cornering.',
            Driving: 'Navigate rugged terrains, heavy transport machinery, and detailed vehicle cabins across challenging vehicular routes.',
            Puzzle: 'Exercise lateral thinking to solve intricate spatial mechanisms, logic puzzles, and mind-bending environmental challenges.',
            'Co-op': 'Coordinate strategies with friends in drop-in cooperative play where communication and teamwork decide victory.',
        };
        const highlights = genres
            .map((g) => genreSnippets[g])
            .filter(Boolean)
            .slice(0, 3)
            .join(' ');
        return `${title} is an acclaimed ${genres.join(' / ')} experience developed by ${studio}. ${highlights} Released in ${year}, the game holds a ${sentiment} status on Steam with over ${positiveReviews.toLocaleString()} verified positive reviews.`;
    }
    static buildFullLibrary() {
        const list = [...this.allCurated];
        const seenTitles = new Set();
        const seenAppIds = new Set();
        this.allCurated.forEach(g => {
            seenTitles.add(g.title.toLowerCase().replace(/[^a-z0-9]/g, ''));
            const numId = g.id.replace(/\D/g, '');
            if (numId)
                seenAppIds.add(numId);
        });
        for (const [appid, title, studio, genresStr, year, rating, positiveReviews] of REAL_STEAM_GAMES) {
            if (list.length >= this.TOTAL_GAMES)
                break;
            const normTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
            const strId = String(appid);
            if (seenTitles.has(normTitle) || seenAppIds.has(strId))
                continue;
            seenTitles.add(normTitle);
            seenAppIds.add(strId);
            const genres = genresStr.split(',').map(x => x.trim()).filter(Boolean);
            const tags = [
                ...genres.map(x => x.toLowerCase()),
                title.toLowerCase(),
                studio.toLowerCase(),
                'steam',
                'pc gaming',
            ];
            const steamUrl = `https://store.steampowered.com/app/${appid}/`;
            const capsule = `https://shared.steamstatic.com/store_item_assets/steam/apps/${appid}/header.jpg`;
            const sentiment = rating >= 4.8 ? 'Overwhelmingly Positive' : rating >= 4.5 ? 'Very Positive' : 'Positive';
            const richDesc = this.generateEnrichedDescription(title, studio, genres, year, sentiment, positiveReviews);
            list.push({
                id: `steam-${appid}`,
                title,
                subtitle: `${genres.slice(0, 2).join(' • ')} Experience`,
                description: richDesc,
                image: capsule,
                genres: genres.length > 0 ? genres : ['Action', 'Adventure'],
                tags,
                rating,
                releaseYear: year,
                developer: studio,
                studioUrl: `https://store.steampowered.com/search/?developer=${encodeURIComponent(studio)}`,
                videoTrailer: '', // Populated dynamically via /api/trailer?appid=${appid}
                reviewsSummary: sentiment,
                reviewCount: `${positiveReviews.toLocaleString()} Positive Reviews`,
                platforms: [
                    { name: 'Steam Store', url: steamUrl, badge: 'steam' },
                ],
                embedding: VectorEngine.embedText(`${title} ${genres.join(' ')} ${studio} ${richDesc.slice(0, 200)}`),
            });
        }
        return list;
    }
    static getPage(pageNumber) {
        const page = Math.max(1, Math.min(this.TOTAL_PAGES, Math.floor(pageNumber)));
        const start = (page - 1) * this.ITEMS_PER_PAGE;
        const end = start + this.ITEMS_PER_PAGE;
        const items = this.allGames.slice(start, end);
        return {
            games: items,
            totalPages: this.TOTAL_PAGES,
            totalCount: this.allGames.length,
            currentPage: page,
        };
    }
    static searchCatalog(query, pageNumber = 1) {
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
        const searchPool = this.allGames;
        const scoredMatches = [];
        const allScored = [];
        const isControllerQuery = trimmed === 'controller' || trimmed === 'gamepad';
        const isTopRatedQuery = trimmed === 'toprated' || trimmed === 'top rated' || trimmed === '99%' || trimmed === '100%';
        const isMultiplayerQuery = trimmed === 'co-op' || trimmed === 'multiplayer';
        for (const game of searchPool) {
            let cosSim = VectorEngine.cosineSimilarity(queryVector, game.embedding);
            let fuzzyScore = VectorEngine.computeFuzzyScore(trimmed, game);
            if (isControllerQuery) {
                const hasAction = game.genres.some(g => /action|shooter|rpg|adventure|combat|platform/i.test(g)) ||
                    game.tags.some(t => /action|controller|gamepad|fps|rpg|combat/i.test(t));
                if (hasAction) {
                    fuzzyScore = Math.max(fuzzyScore, 0.92);
                }
            }
            else if (isTopRatedQuery) {
                if (game.rating >= 4.90) {
                    fuzzyScore = Math.max(fuzzyScore, 0.95);
                }
            }
            else if (isMultiplayerQuery) {
                const hasMultiplayer = game.genres.some(g => /multiplayer|co-op|pvp|mmo|online|sandbox/i.test(g)) ||
                    game.tags.some(t => /multiplayer|co-op|coop|pvp|mmo|online/i.test(t));
                if (hasMultiplayer) {
                    fuzzyScore = Math.max(fuzzyScore, 0.94);
                }
            }
            let hybrid = 0;
            if (fuzzyScore >= 0.70) {
                hybrid = Math.min(0.9945, fuzzyScore * 0.90 + cosSim * 0.10);
            }
            else {
                hybrid = Math.min(0.95, cosSim * 0.65 + fuzzyScore * 0.35);
            }
            // Format clean two-decimal similarity
            const finalSim = fuzzyScore >= 0.70 ? Math.max(hybrid, fuzzyScore) : hybrid;
            const normalizedSim = Number(Math.min(0.9945, Math.max(0.35, finalSim)).toFixed(4));
            const queryTokens = trimmed.split(/\s+/).filter(t => t.length > 2);
            const commonTags = game.tags.filter(t => queryTokens.some(tok => t.includes(tok) || tok.includes(t)));
            const matchObj = {
                game,
                similarity: normalizedSim,
                fuzzyScore,
                hybridScore: hybrid,
                commonTags,
            };
            allScored.push(matchObj);
            if (fuzzyScore >= 0.60 || hybrid > 0.30 || cosSim > 0.35) {
                scoredMatches.push(matchObj);
            }
        }
        // Direct matches filter: when direct title/tag/acronym matches exist, show ONLY them!
        const directMatches = scoredMatches.filter((m) => m.fuzzyScore >= 0.70);
        const candidateList = directMatches.length > 0
            ? directMatches
            : scoredMatches.filter((m) => m.fuzzyScore >= 0.50 || m.hybridScore >= 0.30);
        // If still empty, fall back to best candidates — cosine similarity always
        // produces a ranking for every embedded game, so search NEVER returns zero results.
        const finalList = candidateList.length > 0 ? candidateList : allScored.slice(0, 36);
        // Precise descending sort: direct fuzzy title hits rank at top, then hybrid similarity
        finalList.sort((a, b) => {
            if (a.fuzzyScore >= 0.70 || b.fuzzyScore >= 0.70) {
                if (Math.abs(b.fuzzyScore - a.fuzzyScore) > 0.001) {
                    return b.fuzzyScore - a.fuzzyScore;
                }
            }
            return b.hybridScore - a.hybridScore;
        });
        const totalCount = finalList.length;
        const totalPages = Math.max(1, Math.ceil(totalCount / this.ITEMS_PER_PAGE));
        const safePage = Math.max(1, Math.min(totalPages, pageNumber));
        const offset = (safePage - 1) * this.ITEMS_PER_PAGE;
        const pageMatches = finalList.slice(offset, offset + this.ITEMS_PER_PAGE);
        return {
            matches: pageMatches,
            totalPages,
            totalCount,
            currentPage: safePage,
        };
    }
    /**
     * Vector Search API integration querying Pinecone Vector DB with OpenRouter embeddings
     */
    static async searchCatalogVectorAPI(query, pageNumber = 1) {
        const trimmed = query.trim();
        if (!trimmed) {
            const base = this.searchCatalog('', pageNumber);
            return { ...base, source: 'local' };
        }
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}&limit=72`);
            if (response.ok) {
                const json = await response.json();
                if (json.success && Array.isArray(json.matches) && json.matches.length > 0) {
                    const allMatches = json.matches.map((m) => {
                        const rawGame = m.game;
                        const isSteam = typeof rawGame.id === 'string' && rawGame.id.startsWith('steam-');
                        const numericSteamId = isSteam ? parseInt(rawGame.id.replace('steam-', ''), 10) : null;
                        const steamUrl = rawGame.storeUrl || (numericSteamId ? `https://store.steampowered.com/app/${numericSteamId}/` : 'https://samtagon.com');
                        const extendedGame = {
                            id: rawGame.id,
                            title: rawGame.title,
                            subtitle: rawGame.subtitle || `${rawGame.genres ? (Array.isArray(rawGame.genres) ? rawGame.genres.join(' • ') : rawGame.genres) : 'Action'} Experience`,
                            description: rawGame.desc,
                            image: rawGame.image,
                            genres: Array.isArray(rawGame.genres) ? rawGame.genres : (rawGame.genres ? rawGame.genres.split(', ') : []),
                            tags: Array.isArray(rawGame.tags) ? rawGame.tags : (rawGame.tags ? rawGame.tags.split(', ') : []),
                            rating: rawGame.rating || 4.9,
                            releaseYear: rawGame.year || 2023,
                            developer: rawGame.studio || 'Game Studio',
                            studioUrl: steamUrl,
                            videoTrailer: rawGame.trailer,
                            reviewsSummary: rawGame.rating >= 4.95 ? 'Overwhelmingly Positive' : 'Very Positive',
                            reviewCount: 'Verified Global Reviews',
                            platforms: [{ name: rawGame.badge || 'steam', url: steamUrl, badge: rawGame.badge || 'steam' }],
                            embedding: [],
                        };
                        return {
                            game: extendedGame,
                            similarity: m.similarity,
                            fuzzyScore: m.fuzzyScore,
                            hybridScore: m.hybridScore,
                            commonTags: m.commonTags || [],
                        };
                    });
                    const totalCount = allMatches.length;
                    const totalPages = Math.max(1, Math.ceil(totalCount / this.ITEMS_PER_PAGE));
                    const safePage = Math.max(1, Math.min(totalPages, pageNumber));
                    const offset = (safePage - 1) * this.ITEMS_PER_PAGE;
                    const pageMatches = allMatches.slice(offset, offset + this.ITEMS_PER_PAGE);
                    return {
                        matches: pageMatches,
                        totalPages,
                        totalCount,
                        currentPage: safePage,
                        source: json.source || 'pinecone',
                        model: json.model,
                    };
                }
            }
        }
        catch (e) {
            console.warn('[CatalogEngine] Vector search API unavailable; using local engine:', e);
        }
        const localResult = this.searchCatalog(query, pageNumber);
        return {
            ...localResult,
            source: 'local',
            model: 'Local Hybrid',
        };
    }
    static getSimilarGames(targetGame, count = 3) {
        const targetEmb = targetGame.embedding && targetGame.embedding.length === 128
            ? targetGame.embedding
            : VectorEngine.embedText(`${targetGame.title} ${targetGame.genres.join(' ')} ${targetGame.developer}`);
        const pool = this.allCurated.length >= count ? this.allCurated : this.allGames;
        const candidates = pool.filter(g => g.id !== targetGame.id);
        const matches = [];
        candidates.forEach(cand => {
            const candEmb = cand.embedding && cand.embedding.length === 128
                ? cand.embedding
                : VectorEngine.embedText(`${cand.title} ${cand.genres.join(' ')} ${cand.developer}`);
            const sim = VectorEngine.cosineSimilarity(targetEmb, candEmb);
            const sharedGenres = cand.genres.filter(cg => targetGame.genres.includes(cg)).length;
            const finalScore = sim * 0.8 + (sharedGenres * 0.08);
            matches.push({ game: cand, score: finalScore });
        });
        matches.sort((a, b) => b.score - a.score);
        return matches.slice(0, count).map(m => m.game);
    }
}
//# sourceMappingURL=catalog-engine.js.map
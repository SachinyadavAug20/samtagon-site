# SAMTAGON &bull; Official Game Development Studio Website

> **Architects of Kinetic Systems & Procedural Worlds**  
> The official showcase website for **Samtagon Games & Systems Lab**.

---

## Overview

A modern, framework-free game dev studio website built purely with **HTML5**, **CSS3 (Modular Tokens)**, and **TypeScript**. 

Engineered to showcase Samtagon's game portfolio, low-level technical philosophy (C++17, Raylib 6.0, Godot, procedural audio synthesis), and the signature **Infinite Loop Engine** from *Metro Grid* (Cognition GameJam '26).

---

## Highlights & Features

1. **Formal Vector Branding**:
   - Custom SVG logo mark (`samtagon-logo-mark.svg`): Octagonal kinetic circuit emblem representing game loops and isometric geometry.
   - Full horizontal wordmark (`samtagon-logo-full.svg`): High-tracking typographic studio identity.
   - Vector favicon (`favicon.svg`).

2. **The Infinite Transit Loop (Interactive In-Browser Simulation)**:
   - 60 FPS HTML5 Canvas simulation powered by TypeScript.
   - 3-Aspect Automatic Block Signalling (Green / Yellow / Red).
   - Passenger routing with Shape-Coded Badges (Square, Circle, Triangle, Cross).
   - Interactive speed governor (0x Pause, 1x Normal, 2x Rapid, 4x Warp).
   - Real-time telemetry: Delivered commuters, active EMU cars, and line dispatch state.
   - Wayside signal toggling directly via canvas clicks or UI lamps.

3. **100% Procedural Audio Synthesizer**:
   - Zero external audio files or sound library dependencies.
   - Web Audio API procedural synthesis mirroring Metro Grid's VVVF traction motor whine, pneumatic door chimes, and alert signals.

4. **Flagship Game Showcase: Metro Grid**:
   - Deep dive into the 2.5D Isometric urban transit simulator built for Cognition GameJam '26.
   - Real gameplay screenshots and autonomous loop proofs.
   - Links to play directly in browser on itch.io (WebAssembly build) and view the C++ source.

5. **Multi-Engine Game Vault**:
   - Filterable catalog by engine (*C++ / Raylib*, *Godot*, *Unity*).
   - Dynamic cards with tech highlights, mechanics breakdowns, and full-resolution screenshot lightbox.

6. **Devlog & Milestone Timeline**:
   - Chronological chronicle of Samtagon's technical evolution.

---

## Architecture & Directory Structure

```
website/
├── index.html              # Main studio homepage & interactive lab
├── games.html              # Dedicated games catalog & technical specs
├── about.html              # Studio manifesto, philosophy, & creator rig
├── package.json            # Scripts & TypeScript dependencies
├── tsconfig.json           # Strict TypeScript configuration
├── .gitignore              # Clean git ignore definitions
├── css/
│   ├── variables.css       # Design tokens, color palette, & typography
│   ├── base.css            # Global resets, base typography, & utility classes
│   ├── components.css      # Buttons, badges, cards, modals, & navigation
│   ├── infinite-loop.css   # Simulator styling, HUD, marquee, & signal lamps
│   └── responsive.css      # Breakpoints for mobile, tablet, and widescreen
├── src/ts/
│   ├── main.ts             # Application bootstrapper & event coordinator
│   ├── infinite-loop-canvas.ts # 60 FPS Canvas transit simulation engine
│   ├── hero-canvas.ts      # Kinetic geometric background canvas
│   ├── audio-synth.ts      # Pure procedural Web Audio API synthesizer
│   ├── games-data.ts       # Structured registry of Samtagon titles
│   ├── games-filter.ts     # Engine filtering & dynamic card renderer
│   └── modal.ts            # Lightbox zoom & detail modal controller
├── dist/js/                # Clean compiled vanilla JavaScript (ES2022)
└── assets/
    ├── logos/              # Samtagon vector marks and full emblems (SVG)
    └── images/
        ├── metro-grid/     # Real C++ / Raylib gameplay screenshots & loop proof
        └── space-shooter/  # Godot pixel art assets & backgrounds
```

---

## Build & Development

The project requires **Node.js** or **Bun** to compile TypeScript:

### Compile TypeScript
```bash
# Using npm
npm run build

# Or using Bun
bun run build

# Watch mode during development
npm run watch
```

### Local Preview
Open `index.html` directly in any modern browser, or launch a local web server:
```bash
# Using bun
bunx serve .

# Or using npx
npx serve .

# Or using Python
python3 -m http.server 8000
```

---

## Creator & Studio Credits

- **Studio:** Samtagon Games & Systems Lab
- **Creator:** Sachin Chandra Yadav
- **Email:** samtagon777@gmail.com
- **itch.io:** [sachinapr20.itch.io](https://sachinapr20.itch.io/)
- **GitHub:** [SachinyadavAug20](https://github.com/SachinyadavAug20)
- **X (Twitter):** [@samtagon38824](https://x.com/samtagon38824)

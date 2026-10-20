#!/usr/bin/env bash
# Regenerates all raster brand/OG assets from inline SVG templates.
# Usage: bun run generate:assets  (or: bash scripts/gen-og-assets.sh)
set -euo pipefail
cd "$(dirname "$0")/.."

BG="#0A0F1D"
PANEL="#0D1226"
AMBER="#F59E0B"
AMBER_SOFT="#FBBF24"
EMERALD="#10B981"
CYAN="#22D3EE"
TEXT="#F4F5F7"
MUTED="#8B93A7"
FONT_SANS="DejaVu Sans"
FONT_MONO="JetBrains Mono"

logo_mark() {  # hexagon brand mark positioned via args: x y scale color-accent
  cat <<EOF
    <g transform="translate($1,$2) scale($3)">
      <polygon points="23,2 42,13 42,33 23,44 4,33 4,13" fill="$BG" stroke="#2E3138" stroke-width="1.5"/>
      <polygon points="23,6 38,14.5 38,22 23,14" fill="$4"/>
      <polygon points="12,15 23,9 23,14 12,20" fill="$5"/>
      <polygon points="12,20 23,14 34,27 23,33" fill="$4"/>
      <polygon points="34,27 23,33 23,38 34,32" fill="#18191D" stroke="#2E3138" stroke-width="0.5"/>
      <polygon points="23,33 8,25.5 8,33 23,41" fill="$6"/>
      <polygon points="23,21 26,24 23,27 20,24" fill="#FFFFFF"/>
      <circle cx="23" cy="24" r="1.2" fill="$4"/>
    </g>
EOF
}

hex_grid() {  # decorative faint hex lattice, args: opacity
  local o=$1
  cat <<EOF
    <g opacity="$o" stroke="#1E2742" stroke-width="1" fill="none">
      ${for row in 0 1 2 3 4 5;
        for col in $(seq 0 9); do
          x=$((col*140)); y=$((row*130));
          xo=$((x+70)); [ $((row%2)) = 1 ] && xo=$((xo+70));
          printf '<polygon points="%d,%d %d,%d %d,%d %d,%d %d,%d %d,%d"/>' \
            $((xo+16)) $((y-26)) $((xo+80)) $((y-26)) $((xo+96)) $((y+26)) $((xo+80)) $((y+78)) $((xo+16)) $((y+78)) $((xo)) $((y+26)) | sed 's/null,0,0/0,0/' || true
        done;
      done}
    </g>
EOF
}

gen_og() {  # $1 outfile, $2 headline, $3 tagline mono, $4 accent
  {
    cat <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bgg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="$BG"/>
      <stop offset="100%" stop-color="${4}22"/>
    </linearGradient>
    <radialGradient id="glow" gradientUnits="userSpaceOnUse" cx="1010" cy="105" r="300">
      <stop offset="0%" stop-color="${4}3C"/>
      <stop offset="100%" stop-color="${4}00"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="$BG"/>
  <rect width="1200" height="630" fill="url(#bgg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <line x1="0" y1="630" x2="1200" y2="585" stroke="#1E2742" stroke-width="2"/>
  <line x1="0" y1="600" x2="1200" y2="558" stroke="#151D33" stroke-width="1"/>
EOF
    logo_mark 88 210 3.2 "$4" "#D97706" "#FB7185"
    cat <<EOF
  <text x="330" y="296" font-family="$FONT_SANS" font-weight="bold" font-size="100" letter-spacing="8" fill="$TEXT">SAMTAGON</text>
  <text x="333" y="348" font-family="$FONT_MONO" font-weight="bold" font-size="28" letter-spacing="12" fill="$4">GAME STUDIOS</text>
  <text x="90" y="492" font-family="$FONT_SANS" font-weight="bold" font-size="42" fill="$TEXT">$2</text>
  <text x="92" y="545" font-family="$FONT_MONO" font-size="21" letter-spacing="2" fill="$MUTED">$3</text>
  <circle cx="1080" cy="120" r="58" fill="none" stroke="${4}55" stroke-width="2"/>
  <circle cx="1080" cy="120" r="30" fill="${4}44"/>
</svg>
EOF
  } > "/tmp/opencode/$1.svg"
  rsvg-convert -w 1200 -h 630 "/tmp/opencode/$1.svg" -o "assets/logos/$1.png"
}

# Brand object used across the studio
# AMBER hexagon + rose/rust counterweight, matching site palette
gen_og "og-home-banner"    "Handcrafted indie games. Infinite loops."        "C++17 · RAYLIB · GODOT · WEBASSEMBLY — FREE TO PLAY IN YOUR BROWSER" "$AMBER"
gen_og "og-games-banner"   "The games catalog — deep dives &amp; playables."  "METRO GRID · VOID PROTOCOL · ALIEN BLASTER — FULL TECHNICAL BREAKDOWNS" "$CYAN"
gen_og "og-rec-banner"     "Find your next game in a heartbeat."             "VECTOR SEMANTIC SEARCH ACROSS 5,000 REAL STEAM TITLES — FUZZY FIND" "$AMBER_SOFT"
gen_og "og-about-banner"   "Systems first. Zero engine bloat."               "THE STUDIO MANIFESTO — LOW-LEVEL ENGINEERING · PROCEDURAL AUDIO" "$EMERALD"

# Apple touch + fallback PNG icons from the SVG favicon
rsvg-convert -w 180 -h 180 assets/logos/favicon.svg  -o assets/logos/apple-touch-icon.png
rsvg-convert -w 512 -h 512 assets/logos/favicon.svg  -o assets/logos/icon-512.png
rsvg-convert -w 192 -h 192 assets/logos/favicon.svg  -o assets/logos/icon-192.png
# Square 600x600 OG fallback for /api references
rsvg-convert -w 600 -h 600 assets/logos/samtagon-logo-mark.svg -o assets/logos/og-square.png 2>/dev/null || true

echo "✅ Raster brand assets regenerated:"
ls -la assets/logos/*.png | awk '{print "  " $9, "("$5" bytes)"}'

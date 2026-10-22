/**
 * Samtagon Interactive Smoke Background
 * Full-viewport living fog: ambient drifting wisps + puffs that bloom
 * out of the cursor trail. Canvas 2D, pooled particles, theme-aware.
 */
const AMBIENT_COUNT = 26;
const MAX_PUFFS = 140;
const PUFF_LIFE = 3.1;
function makeSprite(lead, mid, edge, alpha = 1.0) {
    const sprite = document.createElement('canvas');
    sprite.width = 256;
    sprite.height = 256;
    const sctx = sprite.getContext('2d');
    if (!sctx)
        return sprite;
    // Broken-up pseudo-cloud: several offset radial blobs for wispy edges
    const blobDefs = [
        [128, 132, 118, 1.0],
        [96, 108, 64, 0.55],
        [170, 112, 72, 0.6],
        [104, 168, 68, 0.5],
        [166, 166, 62, 0.55],
        [134, 96, 46, 0.45],
    ];
    for (const [bx, by, br, bAlpha] of blobDefs) {
        const grad = sctx.createRadialGradient(bx, by, 0, bx, by, br);
        grad.addColorStop(0, `rgba(${lead.join(',')}, ${alpha * bAlpha})`);
        grad.addColorStop(0.55, `rgba(${mid.join(',')}, ${alpha * bAlpha * 0.5})`);
        grad.addColorStop(1, `rgba(${edge.join(',')}, 0)`);
        sctx.fillStyle = grad;
        sctx.beginPath();
        sctx.arc(bx, by, br, 0, Math.PI * 2);
        sctx.fill();
    }
    return sprite;
}
export function initSmokeBackground() {
    const canvas = document.getElementById('mist-canvas');
    if (!canvas)
        return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx)
        return;
    // ------------------------------------------------------------------
    // Tier heuristics: adapt density/quality to device capability
    // ------------------------------------------------------------------
    const cores = navigator.hardwareConcurrency || 2;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const tier = cores <= 2 ? 'minimal' : isCoarsePointer || cores <= 4 ? 'balanced' : 'rich';
    const dprCap = tier === 'minimal' ? 1 : tier === 'balanced' ? 1.5 : 2;
    // ------------------------------------------------------------------
    // Palettes (dark-mode mist / light-mode slate)
    // ------------------------------------------------------------------
    let sprites = [];
    let sprayGains = [1, 1, 1];
    let additive = true;
    const buildSprites = () => {
        const dark = document.documentElement.getAttribute('data-theme') !== 'light';
        if (dark) {
            sprites = [
                makeSprite([40, 58, 92], [26, 38, 66], [9, 12, 20]), // deep navy core
                makeSprite([16, 52, 62], [13, 40, 52], [9, 11, 18]), // teal drift
                makeSprite([28, 62, 46], [20, 48, 40], [10, 13, 12]), // pine fog (reference mood)
                makeSprite([72, 51, 24], [46, 35, 20], [12, 9, 6], 0.9), // warm ember glow
            ];
            sprayGains = [0.3, 0.38, 0.2, 0.12];
            additive = true;
        }
        else {
            sprites = [
                makeSprite([198, 206, 220], [222, 229, 239], [248, 250, 252]),
                makeSprite([188, 210, 222], [220, 233, 241], [250, 251, 252]),
                makeSprite([244, 224, 180], [250, 242, 224], [253, 252, 250], 0.8),
            ];
            sprayGains = [0.5, 0.4, 0.1];
            additive = false;
        }
    };
    buildSprites();
    // ------------------------------------------------------------------
    // State
    // ------------------------------------------------------------------
    let dpr = 1;
    let w = 0;
    let h = 0;
    const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, dprCap);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const fog = [];
    const seedFog = () => {
        while (fog.length)
            fog.pop();
        const count = tier === 'minimal' ? 14 : tier === 'balanced' ? 20 : AMBIENT_COUNT;
        for (let i = 0; i < count; i++) {
            fog.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: (tier === 'minimal' ? 0.9 : 1) * (230 + Math.random() * 330),
                driftX: (Math.random() - 0.5) * (reducedMotion ? 1.2 : 5),
                driftY: 2 + Math.random() * 7,
                alpha: (tier === 'minimal' ? 0.8 : 1) * (0.13 + Math.random() * 0.13),
                phase: Math.random() * Math.PI * 2,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.05,
                sprite: sprites[i % sprites.length],
            });
        }
    };
    seedFog();
    // Floating dust motes — tiny specks that drift and shy from the cursor
    const MOTE_COUNT = 46;
    const motes = [];
    const seedMotes = () => {
        while (motes.length)
            motes.pop();
        const count = tier === 'minimal' ? 16 : tier === 'balanced' ? 28 : MOTE_COUNT;
        for (let i = 0; i < count; i++) {
            motes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: 0,
                vy: 0,
                size: 1 + Math.random() * 1.7,
                alpha: 0.22 + Math.random() * 0.38,
                phase: Math.random() * Math.PI * 2,
            });
        }
    };
    seedMotes();
    const pooled = [];
    const pickSprite = () => {
        const total = sprayGains.reduce((a, b) => a + b, 0);
        let pick = Math.random() * total;
        for (let i = 0; i < sprayGains.length; i++) {
            pick -= sprayGains[i];
            if (pick <= 0 && sprites[i])
                return sprites[i];
        }
        return sprites[0];
    };
    const spawnPuff = (x, y, boost) => {
        let p = pooled.find((c) => c.life >= c.maxLife);
        if (!p) {
            if (pooled.length >= (tier === 'minimal' ? 46 : MAX_PUFFS))
                return;
            p = { x: 0, y: 0, vx: 0, vy: 0, r0: 0, r1: 0, life: 0, maxLife: 0, alpha: 0, rot: 0, rotSpeed: 0, sprite: sprites[0] };
            pooled.push(p);
        }
        p.x = x + (Math.random() - 0.5) * 26;
        p.y = y + (Math.random() - 0.5) * 26;
        p.vx = (Math.random() - 0.5) * 14;
        p.vy = -7 - Math.random() * 15;
        p.r0 = 34 + Math.random() * 38 * boost;
        p.r1 = p.r0 * (2.9 + Math.random() * 1.6);
        p.maxLife = PUFF_LIFE * (0.75 + Math.random() * 0.6);
        p.life = 0;
        p.alpha = (0.16 + Math.random() * 0.12) * Math.min(boost, 1.35);
        p.rot = Math.random() * Math.PI * 2;
        p.rotSpeed = (Math.random() - 0.5) * 0.6;
        p.sprite = pickSprite();
    };
    // ------------------------------------------------------------------
    // Pointer tracking
    // ------------------------------------------------------------------
    const pointer = { x: -1, y: -1, px: -1, py: -1, px2: -1, py2: -1 };
    let lastSpawn = 0;
    const onPointerMove = (e) => {
        if (reducedMotion)
            return;
        pointer.px2 = pointer.px;
        pointer.py2 = pointer.py;
        pointer.px = pointer.x;
        pointer.py = pointer.y;
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        if (pointer.px < 0)
            return;
        const now = performance.now();
        if (now - lastSpawn < 22)
            return;
        lastSpawn = now;
        const dx = pointer.x - pointer.px2;
        const dy = pointer.y - pointer.py2;
        const speed = Math.hypot(dx, dy);
        const boost = Math.min(1.45, 0.7 + speed * 0.01);
        spawnPuff(pointer.x, pointer.y, boost);
        spawnPuff(pointer.px, pointer.py, boost * 0.6);
        if (speed > 42 && tier !== 'minimal')
            spawnPuff(pointer.x, pointer.y, boost * 0.5);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', () => {
        resize();
        seedFog();
        seedMotes();
    });
    let running = true;
    document.addEventListener('visibilitychange', () => {
        running = !document.hidden;
        if (running)
            tick(performance.now());
    });
    // ------------------------------------------------------------------
    // Frame loop
    // ------------------------------------------------------------------
    let prevTime = performance.now();
    const tick = (now) => {
        if (!running)
            return;
        const dt = Math.min(0.05, (now - prevTime) / 1000);
        prevTime = now;
        const t = now * 0.001;
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';
        // Ambient fog — slow rise with breathing alpha
        for (const blob of fog) {
            blob.x += blob.driftX * dt;
            blob.y -= blob.driftY * dt;
            if (blob.y < -blob.r) {
                blob.y = h + blob.r;
                blob.x = Math.random() * w;
            }
            if (blob.x < -blob.r)
                blob.x = w + blob.r;
            if (blob.x > w + blob.r)
                blob.x = -blob.r;
            blob.rot += blob.rotSpeed * dt;
            const breathe = 0.72 + Math.sin(t * 0.35 + blob.phase) * 0.28;
            ctx.save();
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = blob.alpha * breathe;
            ctx.translate(blob.x, blob.y);
            ctx.rotate(blob.rot);
            const s = (blob.r / 132) * (0.95 + Math.sin(t * 0.22 + blob.phase * 1.7) * 0.1);
            ctx.scale(s, s * 0.88);
            ctx.drawImage(blob.sprite, -128, -128);
            ctx.restore();
        }
        // Dust motes — drift, shimmer, and scatter from the cursor
        const moteBright = additive;
        for (const mote of motes) {
            const dxc = mote.x - pointer.x;
            const dyc = mote.y - pointer.y;
            const dist = Math.hypot(dxc, dyc);
            if (pointer.x >= 0 && dist < 150 && !reducedMotion) {
                const push = (1 - dist / 150) * 120 * dt;
                mote.vx += (dxc / (dist || 1)) * push;
                mote.vy += (dyc / (dist || 1)) * push;
            }
            mote.vx += Math.sin(t * 0.6 + mote.phase) * 1.6 * dt;
            mote.vy += (-3 - Math.sin(t * 0.4 + mote.phase) * 2) * dt * 0.35;
            mote.vx *= 0.985;
            mote.vy *= 0.985;
            mote.x += mote.vx * dt;
            mote.y += mote.vy * dt;
            if (mote.y < -12)
                mote.y = h + 10;
            if (mote.y > h + 12)
                mote.y = -10;
            if (mote.x < -12)
                mote.x = w + 10;
            if (mote.x > w + 12)
                mote.x = -10;
            const shimmer = 0.6 + Math.abs(Math.sin(t * 1.3 + mote.phase)) * 0.4;
            ctx.save();
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = mote.alpha * shimmer;
            if (moteBright) {
                ctx.fillStyle = 'rgb(182, 202, 226)';
                ctx.shadowColor = 'rgba(160, 195, 240, 0.85)';
                ctx.shadowBlur = 5;
            }
            else {
                ctx.fillStyle = 'rgb(96, 110, 124)';
            }
            ctx.beginPath();
            ctx.arc(mote.x, mote.y, mote.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        // Cursor smoke — additive glow on dark theme so the trail reads clearly
        for (const p of pooled) {
            if (p.life >= p.maxLife)
                continue;
            p.life += dt;
            const k = p.life / p.maxLife;
            const ease = k * k;
            p.x += (p.vx + Math.sin(t * 1.4 + p.r0) * 6) * dt;
            p.y += (p.vy - 22 * ease) * dt;
            const r = p.r0 + (p.r1 - p.r0) * ease;
            ctx.save();
            ctx.globalCompositeOperation = additive ? 'lighter' : 'source-over';
            ctx.globalAlpha = p.alpha * (1 - ease) * (1 - k * 0.2);
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot + p.rotSpeed * k * 3);
            ctx.scale(r / 128, r / 118);
            ctx.drawImage(p.sprite, -128, -128);
            ctx.restore();
        }
        requestAnimationFrame(tick);
        requestAnimationFrame(() => canvas.classList.add('mist-ready'));
    };
    requestAnimationFrame(tick);
    // Theme flip → rebuild sprites
    const themeObs = new MutationObserver(() => {
        buildSprites();
        fog.forEach((f, i) => (f.sprite = sprites[i % sprites.length]));
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}
//# sourceMappingURL=smoke-bg.js.map
/**
 * Samtagon Game Studios — Zen Minimal Portal
 * Pure, simple, beautiful, zero clutter:
 * - Floating 3D Toy Transit Diorama
 * - Soothing procedural acoustics
 * - Direct access to handcrafted games
 */
import { ProceduralAudio } from './audio-synth.js';
import { ThreeStage } from './three-stage.js';
import gsap from 'gsap';
function initMain() {
    // 1. Procedural Audio Synthesizer (Acoustic feedback on interaction)
    const audio = new ProceduralAudio();
    window.samtagonAudio = audio;
    // 2. Interactive 3D Toy Diorama
    let stage = null;
    try {
        stage = new ThreeStage('three-viewport', audio);
        window.samtagonStage = stage;
    }
    catch (err) {
        console.warn('Three.js stage init fallback:', err);
    }
    // 3. Playful acoustics & micro-interactions
    setupZenInteractions(stage, audio);
    console.log('Samtagon Studios online. Zen mode active.');
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
}
else {
    initMain();
}
function setupZenInteractions(stage, audio) {
    // 1. Cozy Night / Daylight Theme Toggle (Default to System Mode or Stored Theme)
    const savedTheme = localStorage.getItem('samtagon_theme');
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    let isDarkMode = themeParam ? themeParam === 'dark' : (savedTheme ? savedTheme === 'dark' : true);
    const applyTheme = (dark, immediate = false) => {
        if (dark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('samtagon_theme', 'dark');
            stage?.setNightMode(true, immediate);
        }
        else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('samtagon_theme', 'light');
            stage?.setNightMode(false, immediate);
        }
    };
    applyTheme(isDarkMode, true);
    // Listen to OS system color scheme changes
    window.matchMedia?.('(prefers-color-scheme: dark)')?.addEventListener('change', (e) => {
        isDarkMode = e.matches;
        applyTheme(isDarkMode, false);
        if (isDarkMode) {
            audio.playChime(523.25, 0.08); // C5 twilight chime
        }
        else {
            audio.playMorningBirdSong();
        }
    });
    const themeBtn = document.getElementById('theme-toggle-btn');
    themeBtn?.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        applyTheme(isDarkMode, false);
        if (isDarkMode) {
            audio.playChime(523.25, 0.08); // C5 twilight chime
        }
        else {
            audio.playMorningBirdSong(); // Joyful morning birdsong chirp on sunrise!
        }
    });
    // Audio Mute / Unmute Toggle
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
        const unmuted = audio.toggleMute();
        updateAudioUI(unmuted);
    });
    window.addEventListener('keydown', (e) => {
        if (e.code === 'KeyM') {
            const unmuted = audio.toggleMute();
            updateAudioUI(unmuted);
        }
    });
    // 2. Stage View Presets (Isometric, Top-Down, Cab, Cinematic, Director, Trackside)
    const viewBtns = document.querySelectorAll('[data-view]');
    const cinemaBadge = document.getElementById('mobile-cinema-badge');
    const cinemaCutBtn = document.getElementById('cinema-cut-btn');
    viewBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            viewBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;
            stage?.setViewMode(view);
            audio.playButtonPress();
            if (cinemaBadge) {
                cinemaBadge.style.display = view === 'director' ? 'inline-flex' : 'none';
            }
        });
    });
    cinemaCutBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        stage?.cutDirectorAngle();
    });
    // 3. Train Speed Presets (1x, 2x, Wheee!)
    const speedBtns = document.querySelectorAll('[data-speed]');
    speedBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            speedBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            const speed = parseFloat(btn.dataset.speed || '1');
            stage?.setSpeed(speed);
            audio.playButtonPress();
        });
    });
    // 4. Weather Presets (Fair, Rain)
    const weatherBtns = document.querySelectorAll('[data-weather]');
    weatherBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            weatherBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            const isRain = btn.dataset.weather === 'rain';
            stage?.setWeather(isRain ? 'rain' : 'fair');
            audio.playButtonPress();
        });
    });
    // 5. Interactive Toot Whistle Button
    const whistleBtn = document.getElementById('whistle-btn');
    whistleBtn?.addEventListener('click', () => {
        stage?.triggerWhistleHop();
    });
    // 5. Flagship Play Button
    const playBtn = document.getElementById('play-flagship-btn');
    playBtn?.addEventListener('click', () => {
        audio.playChime(660, 0.1);
    });
    // 5b. Smooth Page Transition to Game Recommendations
    const recBtn = document.getElementById('game-rec-engine-btn') || document.querySelector('a[href="recommendations.html"]');
    recBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        audio.playChime(523.25, 0.08);
        setTimeout(() => audio.playChime(659.25, 0.12), 90);
        const mainEl = document.querySelector('.zen-page');
        if (mainEl) {
            gsap.to(mainEl, {
                opacity: 0,
                y: -14,
                scale: 0.985,
                duration: 0.28,
                ease: 'power2.inOut',
                onComplete: () => {
                    window.location.href = 'recommendations.html';
                },
            });
        }
        else {
            window.location.href = 'recommendations.html';
        }
    });
    // 6. Game pills acoustic feedback
    document.querySelectorAll('.game-pill').forEach((pill, idx) => {
        const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]; // Pentatonic C scale
        const note = notes[idx % notes.length];
        pill.addEventListener('mouseenter', () => {
            audio.playChime(note, 0.04);
        });
        pill.addEventListener('click', () => {
            audio.playChime(note * 1.5, 0.08);
            stage?.triggerWhistleHop();
        });
    });
    // 7. Logo micro-interaction
    const brand = document.querySelector('.zen-brand');
    brand?.addEventListener('click', () => {
        audio.playChime(880, 0.12);
        stage?.triggerWhistleHop();
    });
    // 8. Deep-link URL params (?view=engine & ?theme=dark)
    const requestedView = urlParams.get('view');
    if (requestedView) {
        viewBtns.forEach((b) => b.classList.toggle('active', b.dataset.view === requestedView));
        stage?.setViewMode(requestedView);
    }
    // 9. Tactile Sharp GSAP Button Interactions
    setupGsapButtonInteractions();
}
function setupGsapButtonInteractions() {
    // 1. Primary & Secondary CTA Action Buttons
    const ctaBtns = document.querySelectorAll('.zen-btn');
    ctaBtns.forEach((btn) => {
        const arrow = btn.querySelector('.btn-arrow-icon');
        const icon = btn.querySelector('svg:not(.btn-arrow-icon)');
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { y: -3, scale: 1.025, duration: 0.16, ease: 'power2.out', overwrite: 'auto' });
            if (arrow)
                gsap.to(arrow, { x: 3, y: -3, duration: 0.16, ease: 'power2.out', overwrite: 'auto' });
            if (icon)
                gsap.to(icon, { scale: 1.15, duration: 0.18, ease: 'back.out(2)', overwrite: 'auto' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { y: 0, scale: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
            if (arrow)
                gsap.to(arrow, { x: 0, y: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
            if (icon)
                gsap.to(icon, { scale: 1, rotation: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
        });
        btn.addEventListener('mousedown', () => {
            gsap.to(btn, { y: 1, scale: 0.96, duration: 0.08, ease: 'power1.in', overwrite: 'auto' });
        });
        btn.addEventListener('mouseup', () => {
            gsap.to(btn, { y: -3, scale: 1.025, duration: 0.24, ease: 'back.out(2.5)', overwrite: 'auto' });
        });
    });
    // 2. Toolbar Stage & Speed Buttons
    const toolbarBtns = document.querySelectorAll('.stage-icon-btn, .stage-speed-btn, .zen-theme-toggle');
    toolbarBtns.forEach((btn) => {
        const svg = btn.querySelector('svg');
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { y: -2, duration: 0.14, ease: 'power2.out', overwrite: 'auto' });
            if (svg)
                gsap.to(svg, { scale: 1.15, duration: 0.16, ease: 'back.out(2)', overwrite: 'auto' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { y: 0, scale: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
            if (svg)
                gsap.to(svg, { scale: 1, rotation: 0, x: 0, y: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
        });
        btn.addEventListener('mousedown', () => {
            gsap.to(btn, { scale: 0.92, duration: 0.08, ease: 'power1.in', overwrite: 'auto' });
        });
        btn.addEventListener('mouseup', () => {
            gsap.to(btn, { scale: 1, duration: 0.2, ease: 'back.out(3)', overwrite: 'auto' });
        });
    });
    // 3. Steam Whistle Dynamic Wobble Blast Animation
    const whistleBtn = document.getElementById('whistle-btn');
    whistleBtn?.addEventListener('click', () => {
        const whistleSvg = whistleBtn.querySelector('svg');
        if (whistleSvg) {
            gsap.fromTo(whistleSvg, { rotation: -16, scale: 1.25 }, {
                rotation: 16,
                scale: 1.1,
                duration: 0.045,
                repeat: 7,
                yoyo: true,
                ease: 'sine.inOut',
                onComplete: () => {
                    gsap.to(whistleSvg, { rotation: 0, scale: 1, duration: 0.12 });
                },
            });
        }
    });
    // 4. Locomotive Train Engine Button Lunge Animation
    const engineBtn = document.querySelector('[data-view="engine"]');
    engineBtn?.addEventListener('click', () => {
        const engineSvg = engineBtn.querySelector('svg');
        if (engineSvg) {
            gsap.fromTo(engineSvg, { x: -5, scale: 1.2 }, {
                x: 4,
                duration: 0.09,
                repeat: 3,
                yoyo: true,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.to(engineSvg, { x: 0, scale: 1, duration: 0.12 });
                },
            });
        }
    });
    // 5. Theme Toggle 360 Spin Animation
    const themeToggle = document.getElementById('theme-toggle-btn');
    themeToggle?.addEventListener('click', () => {
        const activeSvg = themeToggle.querySelector('svg:not([style*="none"])') || themeToggle.querySelector('svg');
        if (activeSvg) {
            gsap.fromTo(activeSvg, { rotation: -180, scale: 0.6 }, { rotation: 0, scale: 1, duration: 0.45, ease: 'back.out(2)' });
        }
    });
}
//# sourceMappingURL=main.js.map
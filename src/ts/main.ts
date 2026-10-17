/**
 * Samtagon Game Studios — Zen Minimal Portal
 * Pure, simple, beautiful, zero clutter:
 * - Floating 3D Toy Transit Diorama
 * - Soothing procedural acoustics
 * - Direct access to handcrafted games
 */

import { ProceduralAudio } from './audio-synth.js';
import { ThreeStage } from './three-stage.js';

declare global {
  interface Window {
    samtagonAudio: ProceduralAudio;
    samtagonStage: ThreeStage;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Procedural Audio Synthesizer (Acoustic feedback on interaction)
  const audio = new ProceduralAudio();
  window.samtagonAudio = audio;

  // 2. Interactive 3D Toy Diorama
  let stage: ThreeStage | null = null;
  try {
    stage = new ThreeStage('three-viewport', audio);
    window.samtagonStage = stage;
  } catch (err) {
    console.warn('Three.js stage init fallback:', err);
  }

  // 3. Playful acoustics & micro-interactions
  setupZenInteractions(stage, audio);

  console.log('Samtagon Studios online. Zen mode active.');
});

function setupZenInteractions(stage: ThreeStage | null, audio: ProceduralAudio): void {
  // 1. Cozy Night / Daylight Theme Toggle (Default to System Mode)
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let isDarkMode = prefersDark;

  if (isDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    stage?.setNightMode(true, true); // Immediate dark mode for system dark preference
  } else {
    document.documentElement.removeAttribute('data-theme');
    stage?.setNightMode(false, true); // Immediate light mode for system light preference
  }

  // Listen to OS system color scheme changes
  window.matchMedia?.('(prefers-color-scheme: dark)')?.addEventListener('change', (e) => {
    isDarkMode = e.matches;
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      audio.playChime(523.25, 0.08); // C5 twilight chime
      stage?.setNightMode(true);
    } else {
      document.documentElement.removeAttribute('data-theme');
      audio.playMorningBirdSong();
      stage?.setNightMode(false);
    }
  });

  const themeBtn = document.getElementById('theme-toggle-btn');

  themeBtn?.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      audio.playChime(523.25, 0.08); // C5 twilight chime
      stage?.setNightMode(true); // Smooth GSAP sunset animation!
    } else {
      document.documentElement.removeAttribute('data-theme');
      audio.playMorningBirdSong(); // Joyful morning birdsong chirp on sunrise!
      stage?.setNightMode(false); // Smooth GSAP sunrise animation!
    }
  });

  // Audio Mute / Unmute Toggle
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
  const viewBtns = document.querySelectorAll<HTMLButtonElement>('[data-view]');
  viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      viewBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.dataset.view as 'isometric' | 'top' | 'cinematic' | 'director' | 'trackside';
      stage?.setViewMode(view);
      audio.playButtonPress();
    });
  });

  // 3. Train Speed Presets (1x, 2x, Wheee!)
  const speedBtns = document.querySelectorAll<HTMLButtonElement>('[data-speed]');
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
  const weatherBtns = document.querySelectorAll<HTMLButtonElement>('[data-weather]');
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

  // 6. Game pills acoustic feedback
  document.querySelectorAll<HTMLAnchorElement>('.game-pill').forEach((pill, idx) => {
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
}

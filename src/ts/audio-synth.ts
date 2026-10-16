/**
 * Procedural Audio Synthesizer (Zero External Audio Files)
 * Inspired by Metro Grid's procedural Raylib VVVF audio engine.
 */

export class ProceduralAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;

  constructor() {
    // Auto-unlock Web Audio upon the first user interaction gesture
    const unlock = () => {
      this.initContext();
      this.isMuted = false;
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
  }

  public initContext(): void {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.18;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    if (!this.isMuted) {
      this.playChime(523.25, 0.1); // C5 notification
      setTimeout(() => this.playChime(659.25, 0.15), 100); // E5
    }
    return !this.isMuted;
  }

  public getStatus(): boolean {
    return !this.isMuted;
  }

  /**
   * High-pitch pleasant UI chime
   */
  public playChime(freq: number = 880, duration: number = 0.12): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Train VVVF Motor Whine (Metro Grid procedural traction tone)
   */
  public playVVVFWhine(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Signal Change Click
   */
  public playSignalClick(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'square';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.setValueAtTime(160, now + 0.03);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Snappy Button Press Acoustic
   */
  public playButtonPress(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Station Boarding Bell / Double Chime
   */
  public playBoardingBell(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(1046.5, now); // C6
      osc2.frequency.setValueAtTime(1318.51, now); // E6

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.2);
      osc2.stop(now + 0.2);
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Authentic Toy Wooden Train Whistle ("Toot Toot!")
   */
  public playWhistle(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [587.33, 783.99, 987.77]; // G major chord (D5, G5, B5)

      // Double toot: short toot then longer sustained toot
      const bursts = [
        { time: now, dur: 0.14 },
        { time: now + 0.18, dur: 0.36 },
      ];

      bursts.forEach(({ time, dur }) => {
        freqs.forEach((freq, idx) => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq * 0.98, time);
          osc.frequency.linearRampToValueAtTime(freq, time + 0.04);

          gain.gain.setValueAtTime(0.001, time);
          gain.gain.linearRampToValueAtTime(0.08 / freqs.length, time + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(time);
          osc.stop(time + dur + 0.05);
        });
      });
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Soothing Procedural Rain Sound Generator
   */
  private rainSource: AudioBufferSourceNode | null = null;
  private rainGain: GainNode | null = null;

  public setRain(active: boolean): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      if (active) {
        if (this.rainSource) return; // already playing

        // Generate 2 seconds of pink/rain noise buffer
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.04;
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(950, this.ctx.currentTime);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 1.2);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        source.start();
        this.rainSource = source;
        this.rainGain = gain;
      } else {
        if (this.rainSource && this.rainGain) {
          const now = this.ctx.currentTime;
          this.rainGain.gain.linearRampToValueAtTime(0.001, now + 0.8);
          setTimeout(() => {
            try {
              this.rainSource?.stop();
              this.rainSource?.disconnect();
              this.rainSource = null;
              this.rainGain = null;
            } catch {
              // ignore
            }
          }, 850);
        }
      }
    } catch {
      // Audio safety fallback
    }
  }

  /**
   * Playful Soft Foliage Rustle when clicking trees
   */
  public playRustle(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // ignore
    }
  }

  /**
   * Water Drop Plink (for river / rain puddles)
   */
  public playWaterDrop(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200 + Math.random() * 400, now);
      osc.frequency.exponentialRampToValueAtTime(1800 + Math.random() * 400, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // ignore
    }
  }

  /**
   * Gentle Water Slosh / Oar Plash for moored boat interaction
   */
  public playBoatSlosh(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.18);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.18);

      // Subsequent soft water ripple
      setTimeout(() => this.playWaterDrop(), 60);
    } catch {
      // ignore
    }
  }

  /**
   * Cheerful Tiny Bell Hop for sheep meeples
   */
  public playSheepHop(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(659.25, now); // E5
      osc.frequency.linearRampToValueAtTime(880, now + 0.08); // A5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch {
      // ignore
    }
  }

  /**
   * Resonant Crystal Lantern Ping for bridge gas lamps
   */
  public playLanternSpark(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, now); // A6
      osc.frequency.exponentialRampToValueAtTime(2200, now + 0.22);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // ignore
    }
  }

  /**
   * Continuous Rhythmic Rail Click-Clack over rail joints
   */
  public playRailClickClack(speedMultiplier: number = 1.0, isInsideTunnel: boolean = false): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const vol = isInsideTunnel ? 0.14 : 0.075;
      const cutoff = isInsideTunnel ? 700 : 1500;

      // Click 1 (Leading axle)
      this.synthesizeAxleClick(now, 1080 + Math.random() * 80, vol, cutoff);
      // Click 2 (Trailing axle 45ms later)
      this.synthesizeAxleClick(now + 0.045, 920 + Math.random() * 80, vol * 0.8, cutoff);
    } catch {
      // ignore
    }
  }

  private synthesizeAxleClick(time: number, freq: number, volume: number, filterCutoff: number): void {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterCutoff, time);
    filter.Q.setValueAtTime(3.2, time);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(140, time + 0.038);

    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.038);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.04);
  }

  /**
   * Steam Locomotive Chuff-Chuff Exhaust Puff
   */
  public playSteamChuff(isInsideTunnel: boolean = false): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const dur = 0.085;

      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.32));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isInsideTunnel ? 380 : 680, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(isInsideTunnel ? 0.11 : 0.065, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
    } catch {
      // ignore
    }
  }

  /**
   * Railroad Crossing Warning Bell
   */
  public playCrossingBell(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1480, now);
      osc.frequency.exponentialRampToValueAtTime(1470, now + 0.16);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // ignore
    }
  }

  /**
   * Station Clocktower Chime
   */
  public playStationClock(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      [440, 554.37, 659.25].forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.12, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.55);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.6);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Telegraph Pole Acoustic Hum
   */
  public playTelegraphPing(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.14);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch {
      // ignore
    }
  }

  /**
   * Speed Acceleration Whoosh
   */
  public playSpeedWhoosh(speedMultiplier: number): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(220 * speedMultiplier, now + 0.28);

      gain.gain.setValueAtTime(0.11, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // ignore
    }
  }

  /**
   * Breezy Wooden Creak and Flutter for spinning windmill sails
   */
  public playWindmillSpin(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      [180, 240, 360].forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + idx * 0.05 + 0.22);

        gain.gain.setValueAtTime(0.08, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.28);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Rhythmic Waterwheel Splash Paddle
   */
  public playWaterwheel(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.16);

      setTimeout(() => this.playWaterDrop(), 50);
    } catch {
      // ignore
    }
  }

  /**
   * Mechanical Track Switch Lever Clank
   */
  public playSwitchClick(): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.setValueAtTime(120, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // ignore
    }
  }

  /**
   * Soothing Night Crickets Chirp (Procedural ambient night audio)
   */
  private cricketTimer: number | null = null;

  public setNightAmbience(active: boolean): void {
    if (this.cricketTimer) {
      clearInterval(this.cricketTimer);
      this.cricketTimer = null;
    }

    if (!active || this.isMuted || !this.ctx) return;

    const chirp = () => {
      if (this.isMuted || !this.ctx || !this.masterGain) return;
      try {
        const now = this.ctx.currentTime;
        const count = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
          const t = now + i * 0.06;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(4600 + Math.random() * 200, t);

          gain.gain.setValueAtTime(0.018, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(t);
          osc.stop(t + 0.04);
        }
      } catch {
        // ignore
      }
    };

    chirp();
    this.cricketTimer = window.setInterval(chirp, 3200);
  }
}



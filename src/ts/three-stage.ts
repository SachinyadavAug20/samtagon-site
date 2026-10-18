/**
 * Samtagon Game Studios — Breathtaking 3D Infinite Loop Diorama
 * 
 * An award-winning, handcrafted miniature toy world:
 * - Solid, sculpted floating meadow island with stone canal, lily pads & moored rowing boat
 * - Continuous 3D Figure-8 Infinite Loop with stone arch viaduct & tunnel portal
 * - Procedural canvas textures: Ashlar limestone bricks, weathered wood sleepers, and meadow daisies
 * - Physical 3D wooden railway sleepers and extruded polished steel rails
 * - Articulated 4-car Chibi Train (Emerald Locomotive, Coal Tender, Amber Coach, Ruby Caboose)
 * - 100% Tangent-aligned carts with smooth banking & forward-facing direction of travel
 * - Volumetric glowing train headlamp beam, illuminated coach windows & ruby tail lights
 * - Luminous 3D Moon with celestial glow, starry constellation sky, and soft silvery moonlight
 * - Dedicated Rain & Weather Engine with falling rain streaks, splash ripples, and soothing rain audio
 * - Telegraph poles with catenary wires, level crossing with alternate blinking red signal lights
 * - Raycaster micro-interactions: click train (whistle hop), station (bell chime), trees (rustle wobble)
 * - Strictly stationary by default (autoRotate = false), with smooth view presets and speed controls
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { ProceduralAudio } from './audio-synth.js';

export class ThreeStage {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private audio: ProceduralAudio;
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mousePos: THREE.Vector2 = new THREE.Vector2();

  // Spatial Groups
  private rootGroup: THREE.Group = new THREE.Group();
  private sceneryGroup: THREE.Group = new THREE.Group();
  private trackGroup: THREE.Group = new THREE.Group();
  private viaductGroup: THREE.Group = new THREE.Group();
  private trainGroup: THREE.Group = new THREE.Group();
  private weatherGroup: THREE.Group = new THREE.Group();
  private celestialGroup: THREE.Group = new THREE.Group();

  // Train Cars & Components
  private locoCar: THREE.Group = new THREE.Group();
  private tenderCar: THREE.Group = new THREE.Group();
  private coachCar: THREE.Group = new THREE.Group();
  private cabooseCar: THREE.Group = new THREE.Group();
  private rotatingWheels: THREE.Mesh[] = [];
  private coachWindowMat!: THREE.MeshStandardMaterial;

  // Volumetric Headlamp & Atmospheric Lighting
  private headlampBeam: THREE.Mesh | null = null;
  private headlampCoreBeam: THREE.Mesh | null = null;
  private headlampLight: THREE.PointLight | null = null;
  private headlampSpotLight: THREE.SpotLight | null = null;
  private headlampTrackPool: THREE.Mesh | null = null;
  private coachInteriorLight1: THREE.PointLight | null = null;
  private coachInteriorLight2: THREE.PointLight | null = null;
  private tailLight: THREE.PointLight | null = null;
  private lanternLight: THREE.PointLight | null = null;
  private crossingLight1: THREE.PointLight | null = null;
  private crossingLight2: THREE.PointLight | null = null;
  private crossingLamp1: THREE.Mesh | null = null;
  private crossingLamp2: THREE.Mesh | null = null;
  private mooredBoat: THREE.Group | null = null;
  private viaductLanterns: THREE.Group[] = [];
  private viaductLanternLights: THREE.PointLight[] = [];
  private interactiveSheep: THREE.Group[] = [];
  private interactivePoles: THREE.Group[] = [];
  private tunnelLight: THREE.PointLight | null = null;
  private railClickAccumulator: number = 0;
  private lastBlinkCycle: boolean = false;
  private lastHoverRippleTime: number = 0;

  // Handcrafted Scenery Elements & Dynamic Lighting
  private windmillGroup: THREE.Group | null = null;
  private windmillSails: THREE.Group | null = null;
  private windmillLight: THREE.PointLight | null = null;
  private windmillBaseSpeed: number = 0.009;
  private windmillCurrentSpeed: number = 0.009;

  private watermillGroup: THREE.Group | null = null;
  private waterwheel: THREE.Group | null = null;
  private watermillLight: THREE.PointLight | null = null;

  private cottageGroup: THREE.Group | null = null;
  private cottageLight: THREE.PointLight | null = null;

  private semaphoreGroup: THREE.Group | null = null;
  private semaphoreArm: THREE.Group | null = null;
  private semaphoreLight: THREE.PointLight | null = null;
  private semaphoreIsRaised: boolean = false;

  private firefliesGroup: THREE.Group | null = null;
  private fireflies: Array<{
    mesh: THREE.Mesh;
    baseX: number;
    baseY: number;
    baseZ: number;
    speed: number;
    phase: number;
    radius: number;
  }> = [];

  // Expanded World Map Scenery & Interactive Props
  private alpineRidgeGroup: THREE.Group = new THREE.Group();
  private campsiteGroup: THREE.Group = new THREE.Group();
  private campfireLight: THREE.PointLight | null = null;
  private campfireFlame: THREE.Mesh | null = null;
  private campfireParticles: THREE.Points | null = null;
  private campfireParticlePos!: Float32Array;

  private waterTowerGroup: THREE.Group = new THREE.Group();
  private waterTowerSpout: THREE.Group | null = null;
  private waterSprayPoints: THREE.Points | null = null;
  private isWaterTowerSpraying: boolean = false;

  private hotAirBalloonGroup: THREE.Group = new THREE.Group();
  private balloonBurnerLight: THREE.PointLight | null = null;
  private balloonBurnerFlame: THREE.Mesh | null = null;

  private villageWellGroup: THREE.Group = new THREE.Group();
  private villageWellBucket: THREE.Mesh | null = null;
  private townFountainGroup: THREE.Group = new THREE.Group();
  private townFountainJet: THREE.Points | null = null;
  private farmBarnGroup: THREE.Group = new THREE.Group();
  private depotShedGroup: THREE.Group = new THREE.Group();
  private butterflies: Array<{ mesh: THREE.Group; basePos: THREE.Vector3; phase: number; speed: number }> = [];

  // Mechanical Steam Engine Rods
  private leftSideRod: THREE.Mesh | null = null;
  private rightSideRod: THREE.Mesh | null = null;
  private wheelAngle: number = 0;

  // Multi-Mode Cinematic & Director Camera System (Isometric, Top, Engine, Director, Trackside)
  private currentViewMode: 'isometric' | 'top' | 'cinematic' | 'engine' | 'director' | 'trackside' = 'isometric';
  private directorShotIndex: number = 0;
  private directorTimer: number = 0;
  private directorShotDuration: number = 6.8;
  private directorNeedsCut: boolean = true;
  private engineBankRoll: number = 0;
  private lastAnimTime: number = 0;

  // Day / Night & Celestial Systems
  private ambientLight!: THREE.AmbientLight;
  private hemiLight!: THREE.HemisphereLight;
  private sunLight!: THREE.DirectionalLight;
  private fillLight!: THREE.DirectionalLight;
  private sunMesh!: THREE.Group;
  private sunCorona!: THREE.Sprite;
  private godRaysGroup: THREE.Group = new THREE.Group();
  private beehiveGroup: THREE.Group = new THREE.Group();
  private orchardGroup: THREE.Group = new THREE.Group();
  private bees: Array<{ mesh: THREE.Mesh; baseX: number; baseY: number; baseZ: number; speed: number; phase: number; radius: number }> = [];
  private moonMesh!: THREE.Mesh;
  private moonLight!: THREE.DirectionalLight;
  private starsPoints!: THREE.Points;
  private isNightMode: boolean = false;

  // Weather & Rain Engine
  private isRaining: boolean = false;
  private rainStreaks: THREE.LineSegments | null = null;
  private rainCount: number = 360;
  private rainGeo: THREE.BufferGeometry | null = null;
  private rainPositions: Float32Array | null = null;
  private splashRipples: { mesh: THREE.Mesh; life: number; maxRadius: number }[] = [];

  // Volumetric Steam Particles
  private steamParticles: { mesh: THREE.Mesh; life: number; vx: number; vy: number; vz: number }[] = [];
  private steamTimer: number = 0;

  // Track Curve & Physics
  private trackCurve!: THREE.CatmullRomCurve3;
  private progress: number = 0.62; // Starts prominently on scenic foreground meadow
  private readonly trainSpeed: number = 0.0016;
  private speedMultiplier: number = 1.0;

  // Interactive Props
  private clockHand: THREE.Mesh | null = null;
  private clockTowerGroup: THREE.Group | null = null;
  private interactiveTrees: THREE.Group[] = [];
  private waterMesh: THREE.Mesh | null = null;

  // Animation Loop
  private animFrameId: number = 0;
  private isDestroyed: boolean = false;

  constructor(containerId: string, audioInstance: ProceduralAudio) {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`ThreeStage container #${containerId} not found`);
    }
    this.container = el;
    this.audio = audioInstance;

    // 1. Scene & Camera Setup
    this.scene = new THREE.Scene();
    const width = this.container.clientWidth || 920;
    const height = this.container.clientHeight || 520;

    this.camera = new THREE.PerspectiveCamera(38, width / height, 0.02, 100);
    // Heroic isometric viewpoint with comfortable framing, generous breathing room and zero edge clipping
    this.camera.position.set(5.8, 5.4, 6.0);
    this.camera.lookAt(0, 0.40, -0.75);

    // 2. High-Fidelity WebGL Renderer with Soft Shadow Mapping
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // 3. Smooth Damped Orbit Controls (STOPPED AUTO ROTATION BY DEFAULT)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.autoRotate = false; // Strictly stationary by default!
    this.controls.autoRotateSpeed = 0;
    this.controls.minPolarAngle = Math.PI * 0.18; // Don't look straight down
    this.controls.maxPolarAngle = Math.PI * 0.42; // Elevated diorama isometric angle
    this.controls.minDistance = 1.6; // Deep close-up zoom
    this.controls.maxDistance = 12.5; // Wide panoramic zoom-out
    this.controls.target.set(0, 0.40, -0.75);

    // 4. Assemble Group Hierarchies
    this.scene.add(this.rootGroup);
    this.scene.add(this.celestialGroup);
    this.scene.add(this.weatherGroup);
    this.rootGroup.add(this.sceneryGroup);
    this.rootGroup.add(this.viaductGroup);
    this.rootGroup.add(this.trackGroup);
    this.rootGroup.add(this.trainGroup);

    // Subtle diorama presence scale with natural breathing room
    this.rootGroup.scale.setScalar(0.96);

    // 5. Rich Studio Lighting & Celestial Elements
    this.setupLighting();
    this.buildCelestialElements();

    // 6. Build Handcrafted Diorama Components
    this.buildSculptedIsland();
    this.buildScenicCanalAndBridge();
    this.buildInfiniteTrackCurve();
    this.buildPhysicalRailsAndTies();
    this.buildStoneViaductAndTunnel();
    this.buildMiniatureStationAndTown();
    this.buildDutchWindmill();
    this.buildWestFarmlandAndBarn();
    this.buildCanalWatermill();
    this.buildVillageCottageAndSignals();
    this.buildEastVillageAndPlaza();
    this.buildBioluminescentFireflies();
    this.buildLevelCrossingAndTelegraph();
    this.buildLushNatureAndFlock();
    this.buildArticulatedTrain();
    this.buildAlpineMountainRidge();
    this.buildCampsiteAndCampfire();
    this.buildRailwayWaterTower();
    this.buildRailwayServiceDepot();
    this.buildHotAirBalloon();
    this.buildMiniatureVillageLife();

    // 7. Weather Engine Setup
    this.setupWeatherSystem();

    // 8. Event Handlers & Micro-Interactions
    this.bindEvents();

    // 9. Initial Load in Warm Alabaster Daylight Mode (Immediate)
    this.setNightMode(false, true);

    // 10. Start Silky 60FPS Render Loop
    this.animate();
  }

  /* =========================================================================
     1. PROCEDURAL CANVAS TEXTURES
     ========================================================================= */
  private createStoneBrickTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#dfd7c9';
    ctx.fillRect(0, 0, 512, 512);

    const rowH = 32;
    const colW = 64;

    for (let y = 0; y < 512; y += rowH) {
      const isOdd = (y / rowH) % 2 === 1;
      const xOff = isOdd ? colW / 2 : 0;

      for (let x = -colW; x < 512 + colW; x += colW) {
        const bx = x + xOff;
        const tone = Math.floor(Math.random() * 20 - 10);
        ctx.fillStyle = `rgb(${218 + tone}, ${210 + tone}, ${196 + tone})`;
        ctx.fillRect(bx + 1, y + 1, colW - 2, rowH - 2);

        // Subtle bevel highlights & shadows
        ctx.fillStyle = 'rgba(255,255,255,0.22)';
        ctx.fillRect(bx + 1, y + 1, colW - 2, 2);
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        ctx.fillRect(bx + 1, y + rowH - 3, colW - 2, 2);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    return tex;
  }

  private createWoodSleeperTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    // Rich dark cedar sleeper
    ctx.fillStyle = '#5c3d2e';
    ctx.fillRect(0, 0, 256, 64);

    // Wood grain lines
    ctx.strokeStyle = '#43281c';
    ctx.lineWidth = 1;
    for (let i = 0; i < 18; i++) {
      const gy = Math.random() * 64;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.bezierCurveTo(80, gy + Math.random() * 4 - 2, 180, gy + Math.random() * 4 - 2, 256, gy);
      ctx.stroke();
    }

    // Iron tie plates & bolt insets
    ctx.fillStyle = '#262626';
    ctx.fillRect(48, 8, 28, 48);
    ctx.fillRect(180, 8, 28, 48);

    ctx.fillStyle = '#d4d4d8';
    ctx.beginPath();
    ctx.arc(62, 32, 3, 0, Math.PI * 2);
    ctx.arc(194, 32, 3, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  private createMeadowTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Vibrant lawn green base
    ctx.fillStyle = '#4fa65b';
    ctx.fillRect(0, 0, 512, 512);

    // Stippled organic grass variation
    for (let i = 0; i < 1600; i++) {
      const gx = Math.random() * 512;
      const gy = Math.random() * 512;
      const rad = 1.5 + Math.random() * 2.5;
      const alpha = 0.08 + Math.random() * 0.15;
      ctx.fillStyle = Math.random() > 0.5 ? `rgba(90, 180, 100, ${alpha})` : `rgba(60, 140, 70, ${alpha})`;
      ctx.beginPath();
      ctx.arc(gx, gy, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 6);
    return tex;
  }

  private createVolumetricBeamTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Smooth longitudinal gradient from lens to tip (soft warm incandescent glow)
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, 'rgba(255, 252, 235, 0.85)');
    grad.addColorStop(0.12, 'rgba(254, 240, 138, 0.45)');
    grad.addColorStop(0.35, 'rgba(253, 224, 71, 0.20)');
    grad.addColorStop(0.65, 'rgba(250, 204, 21, 0.05)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)'); // Clean 100% transparent fade at beam tip

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 512);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  private createHeadlampPoolTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(128, 128, 16, 128, 128, 124);
    grad.addColorStop(0.0, 'rgba(254, 240, 138, 0.75)');
    grad.addColorStop(0.35, 'rgba(253, 224, 71, 0.40)');
    grad.addColorStop(0.70, 'rgba(234, 179, 8, 0.12)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  /* =========================================================================
     2. DAYLIGHT & MOONLIGHT CELESTIAL ILLUMINATION
     ========================================================================= */
  private setupLighting(): void {
    // Warm daylight ambient
    this.ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
    this.scene.add(this.ambientLight);

    // Hemispheric Sky/Ground Bounce (Warm sunlight + soft sky blue fill)
    this.hemiLight = new THREE.HemisphereLight(0xfffbeb, 0xe2e8f0, 1.2);
    this.hemiLight.position.set(0, 10, 0);
    this.scene.add(this.hemiLight);

    // Warm Key Sun Directional Light (Casts soft daylight shadows)
    this.sunLight = new THREE.DirectionalLight(0xfffbeb, 2.6);
    this.sunLight.position.set(5.5, 7.5, 4.2);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.sunLight.shadow.camera.near = 1.0;
    this.sunLight.shadow.camera.far = 18;
    this.sunLight.shadow.camera.left = -4.5;
    this.sunLight.shadow.camera.right = 4.5;
    this.sunLight.shadow.camera.top = 4.5;
    this.sunLight.shadow.camera.bottom = -4.5;
    this.sunLight.shadow.bias = -0.0006;
    this.sunLight.shadow.normalBias = 0.02;
    this.scene.add(this.sunLight);

    // Soft Neutral Rim / Fill Light
    this.fillLight = new THREE.DirectionalLight(0xf1f5f9, 1.1);
    this.fillLight.position.set(-4.5, 4.0, -3.5);
    this.scene.add(this.fillLight);

    // Silvery Lunar Moonlight (Active in night mode, pure silver moonlight)
    this.moonLight = new THREE.DirectionalLight(0xf8fafc, 0);
    this.moonLight.position.set(-3.5, 5.5, -3.5);
    this.moonLight.castShadow = true;
    this.moonLight.shadow.mapSize.width = 1024;
    this.moonLight.shadow.mapSize.height = 1024;
    this.moonLight.shadow.camera.near = 1.0;
    this.moonLight.shadow.camera.far = 18;
    this.moonLight.shadow.bias = -0.0008;
    this.moonLight.shadow.normalBias = 0.04;
    this.scene.add(this.moonLight);
  }

  private buildCelestialElements(): void {
    // 1. Luminous 3D Moon hovering in the night sky
    const moonGeo = new THREE.SphereGeometry(0.22, 24, 24);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xfef9c3,
      emissive: 0xfef08a,
      emissiveIntensity: 0.9,
      roughness: 0.4,
    });
    this.moonMesh = new THREE.Mesh(moonGeo, moonMat);
    // Positioned in upper sky above the diorama
    this.moonMesh.position.set(-2.4, 2.8, -2.4);
    this.moonMesh.scale.setScalar(0.001); // Hidden in daylight
    this.celestialGroup.add(this.moonMesh);

    // Soft Moon Glow Halo Sprite
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = 128;
    haloCanvas.height = 128;
    const hctx = haloCanvas.getContext('2d')!;
    const grad = hctx.createRadialGradient(64, 64, 12, 64, 64, 64);
    grad.addColorStop(0, 'rgba(254, 240, 138, 0.7)');
    grad.addColorStop(0.4, 'rgba(147, 197, 253, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    hctx.fillStyle = grad;
    hctx.fillRect(0, 0, 128, 128);

    const haloTex = new THREE.CanvasTexture(haloCanvas);
    const haloMat = new THREE.SpriteMaterial({
      map: haloTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0,
    });
    const moonHalo = new THREE.Sprite(haloMat);
    moonHalo.scale.set(1.5, 1.5, 1);
    this.moonMesh.add(moonHalo);

    // 2. Sparkling 3D Star Constellation Dome
    const starCount = 200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const angle = Math.PI * 1.25 + (Math.random() - 0.5) * 0.95;
      const height = 0.6 + Math.random() * 1.5;
      const radius = 3.0 + Math.random() * 1.8;

      starPos[i * 3] = Math.cos(angle) * radius;
      starPos[i * 3 + 1] = height;
      starPos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0, // Hidden in daylight
    });
    this.starsPoints = new THREE.Points(starGeo, starMat);
    this.celestialGroup.add(this.starsPoints);

    // 3. Radiant 3D Sun nestled in the alpine sky (Zero square sprite clipping)
    const sunGroup = new THREE.Group();
    const sunGeo = new THREE.SphereGeometry(0.24, 24, 24);
    const sunMat = new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      emissive: 0xfbbf24,
      emissiveIntensity: 1.6,
      roughness: 0.2,
      metalness: 0.1,
    });
    const sunSphere = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunSphere);

    // Warm concentric aura glow (pure 3D sphere with NormalBlending, ZERO rectangular clipping!)
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const sunAura = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 16), auraMat);
    sunGroup.add(sunAura);
    this.sunCorona = sunAura as any;

    // Positioned safely within the viewport framing
    sunGroup.position.set(1.3, 2.1, -1.8);
    this.sunMesh = sunGroup;
    this.celestialGroup.add(this.sunMesh);

    // 4. Atmospheric Volumetric God-Rays / Sunbeams (Outside-the-box cinematic shafts)
    this.godRaysGroup = new THREE.Group();
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const rayOffsets = [
      { x: 0.35, y: -0.2, rotY: -0.15, scaleX: 0.7, len: 4.8 },
      { x: -0.10, y: 0.0, rotY: 0.05, scaleX: 0.9, len: 5.2 },
      { x: -0.55, y: 0.15, rotY: 0.22, scaleX: 1.1, len: 5.5 },
      { x: 0.80, y: -0.3, rotY: -0.32, scaleX: 0.6, len: 4.5 },
    ];

    rayOffsets.forEach(({ x, y, rotY, scaleX, len }) => {
      const rayGeo = new THREE.PlaneGeometry(scaleX, len);
      const ray = new THREE.Mesh(rayGeo, rayMat.clone());
      // Anchor apex near the sun position (1.3, 2.1, -1.8) and angle down toward terrain
      ray.position.set(1.3 + x, 1.2 + y, -1.8 + x * 0.4);
      ray.rotation.x = Math.PI * 0.26;
      ray.rotation.y = rotY;
      ray.rotation.z = -0.35;
      this.godRaysGroup.add(ray);
    });
    this.celestialGroup.add(this.godRaysGroup);
  }

  /* =========================================================================
     3a. UNIFIED CONTINUOUS ISLAND BOUNDARY SHAPE (ZERO GLITCH / ZERO Z-FIGHTING)
     ========================================================================= */
  private createIslandShape(): THREE.Shape {
    // Star-convex radial sample around diorama center of mass
    const center = { x: 0, z: -0.30 };
    const lobes = [
      { x: -1.75, z:  0.00, r: 2.30 },
      { x:  1.75, z:  0.00, r: 2.30 },
      { x: -2.35, z:  1.55, r: 1.65 },
      { x: -2.35, z: -1.55, r: 1.65 },
      { x:  2.35, z:  1.55, r: 1.65 },
      { x:  2.35, z: -1.55, r: 1.65 },
      { x: -1.25, z:  1.55, r: 1.45 },
      { x:  1.25, z:  1.55, r: 1.45 },
      { x: -3.40, z:  0.00, r: 1.45 },
      { x:  3.40, z:  0.00, r: 1.45 },
      { x: -1.20, z: -2.60, r: 2.45 },
      { x: -1.35, z: -3.00, r: 1.95 },
      { x:  1.60, z: -2.15, r: 2.05 },
      { x:  0.00, z:  1.55, r: 1.45 },
      { x:  0.00, z: -0.30, r: 2.00 },
    ];

    const isInside = (x: number, z: number): boolean => {
      for (let i = 0; i < lobes.length; i++) {
        const l = lobes[i];
        const dx = x - l.x;
        const dz = z - l.z;
        if (dx * dx + dz * dz <= l.r * l.r) return true;
      }
      return false;
    };

    const N_SAMPLES = 140;
    let rads: number[] = [];
    for (let i = 0; i < N_SAMPLES; i++) {
      const theta = (i / N_SAMPLES) * Math.PI * 2;
      const dirX = Math.cos(theta);
      const dirZ = Math.sin(theta);
      let maxR = 0;
      for (let r = 0.1; r <= 7.0; r += 0.01) {
        const px = center.x + dirX * r;
        const pz = center.z + dirZ * r;
        if (isInside(px, pz)) {
          maxR = r;
        }
      }
      rads.push(maxR);
    }

    // 3 passes of circular moving average smoothing (Laplacian smoothing)
    for (let pass = 0; pass < 3; pass++) {
      const smoothed: number[] = [];
      for (let i = 0; i < N_SAMPLES; i++) {
        const prev = rads[(i - 1 + N_SAMPLES) % N_SAMPLES];
        const curr = rads[i];
        const next = rads[(i + 1) % N_SAMPLES];
        smoothed.push(0.25 * prev + 0.50 * curr + 0.25 * next);
      }
      rads = smoothed;
    }

    const shape = new THREE.Shape();
    for (let i = 0; i < N_SAMPLES; i++) {
      const theta = (i / N_SAMPLES) * Math.PI * 2;
      const px = center.x + Math.cos(theta) * rads[i];
      const pz = center.z + Math.sin(theta) * rads[i];
      if (i === 0) {
        shape.moveTo(px, pz);
      } else {
        shape.lineTo(px, pz);
      }
    }
    shape.closePath();
    return shape;
  }

  /* =========================================================================
     3. SCULPTED FLOATING ISLAND & SOFT CONTACT SHADOW (SINGLE CONTINUOUS MESH)
     ========================================================================= */
  private buildSculptedIsland(): void {
    // 1. Soft Diffused Contact Shadow on Ground Floor (Organic circular falloff, ZERO corners)
    const shadowGeo = new THREE.CircleGeometry(7.2, 64);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext('2d')!;

    const sgrad = sctx.createRadialGradient(128, 128, 20, 128, 128, 112);
    sgrad.addColorStop(0, 'rgba(0, 0, 0, 0.12)');
    sgrad.addColorStop(0.40, 'rgba(0, 0, 0, 0.03)');
    sgrad.addColorStop(0.72, 'rgba(0, 0, 0, 0)');
    sgrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sctx.fillStyle = sgrad;
    sctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI * 0.5;
    shadowMesh.position.y = -0.27;
    this.sceneryGroup.add(shadowMesh);

    // 2. Sculpted Solid Island Base: Cream Limestone Bedrock + Lush Textured Meadow Turf
    const bedrockMat = new THREE.MeshStandardMaterial({
      color: 0xf3ede2, // Warm limestone ceramic
      roughness: 0.45,
      metalness: 0.02,
    });

    const meadowTex = this.createMeadowTexture();
    const turfMat = new THREE.MeshStandardMaterial({
      color: 0x4fa65b,
      map: meadowTex,
      roughness: 0.65,
      metalness: 0.02,
    });

    const islandShape = this.createIslandShape();
    const baseHeight = 0.22;

    // A. Single Unified Extruded Limestone Bedrock (No overlapping primitives = 0% z-fighting!)
    const bedrockGeo = new THREE.ExtrudeGeometry(islandShape, {
      depth: baseHeight,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.04,
      bevelSegments: 3,
    });
    const bedrockMesh = new THREE.Mesh(bedrockGeo, bedrockMat);
    bedrockMesh.rotation.x = Math.PI * 0.5;
    bedrockMesh.position.y = -0.02;
    bedrockMesh.receiveShadow = true;
    this.sceneryGroup.add(bedrockMesh);

    // B. Single Unified Extruded Meadow Turf (Continuous seamless cap, 100% glitch-free)
    const turfGeo = new THREE.ExtrudeGeometry(islandShape, {
      depth: 0.035,
      bevelEnabled: false,
    });
    const turfMesh = new THREE.Mesh(turfGeo, turfMat);
    turfMesh.rotation.x = Math.PI * 0.5;
    turfMesh.position.y = 0.035;
    turfMesh.receiveShadow = true;
    this.sceneryGroup.add(turfMesh);

    // C. Gentle Rolling Meadow Hillocks strictly in open fields (Safely away from all building platforms)
    const hillMat = turfMat;
    const knolls = [
      { x: -2.65, y: 0.038, z: 0.70, r: 0.65, h: 0.040 },  // Far West sheep pasture hillock
      { x: 2.85, y: 0.038, z: -0.65, r: 0.65, h: 0.035 },  // Far East wildflower meadow crest
      { x: -2.50, y: 0.038, z: -2.20, r: 0.75, h: 0.040 }, // Far North-West alpine slope knoll
    ];
    knolls.forEach((k) => {
      const knoll = new THREE.Mesh(
        new THREE.CylinderGeometry(k.r * 0.45, k.r, k.h, 18),
        hillMat
      );
      knoll.position.set(k.x, k.y, k.z);
      knoll.receiveShadow = true;
      this.sceneryGroup.add(knoll);
    });

    // D. Stepping Stones & Promenade Paths (Connecting Station to Farmstead & Village)
    const gravelMat = new THREE.MeshStandardMaterial({
      color: 0xc8b898,
      roughness: 0.9,
    });
    const pathCoords = [
      // Promenade from Station (0.00, 0.85) heading west towards farmstead
      [-0.18, 0.82], [-0.36, 0.76], [-0.55, 0.68], [-0.74, 0.58], [-0.95, 0.46], [-1.15, 0.35],
      // Promenade from Station (0.00, 0.85) heading east towards village plaza
      [0.18, 0.82], [0.36, 0.76], [0.55, 0.68], [0.74, 0.58], [0.95, 0.46], [1.15, 0.32], [1.32, 0.18],
      // Stepping stones approaching canal bridge
      [-0.14, 0.16], [-0.08, 0.10], [0.0, 0.0], [0.08, -0.10], [0.14, -0.16],
    ];
    pathCoords.forEach(([px, pz], idx) => {
      const stone = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.052, 0.010, 7),
        gravelMat
      );
      stone.position.set(px, 0.038, pz);
      stone.rotation.y = idx * 0.7;
      stone.receiveShadow = true;
      this.sceneryGroup.add(stone);
    });

    // I. Low-Poly Split-Rail Pasture Fences along Sheep Field (West Lobe, safe clearance > 0.70)
    const fenceMat = new THREE.MeshStandardMaterial({
      color: 0x6d4c41,
      roughness: 0.75,
    });
    const fenceSegments = [
      { start: [-1.55, -0.40], end: [-1.20, -0.40] },
      { start: [-1.20, -0.40], end: [-1.20, -0.22] },
      { start: [-1.55, -0.22], end: [-1.55, -0.40] },
    ];
    fenceSegments.forEach(({ start, end }) => {
      const [x1, z1] = start;
      const [x2, z2] = end;
      const dx = x2 - x1;
      const dz = z2 - z1;
      const len = Math.sqrt(dx * dx + dz * dz);
      const angle = Math.atan2(dz, dx);
      const mx = (x1 + x2) * 0.5;
      const mz = (z1 + z2) * 0.5;

      [-len * 0.48, len * 0.48].forEach((offset) => {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.10, 0.018), fenceMat);
        const px = mx + Math.cos(angle) * offset;
        const pz = mz + Math.sin(angle) * offset;
        post.position.set(px, 0.08, pz);
        post.castShadow = true;
        this.sceneryGroup.add(post);
      });

      [0.065, 0.105].forEach((ry) => {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.012, 0.012), fenceMat);
        rail.position.set(mx, ry, mz);
        rail.rotation.y = -angle;
        rail.castShadow = true;
        this.sceneryGroup.add(rail);
      });
    });
  }

  /* =========================================================================
     4. HANDCRAFTED SCENIC POND & CANAL (GLITCH-FREE STONE EMBANKMENT & BOAT)
     ========================================================================= */
  private buildScenicCanalAndBridge(): void {
    const canalGroup = new THREE.Group();

    // 1. Deep Aquatic Basin Floor (submerged at y = 0.015)
    const basinFloorGeo = new THREE.CylinderGeometry(0.46, 0.50, 0.022, 36);
    const basinFloorMat = new THREE.MeshStandardMaterial({
      color: 0x075985, // Deep ocean slate depth
      roughness: 0.75,
    });
    const basinFloor = new THREE.Mesh(basinFloorGeo, basinFloorMat);
    basinFloor.scale.set(1.45, 1.0, 1.95);
    basinFloor.rotation.y = 0.7854;
    basinFloor.position.set(0, 0.015, -0.04);
    basinFloor.receiveShadow = true;
    canalGroup.add(basinFloor);

    // 2. Ashlar Cobblestone Quay Embankment (Enclosing the pond, rising cleanly above grass)
    const stoneCurbMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      map: this.createStoneBrickTexture(),
      roughness: 0.55,
      metalness: 0.05,
    });

    const rimCount = 36;
    for (let i = 0; i < rimCount; i++) {
      const angle = (i / rimCount) * Math.PI * 2;
      const rx = Math.cos(angle) * 0.44 * 1.45;
      const rz = Math.sin(angle) * 0.44 * 1.95;
      const wx = rx * Math.cos(0.7854) - rz * Math.sin(0.7854);
      const wz = rx * Math.sin(0.7854) + rz * Math.cos(0.7854);

      // 1. Skip blocks crossing lower track corridor (track line is z - x ≈ 0)
      const distToTrack = Math.abs(wz - wx) / Math.SQRT2;
      if (distToTrack < 0.22) continue;

      // 2. Skip blocks colliding with viaduct piers
      if (Math.hypot(wx - (-0.247), wz - 0.247) < 0.20 || Math.hypot(wx - 0.247, wz - (-0.247)) < 0.20) continue;

      const curb = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.040, 0.052), stoneCurbMat);
      curb.position.set(wx, 0.038, wz);
      curb.rotation.y = 0.7854 - angle;
      curb.castShadow = true;
      curb.receiveShadow = true;
      canalGroup.add(curb);
    }

    // 3. Crystal-Clear Mountain Spring Water Surface (Fixed elevation, ZERO z-fighting)
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Radiant Azure Blue
      emissive: 0x0369a1,
      emissiveIntensity: 0.18,
      roughness: 0.04,
      metalness: 0.15,
      transparent: true,
      opacity: 0.88,
    });
    const waterGeo = new THREE.CylinderGeometry(0.43, 0.45, 0.016, 36);
    const canalWater = new THREE.Mesh(waterGeo, waterMat);
    canalWater.scale.set(1.42, 1.0, 1.90);
    canalWater.rotation.y = 0.7854;
    canalWater.position.set(0, 0.034, -0.04);
    canalWater.receiveShadow = true;
    this.waterMesh = canalWater;
    canalGroup.add(canalWater);

    // 4. Natural Granite River Pebbles along Shoreline (Safely outside railway corridor)
    const pebbleColors = [0x64748b, 0x475569, 0x94a3b8, 0x52525b];
    const pebbleCoords = [
      [-0.42, -0.26], [-0.38, -0.34], [-0.22, -0.48], [0.15, -0.46],
      [0.38, -0.32], [0.44, -0.18], [0.46, 0.10], [0.38, 0.28],
      [0.24, 0.44], [-0.18, 0.45], [-0.36, 0.32], [-0.45, 0.12],
    ].filter(([px, pz]) => Math.abs(pz - px) / Math.SQRT2 >= 0.22);
    pebbleCoords.forEach(([px, pz], idx) => {
      const pMat = new THREE.MeshStandardMaterial({
        color: pebbleColors[idx % pebbleColors.length],
        roughness: 0.6,
      });
      const pebble = new THREE.Mesh(new THREE.DodecahedronGeometry(0.026 + (idx % 3) * 0.012, 1), pMat);
      pebble.position.set(px, 0.038, pz);
      pebble.rotation.set(idx * 0.5, idx * 0.8, idx * 0.3);
      pebble.castShadow = true;
      canalGroup.add(pebble);
    });

    // 5. Miniature Weathered Wooden Fishing Jetty
    const pierGroup = new THREE.Group();
    pierGroup.position.set(-0.30, 0.040, -0.32);
    pierGroup.rotation.y = 0.65;

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 });

    // 2 Vertical Pilings standing in the water
    [-0.07, 0.07].forEach((px) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.09, 6), woodMat);
      post.position.set(px, -0.01, 0.09);
      post.castShadow = true;
      pierGroup.add(post);
    });

    // 4 Deck Planks
    for (let p = 0; p < 4; p++) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.010, 0.042), woodMat);
      plank.position.set(0, 0.028, -0.06 + p * 0.045);
      plank.castShadow = true;
      pierGroup.add(plank);
    }

    // Cast Iron Mooring Cleat / Bollard
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
    const cleat = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.010, 0.020, 8), ironMat);
    cleat.position.set(0.06, 0.042, 0.075);
    pierGroup.add(cleat);

    canalGroup.add(pierGroup);

    // 6. Charming Cedar Wooden Dinghy Moored by the Jetty
    const boatGroup = new THREE.Group();
    boatGroup.position.set(-0.40, 0.038, -0.24);
    boatGroup.rotation.y = 0.45;

    const cedarMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.5 });
    const gunwaleMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.6 });

    // Sculpted Hull
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.042, 0.09), cedarMat);
    hull.position.y = 0.018;
    hull.castShadow = true;
    boatGroup.add(hull);

    // Dark Walnut Gunwale Rim
    const gunwale = new THREE.Mesh(new THREE.BoxGeometry(0.208, 0.008, 0.098), gunwaleMat);
    gunwale.position.y = 0.040;
    boatGroup.add(gunwale);

    // Rower's Bench & Stern Seat
    const seatMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.4 });
    const bench1 = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.014, 0.082), seatMat);
    bench1.position.set(0, 0.028, 0);
    boatGroup.add(bench1);

    const sternSeat = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.014, 0.082), seatMat);
    sternSeat.position.set(-0.075, 0.028, 0);
    boatGroup.add(sternSeat);

    // Pair of Wooden Oars resting in gunwales
    const oarMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 });
    [-1, 1].forEach((dir) => {
      const oar = new THREE.Group();
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.16, 6), oarMat);
      shaft.rotation.z = Math.PI * 0.5;
      oar.add(shaft);

      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.003, 0.018), oarMat);
      blade.position.x = 0.08;
      oar.add(blade);

      oar.position.set(0.01, 0.044, dir * 0.052);
      oar.rotation.y = dir * 0.25;
      oar.rotation.z = dir * 0.10;
      boatGroup.add(oar);
    });

    // Mooring Painter Rope connecting boat to pier
    const ropeMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.9 });
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.12, 4), ropeMat);
    rope.position.set(0.12, 0.035, -0.04);
    rope.rotation.z = -Math.PI * 0.35;
    rope.rotation.y = 0.4;
    boatGroup.add(rope);

    this.mooredBoat = boatGroup;
    canalGroup.add(boatGroup);

    // 7. Wild Reeds & Cattails in Shallows
    const reedMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.6 });
    const catMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.8 });

    const reedSpots = [
      [-0.20, -0.42], [0.22, -0.38], [-0.38, 0.15], [0.38, -0.18]
    ].filter(([rx, rz]) => Math.abs(rz - rx) / Math.SQRT2 >= 0.22);
    reedSpots.forEach(([rx, rz]) => {
      for (let r = 0; r < 3; r++) {
        const reed = new THREE.Group();
        const ox = (Math.random() - 0.5) * 0.05;
        const oz = (Math.random() - 0.5) * 0.05;
        reed.position.set(rx + ox, 0.035, rz + oz);

        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.004, 0.10 + r * 0.02, 4), reedMat);
        stem.position.y = 0.05 + r * 0.01;
        reed.add(stem);

        const catHead = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.032, 6), catMat);
        catHead.position.y = 0.085 + r * 0.01;
        reed.add(catHead);

        canalGroup.add(reed);
      }
    });

    // 8. Water Lilies with Lotus Blossoms
    const lilyMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.35 });
    const lotusPink = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.25 });
    const lotusYellow = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.25 });

    const lilyCoords = [
      [-0.30, 0.038, 0.06],
      [0.30, 0.038, -0.06],
      [-0.38, 0.038, -0.15],
      [0.38, 0.038, 0.15],
    ].filter(([lx, , lz]) => Math.abs(lz - lx) / Math.SQRT2 >= 0.22);

    lilyCoords.forEach(([lx, ly, lz], idx) => {
      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(0.040, 0.040, 0.004, 12, 1, false, 0, Math.PI * 1.85),
        lilyMat
      );
      pad.position.set(lx, ly, lz);
      pad.rotation.y = idx * 1.4;
      canalGroup.add(pad);

      const bloom = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.016, 0),
        idx % 2 === 0 ? lotusPink : lotusYellow
      );
      bloom.position.set(lx, ly + 0.012, lz);
      canalGroup.add(bloom);
    });

    // 9. Sturdy Rustic Timber Railway Trestle Bridge supporting Lower Track across Canal
    const trestleWoodMat = new THREE.MeshStandardMaterial({
      color: 0x451a03,
      roughness: 0.85,
    });

    // 5 Timber Bents with submerged pilings and cross cap beams
    const trestleSpans = [-0.28, -0.14, 0.0, 0.14, 0.28];
    trestleSpans.forEach((s) => {
      const bx = s * 0.7071;
      const bz = s * 0.7071;

      // Heavy timber cap beam directly under ties (perpendicular to track line z = x)
      const capBeam = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.024, 0.055), trestleWoodMat);
      capBeam.position.set(bx, 0.044, bz);
      capBeam.rotation.y = -Math.PI * 0.25;
      capBeam.castShadow = true;
      canalGroup.add(capBeam);

      // Two vertical heavy round timber pilings driven into canal bed
      [-0.075, 0.075].forEach((po) => {
        const px = bx - po * 0.7071;
        const pz = bz + po * 0.7071;
        const pile = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.016, 0.065, 8), trestleWoodMat);
        pile.position.set(px, 0.020, pz);
        pile.castShadow = true;
        canalGroup.add(pile);
      });
    });

    // Longitudinal timber stringers running directly under left and right rails
    [-0.045, 0.045].forEach((ro) => {
      const stringer = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.018, 0.035), trestleWoodMat);
      const sx = -ro * 0.7071;
      const sz = ro * 0.7071;
      stringer.position.set(sx, 0.048, sz);
      stringer.rotation.y = Math.PI * 0.25; // Parallel to track line z = x
      stringer.castShadow = true;
      canalGroup.add(stringer);
    });

    this.sceneryGroup.add(canalGroup);
  }

  /* =========================================================================
     5. 3D FIGURE-8 INFINITE LOOP CURVE (LEMNISCATE + SMOOTH VIADUCT ELEVATION)
     ========================================================================= */
  private buildInfiniteTrackCurve(): void {
    const pts: THREE.Vector3[] = [];
    const N = 260;
    const bridgeSpan = 0.95; // Angle span around t=0 where track climbs over viaduct
    const baseHeight = 0.055; // Ground rail elevation
    const viaductElevation = 0.38; // Viaduct clearance elevation

    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2;

      // Lemniscate of Gerono (Grand expanded longer path): x = A sin(t), z = B sin(2t)
      const x = Math.sin(t) * 3.30;
      const z = Math.sin(2 * t) * 1.60;

      // Elevation Profile:
      // At t = pi: Overpass summit on top of stone viaduct (y = 0.435)
      // At t = 0: Underpass ground level through stone arch tunnel (y = 0.055)
      const dt = Math.abs(t - Math.PI);

      let y = baseHeight;
      if (dt < bridgeSpan) {
        const ramp = Math.cos((dt / bridgeSpan) * (Math.PI * 0.5));
        y = baseHeight + viaductElevation * Math.pow(ramp, 2);
      }

      pts.push(new THREE.Vector3(x, y, z));
    }

    this.trackCurve = new THREE.CatmullRomCurve3(pts, true, 'centripetal');
  }

  /* =========================================================================
     6. PHYSICAL 3D WOODEN TIES WITH GRAIN TEXTURE & EXTRUDED STEEL RAILS
     ========================================================================= */
  private buildPhysicalRailsAndTies(): void {
    const tieGeo = new THREE.BoxGeometry(0.24, 0.022, 0.06);
    const sleeperTex = this.createWoodSleeperTexture();
    const tieMat = new THREE.MeshStandardMaterial({
      color: 0x5c3d2e,
      map: sleeperTex,
      roughness: 0.7,
      metalness: 0.1,
    });

    const tieCount = 160;
    const up = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < tieCount; i++) {
      const u = i / tieCount;
      const pt = this.trackCurve.getPointAt(u);
      const tangent = this.trackCurve.getTangentAt(u).normalize();
      let normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
      if (normal.lengthSq() < 0.001) normal.set(1, 0, 0);

      const tie = new THREE.Mesh(tieGeo, tieMat);
      tie.position.set(pt.x, pt.y - 0.012, pt.z);
      tie.lookAt(pt.clone().add(normal));
      tie.castShadow = true;
      tie.receiveShadow = true;
      this.trackGroup.add(tie);
    }

    // Extrude Dual Continuous Polished Steel Rails
    const samples = 280;
    const railOffset = 0.066;
    const leftPts: THREE.Vector3[] = [];
    const rightPts: THREE.Vector3[] = [];

    for (let i = 0; i <= samples; i++) {
      const u = i / samples;
      const pt = this.trackCurve.getPointAt(u);
      const tangent = this.trackCurve.getTangentAt(u).normalize();
      let normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
      if (normal.lengthSq() < 0.001) normal.set(1, 0, 0);

      leftPts.push(pt.clone().addScaledVector(normal, railOffset));
      rightPts.push(pt.clone().addScaledVector(normal, -railOffset));
    }

    const leftRailCurve = new THREE.CatmullRomCurve3(leftPts, true);
    const rightRailCurve = new THREE.CatmullRomCurve3(rightPts, true);

    const railGeoLeft = new THREE.TubeGeometry(leftRailCurve, 280, 0.013, 8, true);
    const railGeoRight = new THREE.TubeGeometry(rightRailCurve, 280, 0.013, 8, true);

    const railMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.92,
      roughness: 0.18,
    });

    const leftRail = new THREE.Mesh(railGeoLeft, railMat);
    const rightRail = new THREE.Mesh(railGeoRight, railMat);
    leftRail.castShadow = true;
    leftRail.receiveShadow = true;
    rightRail.castShadow = true;
    rightRail.receiveShadow = true;

    this.trackGroup.add(leftRail);
    this.trackGroup.add(rightRail);
  }

  /* =========================================================================
     7. ARCHITECTURAL ASHLAR STONE VIADUCT WITH VOUSSOIR ARCHES & LANTERNS
     ========================================================================= */
  private buildStoneViaductAndTunnel(): void {
    // Rotate viaduct group by +0.7702 rad (+44.13 deg) so deck aligns with overpass at t=pi (local X) and arch tunnel directly faces viewer at t=0 (local Z)
    this.viaductGroup.rotation.y = 0.7702;

    const stoneTex = this.createStoneBrickTexture();
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xded5c5,
      map: stoneTex,
      roughness: 0.52,
      metalness: 0.04,
    });

    const capMat = new THREE.MeshStandardMaterial({
      color: 0x8a7761,
      roughness: 0.45,
    });

    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      map: stoneTex,
      roughness: 0.65,
    });

    const mossMat = new THREE.MeshStandardMaterial({
      color: 0x2e4a2b,
      roughness: 0.85,
    });

    // 1. Ashlar Stone Abutment Piers (Flanking Lower Track Underpass)
    const pierGeo = new THREE.BoxGeometry(0.24, 0.40, 0.48);
    [-0.35, 0.35].forEach((px) => {
      const pier = new THREE.Mesh(pierGeo, stoneMat);
      pier.position.set(px, 0.20, 0);
      pier.castShadow = true;
      pier.receiveShadow = true;
      this.viaductGroup.add(pier);

      // Stepped Submerged Plinth Footing at Waterline
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.07, 0.54), plinthMat);
      plinth.position.set(px, 0.035, 0);
      plinth.castShadow = true;
      plinth.receiveShadow = true;
      this.viaductGroup.add(plinth);

      // Angled Triangular River Cutwaters parting the canal flow
      [-0.29, 0.29].forEach((cz) => {
        const cutwater = new THREE.Mesh(new THREE.CylinderGeometry(0.001, 0.12, 0.22, 3), plinthMat);
        cutwater.position.set(px, 0.09, cz);
        cutwater.rotation.y = cz > 0 ? 0 : Math.PI;
        cutwater.castShadow = true;
        this.viaductGroup.add(cutwater);
      });

      // Low-poly Clinging Moss & Ivy accents at pier waterline
      [-0.14, 0.14].forEach((mz) => {
        const ivy = new THREE.Mesh(new THREE.DodecahedronGeometry(0.024, 0), mossMat);
        ivy.position.set(px + (px > 0 ? -0.12 : 0.12), 0.06 + Math.random() * 0.04, mz);
        this.viaductGroup.add(ivy);
      });
    });

    // 2. Viaduct Deck Slab supporting Upper Track
    const deckGeo = new THREE.BoxGeometry(1.12, 0.045, 0.44);
    const deck = new THREE.Mesh(deckGeo, stoneMat);
    deck.position.set(0, 0.40, 0);
    deck.castShadow = true;
    deck.receiveShadow = true;
    this.viaductGroup.add(deck);

    // Corbelled Dentil Brackets along both deck flanks
    for (let i = 0; i < 9; i++) {
      const bx = -0.44 + i * 0.11;
      [-0.21, 0.21].forEach((bz) => {
        const corbel = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.028, 0.038), capMat);
        corbel.position.set(bx, 0.375, bz);
        corbel.castShadow = true;
        this.viaductGroup.add(corbel);
      });
    }

    // 3. True Open Arched Barrel Vault Ceiling (Tunnel Portal)
    // Semicircular hollow stone vault running along local Z underpass (openEnded: true, DoubleSide)
    const vaultMat = new THREE.MeshStandardMaterial({
      color: 0xc8bea8,
      map: stoneTex,
      roughness: 0.58,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });
    // Radius 0.23, Length 0.48, theta -PI/2 to +PI/2 (centered semicircular arch curving UPWARDS)
    const archGeo = new THREE.CylinderGeometry(0.23, 0.23, 0.48, 28, 1, true, -Math.PI * 0.5, Math.PI);
    const arch = new THREE.Mesh(archGeo, vaultMat);
    arch.rotation.x = -Math.PI * 0.5; // Rotates length along Z, arch curves upwards in +Y
    arch.position.set(0, 0.17, 0); // Base at y=0.17, Apex at y=0.40 meeting underside of deck
    arch.castShadow = true;
    arch.receiveShadow = true;
    this.viaductGroup.add(arch);

    // Warm Interior Tunnel Sconce Lantern
    this.tunnelLight = new THREE.PointLight(0xfbbf24, 0.9, 1.4);
    this.tunnelLight.position.set(0, 0.32, 0);
    this.viaductGroup.add(this.tunnelLight);

    // 4. Classical Radial Stone Voussoirs & Apex Keystones framing both portals
    [-0.242, 0.242].forEach((pz) => {
      const ringSteps = 9;
      for (let s = 0; s <= ringSteps; s++) {
        const theta = (s / ringSteps) * Math.PI;
        const isKeystone = s === Math.floor(ringSteps / 2);
        const vx = Math.cos(theta) * 0.235;
        const vy = 0.17 + Math.sin(theta) * 0.235;

        const vGeo = isKeystone
          ? new THREE.BoxGeometry(0.048, 0.064, 0.042)
          : new THREE.BoxGeometry(0.038, 0.042, 0.030);
        const vMesh = new THREE.Mesh(vGeo, isKeystone ? capMat : stoneMat);
        vMesh.position.set(vx, vy, pz);
        vMesh.rotation.z = theta - Math.PI * 0.5;
        vMesh.castShadow = true;
        this.viaductGroup.add(vMesh);
      }

      // Spandrel Infill Blocks connecting arch flanks to deck slab
      [-0.18, 0.18].forEach((sx) => {
        const spandrel = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.024), stoneMat);
        spandrel.position.set(sx, 0.365, pz);
        spandrel.castShadow = true;
        this.viaductGroup.add(spandrel);
      });
    });

    // 5. Parapet Safety Balustrade Walls with Rounded Copings along Upper Deck
    const parapetGeo = new THREE.BoxGeometry(1.12, 0.085, 0.04);
    const parapetL = new THREE.Mesh(parapetGeo, capMat);
    parapetL.position.set(0, 0.46, 0.20);
    parapetL.castShadow = true;
    this.viaductGroup.add(parapetL);

    const parapetR = new THREE.Mesh(parapetGeo, capMat);
    parapetR.position.set(0, 0.46, -0.20);
    parapetR.castShadow = true;
    this.viaductGroup.add(parapetR);

    // 4 Corner Cap Finials
    const finialGeo = new THREE.ConeGeometry(0.035, 0.075, 4);
    [
      [-0.54, 0.525, 0.20],
      [0.54, 0.525, 0.20],
      [-0.54, 0.525, -0.20],
      [0.54, 0.525, -0.20],
    ].forEach(([fx, fy, fz]) => {
      const f = new THREE.Mesh(finialGeo, capMat);
      f.position.set(fx, fy, fz);
      f.rotation.y = Math.PI * 0.25;
      f.castShadow = true;
      this.viaductGroup.add(f);
    });

    // 6. Interactive Victorian Wrought-Iron Bridge Gas Lanterns
    this.viaductLanterns = [];
    this.viaductLanternLights = [];

    const ironMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.3 });
    const brassLanternMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 });
    const lanternGlassMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfbbf24,
      emissiveIntensity: 1.8,
      roughness: 0.1,
      transparent: true,
      opacity: 0.9,
    });

    [
      { x: -0.38, z: 0.25 },
      { x: 0.38, z: 0.25 },
      { x: -0.38, z: -0.25 },
      { x: 0.38, z: -0.25 },
    ].forEach(({ x, z }) => {
      const lanternGroup = new THREE.Group();
      lanternGroup.position.set(x, 0.29, z);

      // Wrought-iron wall mounting bracket
      const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.045, 0.045), ironMat);
      bracket.position.set(x > 0 ? -0.02 : 0.02, 0, 0);
      lanternGroup.add(bracket);

      // Hexagonal lantern housing
      const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.016, 0.040, 6), brassLanternMat);
      housing.position.set(0, 0.01, 0);
      housing.castShadow = true;
      lanternGroup.add(housing);

      // Glowing glass pane core
      const core = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.012, 0.028, 6), lanternGlassMat);
      core.position.set(0, 0.01, 0);
      lanternGroup.add(core);

      // PointLight casting warm illumination on water and underpass
      const pLight = new THREE.PointLight(0xfbbf24, this.isNightMode ? 1.4 : 0, 1.6);
      pLight.position.set(0, 0.01, 0);
      lanternGroup.add(pLight);
      this.viaductLanternLights.push(pLight);

      this.viaductLanterns.push(lanternGroup);
      this.viaductGroup.add(lanternGroup);
    });
  }

  /* =========================================================================
     8. MINIATURE STATION STOP, CLOCK TOWER & PASSENGER MEEPLES
     ========================================================================= */
  private buildMiniatureStationAndTown(): void {
    const station = new THREE.Group();
    // Positioned safely on the southern promenade apron (track clearance 0.905)
    station.position.set(0.00, 0.04, 1.25);
    station.rotation.y = 0;

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.5 });
    const terracottaMat = new THREE.MeshStandardMaterial({ color: 0xdd6b20, roughness: 0.35 });

    // Raised Stone Platform (Parallel to the track)
    const platform = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.05, 0.22), stoneMat);
    platform.position.y = 0.025;
    platform.castShadow = true;
    platform.receiveShadow = true;
    station.add(platform);

    // Timber Shelter Pillars & Roof
    const pillarGeo = new THREE.BoxGeometry(0.024, 0.28, 0.024);
    const p1 = new THREE.Mesh(pillarGeo, woodMat);
    p1.position.set(-0.16, 0.16, -0.06);
    station.add(p1);

    const p2 = new THREE.Mesh(pillarGeo, woodMat);
    p2.position.set(0.08, 0.16, -0.06);
    station.add(p2);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.024, 0.20), terracottaMat);
    roof.position.set(-0.04, 0.30, -0.02);
    roof.rotation.x = 0.12;
    roof.castShadow = true;
    station.add(roof);

    // Miniature Clock Tower atop Platform (Clickable for Ding-Dong chime!)
    this.clockTowerGroup = new THREE.Group();
    this.clockTowerGroup.position.set(0.20, 0, -0.04);

    const towerBody = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.42, 0.12), stoneMat);
    towerBody.position.y = 0.235;
    towerBody.castShadow = true;
    this.clockTowerGroup.add(towerBody);

    const towerSpire = new THREE.Mesh(new THREE.ConeGeometry(0.10, 0.18, 4), terracottaMat);
    towerSpire.position.y = 0.53;
    towerSpire.rotation.y = Math.PI * 0.25;
    towerSpire.castShadow = true;
    this.clockTowerGroup.add(towerSpire);

    // Round Clock Face
    const clockFace = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.038, 0.01, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
    );
    clockFace.rotation.x = Math.PI * 0.5;
    clockFace.position.set(0, 0.36, 0.065);
    this.clockTowerGroup.add(clockFace);

    // Rotating Minute Hand
    const handGeo = new THREE.BoxGeometry(0.005, 0.028, 0.005);
    this.clockHand = new THREE.Mesh(handGeo, new THREE.MeshBasicMaterial({ color: 0x0f172a }));
    this.clockHand.position.set(0, 0.36, 0.072);
    this.clockTowerGroup.add(this.clockHand);

    station.add(this.clockTowerGroup);

    // Platform Bench & Suitcase
    const bench = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.038, 0.05), woodMat);
    bench.position.set(-0.06, 0.065, -0.04);
    station.add(bench);

    const suitcase = new THREE.Mesh(
      new THREE.BoxGeometry(0.040, 0.030, 0.022),
      new THREE.MeshStandardMaterial({ color: 0x92400e })
    );
    suitcase.position.set(-0.16, 0.065, -0.04);
    station.add(suitcase);

    // Platform Milk Cans & Cargo Trunks
    const milkCanMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.3 });
    [-0.19, -0.21].forEach((cx, i) => {
      const can = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.018, 0.036, 8), milkCanMat);
      can.position.set(cx, 0.065, 0.04 + i * 0.03);
      can.castShadow = true;
      station.add(can);
    });

    // Cute Passenger Meeples waiting on platform
    const meepleColors = [0x2563eb, 0xd97706];
    meepleColors.forEach((col, idx) => {
      const meeple = new THREE.Group();
      const mBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.020, 0.026, 0.07, 8),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.4 })
      );
      mBody.position.y = 0.085;

      const mHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.020, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xffedd5 })
      );
      mHead.position.y = 0.135;

      meeple.add(mBody);
      meeple.add(mHead);
      meeple.position.set(-0.02 + idx * 0.06, 0, 0.01);
      meeple.castShadow = true;
      station.add(meeple);
    });

    // Warm Platform Lantern with Point Light
    this.lanternLight = new THREE.PointLight(0xfef3c7, 0.8, 1.6);
    this.lanternLight.position.set(-0.04, 0.26, -0.02);
    station.add(this.lanternLight);

    const lanternGlobe = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xfef08a })
    );
    lanternGlobe.position.copy(this.lanternLight.position);
    station.add(lanternGlobe);

    this.sceneryGroup.add(station);
  }

  /* =========================================================================
     8b. DUTCH SMOCK WINDMILL WITH ROTATING LATTICE SAILS & INTERIOR GLOW
     ========================================================================= */
  private buildDutchWindmill(): void {
    this.windmillGroup = new THREE.Group();
    // Positioned safely on the northwest knoll of the expanded west loop (track clearance 0.998)
    this.windmillGroup.position.set(-2.25, 0.035, -0.45);

    const stoneTex = this.createStoneBrickTexture();
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xd6cbb8,
      map: stoneTex,
      roughness: 0.65,
      metalness: 0.05,
    });

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.7,
    });

    const smockMat = new THREE.MeshStandardMaterial({
      color: 0xded8cc,
      roughness: 0.6,
      metalness: 0.02,
    });

    const capMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.45,
      metalness: 0.2,
    });

    const sailClothMat = new THREE.MeshStandardMaterial({
      color: 0xfef9c3,
      roughness: 0.8,
      side: THREE.DoubleSide,
    });

    // 1. Octagonal Stone Plinth Base
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.21, 0.08, 8), stoneMat);
    plinth.position.y = 0.04;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    this.windmillGroup.add(plinth);

    // 2. Tapered Octagonal Smock Mill Tower
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.17, 0.36, 8), smockMat);
    tower.position.y = 0.26;
    tower.castShadow = true;
    tower.receiveShadow = true;
    this.windmillGroup.add(tower);

    // 3. Rotating Cap Dome & Windshaft
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.10, 8), capMat);
    cap.position.y = 0.49;
    cap.castShadow = true;
    this.windmillGroup.add(cap);

    // 4. Sail Lattice Cross with Canvas Sails
    this.windmillSails = new THREE.Group();
    this.windmillSails.position.set(0, 0.44, 0.13);

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.024, 8), woodMat);
    hub.rotation.x = Math.PI * 0.5;
    this.windmillSails.add(hub);

    for (let i = 0; i < 4; i++) {
      const sailArm = new THREE.Group();
      sailArm.rotation.z = (i * Math.PI) / 2;

      const spar = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.28, 0.01), woodMat);
      spar.position.y = 0.14;
      sailArm.add(spar);

      const sail = new THREE.Mesh(new THREE.PlaneGeometry(0.055, 0.22), sailClothMat);
      sail.position.set(0.032, 0.15, 0.005);
      sail.rotation.y = 0.15;
      sailArm.add(sail);

      this.windmillSails.add(sailArm);
    }
    this.windmillGroup.add(this.windmillSails);

    // 5. Warm Windows and Interior Lantern
    const winMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfbbf24,
      emissiveIntensity: this.isNightMode ? 1.6 : 0.1,
      roughness: 0.1,
    });
    const win1 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.030, 0.024), winMat);
    win1.position.set(0.125, 0.27, 0.04);
    this.windmillGroup.add(win1);

    this.windmillLight = new THREE.PointLight(0xfbbf24, this.isNightMode ? 0.85 : 0, 1.4);
    this.windmillLight.position.set(0.08, 0.28, 0);
    this.windmillGroup.add(this.windmillLight);

    this.sceneryGroup.add(this.windmillGroup);
  }

  /* =========================================================================
     8b-2. WEST COUNTRYSIDE FARMLAND: BARN, SILO, CROP FIELDS & HAY BALES
     ========================================================================= */
  private buildWestFarmlandAndBarn(): void {
    const farmGroup = new THREE.Group();
    // Positioned safely in the center of the expanded west loop meadow (track clearance 1.244)
    farmGroup.position.set(-2.05, 0.04, 0.15);

    const barnWoodMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.65 });
    const trimMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.45 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
    const strawMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.85 });
    const siloMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.75, roughness: 0.25 });
    const cropSoilMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
    const wheatMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.8 });
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.6 });

    // 1. Red Timber Dutch Barn
    const barn = new THREE.Group();
    const stoneBase = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.04, 0.24), stoneMat);
    stoneBase.position.y = 0.02;
    stoneBase.castShadow = true;
    barn.add(stoneBase);

    const barnWalls = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.22), barnWoodMat);
    barnWalls.position.y = 0.12;
    barnWalls.castShadow = true;
    barn.add(barnWalls);

    // White Cross-bracing on Barn Doors
    const doorL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.10, 0.01), trimMat);
    doorL.position.set(-0.035, 0.09, 0.112);
    barn.add(doorL);
    const doorR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.10, 0.01), trimMat);
    doorR.position.set(0.035, 0.09, 0.112);
    barn.add(doorR);

    // Gambrel Mansard Barn Roof
    const roofBase = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.06, 0.25), roofMat);
    roofBase.position.y = 0.23;
    roofBase.castShadow = true;
    barn.add(roofBase);

    const roofRidge = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.08, 4), roofMat);
    roofRidge.rotation.y = Math.PI * 0.25;
    roofRidge.position.y = 0.29;
    roofRidge.scale.set(1.1, 1.0, 1.8);
    roofRidge.castShadow = true;
    barn.add(roofRidge);

    // Hayloft Door with warm lantern
    const hayDoor = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.01), trimMat);
    hayDoor.position.set(0, 0.23, 0.128);
    barn.add(hayDoor);

    const hayLantern = new THREE.PointLight(0xfef08a, 0.6, 0.8);
    hayLantern.position.set(0, 0.26, 0.14);
    barn.add(hayLantern);

    farmGroup.add(barn);
    this.farmBarnGroup = farmGroup;

    // 2. Galvanized Grain Silo with Conical Cap (Positioned safely beside barn at -1.55, 0.40)
    const silo = new THREE.Group();
    silo.position.set(-0.22, 0, 0.10);
    const siloBody = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.32, 16), siloMat);
    siloBody.position.y = 0.16;
    siloBody.castShadow = true;
    silo.add(siloBody);

    const siloDome = new THREE.Mesh(new THREE.SphereGeometry(0.066, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), siloMat);
    siloDome.position.y = 0.32;
    siloDome.castShadow = true;
    silo.add(siloDome);

    // Silo Ladder
    for (let r = 0; r < 6; r++) {
      const rung = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.005, 0.005), trimMat);
      rung.position.set(0, 0.08 + r * 0.045, 0.068);
      silo.add(rung);
    }
    farmGroup.add(silo);

    // 3. Golden Hay Bales (Round rolled bales with twine + stacked straw blocks)
    const baleGroup = new THREE.Group();
    baleGroup.position.set(-0.25, 0, -0.08);
    const rolledBale = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.06, 12), strawMat);
    rolledBale.rotation.z = Math.PI * 0.5;
    rolledBale.position.set(0, 0.038, 0);
    rolledBale.castShadow = true;
    baleGroup.add(rolledBale);

    const sq1 = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.035, 0.045), strawMat);
    sq1.position.set(0.08, 0.018, 0.02);
    sq1.castShadow = true;
    baleGroup.add(sq1);
    const sq2 = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.035, 0.045), strawMat);
    sq2.position.set(0.08, 0.053, 0.02);
    sq2.rotation.y = 0.2;
    sq2.castShadow = true;
    baleGroup.add(sq2);
    farmGroup.add(baleGroup);

    // 4. Furrowed Crop Patch (Golden Wheat & Cabbage Rows)
    const cropPatch = new THREE.Group();
    cropPatch.position.set(-0.45, 0, -0.22);
    const soilBed = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.015, 0.22), cropSoilMat);
    soilBed.position.y = 0.008;
    cropPatch.add(soilBed);

    [-0.08, 0.0, 0.08].forEach((cz, ridx) => {
      for (let cx = -0.10; cx <= 0.10; cx += 0.04) {
        if (ridx % 2 === 0) {
          const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.008, 0.045, 5), wheatMat);
          stalk.position.set(cx, 0.035, cz);
          cropPatch.add(stalk);
        } else {
          const cabbage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.014, 0), greenMat);
          cabbage.position.set(cx, 0.025, cz);
          cropPatch.add(cabbage);
        }
      }
    });
    farmGroup.add(cropPatch);

    // 5. Miniature Orchard with Fruit Trees
    const appleTree = new THREE.Group();
    appleTree.position.set(-0.35, 0, -0.40);
    const trk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.026, 0.14, 6), barnWoodMat);
    trk.position.y = 0.07;
    appleTree.add(trk);
    const leaves = new THREE.Mesh(new THREE.DodecahedronGeometry(0.11, 1), greenMat);
    leaves.position.y = 0.18;
    appleTree.add(leaves);
    const appleMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    [[-0.06, 0.16, 0.05], [0.06, 0.19, -0.04], [0.0, 0.22, 0.07], [0.04, 0.15, 0.06]].forEach(([ax, ay, az]) => {
      const apple = new THREE.Mesh(new THREE.SphereGeometry(0.012, 6, 6), appleMat);
      apple.position.set(ax, ay, az);
      appleTree.add(apple);
    });
    farmGroup.add(appleTree);

  }

  /* =========================================================================
     8c. CANAL WATERMILL WITH ROTATING PADDLE WHEEL & SLUICE FLUME
     ========================================================================= */
  private buildCanalWatermill(): void {
    this.watermillGroup = new THREE.Group();
    // Positioned safely on the canal bank (track distance 0.52)
    this.watermillGroup.position.set(0.0, 0.035, -0.88);

    const stoneTex = this.createStoneBrickTexture();
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      map: stoneTex,
      roughness: 0.65,
      metalness: 0.05,
    });

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.7,
    });

    const plasterMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.85,
    });

    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x9a3412,
      roughness: 0.5,
    });

    // 1. Riverbank Stone Foundation
    const foundation = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.10, 0.26), stoneMat);
    foundation.position.y = 0.05;
    foundation.castShadow = true;
    foundation.receiveShadow = true;
    this.watermillGroup.add(foundation);

    // 2. Timber-Framed Upper Millhouse
    const upperHouse = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.13, 0.24), plasterMat);
    upperHouse.position.y = 0.165;
    upperHouse.castShadow = true;
    upperHouse.receiveShadow = true;
    this.watermillGroup.add(upperHouse);

    // Decorative Tudor dark timber bands
    [-0.145, 0.145].forEach((wx) => {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.13, 0.245), woodMat);
      beam.position.set(wx, 0.165, 0);
      this.watermillGroup!.add(beam);
    });

    // 3. Steep Gabled Terracotta Shingle Roof
    const roofL = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.024, 0.17), roofMat);
    roofL.position.set(0, 0.275, -0.06);
    roofL.rotation.x = 0.68;
    roofL.castShadow = true;
    this.watermillGroup.add(roofL);

    const roofR = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.024, 0.17), roofMat);
    roofR.position.set(0, 0.275, 0.06);
    roofR.rotation.x = -0.68;
    roofR.castShadow = true;
    this.watermillGroup.add(roofR);

    // Triangular Gable Infill Boards
    [-0.148, 0.148].forEach((gx) => {
      const gable = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.09, 3), woodMat);
      gable.position.set(gx, 0.275, 0);
      gable.rotation.y = gx > 0 ? Math.PI * 0.5 : -Math.PI * 0.5;
      this.watermillGroup!.add(gable);
    });

    // 4. Brick Smoke Chimney
    const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.16, 0.045), stoneMat);
    chimney.position.set(0.09, 0.30, -0.07);
    chimney.castShadow = true;
    this.watermillGroup.add(chimney);

    // 5. Wooden Sluice / Water Flume Chute
    const flume = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.022, 0.16), woodMat);
    flume.position.set(0, 0.18, 0.17);
    flume.rotation.x = 0.15;
    flume.castShadow = true;
    this.watermillGroup.add(flume);

    // 6. Rotating Timber Paddle Waterwheel (Over the canal basin water)
    this.waterwheel = new THREE.Group();
    this.waterwheel.position.set(0, 0.065, 0.18);

    const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.08, 8), woodMat);
    axle.rotation.z = Math.PI * 0.5;
    this.waterwheel.add(axle);

    // 2 Timber Outer Rims
    [-0.03, 0.03].forEach((rx) => {
      const rim = new THREE.Mesh(new THREE.RingGeometry(0.105, 0.125, 16), woodMat);
      rim.rotation.y = Math.PI * 0.5;
      rim.position.x = rx;
      this.waterwheel!.add(rim);
    });

    // 12 Wooden Buckets / Paddles
    for (let p = 0; p < 12; p++) {
      const pAngle = (p / 12) * Math.PI * 2;
      const spokeGroup = new THREE.Group();
      spokeGroup.rotation.x = pAngle;

      if (p % 2 === 0) {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.11, 0.010), woodMat);
        spoke.position.y = 0.055;
        spokeGroup.add(spoke);
      }

      const paddle = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.008, 0.036), woodMat);
      paddle.position.set(0, 0.115, 0);
      paddle.castShadow = true;
      spokeGroup.add(paddle);

      this.waterwheel.add(spokeGroup);
    }
    this.watermillGroup.add(this.waterwheel);

    // 7. Warm Exterior Watermill Sconce Lantern & Windows
    const lanternArm = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 0.045), woodMat);
    lanternArm.position.set(0.09, 0.18, 0.14);
    this.watermillGroup.add(lanternArm);

    this.watermillLight = new THREE.PointLight(0xfbbf24, this.isNightMode ? 0.85 : 0, 1.4);
    this.watermillLight.position.set(0.09, 0.16, 0.16);
    this.watermillGroup.add(this.watermillLight);

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(0.016, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xfef08a })
    );
    globe.position.copy(this.watermillLight.position);
    this.watermillGroup.add(globe);

    this.sceneryGroup.add(this.watermillGroup);
  }

  /* =========================================================================
     8d. COUNTRY VILLAGE COTTAGE & TRACKSIDE SEMAPHORE SIGNALS
     ========================================================================= */
  private buildVillageCottageAndSignals(): void {
    // 1. Half-Timbered Alpine Inn Cottage (Inside East Loop Meadow, clearance 0.871)
    this.cottageGroup = new THREE.Group();
    this.cottageGroup.position.set(2.40, 0.035, -0.35);
    this.cottageGroup.rotation.y = -0.35;

    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      map: this.createStoneBrickTexture(),
      roughness: 0.65,
    });
    const plasterMat = new THREE.MeshStandardMaterial({
      color: 0xfafaf9,
      roughness: 0.85,
    });
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x451a03,
      roughness: 0.7,
    });
    const thatchMat = new THREE.MeshStandardMaterial({
      color: 0x854d0e,
      roughness: 0.9,
    });
    const winGlowMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfbbf24,
      emissiveIntensity: this.isNightMode ? 1.8 : 0.1,
      roughness: 0.1,
    });

    // Base Foundation
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.05, 0.26), stoneMat);
    base.position.y = 0.025;
    base.castShadow = true;
    base.receiveShadow = true;
    this.cottageGroup.add(base);

    // Whitewashed Plaster Walls
    const walls = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.24), plasterMat);
    walls.position.y = 0.12;
    walls.castShadow = true;
    walls.receiveShadow = true;
    this.cottageGroup.add(walls);

    // Tudor Timber Beam Framing
    [-0.165, 0.165].forEach((bx) => {
      const vBeam = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.14, 0.244), woodMat);
      vBeam.position.set(bx, 0.12, 0);
      this.cottageGroup!.add(vBeam);
    });
    const hBeam = new THREE.Mesh(new THREE.BoxGeometry(0.344, 0.016, 0.244), woodMat);
    hBeam.position.set(0, 0.12, 0);
    this.cottageGroup.add(hBeam);

    // Thatched / Cedar Shingle Gabled Roof
    const roofL = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.026, 0.17), thatchMat);
    roofL.position.set(0, 0.225, -0.06);
    roofL.rotation.x = 0.72;
    roofL.castShadow = true;
    this.cottageGroup.add(roofL);

    const roofR = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.026, 0.17), thatchMat);
    roofR.position.set(0, 0.225, 0.06);
    roofR.rotation.x = -0.72;
    roofR.castShadow = true;
    this.cottageGroup.add(roofR);

    // Dormer Window on front roof
    const dormer = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.06, 0.06), plasterMat);
    dormer.position.set(-0.06, 0.22, 0.08);
    dormer.castShadow = true;
    this.cottageGroup.add(dormer);

    const dormerRoof = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.04, 3), thatchMat);
    dormerRoof.position.set(-0.06, 0.265, 0.08);
    dormerRoof.rotation.y = Math.PI * 0.5;
    this.cottageGroup.add(dormerRoof);

    // Brick Chimney
    const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.18, 0.042), stoneMat);
    chimney.position.set(0.12, 0.26, -0.06);
    chimney.castShadow = true;
    this.cottageGroup.add(chimney);

    // Illuminated Windows
    const win1 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.038, 0.032), winGlowMat);
    win1.position.set(0.07, 0.12, 0.122);
    this.cottageGroup.add(win1);

    const win2 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.038, 0.032), winGlowMat);
    win2.position.set(-0.07, 0.12, 0.122);
    this.cottageGroup.add(win2);

    // Wooden Cottage Door
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.07, 0.012), woodMat);
    door.position.set(0, 0.085, 0.122);
    this.cottageGroup.add(door);

    // Cottage Interior Light
    this.cottageLight = new THREE.PointLight(0xfbbf24, this.isNightMode ? 1.1 : 0, 1.6);
    this.cottageLight.position.set(0, 0.14, 0);
    this.cottageGroup.add(this.cottageLight);

    this.sceneryGroup.add(this.cottageGroup);

    // 2. Trackside Victorian Mechanical Semaphore Signal (Safe clearance 0.671)
    this.semaphoreGroup = new THREE.Group();
    this.semaphoreGroup.position.set(-0.35, 0.035, 1.25);

    const poleMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.3,
    });
    const redMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.4,
    });
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
    });

    // Tall Semaphore Mast
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.014, 0.38, 8), poleMat);
    mast.position.y = 0.19;
    mast.castShadow = true;
    this.semaphoreGroup.add(mast);

    // Maintenance Ladder Rungs
    for (let r = 0; r < 6; r++) {
      const rung = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.004, 0.004), poleMat);
      rung.position.set(0, 0.08 + r * 0.045, 0.014);
      this.semaphoreGroup.add(rung);
    }

    // Finial Cap
    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 6), poleMat);
    finial.position.y = 0.385;
    this.semaphoreGroup.add(finial);

    // Semaphore Blade Arm Group (Pivoting at y = 0.32)
    this.semaphoreArm = new THREE.Group();
    this.semaphoreArm.position.set(0, 0.32, 0.01);

    // Red Blade
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.022, 0.005), redMat);
    blade.position.x = 0.06;
    blade.castShadow = true;
    this.semaphoreArm.add(blade);

    // White Vertical Band
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.024, 0.006), whiteMat);
    band.position.x = 0.09;
    this.semaphoreArm.add(band);

    // Counterweight
    const weight = new THREE.Mesh(new THREE.BoxGeometry(0.030, 0.018, 0.010), poleMat);
    weight.position.x = -0.02;
    this.semaphoreArm.add(weight);

    this.semaphoreGroup.add(this.semaphoreArm);

    // Lamp Sconce
    this.semaphoreLight = new THREE.PointLight(0xdc2626, 0.6, 0.8);
    this.semaphoreLight.position.set(0.01, 0.32, 0.02);
    this.semaphoreGroup.add(this.semaphoreLight);

    this.sceneryGroup.add(this.semaphoreGroup);
  }

  /* =========================================================================
     8d-2. EAST ALPINE VILLAGE: TOWN FOUNTAIN, BAKERY & COBBLESTONE PLAZA
     ========================================================================= */
  private buildEastVillageAndPlaza(): void {
    const plazaGroup = new THREE.Group();
    // Positioned safely in the center of the expanded east loop meadow (track clearance 1.250)
    plazaGroup.position.set(2.05, 0.04, 0.00);

    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      map: this.createStoneBrickTexture(),
      roughness: 0.65,
    });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.7 });
    const plasterMat = new THREE.MeshStandardMaterial({ color: 0xfafaf9, roughness: 0.85 });
    const tileMat = new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.5 });
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1, metalness: 0.2 });
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.8 });
    const lampGlowMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfbbf24, emissiveIntensity: 1.2 });

    // 1. Cobblestone Plaza Floor (Radial paving)
    const plazaFloor = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.40, 0.012, 24), stoneMat);
    plazaFloor.position.y = 0.006;
    plazaFloor.receiveShadow = true;
    plazaGroup.add(plazaFloor);

    // 2. Majestic Carved 2-Tier Limestone Fountain (Replaces well away from tracks!)
    const fountain = new THREE.Group();
    const basin = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.20, 0.07, 16), stoneMat);
    basin.position.y = 0.035;
    basin.castShadow = true;
    fountain.add(basin);

    const pool = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.165, 0.01, 16), waterMat);
    pool.position.y = 0.065;
    fountain.add(pool);

    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 0.14, 12), stoneMat);
    pedestal.position.y = 0.13;
    fountain.add(pedestal);

    const upperBasin = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.10, 0.04, 12), stoneMat);
    upperBasin.position.y = 0.19;
    upperBasin.castShadow = true;
    fountain.add(upperBasin);

    const upperPool = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.01, 12), waterMat);
    upperPool.position.y = 0.205;
    fountain.add(upperPool);

    const finial = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.05, 8), stoneMat);
    finial.position.y = 0.24;
    fountain.add(finial);

    // Animated Fountain Spray Particles
    const jetCount = 28;
    const jetGeo = new THREE.BufferGeometry();
    const jetPos = new Float32Array(jetCount * 3);
    for (let j = 0; j < jetCount; j++) {
      const a = (j / jetCount) * Math.PI * 2;
      const r = 0.02 + Math.random() * 0.05;
      jetPos[j * 3] = Math.cos(a) * r;
      jetPos[j * 3 + 1] = 0.24 + Math.random() * 0.08;
      jetPos[j * 3 + 2] = Math.sin(a) * r;
    }
    jetGeo.setAttribute('position', new THREE.BufferAttribute(jetPos, 3));
    const jetMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.022,
      transparent: true,
      opacity: 0.85,
    });
    this.townFountainJet = new THREE.Points(jetGeo, jetMat);
    fountain.add(this.townFountainJet);

    plazaGroup.add(fountain);
    this.townFountainGroup = plazaGroup;

    // 3. Second Alpine Cottage: The Village Bakery (at 1.65, 0.28, clearance 0.88)
    const bakery = new THREE.Group();
    bakery.position.set(0.25, 0, 0.28);
    bakery.rotation.y = -0.55;

    const bBase = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.04, 0.22), stoneMat);
    bBase.position.y = 0.02;
    bakery.add(bBase);

    const bWalls = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.14, 0.20), plasterMat);
    bWalls.position.y = 0.11;
    bWalls.castShadow = true;
    bakery.add(bWalls);

    const bRoofL = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.022, 0.14), tileMat);
    bRoofL.position.set(0, 0.21, -0.05);
    bRoofL.rotation.x = 0.65;
    bRoofL.castShadow = true;
    bakery.add(bRoofL);

    const bRoofR = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.022, 0.14), tileMat);
    bRoofR.position.set(0, 0.21, 0.05);
    bRoofR.rotation.x = -0.65;
    bRoofR.castShadow = true;
    bakery.add(bRoofR);

    // Striped Awning over Bakery window
    const awningMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 });
    const awning = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.015, 0.06), awningMat);
    awning.position.set(0, 0.13, 0.125);
    awning.rotation.x = 0.35;
    bakery.add(awning);

    const bWinMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const bWin = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.05), bWinMat);
    bWin.position.set(0, 0.09, 0.102);
    bakery.add(bWin);

    plazaGroup.add(bakery);

    // 4. Plaza Cast-Iron Streetlamps and Wooden Benches
    [[-0.18, 0.14], [-0.18, -0.14]].forEach(([lx, lz]) => {
      const lamp = new THREE.Group();
      lamp.position.set(lx, 0, lz);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 0.24, 8), lampMat);
      post.position.y = 0.12;
      post.castShadow = true;
      lamp.add(post);
      const lantern = new THREE.Mesh(new THREE.DodecahedronGeometry(0.022, 0), lampGlowMat);
      lantern.position.y = 0.25;
      lamp.add(lantern);
      plazaGroup.add(lamp);
    });

    const pBench = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.035, 0.045), woodMat);
    pBench.position.set(0.08, 0.025, -0.22);
    pBench.rotation.y = -0.3;
    pBench.castShadow = true;
    plazaGroup.add(pBench);

    this.sceneryGroup.add(plazaGroup);
  }

  /* =========================================================================
     8e. BIOLUMINESCENT NIGHT FIREFLIES
     ========================================================================= */
  private buildBioluminescentFireflies(): void {
    this.firefliesGroup = new THREE.Group();
    this.fireflies = [];

    const fireflyGeo = new THREE.SphereGeometry(0.007, 6, 6);
    const fireflyMat = new THREE.MeshBasicMaterial({
      color: 0xccff00,
      transparent: true,
      opacity: this.isNightMode ? 0.85 : 0,
    });

    // 24 fireflies scattered over pond, meadow, and orchards
    const coords = [
      // Over the canal water
      [-0.15, 0.08, -0.45], [0.12, 0.12, -0.35], [-0.05, 0.10, -0.20],
      [0.22, 0.09, -0.15], [-0.25, 0.14, 0.10], [0.08, 0.11, 0.25],
      [-0.18, 0.09, 0.38], [0.15, 0.13, 0.42],
      // Around the Dutch Windmill knoll
      [-1.50, 0.12, 0.20], [-1.30, 0.16, -0.15], [-1.65, 0.18, -0.10],
      [-1.20, 0.11, 0.30], [-1.45, 0.14, -0.35], [-1.10, 0.10, -0.10],
      [-1.55, 0.20, 0.10], [-1.35, 0.15, 0.12],
      // Around the cottage & station meadows
      [1.35, 0.12, 0.35], [1.50, 0.15, 0.10], [1.25, 0.14, -0.20],
      [1.40, 0.11, -0.30], [1.10, 0.10, 0.25], [1.20, 0.16, 0.50],
      [0.95, 0.12, 0.15], [1.45, 0.13, 0.05],
    ];

    coords.forEach(([bx, by, bz], idx) => {
      const mesh = new THREE.Mesh(fireflyGeo, fireflyMat.clone());
      mesh.position.set(bx, by, bz);
      this.firefliesGroup!.add(mesh);

      this.fireflies.push({
        mesh,
        baseX: bx,
        baseY: by,
        baseZ: bz,
        speed: 0.6 + (idx % 5) * 0.25,
        phase: idx * 0.75,
        radius: 0.035 + (idx % 3) * 0.02,
      });
    });

    this.sceneryGroup.add(this.firefliesGroup);
  }

  /* Micro-Interactions for New Props */
  public triggerWindmillSpin(): void {
    if (!this.windmillSails) return;
    this.windmillCurrentSpeed = 0.075;
    this.audio.playWindmillSpin();
    if (this.windmillGroup) {
      gsap.to(this.windmillGroup.scale, {
        y: 1.08,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: 'power1.out',
      });
    }
  }

  public triggerWaterwheelSpin(): void {
    if (!this.waterwheel) return;
    this.audio.playWaterwheel();
    this.triggerSplash(0.0, 0.035, -0.73);
    if (this.watermillGroup) {
      gsap.to(this.watermillGroup.scale, {
        y: 1.06,
        duration: 0.12,
        yoyo: true,
        repeat: 1,
        ease: 'power1.out',
      });
    }
  }

  public triggerSemaphoreToggle(): void {
    if (!this.semaphoreArm) return;
    this.semaphoreIsRaised = !this.semaphoreIsRaised;
    const targetAngle = this.semaphoreIsRaised ? Math.PI * 0.25 : 0;
    gsap.to(this.semaphoreArm.rotation, {
      z: targetAngle,
      duration: 0.35,
      ease: 'back.out(1.8)',
    });
    if (this.semaphoreLight) {
      this.semaphoreLight.color.set(this.semaphoreIsRaised ? 0x10b981 : 0xdc2626);
    }
    this.audio.playSwitchClick();
  }

  public triggerCottageChimney(): void {
    if (!this.cottageGroup) return;
    this.audio.playSteamChuff(false);
    this.triggerTelegraphPing(this.cottageGroup);
  }

  /* =========================================================================
     9. LEVEL CROSSING & TRACKSIDE TELEGRAPH POLES
     ========================================================================= */
  private buildLevelCrossingAndTelegraph(): void {
    // 1. Railroad Level Crossing with Alternating Red Beacons
    const crossingGroup = new THREE.Group();
    // Positioned safely beside the rails with generous train clearance
    crossingGroup.position.set(-0.45, 0, 0.82);

    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.016, 0.018, 0.38, 8),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6 })
    );
    post.position.y = 0.19;
    post.castShadow = true;
    crossingGroup.add(post);

    // Crossbuck Sign (X)
    const signMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const bar1 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.026, 0.008), signMat);
    bar1.position.set(0, 0.34, 0.015);
    bar1.rotation.z = Math.PI * 0.25;
    crossingGroup.add(bar1);

    const bar2 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.026, 0.008), signMat);
    bar2.position.set(0, 0.34, 0.015);
    bar2.rotation.z = -Math.PI * 0.25;
    crossingGroup.add(bar2);

    // Alternating Red Flashing Lamps
    const lampMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    this.crossingLamp1 = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), lampMat);
    this.crossingLamp1.position.set(-0.05, 0.27, 0.022);
    crossingGroup.add(this.crossingLamp1);

    this.crossingLight1 = new THREE.PointLight(0xef4444, 0.8, 0.8);
    this.crossingLight1.position.copy(this.crossingLamp1.position);
    crossingGroup.add(this.crossingLight1);

    this.crossingLamp2 = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), lampMat);
    this.crossingLamp2.position.set(0.05, 0.27, 0.022);
    crossingGroup.add(this.crossingLamp2);

    this.crossingLight2 = new THREE.PointLight(0xef4444, 0.2, 0.8);
    this.crossingLight2.position.copy(this.crossingLamp2.position);
    crossingGroup.add(this.crossingLight2);

    this.sceneryGroup.add(crossingGroup);

    // 2. Trackside Telegraph Poles (Positioned on the scenic perimeter with min clearance > 0.41)
    const poleCoords = [
      [-1.20, 1.45],
      [-0.45, 1.35],
      [0.45, -1.35],
      [1.20, -1.45],
    ];

    const poleWood = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });

    poleCoords.forEach(([px, pz]) => {
      const p = new THREE.Group();
      p.position.set(px, 0, pz);

      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.024, 0.44, 6), poleWood);
      mast.position.y = 0.22;
      mast.castShadow = true;
      p.add(mast);

      const crossbar = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.016, 0.016), poleWood);
      crossbar.position.y = 0.40;
      p.add(crossbar);

      // Ceramic insulators
      const insMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
      [-0.06, 0.06].forEach((ix) => {
        const ins = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.02, 6), insMat);
        ins.position.set(ix, 0.415, 0);
        p.add(ins);
      });

      this.sceneryGroup.add(p);
      this.interactivePoles.push(p);
    });
  }

  /* =========================================================================
     10. LUSH NATURE, FLUFFY TREES & GRAZING SHEEP MEEPLES
     ========================================================================= */
  private getApproxDistanceToTrack(x: number, z: number): number {
    let minD = Infinity;
    const N = 140;
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2;
      const tx = Math.sin(t) * 3.30;
      const tz = Math.sin(2 * t) * 1.60;
      const d = Math.hypot(tx - x, tz - z);
      if (d < minD) minD = d;
    }
    return minD;
  }

  private buildLushNatureAndFlock(): void {
    // 100% collision-free trees placed organically across the expanded landscape (clearance >= 0.50)
    const treeData = [
      // Left lobe interior meadow & knolls
      { x: -2.75, z: 0.10, type: 'deciduous', col: 0x15803d, scale: 1.1 },
      { x: -2.60, z: -0.35, type: 'pine', col: 0x166534, scale: 1.2 },
      { x: -2.80, z: -0.10, type: 'deciduous', col: 0x22c55e, scale: 1.0 },
      { x: -1.75, z: -0.55, type: 'pine', col: 0x14532d, scale: 1.15 },
      { x: -1.45, z: 0.45, type: 'deciduous', col: 0x65a30d, scale: 1.05 },
      { x: -1.15, z: -0.30, type: 'pine', col: 0x15803d, scale: 0.95 },
      // Right lobe interior meadow & knolls
      { x: 2.75, z: 0.10, type: 'deciduous', col: 0x15803d, scale: 1.1 },
      { x: 2.60, z: -0.45, type: 'pine', col: 0x166534, scale: 1.2 },
      { x: 2.80, z: -0.10, type: 'deciduous', col: 0x22c55e, scale: 1.0 },
      { x: 1.75, z: 0.50, type: 'pine', col: 0x14532d, scale: 1.15 },
      { x: 1.45, z: -0.45, type: 'deciduous', col: 0x65a30d, scale: 1.05 },
      { x: 1.15, z: 0.30, type: 'pine', col: 0x15803d, scale: 0.95 },
    ];

    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 });

    treeData.forEach(({ x, z, type, col, scale }) => {
      const tree = new THREE.Group();
      tree.position.set(x, 0, z);
      tree.scale.setScalar(scale);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.034, 0.16, 6), trunkMat);
      trunk.position.y = 0.08;
      trunk.castShadow = true;
      tree.add(trunk);

      const leafMat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.5 });

      if (type === 'pine') {
        const c1 = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.22, 6), leafMat);
        c1.position.y = 0.22;
        c1.castShadow = true;
        tree.add(c1);

        const c2 = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.18, 6), leafMat);
        c2.position.y = 0.32;
        c2.castShadow = true;
        tree.add(c2);

        const c3 = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.13, 6), leafMat);
        c3.position.y = 0.41;
        c3.castShadow = true;
        tree.add(c3);
      } else {
        const f1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 1), leafMat);
        f1.position.set(0, 0.25, 0);
        f1.castShadow = true;
        tree.add(f1);

        const f2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.13, 1), leafMat);
        f2.position.set(0.04, 0.35, 0.02);
        f2.castShadow = true;
        tree.add(f2);
      }

      this.interactiveTrees.push(tree);
      this.sceneryGroup.add(tree);
    });

    // Cute Low-Poly Fluffy Sheep Flock & Lambs Grazing safely on the Meadows (clearance > 0.85)
    const sheepMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9 });
    const sheepHeadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });

    const sheepCoords = [
      // Adult sheep in western meadow pasture
      { pos: [-1.85, 0.04, 0.35], scale: 1.0 },
      { pos: [-2.20, 0.04, 0.40], scale: 1.0 },
      { pos: [-2.45, 0.04, 0.20], scale: 1.0 },
      { pos: [-2.60, 0.04, 0.65], scale: 0.95 },
      { pos: [-2.35, 0.04, -0.15], scale: 1.0 },
      // Playful little lambs
      { pos: [-2.05, 0.04, 0.55], scale: 0.65 },
      { pos: [-2.50, 0.04, 0.42], scale: 0.65 },
      // Eastern meadow sheep
      { pos: [1.75, 0.04, -0.15], scale: 1.0 },
      { pos: [2.15, 0.04, -0.40], scale: 1.0 },
      { pos: [2.45, 0.04, 0.45], scale: 0.9 },
    ];

    sheepCoords.forEach(({ pos: [sx, sy, sz], scale }) => {
      const sheep = new THREE.Group();
      sheep.position.set(sx, sy, sz);
      sheep.scale.setScalar(scale);

      // Woolly Body
      const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.045, 1), sheepMat);
      body.position.y = 0.045;
      body.scale.set(1.2, 0.9, 0.9);
      body.castShadow = true;
      sheep.add(body);

      // Tiny Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), sheepHeadMat);
      head.position.set(0.05, 0.05, 0);
      sheep.add(head);

      this.interactiveSheep.push(sheep);
      this.sceneryGroup.add(sheep);
    });

    // Highland Cow with rustic horns grazing peacefully in the meadow
    const cow = new THREE.Group();
    cow.position.set(-1.62, 0.04, -0.22);
    const cowBodyMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.85 });
    const cowHornMat = new THREE.MeshStandardMaterial({ color: 0xfef9c3, roughness: 0.35 });
    const cowBody = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.07), cowBodyMat);
    cowBody.position.y = 0.055;
    cowBody.castShadow = true;
    cow.add(cowBody);
    const cowHead = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), cowBodyMat);
    cowHead.position.set(0.08, 0.075, 0);
    cow.add(cowHead);
    const hornL = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.05, 5), cowHornMat);
    hornL.rotation.z = -Math.PI * 0.35;
    hornL.position.set(0.08, 0.11, 0.035);
    cow.add(hornL);
    const hornR = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.05, 5), cowHornMat);
    hornR.rotation.z = -Math.PI * 0.35;
    hornR.position.set(0.08, 0.11, -0.035);
    cow.add(hornR);
    this.interactiveSheep.push(cow);
    this.sceneryGroup.add(cow);

    // Rustic Wooden Split-Rail Pasture Fences
    const fenceWoodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
    const fencePosts = [
      [-1.75, 0.15], [-2.05, 0.15], [-2.35, 0.15], [-2.65, 0.15],
      [-2.80, 0.35], [-2.80, 0.65], [-2.65, 0.85], [-2.35, 0.85],
    ];
    fencePosts.forEach(([px, pz], idx) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.08, 5), fenceWoodMat);
      post.position.set(px, 0.04, pz);
      post.castShadow = true;
      this.sceneryGroup.add(post);

      if (idx < fencePosts.length - 1) {
        const next = fencePosts[idx + 1];
        const midX = (px + next[0]) * 0.5;
        const midZ = (pz + next[1]) * 0.5;
        const len = Math.hypot(next[0] - px, next[1] - pz);
        const ang = Math.atan2(next[1] - pz, next[0] - px);

        [0.055, 0.032].forEach((ry) => {
          const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.008, 0.008), fenceWoodMat);
          rail.position.set(midX, ry, midZ);
          rail.rotation.y = -ang;
          this.sceneryGroup.add(rail);
        });
      }
    });

    // Trail Directional Signpost
    const signpost = new THREE.Group();
    signpost.position.set(-1.68, 0.04, 0.62);
    const postPole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.14, 6), fenceWoodMat);
    postPole.position.y = 0.07;
    signpost.add(postPole);

    const signBoard1 = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.018, 0.006), fenceWoodMat);
    signBoard1.position.set(0.02, 0.12, 0);
    signBoard1.rotation.y = 0.25;
    signpost.add(signBoard1);

    const signBoard2 = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.016, 0.006), fenceWoodMat);
    signBoard2.position.set(-0.02, 0.09, 0);
    signBoard2.rotation.y = -0.35;
    signpost.add(signBoard2);
    this.sceneryGroup.add(signpost);

    // ============================================================
    // EASTERN ORCHARD & HONEY BEEHIVES (Alive Scenery)
    // ============================================================
    this.orchardGroup = new THREE.Group();
    this.orchardGroup.position.set(2.35, 0, 0.15);

    // Miniature Fruit Trees with Red Apples
    const fruitTreeMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.55 });
    const appleMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 });
    const oTrunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 });

    const orchardTreePositions = [
      { x: 0.0, z: 0.0 },
      { x: 0.35, z: -0.25 },
    ];

    orchardTreePositions.forEach(({ x, z }) => {
      const oTree = new THREE.Group();
      oTree.position.set(x, 0, z);

      const oTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.028, 0.14, 6), oTrunkMat);
      oTrunk.position.y = 0.07;
      oTrunk.castShadow = true;
      oTree.add(oTrunk);

      const canopy = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14, 1), fruitTreeMat);
      canopy.position.set(0, 0.18, 0);
      canopy.castShadow = true;
      oTree.add(canopy);

      // Embedded shiny red apples
      const appleOffsets = [
        [0.08, 0.16, 0.06], [-0.07, 0.19, 0.05], [0.03, 0.22, -0.08],
        [-0.05, 0.15, -0.06], [0.06, 0.20, 0.08],
      ];
      appleOffsets.forEach(([ax, ay, az]) => {
        const apple = new THREE.Mesh(new THREE.SphereGeometry(0.012, 6, 6), appleMat);
        apple.position.set(ax, ay, az);
        oTree.add(apple);
      });

      this.interactiveTrees.push(oTree);
      this.orchardGroup.add(oTree);
    });

    // Striped Wooden Beehives with Sloped Roof
    this.beehiveGroup = new THREE.Group();
    this.beehiveGroup.position.set(0.15, 0.04, 0.32);

    const hiveMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.6 });
    const hiveRoofMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.5 });
    const hiveBase = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.07, 0.065), hiveMat);
    hiveBase.position.y = 0.035;
    hiveBase.castShadow = true;
    this.beehiveGroup.add(hiveBase);

    const hiveRoof = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.035, 4), hiveRoofMat);
    hiveRoof.position.y = 0.085;
    hiveRoof.rotation.y = Math.PI * 0.25;
    hiveRoof.castShadow = true;
    this.beehiveGroup.add(hiveRoof);
    this.orchardGroup.add(this.beehiveGroup);

    // Buzzing Honey Bees
    const beeMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    for (let b = 0; b < 4; b++) {
      const bee = new THREE.Mesh(new THREE.SphereGeometry(0.005, 4, 4), beeMat);
      bee.position.set(2.50, 0.12 + b * 0.02, 0.45);
      this.sceneryGroup.add(bee);
      this.bees.push({
        mesh: bee,
        baseX: 2.50,
        baseY: 0.12 + b * 0.02,
        baseZ: 0.47,
        speed: 2.2 + b * 0.6,
        phase: b * 1.57,
        radius: 0.06 + (b % 2) * 0.03,
      });
    }

    // Cozy Wooden Park Bench Overlooking Canal
    const benchGroup = new THREE.Group();
    benchGroup.position.set(-0.25, 0.04, -0.20);
    benchGroup.rotation.y = -Math.PI * 0.4;
    const benchSeat = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.008, 0.035), fenceWoodMat);
    benchSeat.position.y = 0.024;
    benchGroup.add(benchSeat);
    const benchBack = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.032, 0.006), fenceWoodMat);
    benchBack.position.set(0, 0.042, -0.015);
    benchGroup.add(benchBack);
    this.orchardGroup.add(benchGroup);

    this.sceneryGroup.add(this.orchardGroup);

    // Expanded Wildflower Meadows (96 dots across outer landscape, ZERO flowers on track)
    const flowerColors = [0xef4444, 0xfacc15, 0xffffff, 0xa855f7, 0x38bdf8];
    for (let f = 0; f < 96; f++) {
      const lobe = f % 2 === 0 ? -1.85 : 1.85;
      const rad = 0.35 + (f % 6) * 0.18;
      const ang = f * 1.35;
      const fx = lobe + Math.cos(ang) * rad;
      const fz = Math.sin(ang) * rad;

      // Absolute safety: flowers must never spawn on or near the track
      if (this.getApproxDistanceToTrack(fx, fz) < 0.42) continue;

      const col = flowerColors[f % flowerColors.length];
      const flMat = new THREE.MeshBasicMaterial({ color: col });
      const flDot = new THREE.Mesh(new THREE.SphereGeometry(0.016, 6, 6), flMat);
      flDot.position.set(fx, 0.04, fz);
      this.sceneryGroup.add(flDot);
    }
  }

  /* =========================================================================
     11. ARTICULATED CHIBI TOY TRAIN FLEET (4 COHESIVE CARS)
     ========================================================================= */
  private buildArticulatedTrain(): void {
    // -------------------------------------------------------------
    // CAR 1: LEAD LOCOMOTIVE (Emerald Green & Polished Brass)
    // -------------------------------------------------------------
    const loco = new THREE.Group();

    // Dark Red Chassis
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.35 });
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.04, 0.18), chassisMat);
    chassis.position.y = 0.05;
    chassis.castShadow = true;
    loco.add(chassis);

    // Front Cowcatcher Pilot
    const pilot = new THREE.Mesh(
      new THREE.ConeGeometry(0.10, 0.08, 4),
      new THREE.MeshStandardMaterial({ color: 0xb91c1c })
    );
    pilot.rotation.y = Math.PI * 0.25;
    pilot.rotation.x = -Math.PI * 0.5;
    pilot.position.set(0.20, 0.045, 0);
    pilot.castShadow = true;
    loco.add(pilot);

    // Cylindrical Emerald Boiler
    const boilerMat = new THREE.MeshStandardMaterial({
      color: 0x047857,
      roughness: 0.25,
      metalness: 0.12,
    });
    const boiler = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.22, 16), boilerMat);
    boiler.rotation.z = Math.PI * 0.5;
    boiler.position.set(0.07, 0.125, 0);
    boiler.castShadow = true;
    loco.add(boiler);

    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.074, 12, 12), boilerMat);
    cap.position.set(0.18, 0.125, 0);
    cap.castShadow = true;
    loco.add(cap);

    // Brass Boiler Straps
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.25 });
    [-0.01, 0.06, 0.14].forEach((bx) => {
      const strap = new THREE.Mesh(new THREE.TorusGeometry(0.076, 0.006, 8, 16), brassMat);
      strap.rotation.y = Math.PI * 0.5;
      strap.position.set(bx, 0.125, 0);
      loco.add(strap);
    });

    // Flared Smokestack
    const stackMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
    const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.018, 0.08, 8), stackMat);
    stack.position.set(0.13, 0.22, 0);
    stack.castShadow = true;
    loco.add(stack);

    const stackRim = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.005, 6, 12), brassMat);
    stackRim.rotation.x = Math.PI * 0.5;
    stackRim.position.set(0.13, 0.26, 0);
    loco.add(stackRim);

    // Brass Whistle Dome
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 10), brassMat);
    dome.position.set(0.02, 0.21, 0);
    dome.castShadow = true;
    loco.add(dome);

    // Engineer Cab with Windows
    const cabMat = new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.3 });
    const cab = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.176), cabMat);
    cab.position.set(-0.10, 0.15, 0);
    cab.castShadow = true;
    loco.add(cab);

    const cabRoof = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.025, 0.19), brassMat);
    cabRoof.position.set(-0.10, 0.24, 0);
    cabRoof.castShadow = true;
    loco.add(cabRoof);

    // Warm Cab Windows
    const winMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const winL = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.06), winMat);
    winL.position.set(-0.10, 0.16, 0.089);
    loco.add(winL);

    const winR = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.06), winMat);
    winR.rotation.y = Math.PI;
    winR.position.set(-0.10, 0.16, -0.089);
    loco.add(winR);

    // ============================================================
    // VINTAGE BRASS LOCOMOTIVE LANTERN & ADVANCED VOLUMETRIC BEAMS
    // ============================================================
    // 1. Polished Brass Lantern Housing
    const lampHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.028, 0.044, 16), brassMat);
    lampHousing.rotation.z = Math.PI * 0.5;
    lampHousing.position.set(0.20, 0.14, 0);
    lampHousing.castShadow = true;
    loco.add(lampHousing);

    // Front Brass Bezel Ring
    const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.034, 0.005, 8, 16), brassMat);
    bezel.rotation.y = Math.PI * 0.5;
    bezel.position.set(0.222, 0.14, 0);
    loco.add(bezel);

    // Silver Parabolic Internal Reflector Dish
    const dishMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95, roughness: 0.08 });
    const dish = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.022, 16, 1, true), dishMat);
    dish.rotation.z = -Math.PI * 0.5;
    dish.position.set(0.210, 0.14, 0);
    loco.add(dish);

    // Incandescent Core Filament Bulb
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      emissive: 0xfef08a,
      emissiveIntensity: 3.2,
      roughness: 0.1,
    });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.013, 8, 8), bulbMat);
    bulb.position.set(0.218, 0.14, 0);
    loco.add(bulb);

    // Convex Optical Glass Lens with warm transmission
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xfef08a,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const lens = new THREE.Mesh(new THREE.SphereGeometry(0.031, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), lensMat);
    lens.rotation.z = -Math.PI * 0.5;
    lens.position.set(0.222, 0.14, 0);
    loco.add(lens);

    // 2. Soft Ambient Chassis Glow (PointLight)
    this.headlampLight = new THREE.PointLight(0xfef08a, 1.8, 1.2);
    this.headlampLight.position.set(0.26, 0.14, 0);
    loco.add(this.headlampLight);

    // 3. True Forward-Facing Three.js SpotLight projecting onto rails
    this.headlampSpotLight = new THREE.SpotLight(0xfff7ed, 2.2, 2.0, Math.PI * 0.16, 0.85, 1.4);
    this.headlampSpotLight.position.set(0.23, 0.14, 0);
    const spotTarget = new THREE.Object3D();
    spotTarget.position.set(0.85, 0.04, 0); // Pointing forward and slightly downward to rails
    loco.add(spotTarget);
    this.headlampSpotLight.target = spotTarget;
    loco.add(this.headlampSpotLight);

    // 4. Outer Soft Volumetric Light Beam (Fades smoothly along length to ZERO opacity at tip)
    const beamGeo = new THREE.CylinderGeometry(0.024, 0.09, 0.46, 24, 1, true);
    beamGeo.translate(0, -0.23, 0);
    beamGeo.rotateZ(Math.PI * 0.5); // Apex at (0,0,0) and base extends along +X
    beamGeo.rotateY(-0.06); // Pitch down slightly toward rails
    const beamMat = new THREE.MeshBasicMaterial({
      map: this.createVolumetricBeamTexture(),
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.headlampBeam = new THREE.Mesh(beamGeo, beamMat);
    this.headlampBeam.position.set(0.22, 0.14, 0);
    this.headlampBeam.visible = false;
    loco.add(this.headlampBeam);

    // 5. Intense Inner Core Beam (Piercing optical center)
    const coreGeo = new THREE.CylinderGeometry(0.012, 0.042, 0.28, 16, 1, true);
    coreGeo.translate(0, -0.14, 0);
    coreGeo.rotateZ(Math.PI * 0.5);
    coreGeo.rotateY(-0.06);
    const coreMat = new THREE.MeshBasicMaterial({
      map: this.createVolumetricBeamTexture(),
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.headlampCoreBeam = new THREE.Mesh(coreGeo, coreMat);
    this.headlampCoreBeam.position.set(0.22, 0.14, 0);
    this.headlampCoreBeam.visible = false;
    loco.add(this.headlampCoreBeam);

    // 6. Ground Track Illumination Decal (Shines directly on the steel rails & wooden sleepers ahead)
    const poolMat = new THREE.MeshBasicMaterial({
      map: this.createHeadlampPoolTexture(),
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.headlampTrackPool = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.44), poolMat);
    this.headlampTrackPool.rotation.x = -Math.PI * 0.5;
    this.headlampTrackPool.rotation.z = -Math.PI * 0.5; // Long axis extends along +X ahead of loco
    this.headlampTrackPool.position.set(0.40, 0.058, 0); // Positioned right above the rail level!
    this.headlampTrackPool.visible = false;
    loco.add(this.headlampTrackPool);

    // 7. Polished Brass Whistle & Boiler Dome atop Locomotive
    const brassDetailMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.2,
    });
    const steamDome = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.038, 0.045, 12), brassDetailMat);
    steamDome.position.set(0.04, 0.175, 0);
    steamDome.castShadow = true;
    loco.add(steamDome);

    const whistle = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.035, 6), brassDetailMat);
    whistle.position.set(-0.03, 0.19, 0.03);
    loco.add(whistle);

    // Front Smokebox Door with Brass Numberplate "7"
    const smokeboxMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.45, metalness: 0.4 });
    const smokeboxDoor = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.072, 0.012, 16), smokeboxMat);
    smokeboxDoor.rotation.z = Math.PI * 0.5;
    smokeboxDoor.position.set(0.186, 0.125, 0);
    smokeboxDoor.castShadow = true;
    loco.add(smokeboxDoor);

    const numberPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.006, 12), brassDetailMat);
    numberPlate.rotation.z = Math.PI * 0.5;
    numberPlate.position.set(0.193, 0.125, 0);
    loco.add(numberPlate);

    // Dual Twin Steam Cylinders & Crosshead Guides
    const cylMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.7 });
    [-0.102, 0.102].forEach((cz) => {
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.088, 12), cylMat);
      cyl.rotation.z = Math.PI * 0.5;
      cyl.position.set(0.09, 0.045, cz);
      cyl.castShadow = true;
      loco.add(cyl);

      const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.05, 8), brassDetailMat);
      piston.rotation.z = Math.PI * 0.5;
      piston.position.set(0.035, 0.045, cz);
      loco.add(piston);
    });

    // Engineer Cab Interior Firebox Door with Warm Amber Hearth Glow
    const fireboxMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const firebox = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.05, 0.01), fireboxMat);
    firebox.position.set(-0.02, 0.10, 0);
    loco.add(firebox);

    const fireboxGlow = new THREE.PointLight(0xf97316, 0.8, 0.6);
    fireboxGlow.position.set(-0.04, 0.12, 0);
    loco.add(fireboxGlow);

    // Coupler knuckle
    const couplerMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.4 });
    const locoCoupler = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.016, 0.024), couplerMat);
    locoCoupler.position.set(-0.19, 0.048, 0);
    loco.add(locoCoupler);

    // 4 Wheels
    this.attachWheels(loco, [
      [0.08, 0.045, 0.09],
      [-0.08, 0.045, 0.09],
      [0.08, 0.045, -0.09],
      [-0.08, 0.045, -0.09],
    ], 0.045);

    // Reciprocating Side Connecting Rods (Left & Right)
    const rodMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.85, roughness: 0.2 });
    const rodGeo = new THREE.BoxGeometry(0.18, 0.010, 0.006);

    this.leftSideRod = new THREE.Mesh(rodGeo, rodMat);
    this.leftSideRod.position.set(0, 0.045, 0.104);
    this.leftSideRod.castShadow = true;
    loco.add(this.leftSideRod);

    this.rightSideRod = new THREE.Mesh(rodGeo, rodMat);
    this.rightSideRod.position.set(0, 0.045, -0.104);
    this.rightSideRod.castShadow = true;
    loco.add(this.rightSideRod);

    this.locoCar = loco;
    this.trainGroup.add(this.locoCar);

    // -------------------------------------------------------------
    // CAR 2: COAL TENDER (Charcoal Hopper loaded with Coal)
    // -------------------------------------------------------------
    const tender = new THREE.Group();
    const tenderMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
    const tenderBody = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.11, 0.17), tenderMat);
    tenderBody.position.y = 0.095;
    tenderBody.castShadow = true;
    tender.add(tenderBody);

    const coalMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
    const coalMound = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08, 1), coalMat);
    coalMound.position.set(0, 0.14, 0);
    coalMound.scale.set(1.2, 0.6, 0.85);
    coalMound.castShadow = true;
    tender.add(coalMound);

    // Coupler Knuckles
    const tenderCouplerF = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.016, 0.024), couplerMat);
    tenderCouplerF.position.set(0.13, 0.048, 0);
    tender.add(tenderCouplerF);

    const tenderCouplerR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.016, 0.024), couplerMat);
    tenderCouplerR.position.set(-0.13, 0.048, 0);
    tender.add(tenderCouplerR);

    this.attachWheels(tender, [
      [0.065, 0.038, 0.088],
      [-0.065, 0.038, 0.088],
      [0.065, 0.038, -0.088],
      [-0.065, 0.038, -0.088],
    ], 0.038);

    this.tenderCar = tender;
    this.trainGroup.add(this.tenderCar);

    // -------------------------------------------------------------
    // CAR 3: PASSENGER COACH (Warm Amber & Illuminated Windows)
    // -------------------------------------------------------------
    const coach = new THREE.Group();
    const coachMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.3,
    });
    const cBody = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.14, 0.176), coachMat);
    cBody.position.y = 0.11;
    cBody.castShadow = true;
    coach.add(cBody);

    const roofMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const cRoof = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.028, 0.19), roofMat);
    cRoof.position.y = 0.19;
    cRoof.castShadow = true;
    coach.add(cRoof);

    // Clerestory Raised Monitor Roof Tier
    const clerestory = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.022, 0.11), roofMat);
    clerestory.position.y = 0.21;
    clerestory.castShadow = true;
    coach.add(clerestory);

    // End Balcony Vestibule Railings
    const vestibuleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.4 });
    [-0.19, 0.19].forEach((vx) => {
      const platform = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.012, 0.15), vestibuleMat);
      platform.position.set(vx, 0.046, 0);
      coach.add(platform);

      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.045, 0.15), vestibuleMat);
      rail.position.set(vx, 0.072, 0);
      coach.add(rail);
    });

    // Illuminated Passenger Windows
    this.coachWindowMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0x000000,
      emissiveIntensity: 0,
      roughness: 0.1,
    });

    [-0.10, 0, 0.10].forEach((wx) => {
      // Left window
      const winL = new THREE.Mesh(new THREE.PlaneGeometry(0.055, 0.055), this.coachWindowMat);
      winL.position.set(wx, 0.125, 0.089);
      coach.add(winL);

      // Right window
      const winR = new THREE.Mesh(new THREE.PlaneGeometry(0.055, 0.055), this.coachWindowMat);
      winR.rotation.y = Math.PI;
      winR.position.set(wx, 0.125, -0.089);
      coach.add(winR);
    });

    // Warm Interior Point Lights
    this.coachInteriorLight1 = new THREE.PointLight(0xfef08a, 0, 1.2);
    this.coachInteriorLight1.position.set(-0.06, 0.125, 0);
    coach.add(this.coachInteriorLight1);

    this.coachInteriorLight2 = new THREE.PointLight(0xfef08a, 0, 1.2);
    this.coachInteriorLight2.position.set(0.06, 0.125, 0);
    coach.add(this.coachInteriorLight2);

    // Coupler Knuckles
    const coachCouplerF = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.016, 0.024), couplerMat);
    coachCouplerF.position.set(0.19, 0.048, 0);
    coach.add(coachCouplerF);

    const coachCouplerR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.016, 0.024), couplerMat);
    coachCouplerR.position.set(-0.19, 0.048, 0);
    coach.add(coachCouplerR);

    this.attachWheels(coach, [
      [0.10, 0.038, 0.088],
      [-0.10, 0.038, 0.088],
      [0.10, 0.038, -0.088],
      [-0.10, 0.038, -0.088],
    ], 0.038);

    this.coachCar = coach;
    this.trainGroup.add(this.coachCar);

    // -------------------------------------------------------------
    // CAR 4: CABOOSE / OBSERVATION CAR (Vintage Ruby & Tail Lamp)
    // -------------------------------------------------------------
    const caboose = new THREE.Group();
    const cabooseMat = new THREE.MeshStandardMaterial({
      color: 0xbe123c,
      roughness: 0.35,
    });
    const cabBody = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.13, 0.176), cabooseMat);
    cabBody.position.y = 0.105;
    cabBody.castShadow = true;
    caboose.add(cabBody);

    const cupola = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.07, 0.14), cabooseMat);
    cupola.position.set(-0.02, 0.20, 0);
    cupola.castShadow = true;
    caboose.add(cupola);

    const cupolaRoof = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.018, 0.16), roofMat);
    cupolaRoof.position.set(-0.02, 0.245, 0);
    caboose.add(cupolaRoof);

    // Cupola Look-out Windows
    const cupolaWinMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    [-0.072, 0.072].forEach((cz) => {
      const cWin = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.035), cupolaWinMat);
      cWin.position.set(-0.02, 0.20, cz);
      if (cz < 0) cWin.rotation.y = Math.PI;
      caboose.add(cWin);
    });

    // Rear Observation Deck with Brass Railing
    const obsDeck = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.012, 0.15), couplerMat);
    obsDeck.position.set(-0.175, 0.046, 0);
    caboose.add(obsDeck);

    const obsRail = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.045, 0.15), brassDetailMat);
    obsRail.position.set(-0.195, 0.072, 0);
    caboose.add(obsRail);

    // Front Coupler Knuckle
    const cabooseCouplerF = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.016, 0.024), couplerMat);
    cabooseCouplerF.position.set(0.16, 0.048, 0);
    caboose.add(cabooseCouplerF);

    // Ruby Tail Lantern Glowing on Back (Local -X)
    const tailLamp = new THREE.Mesh(
      new THREE.SphereGeometry(0.024, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    tailLamp.position.set(-0.16, 0.12, 0);
    caboose.add(tailLamp);

    this.tailLight = new THREE.PointLight(0xef4444, 0.8, 1.2);
    this.tailLight.position.set(-0.20, 0.12, 0);
    caboose.add(this.tailLight);

    this.attachWheels(caboose, [
      [0.08, 0.038, 0.088],
      [-0.08, 0.038, 0.088],
      [0.08, 0.038, -0.088],
      [-0.08, 0.038, -0.088],
    ], 0.038);

    this.cabooseCar = caboose;
    this.trainGroup.add(this.cabooseCar);

    // -------------------------------------------------------------
    // VOLUMETRIC PUFFY STEAM PARTICLE POOL
    // -------------------------------------------------------------
    for (let s = 0; s < 16; s++) {
      const sMesh = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.036 + (s % 3) * 0.014, 1),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.1,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        })
      );
      sMesh.visible = false;
      sMesh.position.set(0, -100, 0);
      this.rootGroup.add(sMesh);
      this.steamParticles.push({ mesh: sMesh, life: 0, vx: 0, vy: 0, vz: 0 });
    }
  }

  private attachWheels(car: THREE.Group, positions: number[][], radius: number): void {
    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.75,
      roughness: 0.25,
    });
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.25,
    });
    const spokeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.55,
      roughness: 0.35,
    });

    // BAKE ROTATION DIRECTLY INTO GEOMETRIES ONCE:
    // Cylinder axis in Three.js is Y. Rotating around X by +PI/2 bakes the cylinder axle along local Z!
    // The circular wheel disc lies flat in the local XY plane.
    const wheelGeo = new THREE.CylinderGeometry(radius, radius, 0.018, 20);
    wheelGeo.rotateX(Math.PI * 0.5);

    const hubGeo = new THREE.CylinderGeometry(radius * 0.36, radius * 0.36, 0.024, 12);
    hubGeo.rotateX(Math.PI * 0.5);

    // Cross spokes visible on the wheel face
    const spoke1Geo = new THREE.BoxGeometry(radius * 1.6, radius * 0.20, 0.020);
    const spoke2Geo = new THREE.BoxGeometry(radius * 0.20, radius * 1.6, 0.020);

    positions.forEach(([wx, wy, wz]) => {
      // Mesh has rotation (0, 0, 0) by default; rolling decrements rotation.z cleanly around axle!
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(wx, wy, wz);
      wheel.castShadow = true;

      const hub = new THREE.Mesh(hubGeo, hubMat);
      wheel.add(hub);

      const spoke1 = new THREE.Mesh(spoke1Geo, spokeMat);
      wheel.add(spoke1);

      const spoke2 = new THREE.Mesh(spoke2Geo, spokeMat);
      wheel.add(spoke2);

      car.add(wheel);
      this.rotatingWheels.push(wheel);
    });
  }

  /* =========================================================================
     11b. EXPANDED SCENERY: ALPINE MOUNTAIN RIDGE BACKDROP
     ========================================================================= */
  private buildAlpineMountainRidge(): void {
    const alpineGroup = new THREE.Group();
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.88,
      flatShading: true,
    });
    const snowMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.35,
      emissive: 0xffffff,
      emissiveIntensity: 0.08,
      flatShading: true,
    });
    const spruceMat = new THREE.MeshStandardMaterial({
      color: 0x14532d,
      roughness: 0.65,
    });
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x451a03,
      roughness: 0.8,
    });

    const subRockMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.90,
      flatShading: true,
    });
    const boulderMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.82,
      flatShading: true,
    });

    // 1. Single Majestic Low-Poly Mountain Peak (Organic backdrop, clearance >= 0.55 from rails)
    // Mountain base is centered on the northern alpine bedrock lobe at (-1.35, -2.95)
    const mtnX = -1.35;
    const mtnZ = -2.95;
    const mtnR = 1.60;
    const mtnH = 2.75;
    const snowH = 0.96;
    const segments = 8; // Pure faceted low-poly look

    snowMat.polygonOffset = true;
    snowMat.polygonOffsetFactor = -1;
    snowMat.polygonOffsetUnits = -1;

    const rockCone = new THREE.Mesh(new THREE.ConeGeometry(mtnR, mtnH, segments, 1), rockMat);
    rockCone.position.set(mtnX, mtnH * 0.5 - 0.22, mtnZ);
    rockCone.rotation.y = 0.40;
    rockCone.receiveShadow = true;
    rockCone.castShadow = true;
    alpineGroup.add(rockCone);

    const snowCone = new THREE.Mesh(new THREE.ConeGeometry(mtnR * (snowH / mtnH) * 1.05, snowH, segments, 1), snowMat);
    snowCone.position.set(mtnX, mtnH - snowH * 0.5 - 0.21, mtnZ);
    snowCone.rotation.y = rockCone.rotation.y;
    snowCone.receiveShadow = true;
    alpineGroup.add(snowCone);

    // 2. Low-Poly Granite Boulders at Mountain Foothills
    const boulders = [
      { x: -2.8, z: -2.3, s: 0.18 },
      { x: -2.3, z: -2.0, s: 0.22 },
      { x: -1.1, z: -2.1, s: 0.16 },
      { x: 0.4, z: -2.4, s: 0.20 },
      { x: -0.1, z: -2.5, s: 0.15 },
    ];
    boulders.forEach((b) => {
      const boulder = new THREE.Mesh(new THREE.DodecahedronGeometry(b.s, 0), boulderMat);
      boulder.position.set(b.x, 0.08, b.z);
      boulder.rotation.set(0.4, 0.7, 0.2);
      boulder.castShadow = true;
      boulder.receiveShadow = true;
      alpineGroup.add(boulder);
    });

    const firOffsets = [
      [-2.9, -2.4], [-2.5, -2.2], [-2.1, -2.1], [-1.4, -2.3],
      [-0.8, -2.2], [-0.2, -2.4], [0.3, -2.6], [-3.1, -3.0],
      [-2.6, -3.4], [-1.0, -3.3], [0.6, -3.2]
    ];
    firOffsets.forEach(([fx, fz], idx) => {
      const fir = new THREE.Group();
      fir.position.set(fx, 0, fz);
      const sc = 0.75 + (idx % 3) * 0.18;
      fir.scale.setScalar(sc);

      const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.14, 5), trunkMat);
      tr.position.y = 0.07;
      fir.add(tr);

      const cone1 = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.24, 6), spruceMat);
      cone1.position.y = 0.22;
      cone1.castShadow = true;
      fir.add(cone1);

      const cone2 = new THREE.Mesh(new THREE.ConeGeometry(0.10, 0.18, 6), spruceMat);
      cone2.position.y = 0.33;
      fir.add(cone2);

      alpineGroup.add(fir);
    });

    this.alpineRidgeGroup = alpineGroup;
    this.sceneryGroup.add(this.alpineRidgeGroup);
  }

  /* =========================================================================
     11c. EXPANDED SCENERY: COZY CAMPSITE & INTERACTIVE EMBER CAMPFIRE
     ========================================================================= */
  private buildCampsiteAndCampfire(): void {
    const camp = new THREE.Group();
    // Safely positioned in the northwest pine clearing (track clearance > 0.80)
    camp.position.set(-1.30, 0.04, -2.10);

    const tent1 = new THREE.Group();
    tent1.position.set(-0.16, 0, 0.08);
    tent1.rotation.y = 0.42;

    const tentMat1 = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.6,
      side: THREE.DoubleSide,
    });
    const roof1Geo = new THREE.CylinderGeometry(0.11, 0.11, 0.24, 3, 1, false);
    const roof1 = new THREE.Mesh(roof1Geo, tentMat1);
    roof1.rotation.z = Math.PI * 0.5;
    roof1.rotation.y = Math.PI * 0.5;
    roof1.position.y = 0.08;
    roof1.castShadow = true;
    tent1.add(roof1);

    const doorMat = new THREE.MeshBasicMaterial({ color: 0x451a03 });
    const door = new THREE.Mesh(new THREE.CircleGeometry(0.05, 3), doorMat);
    door.position.set(0, 0.055, 0.121);
    tent1.add(door);
    camp.add(tent1);

    const tent2 = new THREE.Group();
    tent2.position.set(0.15, 0, 0.10);
    tent2.rotation.y = -0.65;

    const tentMat2 = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.6,
      side: THREE.DoubleSide,
    });
    const roof2 = new THREE.Mesh(roof1Geo, tentMat2);
    roof2.rotation.z = Math.PI * 0.5;
    roof2.rotation.y = Math.PI * 0.5;
    roof2.position.y = 0.08;
    roof2.castShadow = true;
    tent2.add(roof2);
    camp.add(tent2);

    const firePit = new THREE.Group();
    firePit.position.set(0, 0, -0.10);

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.8 });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.035, 1), stoneMat);
      s.position.set(Math.cos(a) * 0.14, 0.02, Math.sin(a) * 0.14);
      firePit.add(s);
    }

    const logMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85 });
    for (let i = 0; i < 3; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.022, 0.20, 6), logMat);
      log.rotation.z = Math.PI * 0.5;
      log.rotation.y = (i * Math.PI) / 3;
      log.position.y = 0.025;
      firePit.add(log);
    }

    const flameMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.18, 7), flameMat);
    flame.position.y = 0.10;
    firePit.add(flame);
    this.campfireFlame = flame;

    const innerFlameMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const innerFlame = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.11, 7), innerFlameMat);
    innerFlame.position.y = 0.08;
    firePit.add(innerFlame);

    this.campfireLight = new THREE.PointLight(0xf97316, 1.4, 1.8);
    this.campfireLight.position.set(0, 0.18, 0);
    firePit.add(this.campfireLight);

    const sparkCount = 20;
    const sparkGeo = new THREE.BufferGeometry();
    this.campfireParticlePos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      this.campfireParticlePos[i * 3] = (Math.random() - 0.5) * 0.12;
      this.campfireParticlePos[i * 3 + 1] = 0.06 + Math.random() * 0.22;
      this.campfireParticlePos[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(this.campfireParticlePos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.03,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.85,
    });
    this.campfireParticles = new THREE.Points(sparkGeo, sparkMat);
    firePit.add(this.campfireParticles);

    camp.add(firePit);
    this.campsiteGroup = camp;
    this.sceneryGroup.add(this.campsiteGroup);
  }

  /* =========================================================================
     11d. EXPANDED SCENERY: RAILWAY CEDAR WATER TOWER & DROP SPOUT
     ========================================================================= */
  private buildRailwayWaterTower(): void {
    const tower = new THREE.Group();
    // Positioned safely on the northeast railway depot lobe (track distance > 0.90)
    tower.position.set(1.65, 0.04, -2.35);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.75 });
    const staveMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.65 });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.7 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6 });

    const legH = 0.48;
    const legW = 0.04;
    const legSpread = 0.22;
    [
      [-legSpread, -legSpread],
      [legSpread, -legSpread],
      [-legSpread, legSpread],
      [legSpread, legSpread],
    ].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(legW, legH, legW), woodMat);
      leg.position.set(lx, legH * 0.5, lz);
      leg.castShadow = true;
      tower.add(leg);
    });

    const deck = new THREE.Mesh(new THREE.BoxGeometry(legSpread * 2 + 0.12, 0.04, legSpread * 2 + 0.12), woodMat);
    deck.position.y = legH;
    deck.castShadow = true;
    tower.add(deck);

    const tankH = 0.42;
    const tankR = 0.28;
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(tankR, tankR, tankH, 16), staveMat);
    tank.position.y = legH + tankH * 0.5 + 0.02;
    tank.castShadow = true;
    tower.add(tank);

    [-0.14, 0.0, 0.14].forEach((hoopY) => {
      const hoop = new THREE.Mesh(new THREE.TorusGeometry(tankR + 0.006, 0.009, 6, 20), ironMat);
      hoop.rotation.x = Math.PI * 0.5;
      hoop.position.y = tank.position.y + hoopY;
      tower.add(hoop);
    });

    const roof = new THREE.Mesh(new THREE.ConeGeometry(tankR + 0.06, 0.22, 16), roofMat);
    roof.position.y = tank.position.y + tankH * 0.5 + 0.11;
    roof.castShadow = true;
    tower.add(roof);

    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), ironMat);
    finial.position.y = roof.position.y + 0.13;
    tower.add(finial);

    const spoutGroup = new THREE.Group();
    spoutGroup.position.set(-0.28, legH + 0.24, 0);
    spoutGroup.rotation.y = -Math.PI * 0.5; // Points sideways into service depot grounds, 100% away from tracks!
    spoutGroup.rotation.x = 0.25;

    const tubeMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.4 });
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.055, 0.32, 12), tubeMat);
    tube.rotation.x = Math.PI * 0.5;
    tube.position.z = 0.16;
    spoutGroup.add(tube);

    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), ironMat);
    ball.position.set(0, 0.12, 0.05);
    spoutGroup.add(ball);

    tower.add(spoutGroup);
    this.waterTowerSpout = spoutGroup;

    const sprayCount = 35;
    const sprayGeo = new THREE.BufferGeometry();
    const sprayPos = new Float32Array(sprayCount * 3);
    for (let i = 0; i < sprayCount; i++) {
      sprayPos[i * 3] = (Math.random() - 0.5) * 0.06;
      sprayPos[i * 3 + 1] = -Math.random() * 0.35;
      sprayPos[i * 3 + 2] = 0.30 + (Math.random() - 0.5) * 0.06;
    }
    sprayGeo.setAttribute('position', new THREE.BufferAttribute(sprayPos, 3));
    const sprayMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
    });
    this.waterSprayPoints = new THREE.Points(sprayGeo, sprayMat);
    this.waterSprayPoints.position.copy(spoutGroup.position);
    this.waterSprayPoints.visible = false;
    tower.add(this.waterSprayPoints);

    this.waterTowerGroup = tower;
    this.sceneryGroup.add(this.waterTowerGroup);
  }

  /* =========================================================================
     11d-2. EXPANDED SCENERY: RAILWAY MAINTENANCE DEPOT, BUNKER & TOOLS
     ========================================================================= */
  private buildRailwayServiceDepot(): void {
    const depotGroup = new THREE.Group();
    // Safely positioned on the North-East Railway Plateau (clearance > 0.85)
    depotGroup.position.set(1.70, 0.04, -2.10);

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.7 });
    const corrugatedMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.35 });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.25 });
    const coalMat = new THREE.MeshStandardMaterial({ color: 0x090a0f, roughness: 0.95 });
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.7, roughness: 0.3 });

    // 1. Locomotive Service Shed / Workshop
    const shed = new THREE.Group();
    const shedBase = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.03, 0.28), stoneMat);
    shedBase.position.y = 0.015;
    shed.add(shedBase);

    // Open-front timber posts
    [-0.16, 0.16].forEach((px) => {
      [-0.12, 0.12].forEach((pz) => {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.18, 0.02), woodMat);
        post.position.set(px, 0.10, pz);
        post.castShadow = true;
        shed.add(post);
      });
    });

    // Corrugated metal pitched roof
    const roofL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.016, 0.16), corrugatedMat);
    roofL.position.set(0, 0.23, -0.06);
    roofL.rotation.x = 0.45;
    roofL.castShadow = true;
    shed.add(roofL);

    const roofR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.016, 0.16), corrugatedMat);
    roofR.position.set(0, 0.23, 0.06);
    roofR.rotation.x = -0.45;
    roofR.castShadow = true;
    shed.add(roofR);

    // Back wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.015), woodMat);
    backWall.position.set(0, 0.10, -0.12);
    shed.add(backWall);

    // Workbench with vise & tools inside
    const bench = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.07, 0.06), woodMat);
    bench.position.set(0, 0.045, -0.08);
    bench.castShadow = true;
    shed.add(bench);

    const toolbox = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.025, 0.03), ironMat);
    toolbox.position.set(0.04, 0.09, -0.08);
    shed.add(toolbox);

    depotGroup.add(shed);

    // 2. Open Coal Bunker Bin loaded with lump coal
    const bunker = new THREE.Group();
    bunker.position.set(-0.28, 0, 0.05);

    const binWalls = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.09, 0.16), woodMat);
    binWalls.position.y = 0.045;
    binWalls.castShadow = true;
    bunker.add(binWalls);

    const coalLump = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07, 1), coalMat);
    coalLump.position.set(0, 0.08, 0);
    coalLump.scale.set(1.1, 0.6, 0.9);
    coalLump.castShadow = true;
    bunker.add(coalLump);

    depotGroup.add(bunker);

    // 3. Stored Oil Drums & Grease Barrels
    [[-0.24, 0, -0.10], [-0.29, 0, -0.08]].forEach(([bx, by, bz]) => {
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.08, 10), barrelMat);
      drum.position.set(bx, 0.04, bz);
      drum.castShadow = true;
      depotGroup.add(drum);
    });

    this.depotShedGroup = depotGroup;
    this.sceneryGroup.add(this.depotShedGroup);
  }

  /* =========================================================================
     11e. EXPANDED SCENERY: FLOATING SKY HOT AIR BALLOON
     ========================================================================= */
  private buildHotAirBalloon(): void {
    const balloon = new THREE.Group();
    balloon.position.set(1.60, 2.70, 0.60);

    const envMatRed = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.45 });
    const envMatGold = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.45 });
    const envMatTeal = new THREE.MeshStandardMaterial({ color: 0x0d9488, roughness: 0.45 });

    const upperGeo = new THREE.SphereGeometry(0.42, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.65);
    const upperDome = new THREE.Mesh(upperGeo, envMatRed);
    balloon.add(upperDome);

    const bandGeo = new THREE.TorusGeometry(0.40, 0.03, 8, 24);
    const band = new THREE.Mesh(bandGeo, envMatGold);
    band.rotation.x = Math.PI * 0.5;
    band.position.y = -0.05;
    balloon.add(band);

    const lowerGeo = new THREE.CylinderGeometry(0.39, 0.16, 0.34, 24, 1, true);
    const lowerSkirt = new THREE.Mesh(lowerGeo, envMatTeal);
    lowerSkirt.position.y = -0.22;
    balloon.add(lowerSkirt);

    const burnerMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.3 });
    const burner = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 6, 16), burnerMat);
    burner.rotation.x = Math.PI * 0.5;
    burner.position.y = -0.42;
    balloon.add(burner);

    const flameMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.14, 8), flameMat);
    flame.position.y = -0.40;
    balloon.add(flame);
    this.balloonBurnerFlame = flame;

    this.balloonBurnerLight = new THREE.PointLight(0xf97316, 0.5, 2.2);
    this.balloonBurnerLight.position.y = -0.40;
    balloon.add(this.balloonBurnerLight);

    const ropeMat = new THREE.LineBasicMaterial({ color: 0x78350f });
    const ropePoints: THREE.Vector3[] = [
      new THREE.Vector3(-0.15, -0.38, -0.15), new THREE.Vector3(-0.08, -0.62, -0.08),
      new THREE.Vector3(0.15, -0.38, -0.15), new THREE.Vector3(0.08, -0.62, -0.08),
      new THREE.Vector3(-0.15, -0.38, 0.15), new THREE.Vector3(-0.08, -0.62, 0.08),
      new THREE.Vector3(0.15, -0.38, 0.15), new THREE.Vector3(0.08, -0.62, 0.08),
    ];
    const ropeGeo = new THREE.BufferGeometry().setFromPoints(ropePoints);
    const ropes = new THREE.LineSegments(ropeGeo, ropeMat);
    balloon.add(ropes);

    const basketMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.85 });
    const basket = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.18), basketMat);
    basket.position.y = -0.69;
    basket.castShadow = true;
    balloon.add(basket);

    this.hotAirBalloonGroup = balloon;
    this.celestialGroup.add(this.hotAirBalloonGroup);
  }

  /* =========================================================================
     11f. EXPANDED SCENERY: WILDFLOWER BUTTERFLIES, PROMENADE BENCH & STATION TRUNKS
     ========================================================================= */
  private buildMiniatureVillageLife(): void {
    const lifeGroup = new THREE.Group();

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.75 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.85 });

    // 1b. Rustic Wooden Park Bench on Promenade (Safe clearance 0.934)
    const benchGroup = new THREE.Group();
    benchGroup.position.set(0.10, 0.04, 1.38);
    benchGroup.rotation.y = 0.35;
    const benchSeat = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.012, 0.045), woodMat);
    benchSeat.position.y = 0.038;
    benchSeat.castShadow = true;
    benchGroup.add(benchSeat);
    const benchBack = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.045, 0.01), woodMat);
    benchBack.position.set(0, 0.065, -0.02);
    benchBack.castShadow = true;
    benchGroup.add(benchBack);
    [-0.055, 0.055].forEach((bx) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.038, 0.04), stoneMat);
      leg.position.set(bx, 0.019, 0);
      benchGroup.add(leg);
    });
    lifeGroup.add(benchGroup);

    // 1c. Warm Cast-Iron Promenade Streetlamp Lanterns (Safe clearance 0.828 from track)
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.8 });
    const lampGlowMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.85,
      roughness: 0.2,
    });
    const lampPositions = [
      [-0.26, 0.04, 1.38],
      [0.26, 0.04, 1.38],
    ];
    lampPositions.forEach(([lx, ly, lz]) => {
      const lamp = new THREE.Group();
      lamp.position.set(lx, ly, lz);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.014, 0.26, 8), lampMat);
      post.position.y = 0.13;
      post.castShadow = true;
      lamp.add(post);
      const lantern = new THREE.Mesh(new THREE.DodecahedronGeometry(0.024, 0), lampGlowMat);
      lantern.position.y = 0.27;
      lamp.add(lantern);
      lifeGroup.add(lamp);
    });

    // 2. Wildflower Meadow Clusters
    const flowerMatRed = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5 });
    const flowerMatYellow = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });
    const flowerMatBlue = new THREE.MeshStandardMaterial({ color: 0x60a5fa, roughness: 0.5 });
    const flowerMatPurple = new THREE.MeshStandardMaterial({ color: 0xc084fc, roughness: 0.5 });
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });

    const flowerCoords = [
      [-0.75, 0.30], [-0.82, 0.35], [-0.70, 0.25], [-0.62, 0.32],
      [0.68, 0.25], [0.74, 0.32], [0.62, 0.20], [0.80, 0.22],
      [-0.45, -0.45], [-0.50, -0.40], [-0.38, -0.48],
    ];

    const mats = [flowerMatRed, flowerMatYellow, flowerMatBlue, flowerMatPurple];
    flowerCoords.forEach(([fx, fz], idx) => {
      if (this.getApproxDistanceToTrack(fx, fz) < 0.45) return;
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.004, 0.04, 4), stemMat);
      stem.position.set(fx, 0.06, fz);
      lifeGroup.add(stem);

      const petalMat = mats[idx % mats.length];
      const petal = new THREE.Mesh(new THREE.DodecahedronGeometry(0.014, 0), petalMat);
      petal.position.set(fx, 0.082, fz);
      lifeGroup.add(petal);
    });

    // 3. Four Kinetic Fluttering Butterflies
    const butterflyColors = [0xfde047, 0x38bdf8, 0xfb923c, 0xc084fc];
    const butterflySpawns = [
      new THREE.Vector3(-0.72, 0.14, 0.30),
      new THREE.Vector3(0.70, 0.15, 0.26),
      new THREE.Vector3(-0.45, 0.12, -0.42),
      new THREE.Vector3(-1.10, 0.16, 0.25),
    ];

    butterflySpawns.forEach((spawn, i) => {
      const bGroup = new THREE.Group();
      bGroup.position.copy(spawn);

      const wingMat = new THREE.MeshBasicMaterial({
        color: butterflyColors[i % butterflyColors.length],
        side: THREE.DoubleSide,
      });
      const wingGeo = new THREE.PlaneGeometry(0.016, 0.024);

      const wingL = new THREE.Mesh(wingGeo, wingMat);
      wingL.position.x = -0.009;
      wingL.rotation.y = Math.PI * 0.5;
      bGroup.add(wingL);

      const wingR = new THREE.Mesh(wingGeo, wingMat);
      wingR.position.x = 0.009;
      wingR.rotation.y = -Math.PI * 0.5;
      bGroup.add(wingR);

      lifeGroup.add(bGroup);
      this.butterflies.push({
        mesh: bGroup,
        basePos: spawn.clone(),
        phase: i * 1.5,
        speed: 0.8 + i * 0.2,
      });
    });

    // 4. Station Platform Details: Vintage Luggage Trunks & Milk Cans
    const stationLife = new THREE.Group();
    stationLife.position.set(-0.16, 0.09, 1.25); // Safe on the station platform

    const trunk1 = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.038, 0.04), woodMat);
    trunk1.position.set(0, 0.019, 0);
    trunk1.castShadow = true;
    stationLife.add(trunk1);

    const trunk2 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.032, 0.032), new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.7 }));
    trunk2.position.set(0.005, 0.052, 0);
    trunk2.rotation.y = 0.15;
    trunk2.castShadow = true;
    stationLife.add(trunk2);

    const milkCanMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.35, metalness: 0.6 });
    [-0.05, 0.06].forEach((mx) => {
      const can = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.016, 0.045, 8), milkCanMat);
      can.position.set(mx, 0.022, 0.03);
      can.castShadow = true;
      stationLife.add(can);
    });

    lifeGroup.add(stationLife);

    this.sceneryGroup.add(lifeGroup);
  }

  /* =========================================================================
     12. DEDICATED WEATHER & RAIN ENGINE
     ========================================================================= */
  private setupWeatherSystem(): void {
    // 1. Falling Rain Streaks Geometry
    this.rainPositions = new Float32Array(this.rainCount * 6);
    this.rainGeo = new THREE.BufferGeometry();

    const streakLen = 0.18;
    for (let i = 0; i < this.rainCount; i++) {
      const rx = (Math.random() - 0.5) * 5.5;
      const ry = Math.random() * 3.5;
      const rz = (Math.random() - 0.5) * 4.5;

      // Start of streak
      this.rainPositions[i * 6] = rx;
      this.rainPositions[i * 6 + 1] = ry;
      this.rainPositions[i * 6 + 2] = rz;

      // End of streak (slanted with slight wind)
      this.rainPositions[i * 6 + 3] = rx - 0.02;
      this.rainPositions[i * 6 + 4] = ry - streakLen;
      this.rainPositions[i * 6 + 5] = rz - 0.01;
    }

    this.rainGeo.setAttribute('position', new THREE.BufferAttribute(this.rainPositions, 3));

    const rainMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0, // Hidden until rain starts
    });
    this.rainStreaks = new THREE.LineSegments(this.rainGeo, rainMat);
    this.weatherGroup.add(this.rainStreaks);

    // 2. Dynamic Expanding Splash Ripples Pool
    const splashMat = new THREE.MeshBasicMaterial({
      color: 0xbae6fd,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const splashRingGeo = new THREE.RingGeometry(0.01, 0.02, 12);
    splashRingGeo.rotateX(-Math.PI * 0.5);

    for (let r = 0; r < 20; r++) {
      const sp = new THREE.Mesh(splashRingGeo, splashMat.clone());
      sp.position.set(0, -10, 0);
      this.weatherGroup.add(sp);
      this.splashRipples.push({ mesh: sp, life: 0, maxRadius: 0.12 });
    }
  }

  public setWeather(mode: 'fair' | 'rain'): void {
    this.isRaining = mode === 'rain';

    if (this.rainStreaks) {
      const targetOpacity = this.isRaining ? 0.65 : 0;
      gsap.to(this.rainStreaks.material as THREE.LineBasicMaterial, {
        opacity: targetOpacity,
        duration: 0.8,
      });
    }

    // Toggle soothing procedural rain sound
    this.audio.setRain(this.isRaining);
  }

  private triggerSplash(x: number, y: number, z: number): void {
    const sp = this.splashRipples.find((r) => r.life <= 0);
    if (!sp) return;

    sp.mesh.position.set(x, y + 0.005, z);
    sp.mesh.scale.setScalar(0.2);
    (sp.mesh.material as THREE.MeshBasicMaterial).opacity = 0.6;
    sp.life = 1.0;
  }

  /* =========================================================================
     13. RAYCASTER MICRO-INTERACTIONS
     ========================================================================= */
  private bindEvents(): void {
    // Window Resize Handler
    window.addEventListener('resize', () => {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      if (width === 0 || height === 0) return;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });

    // Pointer Raycast Click Handler
    this.container.addEventListener('pointerdown', (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mousePos.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mousePos, this.camera);

      // Check Train Cars
      const trainHits = this.raycaster.intersectObjects([
        this.locoCar,
        this.tenderCar,
        this.coachCar,
        this.cabooseCar,
      ], true);

      if (trainHits.length > 0) {
        this.triggerWhistleHop();
        return;
      }

      // Check Clock Tower
      if (this.clockTowerGroup) {
        const towerHits = this.raycaster.intersectObject(this.clockTowerGroup, true);
        if (towerHits.length > 0) {
          this.triggerClockBell();
          return;
        }
      }

      // Check Trees
      const treeHits = this.raycaster.intersectObjects(this.interactiveTrees, true);
      if (treeHits.length > 0) {
        let parentTree: THREE.Object3D | null = treeHits[0].object;
        while (parentTree && !this.interactiveTrees.includes(parentTree as THREE.Group)) {
          parentTree = parentTree.parent;
        }
        if (parentTree) {
          this.triggerTreeWobble(parentTree as THREE.Group);
          return;
        }
      }

      // Check Moored Boat
      if (this.mooredBoat) {
        const boatHits = this.raycaster.intersectObject(this.mooredBoat, true);
        if (boatHits.length > 0) {
          this.triggerBoatRock();
          return;
        }
      }

      // Check Sheep Meeples
      const sheepHits = this.raycaster.intersectObjects(this.interactiveSheep, true);
      if (sheepHits.length > 0) {
        let parentSheep: THREE.Object3D | null = sheepHits[0].object;
        while (parentSheep && !this.interactiveSheep.includes(parentSheep as THREE.Group)) {
          parentSheep = parentSheep.parent;
        }
        if (parentSheep) {
          this.triggerSheepHop(parentSheep as THREE.Group);
          return;
        }
      }

      // Check Viaduct Lanterns
      const lanternHits = this.raycaster.intersectObjects(this.viaductLanterns, true);
      if (lanternHits.length > 0) {
        this.triggerLanternSpark();
        return;
      }

      // Check Telegraph Poles
      const poleHits = this.raycaster.intersectObjects(this.interactivePoles, true);
      if (poleHits.length > 0) {
        let parentPole: THREE.Object3D | null = poleHits[0].object;
        while (parentPole && !this.interactivePoles.includes(parentPole as THREE.Group)) {
          parentPole = parentPole.parent;
        }
        if (parentPole) {
          this.triggerTelegraphPing(parentPole as THREE.Group);
          return;
        }
      }

      // Check Dutch Windmill
      if (this.windmillGroup) {
        const millHits = this.raycaster.intersectObject(this.windmillGroup, true);
        if (millHits.length > 0) {
          this.triggerWindmillSpin();
          return;
        }
      }

      // Check Canal Watermill
      if (this.watermillGroup) {
        const watermillHits = this.raycaster.intersectObject(this.watermillGroup, true);
        if (watermillHits.length > 0) {
          this.triggerWaterwheelSpin();
          return;
        }
      }

      // Check Trackside Semaphore Signal
      if (this.semaphoreGroup) {
        const semaHits = this.raycaster.intersectObject(this.semaphoreGroup, true);
        if (semaHits.length > 0) {
          this.triggerSemaphoreToggle();
          return;
        }
      }

      // Check Village Cottage
      if (this.cottageGroup) {
        const cottageHits = this.raycaster.intersectObject(this.cottageGroup, true);
        if (cottageHits.length > 0) {
          this.triggerCottageChimney();
          return;
        }
      }

      // Check Cozy Campsite & Campfire
      if (this.campsiteGroup) {
        const campHits = this.raycaster.intersectObject(this.campsiteGroup, true);
        if (campHits.length > 0) {
          this.triggerCampfirePop();
          return;
        }
      }

      // Check Railway Water Tower
      if (this.waterTowerGroup) {
        const towerHits = this.raycaster.intersectObject(this.waterTowerGroup, true);
        if (towerHits.length > 0) {
          this.triggerWaterTowerSpray();
          return;
        }
      }

      // Check Floating Hot Air Balloon
      if (this.hotAirBalloonGroup) {
        const balloonHits = this.raycaster.intersectObject(this.hotAirBalloonGroup, true);
        if (balloonHits.length > 0) {
          this.triggerBalloonBurner();
          return;
        }
      }

      // Check Town Fountain
      if (this.townFountainGroup) {
        const fountainHits = this.raycaster.intersectObject(this.townFountainGroup, true);
        if (fountainHits.length > 0) {
          this.triggerFountainSurge();
          return;
        }
      }

      // Check West Farm Barn & Silo
      if (this.farmBarnGroup) {
        const barnHits = this.raycaster.intersectObject(this.farmBarnGroup, true);
        if (barnHits.length > 0) {
          this.triggerBarnBoop();
          return;
        }
      }

      // Check Orchard Beehives
      if (this.beehiveGroup) {
        const hiveHits = this.raycaster.intersectObject(this.beehiveGroup, true);
        if (hiveHits.length > 0) {
          this.triggerBeehiveBoop();
          return;
        }
      }

      // Check Water
      if (this.waterMesh) {
        const waterHits = this.raycaster.intersectObject(this.waterMesh, true);
        if (waterHits.length > 0) {
          const pt = waterHits[0].point;
          this.triggerSplash(pt.x, pt.y, pt.z);
          this.audio.playWaterDrop();
        }
      }
    });

    // OrbitControls listener to gracefully switch to Isometric view on manual drag
    this.controls.addEventListener('start', () => {
      if (this.currentViewMode !== 'isometric' && this.currentViewMode !== 'top') {
        this.currentViewMode = 'isometric';
        this.updateActiveViewPill('isometric');
      }
    });

    // Dynamic Hover Pointer & Water Wake Ripples
    this.container.addEventListener('pointermove', (e: MouseEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mousePos.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.raycaster.setFromCamera(this.mousePos, this.camera);

      const interactiveTargets = [
        this.locoCar,
        this.tenderCar,
        this.coachCar,
        this.cabooseCar,
        ...(this.clockTowerGroup ? [this.clockTowerGroup] : []),
        ...this.interactiveTrees,
        ...(this.mooredBoat ? [this.mooredBoat] : []),
        ...this.interactiveSheep,
        ...this.viaductLanterns,
        ...(this.windmillGroup ? [this.windmillGroup] : []),
        ...(this.watermillGroup ? [this.watermillGroup] : []),
        ...(this.cottageGroup ? [this.cottageGroup] : []),
        ...(this.semaphoreGroup ? [this.semaphoreGroup] : []),
        ...(this.campsiteGroup ? [this.campsiteGroup] : []),
        ...(this.waterTowerGroup ? [this.waterTowerGroup] : []),
        ...(this.hotAirBalloonGroup ? [this.hotAirBalloonGroup] : []),
        ...(this.townFountainGroup ? [this.townFountainGroup] : []),
        ...(this.farmBarnGroup ? [this.farmBarnGroup] : []),
        ...(this.beehiveGroup ? [this.beehiveGroup] : []),
      ];

      const hits = this.raycaster.intersectObjects(interactiveTargets, true);
      if (hits.length > 0) {
        this.container.style.cursor = 'pointer';
      } else {
        if (this.waterMesh) {
          const waterHits = this.raycaster.intersectObject(this.waterMesh, true);
          if (waterHits.length > 0) {
            this.container.style.cursor = 'cell';
            const now = performance.now();
            if (now - this.lastHoverRippleTime > 160) {
              this.lastHoverRippleTime = now;
              const pt = waterHits[0].point;
              this.triggerSplash(pt.x, 0.034, pt.z);
            }
            return;
          }
        }
        this.container.style.cursor = 'grab';
      }
    });

    // Keyboard Shortcuts (Space: Toot, R: Rain, T: Theme, 1-5: Views)
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        this.triggerWhistleHop();
      } else if (e.code === 'KeyR') {
        const nextRain = !this.isRaining;
        this.setWeather(nextRain ? 'rain' : 'fair');
        document.querySelectorAll('[data-weather]').forEach((btn) => {
          btn.classList.toggle('active', btn.getAttribute('data-weather') === (nextRain ? 'rain' : 'fair'));
        });
      } else if (e.code === 'KeyT') {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const nextDark = !isDark;
        if (nextDark) {
          document.documentElement.setAttribute('data-theme', 'dark');
          this.audio.playChime(523.25, 0.08);
          this.setNightMode(true);
        } else {
          document.documentElement.removeAttribute('data-theme');
          this.audio.playMorningBirdSong();
          this.setNightMode(false);
        }
      } else if (e.code === 'Digit1') {
        this.setViewMode('isometric');
        this.updateActiveViewPill('isometric');
      } else if (e.code === 'Digit2') {
        this.setViewMode('top');
        this.updateActiveViewPill('top');
      } else if (e.code === 'Digit3') {
        this.setViewMode('engine');
        this.updateActiveViewPill('engine');
      } else if (e.code === 'Digit4') {
        this.setViewMode('director');
        this.updateActiveViewPill('director');
      } else if (e.code === 'Digit5') {
        this.setViewMode('trackside');
        this.updateActiveViewPill('trackside');
      } else if (e.code === 'ArrowUp') {
        this.setSpeed(Math.min(3.6, this.speedMultiplier + 0.5));
      } else if (e.code === 'ArrowDown') {
        this.setSpeed(Math.max(0.5, this.speedMultiplier - 0.5));
      }
    });
  }

  private updateActiveViewPill(viewName: string): void {
    document.querySelectorAll('[data-view]').forEach((btn) => {
      const v = btn.getAttribute('data-view');
      const isMatch = v === viewName || (viewName === 'engine' && v === 'cinematic') || (viewName === 'cinematic' && v === 'engine');
      btn.classList.toggle('active', isMatch);
    });
  }

  public triggerBoatRock(): void {
    if (!this.mooredBoat) return;
    this.audio.playBoatSlosh();
    gsap.killTweensOf(this.mooredBoat.rotation);
    gsap.to(this.mooredBoat.rotation, {
      z: 0.18,
      duration: 0.22,
      yoyo: true,
      repeat: 3,
      ease: 'sine.inOut',
      onComplete: () => {
        if (this.mooredBoat) gsap.to(this.mooredBoat.rotation, { z: 0, duration: 0.3 });
      },
    });
    const bPos = this.mooredBoat.position;
    this.triggerSplash(bPos.x, 0.034, bPos.z);
  }

  public triggerSheepHop(sheep: THREE.Group): void {
    this.audio.playSheepBleat();
    const origY = sheep.position.y;
    gsap.to(sheep.position, {
      y: origY + 0.18,
      duration: 0.22,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
      onComplete: () => {
        sheep.position.y = origY;
      },
    });
    gsap.to(sheep.rotation, {
      y: '+=' + Math.PI * 2,
      duration: 0.44,
      ease: 'back.out(1.5)',
    });
    gsap.to(sheep.scale, {
      x: 1.25,
      y: 0.82,
      z: 1.25,
      duration: 0.12,
      yoyo: true,
      repeat: 1,
    });
  }

  public triggerBeehiveBoop(): void {
    if (!this.beehiveGroup) return;
    this.audio.playChime(783.99, 0.08); // G5 cheerful buzz chime
    gsap.killTweensOf(this.beehiveGroup.scale);
    gsap.to(this.beehiveGroup.scale, {
      x: 1.25,
      y: 0.85,
      z: 1.25,
      duration: 0.12,
      yoyo: true,
      repeat: 3,
      ease: 'power1.inOut',
      onComplete: () => {
        if (this.beehiveGroup) this.beehiveGroup.scale.set(1, 1, 1);
      },
    });
  }

  public triggerCampfirePop(): void {
    this.audio.playCampfirePop();
    if (this.campfireLight) {
      const orig = this.campfireLight.intensity;
      gsap.to(this.campfireLight, {
        intensity: 3.6,
        duration: 0.12,
        yoyo: true,
        repeat: 3,
        ease: 'power1.inOut',
        onComplete: () => {
          if (this.campfireLight) this.campfireLight.intensity = orig;
        },
      });
    }
    if (this.campfireFlame) {
      gsap.to(this.campfireFlame.scale, {
        x: 1.5,
        y: 1.8,
        z: 1.5,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    }
  }

  public triggerWaterTowerSpray(): void {
    if (this.isWaterTowerSpraying || !this.waterTowerSpout) return;
    this.isWaterTowerSpraying = true;
    this.audio.playWaterTowerSpray();

    gsap.to(this.waterTowerSpout.rotation, {
      x: 0.82,
      duration: 0.35,
      ease: 'back.out(1.4)',
      onComplete: () => {
        if (this.waterSprayPoints) this.waterSprayPoints.visible = true;
        setTimeout(() => {
          if (this.waterSprayPoints) this.waterSprayPoints.visible = false;
          if (this.waterTowerSpout) {
            gsap.to(this.waterTowerSpout.rotation, {
              x: 0.25,
              duration: 0.45,
              ease: 'bounce.out',
              onComplete: () => {
                this.isWaterTowerSpraying = false;
              },
            });
          }
        }, 500);
      },
    });
  }

  public triggerBalloonBurner(): void {
    this.audio.playBalloonBurner();
    if (this.balloonBurnerLight) {
      gsap.to(this.balloonBurnerLight, {
        intensity: 3.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    }
    if (this.balloonBurnerFlame) {
      gsap.to(this.balloonBurnerFlame.scale, {
        x: 2.2,
        y: 2.5,
        z: 2.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    }
    if (this.hotAirBalloonGroup) {
      gsap.to(this.hotAirBalloonGroup.position, {
        y: '+=0.28',
        duration: 0.45,
        yoyo: true,
        repeat: 1,
        ease: 'power1.out',
      });
    }
  }

  public triggerFountainSurge(): void {
    if (!this.townFountainJet) return;
    this.audio.playChime(659.25, 0.08); // E5 playful chime
    this.audio.playWaterDrop();
    gsap.killTweensOf(this.townFountainJet.scale);
    gsap.to(this.townFountainJet.scale, {
      x: 1.8,
      y: 2.2,
      z: 1.8,
      duration: 0.35,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
    });
  }

  public triggerBarnBoop(): void {
    if (!this.farmBarnGroup) return;
    this.audio.playChime(523.25, 0.08); // C5 cheerful bell
    gsap.killTweensOf(this.farmBarnGroup.scale);
    gsap.to(this.farmBarnGroup.scale, {
      x: 1.08,
      y: 1.12,
      z: 1.08,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: 'back.out(2)',
    });
  }

  public triggerLanternSpark(): void {
    this.audio.playLanternSpark();
    this.viaductLanternLights.forEach((l) => {
      const orig = l.intensity;
      gsap.to(l, {
        intensity: 3.5,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          l.intensity = orig;
        },
      });
    });
  }

  public triggerWhistleHop(): void {
    this.audio.playWhistle();

    const cars = [this.locoCar, this.tenderCar, this.coachCar, this.cabooseCar];
    cars.forEach((car, idx) => {
      gsap.to(car.position, {
        y: '+=0.16',
        duration: 0.16,
        delay: idx * 0.04,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
      gsap.to(car.scale, {
        y: 1.18,
        x: 0.92,
        z: 0.92,
        duration: 0.16,
        delay: idx * 0.04,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    });

    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.spawnSteamPuff(1.4), i * 50);
    }
  }

  public triggerClockBell(): void {
    this.audio.playBoardingBell();
    setTimeout(() => this.audio.playStationClock(), 200);

    if (this.clockTowerGroup) {
      gsap.to(this.clockTowerGroup.scale, {
        y: 1.15,
        x: 0.92,
        z: 0.92,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    }

    if (this.clockHand) {
      gsap.to(this.clockHand.rotation, {
        z: '-=' + Math.PI * 4,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }

  public triggerTelegraphPing(pole: THREE.Group): void {
    this.audio.playTelegraphPing();
    gsap.to(pole.rotation, {
      z: 0.12,
      duration: 0.1,
      yoyo: true,
      repeat: 3,
      ease: 'sine.inOut',
      onComplete: () => {
        gsap.to(pole.rotation, { z: 0, duration: 0.15 });
      },
    });
  }

  public triggerTreeWobble(tree: THREE.Group): void {
    this.audio.playRustle();

    gsap.to(tree.rotation, {
      z: 0.16,
      duration: 0.12,
      yoyo: true,
      repeat: 3,
      ease: 'sine.inOut',
      onComplete: () => {
        gsap.to(tree.rotation, { z: 0, duration: 0.2 });
      },
    });
  }

  private spawnSteamPuff(scaleMultiplier: number = 1.0): void {
    const p = this.steamParticles.find((sp) => sp.life <= 0);
    if (!p) return;

    const stackWorldPos = new THREE.Vector3(0.13, 0.26, 0);
    this.locoCar.localToWorld(stackWorldPos);
    this.rootGroup.worldToLocal(stackWorldPos);

    p.mesh.position.copy(stackWorldPos);
    p.mesh.scale.setScalar(0.7 * scaleMultiplier);
    p.mesh.visible = true;
    p.life = 1.0;

    // Impart backward momentum from train speed into slipstream
    const tangent = this.trackCurve.getTangentAt(this.progress).normalize();
    p.vx = -tangent.x * 0.012 * this.speedMultiplier + (Math.random() - 0.5) * 0.004;
    p.vy = 0.014 + Math.random() * 0.007;
    p.vz = -tangent.z * 0.012 * this.speedMultiplier + (Math.random() - 0.5) * 0.004;
  }

  public isTrainInTunnel(): boolean {
    const u = (this.progress + 1.0) % 1.0;
    return u < 0.045 || u > 0.955;
  }

  /* =========================================================================
     14. PUBLIC CONTROL APIS (VIEW MODES, SPEED, COZY NIGHT LIGHTING)
     ========================================================================= */
  public setSpeed(multiplier: number): void {
    this.speedMultiplier = multiplier;
    this.audio.playSpeedWhoosh(multiplier);
    if (multiplier >= 3.0) {
      this.triggerWhistleHop();
    }
    if (this.currentViewMode === 'engine' || this.currentViewMode === 'cinematic') {
      const targetFov = multiplier >= 3.0 ? 64 : multiplier >= 2.0 ? 54 : 48;
      gsap.to(this.camera, {
        fov: targetFov,
        duration: 0.45,
        ease: 'power2.out',
        onUpdate: () => this.camera.updateProjectionMatrix(),
      });
    }
  }

  public setViewMode(mode: 'isometric' | 'top' | 'cinematic' | 'engine' | 'director' | 'trackside'): void {
    this.currentViewMode = mode;
    this.controls.enabled = mode === 'isometric' || mode === 'top';
    this.controls.autoRotate = false;

    // Dynamic FOV for immersive velocity in Engine Ride mode
    if (mode === 'engine' || mode === 'cinematic') {
      this.camera.near = 0.02;
      this.camera.updateProjectionMatrix();

      const targetFov = this.speedMultiplier >= 3.0 ? 64 : this.speedMultiplier >= 2.0 ? 54 : 48;
      gsap.to(this.camera, {
        fov: targetFov,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => this.camera.updateProjectionMatrix(),
      });

      // Over-the-cab chase vantage point showing full locomotive in frame with rails stretching ahead!
      const localCamPos = new THREE.Vector3(-0.88, 0.46, 0.22);
      const initialCamPos = this.locoCar.localToWorld(localCamPos.clone());
      const localLookTarget = new THREE.Vector3(0.68, 0.16, 0.0);
      const initialLookTarget = this.locoCar.localToWorld(localLookTarget.clone());
      gsap.killTweensOf(this.camera.position);
      gsap.killTweensOf(this.controls.target);
      this.camera.position.copy(initialCamPos);
      this.camera.lookAt(initialLookTarget);
      this.controls.target.copy(initialLookTarget);

      // In chase view, headlamp beams project forward ahead of camera, so enable at night!
      if (this.isNightMode) {
        if (this.headlampBeam) this.headlampBeam.visible = true;
        if (this.headlampCoreBeam) this.headlampCoreBeam.visible = true;
      }
      if (this.headlampTrackPool) this.headlampTrackPool.visible = true;
      if (this.headlampSpotLight) this.headlampSpotLight.intensity = 2.4;
      this.audio.playWhistle();
    } else {
      this.camera.near = 0.1;
      this.camera.updateProjectionMatrix();
      this.engineBankRoll = 0;
      this.camera.up.set(0, 1, 0);
      if (this.camera.fov !== 38) {
        gsap.to(this.camera, {
          fov: 38,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: () => this.camera.updateProjectionMatrix(),
        });
      }
      if (this.isNightMode) {
        if (this.headlampBeam) this.headlampBeam.visible = true;
        if (this.headlampCoreBeam) this.headlampCoreBeam.visible = true;
        if (this.headlampTrackPool) this.headlampTrackPool.visible = true;
      } else {
        if (this.headlampBeam) this.headlampBeam.visible = false;
        if (this.headlampCoreBeam) this.headlampCoreBeam.visible = false;
        if (this.headlampTrackPool) this.headlampTrackPool.visible = false;
      }
    }

    if (mode === 'top') {
      this.controls.enabled = false;
      gsap.to(this.controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.85,
        ease: 'power2.inOut',
      });
      gsap.to(this.camera.position, {
        x: 0.01,
        y: 7.2,
        z: 0.01,
        duration: 0.85,
        ease: 'power2.inOut',
        onComplete: () => {
          this.controls.enabled = true;
          this.controls.update();
        },
      });
    } else if (mode === 'isometric') {
      this.controls.enabled = false;
      gsap.to(this.controls.target, {
        x: 0,
        y: 0.40,
        z: -0.75,
        duration: 0.85,
        ease: 'power2.inOut',
      });
      gsap.to(this.camera.position, {
        x: 5.8,
        y: 5.4,
        z: 6.0,
        duration: 0.85,
        ease: 'power2.inOut',
        onComplete: () => {
          this.controls.enabled = true;
          this.controls.update();
        },
      });
    } else if (mode === 'director') {
      this.directorShotIndex = 0;
      this.directorTimer = 0;
      this.directorNeedsCut = true;
    }
  }

  public setNightMode(isNight: boolean, immediate: boolean = false): void {
    this.isNightMode = isNight;

    if (immediate) {
      if (isNight) {
        // Immediate Midnight setup for initial load
        if (this.ambientLight) {
          this.ambientLight.color.set(0x18181b);
          this.ambientLight.intensity = 0.65;
        }
        if (this.hemiLight) {
          this.hemiLight.color.set(0x27272a);
          this.hemiLight.groundColor.set(0x090a0c);
          this.hemiLight.intensity = 0.35;
        }
        if (this.sunLight) {
          this.sunLight.position.set(6.5, 0.25, 1.8);
          this.sunLight.color.set(0xf8fafc);
          this.sunLight.intensity = 0.15;
        }
        if (this.sunMesh) {
          this.sunMesh.position.set(4.5, -0.8, 2.0);
          this.sunMesh.scale.setScalar(0.001);
          if (this.sunCorona) {
            ((this.sunCorona as THREE.Sprite).material as THREE.SpriteMaterial).opacity = 0;
          }
        }
        if (this.moonLight) {
          this.moonLight.intensity = 1.45;
        }
        if (this.moonMesh) {
          this.moonMesh.position.set(-2.4, 2.8, -2.4);
          this.moonMesh.scale.set(1, 1, 1);
          if (this.moonMesh.children[0]) {
            ((this.moonMesh.children[0] as THREE.Sprite).material as THREE.SpriteMaterial).opacity = 0.85;
          }
        }
        if (this.starsPoints) {
          (this.starsPoints.material as THREE.PointsMaterial).opacity = 0.85;
        }
        if (this.headlampLight) this.headlampLight.intensity = 1.8;
        if (this.headlampSpotLight) this.headlampSpotLight.intensity = 2.2;
        if (this.headlampBeam) {
          this.headlampBeam.visible = true;
          (this.headlampBeam.material as THREE.MeshBasicMaterial).opacity = 0.32;
        }
        if (this.headlampCoreBeam) {
          this.headlampCoreBeam.visible = true;
          (this.headlampCoreBeam.material as THREE.MeshBasicMaterial).opacity = 0.38;
        }
        if (this.headlampTrackPool) {
          this.headlampTrackPool.visible = true;
          (this.headlampTrackPool.material as THREE.MeshBasicMaterial).opacity = 0.45;
        }
        if (this.coachWindowMat) {
          this.coachWindowMat.emissive.set(0xfbbf24);
          this.coachWindowMat.emissiveIntensity = 1.8;
        }
        if (this.coachInteriorLight1) this.coachInteriorLight1.intensity = 1.2;
        if (this.coachInteriorLight2) this.coachInteriorLight2.intensity = 1.2;
        if (this.tailLight) this.tailLight.intensity = 1.8;
        if (this.lanternLight) this.lanternLight.intensity = 2.2;
        if (this.viaductLanternLights) this.viaductLanternLights.forEach((l) => l.intensity = 1.4);
        if (this.tunnelLight) this.tunnelLight.intensity = 0.9;
        if (this.windmillLight) this.windmillLight.intensity = 0.85;
        if (this.watermillLight) this.watermillLight.intensity = 0.85;
        if (this.cottageLight) this.cottageLight.intensity = 1.1;
        this.fireflies.forEach((f) => {
          f.mesh.visible = true;
          (f.mesh.material as THREE.MeshBasicMaterial).opacity = 0.85;
        });
        this.audio.setNightAmbience(true);
      } else {
        // Immediate Daylight setup
        if (this.ambientLight) {
          this.ambientLight.color.set(0xffffff);
          this.ambientLight.intensity = 2.1;
        }
        if (this.hemiLight) {
          this.hemiLight.color.set(0xfffbeb);
          this.hemiLight.groundColor.set(0xe2e8f0);
          this.hemiLight.intensity = 1.2;
        }
        if (this.sunLight) {
          this.sunLight.position.set(5.5, 7.5, 4.2);
          this.sunLight.color.set(0xfffbeb);
          this.sunLight.intensity = 2.6;
        }
        if (this.sunMesh) {
          this.sunMesh.position.set(1.3, 2.1, -1.8);
          this.sunMesh.scale.set(1, 1, 1);
          if (this.sunCorona) {
            ((this.sunCorona as any).material as THREE.MeshBasicMaterial).opacity = 0.22;
          }
        }
        if (this.moonLight) this.moonLight.intensity = 0;
        if (this.moonMesh) {
          this.moonMesh.position.set(-2.4, -0.7, -2.4);
          this.moonMesh.scale.setScalar(0.001);
          if (this.moonMesh.children[0]) {
            ((this.moonMesh.children[0] as THREE.Sprite).material as THREE.SpriteMaterial).opacity = 0;
          }
        }
        if (this.starsPoints) {
          (this.starsPoints.material as THREE.PointsMaterial).opacity = 0;
        }
        if (this.headlampLight) this.headlampLight.intensity = 0.6;
        if (this.headlampSpotLight) this.headlampSpotLight.intensity = 0.0;
        if (this.headlampBeam) {
          this.headlampBeam.visible = false;
          (this.headlampBeam.material as THREE.MeshBasicMaterial).opacity = 0;
        }
        if (this.headlampCoreBeam) {
          this.headlampCoreBeam.visible = false;
          (this.headlampCoreBeam.material as THREE.MeshBasicMaterial).opacity = 0;
        }
        if (this.headlampTrackPool) {
          this.headlampTrackPool.visible = false;
          (this.headlampTrackPool.material as THREE.MeshBasicMaterial).opacity = 0;
        }
        if (this.coachWindowMat) {
          this.coachWindowMat.emissive.set(0x000000);
          this.coachWindowMat.emissiveIntensity = 0;
        }
        if (this.coachInteriorLight1) this.coachInteriorLight1.intensity = 0;
        if (this.coachInteriorLight2) this.coachInteriorLight2.intensity = 0;
        if (this.tailLight) this.tailLight.intensity = 0.8;
        if (this.lanternLight) this.lanternLight.intensity = 0.8;
        if (this.viaductLanternLights) this.viaductLanternLights.forEach((l) => l.intensity = 0);
        if (this.tunnelLight) this.tunnelLight.intensity = 0.2;
        if (this.windmillLight) this.windmillLight.intensity = 0;
        if (this.watermillLight) this.watermillLight.intensity = 0;
        if (this.cottageLight) this.cottageLight.intensity = 0;
        this.fireflies.forEach((f) => {
          f.mesh.visible = false;
          (f.mesh.material as THREE.MeshBasicMaterial).opacity = 0;
        });
        this.audio.setNightAmbience(false);
      }
      return;
    }

    // GSAP Sunset / Sunrise Cinematic Timelines
    const dur = 1.6;

    if (isNight) {
      // -----------------------------------------------------------
      // SUNSET TIMELINE: Sun descends to horizon with warm orange
      // glow, moon rises into sky, stars fade in, lights illuminate!
      // -----------------------------------------------------------
      const sunsetTL = gsap.timeline();

      // 1. Sun sinks to horizon & shifts color from midday to glowing sunset orange, then dusk blue
      if (this.sunLight) {
        sunsetTL.to(this.sunLight.position, {
          x: 6.5,
          y: 0.25,
          z: 1.8,
          duration: dur,
          ease: 'power2.inOut',
        }, 0);

        const sunCol = { r: 1.0, g: 0.98, b: 0.92 };
        sunsetTL.to(sunCol, {
          r: 0.92,
          g: 0.35,
          b: 0.05, // Fiery sunset orange
          duration: dur * 0.5,
          ease: 'power1.out',
          onUpdate: () => {
            this.sunLight.color.setRGB(sunCol.r, sunCol.g, sunCol.b);
          },
        }, 0);

        sunsetTL.to(sunCol, {
          r: 0.97,
          g: 0.98,
          b: 0.98, // Silvery neutral moonlight
          duration: dur * 0.5,
          ease: 'power1.in',
          onUpdate: () => {
            this.sunLight.color.setRGB(sunCol.r, sunCol.g, sunCol.b);
          },
        }, dur * 0.5);

        sunsetTL.to(this.sunLight, { intensity: 0.15, duration: dur, ease: 'power2.inOut' }, 0);
      }

      if (this.sunMesh) {
        sunsetTL.to(this.sunMesh.position, {
          x: 4.5,
          y: -0.8,
          z: 2.0,
          duration: dur,
          ease: 'power2.in',
        }, 0);
        sunsetTL.to(this.sunMesh.scale, {
          x: 0.001,
          y: 0.001,
          z: 0.001,
          duration: dur * 0.8,
        }, dur * 0.2);
        if (this.sunCorona) {
          sunsetTL.to((this.sunCorona.material as THREE.SpriteMaterial), {
            opacity: 0,
            duration: dur * 0.7,
          }, dur * 0.2);
        }
      }

      // 2. Ambient light shifts from midday to warm sunset glow, then midnight indigo
      if (this.ambientLight) {
        const ambCol = { r: 1.0, g: 1.0, b: 1.0 };
        sunsetTL.to(ambCol, {
          r: 0.98,
          g: 0.57,
          b: 0.24, // Warm sunset amber
          duration: dur * 0.45,
          onUpdate: () => {
            this.ambientLight.color.setRGB(ambCol.r, ambCol.g, ambCol.b);
          },
        }, 0);

        sunsetTL.to(ambCol, {
          r: 0.10,
          g: 0.10,
          b: 0.11, // Neutral slate / matte black
          duration: dur * 0.55,
          onUpdate: () => {
            this.ambientLight.color.setRGB(ambCol.r, ambCol.g, ambCol.b);
          },
        }, dur * 0.45);

        sunsetTL.to(this.ambientLight, { intensity: 0.65, duration: dur }, 0);
      }

      if (this.hemiLight) {
        sunsetTL.to(this.hemiLight, { intensity: 0.35, duration: dur }, 0);
      }

      // 3. Moon rises from below horizon
      if (this.moonMesh) {
        this.moonMesh.position.set(-2.4, -0.7, -2.4);
        sunsetTL.to(this.moonMesh.position, {
          y: 2.8,
          duration: dur,
          ease: 'power2.out',
        }, dur * 0.2);

        sunsetTL.to(this.moonMesh.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: dur,
          ease: 'back.out(1.2)',
        }, dur * 0.2);

        if (this.moonMesh.children[0]) {
          sunsetTL.to(((this.moonMesh.children[0] as THREE.Sprite).material as THREE.SpriteMaterial), {
            opacity: 0.85,
            duration: dur * 0.8,
          }, dur * 0.3);
        }
      }

      if (this.moonLight) {
        sunsetTL.to(this.moonLight, { intensity: 1.45, duration: dur }, dur * 0.3);
      }

      // 4. Stars sparkle into view
      if (this.starsPoints) {
        sunsetTL.to((this.starsPoints.material as THREE.PointsMaterial), {
          opacity: 0.85,
          duration: dur * 0.8,
        }, dur * 0.3);
      }

      // 5. Train Headlight, Cabin Lights & Lanterns Flare On
      if (this.headlampLight) {
        sunsetTL.to(this.headlampLight, { intensity: 1.8, duration: dur * 0.7 }, dur * 0.3);
      }
      if (this.headlampSpotLight) {
        sunsetTL.to(this.headlampSpotLight, { intensity: 2.2, duration: dur * 0.7 }, dur * 0.3);
      }
      if (this.headlampBeam) {
        this.headlampBeam.visible = true;
        sunsetTL.to((this.headlampBeam.material as THREE.MeshBasicMaterial), {
          opacity: 0.32,
          duration: dur * 0.7,
        }, dur * 0.3);
      }
      if (this.headlampCoreBeam) {
        this.headlampCoreBeam.visible = true;
        sunsetTL.to((this.headlampCoreBeam.material as THREE.MeshBasicMaterial), {
          opacity: 0.38,
          duration: dur * 0.7,
        }, dur * 0.3);
      }
      if (this.headlampTrackPool) {
        this.headlampTrackPool.visible = true;
        sunsetTL.to((this.headlampTrackPool.material as THREE.MeshBasicMaterial), {
          opacity: 0.45,
          duration: dur * 0.7,
        }, dur * 0.3);
      }

      if (this.coachWindowMat) {
        sunsetTL.to(this.coachWindowMat.emissive, { r: 0.98, g: 0.75, b: 0.14, duration: dur * 0.7 }, dur * 0.3);
        sunsetTL.to(this.coachWindowMat, { emissiveIntensity: 1.8, duration: dur * 0.7 }, dur * 0.3);
      }
      if (this.coachInteriorLight1) sunsetTL.to(this.coachInteriorLight1, { intensity: 1.2, duration: dur * 0.7 }, dur * 0.3);
      if (this.coachInteriorLight2) sunsetTL.to(this.coachInteriorLight2, { intensity: 1.2, duration: dur * 0.7 }, dur * 0.3);
      if (this.tailLight) sunsetTL.to(this.tailLight, { intensity: 1.8, duration: dur * 0.7 }, dur * 0.3);
      if (this.lanternLight) sunsetTL.to(this.lanternLight, { intensity: 2.2, duration: dur * 0.7 }, dur * 0.3);
      this.viaductLanternLights.forEach((l) => {
        sunsetTL.to(l, { intensity: 1.4, duration: dur * 0.7 }, dur * 0.3);
      });
      if (this.tunnelLight) {
        sunsetTL.to(this.tunnelLight, { intensity: 0.9, duration: dur * 0.7 }, dur * 0.3);
      }
      if (this.windmillLight) sunsetTL.to(this.windmillLight, { intensity: 0.85, duration: dur * 0.7 }, dur * 0.3);
      if (this.watermillLight) sunsetTL.to(this.watermillLight, { intensity: 0.85, duration: dur * 0.7 }, dur * 0.3);
      if (this.cottageLight) sunsetTL.to(this.cottageLight, { intensity: 1.1, duration: dur * 0.7 }, dur * 0.3);
      this.fireflies.forEach((f) => {
        f.mesh.visible = true;
        sunsetTL.to(f.mesh.material as THREE.MeshBasicMaterial, { opacity: 0.85, duration: dur * 0.7 }, dur * 0.3);
      });
      this.audio.setNightAmbience(true);

    } else {
      // -----------------------------------------------------------
      // SUNRISE TIMELINE: Moon sinks, stars fade, sun climbs up
      // from horizon with dawn glow, illuminating the world!
      // -----------------------------------------------------------
      const sunriseTL = gsap.timeline();

      // 1. Moon sinks below horizon
      if (this.moonMesh) {
        sunriseTL.to(this.moonMesh.position, {
          y: -0.7,
          duration: dur * 0.7,
          ease: 'power2.in',
        }, 0);

        sunriseTL.to(this.moonMesh.scale, {
          x: 0.001,
          y: 0.001,
          z: 0.001,
          duration: dur * 0.7,
        }, 0);

        if (this.moonMesh.children[0]) {
          sunriseTL.to(((this.moonMesh.children[0] as THREE.Sprite).material as THREE.SpriteMaterial), {
            opacity: 0,
            duration: dur * 0.5,
          }, 0);
        }
      }

      if (this.moonLight) {
        sunriseTL.to(this.moonLight, { intensity: 0, duration: dur * 0.6 }, 0);
      }

      if (this.starsPoints) {
        sunriseTL.to((this.starsPoints.material as THREE.PointsMaterial), {
          opacity: 0,
          duration: dur * 0.6,
        }, 0);
      }

      // 2. Lights Dim
      if (this.headlampLight) sunriseTL.to(this.headlampLight, { intensity: 0.6, duration: dur * 0.6 }, 0);
      if (this.headlampSpotLight) sunriseTL.to(this.headlampSpotLight, { intensity: 0.0, duration: dur * 0.6 }, 0);
      if (this.headlampBeam) {
        sunriseTL.to((this.headlampBeam.material as THREE.MeshBasicMaterial), {
          opacity: 0,
          duration: dur * 0.5,
          onComplete: () => {
            if (this.headlampBeam) this.headlampBeam.visible = false;
          },
        }, 0);
      }
      if (this.headlampCoreBeam) {
        sunriseTL.to((this.headlampCoreBeam.material as THREE.MeshBasicMaterial), {
          opacity: 0,
          duration: dur * 0.5,
          onComplete: () => {
            if (this.headlampCoreBeam) this.headlampCoreBeam.visible = false;
          },
        }, 0);
      }
      if (this.headlampTrackPool) {
        sunriseTL.to((this.headlampTrackPool.material as THREE.MeshBasicMaterial), {
          opacity: 0,
          duration: dur * 0.5,
          onComplete: () => {
            if (this.headlampTrackPool) this.headlampTrackPool.visible = false;
          },
        }, 0);
      }
      if (this.coachWindowMat) {
        sunriseTL.to(this.coachWindowMat.emissive, { r: 0, g: 0, b: 0, duration: dur * 0.6 }, 0);
        sunriseTL.to(this.coachWindowMat, { emissiveIntensity: 0, duration: dur * 0.6 }, 0);
      }
      if (this.coachInteriorLight1) sunriseTL.to(this.coachInteriorLight1, { intensity: 0, duration: dur * 0.6 }, 0);
      if (this.coachInteriorLight2) sunriseTL.to(this.coachInteriorLight2, { intensity: 0, duration: dur * 0.6 }, 0);
      if (this.tailLight) sunriseTL.to(this.tailLight, { intensity: 0.8, duration: dur * 0.6 }, 0);
      if (this.lanternLight) sunriseTL.to(this.lanternLight, { intensity: 0.8, duration: dur * 0.6 }, 0);
      this.viaductLanternLights.forEach((l) => {
        sunriseTL.to(l, { intensity: 0, duration: dur * 0.5 }, 0);
      });
      if (this.tunnelLight) {
        sunriseTL.to(this.tunnelLight, { intensity: 0.2, duration: dur * 0.5 }, 0);
      }
      if (this.windmillLight) sunriseTL.to(this.windmillLight, { intensity: 0, duration: dur * 0.5 }, 0);
      if (this.watermillLight) sunriseTL.to(this.watermillLight, { intensity: 0, duration: dur * 0.5 }, 0);
      if (this.cottageLight) sunriseTL.to(this.cottageLight, { intensity: 0, duration: dur * 0.5 }, 0);
      this.fireflies.forEach((f) => {
        sunriseTL.to(f.mesh.material as THREE.MeshBasicMaterial, {
          opacity: 0,
          duration: dur * 0.5,
          onComplete: () => { f.mesh.visible = false; },
        }, 0);
      });
      this.audio.setNightAmbience(false);

      // 3. Sun climbs from horizon up to high midday sky, shifting from dawn rose/gold to crisp daylight
      if (this.sunLight) {
        this.sunLight.position.set(6.5, 0.25, 1.8);
        sunriseTL.to(this.sunLight.position, {
          x: 5.5,
          y: 7.5,
          z: 4.2,
          duration: dur,
          ease: 'power2.out',
        }, dur * 0.15);

        const sunCol = { r: 0.96, g: 0.45, b: 0.15 }; // Dawn peach-gold
        this.sunLight.color.setRGB(sunCol.r, sunCol.g, sunCol.b);

        sunriseTL.to(sunCol, {
          r: 1.0,
          g: 0.98,
          b: 0.92, // Bright daylight
          duration: dur * 0.85,
          ease: 'power1.out',
          onUpdate: () => {
            this.sunLight.color.setRGB(sunCol.r, sunCol.g, sunCol.b);
          },
        }, dur * 0.15);

        sunriseTL.to(this.sunLight, { intensity: 2.6, duration: dur }, dur * 0.1);
      }

      if (this.sunMesh) {
        this.sunMesh.position.set(4.5, -0.8, 2.0);
        sunriseTL.to(this.sunMesh.position, {
          x: 1.3,
          y: 2.1,
          z: -1.8,
          duration: dur,
          ease: 'power2.out',
        }, dur * 0.15);

        sunriseTL.to(this.sunMesh.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: dur,
          ease: 'back.out(1.2)',
        }, dur * 0.2);

        if (this.sunCorona) {
          sunriseTL.to(((this.sunCorona as any).material as THREE.MeshBasicMaterial), {
            opacity: 0.22,
            duration: dur * 0.8,
          }, dur * 0.25);
        }
      }

      // 4. Ambient light blooms into bright daylight
      if (this.ambientLight) {
        const ambCol = { r: 0.12, g: 0.16, b: 0.23 };
        sunriseTL.to(ambCol, {
          r: 0.99,
          g: 0.90,
          b: 0.65, // Dawn golden ambient
          duration: dur * 0.4,
          onUpdate: () => {
            this.ambientLight.color.setRGB(ambCol.r, ambCol.g, ambCol.b);
          },
        }, dur * 0.1);

        sunriseTL.to(ambCol, {
          r: 1.0,
          g: 1.0,
          b: 1.0, // Clear daylight
          duration: dur * 0.5,
          onUpdate: () => {
            this.ambientLight.color.setRGB(ambCol.r, ambCol.g, ambCol.b);
          },
        }, dur * 0.5);

        sunriseTL.to(this.ambientLight, { intensity: 2.1, duration: dur }, dur * 0.1);
      }

      if (this.hemiLight) {
        sunriseTL.to(this.hemiLight, { intensity: 1.2, duration: dur }, dur * 0.1);
      }
    }
  }

  /* =========================================================================
     15. ANIMATION & RENDER LOOP
     ========================================================================= */
  private animate = (): void => {
    if (this.isDestroyed) return;

    // 1. Advance Track Progress
    this.progress = (this.progress + this.trainSpeed * this.speedMultiplier) % 1.0;

    // 2. Position All 4 Train Cars — 100% Tangent Basis Matrix Alignment!
    const carOffsets = [0, -0.022, -0.044, -0.066];
    const cars = [this.locoCar, this.tenderCar, this.coachCar, this.cabooseCar];
    const up = new THREE.Vector3(0, 1, 0);

    cars.forEach((car, idx) => {
      const u = (this.progress + carOffsets[idx] + 1.0) % 1.0;
      const pos = this.trackCurve.getPointAt(u);
      const tangent = this.trackCurve.getTangentAt(u).normalize();

      // Lateral vector perpendicular to track curve
      const zDir = new THREE.Vector3().crossVectors(tangent, up).normalize();
      // True normal vector perpendicular to tangent and lateral (handles grade and incline)
      const yDir = new THREE.Vector3().crossVectors(zDir, tangent).normalize();

      // makeBasis guarantees local +X is along tangent, local +Y is along up, local +Z is lateral
      const rotMat = new THREE.Matrix4().makeBasis(tangent, yDir, zDir);
      car.quaternion.setFromRotationMatrix(rotMat);
      car.position.copy(pos);
    });

    // 3. Realistic Wheel Rotation along rolling cylinder axis & reciprocating rods
    const wheelRot = 0.08 * this.speedMultiplier;
    this.wheelAngle = (this.wheelAngle - wheelRot) % (Math.PI * 2);
    this.rotatingWheels.forEach((w) => {
      w.rotation.z -= wheelRot;
    });

    if (this.leftSideRod && this.rightSideRod) {
      const crankR = 0.022;
      const crankX = Math.cos(this.wheelAngle) * crankR;
      const crankY = Math.sin(this.wheelAngle) * crankR;
      this.leftSideRod.position.set(crankX, 0.045 + crankY, 0.104);
      this.rightSideRod.position.set(crankX, 0.045 + crankY, -0.104);
    }

    // Dynamic Spatial Audio: compute distance and stereo panning based on locomotive screen position
    const locoScreenPos = this.locoCar.position.clone().project(this.camera);
    const stereoPan = Math.max(-0.85, Math.min(0.85, locoScreenPos.x));
    const camDist = this.camera.position.distanceTo(this.locoCar.position);
    const isEngineCam = (this.currentViewMode === 'engine' || this.currentViewMode === 'cinematic');
    const spatialGain = isEngineCam ? 1.6 : Math.max(0.35, Math.min(1.7, 5.2 / Math.max(1.0, camDist)));
    const effectivePan = isEngineCam ? 0 : stereoPan;

    // 3b. Continuous Rhythmic Rail Click-Clack
    this.railClickAccumulator += this.trainSpeed * this.speedMultiplier;
    if (this.railClickAccumulator >= 0.034) {
      this.railClickAccumulator = 0;
      const isInsideTunnel = this.isTrainInTunnel();
      this.audio.playRailClickClack(this.speedMultiplier, isInsideTunnel, spatialGain, effectivePan);
    }

    // 4. Volumetric Smokestack Puffs (Faster cadence in Engine Mode)
    const puffThreshold = isEngineCam ? 16 : 28;
    this.steamTimer += this.speedMultiplier;
    if (this.steamTimer >= puffThreshold) {
      this.steamTimer = 0;
      this.spawnSteamPuff(1.0);
      this.audio.playSteamChuff(this.isTrainInTunnel(), spatialGain, effectivePan);
    }

    this.steamParticles.forEach((p) => {
      if (p.life > 0) {
        p.life -= 0.024;
        p.mesh.position.x += p.vx;
        p.mesh.position.y += p.vy;
        p.mesh.position.z += p.vz;
        p.mesh.scale.multiplyScalar(1.035);
        p.mesh.visible = true;
        (p.mesh.material as THREE.MeshStandardMaterial).opacity = Math.max(0, p.life * 0.75);
      } else {
        p.mesh.visible = false;
        p.mesh.position.set(0, -100, 0);
        (p.mesh.material as THREE.MeshStandardMaterial).opacity = 0;
      }
    });

    // 5. Rain & Ripple Physics Update
    if (this.isRaining && this.rainPositions && this.rainGeo) {
      const streakLen = 0.18;
      for (let i = 0; i < this.rainCount; i++) {
        // Fall down with slight wind angle
        this.rainPositions[i * 6 + 1] -= 0.11;
        this.rainPositions[i * 6 + 4] -= 0.11;

        // Reset if hitting ground
        if (this.rainPositions[i * 6 + 1] < 0.02) {
          const rx = (Math.random() - 0.5) * 5.2;
          const ry = 3.2 + Math.random() * 0.5;
          const rz = (Math.random() - 0.5) * 4.2;

          // Spawn ground splash ripple
          this.triggerSplash(this.rainPositions[i * 6], 0.025, this.rainPositions[i * 6 + 2]);

          this.rainPositions[i * 6] = rx;
          this.rainPositions[i * 6 + 1] = ry;
          this.rainPositions[i * 6 + 2] = rz;

          this.rainPositions[i * 6 + 3] = rx - 0.02;
          this.rainPositions[i * 6 + 4] = ry - streakLen;
          this.rainPositions[i * 6 + 5] = rz - 0.01;
        }
      }
      this.rainGeo.attributes.position.needsUpdate = true;
    }

    // Update Expanding Splash Ripples
    this.splashRipples.forEach((sp) => {
      if (sp.life > 0) {
        sp.life -= 0.045;
        const progress = 1.0 - sp.life;
        sp.mesh.scale.setScalar(0.2 + progress * sp.maxRadius * 8);
        (sp.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, sp.life * 0.5);
      } else {
        (sp.mesh.material as THREE.MeshBasicMaterial).opacity = 0;
      }
    });

    // 6. Level Crossing Alternating Red Blinkers & Warning Bell
    const blinkCycle = (Date.now() % 800) < 400;
    if (this.crossingLamp1 && this.crossingLamp2 && this.crossingLight1 && this.crossingLight2) {
      this.crossingLamp1.visible = blinkCycle;
      this.crossingLight1.intensity = blinkCycle ? 0.9 : 0;
      this.crossingLight2.visible = !blinkCycle;
      this.crossingLight2.intensity = !blinkCycle ? 0.9 : 0;

      if (this.lastBlinkCycle !== blinkCycle) {
        this.lastBlinkCycle = blinkCycle;
        if (blinkCycle) {
          const locoPos = this.locoCar.position;
          const dist = Math.hypot(locoPos.x - (-0.45), locoPos.z - 0.82);
          if (dist < 0.95) {
            this.audio.playCrossingBell();
          }
        }
      }
    }

    // 7. Station Clock Hand Ticking
    if (this.clockHand) {
      this.clockHand.rotation.z = -Date.now() * 0.001;
    }

    // 8. Gentle Tranquil Water Specular Shimmer & Moored Boat Bobbing (Fixed elevation, NO vertical clipping!)
    if (this.waterMesh) {
      (this.waterMesh.material as THREE.MeshStandardMaterial).opacity = 0.86 + Math.sin(Date.now() * 0.0018) * 0.04;
    }
    if (this.mooredBoat) {
      this.mooredBoat.rotation.z = Math.sin(Date.now() * 0.0015) * 0.025;
      this.mooredBoat.position.y = 0.038 + Math.sin(Date.now() * 0.0015) * 0.0012;
    }

    // 9. Windmill Sails & Waterwheel Continuous Kinetic Animation
    if (this.windmillSails) {
      this.windmillSails.rotation.x -= this.windmillCurrentSpeed;
      if (this.windmillCurrentSpeed > this.windmillBaseSpeed) {
        this.windmillCurrentSpeed = THREE.MathUtils.lerp(this.windmillCurrentSpeed, this.windmillBaseSpeed, 0.015);
      }
    }
    if (this.waterwheel) {
      this.waterwheel.rotation.x += 0.016 * this.speedMultiplier;
    }
    if (this.townFountainJet) {
      this.townFountainJet.rotation.y += 0.02;
    }

    // 9b. Bioluminescent Fireflies Harmonic Drift & Night Glow Pulsing
    if (this.fireflies.length > 0) {
      const fTime = Date.now() * 0.001;
      this.fireflies.forEach((p) => {
        p.mesh.position.x = p.baseX + Math.sin(fTime * p.speed + p.phase) * p.radius;
        p.mesh.position.y = p.baseY + Math.sin(fTime * p.speed * 1.6 + p.phase) * 0.035;
        p.mesh.position.z = p.baseZ + Math.cos(fTime * p.speed * 1.1 + p.phase) * p.radius;

        if (this.isNightMode) {
          p.mesh.visible = true;
          const pulse = 0.5 + Math.sin(fTime * 3.2 + p.phase) * 0.45;
          (p.mesh.material as THREE.MeshBasicMaterial).opacity = pulse;
        } else {
          p.mesh.visible = false;
          (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0;
        }
      });
    }

    // 9c. Campfire Ember Drift
    if (this.campfireParticles && this.campfireParticlePos) {
      for (let i = 0; i < 20; i++) {
        this.campfireParticlePos[i * 3 + 1] += 0.0025;
        if (this.campfireParticlePos[i * 3 + 1] > 0.32) {
          this.campfireParticlePos[i * 3 + 1] = 0.06;
          this.campfireParticlePos[i * 3] = (Math.random() - 0.5) * 0.12;
          this.campfireParticlePos[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
        }
      }
      this.campfireParticles.geometry.attributes.position.needsUpdate = true;
    }

    // 9d. Hot Air Balloon Thermal Bob
    if (this.hotAirBalloonGroup) {
      const bTime = Date.now() * 0.001;
      this.hotAirBalloonGroup.position.y = 2.70 + Math.sin(bTime * 1.2) * 0.08;
      this.hotAirBalloonGroup.rotation.z = Math.sin(bTime * 0.8) * 0.04;
    }

    // 9e. Fluttering Meadow Butterflies & Fluffy Sheep Grazing
    if (this.butterflies.length > 0) {
      const bTime = Date.now() * 0.003;
      this.butterflies.forEach((b) => {
        const wingL = b.mesh.children[0];
        const wingR = b.mesh.children[1];
        if (wingL && wingR) {
          const flutter = Math.sin(bTime * 9 + b.phase) * 0.75;
          wingL.rotation.z = 0.3 + flutter;
          wingR.rotation.z = -0.3 - flutter;
        }
        b.mesh.position.x = b.basePos.x + Math.sin(bTime * b.speed + b.phase) * 0.12;
        b.mesh.position.y = b.basePos.y + Math.abs(Math.cos(bTime * b.speed * 1.5 + b.phase)) * 0.08;
        b.mesh.position.z = b.basePos.z + Math.cos(bTime * b.speed + b.phase) * 0.12;
        b.mesh.rotation.y = Math.sin(bTime * b.speed + b.phase) * 0.8;
      });
    }

    if (this.interactiveSheep.length > 0) {
      const gTime = Date.now() * 0.002;
      this.interactiveSheep.forEach((sheep, i) => {
        const head = sheep.children.find((c) => (c as THREE.Mesh).isMesh && c.position.y > 0.06);
        if (head) {
          head.rotation.x = Math.sin(gTime * 1.2 + i * 1.5) * 0.12;
        }
      });
    }

    // 9f. Atmospheric God-Rays & Swarming Honey Bees
    if (this.godRaysGroup && this.godRaysGroup.children.length > 0) {
      const rTime = Date.now() * 0.001;
      const baseOp = this.isNightMode ? 0 : 0.16;
      this.godRaysGroup.children.forEach((ray, i) => {
        const mat = (ray as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) {
          const pulse = Math.sin(rTime * 1.1 + i * 1.3) * 0.04;
          mat.opacity = Math.max(0, baseOp + pulse);
        }
      });
    }

    if (this.bees.length > 0) {
      const beeTime = Date.now() * 0.003;
      this.bees.forEach((b) => {
        b.mesh.position.x = b.baseX + Math.sin(beeTime * b.speed + b.phase) * b.radius;
        b.mesh.position.z = b.baseZ + Math.cos(beeTime * b.speed + b.phase) * b.radius;
        b.mesh.position.y = b.baseY + Math.sin(beeTime * 4 + b.phase) * 0.02;
      });
    }

    // 9g. Dynamic Cinematic, Cab, Director & Trackside Camera System
    if (this.currentViewMode === 'director') {
      const now = performance.now();
      const dt = this.lastAnimTime ? (now - this.lastAnimTime) * 0.001 : 0.016;
      this.directorTimer += dt;
      if (this.directorTimer >= this.directorShotDuration) {
        this.directorTimer = 0;
        this.directorShotIndex = (this.directorShotIndex + 1) % 4;
        this.directorNeedsCut = true;
      }

      const locoPos = this.locoCar.position;
      const tangent = this.trackCurve.getTangentAt(this.progress).normalize();

      let targetCamPos: THREE.Vector3;
      let targetLook: THREE.Vector3;

      if (this.directorShotIndex === 0) {
        // Shot 0: Trackside Viaduct Arch Waypoint (Low-Angle Hero Shot)
        targetCamPos = new THREE.Vector3(1.15, 0.40, 1.15);
        targetLook = locoPos.clone().add(new THREE.Vector3(0, 0.08, 0));
      } else if (this.directorShotIndex === 1) {
        // Shot 1: Locomotive Action Cam
        targetCamPos = locoPos.clone().sub(tangent.clone().multiplyScalar(0.72)).add(new THREE.Vector3(0, 0.38, 0));
        if (this.isTrainInTunnel()) {
          targetCamPos.y = Math.max(0.48, targetCamPos.y);
        }
        targetLook = locoPos.clone().add(tangent.clone().multiplyScalar(0.75)).add(new THREE.Vector3(0, 0.12, 0));
      } else if (this.directorShotIndex === 2) {
        // Shot 2: Station Platform Spectator Angle (Track clearance 0.833)
        targetCamPos = new THREE.Vector3(-0.45, 0.28, 1.55);
        targetLook = locoPos.clone().add(new THREE.Vector3(0, 0.08, 0));
      } else {
        // Shot 3: High Alpine Ridge Drone Panorama Sweep
        const droneAngle = (Date.now() * 0.00028);
        targetCamPos = new THREE.Vector3(Math.cos(droneAngle) * 3.4, 2.95, Math.sin(droneAngle) * 3.4);
        targetLook = new THREE.Vector3(0, 0.25, 0);
      }

      if (this.directorNeedsCut) {
        this.camera.position.copy(targetCamPos);
        this.camera.lookAt(targetLook);
        this.controls.target.copy(targetLook);
        this.directorNeedsCut = false;
      } else {
        this.camera.position.lerp(targetCamPos, 0.08);
        this.camera.lookAt(targetLook);
        this.controls.target.copy(targetLook);
      }
    } else if (this.currentViewMode === 'cinematic' || this.currentViewMode === 'engine') {
      // 1. Realistic Curvature Banking & Dynamic Physics Tilt
      const uCurr = this.progress;
      const uAhead = (this.progress + 0.024) % 1.0;
      const tCurr = this.trackCurve.getTangentAt(uCurr).normalize();
      const tAhead = this.trackCurve.getTangentAt(uAhead).normalize();

      // Signed 2D curvature rate (turning velocity into corner)
      const curveRate = (tCurr.x * tAhead.z - tCurr.z * tAhead.x);

      // Centrifugal physics tilt: rolls into the turn, responsive to speed multiplier
      const bankStrength = 2.0 * Math.min(this.speedMultiplier, 2.5);
      const targetRoll = Math.max(-0.09, Math.min(0.09, -curveRate * bankStrength));
      this.engineBankRoll += (targetRoll - this.engineBankRoll) * 0.12;

      // 2. High-speed mechanical suspension rumble & rail joint vibration
      const rumbleFreq = Date.now() * 0.028 * this.speedMultiplier;
      const rumbleY = (Math.sin(rumbleFreq) * 0.0016 + Math.cos(rumbleFreq * 0.5) * 0.0008);
      const rumbleRoll = Math.sin(rumbleFreq * 0.8) * 0.0015;

      // 3. Dynamic Obstacle / Tunnel Adaptation:
      // High-action over-the-cab chase vantage point showing full locomotive in frame with track ahead!
      // Positioned directly above/behind engineer cab (-0.28, 0.32, 0.10).
      // ZERO clipping inside trailing coach cars (which are at x <= -0.45), and clear view of rails ahead!
      const inTunnel = this.isTrainInTunnel();
      const onViaduct = (this.progress >= 0.38 && this.progress <= 0.62);

      const targetCamX = inTunnel ? -0.16 : -0.28;
      const targetCamY = (inTunnel ? 0.22 : (onViaduct ? 0.36 : 0.32)) + rumbleY;
      const targetCamZ = inTunnel ? 0.04 : 0.10;

      const localCamPos = new THREE.Vector3(targetCamX, targetCamY, targetCamZ);
      const worldCamPos = this.locoCar.localToWorld(localCamPos);

      // Safe floor limit: never dip below ground
      worldCamPos.y = Math.max(worldCamPos.y, 0.22);

      // 4. Look target across locomotive hood towards rails ahead (with pitch on viaduct grade)
      const targetLookX = inTunnel ? 0.90 : 1.05;
      const targetLookY = 0.12 + (tCurr.y * 0.35); // Incline pitch following grade!
      const localLookTarget = new THREE.Vector3(targetLookX, targetLookY, 0);
      const worldLookTarget = this.locoCar.localToWorld(localLookTarget);

      // 5. Elastic Spring-Damper Follow Camera (Authentic vehicle mass & momentum)
      this.camera.position.lerp(worldCamPos, 0.18);
      this.camera.up.set(0, 1, 0);
      this.camera.lookAt(worldLookTarget);

      // 6. Realistic Physics Tilt: Curvature Banking + Suspension Vibration
      const effectiveRoll = this.engineBankRoll + rumbleRoll;
      if (Math.abs(effectiveRoll) > 0.0005) {
        this.camera.rotateZ(effectiveRoll);
      }
      this.controls.target.copy(worldLookTarget);
    } else if (this.currentViewMode === 'trackside') {
      // Scenic ground-level spotter tripod camera (Track clearance 0.847)
      const tripodPos = new THREE.Vector3(0.55, 0.32, 1.65);
      this.camera.position.lerp(tripodPos, 0.08);
      const lookPos = this.locoCar.position.clone().add(new THREE.Vector3(0, 0.10, 0));
      this.camera.lookAt(lookPos);
      this.controls.target.copy(lookPos);
    } else {
      this.controls.update();

      // Subtle responsive 3D tilt towards mouse cursor in isometric view for physical tactile feel
      if (this.currentViewMode === 'isometric') {
        const targetRotZ = (this.mousePos.x || 0) * 0.015;
        const targetRotX = -(this.mousePos.y || 0) * 0.015;
        this.rootGroup.rotation.z += (targetRotZ - this.rootGroup.rotation.z) * 0.05;
        this.rootGroup.rotation.x += (targetRotX - this.rootGroup.rotation.x) * 0.05;
      }
    }
    this.lastAnimTime = performance.now();

    // 10. Subtle Diorama Floating Levitation
    this.rootGroup.position.y = Math.sin(Date.now() * 0.0012) * 0.025;

    // 11. Render Frame
    this.renderer.render(this.scene, this.camera);
    this.animFrameId = requestAnimationFrame(this.animate);
  };

  public destroy(): void {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animFrameId);
    this.controls.dispose();
    this.renderer.dispose();
  }
}

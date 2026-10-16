/**
 * Interactive Infinite Loop Canvas Engine
 * Simulates Metro Grid's 2.5D closed-circuit transit loop with 3-aspect signalling,
 * shape-coded commuters, and dynamic dispatch control.
 */
export class InfiniteLoopCanvas {
    canvas;
    ctx;
    audio;
    width = 0;
    height = 0;
    animationFrameId = 0;
    // Simulation State
    speedMultiplier = 1;
    isPaused = false;
    totalDelivered = 1420;
    networkStatus = 'BALANCED LOOP';
    // Circuit geometry: Parametric closed loop (Smooth rounded racetrack / Stadium curve)
    stations = [];
    signals = [];
    trains = [];
    commutersDeliveredListeners = [];
    constructor(canvasId, audioInstance) {
        const el = document.getElementById(canvasId);
        if (!el) {
            throw new Error(`Infinite loop canvas #${canvasId} not found`);
        }
        this.canvas = el;
        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Canvas 2D context not available');
        }
        this.ctx = context;
        this.audio = audioInstance;
        this.resize();
        this.initCircuit();
        this.bindEvents();
        this.animate();
    }
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.width = rect.width || 800;
        this.height = rect.height || 480;
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);
    }
    initCircuit() {
        // 3 Stations with distinct shape requirements
        this.stations = [
            { id: 'north', name: 'Central Interchange', t: 0.12, shape: 'square', queue: ['circle', 'triangle', 'square'], color: '#ff5252' },
            { id: 'east', name: 'Silicon Viaduct', t: 0.45, shape: 'circle', queue: ['triangle', 'cross', 'circle'], color: '#448aff' },
            { id: 'west', name: 'West Terminal', t: 0.78, shape: 'triangle', queue: ['square', 'cross', 'triangle'], color: '#ffd740' },
        ];
        // 3 Automatic Block Signals
        this.signals = [
            { id: 'sig-1', t: 0.05, aspect: 'GREEN' },
            { id: 'sig-2', t: 0.38, aspect: 'GREEN' },
            { id: 'sig-3', t: 0.70, aspect: 'GREEN' },
        ];
        // Initial 2 EMU Trains running the loop
        this.trains = [
            {
                id: 1,
                t: 0.0,
                speed: 0.0006,
                targetSpeed: 0.0006,
                cars: 3,
                color: '#ff6b00',
                passengers: ['triangle', 'circle'],
                capacity: 18,
                status: 'RUNNING',
                boardingTimer: 0,
            },
            {
                id: 2,
                t: 0.5,
                speed: 0.0006,
                targetSpeed: 0.0006,
                cars: 3,
                color: '#00d2ff',
                passengers: ['square', 'circle'],
                capacity: 18,
                status: 'RUNNING',
                boardingTimer: 0,
            },
        ];
    }
    /**
     * Evaluates parametric 2D coordinates on the transit circuit.
     * Creates an isometric tilted rounded stadium loop.
     */
    getTrackPoint(t, inset = 0) {
        const normT = ((t % 1) + 1) % 1;
        const cx = this.width / 2;
        const cy = this.height / 2;
        const rx = Math.min(this.width * 0.38, 320) - inset;
        const ry = Math.min(this.height * 0.34, 150) - inset;
        // Parametric squircle / racetrack formula for smooth corners and straights
        const angle = normT * Math.PI * 2;
        const x = cx + rx * Math.cos(angle);
        const y = cy + ry * Math.sin(angle);
        // Tangent angle
        const dx = -rx * Math.sin(angle);
        const dy = ry * Math.cos(angle);
        const heading = Math.atan2(dy, dx);
        return { x, y, angle: heading };
    }
    setSignalAspect(signalIndex, aspect) {
        if (this.signals[signalIndex]) {
            this.signals[signalIndex].aspect = aspect;
            this.audio.playSignalClick();
            this.updateTelemetryHUD();
        }
    }
    toggleSignal(signalIndex) {
        if (this.signals[signalIndex]) {
            const current = this.signals[signalIndex].aspect;
            const next = current === 'GREEN' ? 'YELLOW' : current === 'YELLOW' ? 'RED' : 'GREEN';
            this.signals[signalIndex].aspect = next;
            this.audio.playSignalClick();
            this.updateTelemetryHUD();
        }
    }
    spawnTrain() {
        if (this.trains.length >= 5)
            return;
        const newId = this.trains.length + 1;
        // Find an empty spot
        const lastTrain = this.trains[this.trains.length - 1];
        const spawnT = (lastTrain.t + 0.33) % 1;
        this.trains.push({
            id: newId,
            t: spawnT,
            speed: 0.0006,
            targetSpeed: 0.0006,
            cars: 3,
            color: newId % 2 === 0 ? '#00e676' : '#ffd740',
            passengers: ['cross', 'square'],
            capacity: 18,
            status: 'RUNNING',
            boardingTimer: 0,
        });
        this.audio.playVVVFWhine();
        this.updateTelemetryHUD();
    }
    triggerRushHour() {
        // Fill up all station queues
        const shapes = ['square', 'circle', 'triangle', 'cross'];
        for (const station of this.stations) {
            for (let i = 0; i < 4; i++) {
                station.queue.push(shapes[Math.floor(Math.random() * shapes.length)]);
            }
        }
        this.networkStatus = 'RUSH HOUR SURGE';
        this.audio.playVVVFWhine();
        setTimeout(() => {
            this.networkStatus = 'BALANCED LOOP';
            this.updateTelemetryHUD();
        }, 5000);
        this.updateTelemetryHUD();
    }
    setSpeed(multiplier) {
        this.speedMultiplier = multiplier;
        this.isPaused = multiplier === 0;
        this.updateTelemetryHUD();
    }
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
        });
        // Click canvas to toggle nearby signal or interact with trains
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            // Check click near any signal lamp
            for (let i = 0; i < this.signals.length; i++) {
                const pt = this.getTrackPoint(this.signals[i].t);
                const dist = Math.hypot(clickX - pt.x, clickY - pt.y);
                if (dist < 40) {
                    this.toggleSignal(i);
                    return;
                }
            }
            // Check click near trains
            for (const train of this.trains) {
                const pt = this.getTrackPoint(train.t);
                const dist = Math.hypot(clickX - pt.x, clickY - pt.y);
                if (dist < 50) {
                    this.audio.playVVVFWhine();
                    return;
                }
            }
        });
    }
    updateSimulation() {
        if (this.isPaused)
            return;
        const baseDt = 0.0006 * this.speedMultiplier;
        // Random commuter arrival
        if (Math.random() < 0.02 * this.speedMultiplier) {
            const targetStation = this.stations[Math.floor(Math.random() * this.stations.length)];
            if (targetStation.queue.length < 8) {
                const shapes = ['square', 'circle', 'triangle', 'cross'];
                targetStation.queue.push(shapes[Math.floor(Math.random() * shapes.length)]);
            }
        }
        for (let i = 0; i < this.trains.length; i++) {
            const train = this.trains[i];
            // Check distance to train ahead (Headway enforcement)
            const nextTrain = this.trains[(i + 1) % this.trains.length];
            let distanceAhead = nextTrain.t - train.t;
            if (distanceAhead < 0)
                distanceAhead += 1;
            // Check upcoming signal
            let speedCap = 1.0;
            for (const sig of this.signals) {
                let distToSig = sig.t - train.t;
                if (distToSig < 0)
                    distToSig += 1;
                if (distToSig < 0.08 && distToSig > 0) {
                    if (sig.aspect === 'RED') {
                        speedCap = 0;
                    }
                    else if (sig.aspect === 'YELLOW') {
                        speedCap = 0.45;
                    }
                }
            }
            // Safe separation between trains
            if (distanceAhead < 0.15 && this.trains.length > 1) {
                speedCap = Math.min(speedCap, 0.2);
            }
            if (distanceAhead < 0.08 && this.trains.length > 1) {
                speedCap = 0; // Emergency block halt
            }
            // Station Boarding Logic
            let atStation = null;
            for (const station of this.stations) {
                const dist = Math.abs(train.t - station.t);
                if (dist < 0.015 && train.speed > 0) {
                    atStation = station;
                    break;
                }
            }
            if (atStation && train.boardingTimer <= 0 && train.status !== 'BOARDING') {
                train.status = 'BOARDING';
                train.boardingTimer = 45; // Frames to board
                // Alight passengers matching this station's shape
                const remaining = train.passengers.filter((p) => p !== atStation.shape);
                const delivered = train.passengers.length - remaining.length;
                if (delivered > 0) {
                    this.totalDelivered += delivered;
                    this.audio.playBoardingBell();
                    this.notifyDelivered();
                }
                train.passengers = remaining;
                // Board queue
                while (atStation.queue.length > 0 && train.passengers.length < train.capacity) {
                    const rider = atStation.queue.shift();
                    if (rider)
                        train.passengers.push(rider);
                }
            }
            if (train.boardingTimer > 0) {
                train.boardingTimer -= 1 * this.speedMultiplier;
                train.targetSpeed = 0;
            }
            else {
                train.targetSpeed = baseDt * speedCap;
                train.status = speedCap === 0 ? 'STOPPED' : speedCap < 1 ? 'DECELERATING' : 'RUNNING';
            }
            // Smooth acceleration / deceleration
            train.speed += (train.targetSpeed - train.speed) * 0.1;
            train.t = (train.t + train.speed) % 1;
        }
    }
    notifyDelivered() {
        for (const listener of this.commutersDeliveredListeners) {
            listener(this.totalDelivered);
        }
    }
    onCommutersDelivered(cb) {
        this.commutersDeliveredListeners.push(cb);
    }
    updateTelemetryHUD() {
        const countEl = document.getElementById('hud-delivered-count');
        if (countEl)
            countEl.innerText = this.totalDelivered.toString();
        const trainsEl = document.getElementById('hud-active-trains');
        if (trainsEl)
            trainsEl.innerText = `${this.trains.length} EMU`;
        const statusEl = document.getElementById('hud-network-status');
        if (statusEl) {
            statusEl.innerText = this.networkStatus;
            statusEl.style.color = this.signals.some((s) => s.aspect === 'RED') ? 'var(--signal-red)' : 'var(--signal-green)';
        }
        // Update signal lamps UI
        this.signals.forEach((sig, idx) => {
            const lampGreen = document.getElementById(`sig-${idx}-green`);
            const lampYellow = document.getElementById(`sig-${idx}-yellow`);
            const lampRed = document.getElementById(`sig-${idx}-red`);
            if (lampGreen)
                lampGreen.classList.toggle('active', sig.aspect === 'GREEN');
            if (lampYellow)
                lampYellow.classList.toggle('active', sig.aspect === 'YELLOW');
            if (lampRed)
                lampRed.classList.toggle('active', sig.aspect === 'RED');
        });
    }
    drawCircuit() {
        const steps = 120;
        // 1. Draw outer sleepers (track ties)
        this.ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const pt = this.getTrackPoint(t);
            const normalAngle = pt.angle + Math.PI / 2;
            const tieLength = 14;
            const tx1 = pt.x + Math.cos(normalAngle) * tieLength;
            const ty1 = pt.y + Math.sin(normalAngle) * tieLength;
            const tx2 = pt.x - Math.cos(normalAngle) * tieLength;
            const ty2 = pt.y - Math.sin(normalAngle) * tieLength;
            this.ctx.moveTo(tx1, ty1);
            this.ctx.lineTo(tx2, ty2);
        }
        this.ctx.strokeStyle = '#1e293b';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        // 2. Draw dual steel rails
        [-6, 6].forEach((offset) => {
            this.ctx.beginPath();
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const pt = this.getTrackPoint(t);
                const normalAngle = pt.angle + Math.PI / 2;
                const rx = pt.x + Math.cos(normalAngle) * offset;
                const ry = pt.y + Math.sin(normalAngle) * offset;
                if (i === 0)
                    this.ctx.moveTo(rx, ry);
                else
                    this.ctx.lineTo(rx, ry);
            }
            this.ctx.closePath();
            this.ctx.strokeStyle = '#334155';
            this.ctx.lineWidth = 2.5;
            this.ctx.stroke();
            // Rail subtle glow
            this.ctx.strokeStyle = 'rgba(0, 210, 255, 0.15)';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        });
        // 3. Draw Stations along the loop
        for (const station of this.stations) {
            const pt = this.getTrackPoint(station.t);
            const normalAngle = pt.angle + Math.PI / 2;
            // Platform rectangle
            const px = pt.x + Math.cos(normalAngle) * 28;
            const py = pt.y + Math.sin(normalAngle) * 28;
            this.ctx.save();
            this.ctx.translate(px, py);
            this.ctx.rotate(pt.angle);
            // Platform body
            this.ctx.fillStyle = '#161e2e';
            this.ctx.strokeStyle = station.color;
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            this.ctx.roundRect(-30, -12, 60, 24, 4);
            this.ctx.fill();
            this.ctx.stroke();
            // Station Name
            this.ctx.fillStyle = '#f8fafc';
            this.ctx.font = '9px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(station.name, 0, -16);
            // Station target badge icon
            this.drawShapeBadge(0, 0, station.shape, 8);
            // Waiting commuters dots
            const qLen = Math.min(station.queue.length, 6);
            for (let q = 0; q < qLen; q++) {
                const qx = -20 + q * 8;
                this.drawShapeBadge(qx, 8, station.queue[q], 4);
            }
            this.ctx.restore();
        }
        // 4. Draw 3-Aspect Signals
        for (const sig of this.signals) {
            const pt = this.getTrackPoint(sig.t);
            const normalAngle = pt.angle - Math.PI / 2;
            const sx = pt.x + Math.cos(normalAngle) * 20;
            const sy = pt.y + Math.sin(normalAngle) * 20;
            this.ctx.save();
            this.ctx.translate(sx, sy);
            // Signal pole
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 7, 0, Math.PI * 2);
            this.ctx.fillStyle = '#0f172a';
            this.ctx.fill();
            this.ctx.lineWidth = 1.5;
            this.ctx.strokeStyle = '#475569';
            this.ctx.stroke();
            // Signal Light Lamp
            const color = sig.aspect === 'GREEN' ? '#00e676' : sig.aspect === 'YELLOW' ? '#ffeb3b' : '#ff1744';
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = color;
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 12;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            this.ctx.restore();
        }
        // 5. Draw Trains & Carriages
        for (const train of this.trains) {
            const carSpacing = 0.024;
            for (let c = 0; c < train.cars; c++) {
                const carT = train.t - c * carSpacing;
                const pt = this.getTrackPoint(carT);
                this.ctx.save();
                this.ctx.translate(pt.x, pt.y);
                this.ctx.rotate(pt.angle);
                // Train body
                const isCab = c === 0;
                const carLen = isCab ? 26 : 22;
                const carWidth = 12;
                this.ctx.fillStyle = isCab ? train.color : '#1e293b';
                this.ctx.strokeStyle = '#0f172a';
                this.ctx.lineWidth = 1.5;
                this.ctx.beginPath();
                this.ctx.roundRect(-carLen / 2, -carWidth / 2, carLen, carWidth, 3);
                this.ctx.fill();
                this.ctx.stroke();
                // Cab Headlights
                if (isCab) {
                    this.ctx.fillStyle = '#fff';
                    this.ctx.shadowColor = '#fff';
                    this.ctx.shadowBlur = 8;
                    this.ctx.fillRect(carLen / 2 - 2, -4, 3, 2);
                    this.ctx.fillRect(carLen / 2 - 2, 2, 3, 2);
                    this.ctx.shadowBlur = 0;
                }
                // Passenger occupancy indicator dot
                if (c < train.passengers.length) {
                    this.drawShapeBadge(0, 0, train.passengers[c], 3);
                }
                this.ctx.restore();
            }
        }
    }
    drawShapeBadge(x, y, shape, size) {
        this.ctx.save();
        this.ctx.translate(x, y);
        if (shape === 'square') {
            this.ctx.fillStyle = '#ff5252';
            this.ctx.fillRect(-size / 2, -size / 2, size, size);
        }
        else if (shape === 'circle') {
            this.ctx.fillStyle = '#448aff';
            this.ctx.beginPath();
            this.ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
        else if (shape === 'triangle') {
            this.ctx.fillStyle = '#ffd740';
            this.ctx.beginPath();
            this.ctx.moveTo(0, -size / 2);
            this.ctx.lineTo(size / 2, size / 2);
            this.ctx.lineTo(-size / 2, size / 2);
            this.ctx.closePath();
            this.ctx.fill();
        }
        else if (shape === 'cross') {
            this.ctx.fillStyle = '#69f0ae';
            this.ctx.fillRect(-size / 2, -size / 6, size, size / 3);
            this.ctx.fillRect(-size / 6, -size / 2, size / 3, size);
        }
        this.ctx.restore();
    }
    animate = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.updateSimulation();
        this.drawCircuit();
        this.animationFrameId = requestAnimationFrame(this.animate);
    };
    destroy() {
        cancelAnimationFrame(this.animationFrameId);
    }
}
//# sourceMappingURL=infinite-loop-canvas.js.map
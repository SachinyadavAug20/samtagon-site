/**
 * Hero Background Canvas Animation
 * Subtle kinetic polygonal grid & pulse streams echoing Samtagon's geometry.
 */

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
}

export class HeroCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private points: Point[] = [];
  private mouse = { x: -1000, y: -1000, radius: 150 };
  private animationFrameId: number = 0;
  private width: number = 0;
  private height: number = 0;

  constructor(canvasId: string) {
    const el = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!el) {
      throw new Error(`Hero canvas with id ${canvasId} not found`);
    }
    this.canvas = el;
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas 2D context not available');
    }
    this.ctx = context;

    this.resize();
    this.initPoints();
    this.bindEvents();
    this.animate();
  }

  private resize(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  private initPoints(): void {
    this.points = [];
    const step = 70;
    const colors = ['#ff6b00', '#00d2ff', '#ffffff'];

    for (let x = 0; x < this.width + step; x += step) {
      for (let y = 0; y < this.height + step; y += step) {
        // Stagger every other column for isometric diamond mesh feel
        const offsetY = (x / step) % 2 === 0 ? 0 : step / 2;
        const py = y + offsetY;
        
        this.points.push({
          x,
          y: py,
          baseX: x,
          baseY: py,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() < 0.2 ? 2.5 : 1.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }
  }

  private bindEvents(): void {
    window.addEventListener('resize', () => {
      this.resize();
      this.initPoints();
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  private animate = (): void => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const time = Date.now() * 0.001;

    // Draw connecting lines
    const maxDist = 90;
    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i];

      // Subtle float
      p1.x = p1.baseX + Math.sin(time + p1.baseY * 0.01) * 6;
      p1.y = p1.baseY + Math.cos(time + p1.baseX * 0.01) * 6;

      // Mouse repulsion
      const dx = this.mouse.x - p1.x;
      const dy = this.mouse.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.mouse.radius) {
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        p1.x -= (dx / dist) * force * 25;
        p1.y -= (dy / dist) * force * 25;
      }

      // Render nearby edges
      for (let j = i + 1; j < this.points.length; j++) {
        const p2 = this.points[j];
        const ex = p1.x - p2.x;
        const ey = p1.y - p2.y;
        const eDist = Math.sqrt(ex * ex + ey * ey);

        if (eDist < maxDist) {
          const alpha = (1 - eDist / maxDist) * 0.12;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }

      // Draw point
      this.ctx.beginPath();
      this.ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p1.color === '#ff6b00' ? 'rgba(255, 107, 0, 0.6)' : 
                           p1.color === '#00d2ff' ? 'rgba(0, 210, 255, 0.5)' : 
                           'rgba(255, 255, 255, 0.25)';
      this.ctx.fill();
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  public destroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }
}

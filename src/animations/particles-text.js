export default class ParticleAnimation {
  constructor(canvas, colors, name1, name2) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { willReadFrequently: true });
    this.colors = colors;
    this.name1 = name1;
    this.name2 = name2;
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.radius = 1;
    this.ww = document.documentElement.clientWidth;
    this.wh = document.documentElement.clientHeight;
    this.mouseRadius = Math.min(this.ww / 10, 80);
    this.initScene();
    this.addEventListeners();
    this.render();
  }

  initScene() {
    this.ww = this.canvas.width = document.documentElement.clientWidth;
    this.wh = this.canvas.height = document.documentElement.clientHeight;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let fontSize = Math.max(this.wh / 11, 60);
    let TextY = this.wh / 2.1;
    let TextX = this.ww / 11.3;
    let difference = this.wh / 10;
    let size = 4;

    if (this.ww <= 600) {
      fontSize = 48;
      TextY = this.wh / 1.435;
      TextX = this.ww / 20;
      size = 3;
      difference = this.ww / 6.3;
    }

    let boldness = 900;

    this.ctx.font = boldness + " " + fontSize + "px Quicksand";

    this.ctx.fillText(this.name1, TextX, TextY);
    this.ctx.fillText(this.name2, TextX, TextY + difference);

    let data = this.ctx.getImageData(0, 0, this.ww, this.wh).data;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = "screen";

    this.particles = [];
    for (let i = 0; i < this.ww; i += size) {
      for (let j = 0; j < this.wh; j += size) {
        if (data[(i + j * this.ww) * 4 + 3] > 0) {
          this.particles.push(new Particle(i, j, this.colors, this.ww, this.wh));
        }
      }
    }
    this.amount = this.particles.length;
  }

  addEventListeners() {
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("touchmove", (e) => this.onTouchMove(e));
    window.addEventListener("click", () => this.onMouseClick());
    window.addEventListener("touchend", () => this.onTouchEnd());
  }

  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  onTouchMove(e) {
    if (e.touches.length > 0) {
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
    }
  }

  onTouchEnd() {
    this.mouse.x = -100;
    this.mouse.y = -100;
  }

  onMouseClick() {
    this.radius++;
    if (this.radius === 3) {
      this.radius = 0;
    }
  }

  resize() {
    if (428 < document.documentElement.clientWidth) {
      this.initScene();
    }
  }

  render() {
    requestAnimationFrame(() => this.render());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.amount; i++) {
      this.particles[i].render(this.ctx, this.mouse, this.radius, this.mouseRadius);
    }
  }
}

class Particle {
  constructor(x, y, color, ww, wh) {
    this.x = -100;
    this.y = wh / 2;
    this.r = 2;
    if (ww <= 414) {
      this.r = 1.2;
      this.y = wh / 1.3;
    }
    this.dest = { x: x, y: y };

    this.vx = (Math.random() - 0.5) * Math.min(ww / 84, 20);
    this.vy = (Math.random() - 0.5) * Math.min(ww / 84, 20);
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * 0.035 + 0.94;
    this.color = color;
  }

  render(ctx, mouse, radius, mouseRadius) {
    this.accX = (this.dest.x - this.x) / 1000;
    this.accY = (this.dest.y - this.y) / 1000;
    this.vx += this.accX;
    this.vy += this.accY;
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    ctx.fill();

    let a = this.x - mouse.x;
    let b = this.y - mouse.y;

    let distance = Math.sqrt(a * a + b * b);

    if (distance < mouseRadius * radius) {
      this.accX = (this.x - mouse.x) / 100;
      this.accY = (this.y - mouse.y) / 100;
      this.vx += this.accX;
      this.vy += this.accY;
    }
  }
}


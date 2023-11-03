let canvas, ctx, particles, amount, mouse, radius, colors, ww, wh, mouseRadius;


function Particle(x, y) {
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
  this.color = colors;
}

Particle.prototype.render = function () {
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
};

// Event Handlers
function onMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e) {
  mouse.x = -100;
  mouse.y = -100;
}

function initScene() {
  ww = canvas.width = document.documentElement.clientWidth;
  wh = canvas.height = document.documentElement.clientHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let fontSize = Math.max(wh / 11, 60);
  let TextY = wh / 2.1;
  let TextX = ww / 11.3;
  let difference = wh / 10;
  let size = 4;

  if (ww <= 428) {
    fontSize = 48;
    TextY = wh / 1.435;
    TextX = ww / 20;
    size = 3;
    difference = ww / 6.3;
  }

  let boldness = 900;

  let name1 = "Archyn";
  let name2 = "Mikhailov"

  ctx.font = boldness + " " + fontSize + "px Quicksand";

  ctx.fillText(name1, TextX, TextY);
  ctx.fillText(name2, TextX, TextY + difference);


  let data = ctx.getImageData(0, 0, ww, wh).data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "screen";

  particles = [];
  for (let i = 0; i < ww; i += size) {
    for (let j = 0; j < wh; j += size) {
      if (data[(i + j * ww) * 4 + 3] > 0) {
        particles.push(new Particle(i, j));
      }
    }
  }
  amount = particles.length;
}

function onMouseClick() {
  radius++;
  if (radius === 3) {
    radius = 0;
  }
}

function resize() {
  if (428 < document.documentElement.clientWidth) {
    initScene();
  }
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < amount; i++) {
    particles[i].render();
  }
}


export function run() {
  canvas = document.querySelector("#canvas1");
  ctx = canvas.getContext('2d', { willReadFrequently: true });
  particles = [];
  mouse = { x: 0, y: 0 };
  radius = 1;
  colors = "#FFF3D2";
  ww = document.documentElement.clientWidth;
  wh = document.documentElement.clientHeight;
  mouseRadius = Math.min(ww / 10, 80);

  // Add event listeners
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchmove", onTouchMove);
  window.addEventListener("click", onMouseClick);
  window.addEventListener("touchend", onTouchEnd);

  initScene();
  requestAnimationFrame(render);
}

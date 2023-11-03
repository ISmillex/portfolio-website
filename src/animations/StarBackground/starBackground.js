export function starBackground() {
    const canvas = document.getElementById('starBackground');
    const context = canvas.getContext('2d');


    const NUM_STARS = 300;
    const SMALL_STAR_SIZE = 0.75;
    const MEDIUM_STAR_SIZE = 1;
    const LARGE_STAR_SIZE = 1.5;

    const SMALL_STAR_SPEED = 1.5;
    const MEDIUM_STAR_SPEED = 1;
    const LARGE_STAR_SPEED = 0.5;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    class Particle {
        constructor(Canvas, size, speed) {
            this.Canvas = Canvas;
            this.size = size;
            this.speed = speed;
            this.x = Math.random() * this.Canvas.width;
            this.y = Math.random() * this.Canvas.height;
            this.isFree = true;
        }

        draw(context) {
            if (!this.isFree) {
                context.fillStyle = "#FFFFFF";
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI*2);
                context.fill();
            }
        }

        update() {
            if (!this.isFree) {
                this.y -= this.speed;
                if (this.y < -this.size) {
                    this.reset();
                }
            }
        }

        reset() {
            this.isFree = true;
        }

        start() {
            this.isFree = false;
            this.x = Math.random() * this.Canvas.width;
            this.y = this.Canvas.height + this.size;
        }

    }

    class StarBackground {

        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.particlePool = [];
            this.particleTimer = 0;
            this.particleInterval = 100;

            this.createParticlePool();
        }
        render(context, deltaTime) {
            if (this.particleTimer > this.particleInterval) {
                const particle = this.getParticle();
                if (particle)
                    particle.start();
                this.particleTimer = 0;
            }
            else  {
                this.particleTimer += deltaTime;
            }

            this.particlePool.forEach(particle => {
                particle.draw(context);
                particle.update();
            });
        }

        getParticle() {
            for (let i=0; i<this.particlePool.length; i++) {
                if (this.particlePool[i].isFree) {
                    return this.particlePool[i];
                }
            }
        }

        createParticlePool() {
            for (let i = 0; i < NUM_STARS; i++) {
                let size, speed;
                const random = Math.random();
                if (random < 0.33) {
                    size = SMALL_STAR_SIZE * canvas.height/1000;
                    speed = (SMALL_STAR_SPEED + Math.random() * 0.2) * canvas.height/1000;
                } else if (random < 0.66) {
                    size = MEDIUM_STAR_SIZE * canvas.height/1000;
                    speed = (MEDIUM_STAR_SPEED + Math.random() * 0.2) * canvas.height/1000;
                } else {
                    size = LARGE_STAR_SIZE * canvas.height/1000;
                    speed = (LARGE_STAR_SPEED + Math.random() * 0.2) * canvas.height/1000;
                }
                this.particlePool.push(new Particle(this, size, speed));
            }
        }
    }

    const starBackground = new StarBackground(canvas.width, canvas.height);

    let lastStamp = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastStamp;
        lastStamp = timeStamp;
        context.clearRect(0,0, canvas.width, canvas.height);
        starBackground.render(context, deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
}

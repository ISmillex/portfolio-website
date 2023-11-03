<script>
	let myImg = new Image();
	myImg.src = "3.png";

	myImg.onload = function pixelrain() {
		const canvas = document.getElementById('pixelrain');
		const ctx = canvas.getContext('2d');

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		ctx.drawImage(myImg, 0, 0, canvas.width, canvas.height);
		const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const mappedImage = [];
		for (let y = 0; y < canvas.height; y++) {
			const row = [];
			for (let x = 0; x < canvas.width; x++) {
				const red = pixels.data[y * 4 * pixels.width + x * 4];
				const green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
				const blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];
				const brightness = calculateRelativeBrightness(red, green, blue);
				row.push(brightness);
			}
			mappedImage.push(row);
		}

		function calculateRelativeBrightness(red, green, blue) {
			return Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114) / 100;
		}

		class Particle {
			constructor() {
				this.x = Math.random() * canvas.width;
				this.y = 0;
				this.speed = 0;
				this.velo = Math.random() * 0.5;
				this.size = Math.random() * Msize + 0.5;
				this.position1 = Math.floor(this.y);
				this.position2 = Math.floor(this.x);
			}
			update() {
				this.position1 = Math.floor(this.y);
				this.position2 = Math.floor(this.x);

				this.speed = mappedImage[this.position1][this.position2];
				const movement = (2.5 - this.speed + this.velo) * Mspeed;

				this.y += movement;

				if (this.y > canvas.height) {
					this.y = 0;
					this.x = Math.random() * canvas.width;
				}
			}
			draw() {
				ctx.beginPath();
				ctx.fillStyle = '#FFF3E2';
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		let particlesArr = [];
		let numOfParticles = 12000;
		let Msize = 1;
		let Mspeed = 2;

		if (window.innerWidth < 800) {
			numOfParticles = 8000;
			Msize = 1;
			Mspeed = Math.round(window.innerHeight / 333.5);
		}

		function init() {
			for (let i = 0; i < numOfParticles; i++) {
				particlesArr.push(new Particle());
			}
		}

		function animate() {
			ctx.globalAlpha = 1;
			ctx.fillStyle = 'rgb(21, 20, 42)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			for (let i = 0; i < particlesArr.length; i++) {
				particlesArr[i].update();
				ctx.globalAlpha = particlesArr[i].speed * 0.4;
				particlesArr[i].draw();
			}
			requestAnimationFrame(animate);
		}

		init();
		animate();
	};

	let canvasW = Math.round(window.innerWidth * 0.44);
	let canvasH = Math.round(window.innerWidth * 0.47);

	if (window.innerWidth <= 500) {
		canvasW = Math.round(window.innerHeight * 0.50);
		canvasH = Math.round(window.innerHeight * 0.54);
	}
</script>

<canvas id="pixelrain" style="width: {canvasW}px; height: {canvasH}px" />

<style>
	#pixelrain {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		outline: #15142A 5px solid;
		outline-offset: -5px;
	}
</style>

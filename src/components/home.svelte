<script>
	import StarBackground from '../animations/StarBackground/starBackground.svelte';
	import TypeWritter from '../animations/typeWritter.svelte';
	import ParticleText from '../animations/ParticlesText/particlesText.svelte';

	let innerWidth;
	let innerHeight;

	let posMoonLight = {x:0, y:0};
	let posText = {x:0, y:0}

	function mouseHandler(event) {
		posText.x = (innerWidth - event.x) / 100;
		posText.y = (innerHeight - event.y) / 100;
		posMoonLight.x = (event.x - innerWidth) / 50;
		posMoonLight.y = (event.y - innerHeight) / 50;
	}




</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="home" on:mousemove={mouseHandler}>
	<ParticleText />
	<StarBackground />

	<div class="scroll">JUSTDOIT</div>


	<div class="home-content-center">
		<div class="home-content">
			<div class="text-1">Hello, I am known as</div>
			<div class="text-3"><TypeWritter /></div>
		</div>
	</div>
	<div class="moonlight-container">
		<img src ="moonlight.svg" alt="moonlight" style="transform: translate({posMoonLight.x}px, {posMoonLight.y}px);" />
	</div>
	<div class="moon-content-center">
		<div class="container">
			<div class="moon-content">
				<div class="parallax-container" style="transform: translate({posText.x}px, {posText.y}px);">
					<div class="text-1" style="color: var(--second-color);">PORTFOLIO</div>
				</div>
				<div class="moon" id="moon">
					<div class="moonPhase"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>


	.home {
		height: 100vh;
		width: 100vw;
		position: relative;
		display: flex;
		color: var(--third-color);
		align-items: center;
		overflow: hidden;
		margin: 0;
		padding: 0;
		z-index: 20;
	}

	.home-content-center {
		position: absolute;
		top: 50%;
		left: 9%;
		transform: translateY(-50%);
	}

	.home-content {
		position: relative;
		--translateXStart: -300%;
		--transleteXEnd: 0%;
	}

	.home-content .text-1 {
		font-size: max(1.6vw, 20.25px);
		margin-bottom: 20vh;
		font-weight: 900;
	}

	.home-content .text-3 {
		font-size: max(2.39vw, 30px);
		font-weight: 900;
	}


	.moonlight-container {
		position: absolute;
		display: flex;
		left: 2%;
		width: 150vw;
		height: 150vh;
	}
	img {
		width: 100%;
		height: 100%;		
	}

	.scroll {
		position: absolute;
		bottom: 80px;
		left: 20px;
		line-height: 1;
		letter-spacing: 4.8px;
		font-size: max(0.7vw, 8px);
        writing-mode: vertical-lr;
        color: var(--third-color);
		font-weight: 400;
	}

	.scroll::after {
		content: "";
		width: 2px;
		height: max(3.80vw, 32px);
		background: var(--accent-color);
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: -80px;
	}


	.moon-content-center {
		position: absolute;
		top: 50%;
		right: 9%;
		z-index: -9;
		transform: translateY(-50%);
	}

	.container {
		background: transparent;
		overflow: hidden;
	}

	.moon-content {
		position: relative;
		height: max(29.76vw, 350px);
		width: max(29.76vw, 350px);
		display: flex;
		animation: 4s infinite alternate 1s rotate;
		--rotateStart: 0deg;
		--rotateEnd: -40deg;
	}

	.moon-content .parallax-container {
		display: flex;
		z-index: 3;
	}

	.moon-content .text-1 {
		position: absolute;
		font-size: max(2.97vw, 35px);
		font-weight: 500;
		z-index: 3;
		font-family: 'Cinzel', serif;
		margin-left: max(3.86vw, 45.5px);
		margin-top: max(10vw, 117.6px);
		animation: 4s infinite alternate 1s rotate;
		--rotateStart: 0deg;
		--rotateEnd: 40deg;
	}

	.moon-content .moon {
		height: max(29.76vw, 350px);
		width: max(29.76vw, 350px);
		position: absolute;
		background-color: var(--third-color);
		border-radius: 50%;
		z-index: -4;
	}

	.moon-content .moonPhase {
		animation: 4s infinite alternate 1s changewidth;
		width: max(27.97vw, 329px);
		height: max(27.97vw, 329px);
		position: absolute;
		background: var(--main-color);
		z-index: -3;
		border-radius: 50%;
		transform-origin: top left;
	}

	@keyframes rotate {
		from {
			transform: rotate(var(--rotateStart));
		}
		to {
			transform: rotate(var(--rotateEnd));
		}
	}

	@keyframes changewidth {
		to {
			transform: scale(0.85);
		}
	}


	@media screen and (max-width: 428px) {
		.home {
			min-height: -webkit-fill-available;
			min-height: -moz-fill-available;
			min-height: -o-fill-available;
			min-height: fill-available;
		}

		.scroll {
			bottom: 30px;
			left: 5px;
			font-size: 6px;
			letter-spacing: 4px;
		}


		.scroll::after {
			width: 1px;
			height: 32px;
			bottom: -40px;
		}


		.home-content-center {
			top: 72%;
			left: 5%;
		}

		.moonlight-container {
			bottom: -10%;
			left: -5%;
		}

		.home-content .text-1 {
			font-size: 16.2px;
			margin-bottom: 130px;
			/* margin-left: 3px; */
		}

		.home-content .text-3 {
			font-size: 24px;
		}

		.moon-content-center {
			top: 35%;
			right: 5%;
		}

		.moon-content {
			width: max(11.9vw, 200px);
			height: 200px;
		}

		.moon-content .text-1 {
			font-size: 20px;
			margin-left: 27.2px;
			margin-top: 67.2px;
		}

		.moon-content .moon {
			height: 200px;
			width: 200px;
		}

		.moon-content .moonPhase {
			width: 188px;
			height: 188px;
		}
	}
</style>

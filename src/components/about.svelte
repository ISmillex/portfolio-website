<script>
	import Scroll from './scroll.svelte';
	import TagCloud from '../animations/TagCloud/TagCloud.svelte';

	// function handleClick() {
	// 	document.body.scrollIntoView();
	// }

</script>

<div class="about-content">
<!--	<Scroll/>-->
	<div class="wrapper">
		<div class="text-content">
			<div class="title">Me, Myself and I</div>
			<p>
				Hello, I am Archyn, a dedicated Computer Engineering student from Ankara, Turkey, with roots from Kazakhstan and Yakutia.<br><br>
				Over the past half-decade, I have immersed myself in the fields of web design, app and game development, robotics, and electronics, diligently honing my skills with each passing day.
				In the adjacent cloud, you will find a comprehensive list of the technologies and programming languages that I have acquired.
				In my spare time i enjoy wood and leather crafting as well as photography and also doing sports.
			</p>
			<a href="about">Read more about me</a>
			<span>or</span>
			<a href="projects">View my projects</a>
		</div>
		<TagCloud />
	</div>
</div>

<style>

	.about-content {
		min-height: 100vh;
		width: 100%;
		display: flex;
		position: relative;
		overflow: hidden;
	}

	.about-content:after {
		content: 'ABOUT';
		position: absolute;
		font-family: 'Cinzel', serif;
		z-index: 1;
		font-size: max(17.9vw, 100px);
		top: 0;
		left: 0;
		color: var(--fourth-color);
		opacity: 0.12;
		/* opacity: 0.05; */
	}

	.wrapper {
		height: 100%;
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: auto;
		position: relative;
	}

	.title {
		font-size: max(3.8vw, 40px);
		font-weight: 600;
		margin-bottom: 1.2vw;
		color: var(--third-color);
	}


	p {
		max-width: max(44vw, 750px);
		font-size: max(1.2vw, 15px);
		color: var(--second-color);
	}

	

	a {
		text-decoration: none;
		font-weight: 500;
		color: var(--accent-color);
		font-size: max(1.07vw, 12px);
		margin-bottom: 5px;
	}

	a:hover {
		text-decoration: underline;
	}

	span {
		font-size: max(0.95vw, 10px);
		color: var(--second-color);
		margin-left: 8px;
		margin-right: 8px;
	}


	@media screen and (max-width: 900px) {

		.wrapper {
			flex-direction: column;
		}

		.text-content {
			margin-top: 70px;
			margin-bottom: 70px;
		}

		.text-content a {
			text-align: center;
		}

	}
</style>

<script>
	import Slider from '../../components/slider.svelte'
	import {onMount} from "svelte";

	let show = true;

	onMount(() => {
		setTimeout(() => {
			show = !show;
		}, 3000);
	});

</script>


<div class="about-content">
	<div class="full-screen-container" style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) no-repeat center / cover, url('about.jpg') no-repeat center / cover">
		<section style="width: 75vw; transition: opacity 2s;" class:hidden={show}>
			<p class="title" style="color: #CDCDCD;">ME, MYSELF AND I</p>
			<p class="text" style="color: #EBEBEB;">My name is Archyn Mikhailov, a computer engineering student from Ankara with roots in Kazakhstan and Yakutsk, Republic of Sakha - the coldest city in the world.</p>
			<p class="sub-text" style="color: #CDCDCD;"> I am on a journey to pursue my dreams, live my life to the fullest, and make a difference in the world through my skills and knowledge.</p>
		</section>
	</div>
	<div class="wrapper">
<!--		<Slider width={1288} height={724} photos={["/about-slider/1.jpg", "/about-slider/2.jpg", "/about-slider/3.jpg", "/about-slider/4.jpg", "/about-slider/5.jpg", "/about-slider/6.jpg", "/about-slider/7.jpg",  "/about-slider/8.jpg", "/about-slider/9.jpg"]}/>-->


		<section>
			<p class="title">WHO I AM</p>
			<p class="text">Born in Moscow, raised in Yakutia, formative years in Turkey, i see myself as person of a world, with 4 proficient languages: English, Russian, Turkish, Sakha and cultural experience both gained from living and vising many cultures and counties, and gained disciple from competitive swimming for 13+ years, i can easily adapt to any environment and pursue my goals.</p>
			<p class="sub-text">I believe my diverse background and experiences have equipped me with a unique perspective and a strong sense of adaptability, enabling me to navigate various challenges and contribute positively to any community or team I am a part of.</p>
		</section>

		<section>
			<p class="title">Technologies and Programming Languages</p>
			<p class="text">I am a on they way to become dedicated full-stack developer with commitment to crafting visually appealing and functional websites and applications. My experience covers a wide range of essential technologies and programming languages, including HTML, CSS, JavaScript, and SQL. Moreover, I have a solid foundation in frameworks like SvelteKit, TauriJS and CapacitorJS. In addition to web development, I possess proficient skills in Java, Python, and C.</p>

			<div class="languages">
				<div class="block">
					<div class="row">
						<i class="devicon-java-plain"></i>
						<i class="devicon-python-plain"></i>
						<i class="devicon-javascript-plain"></i>
						<i class="devicon-c-plain"></i>
						<i class="devicon-bash-plain"></i>
					</div>
					<div class="row">
						<i class="devicon-rust-plain"></i>
						<i class="devicon-typescript-plain"></i>
						<i class="devicon-kotlin-plain"></i>
						<i class="devicon-go-plain"></i>
					</div>
				</div>
				<div class="block">
					<div class="row">
						<i class="devicon-graphql-plain"></i>
						<i class="devicon-sqlite-plain"></i>
						<i class="devicon-svelte-plain"></i>
						<i class="devicon-godot-plain"></i>
					</div>
					<div class="row">
						<i class="devicon-git-plain"></i>
						<i class="devicon-matlab-plain"></i>
						<i class="devicon-html5-plain-wordmark"></i>
						<i class="devicon-nginx-original"></i>
						<i class="devicon-css3-plain-wordmark"></i>
					</div>
				</div>
			</div>

			<p class="sub-text">Currently, I am actively engaged in furthering my knowledge in robotics, machine learning and mastering data structures and algorithms. I am also interested in blockchain and game development.</p>
			<div class="links">
				<a href="/cv.pdf">Download my CV</a>
				<span>or</span>
				<a href="projects">View my projects</a>
			</div>

		</section>
		<section>
			<p class="title">EXPERIENCE</p>
			<p class="text">While my current career experience may not be extensive, I am actively working to enhance my skill set and am confident that I will gain valuable expertise in the near future.</p>
			<p class="sub-text">I am dedicated to continuous learning and self-improvement, actively engaging in workshops and online courses to expand my knowledge base and become a more versatile person.</p>

			<div class="table">
				<div class="row">
					<div class="title">Laserwar Turizm E-Ticaret Ltd. Şti.</div>
					<div class="info">Full stack Developer</div>
					<div class="date">May 2022 – July 2023</div>
				</div>
				<div class="row">
					<div class="title">Luminous Robotics</div>
					<div class="info">Teaching Assistance and Mentor</div>
					<div class="date">Mar 2021 – May 2022</div>
				</div>
				<div class="row">
					<div class="title">Luminous Robotics</div>
					<div class="info">Head of the Mechanics and Programming</div>
					<div class="date">Sep 2019 – May 2022</div>
				</div>
				<div class="row">
					<div class="title">Veraconn Teknoloji A.Ş.</div>
					<div class="info">Summer Internship</div>
					<div class="date">Jun 2019 – Aug 2019</div>
				</div>
			</div>
		</section>
		<section style="margin-bottom: 0">
			<p class="title">Hobbies</p>
			<p class="text">I'm deeply passionate about several interests. Foremost, I'm an enthusiastic crafter. With a meticulous eye for detail, I derive immense satisfaction when crafting tools and items, especially those crafted from wood and leather.</p>
			<p class="sub-text">Currently, my focus lies in the intricate world of leatherwork, creating pieces that are both aesthetically pleasing and practical.</p>
		</section>
		<Slider photos={["/about-slider-hobby/1.jpg", "/about-slider-hobby/2.jpg", "/about-slider-hobby/3.jpg","/about-slider-hobby/4.jpg","/about-slider-hobby/6.jpg","/about-slider-hobby/5.jpg", "/about-slider-hobby/7.jpg", "/about-slider-hobby/8.jpg", "/about-slider-hobby/11.jpg", "/about-slider-hobby/9.jpg", "/about-slider-hobby/10.jpg"]}/>
		<section style="margin-bottom: 15vw">
			<h2 class="title">Sports</h2>
			<p class="text">In addition to my creative pursuits, swimming has been an integral part of my life since I was 7 years old. With an impressive 13 years of experience, it remains an important source of physical fitness and a testament to my personal discipline. This journey continues to shape my character and instill valuable life lessons, both in and out of the water.</p>
			<p class="sub-text">I also actively engaged in calisthenics and fitness to further enhance my overall physical well-being.</p>
		</section>
	</div>
</div>


<style>

:root {
        --main-color: #15142A;
		--second-color: #FFF3E2;
		--third-color: #e0d3af;
		--fourth-color: #4a5c80;
		--accent-color: #A18F7C;
	}

	.about-content {
		height: fit-content;
		width: 100%;
		position: relative;
	}

	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		margin: auto;
	}

	.full-screen-container {
		width: 100%;
		height: 100vh;
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
	}

	.hidden {
		opacity: 0;
		transform: scale(1.2);
	}

	section {
		width: 80%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin: 5vw auto 8vw;
	}

	.title {
		display: flex;
		position: relative;
		letter-spacing: 4px;
		font-size: 15px;
		color: #878a8f;

	}

	.text {
		margin-top: 20px;
		display: flex;
		position: relative;
		font-size: 40px;
		font-weight: 800;
		text-align: center;

	}

	.sub-text {
		width: 85%;
		font-size: 20px;
		margin: 0;
		color: #878a8f;
		font-weight: 500;
		text-align: center;
	}

	.links {
		width: 100%;
		display: flex;
		position: relative;
		align-items: center;
		text-align: center;
		justify-content: center;
		margin-top: 20px;
	}

	.links a {
		text-decoration: none;
		font-weight: 700;
		color: black;
		font-size: max(1.07vw, 12px);
		margin-bottom: 5px;
	}

	.links a:hover {
		text-decoration: underline;
		color: purple;
	}

	span {
		font-size: max(0.95vw, 10px);
		color: #878a8f;
		margin-left: 8px;
		margin-right: 8px;
	}

	.languages {
		width: 70%;
		display: flex;
		position: relative;
		align-items: center;
		text-align: center;
		justify-content: space-between;
		margin-bottom: 50px;
	}

	.block {
		width: 45%;
		height: 200px;
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: center;
		justify-content: space-between;
	}

	.block .row {
		width: 100%;
		height: 50%;
		display: flex;
		position: relative;
		align-items: center;
		justify-content: space-evenly;
	}

	.block i {
		font-size: 40px;
		color: black;
		transition: 0.2s;
	}

	.block i:hover {
		color: purple;
		transition: 0.2s;
		transform: scale(1.3);
	}

	.table {
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: center;
		text-align: center;
		justify-content: space-between;
		margin-top: 10vh;
		margin-left: 5%;
	}

	.row {
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: row;
		position: relative;
		align-items: flex-start;
		text-align: center;
		justify-content: space-between;
		margin-bottom: 2vh;
	}

	.row .title {
		width: 20%;
		font-size: 20px;
		font-weight: 700;
		margin-bottom: 15px;
		text-align: left;
		color: black;
	}

	.row .info {
		width: 35%;
		font-size: 20px;
		font-weight: 500;
		margin-bottom: 15px;
		text-align: left;
		color: #878a8f;

	}

	.row .date {
		width: 20%;
		font-size: 20px;
		font-weight: 500;
		margin-bottom: 15px;
		text-align: left;
		color: #878a8f;

	}

	@media screen and (max-width: 600px){
		.wrapper {
			width: 90%;
		}

		.full-screen-container {
			width: 100%;
			height: 100vh;
			display: flex;
			position: relative;
			align-items: center;
			justify-content: center;
		}

		section {
			width: 100%;
			height: fit-content;
			display: flex;
			margin-top: 5vw;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}


		.container {
			width: 100%;
		}
		.title {
			font-size: 12px;
		}
		.text {
			font-size: 25px;
		}
		.sub-text {
			font-size: 15px;
		}
		.section a {
			font-size: 12px;
		}
		.section {
			flex-direction: column;
		}
		span {
			font-size: 10px;
		}

		.languages {
			width: 100%;
			flex-direction: column;
		}
		.block {
			width: 100%;
			height: 100%;
			margin-top: 25px;
			margin-bottom: 25px;
		}

		.block:nth-child(2) {
			margin-bottom: 0;
		}

		.block .row {
			width: 100%;
			height: 50%;
			display: flex;
			position: relative;
			align-items: center;
			justify-content: space-evenly;
			margin-bottom: 15px;
		}
		.block i {
			font-size: 30px;
		}

		.table {
			width: 100%;
			height: fit-content;
			display: flex;
			flex-direction: column;
			position: relative;
			align-items: center;
			text-align: center;
			justify-content: space-between;
			margin-top: 10vh;
			margin-left: 0;
		}

		.table .row {
			width: 90%;
			height: fit-content;
			display: flex;
			flex-direction: column;
			position: relative;
			align-items: flex-start;
			text-align: center;
			justify-content: space-between;
			margin-bottom: 2vh;
		}

		.row .title {
			width: 100%;
			font-size: 13px;
			font-weight: 700;
			margin-bottom: 10px;
			text-align: left;
			color: black;
		}

		.row .info {
			width: 100%;
			font-size: 13px;
			font-weight: 500;
			margin-bottom: 10px;
			text-align: left;
			color: #878a8f;

		}

		.row .date {
			width: 100%;
			font-size: 13px;
			font-weight: 500;
			margin-bottom: 10px;
			text-align: left;
			color: #878a8f;

		}
	}

</style>

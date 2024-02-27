<script>
	import projects from "$lib/projects.json"
	import TypeWritterOnce from "../animations/type-writter-once.svelte"

	let selected = 0;

	function handleHover(event) {
		let target = event.target;
		let title = target.querySelector('.title');
		selected = target.id;
		if (event.type === 'mouseenter') {
			title.style.transform = 'translateX(40%) scale(1.4) rotateZ(2deg)';
			title.style.color = 'var(--second-color)';
		} else if (event.type === 'mouseleave') {
			title.style.transform = 'translateX(0%) scale(1) rotateZ(0deg)';
			title.style.color = 'var(--accent-color)';
		}
	}

</script>


<div class="projects-content">
	<div class="wrapper">
		<div class="projects-list">
			<div class="main-title" style="margin-bottom: 30px">Projects</div>
			<div class="description">A list of my recent projects, <a href="/projects">see all projects</a></div>


			{#each projects.slice(0,10) as project}
				<div class="project" id={project.id} on:mouseenter={handleHover} on:mouseleave={handleHover}>
					<a href="/projects?id={project.id}">
						<div class="title"  >{project.shortname}</div>
					</a>
				</div>
			{/each}
		</div>

		<div class="projects-description">
			<div class="title"><TypeWritterOnce text={projects[selected].name} color="#e0d3af"/> </div>
			<div class="date"><TypeWritterOnce text={projects[selected].startDate} color="#A18F7C"/> </div>
			<p><TypeWritterOnce text={projects[selected].shortDescription} color="#FFF3E2"/></p>
		</div>

	</div>

</div>

<style>

	.projects-content {
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
		position: relative;
		overflow: hidden;
	}

	.projects-content::after {
		content: 'WORK';
		position: absolute;
		display: inline-flex;
		z-index: 1;
		font-family: 'Cinzel', serif;
		font-size: max(17.9vw, 100px);
		top: 100px;
		right: 0;
		color: var(--fourth-color);
		opacity: 0.12;
	}

	p {
		max-width: max(44vw, 750px);
		font-size: max(1.2vw, 20px);
		color: var(--second-color);
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

	.main-title {
		font-size: max(3.8vw, 40px);
		font-weight: 800;
		color: var(--third-color);
		margin-bottom: max(4.762vw, 80px);
	}

	.projects-list {
		width: 50%;
		display: flex;
		flex-direction: column;
		margin-left: 5px;
	}

	.projects-list .description {
		font-size: 18px;
		color: var(--second-color);
		text-align: left;
		margin-bottom: 30px;
		margin-left: 5px;
	}

	.projects-list .description a {
		color: var(--accent-color);
		text-decoration: none;
	}

	.projects-list .description a:hover {
		text-decoration: underline;
	}

	.projects-list .project {
		width: max(29.7vw, 300px);
		/*background-color: var(--fourth-color);*/
	}

	.project a {
		text-decoration: none;
	}

	.project .title {
		text-decoration: none;
		font-size: max(2.4vw, 25px);
		font-weight: 500;
		color: var(--accent-color);
		letter-spacing: 3px;
		transition: 0.5s;
		padding-top: 10px;
	}

	.projects-description {
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 35%;
	}

	.projects-description .title {
		font-size: max(1.2vw, 15px);
		font-weight: 800;
		color: var(--third-color);
		text-align: center;
		margin-bottom: 10px;
	}

	.projects-description .date {
		font-size: max(0.89vw, 12px);
		text-align: left;
		font-weight: 500;
		color: var(--accent-color);
	}

	.projects-description p {
		max-width:max(44vw,750px);
		font-size:max(1.2vw,20px);
		color:var(--second-color);
		line-height: 1.5;
	}

	@media screen and (max-width: 600px) {

		.projects-content {
			height: fit-content;
			padding-top: 15vh;
			padding-bottom: 15vh;
		}

		.projects-description {
			display: none;
		}

		.projects-list .description{
			width: 200%;
			margin-bottom: 20px;
			font-size: 14px;
		}

		.main-title {
			margin-bottom: 20px;
		}

		.projects-content::after {
			font-size: 120px;
			top: 42%;
			right: -37%;
			transform: rotate(-90deg);
		}


	}


</style>

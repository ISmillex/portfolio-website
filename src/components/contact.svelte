<script>
	import {stores} from "$lib/stores.js";

	let color, secondaryColor, borderColor;

	$: {
		color = $stores.backgroundColor === '#FFFFFF' ? '#000000' : '#e0d3af';
		secondaryColor = $stores.backgroundColor === '#FFFFFF' ? '#FFFFFF' : '#15142A';
		borderColor = $stores.backgroundColor === '#FFFFFF' ? '#000000' : '#FFF3E2';
	}

	function handleHover(event) {
		const button = event.target;
		if (event.type === 'mouseenter') {
			button.style.backgroundColor = color;
			button.style.color = secondaryColor;
		} else {
			button.style.backgroundColor = secondaryColor;
			button.style.color = color;
		}
	}
</script>

<div class="contact-content">
	<div class="text-content">
		<div class="text-1" style="color: {color}; font-weight: {$stores.backgroundColor === '#FFFFFF'? '400' : '600'};">Contact</div>
		<div class="form">
			<div class="row-1">
				<input name="name" type="text" class="feedback-input" id="name" placeholder="Name"
					   style="color: {color}; border-bottom: 1px solid {borderColor}"/>
				<input name="email" type="text" class="feedback-input" placeholder="Email"
					   style="color: {color}; border-bottom: 1px solid {borderColor}"/>
			</div>
			<input name="subject" type="text" class="feedback-input" placeholder="Subject"
				   style="color: {color}; border-bottom: 1px solid {borderColor}"/>
			<textarea name="text" class="feedback-input" placeholder="Message"
					  style="color: {color}; border-bottom: 1px solid {borderColor}"/>
			<input type="submit" value="Send message!"
				   style="color: {color}; border: 1px solid {borderColor}"
				   on:mouseenter={handleHover}
				   on:mouseleave={handleHover} />
		</div>
	</div>
	<div class="map">
		{#if $stores.backgroundColor === '#FFFFFF'}
			<img src="/map-black.svg" alt="">
		{:else}
			<img src="/map.svg" alt="">
		{/if}
		<div class='pin' style="background-color: {$stores.backgroundColor === '#FFFFFF' ? '#FFFFFF': '#4a5c80'}"></div>
	</div>
</div>


<style>


	.contact-content {
		height: 100vh;
		width: 100%;
		display: flex;
		position: relative;
		overflow: hidden;
	}

	.contact-content:after {
		content: 'CONTACT';
		position: absolute;
		font-family: 'Cinzel', serif;
		z-index: 1;
		font-size: max(17.9vw, 80px);
		top: 20vh;
		left: 0;
		color: var(--fourth-color);
		opacity: 0.12;
	}

	.text-content {
		/* background-color: tomato; */
		/*margin: auto;*/
		margin-left: 4.5vw;
		margin-top: 15vw;
	}

	.text-1 {
		font-size: max(3.8vw,40px);
		font-weight: 600;
	}

	.form {
		position: absolute;
		margin-top: 5vh;
		margin-right: 8vw;
		width: 600px;
	}

	.row-1 {
		display: flex;
		flex-direction: row;
	}

	.feedback-input {
		font-weight: 500;
		font-size: max(1.07vw, 9px);
		line-height: max(1.3vw, 11px);
		background-color: transparent;
		border: none;
		letter-spacing: 3px;
		transition: 0.3s;
		padding: max(0.77vw, 6.5px);
		margin-bottom: max(0.89vw, 7.5px);
		width: 100%;
		outline: none;
	}

	#name {
		margin-right: max(0.89vw, 7.5px);
	}


	textarea {
		height: 150px;
		line-height: 150%;
		resize: vertical;
	}

	input {
		border: none;
	}

	[type='submit'] {
		width: 50%;
		float: right;
		background: transparent;
		font-size: max(1.07vw, 9px);
		font-weight: 500;
		margin-top: max(1.19vw, 10px);
		padding: max(0.6vw, 6.5px);
		letter-spacing: 3px;
		transition: 0.3s;
	}
	[type='submit']:hover {
		transition: 0.3s;
		background-color: var(--third-color);
		color: black;
	}

	.map {
		width: 800px;
		height: 900px;
		position: absolute;
		right: 0;
		z-index: 1;
		transform: rotateZ(10deg);
	}

	.map img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.pin {
		width: 30px;
		height: 30px;
		border-radius: 50% 50% 50% 0;
		/*background: var(--fourth-color);*/
		position: absolute;
		transform: rotate(-45deg);
		right: 18%;
		bottom: 8%;
		margin: -20px 0 0 -20px;
	}

	.pin::after {
		content: '';
		width: 14px;
		height: 14px;
		margin: 8px 0 0 8px;
		background: var(--main-color);
		position: absolute;
		border-radius: 50%;
	}


	@media screen and (max-width: 900px) {
		.contact-content {
			min-height: 100vh;
		}

		.text-content {
			margin-top: 50%;
		}

		.form {
			position: relative;
			width: 80%;
		}

		.contact-content:after {
			top: 48%;
		}

		.map {
			display: none;
		}

	}
</style>

<script>
	import { stores } from '$lib/stores.js';

	let color, borderColor, secondaryColor;

	$: {
		color = $stores.backgroundColor === '#FFFFFF' ? '#000000' : '#e0d3af';
		borderColor =
			$stores.backgroundColor === '#FFFFFF' ? '0.5px solid #878a8f' : '1px solid #FFF3E2';
		secondaryColor = $stores.backgroundColor === '#FFFFFF' ? '#878a8f' : '#FFF3E2';
	}
</script>

<div class="footer">
	<div class="text-content" style="border-top: {borderColor}">
		<div class="content-1">
			<div class="title" style="color: {color}">Contact information</div>
			<div class="main-text" style="color: {secondaryColor}">
				Feel free to reach out to me any time and through any social media, email or phone.<br /><br
				/>
				E:archynlegentey@gmail.com<br />
				P:+90-537-593-87-28
			</div>
		</div>
		<div class="content-2">
			<div class="title" style="color: {color}">Current status</div>
			<div class="main-text" style="color: {secondaryColor}">
				One day or day one ?
			</div>
		</div>
		<div class="content-3">
			<div class="title" style="color: {color}">Links</div>
			<div class="main-text-2">
				<div class="row">
					<a
						class="link"
						style="color: {secondaryColor}"
						href="https://www.instagram.com/archyn_mikhailov/">Instagram</a
					>
					<a
						class="link"
						style="color: {secondaryColor}"
						href="https://www.linkedin.com/in/archyn-mikhailov/">LinkedIn</a
					>
				</div>
				<div class="row">
					<a
						class="link"
						style="color: {secondaryColor}"
						href="https://discordapp.com/users/632250444370018365">Discord</a
					>
					<a class="link" style="color: {secondaryColor}" href="https://github.com/ISmillex"
						>Github</a
					>
				</div>
				<div class="row">
					<a class="link" style="color: {secondaryColor}" href="https://t.me/ISmilex">Telegram</a>
				</div>
			</div>
		</div>
		<div class="fake-content" />
		<div class="main-text-3" style="color: {secondaryColor}">
			© 2020 - 2023 Archyn Mikhailov. Made with ♥ in Ankara, Turkey.
		</div>
	</div>
</div>

<style>
	.footer {
		min-height: 50vh;
		width: 100%;
        padding-top: 10%;
		position: relative;
		background-color: transparent;
	}

	.text-content {
		margin: auto;
		padding-top: max(4.4vw, 74px);
		width: 90%;
		max-width: 2560px;
		display: grid;
		grid-template-columns: 40% 35% 25%;
		border-top: 1px solid var(--second-color);
	}

	.content-1 {
		margin-right: 100px;
	}
	.content-2 {
		margin-right: 100px;
	}
	.content-3 {
		margin-right: 100px;
	}

	.title {
		font-size: max(1.36vw, 23px);
		font-weight: 600;
	}

	.main-text {
		padding-top: max(0.89vw, 15px);
		font-size: max(0.89vw, 15px);
		font-weight: 500;
	}

	.main-text-2 {
		display: flex;
		font-size: max(0.71vw, 12px);
		padding-top: max(0.89vw, 15px);
	}

	.main-text-2 .row {
		display: flex;
		flex-direction: column;
		margin-right: 30px;
	}

	.row .link {
		text-decoration: none;
		font-size: max(0.89vw, 15px);
		padding-bottom: max(0.3vw, 5px);
	}

	.main-text-3 {
		width: 90%;
		position: absolute;
		font-size: max(0.8vw, 8px);
		bottom: 0;
		margin-bottom: 30px;
	}

	@media screen and (max-width: 700px) {
		.text-content {
			grid-template-columns: 60% 40%;
		}
		.content-1 {
			margin-right: 100px;
		}
		.content-2 {
			margin-right: 100px;
		}
		.content-3 {
			margin-right: 100px;
		}
		.main-text-3 {
			margin-top: 0;
		}
	}

	@media screen and (max-width: 500px) {
		.footer {
			min-height: fit-content;
			min-height: -moz-fit-content;
		}

		.text-content {
			width: 90%;
			display: block;
			margin: auto;
			/* margin-top: 200px; */
		}

		.title {
			font-size: 20px;
		}

		.content-1 {
			margin: 0;
			margin-bottom: 80px;
		}
		.content-2 {
			margin: 0;
			margin-bottom: 80px;
		}
		.content-3 {
			margin: 0;
			margin-bottom: 100px;
		}

		.main-text {
			font-size: 12px;
		}
		.main-text-2 .link {
			font-size: 12px;
		}
		.fake-content {
			width: 100%;
			height: 1px;
		}
	}
</style>

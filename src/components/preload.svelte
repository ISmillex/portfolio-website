<script>
	import {stores} from '$lib/stores.js'
	import {browser} from '$app/environment';
	import { fade } from 'svelte/transition';
	import {page} from "$app/stores";

	$: if ($stores.isLoading) {

		if (browser) {
			document.body.style.overflow = "hidden";
		}

		setTimeout(() => {
			if ($stores.isLoading) {
				$stores.isLoading = false;
				if (browser) {
					document.body.style.overflow = "visible";
				}
			}
		},2000)
	}

</script>



<div class="preload" style="background-color: {$page.route.id === '/' ? $stores.preloadBackgroundColor: 'white'};
							height: {$stores.isLoading ? '100%' : '0'};
							transition: {$stores.isLoading ? '0s' : '0.8s'}">
	{#if $stores.isLoading}
		<div class="center-text">
			<div class="text" id="name" out:fade={{duration: 500}}>ARCHYN</div>
			<div class="text" id="surname" out:fade={{duration: 500}}>MIKHAILOV</div>
		</div>
	{/if}
</div>




<style>
	.preload {
		width: 100%;
		display: flex;
		z-index: 100;
		top: 0;
		left: 0;
		position: fixed;
		overflow: hidden;
	}

	.center-text {
		position: relative;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 500px;
		height: 50px;
	}


	.text {
		color: var(--main-color);
		font-size: 32px;
		font-weight: 400;
		margin-right: 6px;
		letter-spacing: 3px;
	}

	#name {
		--translateYStart: -50px;
		--translateYEnd: 0;
		animation: 1s linear slide;
	}

	#surname {
		--translateYStart: 50px;
		--translateYEnd: 0;
		animation: 1s linear slide;
	}

	@keyframes slide {
		0% {
			letter-spacing: 7px;
			transform: translateY(var(--translateYStart));
		}
		40% {
			letter-spacing: 7px;
			transform: translateY(var(--translateYEnd));
		}

		90% {
			letter-spacing: 5px;
		}

		100% {
			letter-spacing: 3px;
		}
	}

	@media screen and (max-width: 600px) {
		.text {
			font-size: 20px;
		}
	}
</style>

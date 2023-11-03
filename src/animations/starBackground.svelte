<script>
	import { browser } from '$app/environment';

	let ww;

	if (browser){
       ww = window.innerWidth;
    }
	
	function randRange(minNum, maxNum) {
		return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
	}

	function createStars(starCount, color="#FFF3E2") {
		let value = "";
		for (let i = 1; i < starCount; i++) {
			value = value + `${randRange(0, ww)}px ${randRange(0, 5000)}px ${color},`
		}
		let result = value.slice(0, -1);
		return result;
	}

</script>

<div class="background-content">
	<div class="stars1" style="box-shadow: {createStars(1000)};"></div>
	<div class="stars2" style="box-shadow: {createStars(300)};"></div>
	<div class="stars3" style="box-shadow: {createStars(200)};"></div>
</div>

<style>
	.background-content {
		height: 100%;
		width: 100%;
		overflow: hidden;
		position: absolute;
		mix-blend-mode: difference;
		z-index: -2;
	}

	.stars1 {
		width: 1.5px; 
		height: 1.5px; 
		border-radius: 50%; 
		animation: animStar 50s linear infinite;
	}

	.stars2 {
		width: 2px; 
		height: 2px; 
		border-radius: 50%; 
		animation: animStar 100s linear infinite;
	}

	.stars3 {
		width: 3px; 
		height: 3px; 
		border-radius: 50%; 
		animation: animStar 150s linear infinite;
	}


	@media screen and (max-width: 414px) {
		.stars1 {
			width: 0.5px;
	    	height: 0.5px;
			animation: animStar 100s linear infinite;
		}

		.stars2 {
			width: 1px;
	    	height: 1px;
			animation: animStar 160s linear infinite;
		}

		.stars3 {
			width: 1.5px;
	    	height: 1.5px;
			animation: animStar 240s linear infinite;
		}
	}

	@keyframes animStar {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(-2000px);
		}
	}
</style>


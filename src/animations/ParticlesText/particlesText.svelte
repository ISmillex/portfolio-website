<script>
  import {onMount} from 'svelte';
  import {run} from "./particlesText.js";

  onMount(() => {
		run();
	})
</script>


<canvas id="canvas1"></canvas>

<style>

  #canvas1{
    position: absolute;
    overflow: hidden; 
    width: 100%;
    height: 100%;
  }

</style>
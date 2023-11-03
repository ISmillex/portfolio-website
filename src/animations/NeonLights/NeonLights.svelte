<script>
  import {onMount} from 'svelte';
  import {neonLights} from './NeonLights.js'

  onMount(() => {
		neonLights();
	})
</script>


<canvas id="canvas"></canvas>


<style>
  #canvas {
    position: absolute;
    z-index: -5;
    width: 100%;
    height: 100%;
    cursor: none;
    /* background-color: white; */
}
</style>
<script>
  import {onMount} from 'svelte';
  import ParticleAnimation from "../animations/particles-text.js";


  let canvas;

  onMount(() => {
      new ParticleAnimation(canvas, "#FFF3D2", "Archyn", "Mikhailov");
	})
</script>


<canvas id="particles-text-canvas" bind:this={canvas}></canvas>

<style>

  #particles-text-canvas{
    position: absolute;
    overflow: hidden; 
    width: 100%;
    height: 100%;
  }

</style>
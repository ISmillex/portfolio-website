<script>
    import StarBackground from "../animations/star-background.js";
    import {onMount} from "svelte";

    let canvas;

    onMount(() => {
        new StarBackground(canvas);
    });
</script>

<canvas class="webgl" bind:this={canvas} />

<style>
    canvas {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: -1;
        mix-blend-mode: difference;
    }
</style>

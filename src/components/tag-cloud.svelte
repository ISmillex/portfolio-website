<script>
    import TagCloud from '../animations/tag-cloud.js';
    import { onMount } from 'svelte';

    let texts;
    let options;
    let tagCloud;

    function updateRadius() {
        let ww = window.innerWidth;
        options = { radius: Math.max(ww / 5.6, 150) };

        tagCloud.innerHTML = '';
        TagCloud('.tag-cloud-content', texts, options);
    }

    onMount(() => {
        texts = [
            'Matlab',
            'Git',
            'JavaScript',
            'CSS',
            'Python',
            'Kotlin',
            'Shell',
            'C',
            'Java',
            'Verilog',
            'HTML',
            'JSON',
            'SvelteJS',
            "TauriJS",
            "CapacitorJS",
            'SQL',
            'REST'
        ];
        updateRadius();
    });
</script>

<div class="tag-cloud-content" bind:this={tagCloud} on:resize={updateRadius}></div>

<style>
    .tag-cloud-content {
        font-size: max(1.2vw, 12px);
        color: #f0e9d2;
    }
</style>

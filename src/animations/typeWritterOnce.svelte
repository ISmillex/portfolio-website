<script>
    import {onMount} from 'svelte';

    export let text = "";
    export let color = "";
    let typedChars = "";
    let index = 0;
    let intervalId;
    let currentText = text;

    const typeChar = () => {
        if (index < currentText.length) {
            typedChars += currentText[index];
            index++;
        } else {
            clearInterval(intervalId);
        }
    }

    onMount(() => {
        intervalId = setInterval(typeChar, 65);
    })

    $: {
        typedChars = "";
        index = 0;
        currentText = text;
        if (intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(typeChar, 65);
    }
</script>

<style>
    .typedChars {
        display: inline;
        font-weight: 900;
    }

    .cursor {
        border-right: 3px solid white;
        animation: blink 1s steps(2, start) infinite;
    }

    @keyframes blink {
        to {
            visibility: hidden;
        }
    }
</style>

<div class="typedChars" style="{color}">
    {typedChars}
    {#if index < currentText.length}<span class="cursor"></span>{/if}
</div>

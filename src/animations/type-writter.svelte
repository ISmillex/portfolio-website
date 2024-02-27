<script>
    import {onMount} from 'svelte';

    let phrases = ["Welcome to my website,", "this is my digital space,", "which i made myself,", "feel free to explore."];
    let typedChars = "";
    let index = 0;
    let index2 = 0;
    let deleting = false;
    let pause = false;
    let interval;

    const typeChar = () => {
        if (pause) return;
        let phrase = phrases[index2];
        if (!deleting) {
            typedChars += phrase[index];
            index++;
            if (index === phrase.length) {
                pause = true;
                setTimeout(() => { pause = false; deleting = true; updateInterval(); }, 1500);
            }
        } else {
            typedChars = typedChars.slice(0, -1);
            if (typedChars === "") {
                deleting = false;
                index2 = (index2 + 1) % phrases.length;
                index = 0;
                updateInterval();
            }
        }
    }

    const updateInterval = () => {
        clearInterval(interval);
        interval = setInterval(typeChar, deleting ? 65 : 130);
    }

    onMount(() => {
        updateInterval();
    })


</script>

<style>
    .typedChars {
        display: inline;
        font-weight: 900;
        color: #A18F7C;
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

<div class="typedChars">{typedChars}
    <span class="cursor"></span>
</div>


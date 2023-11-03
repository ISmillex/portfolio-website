<!--<script>-->
<!--    import { Innertube } from 'youtubei.js/web';-->
<!--    import {onMount} from "svelte";-->



<!--    async function test () {-->
<!--        await Innertube.create({-->
<!--            fetch: async (input, init) => {-->
<!--                // Create a new URL object-->
<!--                const originalUrl = new URL(input);-->

<!--                // Create a new URL for the proxy-->
<!--                const proxyUrl = new URL(window.location.origin);-->
<!--                proxyUrl.pathname = `/grovio/api/v1${originalUrl.pathname}`;-->

<!--                // Fetch the URL-->
<!--                return fetch(proxyUrl.toString(), init);-->
<!--            }-->
<!--        });-->
<!--    }-->
<!--    //-->
<!--    onMount(() => {-->
<!--        test();-->
<!--    })-->



<!--</script>-->



<div class="content">
    <div class="wrapper">
        <div class="title">Grovio</div>
        <input type="text" placeholder="paste link">
    </div>
</div>



<style>
    .content {
        width:100vw;
        height:100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #121212;
        background: radial-gradient(#1F1F1F, #121212);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .wrapper {
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .title {
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-align: center;
    }

    input {
        width: 100%;
        height: 5%;
        font-size: 17px;
        text-align: left;
        background: transparent;
        border: none;
        border-bottom: 1px solid #6E6E6E;
        outline: none;
        padding-left: 10px;
        padding-right: 10px;
        overflow: hidden;
        color: #fff;
    }

    input:focus {
        border-bottom: 1px solid #fff;
    }
</style>
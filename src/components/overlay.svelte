<script>
    import {stores} from '$lib/stores.js'

    function handleClick() {
        $stores.isOverlayOpen = false
    }

</script>



<div class="overlay" class:overlayOpen={$stores.isOverlayOpen}>
    <div class="wrapper" class:opacity={$stores.isOverlayOpen}>
        <div class="text-1">MENU</div>
        <a href="/about" class="link" on:click={handleClick} >About me</a>
        <a href="/projects" class="link" on:click={handleClick} >Projects</a>
        <a href="/donate" class="link" on:click={handleClick} >Donate</a>
        <a href="/games" class="link" on:click={handleClick} >Games</a>
        <a href="/contact" class="link" on:click={handleClick} >Contact</a>
    </div>
    <div class="text-2" class:opacity={$stores.isOverlayOpen}>
        © 2024 Archyn Mikhailov. Made with ♥ in Ankara, Turkey.
    </div>
</div>




<style>
    .overlay {
        height: 0;
        width: 100%;
        position: fixed;
        z-index: 40;
        bottom: 0;
        top: unset;
        background: var(--second-color);
        color: black;
        overflow: hidden;
        transition: 0.5s;
    }

    .overlay.overlayOpen {
        height: 100%;
        top: 0;
        bottom: unset;
        overflow: hidden;
    }

    .wrapper {
        height: 100%;
        width: 80%;
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        opacity: 0;
        transition: 0.5s;
    }

    .wrapper.opacity {
        opacity: 1;
        transition: 0.5s;
    }


    .overlay .text-1 {
        display: block;
        text-decoration: none;
        font-size: max(1vw, 12.75px);
        margin-bottom: 1.2vw;
        color: var(--main-color);
    }

    .overlay .text-2 {
        text-decoration: none;
        font-size: max(0.8vw, 8px);
        text-align: center;
        font-weight: 500;
        position: absolute;
        width: 100%;
        bottom: 0;
        margin-bottom: 30px;
        color: var(--main-color);
        opacity: 0;
        transition: 0.5s;
    }

    .text-2.opacity {
        opacity: 1;
        transition: 0.5s;
    }

    .overlay .link {
        color: var(--main-color);
        display: block;
        width: fit-content;
        text-decoration: none;
        margin: 0 auto;
        padding: 8px;
        font-size: max(3vw, 25px);
        font-weight: 400;
        transition: 0.3s;
    }

    .overlay .link:hover {
        transform: scale(1.1);
        transition: 0.3s;
    }

</style>
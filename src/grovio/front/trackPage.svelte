<script>
    import {grovio} from "$lib/stores.js";

    import Player from "./player.svelte"

    export let url_handler = null;

    let links = {}

    let openDownload = false;

    let links_map = {
        "youtubeMusic" : "/grovio/platform-icons/youtube-music.svg",
        "spotify" : "/grovio/platform-icons/spotify.svg",
        "itunes" : "/grovio/platform-icons/apple-music.svg",
        "amazonMusic" : "/grovio/platform-icons/amazon-music.svg",
        "qobuz" : "/grovio/platform-icons/qobuz.svg",
        "tidal" : "/grovio/platform-icons/tidal.svg",
        "soundcloud" : "/grovio/platform-icons/soundcloud.svg",
        "deezer" : "/grovio/platform-icons/deezer.svg",
    }

    $: if (url_handler != null && Object.keys(links).length === 0) {
        const getLinks = async (url) => {
            const res = await url_handler.getLinks(url)
            for (const link in res) {
                console.log(link)
                if (link in links_map)
                    links[link] = res[link][0].link;
            }
        }

        getLinks($grovio.currentTrackData.trackInfo.ytLink)
        console.log(links)
    }


    let tabs = [
        { name: 'format', settings: ['m4a', 'mp3', 'ogg', 'opus'] },
        { name: 'quality', settings: ['low', 'middle', 'high'] },
        { name: 'file', settings: ['classic', 'basic', 'detailed'] },
        { name: 'preferences', settings: ['audio', 'thumbnail', 'lyrics', 'metadata'] }
    ];


    function downloadButton() {
        openDownload = !openDownload;
        console.log(openDownload)
    }



</script>



<div class="content">
    <div class="wrapper">
        {#if openDownload}
            <div class="download-section">
                <div class="download-wrapper">
                    <div class="close" on:click={downloadButton}>X</div>
                    {#each tabs as tab}
                        <div class="setting">
                            <div class="title">{tab.name}</div>
                            <div class="buttons">
                                {#each tab.settings as setting}
                                    <button>{setting}</button>
                                {/each}
                            </div>
                            <div class="description">select {tab.name} for tracks</div>
                        </div>
                    {/each}
                    <button class="download-button" on:click={$grovio.client.download($grovio.currentTrackData.streaming_data)}>download</button>
                </div>
            </div>
        {/if}
        <div class="info-section">
            <div class="text-content">
                <div class="title">{$grovio.currentTrackData.trackInfo.title}</div>
                <div class="artist">{$grovio.currentTrackData.trackInfo.artist}</div>
                <div class="links">
                    {#each Object.keys(links_map) as link}
                        <a class="link" href={links[link]}>
                            <img src={links_map[link]} alt="">
                        </a>
                    {/each}
                </div>
                <div class="btn-container">
                    <button class="download" on:click={downloadButton}>
                        <span class="box">
                          <span class="icon arrow"></span>
                        </span>
                        <span class="btn-text">Download</span>
                    </button>
                </div>
            </div>
        </div>
        {#if $grovio.isPlaying}
            <div class="queue-section">

            </div>
        {/if}
    </div>
    <Player />
</div>


<style>


    .btn-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: fit-content;
        margin-top: 40px;
    }

    .download {
        width: 100%;
        position: relative;
        display: flex;
        cursor: pointer;
        outline: none;
        border: 0;
        align-items: center;
        text-decoration: none;
        background: transparent;
        padding: 0;
    }

    .download .box {
        position: relative;
        display: block;
        margin: 0;
        width: 3rem;
        height: 3rem;
        border-radius: 0.25rem;
        background: white;
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    }

    .download .box .icon {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        background: black;
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    }

    .download .box .icon.arrow {
        left: 0.625rem;
        width: 1.125rem;
        height: 0.125rem;
        background: none;
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    }

    .download .box .icon.arrow::before {
        position: absolute;
        content: '';
        top: -0.3rem;
        right: 0.0625rem;
        width: 0.625rem;
        height: 0.625rem;
        border-top: 0.125rem solid black;
        border-right: 0.125rem solid black;
        transform: rotate(45deg);
    }

    .download .btn-text {
        position: absolute;
        left: 48.5%;
        transform: translateX(-50%);
        color: black;
        font-weight: 700;
        line-height: 1.6;
        letter-spacing: 2px;
        text-align: center;
        text-transform: uppercase;
        opacity: 0;
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    }

    .download:hover .box {
        width: 98%;
    }

    .download:hover .box .icon.arrow {
        background: black;
        transform: translate(1rem, 0);
    }

    .download:hover .btn-text {
        opacity: 1;
    }





    .content {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .wrapper {
        position: relative;
        width: 90%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .download-section {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        backdrop-filter: blur(10px);
    }

    .download-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: fit-content;
        padding: 20px;
    }

    .download-section .close {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 25px;
        cursor: pointer;
    }


    .download-section .setting {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: fit-content;
        margin-bottom: 20px;
    }


    .download-section .setting .title {
        font-size: 25px;
        width: 100%;
        font-weight: bold;
        color: #fff;
        margin-bottom: 20px;
        text-align: left;
    }



    .download-section .setting .buttons {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        height: fit-content;
    }

    .download-section .setting .buttons button {
        display: flex;
        width: fit-content;
        height: fit-content;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
        margin-bottom: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 1px solid #fff;
        background-color: transparent;
        color: #fff;
        font-size: 15px;
        cursor: pointer;
    }

    .download-section .setting .buttons button:hover {
        background-color: #fff;
        color: #000;
    }

    .download-section .setting .description {
        font-size: 15px;
        width: 100%;
        font-weight: bold;
        color: #fff;
        text-align: left;
    }



    .download-section .download-button {
        display: flex;
        width: 100%;
        height: fit-content;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 1px solid #fff;
        background-color: transparent;
        color: #fff;
        font-size: 15px;
        cursor: pointer;
    }


    .download-section .download-button:hover {
        background-color: #fff;
        color: #000;
    }


    .info-section {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .queue-section {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #fff;
    }

    .info-section .text-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: fit-content;
    }

    .info-section .text-content .title {
        font-size: 50px;
        width: 100%;
        font-weight: bold;
        color: #fff;
        margin-bottom: 20px;
        text-align: left;
    }

    .info-section .text-content .artist {
        font-size: 25px;
        width: 100%;
        font-weight: bold;
        color: #fff;
        margin-left: 5px;
        margin-bottom: 40px;
        text-align: left;
    }

    .info-section .links {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        height: fit-content;
    }

    .info-section .links .link {
        display: flex;
        width: fit-content;
        height: fit-content;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
    }

    .info-section .links .link img {
        width: 40px;
        object-fit: contain;
    }

    .info-section .download-button {
        display: flex;
        width: 100%;
        margin-top: 40px;
        height: fit-content;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 1px solid #fff;
        background-color: transparent;
        color: #fff;
        font-size: 15px;
        cursor: pointer;
    }



</style>
<script>
    import {onMount} from "svelte";
    import {grovio} from "$lib/stores.js"

    import ApiService from "../core/apiService.js";
    import UrlService from "../core/urlService.js";
    import ClientService from "./clientService.js"

    import TrackPage from "./trackPage.svelte";


    let input_url = "";
    let url_handler;
    let content;

    let isDataLoaded = false;


    const settings = {
        "app" : {
            "appearance" : "dark",
            "downloadAudio" : true,
            "downloadLyrics" : true,
            "downloadCover" : true,
            "downloadMetaData" : true,
        },
        "audio" : {
            "format" : ".m4a",
            "bitrate" : 256000,
            "filename" : "{artist} - {title} - {duration}",
        },
        "server" : {
            "host" : "localhost",
            "port" : 5173,
            "path" : "/grovio/api/v1",
        },
    }



    onMount(() => {
        $grovio.settings = settings;
        $grovio.urlHandler = new UrlService(settings);
        $grovio.api = new ApiService(settings, $grovio.urlHandler);
        $grovio.client = new ClientService($grovio.api, $grovio.urlHandler);
    })


    async function keyboardHandler(event) {
        if (event.key === "Enter") {
            $grovio.currentTrackData = await $grovio.client.getTrackInfo(input_url);
            isDataLoaded = true;

            console.log($grovio.currentTrackData)

            input_url = "";

            content.style.background = `radial-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)),
                                        url(${$grovio.currentTrackData.trackInfo.thumbnails[0].url}) no-repeat center / cover`;

            // const albumData = await client.getAlbumInfo(input_url);
            // const artistData = await client.getArtistInfo(input_url);

            // console.log(albumData);
            // client.test(input_url);
        }
    }

</script>


<div class="content" on:keydown={keyboardHandler} bind:this={content}>

    <div class="wrapper" class:second={isDataLoaded}>
        <div class="search-bar" class:second={isDataLoaded}>
            <div class="title" class:second={isDataLoaded}>Grovio</div>
            <input type="text" placeholder="paste link, track, artist or album" bind:value={input_url} class:second={isDataLoaded}>
            {#if isDataLoaded}
                <div class="about">about</div>
            {/if}
        </div>
        {#if isDataLoaded}
            <TrackPage url_handler={url_handler}/>
        {/if}
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
        position: relative;
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .wrapper.second {
        width: 100%;
    }

    .search-bar {
        top: 50%;
        left: 50%;
        width: 80%;
        height: 70px;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -50%);
    }

    .search-bar.second {
        top: 5%;
        width: 95%;
        height: fit-content;
        justify-content: space-between;
        position: fixed;
        flex-direction: row;
        z-index: 100;
    }

    .title {
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-align: center;
    }

    .title.second {
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-align: left;
    }

    .about {
        font-size: 15px;
        font-weight: 700;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-align: left;
        margin-top: 10px;
        cursor: pointer;
    }

    input {
        width: 100%;
        height: 100%;
        font-size: 17px;
        text-align: left;
        background: transparent;
        border: none;
        border-bottom: 1px solid #6E6E6E;
        outline: none;
        padding: 10px;
        overflow: hidden;
        color: #fff;
    }

    input:focus {
        border-bottom: 1px solid #fff;
    }

    input.second {
        width: 50%;
        height: 100%;
        font-size: 17px;
        /*text-align: center;*/
        background: transparent;
        border: none;
        border-bottom: 1px solid #6E6E6E;
        outline: none;
        padding: 10px;
        overflow: hidden;
        color: #fff;
    }

    input.second:focus {
        border-bottom: 1px solid #fff;
    }

</style>
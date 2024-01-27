<script>
    import { navigating } from '$app/stores';
    import {stores} from '$lib/stores.js'
    import {browser} from '$app/environment';
    import { page } from '$app/stores';

    import Header from "../components/header.svelte";
    import Footer from "../components/footer.svelte";
    import Preload from "../components/preload.svelte";
    // import CustomCursor from "../components/customCursor.svelte";

    import '../app.css'
    import 'swiper/css';


    $: $stores.isLoading = !$navigating;

    let routesDarkBackground = [
        "/",
        "/games/tetris",
        "/games/snake",
        "/games/2048",
    ];

    $: {
        if (browser) {

            if(window.matchMedia('(max-width: 600px)').matches && $stores.isOverlayOpen) {
                $stores.backgroundColor = "#FFF3E2";
                document.body.style.overflow = "visible";
                document.body.style.touchAction = "auto";
            }
            else if ($page.route.id === "/" && !$stores.isLoading) {
                $stores.preloadBackgroundColor = "#FFF3E2";
                $stores.backgroundColor = "#15142A";
            }
            else if ($page.route.id === "/" && $stores.isLoading) {
                $stores.backgroundColor = "#FFF3E2";
            }
            else {
                $stores.backgroundColor = "#FFFFFF";
                $stores.preloadBackgroundColor = "#FFFFFF"
            }

            document.body.style.backgroundColor = $stores.backgroundColor;
        }
    }


    let nonFooterPages = [
        "/",
        "/games",
        "/games/tetris",
        "/games/snake",
        "/games/2048",
        "/grovio"
    ];

    let nonHeaderPages = [
        "/grovio"
    ];

    // let data = fetch("http://10.3.130.243:5173/etumobile/api/v1/get?query=SELECT * FROM STUDENT", {
    //         headers: {
    //             'x-api-key': 'AlkinOrospu'
    //         }
    // }).then(response => response.json())
    //
    // console.log(data)

    // let intervalId = setInterval(() => {
    //     fetch("http://10.3.129.3:5173/etumobile/api/v1/database?function=create_database&args=HelloWorld", {
    //         headers: {
    //             'x-api-key': 'AlkinOrospu'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }, 6000); // 60000 milliseconds = 1 minute



</script>



<main>
    <Preload/>
    {#if !nonHeaderPages.includes($page.route.id)}
        <Header/>
    {/if}
    <slot/>
    {#if !nonFooterPages.includes($page.route.id)}
        <Footer/>
    {/if}

</main>



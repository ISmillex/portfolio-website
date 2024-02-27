<script>
    import {onMount} from "svelte";
    import {register} from 'swiper/element/bundle';

    export let photos = [];

    onMount(() => {
        register();
        resize();
        document.addEventListener('resize', resize)
    });

    function resize() {
        const swiperEl = document.getElementById('swiper');


        if (window.innerWidth < 700) {
            swiperEl.setAttribute('navigation', 'false');
        } else {
            swiperEl.setAttribute('navigation', 'true');
        }
    }

</script>


<section>
    <div class="wrapper">
        <swiper-container id="swiper" navigation="true"
                          loop="true" speed="800" pagination="true"
                          pagination-clickable="true" space-between="30"
                          centered-slides="true" autoplay-delay="2500"
                          autoplay-disable-on-interaction="false">
            {#each photos as photo}
                <swiper-slide>
                    <div class="image-container">
                        <img src={photo} alt="">
                    </div>
                </swiper-slide>
            {/each}
        </swiper-container>
    </div>
</section>


<style>
    section {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }


    swiper-container {
        width: 100%;
        height: 100%;
        --swiper-navigation-sides-offset: 50px;
        --swiper-theme-color: black;
        --swiper-pagination-color: black;
        --swiper-pagination-bullet-inactive-color: black;
        --swiper-pagination-bottom: auto;
        --swiper-pagination-top: 75px;
    }


    swiper-slide {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: black;
    }



    .image-container {
        width: 80%;
        position: relative;
        display: flex;
        flex-shrink: 0;
    }

    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }


    @media screen and (max-width: 600px) {

        section {
            height: 50vh;
        }

        .image-container {
            width: 100%;
        }

        swiper-container {
            --swiper-pagination-top: 5vh;
            --swiper-pagination-bullet-size: 5px;
        }
    }

</style>
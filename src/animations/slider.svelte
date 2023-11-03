<script>
    import {onMount} from "svelte";

    export let photos = [];


    let width;
    let SLIDER_LENGTH;
    let CENTER_SLIDE_WIDTH;
    let distance_center
    let duration
    let isMoving
    let autoSlide;

    onMount(() => {
        CENTER_SLIDE_WIDTH = width;
        SLIDER_LENGTH = photos.length
        distance_center = -CENTER_SLIDE_WIDTH
        duration = 700
        isMoving = true

        startSlider();
    })


    function startSlider() {
        autoSlide = setInterval(() => {
            reset_slider("next");
            distance_center -= CENTER_SLIDE_WIDTH;
        }, 5000);
    }
    
    function handleSlideClick(event) {
        clearInterval(autoSlide); 

        if (event.target.id === "next" && isMoving === true) {
            reset_slider("next");
            distance_center -= CENTER_SLIDE_WIDTH;
        }

        if (event.target.id === "prev" && isMoving === true) {
            reset_slider("prev");
            distance_center += CENTER_SLIDE_WIDTH;
        }

        startSlider(); 
    }

    function reset_slider(button) {
        isMoving = false
        duration = 700

        setTimeout(() => {
            isMoving = true
        }, duration)

        if (button === "prev" && distance_center === 0) {
            setTimeout(() => {
                distance_center = -CENTER_SLIDE_WIDTH * (SLIDER_LENGTH-1)
                duration = 0
            }, duration)
        }

        if (button === "next" && distance_center === -CENTER_SLIDE_WIDTH * SLIDER_LENGTH) {
            setTimeout(() => {
                distance_center = -CENTER_SLIDE_WIDTH
                duration = 0
            }, duration)
        }
    }

</script>


<div class="slider-container">
    <div class="mySlider">
        <div class="mySwiper" bind:offsetWidth={width} style="transform: translateX({distance_center - CENTER_SLIDE_WIDTH}px); transition-duration: {duration}ms;">
            <div class="slide">
                <img src={photos[photos.length-2]} alt="">
            </div>
            <div class="slide">
                <img src={photos[photos.length-1]} alt="">
            </div>
            {#each photos as photo}
                <div class="slide">
                    <img src={photo} alt="">
                </div>
            {/each}
            <div class="slide">
                <img src={photos[0]} alt="">
            </div>
        </div>
        <div class="my-swiper-button" id="prev" on:click={handleSlideClick}></div>
        <div class="my-swiper-button" id="next" on:click={handleSlideClick}></div>
    </div>
</div>

<style>

    .slider-container {
        width: 100%;
        min-height: 100vh;
        position: relative;
        margin: auto;
        display: flex;
        overflow: hidden;
    }

    .mySlider {
        left: 50%;
        top: 50%;
        width: 100%;
        position: absolute;
        display: flex;
        overflow: hidden;
        transform: translate(-50%, -50%);
    }

    .mySwiper {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
    }

    .slide {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-shrink: 0;
    }

    .slide img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }


    #prev.my-swiper-button {
        position: absolute;
        z-index: 3;
        top: 50%;
        transform: translateY(-50%);
        left: 30px;
        opacity: 0;
        padding: 40px 20px;
        border-radius: 5px;
        background: #ffffff url("data:image/svg+xml,%3Csvg width='21' height='41' viewBox='0 0 21 41' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.66046 22.8188C4.56061 21.6641 4.55628 19.8508 5.65062 18.6909L19.9159 3.57104C20.5241 2.9264 20.5226 1.91888 19.9125 1.27603C19.2542 0.582352 18.1488 0.582352 17.4905 1.27603L0.968256 18.6855C-0.133743 19.8467 -0.129872 21.6686 0.977051 22.8251L17.1619 39.7346C17.8212 40.4234 18.9226 40.4211 19.579 39.7294C20.1911 39.0844 20.1902 38.0726 19.5768 37.4287L5.66046 22.8188Z' fill='%238C8C8C'/%3E%3C/svg%3E%0A") no-repeat 50% 50%;
        transition: 0.2s;
    }

    #next.my-swiper-button {
        position: absolute;
        z-index: 3;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
        opacity: 0;
        padding: 40px 20px;
        border-radius: 5px;
        background: #ffffff url("data:image/svg+xml,%3Csvg width='21' height='41' viewBox='0 0 21 41' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.3395 22.8188C16.4394 21.6641 16.4437 19.8508 15.3494 18.6909L1.08414 3.57104C0.475946 2.9264 0.477423 1.91888 1.08751 1.27603C1.74583 0.582352 2.85118 0.582352 3.50951 1.27603L20.0317 18.6855C21.1337 19.8467 21.1299 21.6686 20.0229 22.8251L3.83808 39.7346C3.17876 40.4234 2.07742 40.4211 1.42104 39.7294C0.808855 39.0844 0.809784 38.0726 1.42315 37.4287L15.3395 22.8188Z' fill='%238C8C8C'/%3E%3C/svg%3E") no-repeat 50% 50%;
        transition: 0.2s;
    }

    .mySlider:hover #next {opacity: 0.8;}
    .mySlider:hover #prev {opacity: 0.8;}


    @media screen and (max-width: 428px){
        .slider-container {
            min-height: 50vh;
        }

        #prev.my-swiper-button {
            left: 10px;
            padding: 20px 10px;
            background: #ffffff url("data:image/svg+xml,%3Csvg width='11' height='21' viewBox='0 0 21 41' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.66046 22.8188C4.56061 21.6641 4.55628 19.8508 5.65062 18.6909L19.9159 3.57104C20.5241 2.9264 20.5226 1.91888 19.9125 1.27603C19.2542 0.582352 18.1488 0.582352 17.4905 1.27603L0.968256 18.6855C-0.133743 19.8467 -0.129872 21.6686 0.977051 22.8251L17.1619 39.7346C17.8212 40.4234 18.9226 40.4211 19.579 39.7294C20.1911 39.0844 20.1902 38.0726 19.5768 37.4287L5.66046 22.8188Z' fill='%238C8C8C'/%3E%3C/svg%3E%0A") no-repeat 50% 50%;
        }

        #next.my-swiper-button {
            right: 10px;
            padding: 20px 10px;
            background: #ffffff url("data:image/svg+xml,%3Csvg width='11' height='21' viewBox='0 0 21 41' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.3395 22.8188C16.4394 21.6641 16.4437 19.8508 15.3494 18.6909L1.08414 3.57104C0.475946 2.9264 0.477423 1.91888 1.08751 1.27603C1.74583 0.582352 2.85118 0.582352 3.50951 1.27603L20.0317 18.6855C21.1337 19.8467 21.1299 21.6686 20.0229 22.8251L3.83808 39.7346C3.17876 40.4234 2.07742 40.4211 1.42104 39.7294C0.808855 39.0844 0.809784 38.0726 1.42315 37.4287L15.3395 22.8188Z' fill='%238C8C8C'/%3E%3C/svg%3E") no-repeat 50% 50%;
        }


    }
</style>
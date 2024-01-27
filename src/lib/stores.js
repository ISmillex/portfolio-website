import { writable } from 'svelte/store';
export const stores = writable({
    isLoading: false,
    isOverlayOpen: false,
    backgroundColor: "#15142A",
    preloadBackgroundColor: "#FFF3E2",
    logoColor: "#FFFFFF",

    swiper: null,
    currentProjectIndex: 0,
});

export const snakeGame = writable({
    board: [],
    speed: 3
});


export const game2048 = writable({
    board: [],
    score: 0,
})


export const grovio = writable({
    currentTrackData: {},
    settings: {},
    client: null,
    api: null,
    urlHandler: null,
    isPlaying: false,
});
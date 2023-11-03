import {browser} from "$app/environment";

export let BOARD_COLUMNS = 30;
export let BOARD_ROWS = 20;

export let speed = 10;
export let score = 0;

// if (window.matchMedia('(max-width: 600px)').matches) {
//     setBoardColumns(20);
//     setBoardRows(30);
// }

if (browser) {
    if (window.matchMedia('(max-width: 600px)').matches) {
        setBoardColumns(20);
        setBoardRows(30);
    }
}

export function setBoardColumns(newBoardColumns) {
    BOARD_COLUMNS = newBoardColumns;
}

export function setBoardRows(newBoardRows) {
    BOARD_ROWS = newBoardRows;
}


export function getSpeed() {
    return speed;
}

export function setSpeed(newSpeed) {
    speed = newSpeed;
}

export function setScore(newScore) {
    score = newScore;
}

export function getScore() {
    return score;
}

export function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}
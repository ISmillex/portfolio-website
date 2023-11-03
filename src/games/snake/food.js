import {BOARD_COLUMNS, BOARD_ROWS, getRandomInt} from "./utils.js";

export class Food {
    constructor() {
        this.x = 5;
        this.y = 5;
        this.foodSize = 1;
    }


    getFoodPosition() {
        return {x: this.x, y:this.y};
    }

    randomPosition() {
        this.x = getRandomInt(0, BOARD_COLUMNS);
        this.y = getRandomInt(0, BOARD_ROWS);
    }

    reset() {
        this.x = 5;
        this.y = 5;
    }
}

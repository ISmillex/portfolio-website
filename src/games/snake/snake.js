import DoublyLinkedList from './linkedlLst.js';
import {BOARD_ROWS, BOARD_COLUMNS, getSpeed, setSpeed, getScore, setScore} from './utils.js';


export class Snake {
    constructor(board, food) {
        this._startX = BOARD_COLUMNS / 2;
        this._startY = BOARD_ROWS / 2;
        this.board = board;
        this.food = food;
        this.currentDirection = 'Right';
        this.body = new DoublyLinkedList();
        this.body.pushToHead({x: this._startX, y: this._startY, name: "snake"});
    }

    setDirection(newDirection) {
        this.currentDirection = newDirection;
    }

    getDirection() {
        return this.currentDirection;
    }

    move() {
        let newX = this.body.head.data.x;
        let newY = this.body.head.data.y;

        switch (this.currentDirection) {
            case 'Left':
                newX--;
                break;
            case 'Right':
                newX++;
                break;
            case 'Up':
                newY--;
                break;
            case 'Down':
                newY++;
                break;
        }

        if (!this.isValid(newX, newY)) {
            return false;
        }

        this.body.pushToHead({x: newX, y: newY, name: "snake"});
        this.board[this.body.tail.data.y][this.body.tail.data.x].style = "background: rgba(0, 0, 0, 0.30);"
        this.body.pop();

        return true;
    }


    isValid(x, y) {
        return !this.isOutOfBound(BOARD_ROWS, BOARD_COLUMNS, x, y) && !this.parseCollision(this.isCollision(x, y));
    }

    parseCollision(num) {
        switch (num) {
            case 0:
                this.body.pushToTail(this.food.getFoodPosition());
                this.food.randomPosition();
                return false;
            case 1:
                return true;
            case -1:
                return false;
        }
    }

    isCollision(x, y) {
        let foodPosition = this.food.getFoodPosition();
        if (foodPosition.x === x && foodPosition.y === y) {
            setSpeed(getSpeed() + 1);
            setScore(getScore() + 1);
            return 0
        }

        if (this.board[y][x].style.backgroundColor === "rgb(255, 243, 226)") {
            return 1;
        }

        return -1;
    }


    isOutOfBound(rows, columns, x, y) {
        return x < 0 || x >= columns ||y < 0 || y >= rows;
    }

    getSnake() {
        return this.body.head;
    }

    reset() {
        this.body = new DoublyLinkedList();
        this.body.pushToHead({x: this._startX, y: this._startY, name: "snake"});
        this.currentDirection = 'Right';
    }

}
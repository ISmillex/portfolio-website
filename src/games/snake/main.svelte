<script>
    import Board from './gameBoard.svelte';
    import {Snake} from "./snake";
    import {Food} from "./food";
    import {onMount} from "svelte";
    import {snakeGame} from "$lib/stores.js";
    import {getSpeed, setSpeed, getScore, setScore} from "./utils.js";
    import {fade} from "svelte/transition";


    let requestId;
    let timeoutId;
    let hammer;
    let snake;
    let food;
    let score = 0;
    let startText = ["Play", "Press space or tap to start"];
    let showStart = true;
    let isGameStarted = false;
    let directionQueue = [];


    onMount(async () => {
        const { Hammer } = await import('svelte-hammer');

        food = new Food();
        snake = new Snake($snakeGame.board, food);
        initTouch(Hammer);
        document.addEventListener('keydown', onKeydown);
    });



    function onKeydown(event) {
        let newDirection;
        switch (event.key) {
            case 'ArrowUp':
                newDirection = "Up";
                break;
            case 'ArrowDown':
                newDirection = "Down";
                break;
            case 'ArrowLeft':
                newDirection = "Left";
                break;
            case 'ArrowRight':
                newDirection = "Right";
                break;
            case ' ':
                if (isGameStarted) {
                    stopLoop();
                } else {
                    showStart = false;
                    run();
                }
                return;
            default:
                return;
        }

        directionQueue.push(newDirection);
    }


    function initTouch(Hammer) {
        document.addEventListener('dblclick', (event) => {
            event.preventDefault();
        });

        hammer = new Hammer(document.getElementById('content-snake'));

        hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 });

        hammer.on('swipe', (event) => {
            let newDirection;
            switch (event.direction) {
                case 8:
                    newDirection = "Up";
                    break;
                case 16:
                    newDirection = "Down";
                    break;
                case 2:
                    newDirection = "Left";
                    break;
                case 4:
                    newDirection = "Right";
                    break;
                default:
                    return;
            }
            directionQueue.push(newDirection);
        });

        hammer.on('tap', () => {
            if (isGameStarted) {
                stopLoop();
            } else {
                showStart = false;
                run();
            }
        });
    }

    function isOppositeDirection(current, newDirection) {
        return (current === "Up" && newDirection === "Down") ||
            (current === "Down" && newDirection === "Up") ||
            (current === "Left" && newDirection === "Right") ||
            (current === "Right" && newDirection === "Left");
    }
    function startLoop() {
        timeoutId = setTimeout(() => requestId = requestAnimationFrame(run), 1000 / getSpeed());
        isGameStarted = true;
    }

    function stopLoop() {
        cancelAnimationFrame(requestId);
        clearTimeout(timeoutId);
        isGameStarted = false;
    }

    function run() {

        if (directionQueue.length > 0) {
            let newDirection = directionQueue.shift();
            if (!isOppositeDirection(snake.getDirection(), newDirection)) {
                snake.setDirection(newDirection);
            }
        }
        if (!snake.move()) {
            gameOver();
            return;
        }
        draw();
        score = getScore();
        stopLoop();
        startLoop();
    }
    function draw() {
        drawFood();
        drawSnake();
    }


    function gameOver() {
        stopLoop();
        snake.reset();
        food.reset();
        drawReset();
        setSpeed(10);
        setScore(0);
        startText = ["Game Over!", "Press space to restart"];
        showStart = true;
    }

    function drawReset() {
        for (let i = 0; i < $snakeGame.board.length; i++) {
            for (let j = 0; j < $snakeGame.board[i].length; j++) {
                $snakeGame.board[i][j].style = setStyle("reset");
            }
        }
    }


    function drawSnake() {
        let snakeBody = snake.getSnake();
        while (snakeBody) {
            let data = snakeBody.data;
            $snakeGame.board[data.y][data.x].style = setStyle(data.name);
            snakeBody = snakeBody.next;
        }
    }

    function drawFood() {
        let data = food.getFoodPosition();
        $snakeGame.board[data.y][data.x].style = setStyle("food");
    }

    function setStyle(name) {
        const styles = {
            "snake": "background-color: #FFF3E2;",
            "food": "background-color: rgb(119, 255, 51); box-shadow: rgb(119, 255, 51) 0px 0px 20px",
            "default": "background: rgba(0, 0, 0, 0.30);"
        };
        return styles[name] || styles["default"];
    }


</script>


<div class="content" id="content-snake">
    <div class="wrapper">
        {#if showStart}
            <div class="start" transition:fade={{duration: 500}}>
                <h1>{startText[0]}</h1>
                <p>{startText[1]}</p>
            </div>
        {/if}
        <div class="score">{score}</div>
        <Board/>
    </div>
</div>


<style>
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        background: #15142A;
        background: radial-gradient(#37364C, #15142A);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80%;
        width: 80%;
        margin-top: 50px;
    }

    .score {
        position: relative;
        margin: 20px;
        font-size: 2rem;
        color: rgba(255, 255, 255, 0.60);
    }

    .start {
        top: 0;
        left: 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.60);
        z-index: 1;
    }

    .start h1 {
        color: #FFF3E2;
        font-size: 5rem;
        margin-bottom: 0;
    }

    .start p {
        color: #FFF3E2;
        font-size: 2rem;
        margin-top: 0;
    }


    @media (max-width: 600px) {

        .start h1 {
            font-size: 3rem;
        }

        .start p {
            font-size: 1rem;
        }

        .score {
            font-size: 1rem;
        }
    }

</style>
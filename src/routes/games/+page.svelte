<script>

    let showSnake = false;
    let showTetris = false;
    let show2048 = false;
    let showPlatform = false;

    let pos = { x: 0, y: 0 };

    function handleHover(game) {
        switch (game) {
            case "snake":
                showSnake = true;
                break;
            case "tetris":
                showTetris = true;
                break;
            case "2048":
                show2048 = true;
                break;
            case "platform":
                showPlatform = true;
                break;
            default:
                showSnake = false;
                showTetris = false;
                show2048 = false;
                showPlatform = false;
                break;
        }
    }


</script>




<div class="content">
    <div class="wrapper">
        <div class="text-content">
            <div class="title">MY GAMES</div>
            <div class="text">Browse through my retro games with modern design and ai features which both compatible with pc and phones</div>
            <div class="sub-text">All details can be found on my projects <a href="/projects">page</a></div>
        </div>
        <div class="game-list">
            <a class="game" id="game1" href="/games/snake" class:showSnake={showSnake}
               on:mouseenter={()=>{handleHover("snake")}}
               on:mouseleave={()=>{handleHover("close")}}>
                <div class="date">2023</div>
                <div class="title">Snake</div>
            </a>
            <a class="game" id="game2" href="/games/tetris" class:showTetris={showTetris}
               on:mouseenter={()=>{handleHover("tetris")}}
               on:mouseleave={()=>{handleHover("close")}}>
                <div class="date">2023</div>
                <div class="title">Tetris</div>
            </a>
            <a class="game" id="game3" href="/games/2048" class:show2048={show2048}
               on:mouseenter={()=>{handleHover("2048")}}
               on:mouseleave={()=>{handleHover("close")}}>
                <div class="date">2023</div>
                <div class="title">2048</div>
            </a>
            <a class="game" id="game4" href="/games/platform" class:showPlatform={showPlatform}
               on:mouseenter={()=>{handleHover("platform")}}
               on:mouseleave={()=>{handleHover("close")}}>
                <div class="date">2023</div>
                <div class="title">Platformer</div>
            </a>
        </div>
    </div>
</div>


<style>
    .content {
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        background: #15142A;
        background: radial-gradient(#37364C, #15142A);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .wrapper {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .text-content {
        margin-top: 20%;
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .title {
        display: flex;
        position: relative;
        letter-spacing: 4px;
        font-size: 15px;
    }

    .text {
        margin-top: 20px;
        display: flex;
        position: relative;
        font-size: 40px;
        font-weight: 800;
        text-align: center;
    }

    .sub-text {
        width: 85%;
        margin-top: 20px;
        font-size: 20px;
        font-weight: 500;
        text-align: center;
    }

    .sub-text a {
        color: #A18F7C;
    }

    .game-list {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 5%;
        margin-bottom: 10%;
    }

    .game {
        position: relative;
        width: 600px;
        height: 700px;
        margin: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        color: white;
        font-size: 30px;
        font-weight: 600;
        background: rgba(0, 0, 0, 0.2) no-repeat center;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        background-size: cover;
        transition: 0.3s ease-in-out;
        text-decoration: none;
        overflow: hidden;
    }

    .game::before {
        content: "Play!";
        border-bottom: 2px solid white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 40px;
        font-weight: 800;
        color: white;
        opacity: 0;
        transition: 0.3s ease-in-out;
    }

    .game:hover::before {
        opacity: 1;
    }

    .game.showSnake:hover {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/games/snake.png');
        transform: scale(1.02);
    }

    .game.showTetris:hover {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/games/tetris.png');
        transform: scale(1.02);
    }

    .game.show2048:hover {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/games/2048_@.png');
        transform: scale(1.02);
    }

    .showPlatform:hover {
        background-image: none;
        transform: scale(1.02);
    }

    .game .date {
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 20px;
        font-weight: 500;
    }

    .game .title {
        position: absolute;
        bottom: 20px;
        right: 20px;
        font-size: 40px;
        font-weight: 800;
    }


    @media only screen and (max-width: 428px) {
        .game {
            width: 400px;
            height: 500px;
        }

        .text {
            font-size: 30px;
        }

        .sub-text {
            font-size: 15px;
        }

        #game1 {
            background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/games/snake.png');
        }

        #game2 {
            background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/games/tetris.png');
        }

        #game3 {
            background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/games/2048_@.png');
        }

        #game4 {
            background-image: none;
        }

        .game::before {
            content: "Play!";

        }

        .game .date {
            font-size: 15px;
        }

        .game .title {
            font-size: 30px;
        }



    }


</style>
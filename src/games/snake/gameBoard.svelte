<script>
    import {BOARD_COLUMNS, BOARD_ROWS, setBoardColumns, setBoardRows} from "./utils.js";
    import {snakeGame} from "$lib/stores.js"
    import {onMount} from "svelte";

    onMount(() => {
        generateBoard();
    })

    function generateBoard() {

        $snakeGame.board = new Array(BOARD_ROWS).fill()
            .map(() => new Array(BOARD_COLUMNS).fill({}));

    }

</script>


<div class="board"
     style="grid-template-columns: repeat({BOARD_COLUMNS}, auto);
            grid-template-rows: repeat({BOARD_ROWS}, auto);">
    {#each $snakeGame.board as row, i (i)}
        {#each row as _, j (j)}
            <div class="cell" bind:this={$snakeGame.board[i][j]}></div>
        {/each}
    {/each}
</div>


<style>
    .board {
        position: relative;
        display: grid;
        padding: 0.6vh;
        gap: 0.3vh;
        border-radius: 0.6vh;
        background: rgba(0, 0, 0, 0.20);
    }

    .board .cell {
        position: relative;
        --cell-size: min(3.5vh, 7.5vw);
        height: var(--cell-size);
        width: var(--cell-size);
        background: rgba(0, 0, 0, 0.30);
        color: white;
        border-radius: 0.3vh;
    }

    @media screen and (max-width: 600px) {
        .board .cell{
            --cell-size: min(2.5vh, 3.5vw);
        }
    }
</style>
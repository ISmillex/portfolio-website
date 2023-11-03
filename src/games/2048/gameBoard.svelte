<script>
    import { onMount } from 'svelte';
    import {BOARD_SIZE} from "./utils.js";
    import {game2048} from "$lib/stores.js";
    import {Cell} from "./cell.js";


    onMount(() => {
        $game2048.board = Array(BOARD_SIZE).fill().map((_, i) =>
            Array(BOARD_SIZE).fill().map((_, j) => new Cell(i, j, null))
        );

    })

</script>


<div class="board" id="game2048-board"
     style="grid-template-columns: repeat({BOARD_SIZE}, var(--cell-size));
            grid-template-rows: repeat({BOARD_SIZE}, var(--cell-size));">
    {#each $game2048.board as row, i (i)}
        {#each row as cell, j (j)}
            <div class="cell" bind:this={cell.element}></div>
        {/each}
    {/each}
</div>

<style>
    .board {
        --cell-size: 15vmin;
        --cell-gap: 1vmin;
        position: relative;
        display: grid;
        gap: var(--cell-gap);
        border-radius: 1vmin;
        background: rgba(0, 0, 0, 0.20);
    }

    .board .cell {
        border-radius: 1vmin;
        background: rgba(0, 0, 0, 0.30);
        color: white;
    }

    @keyframes show {
        0% {
            opacity: 0.5;
            transform: scale(0);
        }
    }

</style>


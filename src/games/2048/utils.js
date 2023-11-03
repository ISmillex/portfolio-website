export let score = 0;


export function setScore(newScore) {
    score = newScore;
}

export function getScore() {
    return score;
}

export const BOARD_SIZE = 4;

export const TILE_STYLE ="position: absolute;\n" +
                                "top: calc(var(--y) * (var(--cell-size) + var(--cell-gap)));\n" +
                                "left: calc(var(--x) * (var(--cell-size) + var(--cell-gap)));\n" +
                                "display: flex;\n" +
                                "justify-content: center;\n" +
                                "align-items: center;\n" +
                                "width: var(--cell-size);\n" +
                                "height: var(--cell-size);\n" +
                                "border-radius: 1vmin;\n" +
                                "font-family: Arial, Helvetica, sans-serif;\n" +
                                "font-size: 4vmin;\n" +
                                "font-weight: bold;\n" +
                                "background-color: hsl(243, 35%, var(--bg-lightness));\n" +
                                "color: hsl(20, 25%, var(--text-lightness));\n" +
                                "animation: show 200ms;\n" +
                                "transition: 100ms;"
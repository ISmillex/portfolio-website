<script>
	import Board from './gameBoard.svelte';
	import { Tile } from './tile.js';
	import { onMount } from 'svelte';
	import {game2048} from "$lib/stores.js";
	import {BOARD_SIZE, getScore, setScore} from "./utils.js";
	import {fade} from "svelte/transition";

	let cellsGroupedByColumn, cellsGroupedByReversedColumn;
	let cellsGroupedByRow, cellsGroupedByReversedRow;
	let gameBoardElement;
	let score = 0;
	let showStart = true;
	let isStarted = false;
	let startText = ["Play", "Press space or tap to start"];

	onMount(async () => {
		const { Hammer } = await import('svelte-hammer');
		init();
		initTouch(Hammer);
	});

	function init() {
		gameBoardElement = document.getElementById("game2048-board");
		setupGroups()
		getRandomEmptyCell().linkTile(new Tile(gameBoardElement))
		getRandomEmptyCell().linkTile(new Tile(gameBoardElement))
		setupInputOnce();
	}
	function setupGroups() {
		cellsGroupedByColumn = groupCellsByColumn();
		cellsGroupedByReversedColumn = cellsGroupedByColumn.map(column => [...column].reverse());
		cellsGroupedByRow = groupCellsByRow();
		cellsGroupedByReversedRow = cellsGroupedByRow.map(raw => [...raw].reverse());
	}

	function getRandomEmptyCell() {
		const emptyCells = [];
		let board = $game2048.board;
		for (let i = 0; i <board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				if (board[i][j].isEmpty()) {
					emptyCells.push(board[i][j]);
				}
			}
		}
		const randomIndex = Math.floor(Math.random() * emptyCells.length);
		return emptyCells[randomIndex];
	}

	function groupCellsByColumn() {
		const cellsGroupedByColumn = [];
		for (let i=0; i< $game2048.board.length; i++) {
			for (const cell of $game2048.board[i]) {
				const columnIndex = cell.x;
				cellsGroupedByColumn[columnIndex] = cellsGroupedByColumn[columnIndex] || [];
				cellsGroupedByColumn[columnIndex][cell.y] = cell;
			}
		}
		return cellsGroupedByColumn;
	}
	function groupCellsByRow() {
		const cellsGroupedByRow = [];
		for (let i=0; i< $game2048.board.length; i++) {
			for (const cell of $game2048.board[i]) {
				const rowIndex = cell.y;
				cellsGroupedByRow[rowIndex] = cellsGroupedByRow[rowIndex] || [];
				cellsGroupedByRow[rowIndex][cell.x] = cell;
			}
		}
		return cellsGroupedByRow;
	}

	function setupInputOnce() {
		window.addEventListener("keydown", handleInput, { once: true });
	}


	function initTouch(hammer) {
		document.addEventListener('dblclick', (event) => {
			event.preventDefault();
		});

		hammer = new Hammer(document.getElementById('content-2048'));

		hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 });

		hammer.on('swipe', async (event) => {
			switch (event.direction) {
				case 8:
					if (!canMoveUp()) {
						return;
					}
					if (isStarted) {
						await moveUp();
						createNewTile();
					}
					break;
				case 16:
					if (!canMoveDown()) {
						return;
					}
					if (isStarted) {
						await moveDown();
						createNewTile();
					}
					break;
				case 2:
					if (!canMoveLeft()) {
						return;
					}
					if (isStarted) {
						await moveLeft();
						createNewTile();
					}
					break;
				case 4:
					if (!canMoveRight()) {
						return;
					}
					if (isStarted) {
						await moveRight();
						createNewTile();
					}
					break;
				default:
					return;
			}
		});

		hammer.on('tap', () => {
			if (!isStarted) {
				isStarted = true;
				showStart = false;
				startText = ["Play", "Press space or tap to start"];
			}
		});

	}


	function createNewTile() {
		const newTile = new Tile(gameBoardElement);
		getRandomEmptyCell().linkTile(newTile);

		if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
			gameOver();
		}
	}


	async function handleInput(event) {
		switch (event.key) {
			case "ArrowUp":
				if (!canMoveUp()) {
					setupInputOnce();
					return;
				}
				if (isStarted)
					await moveUp();
				break;
			case "ArrowDown":
				if (!canMoveDown()) {
					setupInputOnce();
					return;
				}
				if (isStarted)
					await moveDown();
				break;
			case "ArrowLeft":
				if (!canMoveLeft()) {
					setupInputOnce();
					return;
				}
				if (isStarted)
					await moveLeft();
				break;
			case "ArrowRight":
				if (!canMoveRight()) {
					setupInputOnce();
					return;
				}
				if (isStarted)
					await moveRight();
				break;
			case " ":
				if (!isStarted) {
					isStarted = true;
					showStart = false;
					startText = ["Play", "Press space or tap to start"];
					setupInputOnce();
					return;
				}
				setupInputOnce();
				return;
			default:
				setupInputOnce();
				return;
		}

		if (isStarted) {
			createNewTile();
			setupInputOnce();
		}
		setupInputOnce();
	}

	function gameOver() {
		showStart = true;
		isStarted = false;
		setScore(0)
		startText = ["Game Over", "Press space or tap to restart"];
		for (let i=0; i< $game2048.board.length; i++) {
			for (const cell of $game2048.board[i]) {
				cell.getLinkedTile().remove();
				cell.unlinkTile();
			}
		}
		init();
	}
	async function moveUp() {
		await slideTiles(cellsGroupedByColumn);
	}

	async function moveDown() {
		await slideTiles(cellsGroupedByReversedColumn);
	}

	async function moveLeft() {
		await slideTiles(cellsGroupedByRow);
	}

	async function moveRight() {
		await slideTiles(cellsGroupedByReversedRow);
	}

	async function slideTiles(groupedCells) {
		const promises = [];

		groupedCells.forEach(group => slideTilesInGroup(group, promises));

		await Promise.all(promises);

		for(let i=0; i< $game2048.board.length; i++) {
			for (const cell of $game2048.board[i]) {
				cell.hasTileForMerge() && cell.mergeTiles()
			}
		}
		score = getScore();
	}

	function slideTilesInGroup(group, promises) {
		for (let i = 1; i < group.length; i++) {
			if (group[i].isEmpty()) {
				continue;
			}

			const cellWithTile = group[i];

			let targetCell;
			let j = i - 1;
			while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) {
				targetCell = group[j];
				j--;
			}

			if (!targetCell) {
				continue;
			}

			promises.push(cellWithTile.linkedTile.waitForTransitionEnd());

			if (targetCell.isEmpty()) {
				targetCell.linkTile(cellWithTile.linkedTile);
			} else {
				targetCell.linkTileForMerge(cellWithTile.linkedTile);
			}

			cellWithTile.unlinkTile();
		}
	}


	function canMoveUp() {
		return canMove(cellsGroupedByColumn);
	}

	function canMoveDown() {
		return canMove(cellsGroupedByReversedColumn);
	}

	function canMoveLeft() {
		return canMove(cellsGroupedByRow);
	}

	function canMoveRight() {
		return canMove(cellsGroupedByReversedRow);
	}

	function canMove(groupedCells) {
		return groupedCells.some(group => canMoveInGroup(group));
	}

	function canMoveInGroup(group) {
		return group.some((cell, index) => {
			if (index === 0) {
				return false;
			}

			if (cell.isEmpty()) {
				return false;
			}

			const targetCell = group[index - 1];
			return targetCell.canAccept(cell.linkedTile);
		});
	}
</script>

<div class="content" id="content-2048">
	{#if showStart}
		<div class="start" transition:fade={{duration: 500}}>
			<h1>{startText[0]}</h1>
			<p>{startText[1]}</p>
		</div>
	{/if}
	<div class="wrapper">
		<div class="panel" style="width: calc(15vmin * {BOARD_SIZE} + 1vmin * {BOARD_SIZE-1});">
			<div class="title">2048 <span>{BOARD_SIZE}x{BOARD_SIZE}</span></div>
			<div class="score">Score: {score}</div>
		</div>
		<Board />
	</div>
</div>

<style>
	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		background: #15142a;
		background: radial-gradient(#37364c, #15142a);
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

	.panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 5px;
	}

	.title {
		font-size: 3vw;
		font-weight: bold;
		color: #fff;
	}

	.title span {
		font-size: 2vw;
		font-weight: normal;
		color: #fff;
	}

	.score {
		font-size: 2.5vw;
		font-weight: bold;
		color: #fff;
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

	@keyframes show {
		0% {
			opacity: 0.5;
			transform: scale(0);
		}
	}

	@media (max-width: 600px) {

		.title {
			font-size: 5vw;
		}

		.title span {
			font-size: 3vw;
		}

		.score {
			font-size: 4vw;
		}

		.start h1 {
			font-size: 3rem;
		}

		.start p {
			font-size: 1rem;
		}

	}
</style>

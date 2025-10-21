import { board, score, gridSize, setBoard, setScore } from "./constants.js";
import {
	addRandomTile,
	moveLeft,
	moveRight,
	moveUp,
	moveDown,
	checkWin,
	checkGameOver,
} from "./board.js";
import {
	renderBoard,
	updateScore,
	showEndMessage,
	hideEndMessage,
} from "./ui.js";

const initGame = () => {
	setBoard(
		Array(gridSize)
			.fill(null)
			.map(() => Array(gridSize).fill(0))
	);
	setScore(0);
	updateScore();
	addRandomTile();
	addRandomTile();
	renderBoard();
};

const move = (direction) => {
	let moved = false;
	const oldBoard = JSON.stringify(board);

	if (direction === "left") moved = moveLeft();
	else if (direction === "right") moved = moveRight();
	else if (direction === "up") moved = moveUp();
	else if (direction === "down") moved = moveDown();

	if (moved && JSON.stringify(board) !== oldBoard) {
		addRandomTile();
		renderBoard();

		if (checkWin()) setTimeout(() => showEndMessage("win", score), 100);
		else if (checkGameOver())
			setTimeout(() => showEndMessage("lose", score), 100);
	}
};

document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "ArrowUp":
			event.preventDefault();
			move("up");
			break;
		case "ArrowDown":
			event.preventDefault();
			move("down");
			break;
		case "ArrowRight":
			event.preventDefault();
			move("right");
			break;
		case "ArrowLeft":
			event.preventDefault();
			move("left");
			break;
	}
});

document.getElementById("play-again-btn").addEventListener("click", () => {
	hideEndMessage();
	initGame();
});

document.getElementById("restart-btn").addEventListener("click", () => {
	hideEndMessage();
	initGame();
});

initGame();

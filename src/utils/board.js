import { board, score, gridSize, setScore } from "./constants.js";
import { createPop } from "./animation.js";
import { updateScore } from "./ui.js";

export const addRandomTile = () => {
	const emptyCells = [];
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === 0) {
				emptyCells.push({ row: i, col: j });
			}
		}
	}
	if (emptyCells.length > 0) {
		const randomCell =
			emptyCells[Math.floor(Math.random() * emptyCells.length)];
		board[randomCell.row][randomCell.col] = Math.random() < 0.8 ? 2 : 4;
	}
};

export const moveLeft = () => {
	let moved = false;
	const mergedPositions = [];
	for (let i = 0; i < gridSize; i++) {
		let row = board[i].filter((val) => val !== 0);
		for (let j = 0; j < row.length - 1; j++) {
			if (row[j] === row[j + 1]) {
				row[j] *= 2;
				setScore(score + row[j]);
				row.splice(j + 1, 1);
				mergedPositions.push({ row: i, col: j });
				moved = true;
			}
		}
		while (row.length < gridSize) row.push(0);
		if (JSON.stringify(board[i]) !== JSON.stringify(row)) moved = true;
		board[i] = row;
	}

	if (moved) {
		createPop(mergedPositions);
	}

	updateScore();
	return moved;
};

export const moveRight = () => {
	let moved = false;
	const mergedPositions = [];
	for (let i = 0; i < gridSize; i++) {
		let row = board[i].filter((val) => val !== 0);
		let originalLength = row.length;
		for (let j = row.length - 1; j > 0; j--) {
			if (row[j] === row[j - 1]) {
				row[j] *= 2;
				setScore(score + row[j]);
				row.splice(j - 1, 1);
				const finalCol = gridSize - originalLength + j;
				mergedPositions.push({ row: i, col: finalCol });
				moved = true;
				j--;
			}
		}
		while (row.length < gridSize) row.unshift(0);
		if (JSON.stringify(board[i]) !== JSON.stringify(row)) moved = true;
		board[i] = row;
	}

	if (moved) {
		createPop(mergedPositions);
	}

	updateScore();
	return moved;
};

export const moveUp = () => {
	let moved = false;
	const mergedPositions = [];
	for (let j = 0; j < gridSize; j++) {
		let col = [];
		for (let i = 0; i < gridSize; i++)
			if (board[i][j] !== 0) col.push(board[i][j]);
		for (let i = 0; i < col.length - 1; i++) {
			if (col[i] === col[i + 1]) {
				col[i] *= 2;
				setScore(score + col[i]);
				col.splice(i + 1, 1);
				mergedPositions.push({ row: i, col: j });
				moved = true;
			}
		}
		while (col.length < gridSize) col.push(0);
		for (let i = 0; i < gridSize; i++) {
			if (board[i][j] !== col[i]) moved = true;
			board[i][j] = col[i];
		}
	}

	if (moved) {
		createPop(mergedPositions);
	}

	updateScore();
	return moved;
};

export const moveDown = () => {
	let moved = false;
	const mergedPositions = [];
	for (let j = 0; j < gridSize; j++) {
		let col = [];
		for (let i = 0; i < gridSize; i++)
			if (board[i][j] !== 0) col.push(board[i][j]);
		let originalLength = col.length;
		for (let i = col.length - 1; i > 0; i--) {
			if (col[i] === col[i - 1]) {
				col[i] *= 2;
				setScore(score + col[i]);
				col.splice(i - 1, 1);
				const finalRow = gridSize - originalLength + i;
				mergedPositions.push({ row: finalRow, col: j });
				moved = true;
				i--;
			}
		}
		while (col.length < gridSize) col.unshift(0);
		for (let i = 0; i < gridSize; i++) {
			if (board[i][j] !== col[i]) moved = true;
			board[i][j] = col[i];
		}
	}

	if (moved) {
		createPop(mergedPositions);
	}

	updateScore();
	return moved;
};

export const checkWin = () => {
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === 2048) return true;
		}
	}
	return false;
};

export const checkGameOver = () => {
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === 0) return false;
			if (j < gridSize - 1 && board[i][j] === board[i][j + 1])
				return false;
			if (i < gridSize - 1 && board[i][j] === board[i + 1][j])
				return false;
		}
	}
	return true;
};

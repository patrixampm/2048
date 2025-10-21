let board = [];
let score = 0;
const gridSize = 4;

const initGame = () => {
	board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
	score = 0;
	updateScore();
	addRandomTile();
	addRandomTile();
	renderBoard();
}

const addRandomTile = () => {
	const emptyCells = [];
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === 0) {
				emptyCells.push({row: i, col: j})
			}
		}
	}
	if(emptyCells.length > 0) {
		const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
		board[randomCell.row][randomCell.col] = Math.random() < 0.8 ? 2 : 4;
	}
}

const renderBoard = () => {
	const gridContainer = document.querySelector('.grid-container');
	gridContainer.innerHTML = '';

	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			const tile = document.createElement('div');
			tile.className = 'tile';
			if (board[i][j] !== 0) {
				tile.textContent = board[i][j];
				tile.classList.add(`tile-${board[i][j]}`);
			}
			gridContainer.appendChild(tile);
		}
	}
}

const updateScore = () => {
	document.getElementById('score').textContent = score;
}

const move = (direction) => {
	let moved = false;
	const oldBoard = JSON.stringify(board);

	if (direction == 'left')
		moved = moveLeft();
	else if (direction == 'right')
		moved = moveRight();
	else if (direction == 'up')
		moved = moveUp();
	else if (direction == 'down')
		moved = moveDown();

	if (moved && JSON.stringify(board) !== oldBoard) {
		addRandomTile();
		renderBoard();
	
		if (checkWin())
			setTimeout(() => alert('You won! Good job for reaching 2048!'), 100);
		else if (checkGameOver())
			setTimeout(() => alert('Game Over! You have no space.'), 100);
	}
}

const createPop = (mergedPositions) => {
	setTimeout(() => {
		mergedPositions.forEach(pos => {
			const tileIndex = pos.row * gridSize + pos.col;
			const gridContainer = document.querySelector('.grid-container');
			const tileElement = gridContainer.children[tileIndex];
			if (tileElement) {
				tileElement.classList.add('tile-merge');
			}
		});
	}, 10);
}

const moveLeft = () => {
	let moved = false;
	const mergedPositions = [];
	for (let i = 0; i < gridSize; i++) {
		let row = board[i].filter(val => val !== 0);
		for (let j = 0; j < row.length - 1; j++) {
			if (row[j] === row[j + 1]) {
				row[j] *= 2;
				score += row[j];
				row.splice(j + 1, 1);
				mergedPositions.push({row: i, col: j});
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
}

const moveRight = () => {
	let moved = false;
	const mergedPositions = [];
	for (let i = 0; i < gridSize; i++) {
		let row = board[i].filter(val => val !== 0);
		for (let j = row.length - 1; j > 0; j--) {
			if (row[j] === row[j - 1]) {
				row[j] *= 2;
				score += row[j];
				row.splice(j - 1, 1);
				mergedPositions.push({row: i, col: gridSize - row.length + j - 1});
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
}

const moveUp = () => {
	let moved = false;
	const mergedPositions = [];
	for (let j = 0; j < gridSize; j++) {
		let col = [];
		for (let i = 0; i < gridSize; i++)
			if (board[i][j] !== 0) col.push(board[i][j]);
		for (let i = 0; i < col.length - 1; i++) {
			if (col[i] === col[i + 1]) {
				col[i] *= 2;
				score += col[i];
				col.splice(i + 1, 1);
				mergedPositions.push({row: i, col: j});
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
}

const moveDown = () => {
	let moved = false;
	const mergedPositions = [];
	for (let j = 0; j < gridSize; j++) {
		let col = [];
		for (let i = 0; i < gridSize; i++)
			if (board[i][j] !== 0) col.push(board[i][j]);
		for (let i = col.length - 1; i > 0 ; i--) {
			if (col[i] === col[i - 1]) {
				col[i] *= 2;
				score += col[i];
				col.splice(i - 1, 1);
				mergedPositions.push({row: gridSize - col.length + i - 1, col: j});
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
}

const checkWin = () => {
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === 2048) return true;
		}
	}
	return false;
}

const checkGameOver = () => {
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === 0) return false;
			if (j < gridSize - 1 && board[i][j] === board[i][j + 1]) return false;
			if (i < gridSize - 1 && board[i][j] === board[i + 1][j]) return false;
		}
	}
	return true;
}

document.addEventListener('keydown', (event) => {
	switch(event.key) {
		case 'ArrowUp':
			event.preventDefault();
			move('up');
			break;
		case 'ArrowDown':
			event.preventDefault();
			move('down');
			break;
		case 'ArrowRight':
			event.preventDefault();
			move('right');
			break;
		case 'ArrowLeft':
			event.preventDefault();
			move('left');
			break;
	}
});

document.getElementById('restart-btn').addEventListener('click', initGame);

initGame();

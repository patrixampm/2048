import { board, score, gridSize } from "./constants.js";

export const renderBoard = () => {
	const gridContainer = document.querySelector(".grid-container");
	if (!gridContainer) return;
	gridContainer.innerHTML = "";

	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			const tile = document.createElement("div");
			tile.className = "tile";
			if (board[i][j] !== 0) {
				tile.textContent = board[i][j];
				tile.classList.add(`tile-${board[i][j]}`);
			}
			gridContainer.appendChild(tile);
		}
	}
};

export const updateScore = () => {
	document.getElementById("score").textContent = score;
	updateBackground();
};

const updateBackground = () => {
	const body = document.body;
	const colorStops = [
		{ score: 0, color1: [249, 143, 189], color2: [122, 242, 17] },
		{ score: 100, color1: [212, 165, 243], color2: [247, 231, 109] },
		{ score: 500, color1: [102, 126, 234], color2: [72, 209, 204] },
		{ score: 1000, color1: [255, 154, 86], color2: [255, 87, 87] },
		{ score: 2000, color1: [168, 85, 247], color2: [236, 72, 153] },
		{ score: 5000, color1: [255, 215, 0], color2: [255, 140, 0] },
	];

	let lowerStop = colorStops[0];
	let upperStop = colorStops[1];

	for (let i = 0; i < colorStops.length - 1; i++) {
		if (score >= colorStops[i].score && score < colorStops[i + 1].score) {
			lowerStop = colorStops[i];
			upperStop = colorStops[i + 1];
			break;
		} else if (score >= colorStops[colorStops.length - 1].score) {
			lowerStop = colorStops[colorStops.length - 1];
			upperStop = colorStops[colorStops.length - 1];
			break;
		}
	}

	const range = upperStop.score - lowerStop.score;
	const progress =
		range === 0 ? 1 : Math.min((score - lowerStop.score) / range, 1);

	const interpolateColor = (color1, color2, factor) => {
		return color1.map((c, i) => Math.round(c + (color2[i] - c) * factor));
	};

	const currentColor1 = interpolateColor(
		lowerStop.color1,
		upperStop.color1,
		progress
	);
	const currentColor2 = interpolateColor(
		lowerStop.color2,
		upperStop.color2,
		progress
	);

	body.style.background = `linear-gradient(135deg, rgb(${currentColor1.join(
		","
	)}) 0%, rgb(${currentColor2.join(",")}) 100%)`;
	body.style.transition = "background 0.5s ease";
};

export const showEndMessage = (type, finalScore) => {
	const messageBox = document.getElementById("message-box");
	const messageTitle = document.getElementById("message-title");
	const messageText = document.getElementById("message-text");

	if (type === "win") {
		messageTitle.textContent = "🎉 You Won! 🎉";
		messageText.textContent = `Congratulations! You reached 2048 with a score of ${finalScore}!`;
	} else {
		messageTitle.textContent = "Game Over";
		messageText.textContent = `No more moves available. Your final score is ${finalScore}.`;
	}

	messageBox.classList.remove("hidden");
	setTimeout(() => {
		messageBox.classList.add("show");
	}, 10);
};

export const hideEndMessage = () => {
	const messageBox = document.getElementById("message-box");
	messageBox.classList.remove("show");
	setTimeout(() => {
		messageBox.classList.add("hidden");
	}, 300);
};

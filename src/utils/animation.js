import { gridSize } from "./constants.js";

export const createPop = (mergedPositions) => {
	setTimeout(() => {
		mergedPositions.forEach((pos) => {
			const tileIndex = pos.row * gridSize + pos.col;
			const gridContainer = document.querySelector(".grid-container");
			const tileElement = gridContainer.children[tileIndex];
			if (tileElement) {
				tileElement.classList.remove("tile-merge");
				tileElement.classList.add("tile-merge");
				setTimeout(() => {
					tileElement.classList.remove("tile-merge");
				}, 500);
				createParticles(tileElement);
			}
		});
	}, 10);
};

const createParticles = (tileElement) => {
	const gridContainer = document.querySelector(".grid-container");
	const rect = tileElement.getBoundingClientRect();
	const gridRect = gridContainer.getBoundingClientRect();

	const particleCount = 8;
	const colors = [
		"#f70101",
		"#ef41e0",
		"#f06ee5",
		"#eca8e6",
		"#7af211",
		"#d12595",
	];

	for (let i = 0; i < particleCount; i++) {
		const particle = document.createElement("div");
		particle.className = "particle";

		particle.style.background =
			colors[Math.floor(Math.random() * colors.length)];

		const centerX = rect.left - gridRect.left + rect.width / 2;
		const centerY = rect.top - gridRect.top + rect.height / 2;
		particle.style.left = centerX + "px";
		particle.style.top = centerY + "px";

		const angle = (i / particleCount) * Math.PI * 2;
		const distance = 40 + Math.random() * 30;
		const tx = Math.cos(angle) * distance;
		const ty = Math.sin(angle) * distance;

		particle.style.setProperty("--tx", tx + "px");
		particle.style.setProperty("--ty", ty + "px");

		gridContainer.appendChild(particle);

		requestAnimationFrame(() => {
			particle.classList.add("particle-animate");
		});

		setTimeout(() => {
			particle.remove();
		}, 600);
	}
};

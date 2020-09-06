const width = 20;
const height = 20;

let dx = 1;
let dy = 0;
let snake = [{
	x: 0,
	y: 0,
}];
let gameInterval;

let map;
/*
	0 - space
	1 - snake
	2 - point
*/


const addPoint = () => {
	const point = {
		x: parseInt(Math.random() * 1024) % width,
		y: parseInt(Math.random() * 1024) % height,
	};

	if (map[point.x][point.y] != 0)
		addPoint();
	else {
		map[point.x][point.y] = 2;
		document.getElementById(`pixel_${point.x}_${point.y}`).classList
				.add('point');
	}
};


const generateTable = () => {
	const generateRow = rowIndex => {
		const rowElement = document.createElement('tr');
		for (let columnIndex = 0; columnIndex < width; columnIndex++) {
			const pixelElement = document.createElement('td');
			pixelElement.id = `pixel_${columnIndex}_${rowIndex}`;
			pixelElement.classList.add('pixel');
			rowElement.appendChild(pixelElement);
		}
		return rowElement;
	}

	for (let rowIndex = 0; rowIndex < height; rowIndex++)
		document.getElementById('table').appendChild(generateRow(rowIndex));

	map = Array(width);
	for (let x = 0; x < width; x++) {
		map[x] = Array(height);
		for (let y = 0; y < height; y++)
			map[x][y] = 0;
	}
	addPoint();
};


const finish = () => {
	clearInterval(gameInterval);
	alert(`Game Over!\nYour length is: ${snake.length}`);
	document.location.reload(true);
};


const loop = () => {
	const getNewHeadCords = () => ({
		x: (snake[0].x + dx + width) % width,
		y: (snake[0].y + dy + height) % height,
	});

	const checkStep = () => {
	//returns id of next head step pixel
		const newCords = getNewHeadCords();
		return map[newCords.x][newCords.y];
	};

	const step = (lengthIncreased) => {
		const clearSnake = () => {
			for (let i = 0; i < snake.length; i++) {
				map[snake[i].x][snake[i].y] = 0;
				let pixelElement = document.getElementById(`pixel_${snake[i].x}_${snake[i].y}`);
				pixelElement.classList.remove('active');
				pixelElement.classList.remove('connect-right');
				pixelElement.classList.remove('connect-bottom');
			}
		}

		const drawSnake = () => {
			for (let i = 0; i < snake.length; i++) {
				map[snake[i].x][snake[i].y] = 1;
				let pixelElement = document.getElementById(`pixel_${snake[i].x}_${snake[i].y}`);
				pixelElement.classList.add('active');
				if (i > 0) {
					if (snake[i].x + 1 == snake[i - 1].x && snake[i].y == snake[i - 1].y)
						pixelElement.classList.add('connect-right');
					if (snake[i].x == snake[i - 1].x && snake[i].y + 1 == snake[i - 1].y)
						pixelElement.classList.add('connect-bottom');
				}
				if (i < snake.length - 1) {
					if (snake[i].x + 1 == snake[i + 1].x && snake[i].y == snake[i + 1].y)
						pixelElement.classList.add('connect-right');
					if (snake[i].x == snake[i + 1].x && snake[i].y + 1 == snake[i + 1].y)
						pixelElement.classList.add('connect-bottom');
				}
			}
		}

		clearSnake();
		if (lengthIncreased)
			snake.push(snake[snake.length - 1]);
		const newCords = getNewHeadCords();
		for (let i = snake.length - 1; i > 0; i--)
			snake[i] = snake[i-1];
		snake[0] = newCords;
		document.getElementById(`pixel_${newCords.x}_${newCords.y}`).classList
				.remove('point');
		drawSnake();
		if (lengthIncreased)
			addPoint();
	};

	const nextHeadStepPixelIndex = checkStep();
	switch(nextHeadStepPixelIndex) {
		case 0:
			step();
			break;
		case 1:
			finish();
			break;
		case 2:
			step(true);
			break;
	}
};


const start = interval => {
	gameInterval = setInterval(
		() => loop(),
		interval);
};


const changeDirection = (newDx, newDy) => {
	console.log(map);
	dx = newDx;
	dy = newDy;
}


document.onkeypress = e => {
    let keyCode = e.keyCode;
    switch (keyCode) {
    	case 97:
    		if (dx != 1)
    			changeDirection(-1, 0);
    		break;
    	case 119:
    		if (dy != 1)
    			changeDirection(0, -1);
    		break;
    	case 100:
    		if (dx != -1)
    			changeDirection(1, 0);
    		break;
    	case 115:
    		if (dy != -1)
    			changeDirection(0, 1);
    		break;
    }
};


generateTable();
start((7 - parseInt(prompt('Choose your speed (1 - 5)'))) * 50, 1);
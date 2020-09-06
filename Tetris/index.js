const resolution = {
	sizeX: 10,
	sizeY: 20,
};
let gameTimer;
let map;
let currentFigure;
let nextFigure;


const alertNext = () => {
	console.log(nextFigure.name);
}


const updateScreen = () => {
	let colorMap = Array(resolution.sizeX)
			.fill(undefined)
			.map(() => Array(resolution.sizeY)
					.fill(undefined));

	for (let x = 0; x < resolution.sizeX; x++)
		for (let y = 0; y < resolution.sizeY; y++)
			switch (map[x][y]) {
				case 0:
					colorMap[x][y] = '#ffffff';
					break;
				case 1:
					colorMap[x][y] = 'rgb(255, 65, 225)';
					break;
				default:
					colorMap[x][y] = '#999999';
					break;
			}

	for (let figureX = 0; figureX < currentFigure.sizeX; figureX++)
		for (let figureY = 0; figureY < currentFigure.sizeY; figureY++)
			if (currentFigure.schema[figureX][figureY] == 1)
				colorMap[currentFigure.x + figureX][currentFigure.y + figureY] = '#ff0000';

	let table = document.getElementById('table');
	drawTable(table, colorMap);
};


const checkOnBump = () => {
	if (currentFigure.y + currentFigure.sizeY == resolution.sizeY)
		return true;

	for (let x = 0; x < currentFigure.sizeX; x++)
		for (let y = currentFigure.sizeY - 1; y >= 0; y--)
			if (currentFigure.schema[x][y] == 1) {
				if (map[currentFigure.x + x][currentFigure.y + y + 1] == 1)
					return true;
				break;
			}

	return false;
};


const checkOnStuck = () => {
	for (let x = 0; x < currentFigure.sizeX; x++)
			for (let y = 0; y < currentFigure.sizeY; y++)
				if (currentFigure.schema[x][y] == 1)
					if (map[currentFigure.x + x][currentFigure.y + y] == 1)
						return true;

	return false;
}


const RandomFigure = () => {
	return tetrisFigures[Math.floor(Math.random() * 1024) % tetrisFigures.length];
};


const finish = () => {
	clearInterval(gameTimer);
};


const loop = () => {
	if (checkOnStuck())
		finish();

	if (checkOnBump()) {
		const checkFullLayer = () => {
			for (let y = 0; y < resolution.sizeY; y++) {
				let isFull = true;
				for (let x = 0; x < resolution.sizeX; x++)
					if (map[x][y] == 0) {
						isFull = false;
						break;
					}
				if (isFull)
					return y;
			}

			return -1;
		};

		for (let x = 0; x < currentFigure.sizeX; x++)
			for (let y = 0; y < currentFigure.sizeY; y++)
				if (currentFigure.schema[x][y] == 1)
					map[currentFigure.x + x][currentFigure.y + y] = 1;

		currentFigure = {
			...nextFigure,
			x: Math.floor(resolution.sizeX / 2) - 1,
			y: 0,
		};
		nextFigure = RandomFigure();
		alertNext();

		for (let fullLayerY = checkFullLayer(); fullLayerY != -1; fullLayerY = checkFullLayer())
			for (let x = 0; x < resolution.sizeX; x++)
				for (let y = fullLayerY; y > 0; y--)
					map[x][y] = map[x][y - 1];
	}

	currentFigure.y++;
	updateScreen();
};


const start = gameUpdateInterval => {
	currentFigure = {
		...RandomFigure(),
		x: Math.floor(resolution.sizeX / 2) - 1,
		y: 0,
	};
	nextFigure = RandomFigure();
	alertNext();
	gameTimer = setInterval(loop, gameUpdateInterval);
};


const generateMap = () => {
	const {sizeX, sizeY} = resolution;
	map = Array(sizeX)
			.fill(undefined)
			.map(() => Array(sizeY)
					.fill(0));
};


const rotateFigure = direction => {
	const oldFigure = currentFigure;
	let newFigure = {
		...currentFigure,
		sizeX: currentFigure.sizeY,
		sizeY: currentFigure.sizeX,
	};

	const oldSchema = oldFigure.schema;
	let newSchema = Array(newFigure.sizeX)
			.fill(undefined)
			.map(() => Array(newFigure.sizeY)
					.fill(undefined));

	if (direction == 'left') {
		for (let i = 0; i < oldFigure.sizeX; i++)
			for (let j = 0; j < oldFigure.sizeY; j++)
				newSchema[j][newFigure.sizeY - 1 - i] = oldSchema[i][j];

		newFigure.schema = newSchema;
	}
	else if (direction == 'right') {
		for (let i = 0; i < oldFigure.sizeX; i++)
			for (let j = 0; j < oldFigure.sizeY; j++)
				newSchema[newFigure.sizeX - 1 - j][i] = oldSchema[i][j];
	
		newFigure.schema = newSchema;
	}

	while (newFigure.x + newFigure.sizeX > resolution.sizeX)
		newFigure.x--;

	currentFigure = newFigure;
	updateScreen();
};


const moveFigure = direction => {
	let dx;
	let dy;
	switch (direction) {
		case 'left':
			dx = -1;
			dy = 0;
			break;
		case 'right':
			dx = 1;
			dy = 0;
			break;
		case 'down':
			dx = 0;
			dy = 1;
			break;
		default:
			dx = 0;
			dy = 0;
			break;
	}

	const oldPosition = {
		x: currentFigure.x,
		y: currentFigure.y,
	};
	const newPosition = {
		x: oldPosition.x + dx,
		y: oldPosition.y + dy,
	};
	
	if (newPosition.x < 0 || newPosition.x + currentFigure.sizeX > resolution.sizeX)
		return;
	if (newPosition.y < 0 || newPosition.y + currentFigure.sizeY > resolution.sizeY)
		return;

	currentFigure = {
		...currentFigure,
		...newPosition,
	};

	if (checkOnStuck())
		currentFigure = {
			...currentFigure,
			...oldPosition,
		};
	
	updateScreen();
};


document.addEventListener('keypress', e => {
  const keyName = e.key;
  switch (keyName) {
  	case 'q':
  		rotateFigure('left');
  		break;
  	case 'e':
	  	rotateFigure('right');
  		break;
  	case 'a':
  		moveFigure('left');
  		break;
  	case 'd':
  		moveFigure('right');
  		break;
  	case 's':
  		moveFigure('down');
  		break;
  }
});


const onWindowLoad = e => {
	genearteTable(document.getElementById('table'), resolution);
	generateMap();
	const gameUpdateInterval = parseInt(prompt('Set game update intreval:', 500));
	start(gameUpdateInterval);
};


document.addEventListener("DOMContentLoaded", onWindowLoad);
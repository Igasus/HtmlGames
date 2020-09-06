const resolution = {
	sizeX: 20,
	sizeY: 20,
};
const minesAmount = 20;
let map = {
	full: undefined,
	completed: undefined,
};


const generateMap = () => {
	const {sizeX, sizeY} = resolution;
	map.completed = Array(sizeX)
			.fill(undefined)
			.map(() => Array(sizeY)
					.fill(0));
	map.full = Array(sizeX)
			.fill(undefined)
			.map(() => Array(sizeY)
					.fill(0));

	for (let i = 0; i < minesAmount; i++) {
		let x = Math.floor(Math.random() * sizeX);
		let y = Math.floor(Math.random() * sizeY);
		while (map.full[x][y] < 0) {
			x = Math.floor(Math.random() * sizeX);
			y = Math.floor(Math.random() * sizeY);
		}

		map.full[x][y] = -10;
		const delta = {
			x: [-1, 0, 1],
			y: [-1, 0, 1],
		};
		for (let dx of delta.x)
			for (let dy of delta.y)
				if (x + dx >= 0 && x + dx < sizeX
						&& y + dy >= 0 && y + dy < sizeY)
					map.full[x + dx][y + dy]++;
	}

	Table.print(map.full);
}


const onPixelClick = ({x, y}) => {
	// console.log('click', {x, y});
};


const onPixelDoubleClick = ({x, y}) => {
	// console.log('double click', {x, y});
};


const onPixelRightClick = ({x, y}) => {
	// console.log('right click', {x, y});
};


const onKeyPress = keyName => {

};


const loadGame = () => {
	Table.init(document.getElementById('table'), resolution);
	document.addEventListener('pixelClick', e => onPixelClick(e.detail));
	document.addEventListener('pixelDoubleClick', e => onPixelDoubleClick(e.detail));
	document.addEventListener('pixelRightClick', e => onPixelRightClick(e.detail));
	generateMap();
};
const genearteTable = (tableElement, {sizeX, sizeY}) => {
	for (let y = 0; y < sizeY; y++) {
		let rowElement = document.createElement('tr');
		for (let x = 0; x < sizeX; x++) {
			let pixelElement = document.createElement('td');
			pixelElement.id = `pixel_${x}_${y}`;
			pixelElement.classList.add('pixel');
			rowElement.appendChild(pixelElement);
		}
		tableElement.appendChild(rowElement);
	}
};


const drawTable = (tableElement, screen) => {
	const sizeX = screen.length;
	const sizeY = screen[0].length;
	for (let x = 0; x < sizeX; x++)
		for (let y = 0; y < sizeY; y++)
			document.getElementById(`pixel_${x}_${y}`)
					.style.backgroundColor = screen[x][y];
};
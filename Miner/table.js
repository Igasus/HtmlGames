const Table = {
	element: undefined,
	events: {
		onPixelClick: ({x, y}) => {
			const onPixelClickEvent = new CustomEvent('pixelClick', {detail: {x, y}});
			document.dispatchEvent(onPixelClickEvent);
		},
		onPixelDoubleClick: ({x, y}) => {
			const onPixelDoubleClickEvent = new CustomEvent('pixelDoubleClick', {detail: {x, y}});
			document.dispatchEvent(onPixelDoubleClickEvent);
		},
		table_onPixelRightClick: ({x, y}) => {
			const onPixelRightClickEvent = new CustomEvent('pixelRightClick', {detail: {x, y}});
			document.dispatchEvent(onPixelRightClickEvent);
		},
	},
	init: (tableElement, {sizeX, sizeY}) => {
		this.element = tableElement;
		for (let y = 0; y < sizeY; y++) {
			let rowElement = document.createElement('tr');
			for (let x = 0; x < sizeX; x++) {
				let pixelElement = document.createElement('td');
				pixelElement.id = `pixel_${x}_${y}`;
				pixelElement.classList.add('pixel');
				pixelElement.addEventListener('click', e => this.events.onPixelClick({x, y}));
				pixelElement.addEventListener('dblclick', e => this.events.onPixelDoubleClick({x, y}));
				pixelElement.addEventListener('contextmenu', e => {
					e.preventDefault();
					this.events.onPixelRightClick({x, y});
				});
				rowElement.appendChild(pixelElement);
			}
			this.element.appendChild(rowElement);
		}
	},
	draw: (screen) => {
		const sizeX = screen.length;
		const sizeY = screen[0].length;
		for (let x = 0; x < sizeX; x++)
			for (let y = 0; y < sizeY; y++)
				document.getElementById(`pixel_${x}_${y}`)
						.style.backgroundColor = screen[x][y];
	},
	print: (screen) => {
		const sizeX = screen.length;
		const sizeY = screen[0].length;
		for (let x = 0; x < sizeX; x++)
			for (let y = 0; y < sizeY; y++)
				document.getElementById(`pixel_${x}_${y}`)
						.innerHTML = `<p>${screen[x][y]}</p>`;
	},
};
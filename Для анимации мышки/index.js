const points = [
	{ x:   0, y: -125 },
	{ x: -60, y:  -90 },
	{ x:  60, y:  -90 },
	{ x: -55, y:    0 },
	{ x:  55, y:    0 },
	{ x: -40, y:   90 },
	{ x:  40, y:   90 },
	{ x:   0, y:   90 },
];


const drawPoints = () => {
	let mainElement = document.getElementById('mainBlock');
	for (let i = 0; i < points.length; i++) {
		const shift = points[i];
		let pointElement = document.createElement('div');
		pointElement.classList.add('point');
		pointElement.style.transform = `translate(${shift.x - 2}px, ${shift.y - 2}px)`;
		mainElement.appendChild(pointElement);
	}
}

const onAngleInputChange = value => {
	const angle = parseInt(value) ? value : '0';
	document.getElementById('picture')
			.style.transform = `rotate(${angle}deg)`;
};

const onWindowLoad = () => {
	drawPoints();
	document.getElementById('angleInput')
			.addEventListener('input', e => onAngleInputChange(e.target.value));
};

document.addEventListener('DOMContentLoaded', () => onWindowLoad());
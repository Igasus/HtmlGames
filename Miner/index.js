document.addEventListener('keypress', e => onKeyPress(e.key));


const onWindowLoad = e => {
	loadGame();
};


document.addEventListener("DOMContentLoaded", onWindowLoad);
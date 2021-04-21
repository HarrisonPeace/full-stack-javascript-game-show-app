// JavaScript Document

let game;
const PhraseUL = document.getElementById('phrase-ul');
const startBtn = document.getElementById('btn__reset');
const virtualKeyboard = document.getElementById('qwerty');
startBtn.focus();

//add event listener to click button that creates new game;
startBtn.addEventListener('click', () => {
	game = new Game();
	game.startGame();
});


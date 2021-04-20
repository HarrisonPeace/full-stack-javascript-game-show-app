// JavaScript Document

const game = new Game();
const PhraseUL = document.getElementById('phrase-ul');
const startBtn = document.getElementById('btn__reset');

/**
* Checks to see if click event occured on a virtual keyboard key.
* If so: passes letter clicked into game.handleLetter function & adds key to letter pressed array
* @param  {object}  event object
**/
function handleInteractionClick(e) {
    if (e.target.className == 'key') {
        game.handleLetter(e.target.textContent)
        game.keysPressed.push(e.target.textContent)
    }
}

/**
* Checks to see if keydown event occured on a letter
* If so: passes letter pressed into game.handleLetter function & adds key to letter pressed array
* @param  {object}  event object
**/
function handleInteractionKey(e) {
    if (game.keysPressed.indexOf(e.key) > -1) {
        return
    } else if (/[a-z]/.test(e.key)) {
        game.handleLetter(e.key)
        game.keysPressed.push(e.key)
    } else if (/[A-Z]/.test(e.key)) {
        game.handleLetter(e.key.toLowerCase())
        game.push(e.key.toLowerCase())
    }
}

//add event listener to click button that creates new game;
startBtn.addEventListener('click', () => {
	document.getElementById('overlay').style.display = 'none';
	document.getElementById('qwerty').addEventListener('click', handleInteractionClick);
	document.addEventListener('keydown', handleInteractionKey);
	game.startGame();
});




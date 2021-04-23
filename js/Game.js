// JavaScript Document

class Game {
	constructor () {
		this.missed = 0;
		this.phrases = [
            'Every moment is a fresh beginning',
            'The secret of getting ahead is getting started.',
            'It’s hard to beat a person who never gives up',
            'Die with memories, not dreams',
            'Do one thing every day that scares you',
            'Everything you can imagine is real',
            'What we think we become'
		];
		this.activePhrase = null;
		this.keysPressed = [];
	}
	
	/**
    * Returns random phrase {string} from phrase list {array}
	* @param  {array}  array of phrases
	* @return {string} random phrase
    **/
	getRandomPhrase(phrases) {
		return phrases[Math.floor(Math.random() * phrases.length)]
	}
	
	/**
    * Starts game by:
	* Selecting a phrase and adding it to the display.
	* Adding event listners for both mouse clicks and keydown events.
    **/
	startGame() {
		document.getElementById('overlay').style.display = 'none';
		this.activePhrase = new Phrase(this.getRandomPhrase(this.phrases));
		this.activePhrase.addPhraseToDisplay();
		virtualKeyboard.addEventListener('click', this.handleInteraction);
		document.addEventListener('keydown', this.handleInteraction);
	}
	
	/**
	* $$-- Note "game" is used instead of "this" as using this points to event object and not the game object --$$
	* Handles user intertaction
	* converts e to letter or key
	* Will then only pass data to next functions if object is a single letter and hasnt been pressed before
	**/
	handleInteraction(e) {
		let letter;
		e.type == 'click' ? letter = e.target.textContent : letter = e.key.toLowerCase();
        if (/^[a-z]$/.test(letter) && game.keysPressed.indexOf(letter) == -1) {
            game.keysPressed.push(letter);
			if(game.activePhrase.checkLetter(letter)) {
				game.activePhrase.showMatchedLetter(letter);
            	game.disableKey(letter, true);
            	if (game.checkForWin()) {
					game.gameOver(true)
				}
			} else { 
            	game.disableKey(letter, false);
            	game.removeLife();
        	}
        }
	}
	
	/**
    * disables key clicked or pressed
	* @param  {string}  letter clicked or pressed
	* @param  {bolean}  if key matched active phrase
    **/
	disableKey(letter, inPhrase) {
		let keys = document.getElementById('qwerty').querySelectorAll('button');
		for(let i = 0; i < keys.length; i++) {
			if(keys[i].textContent == letter) {
				keys[i].setAttribute('disabled', 'true');
				if (inPhrase) {
					keys[i].className = 'key chosen';
				} else {
					keys[i].className = 'key wrong';
				}
				break;
			}
		}
	}
	
	/**
    * removes life and checks if game has been lost
    **/
	removeLife() {
		let life = document.querySelector('[src="images/liveHeart.png"]');
		life.src = 'images/lostHeart.png';
		this.missed++;
		if (this.missed == 5) {
			this.gameOver(false);
		}
	}
	
	/**
    * Checks to see if any letters are still hidden if so game has not been won
	* If game won calls game over function
    **/
	checkForWin() {
		let phLetters = PhraseUL.querySelectorAll('li');
		for (let i = 0; i < phLetters.length; i++) {
			if (phLetters[i].classList.contains('hide')) {
				return false;
			}
		}
		return true;
	}
	
	/**
    * Shows overlay with either win or lose message
	* Resets game
	* @param  {boolean}  game won / lost
    **/
	gameOver(win) {
		let overlay = document.getElementById('overlay');
		let gameOverMessage = document.getElementById('game-over-message');
		overlay.style.display = 'flex';
		if (win) {
			overlay.className = 'win'
			gameOverMessage.innerHTML = `You Win :)<br><br><i>The phase was: "${this.activePhrase.phrase}"</i>`
			startBtn.innerHTML = 'Play Again?';
		} else {
			overlay.className = 'lose';
			gameOverMessage.innerHTML = `You Lose :(<br><br><i>The phase was: "${this.activePhrase.phrase}"</i>`;
			startBtn.innerHTML = 'Try Again?';
		}
		this.resetGame();
		startBtn.focus();
	}
	
	/**
    * Removes active phrase from page
	* Changes all lives back to liveheart.png
	* Re-enables all keys
	* Removes event listeners to avoid change in game state
    **/
	resetGame() {
		PhraseUL.innerHTML = '';
		let lifes = document.querySelectorAll('.tries img');
		for (let i = 0; i < lifes.length; i++) {
			lifes[i].src = 'images/liveHeart.png';
		}
		let keys = document.getElementById('qwerty').querySelectorAll('button');
		for(let i = 0; i < keys.length; i++) {
			keys[i].removeAttribute('disabled');
			keys[i].className = 'key';
		}
		virtualKeyboard.removeEventListener('click', this.handleInteraction);
		document.removeEventListener('keydown', this.handleInteraction);
	}
}
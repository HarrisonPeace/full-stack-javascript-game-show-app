// JavaScript Document

class Phrase {
	constructor (phrase) {
		this.phrase = phrase.toLowerCase();
		this.HTMLphrase = this.createPhraseList(this.phrase);
	}
	
	/**
    * converts phrase string into HTML string ready to be appended to the document
	* @param  {string}  phrase
	* @return {string} 
    **/
	createPhraseList(phrase) {
		let phraseArray = phrase.replace(/[^a-z\s]/, '').split('')
		for (let i = 0; i < phraseArray.length; i++) {
			phraseArray[i] = /[a-z]/.test(phraseArray[i]) ? `<li class="hide letter ${phraseArray[i]}">${phraseArray[i]}</li>` : '<li class="space"> </li>';
		}
		return phraseArray
	}
	
	/**
    * Appends converted phrase HTML text to phrase-ul element 
    **/
	addPhraseToDisplay() {
		PhraseUL.insertAdjacentHTML('afterbegin', this.HTMLphrase.join(''))
	}
	
	/**
    * Checks to see if letter clicked or pressed is found in the phrase
    * @param  {string}  single letter from keyboard or mouse click (on virtual keyboard)
	* @return {Boolean} 
    **/
	checkLetter(letter) {
		return this.phrase.indexOf(letter) > -1 ? true : false;
	}
	
	/**
    * loops through all letters (li elements in phrase-ul element ) and displays those that match letter clicked or pressed
    * @param  {string}  single letter from keyboard or mouse click (on virtual keyboard)
    **/
	showMatchedLetter(letter) {
		let phLetters = PhraseUL.querySelectorAll(`.${letter}`)
		for (let i = 0; i < phLetters.length; i++) {
				phLetters[i].className = 'show';
		}
	}
}


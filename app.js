const hangmanWords = ['hangman', 'apple', 'banana', 'computer']; // Array of hangman words
const hangmanParts = [
	'head',
	'body',
	'left-arm',
	'right-arm',
	'left-leg',
	'right-leg',
];
const newGameButton = document.getElementById('new-game-button');
let mistakeCount = 0;
const wordContainer = document.getElementById('word');
const mistakeLetter = document.getElementById('wrong-letters');
const popup = document.querySelector('.popup');
const notification = document.querySelector('.notification-container');
let gameIsOn = true;
const randomIndex = () => Math.floor(Math.random() * hangmanWords.length);
let correctLetters = [];
let wrongLetters = [];

let errorCount = 6;
let randomWord = '';

// Function to start a new game
function startNewGame() {
	correctLetters = [];
	wrongLetters = [];
	mistakeCount = 0; // Reset mistakeCount
	errorCount = 6;
	randomWord = hangmanWords[randomIndex()];
	wordContainer.innerHTML = '';

	// Generate the letter placeholders for the new word
	for (let i = 0; i < randomWord.length; i++) {
		const letterPlaceholder = document.createElement('span');
		letterPlaceholder.classList.add('letter');
		letterPlaceholder.innerText = '_';
		wordContainer.appendChild(letterPlaceholder);
	}

	gameIsOn = true;
	popup.style.visibility = 'hidden';
	popup.style.opacity = '0';
	newGameButton.style.display = 'none'; // Hide the "Play Again" button
}

// Event listener for keydown event
document.addEventListener('keydown', function (event) {
	if (!gameIsOn) {
		return; // Ignore key presses when the game is not active
	}
	// Check if the pressed key is a letter
	if (/^[a-zA-Z]$/.test(event.key)) {
		// Key is a letter
		// Your logic for handling the letter input goes here
		// ...

		// Check if the pressed key is already guessed
		if (
			correctLetters.includes(event.key) ||
			wrongLetters.includes(event.key)
		) {
			notification.classList.add('animate');
			setTimeout(() => {
				notification.classList.remove('animate');
			}, 2000);
		} else if (randomWord.includes(event.key)) {
			correctLetters.push(event.key);
			console.log(correctLetters);
			// Update the letter placeholders with the correct letters
			const wordLetters = wordContainer.querySelectorAll('.letter');
			wordLetters.forEach((letter, index) => {
				if (randomWord[index] === event.key) {
					letter.innerText = event.key;
				}
			});
		} else {
			wrongLetters.push(event.key);
			mistakeLetter.style.visibility = 'visible';
			mistakeLetter.parentElement.style.visibility = 'visible';
			// Update the hangman parts

			const hangmanPart = document.getElementById(hangmanParts[mistakeCount]);

			if (hangmanPart) {
				hangmanPart.style.display = 'block';
			}
			mistakeCount++;
			mistakeLetter.innerText = wrongLetters.join(' ');
		}

		// Check if the game should end
		if (
			correctLetters.length === randomWord.length ||
			mistakeCount === errorCount
		) {
			gameIsOn = false; // End the game
			popup.style.visibility = 'visible';
			popup.style.opacity = '1';
			popup.style.display = 'flex';
			document.getElementById('final-message').innerText =
				correctLetters.length === randomWord.length ? 'You won!' : 'You lost!';
			newGameButton.style.display = 'block'; // Display the "Play Again" button
			mistakeLetter.style.visibility = 'hidden';
			mistakeLetter.parentElement.style.visibility = 'hidden';
			hangmanParts.forEach((part) => {
				document.getElementById(part).style.display = 'none';
			});
		}
	} else {
	}
});

newGameButton.addEventListener('click', startNewGame);
startNewGame();

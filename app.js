const hangmanWords = ['hangman', 'apple', 'banana', 'computer']; // Array of hangman words
const hangmanParts = [
	'head',
	'body',
	'left-arm',
	'right-arm',
	'left-leg',
	'right-leg',
];
let mistakeCount = 0;
const wordContainer = document.getElementById('word');
const mistakeLetter = document.getElementById('wrong-letters');
const popup = document.querySelector('.popup');
const notification = document.querySelector('.notification-container');
let gameIsOn = true;
const randomIndex = () => Math.floor(Math.random() * hangmanWords.length);
let correctLetters = [];
let wrongLetters = [];

let errorCount = 5;
let randomWord = '';

// Function to start a new game
function startNewGame() {
	correctLetters = [];
	wrongLetters = [];
	errorCount = 5;
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
	popup.classList.remove('show');
}

// Event listener for keydown event
document.addEventListener('keydown', function (event) {
	if (!gameIsOn) {
		return; // Ignore key presses when the game is not active
	}

	// Check if the pressed key is already guessed
	if (correctLetters.includes(event.key) || wrongLetters.includes(event.key)) {
		notification.classList.add('animate');
		setTimeout(() => {
			notification.classList.remove('animate');
		}, 2000);
	} else if (randomWord.includes(event.key)) {
		correctLetters.push(event.key);

		// Update the letter placeholders with the correct letters
		const wordLetters = wordContainer.querySelectorAll('.letter');
		wordLetters.forEach((letter, index) => {
			if (randomWord[index] === event.key) {
				letter.innerText = event.key;
			}
		});
	} else {
		wrongLetters.push(event.key);

		// Update the hangman parts

		const hangmanPart = document.getElementById(hangmanParts[mistakeCount]);
		console.log(hangmanPart);
		if (hangmanPart) {
			hangmanPart.style.display = 'block';
		}
		mistakeCount++;
		mistakeLetter.innerText = wrongLetters.join(' ');
	}

	// Check if the game should end
	if (
		correctLetters.length === randomWord.length ||
		wrongLetters.length >= errorCount
	) {
		gameIsOn = false; // End the game
		popup.classList.add('show');
	}
});

const newGameButton = document.getElementById('new-game-button');
newGameButton.addEventListener('click', startNewGame);
startNewGame();

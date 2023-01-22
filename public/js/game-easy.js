let cards = 	document.querySelectorAll('.game-card');
// VARIABLE TEXTE
let countFlip = document.getElementById('flip-count');
let countVictory = document.getElementById('victory-count');
let victoryScreen = document.getElementById('victory');
let timer = document.getElementById('timer');

let hasFlippedCard = false;
// LOCKER DE PLATEAU
let lockBoard = false;
let firstCard, secondCard;
let totalFlip = 0;
let pointVictory = 0;
let timerCount = 80;
// FONCTION FlipCard
function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;
	// verification de l'etat cliqué
	this.classList.toggle('flip');
	if(!hasFlippedCard) {
		// click sur le firstCard
		hasFlippedCard = true;
		firstCard = this;
		return;
	} 
	//else {
	// click second card
	hasFlippedCard = false;
	secondCard = this;
	// LANCEMENT DE LA FONCTION MATCH ?
	checkForMatch();
	//}
}
//
function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetBoard();
	// AJOUT POINTS
	totalFlip++;
	countFlip.innerText = totalFlip;
	pointVictory++;
	countVictory.innerText = pointVictory;
	if (pointVictory == 4) {
		victoryScreen.classList.add('display');
	}
}
//
function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');

			// AJOUT DES COUPS
			totalFlip++;
			countFlip.innerText = totalFlip;
			resetBoard()
		}, 1000);
}


//
function checkForMatch() {
	if(firstCard.dataset.cardname === secondCard.dataset.cardname) {
			disableCards();
		} else {
			// cela ne marche pas
			unflipCards()
			
		}
}
function resetBoard(){
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}
// FONCTION ALEATOIRE DES CARTES
(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 8);
		card.style.order = randomPos;
	});
})();


// BOUCLE DE REPETITION
cards.forEach(card => card.addEventListener('click', flipCard));

//Timer

setInterval(() =>{
	timerCount--;
	timer.innerText = timerCount;
	if (timerCount == 0) {
		clearInterval(timer);
		gameover();
	}
}, 1000)

function gameover() {
	document.location.href="index.html"; 
}

//audio

function flipAudio(url) {
	var sound = new Audio(url).play();
	sound.Audio.volume=0,5;
}
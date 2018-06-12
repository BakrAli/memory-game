/*
 * Create a list that holds all of your cards
 */
const cards = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 
'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 
'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

const deck   = document.querySelector('.deck');
let openCards = [];
let matchedCards = [];
let firstClick = false;
shuffle(cards);

// Display the cards on the page and start the game
    function gameSetup() {
        for(let i = 0; i < cards.length; i++) {
            const card = document.createElement('li');
            card.classList.add('card');
            card.innerHTML = `<i class="${cards[i]}"></i>`;
            deck.appendChild(card);

            click(card);
        }
    }

    // Cards Click
    function click(card) {
        card.addEventListener('click', function() {

            if(!firstClick) {
                firstClick = true;
                timeCounter();
            }
        
            const currentCard = this;
            const previousCard = openCards[0];
    
            if (openCards.length === 1) {
                card.classList.add('open', 'show', 'unclickable');
                openCards.push(this);
                // Comparing between cards
                compareCards(currentCard, previousCard);

            } else {
                currentCard.classList.add('open', 'show', 'unclickable');
                openCards.push(this);
            }

        });
    }


    // Comparing between cards
    function compareCards(currentCard, previousCard) {
        if(currentCard.innerHTML === previousCard.innerHTML) {
            currentCard.classList.add('match');
            previousCard.classList.add('match');

            matchedCards.push(currentCard , previousCard);

            openCards = [];

            endGame();

        } else {
            
            setTimeout(function() {

            currentCard.classList.remove('open', 'show', 'unclickable');
            previousCard.classList.remove('open', 'show', 'unclickable');
            }, 300);
         }
         openCards = [];
         // Calling The movescounter function
         movesCounter();
    }

    

    // Moves
    const movesElmnt = document.querySelector('.moves');
    let moves = 0;
    movesElmnt.innerHTML = 0;
    function movesCounter() {
        moves++;
        movesElmnt.innerHTML = moves;
        // Calling Rating System Function
        ratingSystem();

    }

    //Rating
    const stars = document.querySelector('.stars');
    const rateContainer = document.querySelector('#finalStars');
    
    function ratingSystem() {
        if(moves <= 8) {
            stars.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>`;

        } else if (moves > 8 && moves <= 12) {
            stars.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star-o"></i></li>`;
            
        } else {
            stars.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star-o"></i></li>
            <li><i class="fa fa-star-o"></i></li>`;
        }
    }

    // Our time counter
    const timeElmnt = document.querySelector('.timer');
    let timer;
    let seconds = 0;
    timeElmnt.innerHTML = seconds + ' Secs';

    function timeCounter() {
        timer = setInterval(function() {
            seconds++;
            timeElmnt.innerHTML = seconds + ' Secs';
        }, 750);
    }

    // Stop the timer
    function stopTimer() {
        clearInterval(timer);
    }

    // Restart button
    const restart = document.querySelector('.restart');
        restart.addEventListener('click', function() {
            deck.innerHTML = '';
            shuffle(cards);
            gameSetup();
            gameReset();

        });
    // reset all values
    function gameReset() {
        matchedCards = [];
        openCards = [];
        moves = 0;
        movesElmnt.innerHTML = 0;
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        stopTimer();
        firstClick = false;
        seconds = 0;
        timeElmnt.innerHTML = seconds + ' Secs';
        shuffle(cards);
    }

    // Popup Message at end of the game
    let modal = document.querySelector('#modal');
    let closeBtn = document.querySelector('.close');
    function popupModal() {
        if(matchedCards.length === 16){
            modal.classList.add("show");
            rateContainer.innerHTML = stars.innerHTML;
            const finalMoves = document.querySelector('#finalMoves');
            finalMoves.innerHTML = moves + 1;
            const finalSeconds = document.querySelector('#finalSeconds');
            finalSeconds.innerHTML = seconds;
            closeModal();
        }
    }

    // Close Popup modal
    function closeModal() {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
        });
    }


    function playAgain() {
        deck.innerHTML = '';
        shuffle(cards);
        gameReset();
        gameSetup();
        modal.classList.remove('show');
    }

    // End the game and Pop-up

    function endGame() {
        if(matchedCards.length === cards.length)
            stopTimer();
            popupModal();
    }
    
// Setup & Start the game
gameSetup();








// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
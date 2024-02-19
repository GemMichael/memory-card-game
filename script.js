document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card"); // Select all card elements
    let card1, card2; // Variables to store the clicked cards
    let disableCards = false; // Flag to prevent clicking on cards while checking for a match
    let userScore = 0; // Variable to track user's score
    let timerInterval; // Variable to store the timer interval
    let timeLeft = 60; // Change this value to set the initial time in seconds

    // Start the timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    // Function to reset the game state and restart the timer
    function resetGame() {
        // Reset game state
        userScore = 0;
        document.getElementById("userScore").textContent = userScore;
        // Reset cards
        document.querySelectorAll(".card").forEach(card => {
            card.classList.remove("flipped");
        });
        // Shuffle cards
        shuffleCards();
        // Reset time to 60 seconds if it's less than 15 seconds
        if (timeLeft <= 15) {
            timeLeft = 60;
        }
        // Restart timer
        document.getElementById("timer").textContent = timeLeft;
        startTimer();
    }

    // Function to stop the timer and end the game
    function endGame() {
        clearInterval(timerInterval);
        document.getElementById("timer").textContent = "Time's up! You lost.";
        setTimeout(resetGame, 2000); // Restart the game after 2 seconds
    }

    // Start the timer when the game begins
    startTimer();

    // Event listeners for each card
    for (let i = 1; i <= 10; i++) {
        let cardId = 'flipCard' + i;
        let cardElement = document.getElementById(cardId);

        if (cardElement) {
            cardElement.addEventListener('click', () => {
                if (!disableCards && !cardElement.classList.contains('flipped')) {
                    cardElement.classList.toggle('flipped');
                    if (!card1) {
                        card1 = cardElement;
                    } else {
                        card2 = cardElement;
                        disableCards = true;
                        checkMatch();
                    }
                }
            });
        }
    }

    // Function to check if two flipped cards match
    function checkMatch() {
        let value1 = card1.querySelector('.card-back-1 img').getAttribute('src');
        let value2 = card2.querySelector('.card-back-1 img').getAttribute('src');

        if (value1 === value2) {
            userScore++;
            document.getElementById("userScore").textContent = userScore;
            if (userScore >= 5) {
                clearInterval(timerInterval); // Stop the timer when the game is won
                alert("You've won! Your final score is: " + userScore);
                resetGame(); // Restart the game
            }
            resetCards();
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                resetCards();
            }, 1000);
        }
    }

    // Function to reset card variables
    function resetCards() {
        card1 = null;
        card2 = null;
        disableCards = false;
    }

    // Function to shuffle the cards
    function shuffleCards() {
        let images = [
            "/pictures/1.jpg", "/pictures/2.jpg", "/pictures/3.jpg",
            "/pictures/4.webp", "/pictures/5.webp",
        ];
        let cardElements = document.querySelectorAll('.card');

        let imagePairs = images.concat(images);
        imagePairs.sort(() => Math.random() - 0.5);

        cardElements.forEach((card, index) => {
            card.querySelector('.card-back-1 img').setAttribute('src', imagePairs[index]);
        });
    }

    // Initial shuffle of the cards
    shuffleCards();
});

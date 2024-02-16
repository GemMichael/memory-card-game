document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll(".card");
  let card1, card2;
  let disableCards = false;
  let userScore = 0;

  
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

  function checkMatch() {
      let value1 = card1.querySelector('.card-back-1 img').getAttribute('src');
      let value2 = card2.querySelector('.card-back-1 img').getAttribute('src');

      if (value1 === value2) {
          userScore++;
          document.getElementById("userScore").textContent = userScore;
          if (userScore >= 5) {
              alert("You've won!");
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

  function resetCards() {
      card1 = null;
      card2 = null;
      disableCards = false;
  }

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

  shuffleCards(); 
});

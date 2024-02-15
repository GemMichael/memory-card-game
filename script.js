for (let i = 1; i <= 6; i++) {
  let cardId = 'flipCard' + i;
  let cardElement = document.getElementById(cardId);

  if (cardElement) {
      cardElement.addEventListener('click', () => { 
          cardElement.classList.toggle('flipped'); 
      });
  }
}

  
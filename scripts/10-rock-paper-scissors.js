let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
  if (playerMove === computerMove) {
    result = 'Tie';
  } else if (
    (playerMove === 'Rock' && computerMove === 'Scissors') ||
    (playerMove === 'Paper' && computerMove === 'Rock') ||
    (playerMove === 'Scissors' && computerMove === 'Paper')
  ) {
    result = 'You win';
  } else {
    result = 'You lose';
  }

  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `
    You <img src="images/${playerMove.toLowerCase()}-emoji.png" class="move-icon">
    <img src="images/${computerMove.toLowerCase()}-emoji.png" class="move-icon"> Computer
  `;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = 
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomNumber < 2 / 3) {
    computerMove = 'Paper';
  } else {
    computerMove = 'Scissors';
  }

  return computerMove;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
}

let score = JSON.parse(localStorage.getItem('score'));

if (score === null) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
};

updateScores();

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');

    updateScores();
}

function pickComputerMove() {
    let randomNumber = Math.round(Math.random()*10);

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 4) {
        computerMove = 'Rock';
    } else if (randomNumber >= 4 && randomNumber < 7) {
        computerMove = 'Paper';
    } else if (randomNumber >= 7 && randomNumber < 11) {
        computerMove = 'Scissors';
    }

    return computerMove;
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'Scissors') {
        if ('Rock' === computerMove) {
            result = 'You lose!'
        } else if ('Paper' === computerMove) {
            result = 'You win!'
        } else if ('Scissors' === computerMove) {
            result = 'its a tie'
        }
    } else if (playerMove === 'Paper') {
        if ('Rock' === computerMove) {
            result = 'You win!'
        } else if ('Paper' === computerMove) {
            result = 'its a tie'
        } else if ('Scissors' === computerMove) {
            result = 'You lose!'
        }
    } else if (playerMove === 'Rock') {
        if ('Rock' === computerMove) {
            result = 'its a tie'
        } else if ('Paper' === computerMove) {
            result = 'You lose!'
        } else if ('Scissors' === computerMove) {
            result = 'You win!'
        }
    }     
    
    if (result === 'You win!') {
        score.wins = score.wins + 1;
    } else if (result === 'You lose!') {
        score.losses = score.losses + 1;
    } else if (result === 'its a tie') {
        score.ties = score.ties + 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScores();

    document.querySelector('.display-results').innerHTML = `${result}`;

    document.querySelector('.display-moves').
        innerHTML = `
            <p>You 
                <img src="image/${playerMove}-emoji.png" alt="${playerMove} image" class="icon">
                <img src="image/${computerMove}-emoji.png" alt="${computerMove}-image" class="icon">
                Computer
            </p>
        `; 
}

function updateScores() {
    document.querySelector('.display-scores').
        innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
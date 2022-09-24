// DOM Elements
const itemsDiv = document.querySelectorAll("#items > div");
const rock = document.querySelector("#rock > img");
const paper = document.querySelector("#paper > img");
const scissor = document.querySelector("#scissor > img");
const selection = document.querySelector("#selection");
const userSelection = document.querySelector("#user-selection");
const computerSelection = document.querySelector("#computer-selection");
const result = document.querySelector("#result");
const playAgain = document.querySelector("#play-again");
const yourScore = document.querySelector("#your-score");
const computerScore = document.querySelector("#computer-score");
const totalRounds = document.querySelector("#total-rounds");
const roundResult = document.querySelector("#round-result");
const roundResultTxt = document.querySelector("#round-result-txt");
const closeBtn = document.querySelector("#close-btn");

// Contants and Variables
const tiedResultTexts = [
    'Woooo, Same selection!',
    'You both have chosen the same!',
    'Same selection and share the same point now',
    'None beats none this time!',
    'Ouuu, shake hands please!'
];

// Event Listeners
rock.addEventListener('click', selectRock);
paper.addEventListener('click', selectPaper);
scissor.addEventListener('click', selectScissor);
playAgain.addEventListener('click', resetGame);
closeBtn.addEventListener('click', restartRound);

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function selectRock() {
    userSelection.innerHTML = 'You selected: <span>Rock!</span>';
    generateResult(1);
}

function selectPaper() {
    userSelection.innerHTML = 'You selected: <span>Paper!</span>';
    generateResult(2);
}

function selectScissor() {
    userSelection.innerHTML = 'You selected: <span>Scissor!</span>';
    generateResult(3);
}

function resetGame() {
    userSelection.innerHTML = '';
    computerSelection.innerHTML = '';
    result.innerHTML = '';
    selection.style.visibility = 'hidden';

    for (const item of items.children) {
        if (item.classList.contains('disable')) {
            item.classList.remove('disable');
        }   
    }

    if (+totalRounds.textContent === 0) {
        totalRounds.textContent = 20;
    }
}

function restartRound() {
    if (playAgain.classList.contains('inactive')) {
        playAgain.classList.remove('inactive');
    }

    if (roundResult.classList.contains('show')) {
        roundResult.classList.remove('show');
    }

    playAgain.textContent = 'Play Again';
    yourScore.textContent = 0;
    computerScore.textContent = 0;

    resetGame();
}

function won() {
    result.classList.add('won');

    if (result.classList.contains('lost')) {
        result.classList.remove('lost');
    }

    if (result.classList.contains('tied')) {
        result.classList.remove('tied');
    }

    yourScore.textContent = +yourScore.textContent + 3;
}

function lost() {
    result.classList.add('lost');

    if (result.classList.contains('won')) {
        result.classList.remove('won');
    }

    if (result.classList.contains('tied')) {
        result.classList.remove('tied');
    }

    computerScore.textContent = +computerScore.textContent + 3;
}

function tied() {
    result.classList.add('tied');

    if (result.classList.contains('won')) {
        result.classList.remove('won');
    }

    if (result.classList.contains('lost')) {
        result.classList.remove('lost');
    }

    yourScore.textContent = +yourScore.textContent + 1;
    computerScore.textContent = +computerScore.textContent + 1;
}

function generateResult(selectionByUser)  {
    for (const item of items.children) {
        item.classList.add('disable');
    }

    const selectionByComputer = getRandomInteger(1, 3);

    switch(selectionByComputer) {
        case 1: {
            computerSelection.innerHTML = 'Computer selected: <span>Rock!</span>';

            switch(selectionByUser) {
                case 2: {
                    result.textContent = 'Uh oh, You won! Paper is powerful than Rock ...';
                    won();
                    break;
                }
                case 3: {
                    result.textContent = 'Whooaa, You lost! Rock can thrash the Scissor ...';
                    lost();
                    break;
                }
            }

            break;
        }
        case 2: {
            computerSelection.innerHTML = 'Computer selected: <span>Paper!</span>';

            switch(selectionByUser) {
                case 1: {
                    result.textContent = 'Huhh, Computer won! Paper is ahead of Rock ...';
                    lost();
                    break;
                }
                case 3: {
                    result.textContent = 'Hurrahh, You won! Cut the Paper by your Scissor ...';
                    won();
                    break;
                }
            }

            break;
        }
        case 3: {
            computerSelection.innerHTML = 'Computer selected: <span>Scissor!</span>';

            switch(selectionByUser) {
                case 1: {
                    result.textContent = 'Great, You won! Now Rock will hammer the Scissor ...';
                    won();
                    break;
                }
                case 2: {
                    result.textContent = 'Alas, You lost! Your Paper will be destroyed ...';
                    lost();
                    break;
                }
            }

            break;
        }
    }

    if (selectionByUser === selectionByComputer)  {
        const textIndex = getRandomInteger(0, tiedResultTexts.length - 1);
        tied();
        result.textContent = tiedResultTexts[textIndex];
    }

    selection.style.visibility = 'visible';

    totalRounds.textContent = +totalRounds.textContent - 1;

    if (+totalRounds.textContent === 0) {
        showRoundResult();
    }
}

function showRoundResult() {
    const yourTotalScore = +yourScore.textContent;
    const computerTotalScore = +computerScore.textContent;

    let roundResultText = '';

    playAgain.textContent = 'Finished';

    playAgain.classList.add('inactive');

    if (yourTotalScore > computerTotalScore) {
        roundResultText = 'Huge thumbs up, you won the round!!!';
    } else if (yourTotalScore < computerTotalScore) {
        roundResultText = 'Sorry, you lost this round!!!';
    }  else {
        roundResultText = 'Ouh huh, still none wins!!!';
    }

    roundResultTxt.textContent = roundResultText;
    roundResult.classList.add('show');
}
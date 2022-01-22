// Let's play Rock, Paper and Scissors!
// Each side randomly pick one of the three options at the same time
// Compare both sides picks and see if there's a winner and loser or if it's a tie

var rockBtn = document.getElementById("rockBtn");
var paperBtn = document.getElementById("paperBtn");
var scissorsBtn = document.getElementById("scissorsBtn");
var allBtns = document.getElementById("buttons");
var playAgainBtn = document.getElementById("playAgainBtn");
var userScoreElement = document.getElementById('userScore');
var computerScoreElement = document.getElementById('computerScore');
var roundElement = document.getElementById('round');
var tableElement = document.getElementById('table');
var finalResultElement = document.getElementById('final');
var titleElement = document.getElementById('title');

rockBtn.addEventListener('click', main);
paperBtn.addEventListener('click', main);
scissorsBtn.addEventListener('click', main);
playAgainBtn.addEventListener('click', playAgain);

var endGame = false;
let userFinalScore = 0;
let computerFinalScore = 0;
let roundNumber = 0;


function main(e) {
    // check if game is over
    if (endGame === false) {
        // play a single round
        var [userFinalScore, computerFinalScore] = playRound(e);

        // check who won if it's the end of the game and change endGame to true if that's the case
        [whoWonValue, endGame] = whoWon(userFinalScore, computerFinalScore)

        // confirm that display is none, so we add the winner element only once
        if (finalResultElement.style.display === 'none' && endGame === true) {

            // change display
            finalResultElement.style = "display: inline;"

            // Remove buttons
            allBtns.style = "display: none;"
            titleElement.style = "display: none;"

            // create element with winner name and append
            h2 = document.createElement('h2');
            h2.setAttribute("id", "resultMessage");
            h2.textContent = `Winner: ${whoWonValue}`;
            finalResultElement.appendChild(h2);

            // change button text to ask user if wants to play again
            playAgainBtn.display = "display: inline";
            playAgainBtn.textContent = "Play Again?";

        }
    }
}

function playRound(e) {
    // collect choices
    const playerSelection = e.target.textContent;
    const computerSelection = computerPlay();

    // create h5 element
    var trRow = document.createElement('tr');
    var thRoundNumber = document.createElement('th');
    var thYouChoice = document.createElement('th');
    var thComputerChoice = document.createElement('th');
    var thOutcome = document.createElement('th');
    var thScore = document.createElement('th');

    // find the winner and loser of the round
    if (playerSelection === computerSelection) {
        userRoundScore = 0;
        computerRoundScore = 0;
    }
    else if (playerSelection === "Scissors" && computerSelection == "Paper") {
        userRoundScore = 1;
        computerRoundScore = 0;
    }
    else if (playerSelection === "Scissors" && computerSelection == "Rock") {
        userRoundScore = 0;
        computerRoundScore = 1;
    }
    else if (playerSelection === "Paper" && computerSelection == "Rock") {
        userRoundScore = 1;
        computerRoundScore = 0;
    }
    else if (playerSelection === "Paper" && computerSelection == "Scissors") {
        userRoundScore = 0;
        computerRoundScore = 1;
    }
    else if (playerSelection === "Rock" && computerSelection == "Scissors") {
        userRoundScore = 1;
        computerRoundScore = 0;
    }
    else if (playerSelection === "Rock" && computerSelection == "Paper") {
        userRoundScore = 0;
        computerRoundScore = 1;
    }
    else {
        console.error('Something is off here!');
    }

    // calculate final score
    userFinalScore += userRoundScore;
    computerFinalScore += computerRoundScore;

    // Define outcome and color
    var [outcomeValue, outcomeColor] = translateScores(userRoundScore, computerRoundScore);

    // add to round number
    roundNumber += 1
    thRoundNumber.appendChild(document.createTextNode(roundNumber));
    thYouChoice.appendChild(document.createTextNode(playerSelection));
    thComputerChoice.appendChild(document.createTextNode(computerSelection));
    thOutcome.appendChild(document.createTextNode(outcomeValue));
    thScore.appendChild(document.createTextNode(`${userFinalScore} x ${computerFinalScore}`));

    // add text to h5 element
    // tr.appendChild(document.createTextNode(`Round ${roundNumber}: ${sentence}`));
    thOutcome.style.color = outcomeColor;

    // add h5 element to round element
    // tableElement.appendChild(tr);
    trRow.append(thRoundNumber, thYouChoice, thComputerChoice, thOutcome, thScore);
    tableElement.appendChild(trRow);

    return [userFinalScore, computerFinalScore]
}

function computerPlay() {
    const options = ["Rock", "Paper", "Scissors"];
    return options[Math.floor(Math.random() * options.length)];
}

function translateScores(userScore, computerScore){
    if (userScore === 0 && computerScore === 0) {
        var outcomeValue = "It's a Tie!";
        var outcomeColor = "orange";
    }
    else if (userScore ===1) {
        var outcomeValue = "You Win!";
        var outcomeColor = "green";
    }
    else {
        var outcomeValue = "You Lose!";
        var outcomeColor = "red";
    }

    return [outcomeValue, outcomeColor];
}

function whoWon(userScore, computerScore) {
    if (userScore === 5 || computerScore === 5) {
        if (userScore > computerScore) {
            var whoWonValue = "You";
            confetti();
        }
        else {
            var whoWonValue = "Computer";
        }
        endGame = true;

        return [whoWonValue, endGame]
    }
    else {
        return ['nobody', false]
    }

}

function playAgain(e) {

    // if true then a game just ended
    if (endGame === true) {

        // change the status from ended to not ended
        endGame = false;
        userFinalScore = 0;
        computerFinalScore = 0;
        roundNumber = 0;

        // add buttons back
        allBtns.style = "display: inline-block; margin:10px;"
        titleElement.style = "display: inline; margin:10px;"

        // hide result
        h2 = document.getElementById("resultMessage");
        h2.remove();
        finalResultElement.style = "display: none;"

        // clear table with results
        while (tableElement.lastChild.tagName === 'TR') {
            tableElement.removeChild(tableElement.lastChild);
          }
    }
}

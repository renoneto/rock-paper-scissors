// Let's play Rock, Paper and Scissors!
// Each side randomly pick one of the three options at the same time
// Compare both sides picks and see if there's a winner and loser or if it's a tie

function computerPlay() {
    const options = ["Rock", "Paper", "Scissors"];
    return options[Math.floor(Math.random() * options.length)];
}

function playGame(playerSelection, computerSelection) {
    const lowerPlayerSelection = playerSelection.toLowerCase();
    const lowerComputerSelection = computerSelection.toLowerCase();

    if (lowerPlayerSelection === lowerComputerSelection) {
        alert(`It's a tie! Both picked ${playerSelection}.`)
        return [0, 0]
    }
    else if (lowerPlayerSelection === "scissors" && lowerComputerSelection == "paper") {
        alert(`You win! ${playerSelection} beats ${computerSelection}.`)
        return [1, 0]
    }
    else if (lowerPlayerSelection === "scissors" && lowerComputerSelection == "rock") {
        alert(`You lose! ${computerSelection} beats ${playerSelection}.`)
        return [0, 1]
    }
    else if (lowerPlayerSelection === "paper" && lowerComputerSelection == "rock") {
        alert(`You win! ${playerSelection} beats ${computerSelection}.`)
        return [1, 0]
    }
    else if (lowerPlayerSelection === "paper" && lowerComputerSelection == "scissors") {
        alert(`You lose! ${computerSelection} beats ${playerSelection}.`)
        return [0, 1]
    }
    else if (lowerPlayerSelection === "rock" && lowerComputerSelection == "scissors") {
        alert(`You win! ${playerSelection} beats ${computerSelection}.`)
        return [1, 0]
    }
    else if (lowerPlayerSelection === "rock" && lowerComputerSelection == "paper") {
        alert(`You lose! ${computerSelection} beats ${playerSelection}.`)
        return [0, 1]
    }
    else {
        alert("Something is wrong here.")
        return [0, 0]
    }
}

function whoWonMessage(playerScore, computerScore) {
    if (playerScore > computerScore) {
        return "You win =)"
    }
    else if (playerScore < computerScore) {
        return "You lose =(";
    }
    else {
        return "It's a tie!";
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;

    while (playerScore < 5 && computerScore < 5) {

        const playerSelection = window.prompt(`Choose between 'Rock', 'Paper' and 'Scissors'`);
        const computerSelection = computerPlay();

        let gameResult = playGame(playerSelection, computerSelection);

        playerScore += gameResult[0];
        computerScore += gameResult[1];

        alert(`Current Score - You: ${playerScore} and Computer: ${computerScore}.`)
    }

    conclusion = whoWonMessage(playerScore, computerScore)
    alert(`Final Score is - You: ${playerScore} and Computer: ${computerScore}. ${conclusion}`)
}

game();

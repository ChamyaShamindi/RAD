const game = {
    player1:{
        score : 0,
        turn : false
    },
    player2:{
        score : 0,
        turn : false
    }
}

let images = ["dice_1.png",
"dice_2.png",
"dice_3.png",
"dice_4.png",
"dice_5.png",
"dice_6.png"];

let dice = document.querySelectorAll("img");

function rollDice(){
    let dieOneValue = Math.floor(Math.random()*6) + 1;
    let dieTwoValue = Math.floor(Math.random()*6) + 1;

    document.querySelector("#die1").setAttribute("src",`dice_${dieOneValue}.png`);
    document.querySelector("#die2").setAttribute("src",`dice_${dieTwoValue}.png`);
    document.querySelector("#score").innerHTML = "Your score is " + (dieOneValue + dieTwoValue);
    let totscore = (dieOneValue + dieTwoValue);
    
    let player = game.player1.turn ? "player1" : "player2"

    if (dieOneValue === dieTwoValue && dieOneValue === 1) {
        if(game.player1.turn) {
            game.player1.score = 0;
            game.player1.turn = false;
            game.player2.turn = true;
        }else if(game.player2.turn) {
            game.player2.score = 0;
            game.player2.turn = false;
            game.player1.turn = true;
        }
    }else{
        if(game.player1.turn) {
            game.player1.score += totscore;
            game.player1.turn = false;
            game.player2.turn = true;
        }else if(game.player2.turn) {
            game.player2.score += totscore;
            game.player2.turn = false;
            game.player1.turn = true;
        }
    }

    if (dieOneValue === dieTwoValue && dieOneValue !== 1) {
        game[player].turn = true;
        game[player === "player1" ? "player2" : "player1"].turn = false;
    }
    
    const scoreboard = document.getElementById(`${player}-Dice`);
    scoreboard.innerHTML = game[player].score;
    if (game[player].score >= 100) {
        const winMsg = document.getElementById(`${player}-msg`)
        winMsg.style.display = "block";
        document.getElementById("btn").disabled=true;
    }

}

game.player1.turn = true;

function reset(){
    game.player1.score = 0;
    game.player2.score = 0;
    const resetScorePlayer1 = document.getElementById("player1-Dice");
    const resetScorePlayer2 = document.getElementById("player2-Dice");
    resetScorePlayer1.innerHTML = game.player1.score;
    resetScorePlayer2.innerHTML = game.player2.score;

    document.getElementById("btn").disabled=false;

    const winMsg1 = document.getElementById("player1-msg");
    winMsg1.style.display = "none";
    const winMsg2 = document.getElementById("player2-msg");
    winMsg2.style.display = "none";

    document.querySelector("#score").innerHTML = "Your score";

    game.player1.turn = true;
}




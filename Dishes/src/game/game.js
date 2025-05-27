let result = document.querySelector('p');

function printResult(player, text){
    if(player == "Player 2"){
        result.textContent = "PLAYER 1 IS DOING THE DISHES!";
    }else{
        result.textContent = "PLAYER 2 IS DOING THE DISHES!";
    }
    text.textContent = player + " WON!";

    // from https://confetti.js.org/#
    confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    });
}

function checkWinner(mtr, text, player){
    //variables to count number of row clicks at each index
    let count_row_zero = 0;
    let count_row_one = 0;
    let count_row_two = 0;
    
    //variables to count number of col clicks at each index
    let count_col_zero = 0;
    let count_col_one = 0;
    let count_col_two = 0;
    let middle = false;
    let bothOne = false;
    let bothTwo = false;

    for(let i = 0; i < mtr.length; i ++){
        // checks if [0, 0], [1, 1] or [2, 2] were clicked on
        if(mtr[i].includes(1) && (!mtr[i].includes(0) && !mtr[i].includes(2))){
            middle = true;
            // console.log("middle clicked");
        }else if(mtr[i].includes(0) && (!mtr[i].includes(1) && !mtr[i].includes(2))){
            bothOne = true;
        }else if(mtr[i].includes(2) && (!mtr[i].includes(1) && !mtr[i].includes(0))){
            bothTwo = true;
        }
        //loops through matrix to count clicks at each row index
        if(mtr[i][0] == 0){
            count_row_zero++;
            // console.log("count zero: " + count_row_zero);
        }else if(mtr[i][0] == 1){
            count_row_one++;
            // console.log("one " + count_row_one + " " + i[0]);
        }else if(mtr[i][0] == 2){
            count_row_two++;
            // console.log("two: " + count_row_two);
        }

        //loops through matrix to count clicks at each col index
        if(mtr[i][1] == 0){
            count_col_zero++;
            // console.log("count col zero: " + count_col_zero);
        }else if(mtr[i][1] == 1){
            count_col_one++;
            // console.log("col one " + count_col_one + " " + i[0]);
        }else if(mtr[i][1] == 2){
            count_col_two++;
            // console.log("col two: " + count_col_two);
        }
    }

    //straight col win
    if(count_row_zero == 3 || count_row_one == 3 || count_row_two == 3){
        printResult(player, text);
        return true;
    }
    //straight row win
    else if(count_col_zero == 3 || count_col_one == 3 || count_col_two == 3){
        printResult(player, text);
        return true;
    }
    //diagonal win
    else if(middle &&((bothOne && bothTwo) || (count_col_one == 1 && count_col_two == 1 && count_col_zero == 1) &&
        (count_row_one == 1 && count_row_zero == 1 && count_row_two == 1))){
        printResult(player, text);
        return true;
    }

    return false;
}

const table = document.querySelector("table#gameTable>tbody");
const numRows = 3;
const numCols = 3;

let winner = false;
let gameEnd = false;

let player1 = true, player2 = false;
let player1Count = 0;
let player2Count = 0;

let player1Btn = Array(5).fill(null).map(() => Array(2).fill(null));
let player2Btn = Array(5).fill(null).map(() => Array(2).fill(null));

//create table of buttons in table body
for (let i = 0; i < numRows; i++) {
    let row = table.insertRow();

    for (let j = 0; j < numCols; j++) {
      let cell = row.insertCell();
      let btn = document.createElement('button');
      let text = document.querySelector('h2');

        //add id to btn for styling
        btn.classList.add("btn");

        btn.addEventListener('click', function() {
            if(!winner){
                result.textContent = "Player 2's turn";
                // player 1 goes first; if player1 clicks, check with O
                if(player1){
                    btn.textContent = "O";

                    //keep track of whose turn
                    player1 = false;
                    player2 = true;

                    player1Btn[player1Count][0] = i;            
                    player1Btn[player1Count][1] = j;
                        
                    //check if player won
                    if(player1Count >= 2){
                        winner = checkWinner(player1Btn, text, "Player 1");
                        console.log(winner);
                    }
                    player1Count++;
                }else{
                    result.textContent = "Player 1's turn." + " " + player1Count;
                    btn.textContent = "X";

                    //keep track of whose turn
                    player1 = true;
                    player2 = false;

                    player2Btn[player2Count][0] = i;
                    player2Btn[player2Count][1] = j;

                    //check if player won
                    if(player2Count >= 2){
                        winner = checkWinner(player2Btn, text, "Player 2");
                        console.log(winner);
                    }
                    player2Count++;
                }

                // check if no winner yet and if player 1 has used up all their peices to identify tie
                if(!winner && (player1Count == 5)){
                    const tryAgain = document.getElementById("retry");
                    result.textContent = "It's a tie! Try again.";
                    tryAgain.style.display = "inline-block";

                    tryAgain.addEventListener('click', function(){
                        window.location.reload();
                    });
                }
                btn.disabled = "disabled";
            }else{
                console.log("disable " + winner);
                btn.disabled = "disabled";
            }
        });

        cell.appendChild(btn);
    }
}
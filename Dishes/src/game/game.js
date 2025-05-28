const table = document.querySelector("table#gameTable>tbody");
const numRows = 3, numCols = 3;

let result = document.querySelector('p');
let text = document.querySelector('h2');
let winner = false, gameEnd = false;

let player1 = {value: true}, player2 = {value: false};
let player1Count = {value: 0}, player2Count = {value: 0};

let player1Btn = Array(5).fill(null).map(() => Array(2).fill(null));
let player2Btn = Array(5).fill(null).map(() => Array(2).fill(null));

function checkWinner(mtr, text, player){
    //variables to count number of row clicks at each index
    let count_row_zero = 0, count_row_one = 0, count_row_two = 0;
    
    //variables to count number of col clicks at each index
    let count_col_zero = 0, count_col_one = 0, count_col_two = 0;

    // variables to determine if {[0,0], [1,1], [2,2]} has been selected
    let middle = false, bothOne = false, bothTwo = false;

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

    //straight col win; identical x value need a count of 3 to determine col win
    if(count_row_zero == 3 || count_row_one == 3 || count_row_two == 3){
        printResult(player, text);
        return true;
    }
    //straight row win; identical y value need a count of 3 to determine row win
    else if(count_col_zero == 3 || count_col_one == 3 || count_col_two == 3){
        printResult(player, text);
        return true;
    }
    //diagonal win
    // middle val needs to be clicked and either [1,1] and [2,2] or count for all row/col values need to equal 1
    else if(middle &&((bothOne && bothTwo) || (count_col_one == 1 && count_col_two == 1 && count_col_zero == 1) &&
        (count_row_one == 1 && count_row_zero == 1 && count_row_two == 1))){
        printResult(player, text);
        return true;
    }

    return false;
}

//shows try again button or play again button depending on game result
function setButton(){
    const tryAgain = document.getElementById("retry");

    // show hidden button
    tryAgain.style.display = "inline-block";

    if(winner){
        result.textContent = "It's a tie! Try again.";
    }else{
        tryAgain.textContent = "PLAY AGAIN";
    }

    // reload game if button clicked
    tryAgain.addEventListener('click', function(){
        window.location.reload();
    });
}

//prints results 
function printResult(player, text){
    if(player == 2){
        result.textContent = "PLAYER 1 IS DOING THE DISHES!";
    }else{
        result.textContent = "PLAYER 2 IS DOING THE DISHES!";
    }
    text.textContent = "Player " + player + " WON!";

    // confetti code from https://confetti.js.org/#
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });

    // call setButton function to show play again button if player wishes
    setButton();
}

function gamePlay(player, playerBtn, playerCount, i, j){
    // set matrix values
    playerBtn[playerCount.value][0] = i;            
    playerBtn[playerCount.value][1] = j;
                        
    if(player == 1){
        // //keep track of whose turn
        player1.value = false;
        player2.value = true;
    }else{
        // //keep track of whose turn
        player1.value = true;
        player2.value = false;
    }
    // check winner
    if(playerCount.value >= 2){
        winner = checkWinner(playerBtn, text, player);
    }
    playerCount.value++;
}

//create table of buttons in table body
for (let i = 0; i < numRows; i++) {
    let row = table.insertRow();

    for (let j = 0; j < numCols; j++) {
      let cell = row.insertCell();
      let btn = document.createElement('button');

        //add id to btn for styling
        btn.classList.add("btn");

        btn.addEventListener('click', function() {
            if(!winner){
                result.textContent = "Player 2's turn";
                // player 1 goes first; if player1 clicks, check with O
                if(player1.value){
                    btn.textContent = "O";

                    //keep track of whose turn
                    gamePlay(1, player1Btn, player1Count, i, j);
                }else{
                    result.textContent = "Player 1's turn.";
                    btn.textContent = "X";

                    // keep track of whose turn
                    gamePlay(2, player2Btn, player2Count, i, j);
                }

                // check if no winner yet and if player 1 has used up all their peices to identify tie
                if(!winner && (player1Count == 5)){
                    setButton();
                }
                btn.disabled = "disabled";
            }else{
                // console.log("disable " + winner);
                btn.disabled = "disabled";
            }
        });

        cell.appendChild(btn);
    }
}
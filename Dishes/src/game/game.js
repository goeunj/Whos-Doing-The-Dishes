const table = document.querySelector("table#gameTable>tbody");
const numRows = 3, numCols = 3;

let result = document.querySelector('p');
let text = document.querySelector('h2');
let winner = {value: false};

function updateCounter(mtr, i, j, zeroCounter, oneCounter, twoCounter){
    //loops through matrix to count clicks at each row index
    if(mtr[i][j] == 0){
        zeroCounter.value++;
    }else if(mtr[i][j] == 1){
        oneCounter.value++;
    }else if(mtr[i][j] == 2){
        twoCounter.value++;
    }
}

function checkWinner(mtr){
    //variables to count number of row clicks at each index
    let count_row_zero = {value: 0}, count_row_one = {value: 0}, count_row_two = {value: 0};
    //variables to count number of col clicks at each index
    let count_col_zero = {value: 0}, count_col_one = {value: 0}, count_col_two = {value: 0};

    // variables to determine if {[0,0], [1,1], [2,2]} has been selected
    let middle = false, bothOne = false, bothTwo = false;
    let specialCount = 0;

    for(let i = 0; i < mtr.length; i ++){
        // checks if [0, 0], [1, 1] or [2, 2] were clicked on
        if(mtr[i].includes(1) && (!mtr[i].includes(0) && !mtr[i].includes(2))){
            middle = true;
        }else if(mtr[i].includes(0) && (!mtr[i].includes(1) && !mtr[i].includes(2))){
            bothOne = true;
        }else if(mtr[i].includes(2) && (!mtr[i].includes(1) && !mtr[i].includes(0))){
            bothTwo = true;
        }else if(mtr[i].includes(2) && mtr[i].includes(0) && !mtr.includes(1)){
            // checks if [0, 2] and [0, 2] has been clicked
            specialCount++;
        }

        //loops through matrix to count clicks at each row index
        updateCounter(mtr, i, 0, count_row_zero, count_row_one, count_row_two);

        //loops through matrix to count clicks at each col index
        updateCounter(mtr, i, 1, count_col_zero, count_col_one, count_col_two);
    }

    //straight col win; identical x value need a count of 3 to determine col win
    if(count_row_zero.value == 3 || count_row_one.value == 3 || count_row_two.value == 3){
        return true;
    }
    //straight row win; identical y value need a count of 3 to determine row win
    else if(count_col_zero.value == 3 || count_col_one.value == 3 || count_col_two.value == 3){
        return true;
    }
    //diagonal win
    // middle val needs to be clicked and either [1,1] and [2,2] or 
    // middle val clicked and [0, 2] or [2, 0] clicked and ensure count for col one and col two are both greater than 0 
    else if(middle &&((bothOne && bothTwo) || specialCount == 2)){
        return true;
    }

    return false;
}

//shows try again button or play again button depending on game result
function setButton(){
    const tryAgain = document.getElementById("retry");

    // show hidden button
    tryAgain.style.display = "inline-block";

    if(winner.value){
        tryAgain.textContent = "PLAY AGAIN";
    }else{
        result.textContent = "It's a tie! Try again.";
        tryAgain.textContent = "TRY AGAIN";
    }

    // reload game if button clicked
    tryAgain.addEventListener('click', function(){
        window.location.reload();
    });
}

//prints results 
function printResult(player){
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
        winner.value = checkWinner(playerBtn);
        if(winner.value){
            printResult(player);
        }
    }
    playerCount.value++;
}

let player1 = {value: true}, player2 = {value: false};
let player1Count = {value: 0}, player2Count = {value: 0};

let player1Btn = Array(5).fill(null).map(() => Array(2).fill(null));
let player2Btn = Array(5).fill(null).map(() => Array(2).fill(null));

//create table of buttons in table body
for (let i = 0; i < numRows; i++) {
    let row = table.insertRow();

    for (let j = 0; j < numCols; j++) {
      let cell = row.insertCell();
      let btn = document.createElement('button');

        //add id to btn for styling
        btn.classList.add("btn");

        btn.addEventListener('click', function() {
            if(!winner.value){
                result.textContent = "Player 2's turn";
                // player 1 goes first; if player1 clicks, check with O
                if(player1.value){
                    btn.textContent = "O";

                    //keep track of whose turn
                    gamePlay(1, player1Btn, player1Count, i, j);
                }else{
                    result.textContent = "Player 1's turn";
                    btn.textContent = "X";

                    // keep track of whose turn
                    gamePlay(2, player2Btn, player2Count, i, j);
                }

                // check if no winner yet and if player 1 has used up all their peices to identify tie
                if(!winner.value && (player1Count.value == 5)){
                    setButton();
                }
                btn.disabled = "disabled";
            }else{
                btn.disabled = "disabled";
            }
        });

        cell.appendChild(btn);
    }
}
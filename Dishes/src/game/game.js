function checkWinner(mtr){
    //variables to count number of row clicks at each index
    let count_row_zero = 0;
    let count_row_one = 0;
    let count_row_two = 0;
    
    //variables to count number of col clicks at each index
    let count_col_zero = 0;
    let count_col_one = 0;
    let count_col_two = 0;

    //loops through matrix to count clicks at each row index
    for(let i = 0; i < mtr.length; i ++){
        if(mtr[i][0] == 0){
            count_row_zero++;
            console.log("count zero: " + count_row_zero);
        }else if(mtr[i][0] == 1){
            count_row_one++;
            console.log("one " + count_row_one + " " + i[0]);
        }else if(mtr[i][0] == 2){
            count_row_two++;
            console.log("two: " + count_row_two);
        }
    }


    //loops through matrix to count clicks at each col index
    for(let i = 0; i < mtr.length; i ++){
        if(mtr[i][1] == 0){
            count_col_zero++;
            console.log("count zero: " + count_col_zero);
        }else if(mtr[i][1] == 1){
            count_col_one++;
            console.log("one " + count_col_one + " " + i[0]);
        }else if(mtr[i][1] == 2){
            count_col_two++;
            console.log("two: " + count_col_two);
        }
    }

    //straight row win
    if(count_row_zero == 3 || count_row_one == 3 || count_row_two == 3){
        console.log("winner");
    }
    //straight col win
    else if(count_col_zero == 3 || count_col_one == 3 || count_col_two == 3){
        console.log("winner");
    }
    //diagonal win
    else if(count_row_zero >= 1 && count_row_one >= 1 && count_row_two >= 1 && count_col_zero == count_col_one && count_col_zero == count_col_two){
        console.log("winner");
    }
}

const table = document.querySelector("table#gameTable>tbody");
const numRows = 3;
const numCols = 3;

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
        // player 1 goes first; if player1 clicks, check with O
        if(player1){
            btn.textContent = "O";
            player1 = false;
            player2 = true;
            player1Btn[player1Count][0] = i;
            player1Btn[player1Count][1] = j;
            
            if(player1Count >= 2){
                checkWinner(player1Btn);
            }
            
            text.textContent = (player1Btn[player1Count]);
            player1Count++;
        }else{
            btn.textContent = "X";
            player1 = true;
            player2 = false;
            player2Btn[player2Count][0] = i;
            player2Btn[player2Count][1] = j;

            if(player2Count >= 2){
                checkWinner(player2Btn);
            }

            text.textContent = (player2Btn[player2Count]);
            player2Count++;
        }
      });
      btn.disabled;
      cell.appendChild(btn);

    //   if(player1Count >= 3){
    //     checkWinner(player1Btn);
    //   }else if(player2Count >= 3){
    //     checkWinner(player2Btn);
    //   }
    }
}

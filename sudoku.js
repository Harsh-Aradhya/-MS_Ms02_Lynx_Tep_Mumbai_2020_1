var board = [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0]
];  


console.log("INITIAL BOARD");
console.log( board.map( row=> row.join(' ')).join('\n'));

/*function to check emply cells*/
function eCells( board) {
    var empty = [];
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                var RowBox = 3* Math.floor( i/3);
                var ColBox = 3* Math.floor( j/3);
                empty.push([i,j, RowBox, ColBox]);
            }
        }
    }
    return empty;
}

/*Function to check Unique values*/
function isUnique( board, empty, value) {
    var row, col;
  
    row = board[empty[0]];
    for( col = 0; col < 9; ++ col) {
        if( value == row[col]) {
            return false;
        }
    }
    col = empty[1];
    for( var row = 0; row < 9; ++row) {
        if( value == board[ row][col]){
            return false;
        }	
    }
    var RowBox = empty[2];
    var ColBox = empty[3];
    for( var i = 3; i--;) {
        row = board[ RowBox++];
        for( var j = 3; j--;) {
            if( row[ColBox + j] == value) {
                return false;
            }
        }
    }
    return true;
}


/*function to solve the board*/
var solve = function (board) {
    var empty = eCells( board);

    nextEmpty:
    for (var i = 0; i < empty.length;) { 
        var row = empty[i][0]; 
        var column = empty[i][1]; 
        var value = board[row][column] + 1;    
        var cell = empty[i];

        while (value <= 9) {
            if( isUnique( board, cell, value)) {
                board[row][column] = value; 
                i++; 
                continue nextEmpty;
            }
            value++;     
        }

        board[row][column] = 0;
        if( i == 0) {  
            return null;
        }
        i--;
    }
    return board;
};


solve(board);
console.log("\n\nSOLVED BOARD");
console.log( board.map( row=> row.join(' ')).join('\n'));

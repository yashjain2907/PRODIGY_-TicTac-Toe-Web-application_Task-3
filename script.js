document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }
  
      return gameBoard.includes('') ? null : 'T'; // T for tie
    }
  
    function handleClick(index) {
      if (!gameBoard[index] && gameActive) {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
  
        const winner = checkWinner();
        if (winner) {
          gameActive = false;
          if (winner === 'T') {
            message.textContent = 'It\'s a Tie!';
          } else {
            message.textContent = `Player ${winner} Wins!`;
          }
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          message.textContent = `Player ${currentPlayer}'s turn`;
        }
      }
    }
  
    function handleCellClick(event) {
      const index = event.target.dataset.index;
      handleClick(index);
    }
  
    function handleResetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      currentPlayer = 'X';
      message.textContent = `Player ${currentPlayer}'s turn`;
  
      cells.forEach(cell => {
        cell.textContent = '';
      });
    }
  
    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });
  
    resetBtn.addEventListener('click', handleResetGame);
  });
  
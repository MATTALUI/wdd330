(() => {
  const numberOfTiles = 9;
  let playing;
  let board;
  let currentTurn;

  const checkWinStates = () => {
    const winStates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winStates.forEach(locations => {
      if (!playing) { return; }
      const marks = locations.map(i => board[i]);
      const uniq = Array.from(new Set(marks));
      if (uniq.length === 1 && uniq[0]) {
        document.querySelector('#winnersCircle').innerHTML = currentTurn + ' won!';
        playing = false;
      }
    });

    if (playing) {
      // Check cat's game
      const uniq = board.filter(space => !!space);
      if (uniq.length === board.length) {
        document.querySelector('#winnersCircle').innerHTML = 'Cat\'s game!';
        playing = false;
      }
    }
  };

  const manageClick = event => {
    const index = event.target.getAttribute('data-index');
    if (playing && !board[index]) {
      board[index] = currentTurn;
      event.target.innerHTML = currentTurn;
      checkWinStates();
      currentTurn = currentTurn === 'X' ? 'O' : 'X';
    }
  };

  const paintBoard = () => {
    document.querySelector('#board').innerHTML = '';
    document.querySelector('#winnersCircle').innerHTML = '';
    board.forEach((square, index) => {
      const ele = document.createElement('div');
      ele.setAttribute('data-index', index);
      ele.addEventListener('click', manageClick);
      ele.innerHTML = square;

      document.querySelector('#board').appendChild(ele);
    });
  };

  const setupGame = event => {
    playing = true;
    board = new Array(numberOfTiles).fill(null);
    currentTurn = 'X';
    paintBoard();
  };

  document.querySelector('#reset').addEventListener('click', setupGame);
  setupGame();
})();

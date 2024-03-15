export default class GameCells {
  constructor(cellsNumber, matrix, winPopup, timer, highScorePopup, playedTemplateName) {
    this._cellsNumber = cellsNumber;
    this._matrix = matrix;
    this._cells = this.renderCells();
    this._correctClicks = 0;
    this._incorrectClicks = 0; // add incorrect clicks counter
    this._correctCells = [];
    this._winPopup = winPopup;
    this._paintSound = new Audio('../sounds/in-black.mp3');
    this._crossSound = new Audio('../sounds/cross.mp3');
    this._clearSound = new Audio('../sounds/in-white.mp3');
    this._sounds = [this._paintSound, this._crossSound, this._clearSound];
    this._crosses = [];
    this._timer = timer;
    this._winningGames = this._getWinningGames();
    this._highScorePopup = highScorePopup;
    this._playedTemplateName = playedTemplateName;
  }

  getPlayedTemplateName() {
    return this._playedTemplateName;
  }

  setMatrix(matrix) {
    this._matrix = matrix;
  }

  muteAllSounds() {
    this._sounds.forEach(sound => {
      sound.muted = true;
    });
    localStorage.setItem('soundMuted', 'true');
  }

  activateAllSounds() {
    this._sounds.forEach(sound => {
      sound.muted = false;
    });
    localStorage.setItem('soundMuted', 'false');
  }

  renderCells() {
    const cells = [];

    for (let i = 0; i < this._cellsNumber; i++) {
      const cell = document.createElement('div');
      cell.className = 'game__cell';
      cells.push(cell);
    }

    return cells;
  }

  resolveNonogram() {
    this._cells.forEach(cell => {
      cell.classList.remove('game__cell_white');
    });

    this._timer.stopTimer();

    this._matrix.getMatrix().forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value === 1) {
          const cellIndex = rowIndex * this._matrix._columns + colIndex;
          this._cells[cellIndex].classList.add('game__cell_white');
        }
      });
    });
  }

  _startTimer() {
    if (!this._timer.isTimerRunning()) {
      this._timer.startTimer();
    }
  }

  restartNonogram() {
    this._correctClicks = 0;
    this._incorrectClicks = 0;
    this._correctCells = [];

    this._cells.forEach(cell => {
      cell.classList.remove('game__cell_white');
    });

    this._matrix.renderMatrix();

    this._crosses.forEach(cross => {
      cross.parentNode.removeChild(cross);
    });

    this._crosses = [];
  }

  _handleCellLeftClick(cell, rowIndex, colIndex) {
    const cellStatus = this._matrix.getCellStatus(rowIndex, colIndex);

    this._startTimer();

    if (cellStatus === 1) { // count correct clicks
      if (this._correctCells.includes(cell)) {
        this._clearSound.pause();
        this._clearSound.currentTime = 0; // sound effect for EVERY click (rapid cell clicks)
        this._clearSound.play();
        cell.classList.remove('game__cell_white');
        this._correctClicks--;
        this._correctCells = this._correctCells.filter(correctCell => correctCell !== cell);
      } else {
        this._paintSound.pause();
        this._paintSound.currentTime = 0;
        this._paintSound.play();
        cell.classList.add('game__cell_white');
        this._correctClicks++;
        this._correctCells.push(cell);
      }
    } else { // check incorrect clicks
      if (cell.classList.contains('game__cell_white')) {
        this._clearSound.pause();
        this._clearSound.currentTime = 0;
        this._clearSound.play();
        cell.classList.remove('game__cell_white');
        this._incorrectClicks--;
      } else {
        this._paintSound.pause();
        this._paintSound.currentTime = 0;
        this._paintSound.play();
        cell.classList.add('game__cell_white');
        this._incorrectClicks++;
      }
    }

    const firstCrossLine = cell.querySelector('.game__cross-line');
    const secondCrossLine = cell.querySelector('.game__cross-line_second');
    if (firstCrossLine && secondCrossLine) {
      cell.removeChild(firstCrossLine);
      cell.removeChild(secondCrossLine);
    }

    this._handleGameWinning();
  }

  _handleGameWinning() {
    if (this._correctClicks === this._matrix.getTotalCorrectCells() && this._incorrectClicks === 0) { // only if there are no clicked incorrect cells
      console.log('win');
      this._winPopup.showWinPopup();
      this._timer.stopTimer();
      this._updateWinningGames();
    }
  }

  _handleCellRightClick(event) {
    this._startTimer();

    const cell = event.currentTarget;
    if (cell.classList.contains('game__cell_white')) {
      return;
    }
    this._crossSound.pause();
    this._crossSound.currentTime = 0;
    this._crossSound.play();
    const firstCrossLine = document.createElement('div');
    firstCrossLine.className = 'game__cross-line';
    const secondCrossLine = document.createElement('div');
    secondCrossLine.className = 'game__cross-line game__cross-line_second';
    cell.appendChild(firstCrossLine);
    cell.appendChild(secondCrossLine);
    this._crosses.push(firstCrossLine, secondCrossLine);
  }

  _getWinningGames() {
    const winningGames = localStorage.getItem('winningGames');
    return winningGames ? JSON.parse(winningGames) : [];
  }

  _updateWinningGames() {
    const gameInfo = {
      template: this._playedTemplateName,
      level: this._matrix._columns === 5 ? 'Easy' : this._matrix._columns === 10 ? 'Medium' : 'Hard',
      time: this._timer.getTime()
    };

    this._winningGames.push(gameInfo);
    if (this._winningGames.length > 5) {
      this._winningGames.shift();
    }

    this._winningGames.sort((a, b) => a.time - b.time);

    localStorage.setItem('winningGames', JSON.stringify(this._winningGames));
    const winningGames = localStorage.getItem('winningGames');
    console.log(JSON.parse(winningGames));
    this._highScorePopup._updateTable();
  }

  saveGameState() {
    const cellsState = [];
  
    this._cells.forEach((cell, index) => {
      const cellState = {
        index: index,
        isBlack: cell.classList.contains('game__cell_white')
      };
      cellsState.push(cellState);
    });
  
    const gameState = {
      cellsState: cellsState,
      correctClicks: this._correctClicks,
      totalCorrectCells: this._correctCells,
      incorrectClicks: this._incorrectClicks,
      template: this._playedTemplateName,
      level: this._matrix._columns === 5 ? 'Easy' : this._matrix._columns === 10 ? 'Medium' : 'Hard',
      timer: this._timer.getTime(),
      matrixSize: this._matrix._columns,
      matrix: this._matrix
    };
  
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }

  
  loadGameState() {
    const gameState = JSON.parse(localStorage.getItem('gameState'));
  
    this._correctClicks = gameState.correctClicks;
    this._incorrectClicks = gameState.incorrectClicks;
    this._correctCells = gameState.totalCorrectCells;
  
    const cellsState = gameState.cellsState;
  
    cellsState.forEach(cellState => {
      const cell = this._cells[cellState.index];
      if (cellState.isBlack) {
        cell.classList.add('game__cell_white');
      }
    });
  
    this._matrix._randomTemplateKey = gameState.template;
  }
  

  setEventListeners(rowLength) {
    this._cells.forEach((cell, index) => {
      const rowIndex = Math.floor(index / rowLength); // depends on matrix dimension
      const colIndex = index % rowLength;

      cell.addEventListener('click', () => this._handleCellLeftClick(cell, rowIndex, colIndex));
      cell.addEventListener('contextmenu', event => {
        event.preventDefault();
        this._handleCellRightClick(event);
      });
    });
  }
}


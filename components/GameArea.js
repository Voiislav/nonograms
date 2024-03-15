export default class GameArea {
  constructor() {
    this._gameArea = this.renderGameArea();
  }

  renderGameArea() {
    const gameArea = document.createElement('div');
    gameArea.className = 'game';
    const topCluesSection = document.createElement('div');
    topCluesSection.className = 'game__clues game__clues_top';
    const leftCluesSection = document.createElement('div');
    leftCluesSection.className = 'game__clues game__clues_left';
    gameArea.appendChild(topCluesSection);
    gameArea.appendChild(leftCluesSection);
    return gameArea;
  }

  getGameArea() {
    return this._gameArea;
  }

  setGrid(level) {
    this._gameArea.style.gridTemplateColumns = `repeat(${level}, 1fr)`;
    this._gameArea.style.gridTemplateRows = `repeat(${level}, 1fr)`;
  }

  getColumnClues(matrix) {
    const columnClues = [];

    for (let col = 0; col < matrix[0].length; col++) {
      let consecutiveOnes = 0;
      const colClues = [];

      for (let row = 0; row < matrix.length; row++) {
        if (matrix[row][col] === 1) {
          consecutiveOnes++;
        } else if (consecutiveOnes > 0) {
          colClues.push(consecutiveOnes);
          consecutiveOnes = 0;
        }
      }

      if (consecutiveOnes > 0) {
        colClues.push(consecutiveOnes);
      }

      columnClues.push(colClues);
    }

    return columnClues;
  }

  renderColumnClues(columnClues, container) {
    columnClues.forEach((colClues, index) => {
      const clueCell = document.createElement('div');
      clueCell.className = 'game__clue-cell';

      colClues.forEach((consecutiveOnes) => {
        const consecutiveOnesContainer = document.createElement('div');
        consecutiveOnesContainer.className = 'game__clue-cell-item'
        consecutiveOnesContainer.textContent = consecutiveOnes;
        clueCell.appendChild(consecutiveOnesContainer);
      });

      container.appendChild(clueCell);
    });
  }

  getRowClues(matrix) {
    const rowClues = [];

    for (let row = 0; row < matrix.length; row++) {
      let consecutiveOnes = 0;
      const rowClue = [];

      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === 1) {
          consecutiveOnes++;
        } else if (consecutiveOnes > 0) {
          rowClue.push(consecutiveOnes);
          consecutiveOnes = 0;
        }
      }

      if (consecutiveOnes > 0) {
        rowClue.push(consecutiveOnes);
      }

      rowClues.push(rowClue);
    }

    return rowClues;
  }

  renderRowClues(rowClues, container) {
    rowClues.forEach((rowClue, index) => {
      const clueRow = document.createElement('div');
      clueRow.className = 'game__clue-сell game__clue-cell_row';

      rowClue.forEach((consecutiveOnes) => {
        const consecutiveOnesContainer = document.createElement('div');
        consecutiveOnesContainer.className = 'game__clue-cell-item_row'
        consecutiveOnesContainer.textContent = consecutiveOnes;
        clueRow.appendChild(consecutiveOnesContainer);
      });

      container.appendChild(clueRow);
    });
  }

  clearClues() {
    const topCluesSection = this._gameArea.querySelector('.game__clues_top');
    const leftCluesSection = this._gameArea.querySelector('.game__clues_left');
    topCluesSection.innerHTML = '';
    leftCluesSection.innerHTML = '';
  }

  setCluesGrid(level) {
    const topCluesSection = this._gameArea.querySelector('.game__clues_top');
    const leftCluesSection = this._gameArea.querySelector('.game__clues_left');
    topCluesSection.style.gridTemplateColumns = `repeat(${level}, 1fr)`;
    leftCluesSection.style.gridTemplateRows = `repeat(${level}, 1fr)`;
  }
}
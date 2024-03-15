export default class HighScorePopup {
  constructor() {
    this._highScorePopup = this.renderHighScorePopup();
    document.body.appendChild(this._highScorePopup);
    this.setEventListeners();
    this._updateTable();
  }

  renderHighScorePopup() {
    const highScorePopup = document.createElement('div');
    highScorePopup.className = 'popup';
    const highScorePopupContainer = document.createElement('div');
    highScorePopupContainer.className = 'popup__container popup__container_score';
    this._highScorePopupClose = document.createElement('button');
    this._highScorePopupClose.classList = 'popup__close';
    const highScorePopupTitle = document.createElement('p');
    highScorePopupTitle.className = 'popup__title';
    highScorePopupTitle.textContent = 'High score:';
    highScorePopupContainer.prepend(highScorePopupTitle);
    const highScorePopupCloseIcon = document.createElement('img');
    highScorePopupCloseIcon.src = '../images/close-white.svg';
    highScorePopupCloseIcon.alt = 'icon of cross that uses for closing windows';
    highScorePopupCloseIcon.className = 'popup__close-icon';
    this._highScorePopupClose.appendChild(highScorePopupCloseIcon);
    highScorePopupContainer.appendChild(this._highScorePopupClose);
    highScorePopup.appendChild(highScorePopupContainer);
    const highScoreTable = document.createElement('ol');
    highScoreTable.className = 'popup__list';
    highScorePopupContainer.appendChild(highScoreTable);
    return highScorePopup;
  }

  openHighScorePopup() {
    this._highScorePopup.classList.add('popup_opened');
  }

  _closeHighScorePopup() {
    this._highScorePopup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._highScorePopupClose.addEventListener('click', () => this._closeHighScorePopup());
  }

  _updateTable() {
    const highScoreTable = this._highScorePopup.querySelector('.popup__list');
    highScoreTable.innerHTML = '';
    const winningGames = JSON.parse(localStorage.getItem('winningGames'));
    if (winningGames) {
      winningGames.forEach(game => {
        const highScoreRow = document.createElement('li');
        highScoreRow.className = 'popup__list-item';
        highScoreRow.textContent = `${game.template} - ${game.level} - ${this._formatTime(game.time)}`;
        highScoreTable.appendChild(highScoreRow);
      });
    }
  }

  _formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
  
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}

export default class WinPopup {
  constructor(timer) {
    this._winPopup = this._renderWinPopup();
    document.body.appendChild(this._winPopup);
    this._victorySound = new Audio('./sounds/victory.mp3');
    this._timer = timer;
  }

  muteSound() {
    this._victorySound.muted = true;
    localStorage.setItem('soundMuted', 'true');
  }

  activateSound() {
    this._victorySound.muted = false;
    localStorage.setItem('soundMuted', 'false');
  }

  _renderWinPopup() {
    const winPopup = document.createElement('div');
    winPopup.className ='popup';
    const winPopupContainer = document.createElement('div');
    winPopupContainer.className = 'popup__container';
    winPopup.appendChild(winPopupContainer);
    const winPopupMessage = document.createElement('p');
    winPopupMessage.className = 'popup__message';
    winPopupMessage.textContent = 'Great! You have solved the nonogram!';
    winPopupContainer.appendChild(winPopupMessage);
    this._winPopupTime = document.createElement('p');
    this._winPopupTime.className = 'popup__time';
    winPopupContainer.appendChild(this._winPopupTime);
    const winPopupButton = document.createElement('button');
    winPopupButton.className = 'popup__button';
    winPopupButton.textContent = 'Start new game'
    winPopupContainer.appendChild(winPopupButton);
    return winPopup;
  }

  getWinPopup() {
    return this._winPopup;
  }

  showWinPopup() {
    this._winPopup.classList.add('popup_opened');
    this._victorySound.play();
    const time = this._timer.getTime();
    const formattedTime = this._formatTime(time);
    this._winPopupTime.textContent = `Your time: ${formattedTime}`;
  }

  hideWinPopup() {
    this._winPopup.classList.remove('popup_opened');
    this._victorySound.pause();
    this._victorySound.currentTime = 0;
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
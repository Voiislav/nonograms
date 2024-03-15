export default class Timer {
  constructor() {
    this._timer = this.renderTimer();
    this._startTime = null;
    this._intervalId = null;
    this._stoppedTime = 0;
  }

  renderTimer() {
    this._timer = document.createElement('p');
    this._timer.classList = 'timer';
    this._timer.textContent = '00:00'
    return this._timer;
  }

  setTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    this._timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }

  startTimer() {
    if (!this._startTime) {
      const savedTime = parseInt(this._timer.textContent.replace(':', '')) * 1000;
      if (savedTime === 0) {
        this._startTime = Date.now();
      } else {
        this._startTime = Date.now() - savedTime;
      }
      this._intervalId = setInterval(() => {
        this._updateTimer();
      }, 1000);
    }
  }

  clearTimer() {
    clearInterval(this._intervalId);
    this._startTime = null;
    this._stoppedTime = 0;
    this._timer.textContent = '00:00';
  }

  isTimerRunning() {
    return this._startTime !== null;
  }

  stopTimer() {
    if (this._startTime) {
      clearInterval(this._intervalId);
      this._stoppedTime = Date.now() - this._startTime;
      this._startTime = null;
      this._timer.textContent = '00:00';
    }
  }

  getTime() {
    if (this._startTime) {
      return this._getTimeElapsed();
    } else {
      return this._stoppedTime;
    }
  }

  _updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - this._startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
  
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    this._timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }

  _getTimeElapsed() {
    return Date.now() - this._startTime;
  }
}

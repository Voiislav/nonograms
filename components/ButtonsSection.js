export default class ButtonsSection {
  constructor() {
    this._buttonsSection = this._renderButtonsSection();
    this._randomButton = this._renderRandomButton();
    this._saveGameButton = this._renderSaveGameButton();
    this._solutionButton = this._renderSolutionButton();
    this._resetButton = this._renderResetButton();
    this._highScoreButton = this._renderHighScoreButton();
    this._loadGameButton = this._renderLoadGameButton();
    this._buttonsSection.appendChild(this._randomButton);
    this._buttonsSection.appendChild(this._saveGameButton);
    this._buttonsSection.appendChild(this._solutionButton);
    this._buttonsSection.appendChild(this._resetButton);
    this._buttonsSection.appendChild(this._highScoreButton);
    this._buttonsSection.appendChild(this._loadGameButton);
  }

  _renderButtonsSection() {
    const buttonsSection = document.createElement('div');
    buttonsSection.className = 'buttons-section';
    return buttonsSection;
  }

  _renderRandomButton() {
    const randomButton = document.createElement('button');
    randomButton.className = 'buttons-section__button';
    randomButton.id = 'random';
    randomButton.textContent = 'Random game';
    return randomButton;
  }

  _renderSaveGameButton() {
    const saveGameButton = document.createElement('button');
    saveGameButton.className = 'buttons-section__button';
    saveGameButton.textContent = 'Save this game';
    saveGameButton.id = 'save';
    return saveGameButton;
  }

  _renderSolutionButton() {
    const solutionButton = document.createElement('button');
    solutionButton.className = 'buttons-section__button';
    solutionButton.textContent = 'Get solution';
    solutionButton.id = 'solution';
    return solutionButton;
  }

  _renderResetButton() {
    const resetButton = document.createElement('button');
    resetButton.className = 'buttons-section__button';
    resetButton.textContent = 'Restart';
    resetButton.id = 'reset'
    return resetButton;
  }

  _renderHighScoreButton() {
    const highScoreButton = document.createElement('button');
    highScoreButton.className = 'buttons-section__button';
    highScoreButton.textContent = 'High Score';
    highScoreButton.id = 'high-score'
    return highScoreButton;
  }

  _renderLoadGameButton() {
    const loadGameButton = document.createElement('button');
    loadGameButton.className = 'buttons-section__button';
    loadGameButton.textContent = 'Continue last game';
    loadGameButton.id = 'load';
    return loadGameButton;
  }
}
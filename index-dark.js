document.body.className = 'page';

import * as templates from '../utils/templates.js'; // game templates (as matrices)

import Header from "./components-dark/Header.js";
import MainSection from "./components-dark/MainSection.js";
import Footer from "./components-dark/Footer.js";
import GameArea from "./components-dark/GameArea.js";
import Matrix from "./components-dark/Matrix.js";
import GameCells from "./components-dark/GameCells.js";
import WinPopup from "./components-dark/WinPopup.js";
import TemplateSelector from "./components-dark/TemplateSelector.js";
import LevelSelector from "./components-dark/LevelSelector.js";
import ButtonsSection from "./components-dark/ButtonsSection.js";
import Timer from "./components-dark/Timer.js";
import HighScorePopup from './components-dark/HighScorePopup.js';

const header = new Header();
const controlSoundButton = header.getControlSoundButton();
const classicThemeButton = header.getClassicThemeButton();

const mainSection = new MainSection();

const footer = new Footer();

const gameArea = new GameArea();
mainSection.getMainSection().appendChild(gameArea.getGameArea());

const templateSelector = new TemplateSelector();
mainSection.getMainSection().appendChild(templateSelector.renderTemplateSelector());

const myTemplateSelector = document.querySelector('.template-selector__selector');

const levelSelector = new LevelSelector();
mainSection.getMainSection().appendChild(levelSelector.renderLevelSelector());

const myLevelSelector = document.querySelector('.level-selector__selector');

const buttonsSection = new ButtonsSection();
mainSection.getMainSection().appendChild(buttonsSection._buttonsSection);

const timer = new Timer();
mainSection.getMainSection().appendChild(timer.renderTimer());

const winPopup = new WinPopup(timer);

const highScorePopup = new HighScorePopup();
highScorePopup.setEventListeners();

const myGameArea = document.querySelector('.game');
const myButtonsSection = document.querySelector('.buttons-section');
const randomGameButton = myButtonsSection.querySelector('#random');
const solutionButtom = myButtonsSection.querySelector('#solution');
const resetButton = myButtonsSection.querySelector('#reset');
const highScoreButton = myButtonsSection.querySelector('#high-score');
const saveGameButton = myButtonsSection.querySelector('#save');
const loadGameButton = myButtonsSection.querySelector('#load');

// we need to clear game area before rendering the new one (except game clues because they are children of game area too!)
const clearGameArea = () => {
  let child = myGameArea.children[2];
  while (child) {
    myGameArea.removeChild(child);
    child = myGameArea.children[2];
  }
}


// games starting
let gameCells;
let matrix;

const checkSoundState = () => {
  const soundMutedValue = localStorage.getItem('soundMuted');
  if (soundMutedValue === 'true') {
    gameCells.muteAllSounds();
    winPopup.muteSound();
  } else {
    gameCells.activateAllSounds();
    winPopup.activateSound();
  }
}

const startEasyGame = () => {
  gameArea.clearClues();
  console.clear();
  timer.stopTimer();
  timer.clearTimer();
  matrix = new Matrix(5, 5, templates.Easy);
  gameArea.setGrid(matrix._columns);
  matrix.getRandomTemplateName();
  myLevelSelector.value = 'Easy';
  myTemplateSelector.value = matrix._randomTemplateKey;
  matrix.renderMatrix(); // matrix is a template
  clearGameArea();
  const cellsNumber = matrix._columns * matrix._rows;
  gameCells = new GameCells(cellsNumber, matrix, winPopup, timer, highScorePopup, myTemplateSelector.value); // 1 - correct choice, 0 - incorrect choice; show winPopup in case of game winning
  myGameArea.append(...gameCells._cells);
  gameCells.setEventListeners(matrix._columns);
  const columnClues = gameArea.getColumnClues(matrix._matrix);
  const topCluesSection = gameArea.getGameArea().querySelector('.game__clues_top');
  gameArea.renderColumnClues(columnClues, topCluesSection);
  const rowClues = gameArea.getRowClues(matrix._matrix);
  const leftCluesSection = gameArea.getGameArea().querySelector('.game__clues_left');
  gameArea.renderRowClues(rowClues, leftCluesSection);
  gameArea.setCluesGrid(matrix._columns);
  checkSoundState();
};

const startMediumGame = () => {
  gameArea.clearClues();
  console.clear();
  timer.stopTimer();
  timer.clearTimer();
  matrix = new Matrix(10, 10, templates.Medium);
  gameArea.setGrid(matrix._columns);
  matrix.getRandomTemplateName();
  myLevelSelector.value = 'Medium';
  myTemplateSelector.value = matrix._randomTemplateKey;
  matrix.renderMatrix();
  clearGameArea();
  const cellsNumber = matrix._columns * matrix._rows;
  gameCells = new GameCells(cellsNumber, matrix, winPopup, timer, highScorePopup, myTemplateSelector.value);
  myGameArea.append(...gameCells._cells);
  gameCells.setEventListeners(matrix._columns);
  const columnClues = gameArea.getColumnClues(matrix._matrix);
  const topCluesSection = gameArea.getGameArea().querySelector('.game__clues_top');
  gameArea.renderColumnClues(columnClues, topCluesSection);
  const rowClues = gameArea.getRowClues(matrix._matrix);
  const leftCluesSection = gameArea.getGameArea().querySelector('.game__clues_left');
  gameArea.renderRowClues(rowClues, leftCluesSection);
  gameArea.setCluesGrid(matrix._columns);
  checkSoundState();
};

const startHardGame = () => {
  gameArea.clearClues();
  console.clear();
  timer.stopTimer();
  timer.clearTimer();
  matrix = new Matrix(15, 15, templates.Hard);
  gameArea.setGrid(matrix._columns);
  matrix.getRandomTemplateName();
  myLevelSelector.value = 'Hard';
  myTemplateSelector.value = matrix._randomTemplateKey;
  matrix.renderMatrix();
  clearGameArea();
  const cellsNumber = matrix._columns * matrix._rows;
  gameCells = new GameCells(cellsNumber, matrix, winPopup, timer, highScorePopup, myTemplateSelector.value);
  myGameArea.append(...gameCells._cells);
  gameCells.setEventListeners(matrix._columns);
  const columnClues = gameArea.getColumnClues(matrix._matrix);
  const topCluesSection = gameArea.getGameArea().querySelector('.game__clues_top');
  gameArea.renderColumnClues(columnClues, topCluesSection);
  const rowClues = gameArea.getRowClues(matrix._matrix);
  const leftCluesSection = gameArea.getGameArea().querySelector('.game__clues_left');
  gameArea.renderRowClues(rowClues, leftCluesSection);
  gameArea.setCluesGrid(matrix._columns);
  checkSoundState();
};


// first EASY game after page loading/reloading
document.addEventListener('DOMContentLoaded', () => {
  startEasyGame();
  const isSoundButtonClicked = localStorage.getItem('soundButtonClicked');
  if (isSoundButtonClicked === 'true') {
    controlSoundButton.classList.add('header__button_clicked');
  }
});


const selectGame = () => {
  if (myLevelSelector.value === 'Easy') {
    startEasyGame();
  }
  if (myLevelSelector.value === 'Medium') {
    startMediumGame();
  }
  if (myLevelSelector.value === 'Hard') {
    startHardGame();
  }
};


// handle level changing
myLevelSelector.addEventListener('change', () => {
  templateSelector.updateTemplateSelector(myLevelSelector.value);
  selectGame();
});


// start game with template choosed by user
myTemplateSelector.addEventListener('change', () => {
  console.clear();
  gameArea.clearClues();
  timer.stopTimer();
  matrix.createSelectedMatrix(myTemplateSelector.value);
  gameArea.setGrid(matrix._columns);
  clearGameArea();
  const cellsNumber = matrix._columns * matrix._rows;
  gameCells = new GameCells(cellsNumber, matrix, winPopup, timer, highScorePopup, myTemplateSelector.value);
  myGameArea.append(...gameCells._cells);
  gameCells.setEventListeners(matrix._columns);
  const columnClues = gameArea.getColumnClues(matrix._matrix);
  const topCluesSection = gameArea.getGameArea().querySelector('.game__clues_top');
  gameArea.renderColumnClues(columnClues, topCluesSection);
  const rowClues = gameArea.getRowClues(matrix._matrix);
  const leftCluesSection = gameArea.getGameArea().querySelector('.game__clues_left');
  gameArea.renderRowClues(rowClues, leftCluesSection);
  gameArea.setCluesGrid(matrix._columns);
  checkSoundState();
});


// new game (second, third, ...)
const startNewGame = () => {
  selectGame();
};


// start new game on winPopup button click
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__button')) {
    winPopup.hideWinPopup();
    startNewGame();
  }
});


// start random game on button click
const startRandomGame = () => {
  const randomIndex = Math.floor(Math.random() * 3);
  switch (randomIndex) {
    case 0:
      startEasyGame();
      break;
    case 1:
      startMediumGame();
      break;
    case 2:
      startHardGame();
      break;
  };
};

randomGameButton.addEventListener('click', () => startRandomGame());


// sound controller
controlSoundButton.addEventListener('click', () => {
  if (controlSoundButton.classList.contains('header__button_clicked')) {
    gameCells.activateAllSounds();
    winPopup.activateSound();
    controlSoundButton.classList.remove('header__button_clicked');
    localStorage.setItem('soundButtonClicked', 'false');
  } else {
    gameCells.muteAllSounds();
    winPopup.muteSound();
    controlSoundButton.classList.add('header__button_clicked');
    localStorage.setItem('soundButtonClicked', 'true');
  }
})


// get solution automatically
solutionButtom.addEventListener('click', () => gameCells.resolveNonogram());


// restart current game
resetButton.addEventListener('click', () => {
  gameCells.restartNonogram();
  timer.stopTimer();
});


//switch page theme to dark
classicThemeButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});


//open high score
highScoreButton.addEventListener('click', () => {
  highScorePopup.openHighScorePopup();
});


//save current game
saveGameButton.addEventListener('click', () => {
  gameCells.saveGameState();
});


//load last game
const loadGame = () => {
  console.clear();
  gameArea.clearClues();
  clearGameArea();
  timer.stopTimer();
  const gameState = JSON.parse(localStorage.getItem('gameState'));
  matrix = new Matrix(gameState.matrixSize, gameState.matrixSize, gameState.matrix);
  matrix.createSelectedMatrix(gameState.template);
  myTemplateSelector.value = gameState.template;
  myLevelSelector.value = gameState.level;
  gameArea.setGrid(gameState.matrixSize);
  timer.setTime(gameState.timer);
  const cellsNumber = gameState.matrixSize * gameState.matrixSize;
  gameCells = new GameCells(cellsNumber, matrix, winPopup, timer, highScorePopup, gameState.template);
  myGameArea.append(...gameCells._cells);
  gameCells.setEventListeners(gameState.matrixSize);
  const columnClues = gameArea.getColumnClues(matrix.getMatrix());
  const topCluesSection = gameArea.getGameArea().querySelector('.game__clues_top');
  gameArea.renderColumnClues(columnClues, topCluesSection);
  const rowClues = gameArea.getRowClues(matrix.getMatrix());
  const leftCluesSection = gameArea.getGameArea().querySelector('.game__clues_left');
  gameArea.renderRowClues(rowClues, leftCluesSection);
  gameArea.setCluesGrid(gameState.matrixSize);
  checkSoundState();
}


loadGameButton.addEventListener('click', () => {
  gameArea.clearClues();
  loadGame();
  gameCells.loadGameState();
});
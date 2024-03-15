import * as templates from '../utils/templates.js';

export default class Matrix {
  constructor(rows, columns, list) {
    this._list = list;
    this._rows = rows;
    this._columns = columns;
    this._matrix = this._loadMatrix();
  }

  createSelectedMatrix(templateName) {
    const template = this.getTemplateByName(templateName);
    const matrix = [];
    let index = 0;
    for (let i = 0; i < this._rows; i++) {
      const row = [];
      for (let j = 0; j < this._columns; j++) {
        row.push(template[index]);
        index++;
      }
      matrix.push(row);
    }
  
    console.log(`Level: ${this._getLevelName(templateName)}`);
    console.log(`Template name: ${templateName}`);
  
    for (let i = 0; i < this._rows; i++) {
      console.log(matrix[i].join(' '));
    }

    this._matrix = matrix;
  }

  _loadMatrix() {
    const randomTemplate = this.getRandomTemplateName();

    const matrix = [];
    let index = 0;
    for (let i = 0; i < this._rows; i++) {
      const row = [];
      for (let j = 0; j < this._columns; j++) {
        row.push(randomTemplate[index]);
        index++;
      }
      matrix.push(row);
    }

    console.log(`Level: ${this._getLevelName(this._randomTemplateKey)}`);
    console.log(`Template name: ${this._randomTemplateKey}`);

    return matrix;
  }

  _getLevelName(templateName) {
    if (Object.keys(templates.Easy).includes(templateName)) {
      return 'Easy';
    }
    if (Object.keys(templates.Medium).includes(templateName)) {
      return 'Medium';
    }
    if (Object.keys(templates.Hard).includes(templateName)) {
      return 'Hard';
    }
  }

  getTemplateByName(templateName) { // user can choose game template
    const level = this._getLevelName(templateName);
    return templates[level][templateName];
  }

  getRandomTemplateName() {
    if (!this._randomTemplateKey) {
      const templateKeys = Object.keys(this._list);
      this._randomTemplateKey = templateKeys[Math.floor(Math.random() * templateKeys.length)];
    }
    const randomTemplate = this._list[this._randomTemplateKey];
    return randomTemplate;
  }

  getTotalCorrectCells() {
    const correctCells = [];
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._columns; j++) {
        if (this._matrix[i][j] === 1) {
          correctCells.push(this._matrix[i][j]);
        }
      }
    }
    return correctCells.length;
  }

  getCellStatus(row, column) {
    return this._matrix[row][column];
  }

  getMatrix() {
    return this._matrix;
  }

  renderMatrix() {
    for (let i = 0; i < this._rows; i++) {
      console.log(this._matrix[i].join(' '));
    }
  }
}
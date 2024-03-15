import * as templates from '../utils/templates.js';

export default class LevelSelector {
  constructor() {
    this._levelSelector = this.renderLevelSelector();
  }

  renderLevelSelector() {
    const levelSelectorContainer = document.createElement('div');
    levelSelectorContainer.classList = 'level-selector';
    const levelSelectorTitle = document.createElement('h2');
    levelSelectorTitle.textContent = 'Choose a level:';
    levelSelectorTitle.classList = 'level-selector__title';
    const levelSelector = document.createElement('select');
    levelSelector.classList = 'level-selector__selector';

    const levelOrder = [
      { key: 'Easy', value: templates.Easy },
      { key: 'Medium', value: templates.Medium },
      { key: 'Hard', value: templates.Hard }
    ];

    levelOrder.forEach(item => {
      this._addOptionToSelect(levelSelector, item.key, item.value);
    });

    levelSelectorContainer.appendChild(levelSelectorTitle);
    levelSelectorContainer.appendChild(levelSelector);

    return levelSelectorContainer;
  }

  _addOptionToSelect(selectElement, optionText) {
    const option = document.createElement('option');
    option.text = optionText;

    selectElement.appendChild(option);
  }
}
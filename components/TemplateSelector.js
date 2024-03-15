import * as templates from '../utils/templates.js';

export default class TemplateSelector {
  constructor() {
    this._templateSelector = this.renderTemplateSelector();
  }

  renderTemplateSelector() {
    const templateSelectorContainer = document.createElement('div');
    templateSelectorContainer.classList = 'template-selector';
    const templateSelectorTitle = document.createElement('h2');
    templateSelectorTitle.textContent = 'Choose a template:';
    templateSelectorTitle.classList = 'template-selector__title';
    const templateSelector = document.createElement('select');
    templateSelector.classList = 'template-selector__selector';

    Object.keys(templates).forEach(key => {
      const templateNames = Object.keys(templates[key]);
      templateNames.forEach(name => {
        this._addOptionToSelect(templateSelector, name);
      });
    });

    templateSelectorContainer.appendChild(templateSelectorTitle);
    templateSelectorContainer.appendChild(templateSelector);

    return templateSelectorContainer;
  }

  // update templates list depending on game level
  updateTemplateSelector(selectedLevel) {
    const selectedLevelTemplates = templates[selectedLevel];

    const templateSelector = document.querySelector('.template-selector__selector');
    templateSelector.innerHTML = '';

    Object.keys(selectedLevelTemplates).forEach(name => {
      this._addOptionToSelect(templateSelector, name);
    });
  }

  _addOptionToSelect(selectElement, optionText) {
    const option = document.createElement('option');
    option.text = optionText;

    selectElement.appendChild(option);
  }
}


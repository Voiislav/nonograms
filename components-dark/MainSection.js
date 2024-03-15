export default class MainSection {
  constructor() {
    this._mainSection = this.renderMainSection();
    document.body.appendChild(this._mainSection);
  }

  renderMainSection() {
    const mainSection = document.createElement('main');
    mainSection.className = 'main';
    return mainSection;
  }

  getMainSection() {
    return this._mainSection;
  }
}
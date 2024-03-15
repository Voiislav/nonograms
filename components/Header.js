export default class Header {
  constructor() {
    this._header = this.renderHeader();
    document.body.appendChild(this._header);
  }

  renderHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    const headerTitle = document.createElement('h1');
    headerTitle.className = 'header__title';
    headerTitle.textContent = 'nonograms';
    header.appendChild(headerTitle);
    this._controlSoundButton = document.createElement('button');
    this._controlSoundButton.className = 'header__button';
    const controlSoundIcon = document.createElement('img');
    controlSoundIcon.src = '../images/sound-icon.svg';
    controlSoundIcon.alt = 'sound symbol';
    controlSoundIcon.className = 'header__button-icon';
    this._controlSoundButton.appendChild(controlSoundIcon);
    header.appendChild(this._controlSoundButton);
    const themeButtonsContainer = document.createElement('div');
    themeButtonsContainer.className = 'header__themes';
    const classicThemeButton = document.createElement('button');
    classicThemeButton.className = 'header__theme-button';
    classicThemeButton.textContent = 'Classic theme';
    classicThemeButton.setAttribute('disabled', true);
    this._darkThemeButton = document.createElement('button');
    this._darkThemeButton.className = 'header__theme-button';
    this._darkThemeButton.textContent = 'Dark theme';
    themeButtonsContainer.appendChild(classicThemeButton);
    themeButtonsContainer.appendChild(this._darkThemeButton);
    header.prepend(themeButtonsContainer);
    return header;
  }

  getControlSoundButton() {
    return this._controlSoundButton;
  }

  getDarkThemeButton() {
    return this._darkThemeButton;
  }
}
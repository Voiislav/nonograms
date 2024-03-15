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
    controlSoundIcon.src = './images/sound-icon-dark.png';
    controlSoundIcon.alt = 'sound symbol';
    controlSoundIcon.className = 'header__button-icon';
    this._controlSoundButton.appendChild(controlSoundIcon);
    header.appendChild(this._controlSoundButton);
    const themeButtonsContainer = document.createElement('div');
    themeButtonsContainer.className = 'header__themes';
    this._classicThemeButton = document.createElement('button');
    this._classicThemeButton.className = 'header__theme-button';
    this._classicThemeButton.textContent = 'Classic theme';
    const darkThemeButton = document.createElement('button');
    darkThemeButton.className = 'header__theme-button';
    darkThemeButton.textContent = 'Dark theme';
    darkThemeButton.setAttribute('disabled', true);
    themeButtonsContainer.appendChild(this._classicThemeButton);
    themeButtonsContainer.appendChild(darkThemeButton);
    header.prepend(themeButtonsContainer);
    return header;
  }

  getControlSoundButton() {
    return this._controlSoundButton;
  }

  getClassicThemeButton() {
    return this._classicThemeButton;
  }
}
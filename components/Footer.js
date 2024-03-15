export default class Footer {
  constructor() {
    this._footer = this.renderFooter();
    document.body.appendChild(this._footer);
  }

  renderFooter() {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    const footerCopywrite = document.createElement('p');
    footerCopywrite.textContent = '© 2024'
    footer.appendChild(footerCopywrite);
    const footerAuthor = document.createElement('p');
    footerAuthor.textContent = 'made by VM';
    footer.appendChild(footerAuthor);
    return footer;
  }
}
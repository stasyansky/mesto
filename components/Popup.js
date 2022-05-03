export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handeEscCloseBinded = this._handleEscClose.bind(this);
    this._closeByMouseBinded = this._closeByMouse.bind(this);
  }

  open() {
    this.setEventListeners();
    this._popupElement.classList.add('popup_opened');
    setTimeout(() => {
      this._popupElement.focus();
    }, 100);
  }

  close() {
    this._removeEventListeners();
    this._popupElement.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closeByMouse(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
    if (evt.target.classList.contains('popup__close-btn')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('keydown', this._handeEscCloseBinded);
    this._popupElement.addEventListener('mousedown', this._closeByMouseBinded);
  }

  _removeEventListeners() {
    this._popupElement.removeEventListener('keydown', this._handeEscCloseBinded);
    this._popupElement.removeEventListener('mousedown', this._closeByMouseBinded);
  }
}

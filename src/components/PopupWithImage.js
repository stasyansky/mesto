import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgElem = this._popupElement.querySelector('.popup-preview__img');
    this._textElem = this._popupElement.querySelector('.popup-preview__text');
  }

  open({ src, description }) {
    this._imgElem.setAttribute('src', src);
    this._imgElem.setAttribute('alt', description);
    this._textElem.textContent = description;
    super.open();
  }
}

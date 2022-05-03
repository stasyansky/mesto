import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open({ src, description }) {
    const imgElem = this._popupElement.querySelector('.popup-preview__img');
    imgElem.setAttribute('src', src);
    imgElem.setAttribute('alt', description);
    this._popupElement.querySelector('.popup-preview__text').textContent = description;
    super.open();
  }
}

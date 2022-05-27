import { Popup } from "./Popup.js";

export class PopupCardDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._btnElem = this._popupElement.querySelector('.popup__btn');
  }

  setEventListeners() {
    super.setEventListeners();
    this._btnElem.addEventListener('click', this._handleFormSubmit);
  }

  setButtonText(text) {
    this._btnElem.textContent = text;
  }

  getCardId() {
    return this._cardId;
  }

  setCardData(cardId, callback) {
    this._cardId = cardId;
    this._cardCallback = callback;
  }

  callCardCallback() {
    this._cardCallback();
  }
}

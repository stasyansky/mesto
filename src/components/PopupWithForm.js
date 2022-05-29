import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._form = this._popupElement.querySelector('form');
    this._formSubmitElem = this._form.querySelector('.popup__btn');
  }

  setInputValues(data) {
    Object.entries(data).forEach(entry => {
      const [key, value] = entry;
      const input = this._form.elements[key];
        if (input) {
          input.value = value;
        }
      });
  }

  get inputValues() {
    return Object.fromEntries(new FormData(this._form).entries());
  }

  setButtonText(text) {
    this._formSubmitElem.textContent = text;
  }

  setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    this._form.reset();
    super.close();
  }
}

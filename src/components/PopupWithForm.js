import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._form = this._popupElement.querySelector('form');
  }

  setInputValues(objectWithData) {
    Object.entries(objectWithData).forEach(entry => {
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

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    this._form.reset();
    super.close();
  }
}

import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitFn) {
    super(popupSelector);
    this._formSubmitFn = formSubmitFn.bind(this);
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

  _getInputValues() {
    return Object.fromEntries(new FormData(this._form).entries());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmitFn);
  }

  close() {
    this._form.reset();
    this._form.removeEventListener('submit', this._formSubmitFn);
    super.close();
  }
}

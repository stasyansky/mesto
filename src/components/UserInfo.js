export class UserInfo {
  constructor({ name, prof }) {
    this._nameElem = document.querySelector(name);
    this._profElem = document.querySelector(prof);
  }

  getUserInfo() {
    return {
      name: this._nameElem.textContent,
      prof: this._profElem.textContent,
    };
  }

  setUserInfo({ name, prof }) {
    this._nameElem.textContent = name;
    this._profElem.textContent = prof;
  }
}

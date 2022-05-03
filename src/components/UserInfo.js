export class UserInfo {
  constructor(info) {
    this._nameElem = document.querySelector('.profile__name');
    this._nameProf = document.querySelector('.profile__prof');
    this._setInfo(info);
  }

  _setInfo({ name, prof }) {
    this._info = { name, prof };
    this._nameElem.textContent = name;
    this._nameProf.textContent = prof;
  }

  get info() {
    return this._info;
  }

  set info(info) {
    this._setInfo(info);
  }
}

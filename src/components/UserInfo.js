export class UserInfo {
  constructor({ name, about, avatar }) {
    this._nameElem = document.querySelector(name);
    this._aboutElem = document.querySelector(about);
    this._avatarElem = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._nameElem.textContent,
      about: this._aboutElem.textContent,
      avatar: this._avatarElem.src,
      id: this._id,
    };
  }

  setUserInfo({ name, about, avatar, id }) {
    this._nameElem.textContent = name;
    this._aboutElem.textContent = about;
    this._avatarElem.src = avatar;
    this._id = id;
  }
}

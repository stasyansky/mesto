import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_incorrect',
  errorClass: 'popup__text-error_active',
}

const btnEditProfile = document.querySelector('.profile__edit-btn');
const btnAddPicture = document.querySelector('.profile__add-btn');

const userInfo = new UserInfo({
  name: 'Жак-Ив Кусто',
  prof: 'Исследователь океана',
});
const cardTemplate = document.querySelector('#card_template');

function cardPreviewOpen({ src, description }) {
  const popupPreview = new PopupWithImage('.popup-preview');
  popupPreview.open({ src, description });
}

function createNewCard(data) {
  return new Card({
    data,
    cardSelector: '.card',
    cardTemplate,
    cardPreviewFn: cardPreviewOpen,
  })
}

const formEditFormValidator = new FormValidator({data: validationObj, validateElement: 'formProfile'})
formEditFormValidator.enableValidation();

const formAddFormValidator = new FormValidator({data: validationObj, validateElement : 'formAddPic'})
formAddFormValidator.enableValidation();

function editFormSubmit (evt) {
  evt.preventDefault();
  const { popupName: name, popupProf: prof } = this._getInputValues();
  userInfo.info = { name, prof };
  this.close();
}

function addFormSubmit (evt) {
  evt.preventDefault();
  const { popupTitle: name, popupUrl: link } = this._getInputValues();
  const section = new Section(undefined, '.places__cards');
  section.addItem(createNewCard({ name, link }).cardElement);
  this.close();
}

btnEditProfile.addEventListener('click', function () {
  const popup = new PopupWithForm('.popup-edit', editFormSubmit);
  popup.setInputValues({
    popupName: userInfo.info.name,
    popupProf: userInfo.info.prof
  });
  formEditFormValidator.checkEventInputForm();
  popup.open();
});

btnAddPicture.addEventListener('click', function () {
  const popup = new PopupWithForm('.popup-add', addFormSubmit);
  formAddFormValidator.resetValidationForm();
  popup.open();
});

function renderInitialCards() {
  const section = new Section(
    {
      items: initialCards,
      renderer: createNewCard,
    },
    '.places__cards',
  );
  section.renderCards();
}

window.addEventListener('load', () => {
  renderInitialCards();
});

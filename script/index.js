import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__prof');
const popupList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPreview = document.querySelector('.popup-preview');

const formEdit = document.forms['formProfile'];
const inputName = formEdit.elements.popupName;
const inputProf = formEdit.elements.popupProf;

const formAdd = document.forms['formAddPic'];
const inputTitle = formAdd.elements.popupTitle;
const inputUrl = formAdd.elements.popupUrl;

const cardElementsList = document.querySelector('.places__cards');
const cardTemplate = document.querySelector('#card_template');
const popupPreviewPicture = popupPreview.querySelector('.popup-preview__img');
const popupPreviewPicDesc = popupPreview.querySelector('.popup-preview__text');

function openPopup(currentPopup) {
  currentPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

function createNewCard(data) {
  return new Card({
    data,
    cardSelector: '.card',
    cardTemplate,
    popupPreviewElements: {
      picture: popupPreviewPicture,
      desc: popupPreviewPicDesc,
      preview: popupPreview,
    },
    openPopupFn: openPopup,
  })
}

initialCards.forEach((item) => {
  const card = createNewCard(item);
  cardElementsList.append(card.cardElement);
});

const formEditFormValidator = new FormValidator({data: validationObj, validateElement: 'formProfile'})
formEditFormValidator.enableValidation();

const formAddFormValidator = new FormValidator({data: validationObj, validateElement : 'formAddPic'})
formAddFormValidator.enableValidation();

function closePopup(currentPopup) {
  currentPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

function editFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProf.textContent = inputProf.value;
  closePopup(popupEdit);
}

function addFormSubmit (evt) {
  evt.preventDefault();
  const titleFormAdd = inputTitle.value;
  const urlFormAdd = inputUrl.value;
  const data = {
    name: titleFormAdd,
    link: urlFormAdd
  };
  const card = createNewCard(data);
  cardElementsList.prepend(card.cardElement);
  evt.currentTarget.reset();
  closePopup(popupAdd);
}

function checkEventInputForm(currentPopup) {
  const form = currentPopup.querySelector('.popup__form');
  if (form) {
    const inputs = form.querySelectorAll('.popup__input');
    inputs.forEach(input => {
      input.dispatchEvent(new Event('input'));
    });
  }
}

function resetFormPopup(currentPopup) {
  const form = currentPopup.querySelector('.popup__form');
    form.reset();
}

btnEditProfile.addEventListener('click', function () {
  resetFormPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputProf.value = profileProf.textContent;
  checkEventInputForm(popupEdit);
  openPopup(popupEdit);
});

btnAddPicture.addEventListener('click', function () {
  resetFormPopup(popupAdd);
  checkEventInputForm(popupAdd);
  formAddFormValidator.resetValidationErrors();
  openPopup(popupAdd);
});

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup)
    }
  })
})

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

formEdit.addEventListener('submit', editFormSubmit);
formAdd.addEventListener('submit', addFormSubmit);

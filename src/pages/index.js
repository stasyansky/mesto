import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  initialCards,
  validationObj,
  btnEditProfile,
  btnAddPicture,
  cardTemplate
} from '../utils/constants.js';
const popupPreview = new PopupWithImage('.popup-preview');
popupPreview.setEventListeners();
const popupProfile = new PopupWithForm('.popup-edit', handleProfileFormSubmit);
popupProfile.setEventListeners();
const popupAddPic = new PopupWithForm('.popup-add', handleAddCardFormSubmit);
popupAddPic.setEventListeners();
const formEditFormValidator = new FormValidator({data: validationObj, validateElement: 'formProfile'})
formEditFormValidator.enableValidation();
const formAddFormValidator = new FormValidator({data: validationObj, validateElement : 'formAddPic'})
formAddFormValidator.enableValidation();

const userInfo = new UserInfo({
  name: '.profile__name',
  prof: '.profile__prof',
});

const sectionCards = new Section(
  {
    items: initialCards,
    renderer: createNewCard,
  },
  '.places__cards',
);
sectionCards.renderCards();

function createNewCard(data) {
  const card = new Card({
    data,
    cardSelector: '.card',
    cardTemplate,
    handleCardClick: cardPreviewOpen,
  })
  return card.cardElement;
}

function cardPreviewOpen({ src, description }) {
  popupPreview.open({ src, description });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const { popupName: name, popupProf: prof } = popupProfile.inputValues;
  userInfo.setUserInfo({ name, prof });
  popupProfile.close();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const { popupTitle: name, popupUrl: link } = popupAddPic.inputValues;
  sectionCards.addItem(createNewCard({ name, link }));
  popupAddPic.close();
}

btnEditProfile.addEventListener('click', function () {
  const { name, prof } = userInfo.getUserInfo()
  popupProfile.setInputValues({
    popupName: name,
    popupProf: prof,
  });
  formEditFormValidator.checkEventInputForm();
  popupProfile.open();
});

btnAddPicture.addEventListener('click', function () {
  formAddFormValidator.resetValidationForm();
  popupAddPic.open();
});

import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupCardDelete } from "../components/PopupCardDelete";
import { Api } from "../components/Api.js"
import { UserInfo } from "../components/UserInfo.js";
import {
  validationObj,
  avatarEditBtn,
  btnEditProfile,
  btnAddPicture,
  cardTemplate
} from '../utils/constants.js';

const sectionCards = new Section(createNewCard, '.places__cards');
const popupPreview = new PopupWithImage('.popup-preview');
const popupProfile = new PopupWithForm('.popup-edit', handleProfileFormSubmit);
const popupAddPic = new PopupWithForm('.popup-add', handleAddCardFormSubmit);
const popupDeletePic = new PopupCardDelete('.popup-delete', handleConfirmDeleteSubmit);
const popupAvatar = new PopupWithForm('.popup-avatar', handleAvatarFormSubmit);

const formEditFormValidator = new FormValidator({data: validationObj, validateElement: 'formProfile'})
formEditFormValidator.enableValidation();
const formAddFormValidator = new FormValidator({data: validationObj, validateElement : 'formAddPic'})
formAddFormValidator.enableValidation();
const formEditAvatar = new FormValidator({data: validationObj, validateElement : 'formAvatar'});
formEditAvatar.enableValidation();

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'b1358c2e-a18d-4d01-8b45-12870e20906b',
    'Content-Type': 'application/json',
  }
});

api.getUserInfo()
  .then((data) => {
    const { name, about, _id: id, avatar } = data;
    userInfo.setUserInfo({
      name,
      about,
      avatar,
      id
    });

    api.getInitialCards()
      .then(resData => {
        sectionCards.setItems(resData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((item) => {
            return {
              name: item.name,
              link: item.link,
              likeIds: item.likes.map(user => user._id),
              myId: id,
              ownerId: item.owner._id,
              cardId: item._id,
            };
          })
        );
        sectionCards.renderCards();
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__prof',
  avatar: '.profile__avatar',
});

function createNewCard(data) {
  const card = new Card({
    data,
    cardSelector: '.card',
    cardTemplate,
    handleCardClick: cardPreviewOpen,
    handleDeleteClick: _handlerCardDeleteClick,
    handleCardLike: cardLikeToggle,
  });
  return card.cardElement;
}

function _handlerCardDeleteClick({ cardId }, callback) {
  popupDeletePic.open();
  popupDeletePic.setEventListeners();
  popupDeletePic.setCardData(cardId, callback);
}

function cardLikeToggle(data, callback) {
  api.toggleLike(data)
    .then(newCardData => {
      callback(newCardData);
    })
    .catch(err => console.error(err))
}

function cardPreviewOpen({ src, description }) {
  popupPreview.open({ src, description });
  popupPreview.setEventListeners();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const { popupName: name, popupProf: about } = popupProfile.inputValues;
  popupProfile.setButtonText('Сохранение...');
  api.editUserInfo({
    ...userInfo.getUserInfo(),
    name,
    about,
  })
    .then(resData => {
      userInfo.setUserInfo(resData);
      popupProfile.close();
    })
    .catch(err => console.error(err))
    .finally(() => {
      popupProfile.setButtonText('Сохранить');
    })
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const { popupAvatar: avatar } = popupAvatar.inputValues;
  popupAvatar.setButtonText('Сохранение...');
  api.avatarUpdate(avatar)
    .then(resData => {
      userInfo.setUserInfo(resData);
      popupAvatar.close();
    })
    .catch(err => console.error(err))
    .finally(() => {
      popupAvatar.setButtonText('Сохранить');
    });
}

function handleConfirmDeleteSubmit(evt) {
  evt.preventDefault();
  const cardId = popupDeletePic.getCardId();
  popupDeletePic.setButtonText('Удаление...');
  api.cardDelete(cardId)
    .then(() => {
      popupDeletePic.callCardCallback();
      popupDeletePic.setCardData(null, () => {});
      popupDeletePic.close();
    })
    .catch(err => console.error(err))
    .finally(() => {
      popupDeletePic.setButtonText('Да');
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const { popupTitle: name, popupUrl: link } = popupAddPic.inputValues;
  popupAddPic.setButtonText('Сохранение...');
  api.postNewCard({ name, link })
    .then(item => {
      const cardData = {
        name: item.name,
        link: item.link,
        likeIds: item.likes.map(user => user._id),
        myId: userInfo.getUserId(),
        ownerId: item.owner._id,
        cardId: item._id,
      };
      sectionCards.addItem(createNewCard(cardData));
      popupAddPic.close();
    })
    .catch(err => console.error(err))
    .finally(() => {
      popupAddPic.setButtonText('Создать');
    })
}

btnEditProfile.addEventListener('click', function () {
  const { name, about } = userInfo.getUserInfo();
  popupProfile.setInputValues({
    popupName: name,
    popupProf: about,
  });
  formEditFormValidator.checkEventInputForm();
  popupProfile.open();
  popupProfile.setEventListeners();
});

btnAddPicture.addEventListener('click', function () {
  formAddFormValidator.resetValidationForm();
  popupAddPic.open();
  popupAddPic.setEventListeners();
});

avatarEditBtn.addEventListener('click', function () {
  popupAvatar.open();
  popupAvatar.setEventListeners();
});

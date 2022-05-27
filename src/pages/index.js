import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Api } from "../components/Api.js"
import { UserInfo } from "../components/UserInfo.js";
import {
  validationObj,
  avatarEditBtn,
  btnEditProfile,
  btnAddPicture,
  cardTemplate
} from '../utils/constants.js';

let sectionCards = new Section(createNewCard, '.places__cards');

const popupPreview = new PopupWithImage('.popup-preview');
popupPreview.setEventListeners();

const popupProfile = new PopupWithForm('.popup-edit', handleProfileFormSubmit);
popupProfile.setEventListeners();

const popupAddPic = new PopupWithForm('.popup-add', handleAddCardFormSubmit);
popupAddPic.setEventListeners();

const popupDeletePic = new PopupWithForm('.popup-delete', handleConfirmDeleteSubmit);
popupDeletePic.setEventListeners();

const popupAvatar = new PopupWithForm('.popup-avatar', handleAvatarFormSubmit);
popupAvatar.setEventListeners();

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

const cards = api.getInitialCards();
const userProfile = api.getUserInfo();
userProfile
  .then((data) => {
    const { name, about, _id: id, avatar } = data;
    userInfo.setUserInfo({
      name,
      about,
      avatar,
      id
    });

    cards
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
  });

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
  }, popupDeletePic, api);
  return card.cardElement;
}

function cardPreviewOpen({ src, description }) {
  popupPreview.open({ src, description });
}

function toggleSubmitLoadingText(btnElem) {
  btnElem.textContent = btnElem.textContent === 'Сохранение...'
    ? 'Сохранить'
    : 'Сохранение...';
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const { popupName: name, popupProf: about } = popupProfile.inputValues;
  const btn = popupProfile.getPopupSubmitElem();
  toggleSubmitLoadingText(btn);
  api.editUserInfo({
    ...userInfo.getUserInfo(),
    name,
    about,
  })
    .then(resData => {
      userInfo.setUserInfo(resData);
    })
    .catch(err => console.error(err))
    .finally(() => {
      toggleSubmitLoadingText(btn)
      popupProfile.close();
    })
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const { popupAvatar: avatar } = popupAvatar.inputValues;
  const btn = popupAvatar.getPopupSubmitElem();
  toggleSubmitLoadingText(btn);
  api.avatarUpdate(avatar)
    .then(resData => {
      userInfo.setUserInfo(resData);
    })
    .catch(err => console.error(err))
    .finally(() => {
      toggleSubmitLoadingText(btn)
      popupAvatar.close();
    });
}

function handleConfirmDeleteSubmit(evt) {
  evt.preventDefault();
  const { cardId } = popupDeletePic.inputValues
  const btn = popupDeletePic.getPopupSubmitElem();
  btn.textContent = 'Удаление...';
  api.cardDelete(cardId)
    .then(() => {
      sectionCards.deleteItem(cardId);
      sectionCards.renderCards();
      popupDeletePic.close();
    })
    .catch(err => console.error(err))
    .finally(() => {
      btn.textContent = 'Да';
      popupDeletePic.close();
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const { popupTitle: name, popupUrl: link } = popupAddPic.inputValues;
  const btn = popupAddPic.getPopupSubmitElem();
  toggleSubmitLoadingText(btn);
  api.postNewCard({ name, link })
    .then(item => {
      const cardData = {
        name: item.name,
        link: item.link,
        likeIds: item.likes.map(user => user._id),
        myId: userInfo.getUserInfo().id,
        ownerId: item.owner._id,
        cardId: item._id,
      };
      sectionCards.addItem(createNewCard(cardData), cardData);
    })
    .catch(err => console.error(err))
    .finally(() => {
      toggleSubmitLoadingText(btn)
      popupAddPic.close();
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
});

btnAddPicture.addEventListener('click', function () {
  formAddFormValidator.resetValidationForm();
  popupAddPic.open();
});

avatarEditBtn.addEventListener('click', function () {
  popupAvatar.open();
});

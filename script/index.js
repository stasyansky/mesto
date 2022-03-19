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

const btnEditProfile = document.querySelector('.profile__edit-btn');
const btnAddPicture = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__prof');
const popupList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPreview = document.querySelector('.popup-preview');

const formAddTitle = popupAdd.querySelector('.popup__item_type_title');
const formAddUrl = popupAdd.querySelector('.popup__item_type_url');
const popupCloseButtonList = document.querySelectorAll('.popup__close-btn');
const formEditProfile = popupEdit.querySelector('.popup__form_edit');
const formAddPicture = popupAdd.querySelector('.popup__form_add-pic');
const inputName = popupEdit.querySelector('.popup__item_type_name');
const inputProf = popupEdit.querySelector('.popup__item_type_prof');

const cardElementsList = document.querySelector('.places__cards');
const cardTemplate = document.querySelector('#card_template');
const popupPreviewPicture = popupPreview.querySelector('.popup-preview__img');
const popupPreviewPicDesc = popupPreview.querySelector('.popup-preview__text');

function createCardElement({ link, name }) {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  const pictureItem = card.querySelector('.card__pic');
  const textItem = card.querySelector('.card__text');
  pictureItem.src = link;
  pictureItem.alt = name;
  textItem.textContent = name;
  setListenersByCards(card);
  return card;
}

function renderCards(cardsToRender) {
  cardElementsList.innerHTML = '';
  cardsToRender.forEach((item) => {
    cardElementsList.append(createCardElement(item));
  });
}
renderCards(initialCards);

function togglePopup(currentPopup) {
  currentPopup.classList.toggle('popup_opened');
}

function editFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProf.textContent = inputProf.value;
  togglePopup(popupEdit);
}

function addFormSubmit (evt) {
  evt.preventDefault();
  const titleFormAdd = formAddTitle.value;
  const urlFormAdd = formAddUrl.value;
  const card = createCardElement({
    name: titleFormAdd,
    link: urlFormAdd,
  });
  cardElementsList.prepend(card);
  evt.currentTarget.reset();
  togglePopup(popupAdd);
}

btnEditProfile.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputProf.value = profileProf.textContent;
  togglePopup(popupEdit);
});

btnAddPicture.addEventListener('click', function () {
  togglePopup(popupAdd);
});

function deleteCard (event) {
  const card = event.target.closest('.card');
  card.remove();
}

function toggleLike (event) {
  event.target.classList.toggle('card__like_active');
}

function openPreview(event) {
  const src = event.target.getAttribute('src');
  const description = event.target.getAttribute('alt');
  popupPreviewPicture.setAttribute('src', src);
  popupPreviewPicture.setAttribute('alt', description);
  popupPreviewPicDesc.textContent = description;
  togglePopup(popupPreview);
}

function setListenersByCards(card) {
  card
    .querySelector('.card__delete')
    .addEventListener('click', deleteCard);
  card
    .querySelector('.card__like')
    .addEventListener('click', toggleLike);
  card
    .querySelector('.card__pic')
    .addEventListener('click', openPreview);
}

popupList.forEach((item) => {
  item.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      togglePopup(item);
    }
  });
});
popupCloseButtonList.forEach((item) => {
  item.addEventListener('click', () => {
    const popup = item.parentElement.parentElement;
    togglePopup(popup);
  });
});
formEditProfile.addEventListener('submit', editFormSubmit);
formAddPicture.addEventListener('submit', addFormSubmit);

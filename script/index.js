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

const formEdit = document.forms.formProfile;
const inputName = formEdit.elements.popupName;
const inputProf = formEdit.elements.popupProf;

const formAdd = document.forms.formAddPic;
const inputTitle = formAdd.elements.popupTitle;
const inputUrl = formAdd.elements.popupUrl;

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

function openPopup(currentPopup) {
  currentPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}
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
  const card = createCardElement({
    name: titleFormAdd,
    link: urlFormAdd,
  });
  cardElementsList.prepend(card);
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
  openPopup(popupAdd);
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
  openPopup(popupPreview);
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

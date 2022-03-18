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

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPreview = document.querySelector('.popup-preview');

const listCloseBtnPopup = document.querySelectorAll('.popup__close-btn');
const formEditProfile = popupEdit.querySelector('.popup__form_edit');
const formAddPicture = popupAdd.querySelector('.popup__form_add-pic');
const inputName = popupEdit.querySelector('.popup__item_type_name');
const inputProf = popupEdit.querySelector('.popup__item_type_prof');

let currentPopupClass = '';
const cardElementsList = document.querySelector('.places__cards');
const cardTemplate = document.querySelector('#card_template');

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

function togglePopup() {
  const togglePopupClass = (element) => {
    if (element) {
      element.classList.toggle('popup_opened');
    }
  };
  const popupElementsByClass = {
    'popup-edit': popupEdit,
    'popup-add': popupAdd,
    'popup-preview': popupPreview,
  };
  togglePopupClass(popupElementsByClass[currentPopupClass]);
}

function editFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProf.textContent = inputProf.value;
  togglePopup();
}

function addFormSubmit (evt) {
  evt.preventDefault();
  const titleFormAdd = evt.currentTarget.querySelector('.popup__item_type_title').value;
  const urlFormAdd = evt.currentTarget.querySelector('.popup__item_type_url').value;
  const card = createCardElement({
    name: titleFormAdd,
    link: urlFormAdd,
  });
  cardElementsList.prepend(card);
  evt.currentTarget.reset();
  togglePopup();
}

btnEditProfile.addEventListener('click', function () {
  currentPopupClass = 'popup-edit';
  togglePopup();
  inputName.value = profileName.textContent;
  inputProf.value = profileProf.textContent;
});

btnAddPicture.addEventListener('click', function () {
  currentPopupClass = 'popup-add';
  togglePopup();
});

function deleteCard (event) {
  const card = event.target.closest('.card');
  card.remove();
}

function toggleLike (event) {
  event.target.classList.toggle('card__like_active');
}

function openPreview(event) {
  const src = event.currentTarget.getAttribute('src');
  const description = event.currentTarget.getAttribute('alt')
  popupPreview.querySelector('.popup-preview__img').setAttribute('src', src);
  popupPreview.querySelector('.popup-preview__img').setAttribute('alt', description);
  popupPreview.querySelector('.popup-preview__text').textContent = description;
  currentPopupClass = 'popup-preview';
  togglePopup();
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

popupEdit.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});
popupAdd.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});
popupPreview.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});
listCloseBtnPopup.forEach((item) => {
  item.addEventListener('click', togglePopup);
});
formEditProfile.addEventListener('submit', editFormSubmit);
formAddPicture.addEventListener('submit', addFormSubmit);

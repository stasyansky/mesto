let initialCards = [
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
const popup = document.querySelector('.popup');
const popupPreview = document.querySelector('.popup-preview');
const btnClosePopup = popup.querySelector('.popup__close-btn');
const btnClosePopupPreview = popupPreview.querySelector('.popup-preview__close-btn');
const formEditProfile = popup.querySelector('.popup__form_edit');
const formAddPicture = popup.querySelector('.popup__form_add-pic');
let inputName = popup.querySelector('.popup__item_type_name');
let inputProf = popup.querySelector('.popup__item_type_prof');

const cardElementsList = document.querySelector('.places__cards'); //<ul>...</ul>

function createCardElement({ link, name }) {
  const cardTemplate = document
    .querySelector('#card_template')
    .content.firstElementChild.cloneNode(true); //<li>...</li>
  const pictureItem = cardTemplate.querySelector('.card__pic');
  const textItem = cardTemplate.querySelector('.card__text');
  pictureItem.src = link;
  pictureItem.alt = name;
  textItem.textContent = name;
  setListeners(cardTemplate);
  return cardTemplate;
}

function renderCards(cardsToRender) {
  cardElementsList.innerHTML = '';
  cardsToRender.forEach((item) => {
    cardElementsList.append(createCardElement(item));
  });
}
renderCards(initialCards);

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function togglePopupPreview() {
  popupPreview.classList.toggle('popup-preview_opened');
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
    togglePopup();
    formEditProfile.style.display = 'flex';
    formAddPicture.style.display = 'none';
    inputName.value = profileName.textContent;
    inputProf.value = profileProf.textContent;
});

btnAddPicture.addEventListener('click', function () {
  togglePopup();
  formAddPicture.style.display = 'flex';
  formEditProfile.style.display = 'none';
});

function deleteCard (event) {
  const card = event.target.closest('.card');
  card.remove();
}

function toggleLike (event) {
  const card = event.target.closest('.card');
  const heart = card.querySelector('.card__like');
  heart.classList.toggle('card__like_active');
}
function openPreview(event) {
  const src = event.currentTarget.getAttribute('src');
  const description = event.currentTarget.getAttribute('alt')
  popupPreview.querySelector('.popup-preview__img').setAttribute('src', src);
  popupPreview.querySelector('.popup-preview__img').setAttribute('alt', description);
  popupPreview.querySelector('.popup-preview__text').textContent = description;
  togglePopupPreview();
}

function setListeners(card) {
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

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

popupPreview.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopupPreview();
  }
});

btnClosePopup.addEventListener('click', togglePopup);
btnClosePopupPreview.addEventListener('click', togglePopupPreview);
formEditProfile.addEventListener('submit', editFormSubmit);
formAddPicture.addEventListener('submit', addFormSubmit);

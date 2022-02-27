const editProfile = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__prof');
const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close-btn');
let formEditProfile = popup.querySelector('.popup__form');
let inputName = popup.querySelector('.popup__item_type-name');
let inputProf = popup.querySelector('.popup__item_type-prof');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

editProfile.addEventListener('click', function () {
    togglePopup();
    inputName.value = profileName.textContent;
    inputProf.value = profileProf.textContent;
});

closePopup.addEventListener('click', togglePopup);
popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProf.textContent = inputProf.value;
  togglePopup();
}
formEditProfile.addEventListener('submit', formSubmitHandler);

const popup = document.querySelector('.popup');
const editProfile = document.querySelector('.profile__edit-btn')
const openPopup = document.querySelector('.popup_opened');
const closePopup = document.querySelector('.popup__close-btn');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}
editProfile.addEventListener('click', function (event) {
    togglePopup();
})
closePopup.addEventListener('click', function (event) {
     togglePopup();
 })

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
})

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);

export class Card {
  constructor ({
   data,
   cardSelector,
   cardTemplate,
   popupPreviewElements,
   openPopupFn,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._cardTemplate = cardTemplate;
    this._popupPreviewElements = popupPreviewElements;
    this._openPopupFn = openPopupFn;
  }

  _getTemplate() {
    return this._cardTemplate
      .content
      .querySelector(this._cardSelector)
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__pic').src = this._link;
    this._element.querySelector('.card__pic').alt = this._name;
    this._element.querySelector('.card__text').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._handleOpenPreviewClick();
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleOpenPreviewClick() {
    const src = this._element.querySelector('.card__pic').getAttribute('src');
    const description = this._element.querySelector('.card__pic').getAttribute('alt');
    this._popupPreviewElements.picture.setAttribute('src', src);
    this._popupPreviewElements.picture.setAttribute('alt', description);
    this._popupPreviewElements.desc.textContent = description;
    this._openPopupFn(this._popupPreviewElements.preview);
  }
}

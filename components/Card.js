export class Card {
  constructor ({
   data,
   cardSelector,
   cardTemplate,
   cardPreviewFn,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._cardTemplate = cardTemplate;
    this._cardPreviewFn = cardPreviewFn;
    this._generateCard();
  }

  get cardElement() {
    return this._element;
  }

  _getTemplate() {
    return this._cardTemplate
      .content
      .querySelector(this._cardSelector)
      .cloneNode(true);
  }

  _generateCard() {
    this._element = this._getTemplate();
    this._elementPic = this._element.querySelector('.card__pic');
    this._elementText = this._element.querySelector('.card__text');
    this._elementLike = this._element.querySelector('.card__like');
    this._elementDelete = this._element.querySelector('.card__delete');
    this._elementPic.src = this._link;
    this._elementPic.alt = this._name;
    this._elementText.textContent = this._name;
    this._setEventListeners();
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._elementDelete.addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._elementPic.addEventListener('click', () => {
      this._handleOpenPreviewClick();
    });
  }

  _handleLikeClick() {
    this._elementLike.classList.toggle('card__like_active');
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _handleOpenPreviewClick() {
    this._cardPreviewFn({
      src: this._elementPic.getAttribute('src'),
      description: this._elementPic.getAttribute('alt'),
    });
  }
}

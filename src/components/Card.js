export class Card {
  constructor ({
   data,
   cardSelector,
   cardTemplate,
   handleCardClick,
  }, popupDeletePic, api) {
    this._api = api;
    this._popupDeletePic = popupDeletePic;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data.cardId;
    this._ownerId = data.ownerId;
    this._myId = data.myId;
    this._likeIds = data.likeIds;
    this._isLikedByMe = data.likeIds.includes(this._myId);
    this._cardSelector = cardSelector;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
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

  _updateDynamicElements() {
    this._elementLikeCount.textContent = this._likeIds.length;
    if (this._isLikedByMe) {
      this._elementLike.classList.add('card__like_active');
    }
  }

  _generateCard() {
    this._element = this._getTemplate();
    this._elementPic = this._element.querySelector('.card__pic');
    this._elementText = this._element.querySelector('.card__text');
    this._elementLike = this._element.querySelector('.card__like');
    this._elementLikeCount = this._element.querySelector('.card__count');
    this._elementDelete = this._element.querySelector('.card__delete');
    if (this._ownerId !== this._myId) {
      this._elementDelete.remove();
      this._elementDelete = undefined;
    }
    this._elementPic.src = this._link;
    this._elementPic.alt = this._name;
    this._elementText.textContent = this._name;
    this._updateDynamicElements();
    this._setEventListeners();
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
    if (this._elementDelete) {
      this._elementDelete.addEventListener('click', () => {
        this._handleDeleteClick();
      });
    }
    this._elementPic.addEventListener('click', () => {
      this._handleOpenPreviewClick();
    });
  }

  _handleLikeClick() {
    this._api.toggleLike({
      cardId: this._cardId,
      isLikedByMe: this._isLikedByMe,
    })
      .then(newCardData => {
        this._likeIds = newCardData.likes.map(user => user._id);
        this._isLikedByMe = !this._isLikedByMe;
        this._updateDynamicElements();
      })
      .catch(err => console.error(err))
    this._elementLike.classList.toggle('card__like_active');
  }

  _handleDeleteClick() {
    this._popupDeletePic.open();
    this._popupDeletePic.setInputValues({
      cardId: this._cardId,
    });
  }

  _handleOpenPreviewClick() {
    this._handleCardClick({
      src: this._link,
      description: this._name,
    });
  }
}

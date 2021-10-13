class Card {
  constructor(data, selector, handleCardClick, handleDeleteClick, handelPutLike, handleDeleteLike) {
    this._name = data.name;
    this._link = data.link;
    this._likesCount = data.likes.length;
    this._ownerId = data.owner._id;//создатель карточки
    this._userId = "d2d69bded002411fb31b68fe"//мой id
    this._cardId = data._id;
    this._selector = selector;
    this._template = document.querySelector(this._selector).content;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handlePutLike = handelPutLike;
    this._handleDeleteLike = handleDeleteLike;
  }
  
  _cloneCard() {
    const cardElement = this._template.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListener(cardElement) {
    this._buttonLike = cardElement.querySelector(".element__like");
    this._buttonLike.addEventListener("click", () => {
      if (this._buttonLike.classList.contains('element__like_active')) {
        this._likeDelete();
        this._handleDeleteLike(this._cardId, this._element);
      } else {
        this._likeActivation();
        this._handlePutLike(this._cardId, this._element);
      }
    });
    
    this._buttonDelete = cardElement.querySelector(".element__delete");
    this._checkIdOwner(this._buttonDelete);
    this._buttonDelete.addEventListener("click", () => this._handleDeleteClick(this._cardId));

    this._image = cardElement.querySelector(".element__image");
    this._image.addEventListener("click", () => this._handleCardClick());
    
    return cardElement;
  }

  _likeActivation() {
    this._buttonLike.classList.add("element__like_active");
  }

  _likeDelete() {
    this._buttonLike.classList.remove("element__like_active");
  }

  deleteCard() {
    this._element.remove();
  }

  _getCard() {
    return this._setEventListener(this._cloneCard());
  }

  _checkIdOwner(buttonDelete) {
    if (this._userId !==  this._ownerId) {
      buttonDelete.remove();
    }
  }
  
  generateCard() {
    this._element = this._getCard();

    this._element .querySelector('.element__title').textContent = this._name;
    this._element .querySelector('.element__image').src = this._link;
    this._element .querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__likes-count').textContent = this._likesCount;
    return this._element; 
  }
}

export {Card};
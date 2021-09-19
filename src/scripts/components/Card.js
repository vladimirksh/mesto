class Card {
  constructor(data, selector, handleCardClick, handleDeleteClick, api) {
    this._name = data.name;
    this._link = data.link;
    this._userID = data.userId;
    this._likesArray = data.likes.length;
    this._IDOwner = data.owner._id
    this._ID = data._id;
    this.likeID = data.likes;
    this._api = api;
    this._selector = selector;
    this._template = document.querySelector(this._selector).content;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }
  
  _cloneCard() {
    const cardElement = this._template.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListener(cardElement) {
    this._buttonLike = cardElement.querySelector(".element__like");
    this._likeCount = cardElement.querySelector(".element__likes-count");
    this._likeCount.textContent = this._likesArray;

    this._buttonLike.addEventListener('click', () => {
      if (this._buttonLike.classList.contains('element__like_active')) {
        this._likeActivation();
        this._deleteLikeClick();
      } else {
        this._likeActivation();
        this._putLikeClick();
      }
    });

    this._buttonDelete = cardElement.querySelector(".element__delete");
    this._buttonDelete.addEventListener("click", () => this._handleDeleteClick(this._ID));




    this._image = cardElement.querySelector(".element__image");
    this._image.addEventListener("click", () => this._handleCardClick());

    return cardElement;
  }

  _likeActivation() {
    this._buttonLike.classList.toggle("element__like_active");
  }

  _putLikeClick() {
    this._api.putLike(this._ID)
      .then((res) => {
        this._likeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  _deleteLikeClick() {
    this._api.deleteLike(this._ID)
      .then((res) => {
        this._likeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  _checkLikeOwner() {
    return Boolean(this.likeID.find((obj => obj._id == this._userID)));
  }

  _checkMyLike(like) {
    if (like) {
      this._likeActivation();
    }
  }

  deleteCard() {
    this._element.remove();
  }

  _getCard() {
    return this._setEventListener(this._cloneCard());
  }

  generateCard() {
    this._element = this._getCard();

    this._element .querySelector('.element__title').textContent = this._name;  
    this._element .querySelector('.element__image').src = this._link;  
    this._element .querySelector('.element__image').alt = this._name; 

    return this._element; 
  }
}

export {Card};
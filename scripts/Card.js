import {popupImage, popupText, popupZoom} from './constants.js';
import {openPopup} from './functions.js';


class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._template = document.querySelector(this._selector).content;
  }
  
  _cloneCard() {
    const cardElement = this._template.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListener(cardElement) {
    this._buttonLike = cardElement.querySelector(".element__like");
    this._buttonLike.addEventListener("click", () => this._likeActivation());

    this._buttonDelete = cardElement.querySelector(".element__delete");
    this._buttonDelete.addEventListener("click", () => this._deleteCard());

    this._image = cardElement.querySelector(".element__image");
    this._image.addEventListener("click", () => this._zoomPopupImg());

    return cardElement;
  }

  _likeActivation() {
    this._buttonLike.classList.toggle("element__like_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  _zoomPopupImg() {
    popupImage.setAttribute("src", this._link); //ссылка для картинки
    popupImage.setAttribute("alt", this._name); //alt для картинки
    popupText.textContent = this._name; //подпись снизу для картинки
    openPopup(popupZoom);
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
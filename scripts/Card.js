import {popupImage, popupText, popupZoom} from './constants.js';
import {openPopup} from './functions.js';


class Card {
  constructor(name, link, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._template = document.querySelector(this._selector).content;

  }
  
  _cloneCard() {
    const cardElement = this._template.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListener(cardElement) {
    // событие: лайк
    const buttonLike = cardElement.querySelector('.element__like');
    buttonLike.addEventListener('click',function (evt) {
      evt.target.classList.toggle('element__like_active');
      });
    //событие: удаление карточки
    const buttonDelete = cardElement.querySelector('.element__delete');
    buttonDelete.addEventListener('mousedown', function () {
    buttonDelete.parentElement.remove();
    });
    //событие: открытие картинки с подписью
    cardElement.querySelector('.element__image').addEventListener('click', () => {
      popupImage.setAttribute('src', cardElement.querySelector('.element__image').src);//ссылка для картинки
      popupImage.setAttribute('alt',cardElement.querySelector('.element__title').textContent);//alt для картинки
      popupText.textContent = cardElement.querySelector('.element__title').textContent;//подпись снизу для картинки
      openPopup(popupZoom);
      });
      return cardElement;
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
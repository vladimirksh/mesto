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
    this._likeActivation(cardElement); 
    this._deleteCard(cardElement); 
    this._zoomPopupImg(cardElement); 
    return cardElement;
  }

  _likeActivation(cardElement) { 
    const buttonLike = cardElement.querySelector('.element__like'); 
    buttonLike.addEventListener('click',function (evt) { 
      evt.target.classList.toggle('element__like_active'); 
      }); 
  } 
 
  _deleteCard(cardElement) { 
    const buttonDelete = cardElement.querySelector('.element__delete'); 
    buttonDelete.addEventListener('mousedown', function () { 
    buttonDelete.parentElement.remove();
    //cardElement.remove(); 
    }); 
  } 
 
  _zoomPopupImg(cardElement) { 
    cardElement.querySelector('.element__image').addEventListener('click', () => { 
    popupImage.setAttribute('src', cardElement.querySelector('.element__image').src);//ссылка для картинки 
    popupImage.setAttribute('alt',cardElement.querySelector('.element__title').textContent);//alt для картинки 
    popupText.textContent = cardElement.querySelector('.element__title').textContent;//подпись снизу для картинки 
    openPopup(popupZoom); 
    }) 
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
const template = document.querySelector('#template').content;//выбраем заготовку по id и запрашиваем внутренности
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');
const popupZoom = document.querySelector('.popup_zoom-image');
const popupCloseZoom = document.querySelector('.popup__close-zoom');



// Функция которая добавляет и удалет класс
function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', checkedKey);
};

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', checkedKey);
};

popupCloseZoom.addEventListener('click', () => closePopup(popupZoom));

//Функция закрытия попапа для Esc
const formsClose = () => {
  popupList.forEach((popupForm) => {
  closePopup(popupForm);
});
};
//Функция проверки на нажатие Esc
const checkedKey = (evt) => {
  const key = evt.key; 
  if (key === "Escape") {
    formsClose();
  };
};

const popupList = Array.from(document.querySelectorAll('.popup'));//Получаю все popup
popupList.forEach((popupForm) => {
  popupForm.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__background') || evt.target.classList.contains('popup__close')) { 
      closePopup(popupForm);
    };
  });
});

class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }
  
  _getCard() {
    const cardElement = template.querySelector('.element').cloneNode(true);
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

  generateCard() {
    this._element = this._getCard();

    this._element .querySelector('.element__title').textContent = this._name;
    this._element .querySelector('.element__image').src = this._link;
    this._element .querySelector('.element__image').alt = this._name;

    return this._element; 
  }
}

export {Card, template, popupImage, popupText, openPopup, closePopup};
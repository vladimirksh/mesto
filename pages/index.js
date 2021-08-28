import {Card} from '../scripts/components/Card.js';
import {initialCards} from '../scripts/utils/cards.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {validationConfig, popupZoom} from '../scripts/utils/constants.js';
import {openPopup, closePopup,} from '../scripts/utils/functions.js';

import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
//место куда копируем новые карточки
const cardsContainer = document.querySelector('.cards-container');

// Popup для новых постов
const popupAddButtonOpen = document.querySelector('.profile__addbutton'); //Выбираем кнопку вызывающую попап
const popupAddCard = document.querySelector('.popup_add-card'); // Выбираем сам попап для использования этой константы в функции
const popupAddButtonClose = document.querySelector('.popup__close_add-card'); //Выбираем крест для закрытия попапа

// Открываем попап для добавления нового поста
popupAddButtonOpen.addEventListener('click', () => openPopup(popupAddCard));
//popupAddButtonClose.addEventListener('click', () => closePopup(popupAddCard));



/*Создание новой карточки */
const formElementAddcard = document.querySelector('.popup__body_add-card');// Находим форму в DOM для добавления нового поста
formElementAddcard.addEventListener('submit', formSubmitNewCard);// Прикрепляем обработчик к форме:он будет следить за событием “submit”
//Функция создания нового поста из поаппа
function formSubmitNewCard (evt) {
  evt.preventDefault();
  const valueNewCard = [{
    name: document.querySelector('.popup__input_type_place').value,
    link: document.querySelector('.popup__input_type_image').value,
  }];
  const newCard = new Section({items: valueNewCard, 
    renderer: (itemCard) => {
      const card = new Card(itemCard, '#template', () => {popupPreview.open(itemCard)});
      const cardElement = card.generateCard();//возвращает готовую карточку
      newCard.addItem(cardElement);//вставляем готовую карточку в DOM
    }
    }, cardsContainer);
    newCard.renderItems();

  formElementAddcard.reset();
  cardValidator.toggleButtonState();
  closePopup(popupAddCard);
};
/*Создание новой карточки */


//Popup для редактирования имени и о себе
const popupButtonOpen = document.querySelector('.profile__editbutton'); //Выбираем кнопку редактирования профиля
const popupChangeName = document.querySelector('.popup-change'); // Выбираем сам попап для использования этой константы в функции
const popupButtonClose = document.querySelector('.popup__close-change'); //Выбираем крест для закрытия попапа

function openChangePopup () {
  openPopup(popupChangeName);
  infoName();
  };

// Открываем попап
popupButtonOpen.addEventListener('click', openChangePopup);
popupButtonClose.addEventListener('click', () => closePopup(popupChangeName));
// Находим форму в DOM

const nameInput = document.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_about');// Воспользуйтесь инструментом .querySelector()
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

function infoName() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
};
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupChangeName);
};

const formChangeName = document.querySelector('.popup__body');// Воспользуйтесь методом querySelector()
formChangeName.addEventListener('submit', formSubmitHandler);





/*Отрисовываем 6 карточек  из массива при помощи слабого связывание между классами */
const popupPreview = new PopupWithImage(popupZoom);//эта константа используется в функции для создания новой карты
const cardList = new Section({items: initialCards, 
renderer: (itemCard) => {
  const card = new Card(itemCard, '#template',() => {popupPreview.open(itemCard)});
  const cardElement = card.generateCard();//возвращает готовую карточку
  cardList.addItem(cardElement);//вставляем готовую карточку в DOM
}
}, cardsContainer);
cardList.renderItems();
/*Отрисовываем 6 карточек  из массива при помощи слабого связывание между классами */




/*Для каждой формы устанавливаем свою валидацию*/
const cardForm = document.querySelector('.popup_add-card');
const profileForm = document.querySelector('.popup-change');

const cardValidator= new FormValidator(validationConfig, cardForm);
cardValidator.enableValidation();

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();
/*Для каждой формы устанавливаем свою валидацию*/
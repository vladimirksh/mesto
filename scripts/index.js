import {Card} from './Card.js';
import {initialCards} from './cards.js';
import {FormValidator} from './FormValidator.js';
import {validationConfig, popupCloseZoom} from './constants.js';
import {openPopup, closePopup} from './functions.js';


const cardsContainer = document.querySelector('.cards-container');//место куда копируем новые карточки

// Popup для новых постов
const popupAddButtonOpen = document.querySelector('.profile__addbutton'); //Выбираем кнопку вызывающую попап
const popupAddCard = document.querySelector('.popup_add-card'); // Выбираем сам попап для использования этой константы в функции
const popupAddButtonClose = document.querySelector('.popup__close_add-card'); //Выбираем крест для закрытия попапа
// Находим форму в DOM для добавления нового поста
const formElementAddcard = document.querySelector('.popup__body_add-card');

const popupButtonOpen = document.querySelector('.profile__editbutton'); //Выбираем кнопку редактирования профиля
const popupChangeName = document.querySelector('.popup-change'); // Выбираем сам попап для использования этой константы в функции
const popupButtonClose = document.querySelector('.popup__close-change'); //Выбираем крест для закрытия попапа
const popupButtonSave = document.querySelector('.popup__save');//Выбираем кнопку Сохранить

// Открываем попап для добавления нового поста
popupAddButtonOpen.addEventListener('click', () => openPopup(popupAddCard));
popupAddButtonClose.addEventListener('click', () => closePopup(popupAddCard));

//Функция добавления карточки в начало потока карт
function flowCards (container, newCard){
  container.prepend(newCard);
};

// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»
formElementAddcard.addEventListener('submit', formSubmitNewCard);
//Функция создания нового поста из поаппа
function formSubmitNewCard (evt) {
  evt.preventDefault();
  const valueNewCard = {
    name: document.querySelector('.popup__input_type_place').value,
    link: document.querySelector('.popup__input_type_image').value,
  };
  const buttonElement = document.querySelector('.popup__save_add-card');

  const newCard = new Card(valueNewCard, '#template');
  const newCardElement = newCard.generateCard();
  flowCards(cardsContainer, newCardElement);

  formElementAddcard.reset();
  cardValidator.toggleButtonState();
  closePopup(popupAddCard);
};

function infoName() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
};


function openChangePopup () {
  openPopup(popupChangeName);
  infoName();
  };

// Открываем попап
popupButtonOpen.addEventListener('click', openChangePopup);
popupButtonClose.addEventListener('click', () => closePopup(popupChangeName));
// Находим форму в DOM
const formChangeName = document.querySelector('.popup__body');// Воспользуйтесь методом querySelector()
const nameInput = document.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_about');// Воспользуйтесь инструментом .querySelector()
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupChangeName);
};

formChangeName.addEventListener('submit', formSubmitHandler);

initialCards.forEach ((item) => {
  const card = new Card(item, '#template');
  const cardElement = card.generateCard();
  flowCards(cardsContainer, cardElement);
});

popupCloseZoom.addEventListener('click', () => closePopup(popupZoom));


const cardForm = document.querySelector('.popup_add-card');
const profileForm = document.querySelector('.popup-change');

const cardValidator= new FormValidator(validationConfig, cardForm);
cardValidator.enableValidation();

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation(); 

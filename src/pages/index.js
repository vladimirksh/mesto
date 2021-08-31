import {Card} from '../scripts/components/Card.js';
import {initialCards} from '../scripts/utils/cards.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {validationConfig, 
        popupZoom, 
        popupAddButtonOpen, 
        popupAddCard,
        cardsContainer,
        buttonOpenChangeName,
        popupChangeName,
        nameInput,
        jobInput,
        profileName,
        profileAbout,
        cardForm,
        profileForm
      } from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

import './index.css'; // добавьте импорт главного файла стилей 


/* Popup для новых постов*/
/*Создание новой карточки */
const createNewCard = new PopupWithForm({
  selectorPopup: popupAddCard,
  handleFormSubmit: () => {
    const valuesInput = {
      link:document.querySelector('.popup__input_type_image').value,
      name: document.querySelector('.popup__input_type_place').value
    };
    // при создании экземпляра  передаём ему объект с данными формы
        const card = new Card(valuesInput, '#template', () => {popupPreview.open(valuesInput)});
        const cardElement = card.generateCard();//возвращает готовую карточку
        cardList.addItem(cardElement);//вставляем готовую карточку в DOM
        createNewCard.close();
      }
      });
// Открываем попап для добавления нового поста
popupAddButtonOpen.addEventListener('click', () => {
  createNewCard.open();
  cardValidator.cleanInputError();
});
createNewCard.setEventListeners();

/* Popup для новых постов*/

/*Popup для редактирования имени и о себе*/
const popupFormProfile = new PopupWithForm({ 
  selectorPopup: popupChangeName, 
  handleFormSubmit: (data) => { 
    userInfo.setUserInfo(data);
    popupFormProfile.close();
  } 
}) 
popupFormProfile.setEventListeners(); 
 
const userInfo = new UserInfo({ 
  userName: profileName, 
  userJob: profileAbout 
}); 
//открываем попап 
buttonOpenChangeName.addEventListener('click', () => { 
  nameInput.value = userInfo.getUserInfo().userName; 
  jobInput.value = userInfo.getUserInfo().userJob; 
  popupFormProfile.open();
  profileValidator.cleanInputError();

}); 
/*Popup для редактирования имени и о себе*/

/*Отрисовываем 6 карточек  из массива при помощи слабого связывание между классами */
const popupPreview = new PopupWithImage(popupZoom);
const cardList = new Section({items: initialCards, 
renderer: (itemCard) => {
  const card = new Card(itemCard, '#template',() => {popupPreview.open(itemCard)});
  const cardElement = card.generateCard();//возвращает готовую карточку
  cardList.addItem(cardElement);//вставляем готовую карточку в DOM
}
}, cardsContainer);
cardList.renderItems();
popupPreview.setEventListeners();
/*Отрисовываем 6 карточек  из массива при помощи слабого связывание между классами */

/*Для каждой формы устанавливаем свою валидацию*/
const cardValidator= new FormValidator(validationConfig, cardForm);
cardValidator.enableValidation();

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();
/*Для каждой формы устанавливаем свою валидацию*/
import {Card} from '../scripts/components/Card.js';
import {initialCards} from '../scripts/utils/cards.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {validationConfig, 
        popupZoom, 
        popupAddButtonOpen, 
        popupAddCard,
        cardsContainer,
        popupButtonOpen,
        popupChangeName,
        nameInput,
        jobInput,
        profileName,
        profileAbout
      } from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

/* Popup для новых постов*/
/*Создание новой карточки */
const form = new PopupWithForm({
  selectorPopup: popupAddCard,
  handleFormSubmit: (formData) => {
       form.close();
    // при создании экземпляра  передаём ему объект с данными формы
        const card = new Card(formData, '#template', () => {popupPreview.open(formData)});
        const cardElement = card.generateCard();//возвращает готовую карточку
        cardList.addItem(cardElement);//вставляем готовую карточку в DOM
        cardValidator.toggleButtonState();
        form.close();
      }
      });
// Открываем попап для добавления нового поста
popupAddButtonOpen.addEventListener('click', () => form.open());
form.setEventListeners();
/* Popup для новых постов*/

/*Popup для редактирования имени и о себе*/
const popupFormProfile = new PopupWithForm({
  selectorPopup: popupChangeName,
  handleFormSubmit: (data) => {
    console.log(userInfo.setUserInfo(data));
    profileValidator.toggleButtonState();
    popupFormProfile.close();
  }
})

popupFormProfile.setEventListeners();

const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileAbout
});
//открываем попап
popupButtonOpen.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().userName;
  jobInput.value = userInfo.getUserInfo().userJob;
  popupFormProfile.open();
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
/*Отрисовываем 6 карточек  из массива при помощи слабого связывание между классами */

/*Для каждой формы устанавливаем свою валидацию*/
const cardForm = document.querySelector('.popup_add-card');
const profileForm = document.querySelector('.popup-change');

const cardValidator= new FormValidator(validationConfig, cardForm);
cardValidator.enableValidation();

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();
/*Для каждой формы устанавливаем свою валидацию*/
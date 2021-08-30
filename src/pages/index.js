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

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const addButtonBig = new URL('../images/AddButton-big.svg', import.meta.url);
const addButton = new URL('../images/AddButton.svg', import.meta.url);
const Delete = new URL('../images/delete.svg', import.meta.url);
const EditButtonMin = new URL('../images/EditButton_min.svg', import.meta.url);
const EditButton = new URL('../images/EditButton.svg', import.meta.url);
const Jhak = new URL('../images/image.jpg', import.meta.url);
const LikeActive = new URL('../images/like_active.svg', import.meta.url);
const Like = new URL('../images/like.svg', import.meta.url);
const Logo = new URL('../images/logo.svg', import.meta.url);
const PopupCloseBig = new URL('../images/popupClose-big.svg', import.meta.url);
const PopupCloseMin = new URL('../images/popupClose-min.svg', import.meta.url);

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'ButtonBigAdd', image: addButtonBig },
  { name: 'ButtonAdd', link: addButton },
  { name: 'ButtonDelete', link: Delete },
  { name: 'ButtonEditMin', image: EditButtonMin },
  { name: 'ButtonEdit', link: EditButton },
  { name: 'FotoJhak', link: Jhak },
  { name: 'ButtonLikeActive', image: LikeActive },
  { name: 'ButtonLike', link: Like },
  { name: 'ImageLogo', link: Logo },
  { name: 'ButtonPopupCloseBig', image: PopupCloseBig },
  { name: 'ButtonPopupCloseMin', link: PopupCloseMin },
]; 

import './index.css'; // добавьте импорт главного файла стилей 


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
popupPreview.setEventListeners();
/*Отрисовываем 6 карточек  из массива при помощи слабого связывание между классами */

/*Для каждой формы устанавливаем свою валидацию*/
const cardForm = document.querySelector('.popup_add-card');
const profileForm = document.querySelector('.popup-change');

const cardValidator= new FormValidator(validationConfig, cardForm);
cardValidator.enableValidation();

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();
/*Для каждой формы устанавливаем свою валидацию*/
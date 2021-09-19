import {Card} from '../scripts/components/Card.js';
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
        profileForm,
        avatarForm,
        popupChengeButtonAvatar,
        popuoDeleteCard,
        avatarImage
      } from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

import './index.css'; // добавьте импорт главного файла стилей 

//Запрос к серверу инфо о карточках
fetch('https://mesto.nomoreparties.co/v1/cohort-27/cards', {
  headers: {
    authorization: 'ca88055d-8e98-4fcc-94cf-8a7d7aaca5a8'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
//Запрос к серверу инфо о карточках

//Запрос к серверу инфо о себе
fetch('https://mesto.nomoreparties.co/v1/cohort-27/users/me', {
  headers: {
    authorization: 'ca88055d-8e98-4fcc-94cf-8a7d7aaca5a8'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
//Запрос к серверу инфо о себе

//подключаюсь к api при каждом действии(отрисовка, удаление)
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: 'ca88055d-8e98-4fcc-94cf-8a7d7aaca5a8',
    'Content-Type': 'application/json'
  }
});
//подключаюсь к api при каждом действии(отрисовка, удаление)

/*Popup для редактирования имени и о себе*/
//обращаюсь к серверу через GET получаю name about и вставляю в html
api.getUserData()
  .then((result) => {
    userInfo.setUserInfo(result)
})
//обращаюсь к серверу через GET получаю name about и вставляю в html
const popupFormProfile = new PopupWithForm({ 
  selectorPopup: popupChangeName, 
  handleFormSubmit: (data) => { 
    //userInfo.setUserInfo();
    popupFormProfile.close();
    api.patchUserData(data)//отправляю данные из попапа на сервер
    .then((res) => {
      userInfo.setUserInfo(res)
    })
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

//Отрисовываем карточки с сервера
api.getInitialCards()
.then((res) => {
const popupPreview = new PopupWithImage(popupZoom);
const cardList = new Section({items: res, 
renderer: (itemCard) => {
  const card = new Card(
    itemCard,
   '#template',
   () => {popupPreview.open(itemCard)},
  () => {
    const popupDelete = new PopupWithForm({
      selectorPopup: popuoDeleteCard,
      handleFormSubmit: (cardID) => {
        //card.deleteCard();
        api.deleteCard(cardID)
            .then(() => {
              card.deleteCard();
            })
            .catch((err) => {
              console.error(err);
            });
      }
    });
    popupDelete.open();
    popupDelete.setEventListeners();
  },
  api);
  const cardElement = card.generateCard();//возвращает готовую карточку
  cardList.addItem(cardElement);//вставляем готовую карточку в DOM
}
}, cardsContainer);
cardList.renderItems();
popupPreview.setEventListeners();
});
//Отрисовываем карточки с сервера

/* Popup для новой аватарки*/
const changeAvatar = new PopupWithForm({
  selectorPopup: avatarForm,
  handleFormSubmit: () => {
    const valuesInput = document.querySelector('.popup__input_type_avatar').value;
    avatarImage.style.backgroundImage = `url(${valuesInput})`;
    api.patchAvatar(valuesInput);
    }
});
popupChengeButtonAvatar.addEventListener('click', () => {
  changeAvatar.open();
  avatarValidator.cleanInputError();

});
changeAvatar.setEventListeners();
/* Popup для новой аватарки*/

/* Popup для новых постов*/
/*Создание новой карточки */
const createNewCard = new PopupWithForm({
  selectorPopup: popupAddCard,
  handleFormSubmit: () => {
    const valuesInput = [{
      link:document.querySelector('.popup__input_type_image').value,
      name: document.querySelector('.popup__input_type_place').value
    }];
api.postCard({valuesInput})
.then(res =>{
  const popupPreview = new PopupWithImage(popupZoom);
  const cardList = new Section({
    items: res,
    renderer: itemCard => {
       // при создании экземпляра  передаём ему объект с данными формы
       const card = new Card(
      itemCard, 
      '#template',
      () => {popupPreview.open(itemCard)},
      () => {
         const popupDelete = new PopupWithForm({
           selectorPopup: popuoDeleteCard,
           handleFormSubmit: (cardID) => {
            //card.deleteCard();
            api.deleteCard(cardID)
                .then(() => {
                  card.deleteCard();
                })
                .catch((err) => {
                  console.error(err);
                });
          }
         });
         popupDelete.open();
         popupDelete.setEventListeners();
       },
      api);
       const cardElement = card.generateCard();//возвращает готовую карточку
       cardList.addItem(cardElement);//вставляем готовую карточку в DOM
    }
  },cardsContainer)
      popupPreview.setEventListeners();
      cardList.renderItems();
      createNewCard.close();
})
      }
      });
// Открываем попап для добавления нового поста
popupAddButtonOpen.addEventListener('click', () => {
  createNewCard.open();
  cardValidator.cleanInputError();
});
createNewCard.setEventListeners();
/* Popup для новых постов*/

/*Для каждой формы устанавливаем свою валидацию*/
const cardValidator= new FormValidator(validationConfig, cardForm);
cardValidator.enableValidation();

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();

const avatarValidator = new FormValidator(validationConfig, avatarForm);
avatarValidator.enableValidation();
/*Для каждой формы устанавливаем свою валидацию*/







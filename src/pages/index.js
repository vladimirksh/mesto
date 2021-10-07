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
        popupDeleteCard,
        buttonOpenChangeAvatar,
        avatarForm,
        popupChangeAvatar,
        profileAvatar
      } from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import './index.css'; // добавил импорт главного файла стилей 

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: 'ca88055d-8e98-4fcc-94cf-8a7d7aaca5a8',
    'Content-Type': 'application/json'
  }
})

//функция создания карточк использую ниже
function createCard (data) {
  const cardList = new Section({items: data, 
    renderer: (itemCard) => {
      const card = new Card(itemCard,'#template', () => {popupPreview.open(itemCard)},

        (cardId) => {const popupDelete = new PopupWithForm({
        selectorPopup: popupDeleteCard,
        handleFormSubmit: () => {
          api.deleteCard(cardId)
            .then(() => {
              card.deleteCard();
            })
        }
      });
      
      popupDelete.open()
      popupDelete.setEventListeners()
      },
      api);
      const cardElement = card.generateCard();//возвращает готовую карточку
      cardList.addItem(cardElement);//вставляем готовую карточку в DOM
    }
    }, cardsContainer);
    cardList.renderItems();
    popupPreview.setEventListeners();
}
//функция создания карточк использую ниже

/*Отрисовываем карточки*/
const popupPreview = new PopupWithImage(popupZoom);
api.getCards()
  .then(result => {
    createCard(result);
  })
/*Отрисовываем карточки*/

/* Popup для новых постов*/
/*Создание новой карточки */
const createNewCard = new PopupWithForm({
  selectorPopup: popupAddCard,
  handleFormSubmit: () => {
    createNewCard.renderLoading(false);
    const valuesInput = [{
      link:document.querySelector('.popup__input_type_image').value,
      name: document.querySelector('.popup__input_type_place').value
    }];
    api.postCard(valuesInput)
    .finally(() => {
      createNewCard.renderLoading(true);
    })
    createCard(valuesInput);
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
//получаю данные с сервера и присваиваю их при первоначальной загрузки сайта
api.getUserData()
.then(res => {
  userInfo.setUserInfo(res)
  userInfo.setUserAvatar(res)
})

const userInfo = new UserInfo({ 
  userName: profileName, 
  userJob: profileAbout,
  userAvatar: profileAvatar
}); 

const popupFormProfile = new PopupWithForm({ 
  selectorPopup: popupChangeName, 
  handleFormSubmit: (data) => { 
    popupFormProfile.renderLoading(false);
    //при сабмите отправляем пост
    api.patchUserData(data)
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .finally(() => {
      popupFormProfile.renderLoading(true);
    })
    popupFormProfile.close();
  } 
}) 
popupFormProfile.setEventListeners(); 
 
//открываем попап 
buttonOpenChangeName.addEventListener('click', () => { 
  nameInput.value = userInfo.getUserInfo().userName; 
  jobInput.value = userInfo.getUserInfo().userJob; 
  popupFormProfile.open();
  profileValidator.cleanInputError();
}); 
/*Popup для редактирования имени и о себе*/

/*Popup для редактирования аватара*/
const changeAvatar = new PopupWithForm({
  selectorPopup: popupChangeAvatar,
  handleFormSubmit: (data) => {
    changeAvatar.renderLoading(false);
    //при сабмите отправляем картинку
    api.patchUserAvatar(data)
    .then(res => {
      userInfo.setUserAvatar(res);
    })
    .finally(() => {
      changeAvatar.renderLoading(true);
    })
    changeAvatar.close();
  }
});
changeAvatar.setEventListeners();
//открываем попап 
buttonOpenChangeAvatar.addEventListener('click', () => { 
  changeAvatar.open();
  avatarValidator.cleanInputError();
}); 
/*Popup для редактирования аватара*/

/*Для каждой формы устанавливаем свою валидацию*/
const cardValidator= new FormValidator(validationConfig, cardForm);
cardValidator.enableValidation();

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();

const avatarValidator = new FormValidator(validationConfig, avatarForm);
avatarValidator.enableValidation();
/*Для каждой формы устанавливаем свою валидацию*/
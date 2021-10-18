import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {validationConfig, 
        popupZoom, 
        popupAddButtonOpen, 
        popupAddNewCard,
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
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import './index.css'; // добавил импорт главного файла стилей 

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: 'ca88055d-8e98-4fcc-94cf-8a7d7aaca5a8',
    'Content-Type': 'application/json'
  }
})

//попап увеличения картнки карточки
const popupPreview = new PopupWithImage(popupZoom);
popupPreview.setEventListeners();
//попап увеличения картнки карточки

//попап удаления моей карточки (отдельный класс)
const popupDeleteMyCard = new PopupWithConfirmation(popupDeleteCard);
popupDeleteMyCard.setEventListeners();
//попап удаления моей карточки (отдельный класс)

//создание карточки
function createCard (itemCard) {
  const card = new Card(itemCard,'#template', () => {popupPreview.open(itemCard)},
  (cardId) => {
  popupDeleteMyCard.open();
  popupDeleteMyCard.setSubmitAction(() => {
  api.deleteCard(cardId)
    .then(() => {
      card.deleteCard();
    })
    .catch((err) => {
      console.error(err);
    })
  }
)},

(cardId, element) => {
  api.putLike(cardId)
  .then((res) => {
    element.querySelector('.element__likes-count').textContent = res.likes.length;
  })
  .catch((err) => {
    console.error(err);
  });
},

(cardId, element) => {
  api.deleteLike(cardId)
  .then((res) => {
    element.querySelector('.element__likes-count').textContent = res.likes.length;
  })
  .catch((err) => {
    console.error(err);
  });
},
userId
  )
  return card.generateCard();
}

//создание карточки
//Класс размещения карточки использую ниже
  const cardList = new Section({ 
    renderer: (itemCard) => {
      cardList.addItem(createCard(itemCard));
    }
    }, cardsContainer);
    
//Класс размещения карточки использую ниже

//получаю данные с сервера и присваиваю их при первоначальной загрузки сайта
let userId = null;
api.getUserData()
.then(res => {
  userId = res._id;
  userInfo.setUserInfo(res)
  userInfo.setUserAvatar(res)
  /*Отрисовываем карточки при помощи вложенного запроса*/
  if(userId){
    api.getCards()
  .then(result => {
    cardList.renderItems(result);
  })
  .catch((err) => {
    console.error(err);
  });
  }
  /*Отрисовываем карточки при помощи вложенного запроса*/
})
.catch((err) => {
  console.error(err);
})

const userInfo = new UserInfo({ 
  userName: profileName, 
  userJob: profileAbout,
  userAvatar: profileAvatar
}); 
//получаю данные с сервера и присваиваю их при первоначальной загрузки сайта

/* Popup для новых постов*/
/*Создание новой карточки */
const popupAddCard = new PopupWithForm({
  popupElement: popupAddNewCard,
  handleFormSubmit: (data) => {
    popupAddCard.renderLoading(false);
    api.postCard(data)
    .then((res) => {
        popupAddCard.close();
        cardList.addItem(createCard(res), true);
      }
    )
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupAddCard.renderLoading(true);
    })
      }
      });
// Открываем попап для добавления нового поста
popupAddButtonOpen.addEventListener('click', () => {
  popupAddCard.open();
  cardValidator.cleanInputError();
});
popupAddCard.setEventListeners();
/* Popup для новых постов*/

/*Popup для редактирования имени и о себе*/
const popupFormProfile = new PopupWithForm({ 
  popupElement: popupChangeName, 
  handleFormSubmit: (data) => { 
    popupFormProfile.renderLoading(false);
    //при сабмите отправляем пост
    api.patchUserData(data)
    .then(res => {
      userInfo.setUserInfo(res);
      popupFormProfile.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupFormProfile.renderLoading(true);
    })
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
  popupElement: popupChangeAvatar,
  handleFormSubmit: (data) => {
    changeAvatar.renderLoading(false);
    //при сабмите отправляем картинку
    api.patchUserAvatar(data)
    .then(res => {
      userInfo.setUserAvatar(res);
      changeAvatar.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      changeAvatar.renderLoading(true);
    })
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
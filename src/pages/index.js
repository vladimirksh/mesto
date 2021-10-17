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
import './index.css'; // добавил импорт главного файла стилей 

fetch('https://mesto.nomoreparties.co/v1/cohort-27/cards', 
{headers: {
  authorization: 'ca88055d-8e98-4fcc-94cf-8a7d7aaca5a8',
  'Content-Type': 'application/json'
}})
.then(res => {
  return res.json()
})
.then(res => {
  console.log(res)
})


fetch('https://mesto.nomoreparties.co/v1/cohort-27/users/me', 
{headers: {
  authorization: 'ca88055d-8e98-4fcc-94cf-8a7d7aaca5a8',
  'Content-Type': 'application/json'
}})
.then(res => {
  return res.json()
})
.then(res => {
  console.log(res)
})






const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: 'ca88055d-8e98-4fcc-94cf-8a7d7aaca5a8',
    'Content-Type': 'application/json'
  }
})
const popupPreview = new PopupWithImage(popupZoom);
popupPreview.setEventListeners();

//создание карточки
function createCard (itemCard) {
  const card = new Card(itemCard,'#template', () => {popupPreview.open(itemCard)},
  (cardId) => {
  const popupDelete = new PopupWithForm({
    popupElement: popupDeleteCard,
  handleFormSubmit: () => {
    api.deleteCard(cardId)
      .then(() => {
          card.deleteCard();
        popupDelete.close();
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

popupDelete.open();
popupDelete.setEventListeners();
},

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
"d2d69bded002411fb31b68fe"
  )

  return card.generateCard();
}
//создание карточки
api.getUserData()
  .then(res => {
    res._id
  })
  .catch((err) => {
    console.error(err);
  })
//Класс размещения карточки использую ниже
  const cardList = new Section({ 
    renderer: (itemCard) => {
      cardList.addItem(createCard(itemCard));
    }
    }, cardsContainer);
    
//Класс размещения карточки использую ниже

/*Отрисовываем карточки*/
api.getCards()
  .then(result => {
    cardList.renderItems(result);
  })
  .catch((err) => {
    console.error(err);
  });
/*Отрисовываем карточки*/

/* Popup для новых постов*/
/*Создание новой карточки */
const popupAddCard = new PopupWithForm({
  popupElement: popupAddNewCard,
  handleFormSubmit: (data) => {
    popupAddCard.renderLoading(false);
    api.postCard(data)
    .then((res) => {
        console.log(res)
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
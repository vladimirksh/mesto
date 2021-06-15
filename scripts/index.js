const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

  const template = document.querySelector('#template').content;//выбраем заготовку по id и запрашиваем внутренности
  const elements = document.querySelector('.elements');//место куда копируем новые карточки
//добавляем карточки, методом forEach проходим по каждому элементу массива
  initialCards.forEach (function(item){
  const element = template.querySelector('.element').cloneNode(true);// клонируем содержимое тега template
  element.querySelector('.element__title').textContent = item.name;
  element.querySelector('.element__image').src = item.link;
  //добавляем лайк для созданных из массива карточек
  element.querySelector('.element__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
  });
  //удаление карточки для созданных из массива карточек
  const deleteButton = element.querySelector('.element__delete');
  deleteButton.addEventListener('click', function () {    
    deleteButton.parentElement.remove();
  });
  //попап для картинок
  element.querySelector('.element__image').addEventListener('click', function (evt) {
    popupImage.setAttribute('src', element.querySelector('.element__image').src);
    popupText.textContent = element.querySelector('.element__title').textContent;
    evt.target.classList.toggle(openCloseZoom());
});

  elements.append(element);//добавляем карточки
})

const popupZoom = document.querySelector('.popup_zoom-image');
const popupCloseZoom = document.querySelector('.popup__close-zoom');
function openCloseZoom() {
  popupZoom.classList.toggle('popup_open');
}

const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');
popupCloseZoom.addEventListener('click', openCloseZoom)

// Popup для новых постов
const openPopupAddButton = document.querySelector('.profile__addbutton'); //Выбираем кнопку вызывающую попап
const popupAddCard = document.querySelector('.popup_add-card'); // Выбираем сам попап для использования этой константы в функции
const closePopupAddButton = document.querySelector('.popup__close_add-card'); //Выбираем крест для закрытия попапа
const savePopupAddButton = document.querySelector('.popup__save_add-card');//Выбираем кнопку Создать
// Функция которая добавляет и удалет класс
function openCloseAddCard() {
  popupAddCard.classList.toggle('popup_open');
}
// Открываем попап для добавления нового поста
openPopupAddButton.addEventListener('click', openCloseAddCard)
closePopupAddButton.addEventListener('click', openCloseAddCard)
// Находим форму в DOM для добавления нового поста
const formElementAddcard = document.querySelector('.popup__body_add-card');


function formSubmitNewCard (evt) {
  evt.preventDefault();
  const element = template.querySelector('.element').cloneNode(true);
  const placeInput = document.querySelector('.popup__input_type_place').value;
  const imageInput = document.querySelector('.popup__input_type_image').value;
  element.querySelector('.element__title').textContent = placeInput;
  element.querySelector('.element__image').src = imageInput;
  //добавляем лайк для созданных пользователем карточек
  element.querySelector('.element__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
  });
  //удаление карточки
  const deleteButton = element.querySelector('.element__delete');
  deleteButton.addEventListener('click', function () {    
    deleteButton.parentElement.remove();
  });
    //попап для картинок
    element.querySelector('.element__image').addEventListener('click', function (evt) {
      popupImage.setAttribute('src', element.querySelector('.element__image').src);
      popupText.textContent = element.querySelector('.element__title').textContent;
      evt.target.classList.toggle(openCloseZoom());
  });

  elements.prepend(element);
  openCloseAddCard();
  formElementAddcard.reset();//сбрасываем содержимое при повторном открытии попапа
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementAddcard.addEventListener('submit', formSubmitNewCard);


const openPopupButton = document.querySelector('.profile__editbutton'); //Выбираем кнопку редактирования профиля
const popup = document.querySelector('.popup'); // Выбираем сам попап для использования этой константы в функции
const closePopupButton = document.querySelector('.popup__close'); //Выбираем крест для закрытия попапа
const popupButtonSave = document.querySelector('.popup__save');//Выбираем кнопку Сохранить

// Функция которая добавляет и удалет класс
function openClose() {
  popup.classList.toggle('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}
// Открываем попап
openPopupButton.addEventListener('click', openClose)
closePopupButton.addEventListener('click', openClose)

// Находим форму в DOM
const formElement = document.querySelector('.popup__body');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
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
    openClose ();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


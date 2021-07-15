  const template = document.querySelector('#template').content;//выбраем заготовку по id и запрашиваем внутренности
  const cardsContainer = document.querySelector('.cards-container');//место куда копируем новые карточки
  const element = template.querySelector('.element').cloneNode(true);
  const popupImage = document.querySelector('.popup__image');
  const popupText = document.querySelector('.popup__text');

//Функция удаления карточки которая принимает карточку ищет в ней кнопку, а далее удаляет саму карточу
const deletCard = (cardElement) => {
const buttonDelete = cardElement.querySelector('.element__delete');
buttonDelete.addEventListener('mousedown', function () {
buttonDelete.parentElement.remove();
});
};
//Функция увеличения картинки из карточки, работает по тому же приципу что и удаление картчки
const ZoomPopupInImg = (cardElement) => {
cardElement.querySelector('.element__image').addEventListener('click', () => {
popupImage.setAttribute('src', cardElement.querySelector('.element__image').src);//ссылка для картинки
popupImage.setAttribute('alt',cardElement.querySelector('.element__title').textContent);//alt для картинки
popupText.textContent = cardElement.querySelector('.element__title').textContent;//подпись снизу для картинки
openPopup(popupZoom);
});
};

//функция создания одной карочки с кнопкоми и попапом
  function createCard (name, link) {
    const element = template.querySelector('.element').cloneNode(true);
    element.querySelector('.element__title').textContent = name;
    element.querySelector('.element__image').src = link;
    element.querySelector('.element__image').alt = name;

    //добавляем кликабельный лайк для одной карточки, но когда функцию вызываю в методе forEach то лайк будет работать и у др.
    element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
    });
    
    deletCard(element);//Вызываем функцию удаления карточки
    ZoomPopupInImg(element);//попап для картинки в элементе

    return element;
  }

//добавляем карточки из массива (initialCards) с помощью метода forEach 
initialCards.forEach ((item) => {
  cardsFlow(cardsContainer, createCard(item.name,item.link));
});

//Закрываем увеличиельный попап
const popupZoom = document.querySelector('.popup_zoom-image');
const popupCloseZoom = document.querySelector('.popup__close-zoom');
popupCloseZoom.addEventListener('click', () => closePopup(popupZoom));

// Popup для новых постов
const popupAddButtonOpen = document.querySelector('.profile__addbutton'); //Выбираем кнопку вызывающую попап
const popupAddCard = document.querySelector('.popup_add-card'); // Выбираем сам попап для использования этой константы в функции
const popupAddButtonClose = document.querySelector('.popup__close_add-card'); //Выбираем крест для закрытия попапа


// Открываем попап для добавления нового поста
popupAddButtonOpen.addEventListener('click', () => openPopup(popupAddCard));
popupAddButtonClose.addEventListener('click', () => closePopup(popupAddCard));
// Находим форму в DOM для добавления нового поста
const formElementAddcard = document.querySelector('.popup__body_add-card');

//Функция добавления карточки в начало потока карт
function cardsFlow (container, newCard){
  container.prepend(newCard);
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementAddcard.addEventListener('submit', formSubmitNewCard);

function formSubmitNewCard (evt) {
  evt.preventDefault();
  const placeInput = document.querySelector('.popup__input_type_place').value;
  const imageInput = document.querySelector('.popup__input_type_image').value;
  cardsFlow(cardsContainer, createCard (placeInput, imageInput));
  formElementAddcard.reset();
  closePopup(popupAddCard);
};

const popupButtonOpen = document.querySelector('.profile__editbutton'); //Выбираем кнопку редактирования профиля
const popupChangeName = document.querySelector('.popup-change'); // Выбираем сам попап для использования этой константы в функции
const popupButtonClose = document.querySelector('.popup__close-change'); //Выбираем крест для закрытия попапа
const popupButtonSave = document.querySelector('.popup__save');//Выбираем кнопку Сохранить

function infoName() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
};
// Функция которая добавляет и удалет класс
function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', checkedKey);
};

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', checkedKey);
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


//Функция закрытия попапа для Esc
const formsClose = () => {
  popupList.forEach((popupForm) => {
  closePopup(popupForm);
});
};
//Функция проверки на нажатие Esc
const checkedKey = (evt) => {
  const key = evt.key; 
  if (key === "Escape") {
    formsClose();
  };
};

const popupList = Array.from(document.querySelectorAll('.popup'));//Получаю все popup
popupList.forEach((popupForm) => {
  popupForm.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__background') || evt.target.classList.contains('popup__close')) { 
      closePopup(popupForm);
    };
  });
});
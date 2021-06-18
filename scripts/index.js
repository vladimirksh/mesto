  const template = document.querySelector('#template').content;//выбраем заготовку по id и запрашиваем внутренности
  const cardsContainer = document.querySelector('.cards-container');//место куда копируем новые карточки
  const element = template.querySelector('.element').cloneNode(true);
  const popupImage = document.querySelector('.popup__image');
  const popupText = document.querySelector('.popup__text');

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
    //удаление карточки будет работать по тому же принципу как и лайк, описываю функционал для одной но в методе будет работать и у др.
    const deleteButton = element.querySelector('.element__delete');
    deleteButton.addEventListener('click', function () {
    deleteButton.parentElement.remove();
    });
    //попап для картинки в элементе
    element.querySelector('.element__image').addEventListener('click', function (evt) {
    popupImage.setAttribute('src', element.querySelector('.element__image').src);//ссылка для картинки
    popupImage.setAttribute('alt',element.querySelector('.element__title').textContent);//alt для картинки
    popupText.textContent = element.querySelector('.element__title').textContent;//подпись снизу для картинки
    openPopup(popupZoom);
    });

    return element;
  }

//добавляем карточки из массива (initialCards) с помощью метода forEach 
initialCards.forEach (function(item){
  cardsFlow(cardsContainer, createCard(item.name,item.link));
});

//Закрываем увеличиельный попап
const popupZoom = document.querySelector('.popup_zoom-image');
const popupCloseZoom = document.querySelector('.popup__close-zoom');
popupCloseZoom.addEventListener('click', () => closePopup(popupZoom));

// Popup для новых постов
const openPopupAddButton = document.querySelector('.profile__addbutton'); //Выбираем кнопку вызывающую попап
const popupAddCard = document.querySelector('.popup_add-card'); // Выбираем сам попап для использования этой константы в функции
const closePopupAddButton = document.querySelector('.popup__close_add-card'); //Выбираем крест для закрытия попапа
const savePopupAddButton = document.querySelector('.popup__save_add-card');//Выбираем кнопку Создать

// Открываем попап для добавления нового поста
openPopupAddButton.addEventListener('click', () => openPopup(popupAddCard));
closePopupAddButton.addEventListener('click', () => closePopup(popupAddCard));
// Находим форму в DOM для добавления нового поста
const formElementAddcard = document.querySelector('.popup__body_add-card');

//Функция добавления карточки в начало потока карт
function cardsFlow (container, newCard){
  container.prepend(newCard);
}

const placeInput = document.querySelector('.popup__input_type_place').value;
const imageInput = document.querySelector('.popup__input_type_image').value;
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

const openPopupButton = document.querySelector('.profile__editbutton'); //Выбираем кнопку редактирования профиля
const popupChangeName = document.querySelector('.popup-change'); // Выбираем сам попап для использования этой константы в функции
const closePopupButton = document.querySelector('.popup__close-change'); //Выбираем крест для закрытия попапа
const popupButtonSave = document.querySelector('.popup__save');//Выбираем кнопку Сохранить


function infoName() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
};
// Функция которая добавляет и удалет класс
function openPopup(popup) {
  popup.classList.add('popup_open');
};

function closePopup(popup) {
  popup.classList.remove('popup_open');
};

function openChangePopup () {
  openPopup(popupChangeName);
  infoName();
  };

// Открываем попап
openPopupButton.addEventListener('click', openChangePopup);
closePopupButton.addEventListener('click', () => closePopup(popupChangeName));
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
}

formChangeName.addEventListener('submit', formSubmitHandler);

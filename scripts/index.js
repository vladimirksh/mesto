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
    evt.target.classList.toggle(openCloseZoom());
    });
    return element;
  }

//добавляем карточки из массива (initialCards) с помощью метода forEach 
initialCards.forEach (function(item){
  cardsContainer.append(createCard(item.name,item.link));
});



const popupZoom = document.querySelector('.popup_zoom-image');
const popupCloseZoom = document.querySelector('.popup__close-zoom');
function openCloseZoom() {
  popupZoom.classList.toggle('popup_open');
}

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

  cardsContainer.prepend(element);
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


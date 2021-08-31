export const validationConfig = {
  formSelector: '.popup__body',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const popupZoom = document.querySelector('.popup_zoom-image');
export const popupAddButtonOpen = document.querySelector('.profile__addbutton');
export const popupAddCard = document.querySelector('.popup_add-card'); 
export const cardsContainer = document.querySelector('.cards-container');

export const buttonOpenChangeName = document.querySelector('.profile__editbutton'); //Выбираем кнопку редактирования профиля
export const popupChangeName = document.querySelector('.popup-change'); // Выбираем сам попап для использования этой константы в функции
export const nameInput = document.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
export const jobInput = document.querySelector('.popup__input_type_about');// Воспользуйтесь инструментом .querySelector()
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');

export const cardForm = document.querySelector('.popup_add-card');
export const profileForm = document.querySelector('.popup-change');
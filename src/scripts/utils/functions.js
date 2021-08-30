export function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', checkedKey);
};

export function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', checkedKey);
};

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
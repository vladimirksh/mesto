import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({selectorPopup, handleFormSubmit}){
    super (selectorPopup);
    this._popupForm = this._selectorPopup.querySelector('.popup__body');
    this._handleFormSubmit = handleFormSubmit;
    this._buttonSave = this._popupForm.querySelector('.popup__save');
}
/*собирает данные всех полей формы*/
_getInputValues() {
  // достаём все элементы полей
  this._inputList = this._popupForm.querySelectorAll('.popup__input');
   // создаём пустой объект
   this._formValues = {};
    // добавляем в этот объект значения всех полей
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
  // возвращаем объект значений
  return this._formValues;
}
//добавлztn обработчик клика иконке закрытия и добавляет обработчик сабмита формы
setEventListeners() {
  super.setEventListeners();
  this._popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // добавим вызов функции _handleFormSubmit
    // передадим ей объект — результат работы _getInputValues
    this._handleFormSubmit(this._getInputValues());
    this.close();
  });
  }

  
close() {
  super.close();
  this._popupForm.reset();
}

renderLoading(Loading) {
  if (Loading) {
    this._buttonSave.textContent = 'Сохранение...';
  } else {
    this._buttonSave.textContent = 'Создать';
  }
}
}
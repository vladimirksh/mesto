import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({selectorPopup, handleFormSubmit}){
    super (selectorPopup);
    this._popupBody = this._selectorPopup.querySelector('.popup__body');
    this._handleFormSubmit = handleFormSubmit;
}
/*собирает данные всех полей формы*/
_getInputValues() {
  // достаём все элементы полей
  this._inputList = this._popupBody.querySelectorAll('.popup__input');
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
  this._popupBody.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // добавим вызов функции _handleFormSubmit
    // передадим ей объект — результат работы _getInputValues
    this._handleFormSubmit(this._getInputValues());
  });
  }

  
close() {
  super.close();
  this._popupBody.reset();
}
}
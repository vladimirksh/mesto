const popupElements = {
  formSelector: '.popup__body',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

class FormValidator {
  constructor(popupElements, inputForm) {
    this._popupElements = popupElements;
    this._inputForm = inputForm;
  }
  enableValidation (_popupElements) {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(this._popupElements.formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      this._setEventListeners(formElement, this._popupElements);
    });
  }

  _setEventListeners (formElement, _popupElements) {
    const inputList = Array.from(formElement.querySelectorAll(this._popupElements.inputSelector));
    const buttonElement = formElement.querySelector(this._popupElements.submitButtonSelector);// Найдём в текущей форме кнопку отправки
     this._toggleButtonState(inputList, buttonElement, this._popupElements);
     // Обойдём все элементы полученной коллекции
     inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(formElement, inputElement, this._popupElements);
        this._toggleButtonState(inputList, buttonElement, this._popupElements);
      });
    });
  }

  _hasInvalidInput (inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  }
  
  _isValid (form, inputForm, _popupElements) {

    if (!inputForm.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(form, inputForm, inputForm.validationMessage, this._popupElements);
    } else {
      // Если проходит, скроем
      this._hideInputError(form, inputForm, this._popupElements);
    }
  }

  _toggleButtonState (inputList, buttonElement, _popupElements) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._popupElements.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._popupElements.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true);
    }
  }

  _hideInputError (form, inputForm, _popupElements) {
    const errorForm = form.querySelector(`.${inputForm.id}-error`);//ищим ошибку в форме
  
    inputForm.classList.remove(this._popupElements.inputErrorClass);// delete класс для инпута красное подчеркивание
    errorForm.textContent = '';// Заменим содержимое span с ошибкой 
    errorForm.classList.remove(this._popupElements.errorClass);
  }

  _showInputError (form, inputForm, errorMessage, _popupElements) {
    const errorForm = form.querySelector(`.${inputForm.id}-error`);//ищим ошибку в форме
  
    inputForm.classList.add(this._popupElements.inputErrorClass);//класс для инпута красное подчеркивание
    errorForm.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
    errorForm.classList.add(this._popupElements.errorClass);
  }
}

export {FormValidator, popupElements}
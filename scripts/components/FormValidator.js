class FormValidator {
  constructor(popupElements, popupForm) {
    this._popupForm = popupForm;
    this._popupElements = popupElements;

    this._popupBody = this._popupForm.querySelector(this._popupElements.formSelector);
    this._popupInputList = Array.from(this._popupBody.querySelectorAll(this._popupElements.inputSelector));
    this._popupButton = this._popupBody.querySelector(this._popupElements.submitButtonSelector);
    
  }
  enableValidation () {
    this._popupBody.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    };

  _setEventListeners () {
     this.toggleButtonState();
     this._popupInputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        const inputError = this._popupBody.querySelector(`.${inputElement.id}-error`);
        this._isValid(inputElement, inputError);
        this.toggleButtonState();
      });
    });
  }

  _hasInvalidInput () {
    return this._popupInputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _isValid (input, inputError) {
    if (!input.validity.valid) {
      this._showInputError(input, inputError);
    } else {
      this._hideInputError(input, inputError);
    }
  }

  toggleButtonState () {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._popupButton.classList.add(this._popupElements.inactiveButtonClass);
      this._popupButton.setAttribute('disabled', true);
    } else {
      // иначе сделай кнопку активной
      this._popupButton.classList.remove(this._popupElements.inactiveButtonClass);
      this._popupButton.removeAttribute('disabled', true);
    }
  }

  _hideInputError (input, inputError) {  
    input.classList.remove(this._popupElements.inputErrorClass);// delete класс для инпута красное подчеркивание
    inputError.textContent = '';// Заменим содержимое span с ошибкой 
    inputError.classList.remove(this._popupElements.errorClass);
  }

  _showInputError (input, inputError) {
    input.classList.add(this._popupElements.inputErrorClass);//класс для инпута красное подчеркивание
    inputError.textContent = input.validationMessage; // Заменим содержимое span с ошибкой на переданный параметр
    inputError.classList.add(this._popupElements.errorClass);
  }
}

export {FormValidator}
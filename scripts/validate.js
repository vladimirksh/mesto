//функция добавления класса с ошибкой
const showInputError = (form, inputForm, errorMessage, popupElements) => {
  const errorForm = form.querySelector(`.${inputForm.id}-error`);//ищим ошибку в форме

  inputForm.classList.add(popupElements.inputErrorClass);//класс для инпута красное подчеркивание
  errorForm.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
  errorForm.classList.add(popupElements.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (form, inputForm, popupElements) => {
  const errorForm = form.querySelector(`.${inputForm.id}-error`);//ищим ошибку в форме

  inputForm.classList.remove(popupElements.inputErrorClass);// delete класс для инпута красное подчеркивание
  errorForm.textContent = '';// Заменим содержимое span с ошибкой 
  errorForm.classList.remove(popupElements.errorClass);
};

// Функция, которая делает кнопку сабмита неактивной
const toggleButtonState = (inputList, buttonElement, popupElements) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(popupElements.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(popupElements.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
}; 

// Функция, которая проверяет валидность поля
const isValid = (form, inputForm, popupElements) => {
  if (!inputForm.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(form, inputForm, inputForm.validationMessage, popupElements.inputErrorClass, popupElements.errorClass);
  } else {
    // Если проходит, скроем
    hideInputError(form, inputForm, popupElements.inputErrorClass, popupElements.errorClass);
  }
};

//Функция добавления слушителя на ВСЕ инпуты 
const setEventListeners = (formElement, popupElements) => {
  const inputList = Array.from(formElement.querySelectorAll(popupElements.inputSelector));
  const buttonElement = formElement.querySelector(popupElements.submitButtonSelector);// Найдём в текущей форме кнопку отправки
   toggleButtonState(inputList, buttonElement, popupElements);
   // Обойдём все элементы полученной коллекции
   inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, popupElements);
      toggleButtonState(inputList, buttonElement, popupElements);
    });
  });
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
}; 

const enableValidation = (popupElements) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(popupElements.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, popupElements);
  });
};

const popupElements = {
  formSelector: '.popup__body',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Вызовем функцию
enableValidation(popupElements);
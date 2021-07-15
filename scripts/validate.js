//функция добавления класса с ошибкой
const showInputError = (form, inputForm, errorMessage, inputErrorClass, errorClass) => {
  const errorForm = form.querySelector(`.${inputForm.id}-error`);//ищим ошибку в форме

  inputForm.classList.add(inputErrorClass);//класс для инпута красное подчеркивание
  errorForm.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
  errorForm.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (form, inputForm, inputErrorClass, errorClass) => {
  const errorForm = form.querySelector(`.${inputForm.id}-error`);//ищим ошибку в форме

  inputForm.classList.remove(inputErrorClass);// delete класс для инпута красное подчеркивание
  errorForm.textContent = '';// Заменим содержимое span с ошибкой 
  errorForm.classList.remove(errorClass);
};

// Функция, которая делает кнопку сабмита неактивной
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
}; 

// Функция, которая проверяет валидность поля
const isValid = (form, inputForm, inputErrorClass, errorClass) => {
  if (!inputForm.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(form, inputForm, inputForm.validationMessage, inputErrorClass, errorClass);
  } else {
    // Если проходит, скроем
    hideInputError(form, inputForm, inputErrorClass, errorClass);
  }
};

//Функция добавления слушителя на ВСЕ инпуты 
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);// Найдём в текущей форме кнопку отправки
   toggleButtonState(inputList, buttonElement, inactiveButtonClass);
   // Обойдём все элементы полученной коллекции
   inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
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


const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
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

/*enableValidation({

  errorClass: 'popup__error_visible'
}); */
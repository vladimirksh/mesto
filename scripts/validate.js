//функция добавления класса с ошибкой
const showInputError = (form, inputForm, errorMessage) => {
  const errorForm = form.querySelector(`.${inputForm.id}-error`);//ищим ошибку в форме

  inputForm.classList.add('popup__input_type_error');//класс для инпута красное подчеркивание
  errorForm.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
  errorForm.classList.add('popup__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (form, inputForm,) => {
  const errorForm = form.querySelector(`.${inputForm.id}-error`);//ищим ошибку в форме

  inputForm.classList.remove('popup__input_type_error');// delete класс для инпута красное подчеркивание
  errorForm.textContent = '';// Заменим содержимое span с ошибкой 
  errorForm.classList.remove('popup__input-error_active');
};

// Функция, которая делает кнопку сабмита неактивной
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__save_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__save_inactive');
  }
}; 

// Функция, которая проверяет валидность поля
const isValid = (form, inputForm) => {
  if (!inputForm.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(form, inputForm, inputForm.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(form, inputForm);
  }
};

//Функция добавления слушителя на ВСЕ инпуты 
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save');// Найдём в текущей форме кнопку отправки
   toggleButtonState(inputList, buttonElement);
   // Обойдём все элементы полученной коллекции
   inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
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


const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__body'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation(); 


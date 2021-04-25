let openPopupButton = document.querySelector('.profile__editbutton'); //Выбираем кнопку редактирования профиля
let popup = document.querySelector('.popup'); // Выбираем сам попап для использования этой константы в функции
let closePopupButton = document.querySelector('.popup__close'); //Выбираем крест для закрытия попапа
let popupButtonSave = document.querySelector('.popup__save');//Выбираем кнопку Сохранить

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
let formElement = document.querySelector('.popup__body');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_type_about');// Воспользуйтесь инструментом .querySelector()
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

     // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    openClose ();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

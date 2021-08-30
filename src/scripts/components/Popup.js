export default class  Popup {
  constructor(selectorPopup){
    this._selectorPopup = selectorPopup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open(){
    this._selectorPopup.classList.add('popup_open');
    document.addEventListener('keydown', this. _handleEscClose);
  }
  close(){
    this._selectorPopup.classList.remove('popup_open');
    document.removeEventListener('keydown', this. _handleEscClose);
  }
//логику закрытия попапа клавишей Esc.
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

//добавляет слушатель клика иконке закрытия попапа.
  setEventListeners(){
    this._selectorPopup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__background') 
      || evt.target.classList.contains('popup__close')) { 
        this.close();
      }})
  }
}
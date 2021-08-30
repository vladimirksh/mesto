import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(selectorPopup){
    super (selectorPopup);
    this._popupImage = this._selectorPopup.querySelector('.popup__image');
    this._popupText = this._selectorPopup.querySelector('.popup__text');
  }
  open({ link, name }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupText.textContent = name;

    super.open();
  }
}
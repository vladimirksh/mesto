(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var t=function(){function t(e,n,o,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._selector=n,this._template=document.querySelector(this._selector).content,this._handleCardClick=o,this._handleDeleteClick=r}var n,o;return n=t,(o=[{key:"_cloneCard",value:function(){return this._template.querySelector(".element").cloneNode(!0)}},{key:"_setEventListener",value:function(e){var t=this;return this._buttonLike=e.querySelector(".element__like"),this._buttonLike.addEventListener("click",(function(){return t._likeActivation()})),this._buttonDelete=e.querySelector(".element__delete"),this._buttonDelete.addEventListener("click",(function(){return t._handleDeleteClick()})),this._image=e.querySelector(".element__image"),this._image.addEventListener("click",(function(){return t._handleCardClick()})),e}},{key:"_likeActivation",value:function(){this._buttonLike.classList.toggle("element__like_active")}},{key:"deleteCard",value:function(){this._element.remove()}},{key:"_getCard",value:function(){return this._setEventListener(this._cloneCard())}},{key:"generateCard",value:function(){return this._element=this._getCard(),this._element.querySelector(".element__title").textContent=this._name,this._element.querySelector(".element__image").src=this._link,this._element.querySelector(".element__image").alt=this._name,this._element}}])&&e(n.prototype,o),t}();function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var o=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupForm=n,this._popupElements=t,this._popupBody=this._popupForm.querySelector(this._popupElements.formSelector),this._popupInputList=Array.from(this._popupBody.querySelectorAll(this._popupElements.inputSelector)),this._popupButton=this._popupBody.querySelector(this._popupElements.submitButtonSelector)}var t,o;return t=e,(o=[{key:"enableValidation",value:function(){var e=this;this._popupBody.addEventListener("submit",(function(t){t.preventDefault(),e.toggleButtonState()})),this._setEventListeners()}},{key:"cleanInputError",value:function(){var e=this;this._popupInputList.forEach((function(t){var n=e._popupBody.querySelector(".".concat(t.id,"-error"));e._hideInputError(t,n),e.toggleButtonState()}))}},{key:"_setEventListeners",value:function(){var e=this;this.toggleButtonState(),this._popupInputList.forEach((function(t){t.addEventListener("input",(function(){var n=e._popupBody.querySelector(".".concat(t.id,"-error"));e._isValid(t,n),e.toggleButtonState()}))}))}},{key:"_hasInvalidInput",value:function(){return this._popupInputList.some((function(e){return!e.validity.valid}))}},{key:"_isValid",value:function(e,t){e.validity.valid?this._hideInputError(e,t):this._showInputError(e,t)}},{key:"toggleButtonState",value:function(){this._hasInvalidInput()?(this._popupButton.classList.add(this._popupElements.inactiveButtonClass),this._popupButton.setAttribute("disabled",!0)):(this._popupButton.classList.remove(this._popupElements.inactiveButtonClass),this._popupButton.removeAttribute("disabled",!0))}},{key:"_hideInputError",value:function(e,t){e.classList.remove(this._popupElements.inputErrorClass),t.textContent="",t.classList.remove(this._popupElements.errorClass)}},{key:"_showInputError",value:function(e,t){e.classList.add(this._popupElements.inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._popupElements.errorClass)}}])&&n(t.prototype,o),e}(),r={formSelector:".popup__body",inputSelector:".popup__input",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},u=document.querySelector(".popup_zoom-image"),i=document.querySelector(".profile__addbutton"),a=document.querySelector(".popup_add-card"),c=document.querySelector(".cards-container"),s=document.querySelector(".profile__editbutton"),l=document.querySelector(".popup-change"),p=document.querySelector(".popup__input_type_name"),f=document.querySelector(".popup__input_type_about"),d=document.querySelector(".profile__name"),_=document.querySelector(".profile__about"),h=document.querySelector(".profile__editavatar"),y=document.querySelector(".popup_add-card"),m=document.querySelector(".popup-change"),v=document.querySelector(".popup-change-avatar"),b=document.querySelector(".popup-delete");function g(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var E=function(){function e(t,n){var o=t.items,r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=o,this._renderer=r,this._container=n}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&g(t.prototype,n),e}();function k(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var S=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._selectorPopup=t,this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._selectorPopup.classList.add("popup_open"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._selectorPopup.classList.remove("popup_open"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._selectorPopup.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup__background")||t.target.classList.contains("popup__close"))&&e.close()}))}}])&&k(t.prototype,n),e}();function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function L(e,t,n){return(L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function q(e,t){return(q=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function j(e,t){if(t&&("object"===w(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var P=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&q(e,t)}(i,e);var t,n,o,r,u=(o=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(o);if(r){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return j(this,e)});function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=u.call(this,e))._popupImage=t._selectorPopup.querySelector(".popup__image"),t._popupText=t._selectorPopup.querySelector(".popup__text"),t}return t=i,(n=[{key:"open",value:function(e){var t=e.link,n=e.name;this._popupImage.src=t,this._popupImage.alt=n,this._popupText.textContent=n,L(O(i.prototype),"open",this).call(this)}}])&&C(t.prototype,n),i}(S);function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function B(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function x(e,t,n){return(x="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=T(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function R(e,t){return(R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function F(e,t){if(t&&("object"===I(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function T(e){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var V=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(i,e);var t,n,o,r,u=(o=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=T(o);if(r){var n=T(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return F(this,e)});function i(e){var t,n=e.selectorPopup,o=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=u.call(this,n))._popupForm=t._selectorPopup.querySelector(".popup__body"),t._handleFormSubmit=o,t}return t=i,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputList=this._popupForm.querySelectorAll(".popup__input"),this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;x(T(i.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues()),e.close()}))}},{key:"close",value:function(){x(T(i.prototype),"close",this).call(this),this._popupForm.reset()}}])&&B(t.prototype,n),i}(S);function D(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var A=function(){function e(t){var n=t.userName,o=t.userJob;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=n,this._jobElement=o}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{userName:this._nameElement.textContent,userJob:this._jobElement.textContent}}},{key:"setUserInfo",value:function(e){this._nameElement.textContent=e.name,this._jobElement.textContent=e.about}}])&&D(t.prototype,n),e}(),N=new V({selectorPopup:v,handleFormSubmit:function(){var e=document.querySelector(".popup__input_type_avatar").value;document.querySelector(".profile__avatar").style.backgroundImage="url(".concat(e,")")}});h.addEventListener("click",(function(){N.open(),Q.cleanInputError()})),N.setEventListeners();var U=new V({selectorPopup:a,handleFormSubmit:function(){var e={link:document.querySelector(".popup__input_type_image").value,name:document.querySelector(".popup__input_type_place").value},n=new t(e,"#template",(function(){M.open(e)}),(function(){var e=new V({selectorPopup:b,handleFormSubmit:function(){n.deleteCard()}});e.open(),e.setEventListeners()})),o=n.generateCard();G.addItem(o),U.close()}});i.addEventListener("click",(function(){U.open(),H.cleanInputError()})),U.setEventListeners();var J=new V({selectorPopup:l,handleFormSubmit:function(e){z.setUserInfo(e),J.close()}});J.setEventListeners();var z=new A({userName:d,userJob:_});s.addEventListener("click",(function(){p.value=z.getUserInfo().userName,f.value=z.getUserInfo().userJob,J.open(),K.cleanInputError()}));var M=new P(u),G=new E({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){var n=new t(e,"#template",(function(){M.open(e)}),(function(){var e=new V({selectorPopup:b,handleFormSubmit:function(){n.deleteCard()}});e.open(),e.setEventListeners()})),o=n.generateCard();G.addItem(o)}},c);G.renderItems(),M.setEventListeners();var H=new o(r,y);H.enableValidation();var K=new o(r,m);K.enableValidation();var Q=new o(r,v);Q.enableValidation(),fetch("https://mesto.nomoreparties.co/v1/cohort-27/cards",{headers:{authorization:"ca88055d-8e98-4fcc-94cf-8a7d7aaca5a8"}}).then((function(e){return e.json()})).then((function(e){console.log(e)}))})();
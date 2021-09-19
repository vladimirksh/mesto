(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var t=function(){function t(e,n,o,r,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._userID=e.userId,this._likesArray=e.likes.length,this._IDOwner=e.owner._id,this._ID=e._id,this.likeID=e.likes,this._api=i,this._selector=n,this._template=document.querySelector(this._selector).content,this._handleCardClick=o,this._handleDeleteClick=r}var n,o;return n=t,(o=[{key:"_cloneCard",value:function(){return this._template.querySelector(".element").cloneNode(!0)}},{key:"_setEventListener",value:function(e){var t=this;return this._buttonLike=e.querySelector(".element__like"),this._likeCount=e.querySelector(".element__likes-count"),this._likeCount.textContent=this._likesArray,this._buttonLike.addEventListener("click",(function(){t._buttonLike.classList.contains("element__like_active")?(t._likeActivation(),t._deleteLikeClick()):(t._likeActivation(),t._putLikeClick())})),this._buttonDelete=e.querySelector(".element__delete"),this._buttonDelete.addEventListener("click",(function(){return t._handleDeleteClick(t._ID)})),this._image=e.querySelector(".element__image"),this._image.addEventListener("click",(function(){return t._handleCardClick()})),e}},{key:"_likeActivation",value:function(){this._buttonLike.classList.toggle("element__like_active")}},{key:"_putLikeClick",value:function(){var e=this;this._api.putLike(this._ID).then((function(t){e._likeCount.textContent=t.likes.length})).catch((function(e){console.error(e)}))}},{key:"_deleteLikeClick",value:function(){var e=this;this._api.deleteLike(this._ID).then((function(t){e._likeCount.textContent=t.likes.length})).catch((function(e){console.error(e)}))}},{key:"_checkLikeOwner",value:function(){var e=this;return Boolean(this.likeID.find((function(t){return t._id==e._userID})))}},{key:"_checkMyLike",value:function(e){e&&this._likeActivation()}},{key:"deleteCard",value:function(){this._element.remove()}},{key:"_getCard",value:function(){return this._setEventListener(this._cloneCard())}},{key:"generateCard",value:function(){return this._element=this._getCard(),this._element.querySelector(".element__title").textContent=this._name,this._element.querySelector(".element__image").src=this._link,this._element.querySelector(".element__image").alt=this._name,this._element}}])&&e(n.prototype,o),t}();function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var o=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupForm=n,this._popupElements=t,this._popupBody=this._popupForm.querySelector(this._popupElements.formSelector),this._popupInputList=Array.from(this._popupBody.querySelectorAll(this._popupElements.inputSelector)),this._popupButton=this._popupBody.querySelector(this._popupElements.submitButtonSelector)}var t,o;return t=e,(o=[{key:"enableValidation",value:function(){var e=this;this._popupBody.addEventListener("submit",(function(t){t.preventDefault(),e.toggleButtonState()})),this._setEventListeners()}},{key:"cleanInputError",value:function(){var e=this;this._popupInputList.forEach((function(t){var n=e._popupBody.querySelector(".".concat(t.id,"-error"));e._hideInputError(t,n),e.toggleButtonState()}))}},{key:"_setEventListeners",value:function(){var e=this;this.toggleButtonState(),this._popupInputList.forEach((function(t){t.addEventListener("input",(function(){var n=e._popupBody.querySelector(".".concat(t.id,"-error"));e._isValid(t,n),e.toggleButtonState()}))}))}},{key:"_hasInvalidInput",value:function(){return this._popupInputList.some((function(e){return!e.validity.valid}))}},{key:"_isValid",value:function(e,t){e.validity.valid?this._hideInputError(e,t):this._showInputError(e,t)}},{key:"toggleButtonState",value:function(){this._hasInvalidInput()?(this._popupButton.classList.add(this._popupElements.inactiveButtonClass),this._popupButton.setAttribute("disabled",!0)):(this._popupButton.classList.remove(this._popupElements.inactiveButtonClass),this._popupButton.removeAttribute("disabled",!0))}},{key:"_hideInputError",value:function(e,t){e.classList.remove(this._popupElements.inputErrorClass),t.textContent="",t.classList.remove(this._popupElements.errorClass)}},{key:"_showInputError",value:function(e,t){e.classList.add(this._popupElements.inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._popupElements.errorClass)}}])&&n(t.prototype,o),e}(),r={formSelector:".popup__body",inputSelector:".popup__input",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},i=document.querySelector(".popup_zoom-image"),u=document.querySelector(".profile__addbutton"),a=document.querySelector(".popup_add-card"),s=document.querySelector(".cards-container"),c=document.querySelector(".profile__editbutton"),l=document.querySelector(".popup-change"),p=document.querySelector(".popup__input_type_name"),f=document.querySelector(".popup__input_type_about"),h=document.querySelector(".profile__name"),_=document.querySelector(".profile__about"),d=document.querySelector(".profile__editavatar"),y=document.querySelector(".popup_add-card"),v=document.querySelector(".popup-change"),m=document.querySelector(".popup-change-avatar"),b=document.querySelector(".popup-delete"),k=document.querySelector(".profile__avatar");function g(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var E=function(){function e(t,n){var o=t.items,r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=o,this._renderer=r,this._container=n}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&g(t.prototype,n),e}();function S(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var C=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._selectorPopup=t,this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._selectorPopup.classList.add("popup_open"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._selectorPopup.classList.remove("popup_open"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._selectorPopup.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup__background")||t.target.classList.contains("popup__close"))&&e.close()}))}}])&&S(t.prototype,n),e}();function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function L(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function I(e,t,n){return(I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function O(e,t){return(O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function P(e,t){if(t&&("object"===w(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function q(e){return(q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&O(e,t)}(u,e);var t,n,o,r,i=(o=u,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(o);if(r){var n=q(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return P(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._popupImage=t._selectorPopup.querySelector(".popup__image"),t._popupText=t._selectorPopup.querySelector(".popup__text"),t}return t=u,(n=[{key:"open",value:function(e){var t=e.link,n=e.name;this._popupImage.src=t,this._popupImage.alt=n,this._popupText.textContent=n,I(q(u.prototype),"open",this).call(this)}}])&&L(t.prototype,n),u}(C);function R(e){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function B(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function D(e,t,n){return(D="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=A(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function T(e,t){return(T=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function x(e,t){if(t&&("object"===R(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function A(e){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var F=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&T(e,t)}(u,e);var t,n,o,r,i=(o=u,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=A(o);if(r){var n=A(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return x(this,e)});function u(e){var t,n=e.selectorPopup,o=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,n))._popupForm=t._selectorPopup.querySelector(".popup__body"),t._handleFormSubmit=o,t}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputList=this._popupForm.querySelectorAll(".popup__input"),this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;D(A(u.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues()),e.close()}))}},{key:"close",value:function(){D(A(u.prototype),"close",this).call(this),this._popupForm.reset()}}])&&B(t.prototype,n),u}(C);function U(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var V=function(){function e(t){var n=t.userName,o=t.userJob;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=n,this._jobElement=o}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{userName:this._nameElement.textContent,userJob:this._jobElement.textContent}}},{key:"setUserInfo",value:function(e){this._nameElement.textContent=e.name,this._jobElement.textContent=e.about}}])&&U(t.prototype,n),e}();function N(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var J=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=t.url,this._headers=t.headers}var t,n;return t=e,(n=[{key:"_getResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getInitialCards",value:function(){return fetch("".concat(this._url,"/cards"),{method:"GET",headers:this._headers}).then(this._getResponse)}},{key:"patchUserData",value:function(e){return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then(this._getResponse)}},{key:"getUserData",value:function(){return fetch("".concat(this._url,"/users/me"),{method:"GET",headers:this._headers}).then(this._getResponse)}},{key:"postCard",value:function(e){return fetch("".concat(this._url,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then(this._getResponse)}},{key:"putLike",value:function(e){return fetch("".concat(this._url,"/cards/likes/").concat(e),{method:"PUT",headers:this._headers}).then(this._getResponse)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._url,"/cards/likes/").concat(e),{method:"DELETE",headers:this._headers}).then(this._getResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._url,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._getResponse)}},{key:"patchAvatar",value:function(e){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._getResponse)}}])&&N(t.prototype,n),e}();fetch("https://mesto.nomoreparties.co/v1/cohort-27/cards",{headers:{authorization:"ca88055d-8e98-4fcc-94cf-8a7d7aaca5a8"}}).then((function(e){return e.json()})).then((function(e){console.log(e)})),fetch("https://mesto.nomoreparties.co/v1/cohort-27/users/me",{headers:{authorization:"ca88055d-8e98-4fcc-94cf-8a7d7aaca5a8"}}).then((function(e){return e.json()})).then((function(e){console.log(e)}));var z=new J({url:"https://mesto.nomoreparties.co/v1/cohort-27",headers:{authorization:"ca88055d-8e98-4fcc-94cf-8a7d7aaca5a8","Content-Type":"application/json"}});z.getUserData().then((function(e){H.setUserInfo(e)}));var G=new F({selectorPopup:l,handleFormSubmit:function(e){G.close(),z.patchUserData(e).then((function(e){H.setUserInfo(e)}))}});G.setEventListeners();var H=new V({userName:h,userJob:_});c.addEventListener("click",(function(){p.value=H.getUserInfo().userName,f.value=H.getUserInfo().userJob,G.open(),W.cleanInputError()})),z.getInitialCards().then((function(e){var n=new j(i),o=new E({items:e,renderer:function(e){var r=new t(e,"#template",(function(){n.open(e)}),(function(){var e=new F({selectorPopup:b,handleFormSubmit:function(e){z.deleteCard(e).then((function(){r.deleteCard()})).catch((function(e){console.error(e)}))}});e.open(),e.setEventListeners()}),z),i=r.generateCard();o.addItem(i)}},s);o.renderItems(),n.setEventListeners()}));var M=new F({selectorPopup:m,handleFormSubmit:function(){var e=document.querySelector(".popup__input_type_avatar").value;k.style.backgroundImage="url(".concat(e,")"),z.patchAvatar(e)}});d.addEventListener("click",(function(){M.open(),X.cleanInputError()})),M.setEventListeners();var K=new F({selectorPopup:a,handleFormSubmit:function(){var e=[{link:document.querySelector(".popup__input_type_image").value,name:document.querySelector(".popup__input_type_place").value}];z.postCard({valuesInput:e}).then((function(e){var n=new j(i),o=new E({items:e,renderer:function(e){var r=new t(e,"#template",(function(){n.open(e)}),(function(){var e=new F({selectorPopup:b,handleFormSubmit:function(e){z.deleteCard(e).then((function(){r.deleteCard()})).catch((function(e){console.error(e)}))}});e.open(),e.setEventListeners()}),z),i=r.generateCard();o.addItem(i)}},s);n.setEventListeners(),o.renderItems(),K.close()}))}});u.addEventListener("click",(function(){K.open(),Q.cleanInputError()})),K.setEventListeners();var Q=new o(r,y);Q.enableValidation();var W=new o(r,v);W.enableValidation();var X=new o(r,m);X.enableValidation()})();
(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r){var o=e.data,i=e.cardSelector,a=e.cardTemplate,u=e.handleCardClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._api=r,this._popupDeletePic=n,this._name=o.name,this._link=o.link,this._cardId=o.cardId,this._ownerId=o.ownerId,this._myId=o.myId,this._likeIds=o.likeIds,this._isLikedByMe=o.likeIds.includes(this._myId),this._cardSelector=i,this._cardTemplate=a,this._handleCardClick=u,this._generateCard()}var n,r;return n=t,(r=[{key:"cardElement",get:function(){return this._element}},{key:"_getTemplate",value:function(){return this._cardTemplate.content.querySelector(this._cardSelector).cloneNode(!0)}},{key:"_updateDynamicElements",value:function(){this._elementLikeCount.textContent=this._likeIds.length,this._isLikedByMe&&this._elementLike.classList.add("card__like_active")}},{key:"_generateCard",value:function(){this._element=this._getTemplate(),this._elementPic=this._element.querySelector(".card__pic"),this._elementText=this._element.querySelector(".card__text"),this._elementLike=this._element.querySelector(".card__like"),this._elementLikeCount=this._element.querySelector(".card__count"),this._elementDelete=this._element.querySelector(".card__delete"),this._ownerId!==this._myId&&(this._elementDelete.remove(),this._elementDelete=void 0),this._elementPic.src=this._link,this._elementPic.alt=this._name,this._elementText.textContent=this._name,this._updateDynamicElements(),this._setEventListeners()}},{key:"_setEventListeners",value:function(){var e=this;this._elementLike.addEventListener("click",(function(){e._handleLikeClick()})),this._elementDelete&&this._elementDelete.addEventListener("click",(function(){e._handleDeleteClick()})),this._elementPic.addEventListener("click",(function(){e._handleOpenPreviewClick()}))}},{key:"_handleLikeClick",value:function(){var e=this;this._api.toggleLike({cardId:this._cardId,isLikedByMe:this._isLikedByMe}).then((function(t){e._likeIds=t.likes.map((function(e){return e._id})),e._isLikedByMe=!e._isLikedByMe,e._updateDynamicElements()})).catch((function(e){return console.error(e)})),this._elementLike.classList.toggle("card__like_active")}},{key:"_handleDeleteClick",value:function(){this._popupDeletePic.open(),this._popupDeletePic.setInputValues({cardId:this._cardId})}},{key:"_handleOpenPreviewClick",value:function(){this._handleCardClick({src:this._link,description:this._name})}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t){var n=t.data,r=t.validateElement;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._inputSelector=n.inputSelector,this._submitButtonSelector=n.submitButtonSelector,this._inactiveButtonClass=n.inactiveButtonClass,this._inputErrorClass=n.inputErrorClass,this._errorClass=n.errorClass,this._validateElement=r,this._formElement=document.forms[this._validateElement],this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector)}var t,r;return t=e,(r=[{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}},{key:"checkEventInputForm",value:function(){this._inputList.forEach((function(e){e.dispatchEvent(new Event("input"))}))}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.classList.add(this._errorClass),n.textContent=t}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput(this._inputList)?(this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.setAttribute("disabled","")):(this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"resetValidationForm",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t)})),this._toggleButtonState()}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=t,this._cardsContainer=document.querySelector(n)}var t,n;return t=e,(n=[{key:"setItems",value:function(e){this._items=e}},{key:"deleteItem",value:function(e){this._items=this._items.filter((function(t){return t.cardId!==e}))}},{key:"renderCards",value:function(){var e,t,n=this;this._cardsContainer.innerHTML="",(e=this._cardsContainer).append.apply(e,function(e){if(Array.isArray(e))return o(e)}(t=this._items.map((function(e){return n._renderer(e)})))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}},{key:"addItem",value:function(e,t){this._items.unshift(t),this._cardsContainer.prepend(e)}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t),this._handeEscCloseBinded=this._handleEscClose.bind(this),this._closeByMouseBinded=this._closeByMouse.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){var e=this;this._popupElement.classList.add("popup_opened"),setTimeout((function(){e._popupElement.focus()}),100)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened")}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_closeByMouse",value:function(e){e.target.classList.contains("popup_opened")&&this.close(),e.target.classList.contains("popup__close-btn")&&this.close()}},{key:"setEventListeners",value:function(){this._popupElement.addEventListener("keydown",this._handeEscCloseBinded),this._popupElement.addEventListener("mousedown",this._closeByMouseBinded)}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=p(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},f.apply(this,arguments)}function p(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_(e)););return e}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function h(e,t){if(t&&("object"===s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _(e){return _=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},_(e)}var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=_(r);if(o){var n=_(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._imgElem=t._popupElement.querySelector(".popup-preview__img"),t._textElem=t._popupElement.querySelector(".popup-preview__text"),t}return t=a,(n=[{key:"open",value:function(e){var t=e.src,n=e.description;this._imgElem.setAttribute("src",t),this._imgElem.setAttribute("alt",n),this._textElem.textContent=n,f(_(a.prototype),"open",this).call(this)}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=k(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},E.apply(this,arguments)}function k(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}function w(e,t){return w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},w(e,t)}function g(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return O(e)}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&w(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(r);if(o){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return g(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleFormSubmit=t.bind(O(n)),n._form=n._popupElement.querySelector("form"),n._formSubmitElem=n._form.querySelector(".popup__btn"),n}return t=a,(n=[{key:"setInputValues",value:function(e){var t=this;Object.entries(e).forEach((function(e){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[0],a=o[1],u=t._form.elements[i];u&&(u.value=a)}))}},{key:"inputValues",get:function(){return Object.fromEntries(new FormData(this._form).entries())}},{key:"getPopupSubmitElem",value:function(){return this._formSubmitElem}},{key:"setEventListeners",value:function(){E(S(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._handleFormSubmit)}},{key:"close",value:function(){this._form.reset(),E(S(a.prototype),"close",this).call(this)}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var P=function(){function e(t){var n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},(n="_errorHandler")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._url=t.url,this._headers=t.headers}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return fetch("".concat(this._url,"/users/me"),{method:"GET",headers:this._headers}).then(this._errorHandler)}},{key:"editUserInfo",value:function(e){return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then(this._errorHandler)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._url,"/cards"),{method:"GET",headers:this._headers}).then(this._errorHandler)}},{key:"postNewCard",value:function(e){return fetch("".concat(this._url,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify(e)}).then(this._errorHandler)}},{key:"toggleLike",value:function(e){var t=e.cardId,n=e.isLikedByMe;return fetch("".concat(this._url,"/cards/").concat(t,"/likes"),{method:n?"DELETE":"PUT",headers:this._headers}).then(this._errorHandler)}},{key:"cardDelete",value:function(e){return fetch("".concat(this._url,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._errorHandler)}},{key:"avatarUpdate",value:function(e){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._errorHandler)}}])&&I(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t){var n=t.name,r=t.about,o=t.avatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElem=document.querySelector(n),this._aboutElem=document.querySelector(r),this._avatarElem=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElem.textContent,about:this._aboutElem.textContent,avatar:this._avatarElem.src,id:this._id}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about,r=e.avatar,o=e.id;this._nameElem.textContent=t,this._aboutElem.textContent=n,this._avatarElem.src=r,this._id=o}}])&&j(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),T={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__btn",inactiveButtonClass:"popup__btn_disabled",inputErrorClass:"popup__input_incorrect",errorClass:"popup__text-error_active"},D=document.querySelector(".profile__avatar"),B=document.querySelector(".profile__edit-btn"),A=document.querySelector(".profile__add-btn"),x=document.querySelector("#card_template");function q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?q(Object(n),!0).forEach((function(t){U(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):q(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function U(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var V=new a(W,".places__cards"),M=new m(".popup-preview");M.setEventListeners();var H=new C(".popup-edit",(function(e){e.preventDefault();var t=H.inputValues,n=t.popupName,r=t.popupProf,o=H.getPopupSubmitElem();Y(o),z.editUserInfo(R(R({},Q.getUserInfo()),{},{name:n,about:r})).then((function(e){Q.setUserInfo(e)})).catch((function(e){return console.error(e)})).finally((function(){Y(o),H.close()}))}));H.setEventListeners();var N=new C(".popup-add",(function(e){e.preventDefault();var t=N.inputValues,n=t.popupTitle,r=t.popupUrl,o=N.getPopupSubmitElem();Y(o),z.postNewCard({name:n,link:r}).then((function(e){var t={name:e.name,link:e.link,likeIds:e.likes.map((function(e){return e._id})),myId:Q.getUserInfo().id,ownerId:e.owner._id,cardId:e._id};V.addItem(W(t),t)})).catch((function(e){return console.error(e)})).finally((function(){Y(o),N.close()}))}));N.setEventListeners();var F=new C(".popup-delete",(function(e){e.preventDefault();var t=F.inputValues.cardId,n=F.getPopupSubmitElem();n.textContent="Удаление...",z.cardDelete(t).then((function(){V.deleteItem(t),V.renderCards(),F.close()})).catch((function(e){return console.error(e)})).finally((function(){n.textContent="Да",F.close()}))}));F.setEventListeners();var J=new C(".popup-avatar",(function(e){e.preventDefault();var t=J.inputValues.popupAvatar,n=J.getPopupSubmitElem();Y(n),z.avatarUpdate(t).then((function(e){Q.setUserInfo(e)})).catch((function(e){return console.error(e)})).finally((function(){Y(n),J.close()}))}));J.setEventListeners();var G=new r({data:T,validateElement:"formProfile"});G.enableValidation();var $=new r({data:T,validateElement:"formAddPic"});$.enableValidation(),new r({data:T,validateElement:"formAvatar"}).enableValidation();var z=new P({url:"https://mesto.nomoreparties.co/v1/cohort-41",headers:{authorization:"b1358c2e-a18d-4d01-8b45-12870e20906b","Content-Type":"application/json"}}),K=z.getInitialCards();z.getUserInfo().then((function(e){var t=e.name,n=e.about,r=e._id,o=e.avatar;Q.setUserInfo({name:t,about:n,avatar:o,id:r}),K.then((function(e){V.setItems(e.sort((function(e,t){return new Date(t.createdAt)-new Date(e.createdAt)})).map((function(e){return{name:e.name,link:e.link,likeIds:e.likes.map((function(e){return e._id})),myId:r,ownerId:e.owner._id,cardId:e._id}}))),V.renderCards()})).catch((function(e){return console.error(e)}))}));var Q=new L({name:".profile__name",about:".profile__prof",avatar:".profile__avatar"});function W(e){return new t({data:e,cardSelector:".card",cardTemplate:x,handleCardClick:X},F,z).cardElement}function X(e){var t=e.src,n=e.description;M.open({src:t,description:n})}function Y(e){e.textContent="Сохранение..."===e.textContent?"Сохранить":"Сохранение..."}B.addEventListener("click",(function(){var e=Q.getUserInfo(),t=e.name,n=e.about;H.setInputValues({popupName:t,popupProf:n}),G.checkEventInputForm(),H.open()})),A.addEventListener("click",(function(){$.resetValidationForm(),N.open()})),D.addEventListener("click",(function(){J.open()}))})();
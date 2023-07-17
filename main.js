(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t){e.target.querySelector(".form__button-save").textContent=t}function n(e){"Escape"===e.key&&o(document.querySelector(".popup_opened"))}function r(e){e.classList.add("popup_opened"),document.addEventListener("keydown",n)}function o(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",n)}e.d({},{m:()=>F});var c=document.querySelector(".elements");function a(e,t){e.target.parentElement.querySelector(".element__like-counter").textContent=t.likes.length,e.target.classList.toggle("element__like_active")}function i(e){var t=c.querySelector("#element").content.querySelector(".element").cloneNode(!0),n=t.querySelector(".element__image"),o=t.querySelector(".element__like"),a=t.querySelector(".element__like-counter"),i=t.querySelector(".element__trash");return n.src=e.link,n.alt=e.name,t.querySelector(".element__title").textContent=e.name,a.textContent=e.likes.length,o.classList.remove("element__like_active"),e.likes.forEach((function(e){e._id===u&&o.classList.add("element__like_active")})),o.addEventListener("click",(function(t){o.classList.contains("element__like_active")?_(t,e._id):m(t,e._id)})),e.owner._id!==u?i.remove():i.addEventListener("click",(function(t){return f(t,e._id)})),n.addEventListener("click",(function(e){r(h),y.src=e.target.src,y.alt=e.target.alt,S.textContent=e.target.parentElement.querySelector(".element__title").textContent})),t}var u,l={baseUrl:"https://nomoreparties.co/v1/plus-cohort-26",headers:{authorization:"740c75ad-e81a-4599-86ed-6a58ee20affd","Content-Type":"application/json"}},s=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},d=function(e){console.log(e)},f=function(e,t){return fetch("".concat(l.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:l.headers}).then(s).then((function(){!function(e){e.target.parentElement.remove()}(e)})).catch(d)},m=function(e,t){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:l.headers}).then(s).then((function(t){a(e,t)})).catch(d)},_=function(e,t){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:l.headers}).then(s).then((function(t){a(e,t)})).catch(d)},p=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},v=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))},h=document.querySelector(".popup_view"),y=h.querySelector(".popup__img"),S=h.querySelector(".popup__img-title"),q=document.querySelector(".profile"),b=q.querySelector(".profile__button-edit"),E=q.querySelector(".profile__button-add"),L=q.querySelector(".profile__name"),C=q.querySelector(".profile__description"),k=q.querySelector(".profile__avatar"),g=document.querySelector(".popup_edit"),x=g.querySelector(".form"),A=x.querySelector(".form__input_edit_name"),U=x.querySelector(".form__input_edit_description"),T=document.querySelector(".popup_add"),B=T.querySelector(".form"),O=B.querySelector(".form__input_add_title"),P=B.querySelector(".form__input_add_url"),w=document.querySelector(".popup_avatar"),D=w.querySelector(".form"),j=D.querySelector(".form__input_ava_url");function N(e){L.textContent=e.name,C.textContent=e.about,k.src=e.avatar,u=e._id}function J(e){Array.from(e.querySelectorAll(F.inputSelector)).forEach((function(t){p(e,t,F)}))}function M(e){var t=Array.from(e.querySelectorAll(F.inputSelector)),n=e.querySelector(F.submitButtonSelector);v(t,n,F.inactiveButtonClass)}function H(e){(e.target.classList.contains("popup__button-close")||e.target===e.currentTarget)&&o(e.currentTarget)}var V=document.querySelectorAll(".popup");fetch("".concat(l.baseUrl,"/users/me"),{headers:l.headers}).then(s).then((function(e){return N(e)})).catch(d),x.addEventListener("submit",(function(e){e.preventDefault(),t(e,"Сохранение..."),function(e,n,r){fetch("".concat(l.baseUrl,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify({name:n.name,about:n.about})}).then(s).then((function(e){N(e)})).catch(d).finally((function(){t(e,"Сохранить")}))}(e,{name:A.value,about:U.value}),o(g)})),B.addEventListener("submit",(function(e){e.preventDefault(),t(e,"Сохранение..."),function(e,n,r){fetch("".concat(l.baseUrl,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify({name:n.name,link:n.link})}).then(s).then((function(e){var t;t=e,c.prepend(i(t))})).catch(d).finally((function(){t(e,r)}))}(e,{name:O.value,link:P.value},"Создать"),o(T)})),D.addEventListener("submit",(function(e){e.preventDefault(),t(e,"Сохранение..."),function(e,n,r){fetch("".concat(l.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:n})}).then(s).then((function(e){N(e)})).catch(d).finally((function(){t(e,"Сохранить")}))}(e,j.value),o(w)})),b.addEventListener("click",(function(){A.value=L.textContent,U.value=C.textContent,r(g),J(g),M(g)})),E.addEventListener("click",(function(){B.reset(),r(T),J(T),M(T)})),k.addEventListener("click",(function(){D.reset(),r(w),J(w),M(w)})),V.forEach((function(e){e.addEventListener("mousedown",H)}));var z,F={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__button-save",inactiveButtonClass:"form__button-save_disabled",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"};z=F,Array.from(document.querySelectorAll(z.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);v(n,r,t.inactiveButtonClass),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?p(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),v(n,r,t.inactiveButtonClass)}))}))}(e,z)})),fetch("".concat(l.baseUrl,"/cards"),{headers:l.headers}).then(s).then((function(e){e.forEach((function(e){c.append(i(e))}))})).catch(d)})();
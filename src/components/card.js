import { openPopup } from "./utils.js"
import { popupViewContainer, popupImg, popupTitle, userId } from "./modal.js"

const elementsContainer = document.querySelector('.elements');


// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];
export function removeCard(item) {
  // const elementList = Array.from(elementsContainer.querySelectorAll('.element'));
  // elementList.forEach((element) => {
  //   if (element.value === item._id)
  // });
  // evt => evt.target.parentElement.remove()
};

import { deleteCard } from "./api.js";

function createCard(item) {
  const cardTemplate = elementsContainer.querySelector('#element').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const imageElement = cardElement.querySelector('.element__image');
  const likeElement = cardElement.querySelector('.element__like');
  const trashElement = cardElement.querySelector('.element__trash');

  cardElement.value = item._id;
  imageElement.src = item.link;
  imageElement.alt = item.name;
  cardElement.querySelector('.element__title').textContent = item.name;

  likeElement.addEventListener('click',
    evt => evt.target.classList.toggle('element__like_active')
  );

  if (item.owner._id !== userId) {
    trashElement.remove();
  } else {
    trashElement.addEventListener('click', deleteCard(item._id));
  }

  imageElement.addEventListener('click', (evt) => {
    openPopup(popupViewContainer);
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupTitle.textContent = evt.target.parentElement.querySelector('.element__title').textContent;
  });

  return cardElement;
};

export function prependCard(item) {
  elementsContainer.prepend(createCard(item));
};

export function initCards(initialCards) {
  initialCards.forEach(item => {
    elementsContainer.append(createCard(item));
  });
};

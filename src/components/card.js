import { openPopup } from "./utils.js"
import { popupViewContainer, popupImg, popupTitle, userId } from "./modal.js"
import { deleteCard, addLike, removeLike } from "./api.js";

const elementsContainer = document.querySelector('.elements');

export function removeCard(evt) {
  evt.target.parentElement.remove();
};

export function updateLike(evt, card) {
  evt.target.parentElement.querySelector('.element__like-counter').textContent = card.likes.length;
  evt.target.classList.toggle('element__like_active');
};

function createCard(item) {
  const cardTemplate = elementsContainer.querySelector('#element').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const imageElement = cardElement.querySelector('.element__image');
  const likeElement = cardElement.querySelector('.element__like');
  const likeCounterElement = cardElement.querySelector('.element__like-counter');
  const trashElement = cardElement.querySelector('.element__trash');

  imageElement.src = item.link;
  imageElement.alt = item.name;
  cardElement.querySelector('.element__title').textContent = item.name;
  likeCounterElement.textContent = item.likes.length;

  likeElement.classList.remove('element__like_active');

  item.likes.forEach((user) => {
    if (user._id === userId) {
      likeElement.classList.add('element__like_active');
    }
  });

  likeElement.addEventListener('click', (evt) => {
    if (!likeElement.classList.contains('element__like_active')) {
      addLike(evt, item._id);
    } else {
      removeLike(evt, item._id);
    }
  });

  if (item.owner._id !== userId) {
    trashElement.remove();
  } else {
    trashElement.addEventListener('click', (evt) => deleteCard(evt, item._id));
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

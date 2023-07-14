import { openPopup } from "./utils.js"
import { popupViewContainer } from "./modal.js"

const elementsContainer = document.querySelector('.elements');
const popupImg = popupViewContainer.querySelector('.popup__img');
const popupTitle = popupViewContainer.querySelector('.popup__img-title');

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(item) {
  const cardTemplate = elementsContainer.querySelector('#element').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const imageElement = cardElement.querySelector('.element__image');
  const likeElement = cardElement.querySelector('.element__like');
  const trashElement = cardElement.querySelector('.element__trash');

  imageElement.src = item.link;
  imageElement.alt = item.name;
  cardElement.querySelector('.element__title').textContent = item.name;

  likeElement.addEventListener('click',
    evt => evt.target.classList.toggle('element__like_active')
  );

  trashElement.addEventListener('click',
    evt => evt.target.parentElement.remove()
  );

  imageElement.addEventListener('click', (evt) => {
    openPopup(popupViewContainer);
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupTitle.textContent = evt.target.parentElement.querySelector('.element__title').textContent;
  });

  return cardElement;
};

function prependCard(item) {
  elementsContainer.prepend(createCard(item));
};

function initCards() {
  initialCards.forEach(item => {
    elementsContainer.append(createCard(item));
  });
};

export { initCards, prependCard };

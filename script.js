const profileContainer = document.querySelector('.profile');
const profileEditButton = profileContainer.querySelector('.profile__button-edit');
const profileAddButton = profileContainer.querySelector('.profile__button-add');
const profileName = profileContainer.querySelector('.profile__name');
const profileDescription = profileContainer.querySelector('.profile__description');

const popupEditContainer = document.querySelector('.popup_edit');
const popupEditForm = popupEditContainer.querySelector('.form');
const popupEditFormInputItems = popupEditForm.querySelectorAll('.form__input');
const popupEditCloseButton = popupEditContainer.querySelector('.popup__button-close');

const popupAddContainer = document.querySelector('.popup_add');
const popupAddForm = popupAddContainer.querySelector('.form');
const popupAddFormInputItems = popupAddForm.querySelectorAll('.form__input');
const popupAddCloseButton = popupAddContainer.querySelector('.popup__button-close');


const popupViewContainer = document.querySelector('.popup_view');
const popupViewCloseButton = popupViewContainer.querySelector('.popup__button-close');
const popupImg = popupViewContainer.querySelector('.popup__img');
const popupTitle = popupViewContainer.querySelector('.popup__img-title');

const elementsContainer = document.querySelector('.elements');

function openPopup(element) {
  element.classList.add('popup_opened');
}

function closePopup(element) {
  element.classList.remove('popup_opened');
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditFormInputItems[0].value;
  profileDescription.textContent = popupEditFormInputItems[1].value;
  closePopup(popupEditContainer);
}

popupEditForm.addEventListener('submit', handleFormEditSubmit);

popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEditContainer);
});

profileEditButton.addEventListener('click', () => {
  popupEditFormInputItems[0].value = profileName.textContent;
  popupEditFormInputItems[1].value = profileDescription.textContent;
  openPopup(popupEditContainer);
});

const initialCards = [
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

popupViewCloseButton.addEventListener('click', () => {
  closePopup(popupViewContainer);
});

initialCards.forEach(item => {
  elementsContainer.append(createCard(item));
});

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: popupAddFormInputItems[0].value,
    link: popupAddFormInputItems[1].value
  }
  elementsContainer.prepend(createCard(item));
  closePopup(popupAddContainer);
}

popupAddForm.addEventListener('submit', handleFormAddSubmit);

popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAddContainer);
});

profileAddButton.addEventListener('click', () => {
  popupAddForm.reset();
  openPopup(popupAddContainer);
});


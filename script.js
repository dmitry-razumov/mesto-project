const profileContainer = document.querySelector('.profile');
const profileEditButton = profileContainer.querySelector('.profile__button-edit');
const profileAddButton = profileContainer.querySelector('.profile__button-add');
const profileName = profileContainer.querySelector('.profile__name');
const profileDescription = profileContainer.querySelector('.profile__description');

const popupEditContainer = document.querySelector('.popup_edit');
const popupAddContainer = document.querySelector('.popup_add');
const popupViewContainer = document.querySelector('.popup_view');

const elementsContainer = document.querySelector('.elements');

function popupFormOpen(element) {
  element.classList.add('popup_opened');
}

function popupFormClose(element) {
  element.classList.remove('popup_opened');
}

function getPopupFormInputItems(popupForm) {
  const popupFormInputItems = popupForm.querySelectorAll('.form__input');
  return popupFormInputItems;
}



function formEditSubmitHandler(evt) {
  evt.preventDefault();
  const popupFormInputItems = getPopupFormInputItems(popupEditContainer);

  profileName.textContent = popupFormInputItems[0].value;
  profileDescription.textContent = popupFormInputItems[1].value;
  popupFormClose(popupEditContainer);
}

profileEditButton.addEventListener('click', () => {
  const popupCloseButton = popupEditContainer.querySelector('.popup__button-close');
  const popupForm = popupEditContainer.querySelector('.form');
  const popupFormInputItems = getPopupFormInputItems(popupForm);

  popupFormInputItems[0].value = profileName.textContent;
  popupFormInputItems[1].value = profileDescription.textContent;
  popupFormOpen(popupEditContainer);

  popupCloseButton.addEventListener('click', () => {
    popupFormClose(popupEditContainer);
  });

  popupForm.addEventListener('submit', formEditSubmitHandler);
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
    const popupCloseButton = popupViewContainer.querySelector('.popup__button-close');
    const popupImg = popupViewContainer.querySelector('.popup__img');
    const popupTitle = popupViewContainer.querySelector('.popup__img-title');
    popupFormOpen(popupViewContainer);

    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupTitle.textContent = evt.target.parentElement.querySelector('.element__title').textContent;

    popupCloseButton.addEventListener('click', () => {
      popupFormClose(popupViewContainer);
    });
  });

  return cardElement;
};

initialCards.forEach(item => {
  elementsContainer.append(createCard(item));
});

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const popupFormInputItems = getPopupFormInputItems(popupAddContainer);
  const item = {
    name: popupFormInputItems[0].value,
    link: popupFormInputItems[1].value
  }
  elementsContainer.prepend(createCard(item));
  popupFormClose(popupAddContainer);
}

profileAddButton.addEventListener('click', () => {
  const popupCloseButton = popupAddContainer.querySelector('.popup__button-close');
  const popupForm = popupAddContainer.querySelector('.form');
  popupForm.reset();
  popupFormOpen(popupAddContainer);
  popupCloseButton.addEventListener('click', () => {
    popupFormClose(popupAddContainer);
  });
  popupForm.addEventListener('submit', formAddSubmitHandler);
});

import {prependCard} from "./card.js"
import {openPopup, closePopup} from "./util.js";

export const popupViewContainer = document.querySelector('.popup_view');

const profileContainer = document.querySelector('.profile');
export const profileEditButton = profileContainer.querySelector('.profile__button-edit');
export const profileAddButton = profileContainer.querySelector('.profile__button-add');
const profileName = profileContainer.querySelector('.profile__name');
const profileDescription = profileContainer.querySelector('.profile__description');

const popupEditContainer = document.querySelector('.popup_edit');
export const popupEditForm = popupEditContainer.querySelector('.form');
const popupEditFormInputItems = popupEditForm.querySelectorAll('.form__input');

const popupAddContainer = document.querySelector('.popup_add');
export const popupAddForm = popupAddContainer.querySelector('.form');
const popupAddFormInputItems = popupAddForm.querySelectorAll('.form__input');

const POPUP__BUTTON_CLOSE = 'popup__button-close';

function updateProfileItems() {
  popupEditFormInputItems[0].value = profileName.textContent;
  popupEditFormInputItems[1].value = profileDescription.textContent;
};

export function handleProfileEditButton() {
  updateProfileItems();
  openPopup(popupEditContainer);
};

export function handleprofileAddButton() {
  popupAddForm.reset();
  openPopup(popupAddContainer);
};

export function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditFormInputItems[0].value;
  profileDescription.textContent = popupEditFormInputItems[1].value;
  closePopup(popupEditContainer);
}

export function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: popupAddFormInputItems[0].value,
    link: popupAddFormInputItems[1].value
  }
  prependCard(item);
  closePopup(popupAddContainer);
}

export function handlePopupClick(evt) {
  if (evt.target.classList.contains(POPUP__BUTTON_CLOSE)
        || evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};


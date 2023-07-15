import { selectorSet } from "../pages/index.js";
import { prependCard } from "./card.js"
import { openPopup, closePopup } from "./utils.js";
import { hideInputError, toggleButtonState } from "./validate.js";

export const popupViewContainer = document.querySelector('.popup_view');

const profileContainer = document.querySelector('.profile');
export const profileEditButton = profileContainer.querySelector('.profile__button-edit');
export const profileAddButton = profileContainer.querySelector('.profile__button-add');
const profileName = profileContainer.querySelector('.profile__name');
const profileDescription = profileContainer.querySelector('.profile__description');

const popupEditContainer = document.querySelector('.popup_edit');
export const popupEditForm = popupEditContainer.querySelector('.form');
const popupEditFormInputName = popupEditForm.querySelector('.form__input_edit_name');
const popupEditFormInputDescription = popupEditForm.querySelector('.form__input_edit_description');

const popupAddContainer = document.querySelector('.popup_add');
export const popupAddForm = popupAddContainer.querySelector('.form');
const popupAddFormInputTitle = popupAddForm.querySelector('.form__input_add_title');
const popupAddFormInputUrl = popupAddForm.querySelector('.form__input_add_url');

const POPUP__BUTTON_CLOSE = 'popup__button-close';

function updateProfileItems() {
  popupEditFormInputName.value = profileName.textContent;
  popupEditFormInputDescription.value = profileDescription.textContent;
};

function clearInputErrorMessages(element) {
  const inputList = Array.from(element.querySelectorAll(selectorSet.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(element, inputElement, selectorSet);
  });
};

function disableSubmitButton(element) {
  const inputList = Array.from(element.querySelectorAll(selectorSet.inputSelector));
  const buttonElement = element.querySelector(selectorSet.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectorSet.inactiveButtonClass);
}

export function handleProfileEditButton() {
  updateProfileItems();
  openPopup(popupEditContainer);
  clearInputErrorMessages(popupEditContainer);
  disableSubmitButton(popupEditContainer);
};

export function handleprofileAddButton() {
  popupAddForm.reset();
  openPopup(popupAddContainer);
  clearInputErrorMessages(popupAddContainer);
  disableSubmitButton(popupAddContainer);
};

export function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditFormInputName.value;
  profileDescription.textContent = popupEditFormInputDescription.value;
  closePopup(popupEditContainer);
};

export function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: popupAddFormInputTitle.value,
    link: popupAddFormInputUrl.value
  }
  prependCard(item);
  closePopup(popupAddContainer);
};

export function handlePopupClick(evt) {
  if (evt.target.classList.contains(POPUP__BUTTON_CLOSE)
        || evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};


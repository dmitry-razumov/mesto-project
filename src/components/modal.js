import { selectorSet } from "../pages/index.js";
import { addCard, updateUser, updateAvatar } from "./api.js"
import { openPopup, closePopup, setButtonText } from "./utils.js";
import { hideInputError, toggleButtonState } from "./validate.js";

export const popupViewContainer = document.querySelector('.popup_view');
export const popupImg = popupViewContainer.querySelector('.popup__img');
export const popupTitle = popupViewContainer.querySelector('.popup__img-title');

const profileContainer = document.querySelector('.profile');
export const profileEditButton = profileContainer.querySelector('.profile__button-edit');
export const profileAddButton = profileContainer.querySelector('.profile__button-add');
export const profileName = profileContainer.querySelector('.profile__name');
export const profileDescription = profileContainer.querySelector('.profile__description');
export const profileAvatar = profileContainer.querySelector('.profile__avatar');

const popupEditContainer = document.querySelector('.popup_edit');
export const popupEditForm = popupEditContainer.querySelector('.form');
const popupEditFormInputName = popupEditForm.querySelector('.form__input_edit_name');
const popupEditFormInputDescription = popupEditForm.querySelector('.form__input_edit_description');

const popupAddContainer = document.querySelector('.popup_add');
export const popupAddForm = popupAddContainer.querySelector('.form');
const popupAddFormInputTitle = popupAddForm.querySelector('.form__input_add_title');
const popupAddFormInputUrl = popupAddForm.querySelector('.form__input_add_url');

const popupAvatarContainer = document.querySelector('.popup_avatar');
export const popupAvatarForm = popupAvatarContainer.querySelector('.form');
const popupAvatarFormInputUrl = popupAvatarForm.querySelector('.form__input_ava_url');

const POPUP__BUTTON_CLOSE = 'popup__button-close';

export let userId;

export function updateProfileInfo(user) {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileAvatar.src = user.avatar;
  userId = user._id;
};

function updateEditFormInputs() {
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
  updateEditFormInputs();
  openPopup(popupEditContainer);
  clearInputErrorMessages(popupEditContainer);
  disableSubmitButton(popupEditContainer);
};

export function handleProfileAddButton() {
  popupAddForm.reset();
  openPopup(popupAddContainer);
  clearInputErrorMessages(popupAddContainer);
  disableSubmitButton(popupAddContainer);
};

export function handleProfileAvatar() {
  popupAvatarForm.reset();
  openPopup(popupAvatarContainer);
  clearInputErrorMessages(popupAvatarContainer);
  disableSubmitButton(popupAvatarContainer);
};

export function handleFormEditSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt, 'Сохранение...');
  updateUser(evt, {
    name:popupEditFormInputName.value,
    about:popupEditFormInputDescription.value
  }, 'Сохранить');
  closePopup(popupEditContainer);
};

export function handleFormAddSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt, 'Сохранение...');
  addCard(evt, {
    name: popupAddFormInputTitle.value,
    link: popupAddFormInputUrl.value
  }, 'Создать');
  closePopup(popupAddContainer);
};

export function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt, 'Сохранение...');
  updateAvatar(evt, popupAvatarFormInputUrl.value, 'Сохранить');
  closePopup(popupAvatarContainer);
};

export function handlePopupClick(evt) {
  if (evt.target.classList.contains(POPUP__BUTTON_CLOSE)
        || evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};



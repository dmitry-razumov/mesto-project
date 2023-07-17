import { selectorSet, logError } from "../pages/index.js";
import { addCard, updateUser, updateAvatar } from "./api.js"
import { prependCard } from "./card.js";
import { openPopup, closePopup } from "./utils.js";
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

function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      logError(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

export function handleFormEditSubmit(evt) {
  function makeRequest() {
    return updateUser(popupEditFormInputName.value, popupEditFormInputDescription.value)
      .then((userData) => {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closePopup(popupEditContainer);
      });
  }
  handleSubmit(makeRequest, evt);
}

export function handleFormAddSubmit(evt) {
  function makeRequest() {
    return addCard(popupAddFormInputTitle.value, popupAddFormInputUrl.value)
      .then((card) => {
        prependCard(card);
        closePopup(popupAddContainer);
      });
  }
  handleSubmit(makeRequest, evt);
}

export function handleFormAvatarSubmit(evt) {
  function makeRequest() {
    return updateAvatar(popupAvatarFormInputUrl.value)
      .then((userData) => {
        profileAvatar.src = userData.avatar;
        closePopup(popupAvatarContainer);
      });
  }
  handleSubmit(makeRequest, evt);
};

export function handlePopupClick(evt) {
  if (evt.target.classList.contains(POPUP__BUTTON_CLOSE)
        || evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};



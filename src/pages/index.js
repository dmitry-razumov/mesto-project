import './index.css';
// import { initCards } from "../components/card.js"
import {
  handleFormEditSubmit,
  handleFormAddSubmit,
  handleProfileEditButton,
  handleProfileAddButton,
  handlePopupClick,
  profileEditButton,
  profileAddButton,
  popupEditForm,
  popupAddForm,

  profileName,
  profileDescription
} from "../components/modal.js"
import { enableValidation } from "../components/validate.js";
import { getUser, getCards } from "../components/api.js"

const popupContainers = document.querySelectorAll('.popup');

getUser();

popupEditForm.addEventListener('submit', handleFormEditSubmit);
popupAddForm.addEventListener('submit', handleFormAddSubmit);

profileEditButton.addEventListener('click', handleProfileEditButton);
profileAddButton.addEventListener('click', handleProfileAddButton);

popupContainers.forEach((popupContainer) => {
  popupContainer.addEventListener('mousedown', handlePopupClick)
});

export const selectorSet = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

enableValidation(selectorSet);
getCards();

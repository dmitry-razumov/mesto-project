import {initCards} from "./components/card.js"
import {
  handleFormEditSubmit,
  handleFormAddSubmit,
  handleProfileEditButton,
  handleprofileAddButton,
  handlePopupClick,
  profileEditButton,
  profileAddButton,
  popupEditForm,
  popupAddForm
} from "./components/modal.js"
import { enableValidation } from "./components/validate.js";

const popupContainers = document.querySelectorAll('.popup');

initCards();

popupEditForm.addEventListener('submit', handleFormEditSubmit);
popupAddForm.addEventListener('submit', handleFormAddSubmit);

profileEditButton.addEventListener('click', handleProfileEditButton);
profileAddButton.addEventListener('click', handleprofileAddButton);

popupContainers.forEach((popupContainer) => {
  popupContainer.addEventListener('click', handlePopupClick)
});

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

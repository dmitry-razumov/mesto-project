import './index.css';
import {
  handleFormEditSubmit,
  handleFormAddSubmit,
  handleFormAvatarSubmit,
  handleProfileEditButton,
  handleProfileAddButton,
  handleProfileAvatar,
  handlePopupClick,
  profileEditButton,
  profileAddButton,
  profileAvatar,
  popupEditForm,
  popupAddForm,
  popupAvatarForm
} from "../components/modal.js"
import { enableValidation } from "../components/validate.js";
import { getUser, getCards } from "../components/api.js"
import { updateProfileInfo } from '../components/modal.js';
import { initCards } from '../components/card';

const popupContainers = document.querySelectorAll('.popup');

export const logError = (err) => {
  console.log(err);
};

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    updateProfileInfo(user);
    initCards(cards);
  })
  .catch(logError);

popupEditForm.addEventListener('submit', handleFormEditSubmit);
popupAddForm.addEventListener('submit', handleFormAddSubmit);
popupAvatarForm.addEventListener('submit', handleFormAvatarSubmit);

profileEditButton.addEventListener('click', handleProfileEditButton);
profileAddButton.addEventListener('click', handleProfileAddButton);
profileAvatar.addEventListener('click', handleProfileAvatar);

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

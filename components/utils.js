import { selectorSet } from "../index.js";
import { hideInputError } from "./validate.js";

function handleKeyEsc(evt) {
  if (evt.key === 'Escape') {
    const currentOpenedPopup = document.querySelector('.popup_opened');
    closePopup(currentOpenedPopup);
  }
};

function clearInputErrorMessages(element) {
  const inputList = Array.from(element.querySelectorAll(selectorSet.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(element, inputElement, selectorSet);
  });
};

export function openPopup(element) {
  element.classList.add('popup_opened', );
  document.addEventListener('keydown', handleKeyEsc)
};

export function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyEsc);
  clearInputErrorMessages(element);
};

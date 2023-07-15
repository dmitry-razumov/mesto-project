const showInputError = (formElement, inputElement, errorMessage, objs) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objs.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objs.errorClass);
};

export const hideInputError = (formElement, inputElement, objs) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objs.inputErrorClass);
  errorElement.classList.remove(objs.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, objs) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objs);
  } else {
    hideInputError(formElement, inputElement, objs);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, objs) => {
  const inputList = Array.from(formElement.querySelectorAll(objs.inputSelector));
  const buttonElement = formElement.querySelector(objs.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, objs.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, objs);
      toggleButtonState(inputList, buttonElement, objs.inactiveButtonClass);
    });
  });
};

export function enableValidation(objs) {
  const formList = Array.from(document.querySelectorAll(objs.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, objs);
  });
};

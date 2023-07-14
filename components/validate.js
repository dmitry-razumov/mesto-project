const showInputError = (formElement, inputElement, errorMessage, objs) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objs.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objs.errorClass);
};

const hideInputError = (formElement, inputElement, objs) => {
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
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, objs) => {
  const inputList = Array.from(formElement.querySelectorAll(objs.inputSelector));
  const buttonElement = formElement.querySelector(objs.submitButtonSelector);
  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, objs.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, objs);
      // чтобы проверять его при изменении любого из полей
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

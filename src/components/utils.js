export function setButtonText(evt, text) {
  evt.submitter.textContent = text;
};

function handleKeyEsc(evt) {
  if (evt.key === 'Escape') {
    const currentOpenedPopup = document.querySelector('.popup_opened');
    closePopup(currentOpenedPopup);
  }
};

export function openPopup(element) {
  element.classList.add('popup_opened', );
  document.addEventListener('keydown', handleKeyEsc)
};

export function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyEsc);
};

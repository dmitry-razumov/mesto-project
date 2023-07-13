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

const popupContainers = document.querySelectorAll('.popup');

initCards();

popupEditForm.addEventListener('submit', handleFormEditSubmit);
popupAddForm.addEventListener('submit', handleFormAddSubmit);

profileEditButton.addEventListener('click', handleProfileEditButton);
profileAddButton.addEventListener('click', handleprofileAddButton);

popupContainers.forEach((popupContainer) => {
  popupContainer.addEventListener('click', handlePopupClick)
});

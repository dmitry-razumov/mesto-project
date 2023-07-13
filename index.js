import {initCards} from "./components/card.js"
import {
  handleFormEditSubmit,
  handleFormAddSubmit,
  popupViewContainer,
  popupViewCloseButton,
  profileEditButton,
  profileAddButton,
  popupEditContainer,
  popupEditForm,
  popupEditCloseButton,
  popupAddContainer,
  popupAddForm,
  popupAddCloseButton,
  updateProfileItems
} from "./components/modal.js"
import {openPopup, closePopup} from "./components/util.js";

initCards();

popupEditForm.addEventListener('submit', handleFormEditSubmit);

popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEditContainer);
});

profileEditButton.addEventListener('click', () => {
  updateProfileItems();
  openPopup(popupEditContainer);
});

popupAddForm.addEventListener('submit', handleFormAddSubmit);

popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAddContainer);
});

profileAddButton.addEventListener('click', () => {
  popupAddForm.reset();
  openPopup(popupAddContainer);
});

popupViewCloseButton.addEventListener('click', () => {
  closePopup(popupViewContainer);
});

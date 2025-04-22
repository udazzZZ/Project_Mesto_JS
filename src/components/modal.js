// // Функция для открытия попапа
// function openModal(popup, onOpenPopup) {
// 	onOpenPopup(popup);
// 	document.addEventListener("keydown", closeByEsc);
// 	popup.classList.add("popup_is-opened");
// }

// // Функция для закрытия попапа
// function closeModal(popup, onClosePopup) {
// 	popup.classList.remove("popup_is-opened");
// 	onClosePopup(popup);
// 	document.removeEventListener("keydown", closeByEsc);
// }

// // Функкция для обработки события нажатия на клавишу Esc при закрытии попапа
// function closeByEsc(evt) {
// 	if (evt.key === "Escape") {
// 		const openedPopup = document.querySelector(".popup_is-opened");
// 		closeModal(openedPopup);
// 	}
// }

// export { openModal, closeModal };

const modal = (onClosePopup, onOpenPopup) => {
  const openModal = (popup) => {
    onOpenPopup(popup);
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeByEsc);
  };

  const closeModal = (popup) => {
    popup.classList.remove("popup_is-opened");
    onClosePopup(popup);
    document.removeEventListener("keydown", closeByEsc);
  };

  function closeByEsc(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      closeModal(openedPopup, onClosePopup);
    }
  }

  return {
    openModal,
    closeModal,
  };
};

export { modal };
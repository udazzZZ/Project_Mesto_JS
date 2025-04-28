// Функция для создания карточки
function createCard(name, link, imagePopup, imagePopupImage, imagePopupCaption, openModal) {
	const cardTemplate = document.querySelector("#card-template").content;
	const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

	const cardName = cardElement.querySelector(".card__title");
	const cardImage = cardElement.querySelector(".card__image");

	cardName.textContent = name;
	cardImage.src = link;
	cardImage.alt = name;

	const likeButton = cardElement.querySelector(".card__like-button");
	likeButton.addEventListener("click", () =>
		likeButton.classList.toggle("card__like-button_is-active")
	);

	const deleteButton = cardElement.querySelector(".card__delete-button");
	deleteButton.addEventListener("click", () =>
		deleteButton.closest(".card").remove()
	);

	cardImage.addEventListener("click", () => {
		imagePopupImage.src = link;
		imagePopupImage.alt = name;
		imagePopupCaption.textContent = name;
		openModal(imagePopup);
	});

	return cardElement;
}

export { createCard };

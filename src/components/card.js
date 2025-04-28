// Функция для создания карточки
function createCard(
	name,
	link,
	likes,
	ownerId,
	userId,
	imagePopup,
	imagePopupImage,
	imagePopupCaption,
	openModal
) {
	const cardTemplate = document.querySelector("#card-template").content;
	const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

	const cardName = cardElement.querySelector(".card__title");
	const cardImage = cardElement.querySelector(".card__image");
	const cardLikesCount = cardElement.querySelector(".card__like-count");
	const deleteButton = cardElement.querySelector(".card__delete-button");

	cardName.textContent = name;
	cardImage.src = link;
	cardImage.alt = name;
	cardLikesCount.textContent = likes.length;

	const likeButton = cardElement.querySelector(".card__like-button");
	likeButton.addEventListener("click", () =>
		likeButton.classList.toggle("card__like-button_is-active")
	);

	if (ownerId === userId) {
		deleteButton.addEventListener("click", () =>
			deleteButton.closest(".card").remove()
		);
	} else {
		deleteButton.disabled = true;
		deleteButton.style.display = "none";
	}

	cardImage.addEventListener("click", () => {
		imagePopupImage.src = link;
		imagePopupImage.alt = name;
		imagePopupCaption.textContent = name;
		openModal(imagePopup);
	});

	return cardElement;
}

export { createCard };

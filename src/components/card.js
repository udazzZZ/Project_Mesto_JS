import { deleteCard } from "./api";

// Функция для создания карточки
function createCard(
	card,
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

	cardName.textContent = card.name;
	cardImage.src = card.link;
	cardImage.alt = card.name;
	cardLikesCount.textContent = card.likes.length;

	const likeButton = cardElement.querySelector(".card__like-button");
	likeButton.addEventListener("click", () =>
		likeButton.classList.toggle("card__like-button_is-active")
	);

	if (card.owner._id === userId) {
		deleteButton.addEventListener("click", () =>
			deleteCard(card._id)
				.then((res) => {
					deleteButton.closest(".card").remove();
					console.log(res.json());
				})
				.catch((err) => {
					console.log(err);
				})
		);
	} else {
		deleteButton.disabled = true;
		deleteButton.style.display = "none";
	}

	cardImage.addEventListener("click", () => {
		imagePopupImage.src = card.link;
		imagePopupImage.alt = card.name;
		imagePopupCaption.textContent = card.name;
		openModal(imagePopup);
	});

	return cardElement;
}

export { createCard };

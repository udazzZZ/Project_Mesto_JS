const placesContainer = document.querySelector(".places__list");
const profilePopup = document.querySelector(".popup_type_edit");

// Функция для создания карточки
function createCard(card) {
	console.log(document.querySelector("#card-template"));
	const cardTemplate = document.querySelector("#card-template").content;
	console.log(cardTemplate);
	const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

	const cardName = cardElement.querySelector(".card__title");
	const cardImage = cardElement.querySelector(".card__image");

	cardName.textContent = card.name;
	cardImage.src = card.link;
	cardImage.alt = card.name;

	return cardElement;
}

// Перебор массива из 6 начальных карточек и добавление их на страницу
initialCards.forEach((card) => {
	const cardElement = createCard(card);
	placesContainer.append(cardElement);
});

// Функция для открытия попапа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

// Функция для закрытия попапа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

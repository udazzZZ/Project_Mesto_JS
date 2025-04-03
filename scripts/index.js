const placesContainer = document.querySelector(".places__list");
const profilePopup = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopupCloseButton = profilePopup.querySelector(".popup__close");
const profileFormElement = profilePopup.querySelector(".popup__form");
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAddButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector(".popup_type_new-card");
const cardPopupCloseButton = cardPopup.querySelector(".popup__close");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const cardFormElement = cardPopup.querySelector(".popup__form");
const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardPopup.querySelector(".popup__input_type_url");

// Функция для создания карточки
function createCard(name, link) {
	console.log(document.querySelector("#card-template"));
	const cardTemplate = document.querySelector("#card-template").content;
	console.log(cardTemplate);
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

	imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));

	return cardElement;
}

// Перебор массива из 6 начальных карточек и добавление их на страницу
initialCards.forEach((card) => {
	const cardElement = createCard(card.name, card.link);
	placesContainer.append(cardElement);
});

// Функция для открытия попапа
function openModal(popup) {
	popup.classList.add("popup_is-opened");
}

// Функция для закрытия попапа
function closeModal(popup) {
	popup.classList.remove("popup_is-opened");
}

// Обработчик события для кнопки редактирования профиля
profileEditButton.addEventListener("click", () => {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileDescription.textContent;
	openModal(profilePopup);
});

// Обработчик события для кнопки закрытия попапа
profilePopupCloseButton.addEventListener("click", () =>
	closeModal(profilePopup)
);

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
	evt.preventDefault();
	const name = nameInput.value;
	const job = jobInput.value;

	profileTitle.textContent = name;
	profileDescription.textContent = job;

	closeModal(profilePopup);
}

// Добавление плавного открытия/закрытия попапа редактирования профиля
profilePopup.classList.add("popup_is-animated");

// Добавление плавного открытия/закрытия попапа добавления карточки
cardPopup.classList.add("popup_is-animated");

// Добавление плавного открытия/закрытия попапа просмотра изображения
imagePopup.classList.add("popup_is-animated");

// Добавление обработчика события на отпрвку форму
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Добавление обработчика события на кнопку добавления карточки
profileAddButton.addEventListener("click", () => openModal(cardPopup));

// Обработчик события для кнопки закрытия попапа карточки
cardPopupCloseButton.addEventListener("click", () => closeModal(cardPopup));

// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(evt) {
	evt.preventDefault();
	const name = cardNameInput.value;
	const link = cardLinkInput.value;

	const newCard = createCard(name, link);
	placesContainer.prepend(newCard);
	closeModal(cardPopup);
	cardNameInput.value = "";
	cardLinkInput.value = "";
}

// Добавление обработчика события на отправку формы добавления карточки
cardFormElement.addEventListener("submit", handleCardFormSubmit);

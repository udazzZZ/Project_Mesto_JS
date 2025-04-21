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

// Перебор массива из 6 начальных карточек и добавление их на страницу
initialCards.forEach((card) => {
	const cardElement = createCard(card.name, card.link);
	placesContainer.append(cardElement);
});

function updateButtonState(popup) {
	const formElement = popup.querySelector(validationSettings.formSelector);
	const inputList = Array.from(
		formElement.querySelectorAll(validationSettings.inputSelector)
	);

	toggleButtonState(inputList, formElement, validationSettings);
}

// Функция для открытия попапа
function openModal(popup) {
	if (popup.querySelector(validationSettings.formSelector)) {
		updateButtonState(popup);
	}
	document.addEventListener("keydown", closeByEsc);
	popup.classList.add("popup_is-opened");
}

function resetValidationErrors(popup) {
	const formElement = popup.querySelector(validationSettings.formSelector);
	const inputList = Array.from(
		formElement.querySelectorAll(validationSettings.inputSelector)
	);

	inputList.forEach((inputElement) => {
		hideInputError(formElement, inputElement, validationSettings);
	});
}

// Функция для закрытия попапа
function closeModal(popup) {
	popup.classList.remove("popup_is-opened");
	if (popup.querySelector(validationSettings.formSelector)) {
		resetValidationErrors(popup);
	}
	document.removeEventListener("keydown", closeByEsc);
}

// Обработчик события для кнопки редактирования профиля
profileEditButton.addEventListener("click", () => {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileDescription.textContent;
	openModal(profilePopup);
});

// Обработчик события для кнопки закрытия попапа редактирования профиля
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

// Добавление обработчика события на отпрвку формы редактирования профиля
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Добавление обработчика события на кнопку добавления карточки
profileAddButton.addEventListener("click", () => {
	cardNameInput.value = "";
	cardLinkInput.value = "";
	openModal(cardPopup);
});

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
}

// Добавление обработчика события на отправку формы добавления карточки
cardFormElement.addEventListener("submit", handleCardFormSubmit);

// Обработчик события для кнопки закрытия попапа просмотра изображения
imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));

// Добавление плавного открытия/закрытия попапа редактирования профиля
profilePopup.classList.add("popup_is-animated");

// Добавление плавного открытия/закрытия попапа добавления карточки
cardPopup.classList.add("popup_is-animated");

// Добавление плавного открытия/закрытия попапа просмотра изображения
imagePopup.classList.add("popup_is-animated");

const showInputError = (
	formElement,
	inputElement,
	errorMessage,
	validationSettings
) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	console.log(`${inputElement.id}-error`);
	inputElement.classList.add(validationSettings.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validationSettings) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(validationSettings.inputErrorClass);
	errorElement.classList.remove(validationSettings.errorClass);
	errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validationSettings) => {
	if (!inputElement.validity.valid) {
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			validationSettings
		);
	} else {
		hideInputError(formElement, inputElement, validationSettings);
	}
};

const hasInvalidInput = (inputList) => {
	console.log(inputList);
	inputList.forEach((inputElement) => {
		console.log(inputElement.validity);
		console.log(inputElement.value);
	});
	return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, formElement, validationSettings) => {
	buttonElement = formElement.querySelector(
		validationSettings.submitButtonSelector
	);
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(validationSettings.inactiveButtonClass);
	} else {
		buttonElement.classList.remove(validationSettings.inactiveButtonClass);
	}
};

const setEventListeners = (formElement, validationSettings) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationSettings.inputSelector)
	);

	toggleButtonState(inputList, formElement, validationSettings);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", () => {
			checkInputValidity(formElement, inputElement, validationSettings);
			toggleButtonState(inputList, formElement, validationSettings);
		});
	});
};

const validationSettings = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__button",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__input-error_visible",
};

const enableValidation = (validationSettings) => {
	const formList = Array.from(
		document.querySelectorAll(validationSettings.formSelector)
	);

	formList.forEach((formElement) => {
		setEventListeners(formElement, validationSettings);
	});
};

enableValidation(validationSettings);

profilePopup.addEventListener("click", (evt) => {
	console.log(evt.target);
	if (evt.target === profilePopup) {
		closeModal(profilePopup);
	}
});

cardPopup.addEventListener("click", (evt) => {
	if (evt.target !== evt.currentTarget.querySelector(".popup__content")) {
		closeModal(cardPopup);
	}
});

imagePopup.addEventListener("click", (evt) => {
	if (evt.target !== evt.currentTarget.querySelector(".popup__content")) {
		closeModal(imagePopup);
	}
});

function closeByEsc(evt) {
	if (evt.key === "Escape") {
		const openedPopup = document.querySelector(".popup_is-opened");
		closeModal(openedPopup);
	}
}
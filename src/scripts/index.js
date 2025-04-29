import "../pages/index.css";

import {
	enableValidation,
	toggleButtonState,
	hideInputError,
} from "../components/validate.js";
import { getModal } from "../components/modal.js";
import { createCard } from "../components/card.js";
import {
	getInitialCards,
	getUserInfo,
	updateUserInfo,
	addNewCard,
} from "../components/api.js";

// Попапы
const profilePopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const cardPopup = document.querySelector(".popup_type_new-card");

// Элементы попапа с картинкой
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Кнопки открытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// Кнопки закрытия попапов
const profilePopupCloseButton = profilePopup.querySelector(".popup__close");
const cardPopupCloseButton = cardPopup.querySelector(".popup__close");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

// Формы
const profileFormElement = profilePopup.querySelector(".popup__form");
const cardFormElement = cardPopup.querySelector(".popup__form");

// Инпуты
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_description");
const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardPopup.querySelector(".popup__input_type_url");

// Заголовок и описание профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// Контейнер карточек
const placesContainer = document.querySelector(".places__list");

const onOpenPopup = (popup) => {
	const formElement = popup.querySelector(validationSettings.formSelector);
	if (formElement) {
		const inputList = Array.from(
			formElement.querySelectorAll(validationSettings.inputSelector)
		);

		toggleButtonState(inputList, formElement, validationSettings);
	}
};

const onClosePopup = (popup) => {
	const formElement = popup.querySelector(validationSettings.formSelector);
	if (formElement) {
		const inputList = Array.from(
			formElement.querySelectorAll(validationSettings.inputSelector)
		);
		inputList.forEach((inputElement) => {
			hideInputError(formElement, inputElement, validationSettings);
		});
	}
};

const { openModal, closeModal } = getModal(onOpenPopup, onClosePopup);

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

	updateUserInfo(name, job)
		.then((info) => {
			profileTitle.textContent = info.name;
			profileDescription.textContent = info.about;
		})
		.catch((err) => {
			console.log(err);
		});

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

	addNewCard(name, link)
		.then((card) => {
			const newCard = createCard(
				card,
				card.owner._id,
				imagePopup,
				imagePopupImage,
				imagePopupCaption,
				openModal
			);
			placesContainer.prepend(newCard);
		})
		.catch((err) => {
			console.log(err);
		});

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

// Параметры валидации
const validationSettings = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__button",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__input-error_visible",
};

enableValidation(validationSettings);

// Обработка события клика на оверлей для закрытия попапа
profilePopup.addEventListener("click", (evt) => {
	if (evt.target === profilePopup) {
		closeModal(profilePopup);
	}
});

cardPopup.addEventListener("click", (evt) => {
	if (evt.target === cardPopup) {
		closeModal(cardPopup);
	}
});

imagePopup.addEventListener("click", (evt) => {
	if (evt.target === imagePopup) {
		closeModal(imagePopup);
	}
});

getUserInfo()
	.then((info) => {
		profileTitle.textContent = info.name;
		profileDescription.textContent = info.about;
		profileAvatar.src = info.avatar;

		const userId = info._id;

		getInitialCards()
			.then((cards) => {
				cards.forEach((card) => {
					const cardElement = createCard(
						card,
						userId,
						imagePopup,
						imagePopupImage,
						imagePopupCaption,
						openModal
					);
					placesContainer.append(cardElement);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	})
	.catch((err) => {
		console.log(err);
	});

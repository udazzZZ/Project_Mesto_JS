const config = {
	baseUrl: "https://nomoreparties.co/v1/apf-cohort-202",
	headers: {
		authorization: "e0d074eb-c076-471e-b65e-8a2e3309f63a",
		"Content-Type": "application/json",
	},
};

const getInitialCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`Ошибка: ${res.status}`);
	});
};

const getUserInfo = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`Ошибка: ${res.status}`);
	});
};

const updateUserInfo = (name, about) => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: about,
		}),
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	});
};

const addNewCard = (name, link) => {
	return fetch(`${config.baseUrl}/cards`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			link: link,
		}),
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	});
};

const deleteCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res}`);
	});
};

const likeCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "PUT",
		headers: config.headers,
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res}`);
	});
};

const unlikeCard = (cardId) => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: "DELETE",
		headers: config.headers,
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res}`);
	});
};

const updateAvatar = (avatar) => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({
			avatar: avatar,
		}),
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res}`);
	});
};

export {
	getInitialCards,
	getUserInfo,
	updateUserInfo,
	addNewCard,
	deleteCard,
	likeCard,
	unlikeCard,
	updateAvatar,
};

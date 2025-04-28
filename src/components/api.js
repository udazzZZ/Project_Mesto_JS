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

export { getInitialCards, getUserInfo };

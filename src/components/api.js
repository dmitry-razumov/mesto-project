const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: '740c75ad-e81a-4599-86ed-6a58ee20affd',
    'Content-Type': 'application/json',
  },
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(getResponse);
};

export const getUser = () =>
  request(`${config.baseUrl}/users/me`,{
    headers: config.headers,
  });

export const getCards = () =>
  request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });


export const updateUser = (user) =>
  request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about
    })
  });

export const addCard = (card) =>
  request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  });

export const deleteCard = (id) =>
  request(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  });

export const addLike = (id) =>
  request(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  });

export const removeLike = (id) =>
  request(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  });

export const updateAvatar = (url) =>
  request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  });

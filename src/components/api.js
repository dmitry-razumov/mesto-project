import { setButtonText } from "./utils.js";
import { initCards, prependCard, removeCard, updateLike } from "./card.js";
import { updateProfileInfo } from "./modal.js"

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

const logError = (err) => {
  console.log(err);
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(getResponse)
  .then(user => updateProfileInfo(user))
  .catch(logError);
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(getResponse)
  .then(cards => initCards(cards))
  .catch(logError);
};

export const updateUser = (evt, user, buttonText) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about
    })
  })
  .then(getResponse)
  .then((user) => {
    updateProfileInfo(user)
  })
  .catch(logError)
  .finally(() => {
    setButtonText(evt, buttonText);
  });
};

export const addCard = (evt, card, buttonText) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then(getResponse)
  .then((card) => {
    prependCard(card)
  })
  .catch(logError)
  .finally(() => {
    setButtonText(evt, buttonText);
  });
};

export const deleteCard = (evt, id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(getResponse)
  .then(() => {
    removeCard(evt)
  })
  .catch(logError);
};

export const addLike = (evt, id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(getResponse)
  .then((card) => {
    updateLike(evt, card)
  })
  .catch(logError);
};

export const removeLike = (evt, id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(getResponse)
  .then((card) => {
    updateLike(evt, card)
  })
  .catch(logError);
};

export const updateAvatar = (evt, url, buttonText) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(getResponse)
  .then((user) => {
    updateProfileInfo(user)
  })
  .catch(logError)
  .finally(() => {
    setButtonText(evt, buttonText);
  });
};

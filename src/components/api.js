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

import { initCards, prependCard, removeCard } from "./card.js";
import { updateProfileInfo, setEditButtonInProcess, setAddButtonInProcess } from "./modal.js"

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(getResponse)
  .then(user => updateProfileInfo(user))
  .catch((err) => {
    logError(err);
    // updateProfileInfo({
    //   name:err,
    //   about:err
    // });
  });
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(getResponse)
  .then(cards => initCards(cards))
  .catch((err) => {
    logError(err);
    // updateProfileInfo({
    //   name:err,
    //   about:err,
    //   avatar:'',
    //   userId:null
    // });
  });
};

export const updateUser = (user) => {
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
  .catch((err) => {
    logError(err);
  })
  .finally(() => {
    setEditButtonInProcess(false);
  });
};

export const addCard = (card) => {
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
  .catch((err) => {
    logError(err);
  })
  .finally(() => {
    setAddButtonInProcess(false);
  });
};

export const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(getResponse)
  .then(() => {
    removeCard(id)
  })
  .catch((err) => {
    logError(err);
  });
  // .finally(() => {
  //   setAddButtonInProcess(false);
  // });
};

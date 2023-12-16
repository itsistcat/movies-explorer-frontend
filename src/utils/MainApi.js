import {
  URL_BASE,
  SIGNUP,
  SIGNIN,
  USERS_CURRENT,
  MOVIES,
} from "./constants";

// Функция регистрации нового пользователя
export function registerUser(email, password, name) {
  return fetch(`${URL_BASE}${SIGNUP}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
}

// Функция авторизации пользователя
export function authorizeUser(email, password) {
  return fetch(`${URL_BASE}${SIGNIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

// Функция получения информации о текущем пользователе
export function getUserInfo(token) {
  return fetch(`${URL_BASE}${USERS_CURRENT}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}

// Функция обновления информации о пользователе
export function setUserInfo(email, name) {
  return fetch(`${URL_BASE}${USERS_CURRENT}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ email, name }),
  });
}

// Функция получения сохранённых фильмов пользователя
export function getSavedMovies() {
  return fetch(`${URL_BASE}${MOVIES}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
    }
  });
}

// Функция обработки сохранения/удаления фильма на сервере
export function handleMovieServer(movie) {
  const selected = movie?.selected;

  if (selected) {
    // Сохранение нового фильма
    const {
      id: movieId,
      country,
      director,
      duration,
      year,
      description,
      trailerLink,
      nameRU,
      nameEN,
    } = movie;

    let { image } = movie;
    let thumbnail = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;
    image = `https://api.nomoreparties.co${image.url}`;

    return fetch(`${URL_BASE}${MOVIES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    });
  } else {
    // Удаление сохранённого фильма
    return fetch(
      `${URL_BASE}${MOVIES}/${movie.dbId || movie._id}`,
      {
        method: "DELETE",
                headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
  }
}

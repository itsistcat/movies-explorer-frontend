import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Register from "../Register/Register.js";
import Login from "../Login/Login.js";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import PageNotFound from "../PageNotFound/PageNotFound.js";

import { authorizeUser } from "../../utils/MainApi.js";
import { registerUser } from "../../utils/MainApi.js";

import { getUserInfo } from "../../utils/MainApi.js";
import { setUserInfo } from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { getSavedMovies } from "../../utils/MainApi.js";
import { getMovies } from "../../utils/MoviesApi.js";
import { handleMovieServer } from "../../utils/MainApi.js";

import { VALIDATION_MESSAGES, showDefaultError, } from "../../utils/validation.js";

import {
  INITIALROUTE_ROOT,
  INITIALROUTE_SIGNUP,
  INITIALROUTE_SIGNIN,
  INITIALROUTE_MOVIES,
  INITIALROUTE_SAVED_MOVIES,
  INITIALROUTE_PROFILE,
  INITIALROUTE_NOTHING,
  SHORT_FILM_DURATION,
} from "../../utils/constants.js";

export default function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [isProcessLoading, setIsProcessLoading] = useState(false);
  const [areMoviesLoading, setAreMoviesLoading] = useState(false);
  const [successMessages, setSuccessMessages] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    registrationRes: "",
    authorizationRes: "",
    updatingUserInfoResponse: "",
    moviesResponse: "",
  });
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
    name: "",
  });
  const [IsUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isBtnSaveVisible, setIsBtnSaveVisible] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredAllMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [searchFormValue, setSearchFormValue] = useState("");
  const [SearchValueFavoritesMovies, setSearchValueFavoritesMovies] =
    useState("");
  const [isFilterCheckboxMoviesChecked, setIsFilterCheckboxMoviesChecked] =
    useState(false);
  const [
    isFilterCheckboxSavedMoviesChecked,
    setIsCheckboxFavoritesMoviesChecked,
  ] = useState(false);
  const [isSearchRequestInProgress, setIsSearchRequestInProgress] =
    useState(false);
  const [hasUserSearched, setHasUserSearched] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const pathSavedMovies = location.pathname === INITIALROUTE_SAVED_MOVIES;
  const pathMovies = location.pathname === INITIALROUTE_MOVIES;

  const getLocalStorageData = (key) => localStorage.getItem(key);

  function saveDataLocally(data, serverData) {
    localStorage.setItem("search-request", searchFormValue || "");

    localStorage.setItem(
      "filtercheckbox-status",
      JSON.stringify(isFilterCheckboxMoviesChecked || false)
    );

    localStorage.setItem(
      "all-movies",
      serverData || allMovies.length
        ? JSON.stringify(serverData) || JSON.stringify(allMovies)
        : []
    );

    localStorage.setItem(
      "filtered-movies",
      data.length ? JSON.stringify(data) : []
    );
  }

  async function loadFavoritesFromServer() {
    try {
      const res = await getSavedMovies();
      const data = await res;
      setSavedMovies(data);
    } catch (err) {
      console.error(
        `Ошибка в процессе сохранения карточек в личном кабинет пользователя: ${err}`
      );
    }
  }

  function searchMovie(data) {
    if (pathMovies) setSearchFormValue(data);
    if (pathSavedMovies) setSearchValueFavoritesMovies(data);
  }

  function filterMovies(serverData) {
    const movies =
      pathMovies && allMovies.length
        ? allMovies
        : pathSavedMovies && savedMovies.length
        ? savedMovies
        : serverData;

    if (!movies?.length) return;

    const isNameCompliedWithSearchRequest = (name) => {
      const value = pathMovies ? searchFormValue : SearchValueFavoritesMovies;

      return name
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(value.toLowerCase().trim().replace(/\s/g, ""));
    };

    const isDurationCompliedWithSearchRequest = (time) =>
      time <= SHORT_FILM_DURATION;

    const data = movies.filter(({ nameRU, duration }) => {
      const testCriteria = (checkbox) => {
        if (checkbox) {
          return (
            isNameCompliedWithSearchRequest(nameRU) &&
            isDurationCompliedWithSearchRequest(duration)
          );
        }

        return isNameCompliedWithSearchRequest(nameRU);
      };

      if (pathMovies) {
        return testCriteria(isFilterCheckboxMoviesChecked);
      }

      if (pathSavedMovies) {
        return testCriteria(isFilterCheckboxSavedMoviesChecked);
      }
    });

    if (pathMovies) {
      for (let i = 0; i < data.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));

        [data[i], data[j]] = [data[j], data[i]];
      }
    }

    if (pathMovies) {
      setFilteredMovies(data);
      saveDataLocally(data, serverData);
    }

    if (pathSavedMovies) {
      setFilteredSavedMovies(data);
    }

    setIsSearchRequestInProgress(false);
    setHasUserSearched(true);

    localStorage.setItem("user-search", JSON.stringify(hasUserSearched));
  }

  useEffect(() => {
    if (!IsUserLoggedIn) {
      setErrorMessages({
        registrationRes: "",
        authorizationRes: "",
        moviesResponse: "",
      });
    }
  }, [navigate]);

  useEffect(() => {
    setAllMovies(
      getLocalStorageData("all-movies")
        ? JSON.parse(getLocalStorageData("all-movies"))
        : []
    );

    setFilteredMovies(
      getLocalStorageData("filtered-movies")
        ? JSON.parse(getLocalStorageData("filtered-movies"))
        : []
    );

    setSearchFormValue("" || getLocalStorageData("search-request"));

    setIsFilterCheckboxMoviesChecked(
      false || JSON.parse(getLocalStorageData("filtercheckbox-status"))
    );

    setHasUserSearched(JSON.parse(getLocalStorageData("user-search") || false));

    if (IsUserLoggedIn) {
      loadFavoritesFromServer();
    }
  }, [IsUserLoggedIn]);

  // ПОЛЬЗОВАТЕЛИ
  async function handleUserRegistration({ email, password, name }) {
    setIsProcessLoading(true);

    try {
      const res = await registerUser(email, password, name);

      if (res.ok) {
        handleUserAuthorization({ email, password });
        setErrorMessages({ registrationRes: "" });
      } else {
        setErrorMessages({
          registrationRes:
            res.status === 500
              ? VALIDATION_MESSAGES.backend[500]
              : res.status === 409
              ? VALIDATION_MESSAGES.backend[409]
              : showDefaultError("регистрации пользователя"),
        });
      }
    } catch (err) {
      console.error(
        `Ошибка в процессе регистрации пользователя на сайте: ${err}`
      );
    } finally {
      setIsProcessLoading(false);
    }
  }

  const handleLoginOn = () => setIsUserLoggedIn(true);

  async function handleUserAuthorization({ email, password }) {
    setIsProcessLoading(true);

    try {
      const res = await authorizeUser(email, password);

      if (res.ok) {
        setErrorMessages({ authorizationRes: "" });

        const data = await res.json();
        const { token } = data;
        localStorage.setItem("jwt", token);
        handleLoginOn();
        navigate(INITIALROUTE_MOVIES, { replace: true });

        const userInfo = await getUserInfo(token);
        const { _id, email, name } = userInfo;
        setCurrentUser({ _id, email, name });
      } else {
        setErrorMessages({
          authorizationRes:
            res.status === 500
              ? VALIDATION_MESSAGES.backend[500]
              : res.status === 401
              ? VALIDATION_MESSAGES.backend[401]
              : showDefaultError("авторизации"),
        });
      }
    } catch (err) {
      console.error(
        `Ошибка в процессе авторизации пользователя на сайте: ${err}`
      );
    } finally {
      setIsProcessLoading(false);
    }
  }

  const checkToken = useCallback(() => {
    const jwt = getLocalStorageData("jwt");

    if (jwt) {
      getUserInfo(jwt)
        .then(({ _id, email, name }) => {
          setCurrentUser({ _id, email, name });
          handleLoginOn();
          navigate({
            replace: false,
          });
        })
        .catch((err) => {
          console.error(
            `Ошибка в процессе проверки токена пользователя и получения личных данных: ${err}`
          );
        })
        .finally(() => {
          setIsAppLoaded(true);
        });
    } else {
      setIsAppLoaded(true);
    }
  }, []);

  useEffect(() => checkToken(), []);

  async function updateUserInfo({ email, name }) {
    if (email === currentUser.email && name === currentUser.name) {
      return;
    } else {
      setIsProcessLoading(true);

      try {
        const res = await setUserInfo(email, name);
        if (res.ok) {
          setErrorMessages({ updatingUserInfoResponse: "" });
          setIsBtnSaveVisible(false);
          setSuccessMessages({
            updatingUserInfoResponse: "Данные профиля успешно обновлены",
          });

          const data = await res.json();
          setCurrentUser(data);
        } else {
          setErrorMessages({
            updatingUserInfoResponse:
              res.status === 500
                ? VALIDATION_MESSAGES.backend[500]
                : res.status === 409
                ? VALIDATION_MESSAGES.backend[409]
                : showDefaultError("обновлении профиля"),
          });
        }
      } catch (err) {
        console.error(
          `Ошибка в процессе редактирования данных пользователя: ${err}`
        );
      } finally {
        setIsProcessLoading(false);
      }
    }
  }

  // ФИЛЬМЫ
  async function getAllMovies() {
    if (!pathMovies) return;

    setAreMoviesLoading(true);

    try {
      const movies = await getMovies();
      const synchronizeDataWithServer = (data) => {
        const ids = [];

        for (let savedMovie of savedMovies) {
          ids.push(savedMovie.movieId);
        }

        for (let movie of data) {
          if (ids.includes(movie.id)) {
            movie.dbId = data._id;
            movie.selected = true;
          }
        }

        return data;
      };

      setAllMovies(synchronizeDataWithServer(movies));
      filterMovies(synchronizeDataWithServer(movies));
    } catch (err) {
      setErrorMessages({
        moviesResponse: `Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз`,
      });
    } finally {
      setAreMoviesLoading(false);
      setIsSearchRequestInProgress(false);
    }
  }

  useEffect(() => {
    if (pathSavedMovies) setIsSearchRequestInProgress(false);
    if (!isSearchRequestInProgress || allMovies.length) return;

    getAllMovies();
  }, [isSearchRequestInProgress]);

  useEffect(() => {
    if (!allMovies.length) return;

    filterMovies();
    }, [
    isSearchRequestInProgress,
    isFilterCheckboxMoviesChecked,
    isFilterCheckboxSavedMoviesChecked,
  ]);

  function deleteMovie(movies, key, onState) {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id === key || movies[i].movieId === key) {
        onState((prevMovies) => [
          ...prevMovies.slice(0, i),
          ...prevMovies.slice(i + 1),
        ]);

        break;
      }
    }
  }

  function toggleMovieSelection(movies, key, bool) {
    for (let movie of movies) {
      if (movie.id === key) {
        movie.selected = bool;

        break;
      }
    }
  }

  function handleMovieSelected({ target }, movie) {
    const btn = target.closest(".movies-card__btn-favourite");

    if (!btn) return;

    if (pathMovies) {
      let key;

      for (let item of allMovies) {
        if (item.id === movie.id) {
          key = item.id;

          if (item.selected) {
            btn.classList.remove("movies-card__btn-favourite_active");
            item.selected = false;

            toggleMovieSelection(filteredAllMovies, key, false);
          } else {
            btn.classList.add("movies-card__btn-favourite_active");
            item.selected = true;

            toggleMovieSelection(filteredAllMovies, key, true);
          }

          break;
        }
      }
    }

    handleDataServer(movie);
  }

  function handleDataServer(movie) {
    handleMovieServer(movie)
      .then((res) => res.json())
      .then(({ message }) => {
        if (pathMovies) {
          movie.dbId = message;

          const clone = { ...movie };
          clone.selected = false;

          if (message) {
            setSavedMovies((prevMovies) => [...prevMovies, clone]);

            if (movie.duration <= SHORT_FILM_DURATION) {
              setFilteredSavedMovies((prevMovies) => [...prevMovies, clone]);
            }
          } else {
            let key = movie.id;

            deleteMovie(savedMovies, key, setSavedMovies);
            deleteMovie(filteredSavedMovies, key, setFilteredSavedMovies);
          }
        } else {
          let key;

          for (let item of allMovies) {
            if (item.id === movie.movieId || item.id === movie.id) {
              key = item.id;

              item.dbId = null;
              item.selected = false;

              for (let filteredMovie of filteredAllMovies) {
                if (filteredMovie.id === key) {
                  filteredMovie.dbId = null;
                  filteredMovie.selected = false;
                  break;
                }
              }

              deleteMovie(savedMovies, key, setSavedMovies);
              deleteMovie(filteredSavedMovies, key, setFilteredSavedMovies);

              break;
            }
          }
        }

        localStorage.setItem("all-movies", JSON.stringify(allMovies));
        localStorage.setItem(
          "filtered-movies",
          JSON.stringify(filteredAllMovies)
        );
      })
      .catch((err) =>
        console.error(
          `Ошибка в процессе добавления карточки в список избранных либо удаления${err}`
        )
      );
  }

  return (
    isAppLoaded && (
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path={INITIALROUTE_ROOT}
            element={<Header IsUserLoggedIn={IsUserLoggedIn} />}
          >
            <Route index element={<Main />} />
            <Route
              path={INITIALROUTE_MOVIES}
              element={
                <ProtectedRoute isUserLoggedIn={IsUserLoggedIn}>
                  <Movies
                    onSearch={searchMovie}
                    setIsSearchRequestInProgress={setIsSearchRequestInProgress}
                    onFilter={setIsFilterCheckboxMoviesChecked}
                    onMovieSelect={handleMovieSelected}
                    isFilterCheckboxChecked={isFilterCheckboxMoviesChecked}
                    hasUserSearched={hasUserSearched}
                    searchFormValue={searchFormValue}
                    movies={filteredAllMovies}
                    onLoad={areMoviesLoading}
                    error={errorMessages}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path={INITIALROUTE_SAVED_MOVIES}
              element={
                <ProtectedRoute isUserLoggedIn={IsUserLoggedIn}>
                  <SavedMovies
                    movies={
                      isFilterCheckboxSavedMoviesChecked ||
                      SearchValueFavoritesMovies
                        ? filteredSavedMovies
                        : savedMovies
                    }
                    onSearch={searchMovie}
                    onMovieSelect={handleMovieSelected}
                    onFilter={setIsCheckboxFavoritesMoviesChecked}
                    setIsSearchRequestInProgress={setIsSearchRequestInProgress}
                    isFilterCheckboxChecked={isFilterCheckboxSavedMoviesChecked}
                    searchFormValue={SearchValueFavoritesMovies}
                    hasUserSearched={hasUserSearched}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path={INITIALROUTE_PROFILE}
              element={
                <ProtectedRoute isUserLoggedIn={IsUserLoggedIn}>
                  <Profile
                    setIsUserLoggedIn={setIsUserLoggedIn}
                    setSearchValueFavoritesMovies={
                      setSearchValueFavoritesMovies
                    }
                    setIsCheckboxFavoritesMoviesChecked={
                      setIsCheckboxFavoritesMoviesChecked
                    }
                    setCurrentUser={setCurrentUser}
                    onUpdate={updateUserInfo}
                    setSuccessMessages={setSuccessMessages}
                    setIsBtnSaveVisible={setIsBtnSaveVisible}
                    setErrorMessages={setErrorMessages}
                    onSuccessMessages={successMessages}
                    isBtnSaveVisible={isBtnSaveVisible}
                    onLoad={isProcessLoading}
                    error={errorMessages}
                  />
                </ProtectedRoute>
              }
            />
          </Route>

          {!IsUserLoggedIn && (
            <>
              <Route
                path={INITIALROUTE_SIGNUP}
                element={
                  <Register
                    onRegistration={handleUserRegistration}
                    onLoad={isProcessLoading}
                    error={errorMessages}
                  />
                }
              />
              <Route
                path={INITIALROUTE_SIGNIN}
                element={
                  <Login
                    onAuthorization={handleUserAuthorization}
                    onLoad={isProcessLoading}
                    error={errorMessages}
                  />
                }
              />
            </>
          )}

          <Route
            path={INITIALROUTE_NOTHING}
            element={
              <PageNotFound IsUserLoggedIn={IsUserLoggedIn} />
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    )
  );
}

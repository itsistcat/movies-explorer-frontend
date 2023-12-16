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
import { getSavedMovies } from "../../utils/MainApi.js";
import { getMovies } from "../../utils/MoviesApi.js";
import { handleMovieServer } from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { VALIDATION_MESSAGES, showDefaultError, } from "../../utils/validation.js";

import {
  ROOT,
  ALL_SHORTFILMS,
  SIGNUP,
  SIGNIN,
  SAVED_MOVIES,
  MOVIES,
  PROFILE,
  NOTHING,
} from "../../utils/constants.js";

export default function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [isDownloadProcess, setIsDownloadProcess] = useState(false);
  const [isLoadResServer, setLoadResServer] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    registrationRes: "",
    authorizationRes: "",
    updatingUserInfoResponse: "",
    moviesResponse: "",
  });
  const [successMessages, setSuccessMessages] = useState("");
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
    name: "",
  });



  const [IsUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isBtnSaveVisible, setIsBtnSaveVisible] = useState(false);
  const [allMovies, setAllFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [savedMovies, setFavoritesMovies] = useState([]);
  const [filteredFavoritesFilms, setfilteredFavoritesFilms] = useState([]);
  const [searchFormValue, setSearchFormValue] = useState("");
  const [searchValueFavoritesFilms, setSearchValueFavoritesFilms] =
    useState("");
    const [
      isCheckboxFavoritesFilmsEnabled,
      setIsCheckboxFavoritesFilmsEnabled,
    ] = useState(false);
  const [isCheckboxFilmsEnabled, setIsCheckboxFilmsEnabled] =
    useState(false);
  const [isSearchRequestInProgress, setIsSearchRequestInProgress] =
    useState(false);
  const [hasUserSearched, setHasUserSearched] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const pathSavedMovies = location.pathname === SAVED_MOVIES;
  const pathMovies = location.pathname === MOVIES;

  const getLocalStorageData = (key) => localStorage.getItem(key);

  function saveDataLocally(data, serverData) {
    const localStorageData = {
      "search-request": searchFormValue || "",
      "filtercheckbox-status": JSON.stringify(isCheckboxFilmsEnabled || false),
      "all-movies": JSON.stringify(serverData || allMovies || []),
      "filtered-movies": data && data.length ? JSON.stringify(data) : "[]",
    };

    Object.entries(localStorageData).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }


  async function loadFavoritesFromServer() {
    try {
      const res = await getSavedMovies();
      const data = await res;
      setFavoritesMovies(data);
    } catch (err) {
      console.error(
        `Ошибка в процессе сохранения карточек в личном кабинет пользователя: ${err}`
      );
    }
  }

  function searchMovie(data) {
    if (pathMovies) setSearchFormValue(data);
    if (pathSavedMovies) setSearchValueFavoritesFilms(data);
  }

  function filterMovies(serverData) {
    const movies =
        (pathMovies && allMovies.length) ||
        (pathSavedMovies && savedMovies.length)
            ? pathMovies ? [...allMovies] : [...savedMovies]
            : serverData;

    if (!movies?.length) return;

    const isNameCompliedWithSearchRequest = (name, value) =>
        name
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(value.toLowerCase().trim().replace(/\s/g, ""));

    const isDurationCompliedWithSearchRequest = (time) =>
        time <= ALL_SHORTFILMS;

    const value = pathMovies ? searchFormValue : searchValueFavoritesFilms;

    const data = movies.filter(({ nameRU, duration }) => {
        const testCriteria = (checkbox) => {
            if (checkbox) {
                return (
                    isNameCompliedWithSearchRequest(nameRU, value) &&
                    isDurationCompliedWithSearchRequest(duration)
                );
            }

            return isNameCompliedWithSearchRequest(nameRU, value);
        };

        return pathMovies
            ? testCriteria(isCheckboxFilmsEnabled)
            : pathSavedMovies
            ? testCriteria(isCheckboxFavoritesFilmsEnabled)
            : false;
    });

    if (pathMovies) {
        for (let i = 0; i < data.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }

        setFilteredFilms(data);
        saveDataLocally(data, serverData);
    } else if (pathSavedMovies) {
        setfilteredFavoritesFilms(data);
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
    setAllFilms(
      getLocalStorageData("all-movies")
        ? JSON.parse(getLocalStorageData("all-movies"))
        : []
    );

    setFilteredFilms(
      getLocalStorageData("filtered-movies")
        ? JSON.parse(getLocalStorageData("filtered-movies"))
        : []
    );

    setSearchFormValue("" || getLocalStorageData("search-request"));

    setIsCheckboxFilmsEnabled(
      false || JSON.parse(getLocalStorageData("filtercheckbox-status"))
    );

    setHasUserSearched(JSON.parse(getLocalStorageData("user-search") || false));

    if (IsUserLoggedIn) {
      loadFavoritesFromServer();
    }
  }, [IsUserLoggedIn]);

  // ПОЛЬЗОВАТЕЛИ
  async function handleUserRegistration({ email, password, name }) {
    setIsDownloadProcess(true);

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
      setIsDownloadProcess(false);
    }
  }

  const handleLoginOn = () => setIsUserLoggedIn(true);

  async function handleUserAuthorization({ email, password }) {
    setIsDownloadProcess(true);

    try {
        const authResponse = await authorizeUser(email, password);

        if (authResponse.ok) {
            setErrorMessages({ authorizationRes: "" });

            const authData = await authResponse.json();
            const { token } = authData;
            localStorage.setItem("jwt", token);
            handleLoginOn();
            navigate(MOVIES, { replace: true });

            const userInfo = await getUserInfo(token);
            const { _id, email, name } = userInfo;
            setCurrentUser({ _id, email, name });
        } else {
            setErrorMessages({
                authorizationRes:
                    authResponse.status === 500
                        ? VALIDATION_MESSAGES.backend[500]
                        : authResponse.status === 401
                            ? VALIDATION_MESSAGES.backend[401]
                            : showDefaultError("авторизации"),
            });
        }
    } catch (err) {
        console.error(`Ошибка в процессе авторизации пользователя на сайте: ${err}`);
    } finally {
        setIsDownloadProcess(false);
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
      setIsDownloadProcess(true);

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
        setIsDownloadProcess(false);
      }
    }
  }

  // ФИЛЬМЫ
  async function getAllMovies() {
    if (!pathMovies) return;

    setLoadResServer(true);

    try {
        const fetchedMovies = await getMovies();
        const synchronizeDataWithServer = (data) => {
            const ids = savedMovies.map((savedMovie) => savedMovie.movieId);

            for (let movie of data) {
                if (ids.includes(movie.id)) {
                    movie.dbId = data._id;
                    movie.selected = true;
                }
            }

            return data;
        };

        setAllFilms(synchronizeDataWithServer(fetchedMovies));
        filterMovies(synchronizeDataWithServer(fetchedMovies));
    } catch (err) {
        setErrorMessages({
            moviesResponse: `Во время запроса произошла ошибка.
                Возможно, проблема с соединением или сервер недоступен.
                Подождите немного и попробуйте ещё раз`,
        });
    } finally {
        setLoadResServer(false);
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
    isCheckboxFilmsEnabled,
    isCheckboxFavoritesFilmsEnabled,
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
    const btn = target.closest(".card-items__btn-favourite");

    if (!btn) return;

    if (pathMovies) {
        let key;

        for (let movieItem of allMovies) {
            if (movieItem.id === movie.id) {
                key = movieItem.id;

                if (movieItem.selected) {
                    btn.classList.remove("card-items__btn-favourite_active");
                    movieItem.selected = false;

                    toggleMovieSelection(filteredFilms, key, false);
                } else {
                    btn.classList.add("card-items__btn-favourite_active");
                    movieItem.selected = true;

                    toggleMovieSelection(filteredFilms, key, true);
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
          setFavoritesMovies((prevMovies) => [...prevMovies, clone]);

          if (movie.duration <= ALL_SHORTFILMS) {
            setfilteredFavoritesFilms((prevMovies) => [...prevMovies, clone]);
          }
        } else {
          let key = movie.id;

          deleteMovie(savedMovies, key, setFavoritesMovies);
          deleteMovie(filteredFavoritesFilms, key, setfilteredFavoritesFilms);
        }
      } else {
        let key;

        for (let item of allMovies) {
          if (item.id === movie.movieId || item.id === movie.id) {
            key = item.id;

            item.dbId = null;
            item.selected = false;

            for (let filteredMovie of filteredFilms) {
              if (filteredMovie.id === key) {
                filteredMovie.dbId = null;
                filteredMovie.selected = false;
                break;
              }
            }

            deleteMovie(savedMovies, key, setFavoritesMovies);
            deleteMovie(filteredFavoritesFilms, key, setfilteredFavoritesFilms);

            break;
          }
        }
      }

      localStorage.setItem("all-movies", JSON.stringify(allMovies));
      localStorage.setItem(
        "filtered-movies",
        JSON.stringify(filteredFilms)
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
            path={ROOT}
            element={<Header IsUserLoggedIn={IsUserLoggedIn} />}
          >
            <Route index element={<Main />} />
            <Route
              path={MOVIES}
              element={
                <ProtectedRoute isUserLoggedIn={IsUserLoggedIn}>
                  <Movies
                    onSearch={searchMovie}
                    setIsSearchRequestInProgress={setIsSearchRequestInProgress}
                    onFilter={setIsCheckboxFilmsEnabled}
                    onMovieSelect={handleMovieSelected}
                    isFilterCheckboxChecked={isCheckboxFilmsEnabled}
                    hasUserSearched={hasUserSearched}
                    searchFormValue={searchFormValue}
                    movies={filteredFilms}
                    onLoad={isLoadResServer}
                    error={errorMessages}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path={SAVED_MOVIES}
              element={
                <ProtectedRoute isUserLoggedIn={IsUserLoggedIn}>
                  <SavedMovies
                    movies={ filteredFavoritesFilms || (
                      isCheckboxFavoritesFilmsEnabled ||
                      searchValueFavoritesFilms
                        ? filteredFavoritesFilms
                        : savedMovies
                        )
                    }
                    onSearch={searchMovie}
                    onMovieSelect={handleMovieSelected}
                    onFilter={setIsCheckboxFavoritesFilmsEnabled}
                    setIsSearchRequestInProgress={setIsSearchRequestInProgress}
                    isFilterCheckboxChecked={isCheckboxFavoritesFilmsEnabled}
                    searchFormValue={searchValueFavoritesFilms}
                    hasUserSearched={hasUserSearched}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path={PROFILE}
              element={
                <ProtectedRoute isUserLoggedIn={IsUserLoggedIn}>
                  <Profile
                    setIsUserLoggedIn={setIsUserLoggedIn}
                    setSearchValueFavoritesFilms={
                      setSearchValueFavoritesFilms
                    }
                    setIsCheckboxFavoritesFilmsEnabled={
                      setIsCheckboxFavoritesFilmsEnabled
                    }
                    setCurrentUser={setCurrentUser}
                    onUpdate={updateUserInfo}
                    setSuccessMessages={setSuccessMessages}
                    setIsBtnSaveVisible={setIsBtnSaveVisible}
                    setErrorMessages={setErrorMessages}
                    onSuccessMessages={successMessages}
                    isBtnSaveVisible={isBtnSaveVisible}
                    onLoad={isDownloadProcess}
                    error={errorMessages}
                  />
                </ProtectedRoute>
              }
            />
          </Route>

          {!IsUserLoggedIn && (
            <>
              <Route
                path={SIGNUP}
                element={
                  <Register
                    onRegistration={handleUserRegistration}
                    onLoad={isDownloadProcess}
                    error={errorMessages}
                  />
                }
              />
              <Route
                path={SIGNIN}
                element={
                  <Login
                    onAuthorization={handleUserAuthorization}
                    onLoad={isDownloadProcess}
                    error={errorMessages}
                  />
                }
              />
            </>
          )}

          <Route
            path={NOTHING}
            element={
              <PageNotFound IsUserLoggedIn={IsUserLoggedIn} />
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    )
  );
}

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { VALIDATION_MESSAGES } from "../../utils/validation";
import {
  PATTERN_EMAIL,
  ROOT,
  PATTERN_USERNAME,
} from "../../utils/constants";

function Profile({
  setIsUserLoggedIn,
  setSearchValueFavoritesFilms,
  setIsCheckboxFavoritesFilmsEnabled,
  setCurrentUser,
  onUpdate,
  isBtnSaveVisible,
  setIsBtnSaveVisible,
  onSuccessMessages,
  onLoad,
  error,
  setErrorMessages,
  setSuccessMessages,
}) {
  const [prevValues, setPrevValues] = useState({});
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const { email, name } = currentUser;
  const { values, setValues, errors, isValid, setIsValid, handleChange } =
    useFormWithValidation();

    useEffect(() => {
      setValues({ email, name });
      setIsBtnSaveVisible(false);
      setSuccessMessages("");
      setErrorMessages({ updatingUserInfoResponse: "" });
    }, [navigate]);


  const showSaveBtn = ({ target }) => {
    setIsBtnSaveVisible(true);
    setSuccessMessages("");

    const data = {};
    Array.from(target.closest(".profile__form").children[0].children).forEach(
      (wrapper) => {
        const input = wrapper.children[1];
        data[input.name] = input.value;
      }
    );

    setPrevValues(data);
  };

  const loginOut = () => {
    localStorage.clear();
    setCurrentUser((prevUser) => ({
      ...prevUser,
      _id: "",
      email: "",
      name: "",
    }));
    setSearchValueFavoritesFilms("");
    setIsCheckboxFavoritesFilmsEnabled(false);
    navigate(ROOT, { replace: true });
    setIsUserLoggedIn(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const { email, name } = values;
    onUpdate({
      email: email.trim().replace(/\s/g, ""),
      name: name.trim().replace(/\s+/g, " "),
    });

    setIsValid(false);
  };

  const renderSuccess = (type) => {
    const successMessage = onSuccessMessages?.[type];
    return successMessage && !error?.[type] ? (
      <span className="success success_visible">{successMessage}</span>
    ) : null;
  };

  const renderError = (type) => (
    <span
      className={`error${
        ((type === 'name' || type === 'email') && errors?.[type] && " error_visible") || ""
      } error_type_server-response`}
    >
      {errors?.[type] && VALIDATION_MESSAGES.frontend[type]}
    </span>
  );

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__heading">Привет, {name}!</h1>
        <form
          className="profile__form"
          name="profile"
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset className="profile__fieldset">
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="name">
                Имя
              </label>
              <input
                className="profile__input"
                id="name"
                name="name"
                type="text"
                autoComplete="on"
                value={values?.name || ""}
                required
                onChange={handleChange}
                pattern={PATTERN_USERNAME}
                disabled={isBtnSaveVisible ? false : true}
              />
              {renderError("name")}
            </div>

            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="email">
                E-mail
              </label>
              <input
                className="profile__input"
                id="email"
                name="email"
                type="text"
                autoComplete="on"
                value={values?.email || ""}
                required
                onChange={handleChange}
                pattern={PATTERN_EMAIL}
                disabled={isBtnSaveVisible ? false : true}
              />
              {renderError("email")}
            </div>
          </fieldset>
          <div className="profile__wrapper-btn">
            {renderError("updatingUserInfoResponse")}
            {renderSuccess("updatingUserInfoResponse")}
            {isBtnSaveVisible ? (
              <button
                className="btn btn-entrance btn-save"
                type="submit"
                aria-label="Сохранение данных профиля"
                disabled={
                  !isValid ||
                  onLoad ||
                  (prevValues.email === values.email &&
                    prevValues.name === values.name)
                }
              >
                {onLoad ? "Сохранение..." : "Сохранить"}
              </button>
            ) : (
              <button
                className="btn btn-profile"
                type="button"
                aria-label="Редактирование данных"
                onClick={(evt) => showSaveBtn(evt)}
              >
                Редактировать
              </button>
            )}
          </div>
        </form>

        {!isBtnSaveVisible && (
          <button
            className="btn btn-profile-exit"
            type="button"
            aria-label="Выход пользователя"
            onClick={() => loginOut()}
          >
            Выйти из аккаунта
          </button>
        )}
      </div>
    </div>
  );
}

Profile.propTypes = {
  setCurrentUser: PropTypes.func,
  setSuccessMessages: PropTypes.func,
  error: PropTypes.object,
  onSuccessMessages: PropTypes.any,
  setSearchValueFavoritesFilms: PropTypes.func,
  setIsCheckboxFavoritesFilmsEnabled: PropTypes.func,
  setIsBtnSaveVisible: PropTypes.func,
  setErrorMessages: PropTypes.func,
  onUpdate: PropTypes.func,
  onLoad: PropTypes.bool,
  setIsUserLoggedIn: PropTypes.func,
  isBtnSaveVisible: PropTypes.bool,
};

export default Profile;

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Entrance from "../Entrance/Entrance.js";
import Input from "../Input/Input.js";

import useFormWithValidation from "../../hooks/useFormWithValidation.js";

import { PATTERN_EMAIL, PATTERN_PASSWORD } from "../../utils/constants.js";
import { VALIDATION_MESSAGES } from "../../utils/validation.js";

function Login({ onAuthorization, onLoad, error }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    const { email, password } = values;

    onAuthorization({
      email: email.trim().replace(/\s/g, ""),
      password,
    });
  }
  return (
    <Entrance
      heading={"Рады видеть!"}
      name={"login"}
      btn={"Войти"}
      btnAriaLabel={"Авторизация"}
      onSubmit={handleSubmit}
      onLoad={onLoad}
      isValid={isValid}
      error={error}
    >
      <Input
        className="input__auth"
        label={"E-mail"}
        htmlFor={"email"}
        id={"email"}
        name={"email"}
        type={"email"}
        autoComplete={"on"}
        value={values?.email || ""}
        onChange={handleChange}
        pattern={PATTERN_EMAIL}
        errorCondition={errors?.email}
        errorMessage={VALIDATION_MESSAGES.frontend.email}
      />
      <Input
      className="input__auth"
        htmlFor={"password"}
        id={"password"}
        label={"Пароль"}
        name={"password"}
        type={"password"}
        autoComplete={"current-password"}
        value={values?.password || ""}
        onChange={handleChange}
        pattern={PATTERN_PASSWORD}
        errorCondition={errors?.password}
        errorMessage={VALIDATION_MESSAGES.frontend.password}
      />
      <p className="entrance__paragraph">
        Ещё не зарегистрированы?&nbsp;
        <Link className="link link_type_inner-nav" to="/signup">
          Регистрация
        </Link>
      </p>
    </Entrance>
  );
}

Login.propTypes = {
  onAuthorization: PropTypes.func,
  error: PropTypes.object,
  onLoad: PropTypes.bool,
};

export default Login;

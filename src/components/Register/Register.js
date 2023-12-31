import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Entrance from "../Entrance/Entrance.js";
import Input from "../Input/Input.js";
import { VALIDATION_MESSAGES } from "../../utils/validation.js";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import {
  PATTERN_EMAIL,
  PATTERN_PASSWORD,
  PATTERN_USERNAME,
} from "../../utils/constants.js";

function Register({ onRegistration, onLoad, error }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    const { email, password, name } = values;

    onRegistration({
      email: email.trim().replace(/\s/g, ""),
      password,
      name: name.trim().replace(/\s+/g, " "),
    });
  }
  return (
    <Entrance
      heading={"Добро пожаловать!"}
      name={"register"}
      btn={"Зарегистрироваться"}
      btnAriaLabel={"Регистрация"}
      onSubmit={handleSubmit}
      onLoad={onLoad}
      isValid={isValid}
      error={error}
    >
      <Input
      className="input__auth"
        label={"Имя"}
        htmlFor={"name"}
        id={"name"}
        name={"name"}
        type={"text"}
        autoComplete={"on"}
        value={values?.name || ""}
        onChange={handleChange}
        pattern={PATTERN_USERNAME}
        errorCondition={errors?.name}
        errorMessage={VALIDATION_MESSAGES.frontend.name}
      />
      <Input
      className="input__auth"
        label={"E-mail"}
        htmlFor={"email"}
        name={"email"}
        id={"email"}
        type={"text"}
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
        name={"password"}
        label={"Пароль"}
        type={"password"}
        autoComplete={"current-password"}
        value={values?.password || ""}
        onChange={handleChange}
        pattern={PATTERN_PASSWORD}
        errorCondition={errors?.password}
        errorMessage={VALIDATION_MESSAGES.frontend.password}
      />
      <p className="entrance__paragraph">
        Уже зарегистрированы?&nbsp;
        <Link className="link link_type_inner-nav" to="/signin">
          Войти
        </Link>
      </p>
    </Entrance>
  );
}

Register.propTypes = {
  onRegistration: PropTypes.func,
  onLoad: PropTypes.bool,
  error: PropTypes.object,
};

export default Register;

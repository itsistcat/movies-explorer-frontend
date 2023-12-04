import React from "react";
import { Link } from "react-router-dom";
import Entrance from "../Entrance/Entrance.js";
import Input from "../Input/Input.js";

function Register() {
  return (
    <Entrance
      heading={"Добро пожаловать!"}
      name={"register"}
      btn={"Зарегистрироваться"}
      btnAriaLabel={"Регистрация"}
    >
      <Input
      className="input__auth"
        label={"Имя"}
        htmlFor={"username"}
        id={"username"}
        type={"text"}
        minLength={"2"}
        maxLength={"30"}
        autoComplete={"on"}
      />
      <Input
      className="input__auth"
        label={"E-mail"}
        htmlFor={"email"}
        id={"email"}
        type={"email"}
        autoComplete={"on"}
      />
      <Input
      className="input__auth"
        htmlFor={"password"}
        id={"password"}
        label={"Пароль"}
        type={"password"}
        minLength={"10"}
        autoComplete={"current-password"}
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

export default Register;

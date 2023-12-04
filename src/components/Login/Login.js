import React from "react";
import { Link } from "react-router-dom";
import Entrance from "../Entrance/Entrance.js";
import Input from "../Input/Input.js";

function Login() {
  return (
    <Entrance
      heading={"Рады видеть!"}
      name={"login"}
      btn={"Войти"}
      btnAriaLabel={"Авторизация"}
    >
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
        Ещё не зарегистрированы?&nbsp;
        <Link className="link link_type_inner-nav" to="/signup">
          Регистрация
        </Link>
      </p>
    </Entrance>
  );
}

export default Login;

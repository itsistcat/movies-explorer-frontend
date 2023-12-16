import React, { useState } from "react";
import { Outlet, Link, useMatch } from "react-router-dom";
import PropTypes from "prop-types";
import useWindowSize from "../../hooks/useWindowSize.js";
import NavLinks from "../NavLinks/NavLinks.js";
import BurgerMenu from "../BurgerMenu/BurgerMenu.js";
import Logo from "../Logo/Logo.js";
import {
  SIGNUP,
  SIGNIN,
  MEDIUM_SCREEN,
} from "../../utils/constants.js";

function Header({ IsUserLoggedIn }) {
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const openModalWindow = () => setIsModalWindowOpened(true);

  const toggleBurgerMenu = () => {
    if (!isModalWindowOpened) {
      openModalWindow();
    }
    setIsBurgerOpened(!isBurgerOpened);
  };

  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isRootHref = href.pathnameBase === "/";
  const isMobileWidth = useWindowSize() <= MEDIUM_SCREEN;

  const renderHeaderMenu = () => {
    // Если пользователь вошел и перешёл на главную страницу, показать логотип и навигацию/гамбургер
    if (isRootHref && IsUserLoggedIn) {
      return (
        <div className="wrapper header__wrapper header__wrapper_color">
          <Logo />
          {isMobileWidth ? (
            <button
              className={`btn  burger${
                isBurgerOpened ? " burger_clicked" : ""
              }`}
              type="button"
              aria-label="Навигация"
              onClick={toggleBurgerMenu}
            >
              <span className="burger__line"></span>
              <span className="burger__line"></span>
              <span className="burger__line"></span>
            </button>
          ) : (
            <NavLinks />
          )}
        </div>
      );
    }
    // Если ширина мобильная и пользователь вошел, показать логотип/гамбургер
    if (isMobileWidth && IsUserLoggedIn) {
      return (
        <div className="wrapper header__wrapper">
          <Logo />
          <button
            className={`btn  burger${
              isBurgerOpened ? " burger_clicked" : ""
            }`}
            type="button"
            aria-label="Навигация"
            onClick={toggleBurgerMenu}
          >
            <span className="burger__line"></span>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
          </button>
        </div>
      );
    }
 // Если пользователь не вошел, показать логотип и ссылки на регистрацию и вход
    if (!IsUserLoggedIn) {
      return (
        <div className="wrapper header__wrapper  header__wrapper_color">
          <Logo />
          <div className="header__auth">
            <Link className="link" to={SIGNUP}>
              Регистрация
            </Link>
            <Link
              className="link link_color btn-auth"
              to={SIGNIN}
            >
              Войти
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="wrapper header__wrapper">
        <Logo />
        <NavLinks />
      </div>
    );
  };

  return (
    <>
      <header className="header">{renderHeaderMenu()}</header>
      <Outlet />
      {isMobileWidth && (
        <BurgerMenu
          isModalWindowOpened={isModalWindowOpened}
          setIsModalWindowOpened={setIsModalWindowOpened}
          isBurgerOpened={isBurgerOpened}
          setIsBurgerOpened={setIsBurgerOpened}
        />
      )}
    </>
  );
}

Header.propTypes = {
  IsUserLoggedIn: PropTypes.bool,
};

export default Header;

import React, { useState } from "react";
import { Outlet, Link, useMatch } from "react-router-dom";
import PropTypes from "prop-types";
import useWindowSize from "../../hooks/useWindowSize.js";
import Logo from "../Logo/Logo.js";
import Navigation from "../Navigation/Navigation.js";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.js";
import {
  ENDPOINT_SIGNUP,
  ENDPOINT_SIGNIN,
  TABLET_SCREEN_WIDTH,
} from "../../utils/constants.js";


function Header({ isCurrentUserLoggedIn }) {
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [isHamburgerMenuOpened, setIsHamburgerMenuOpened] = useState(false);

  function openModalWindow() {
    setIsModalWindowOpened(true);
  }

  function toggleHamburgerMenu() {
    if (!isModalWindowOpened) {
      openModalWindow();
    }

    setIsHamburgerMenuOpened(!isHamburgerMenuOpened);
  }

  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isRootHref = href.pathnameBase === "/";

  const isMobileWidth = useWindowSize() <= TABLET_SCREEN_WIDTH;

  function renderHeaderMenu() {
if (isRootHref && isCurrentUserLoggedIn){
  if (isMobileWidth) {
    return (
      <div className="wrapper header__wrapper header__wrapper_color">

        <Logo />

        <button
          className={`btn hamburger ${(isHamburgerMenuOpened && " hamburger_clicked") || ""
            }`}
          type="button"
          aria-label="Навигация"
          onClick={() => toggleHamburgerMenu()}
        >
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </button>

      </div>
    )
  }
  return (
    <div className="wrapper header__wrapper header__wrapper_color">
      <Logo />
      <Navigation />
    </div>
  )
}

    if (isMobileWidth && isCurrentUserLoggedIn) {
      return (
        <div className="wrapper header__wrapper">

          <Logo />

          <button
            className={`btn hamburger ${(isHamburgerMenuOpened && " hamburger_clicked") || ""
              }`}
            type="button"
            aria-label="Навигация"
            onClick={() => toggleHamburgerMenu()}
          >
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
          </button>

        </div>
      )
    }

    if (!isCurrentUserLoggedIn) {
      return (
        <div className="wrapper header__wrapper  header__wrapper_color">
          <Logo />
          <div className="header__auth">
            <Link className="link" to={ENDPOINT_SIGNUP}>
              Регистрация
            </Link>
            <Link className="link link_color btn-auth" to={ENDPOINT_SIGNIN}>
              Войти
            </Link>
          </div>
        </div>
      )
    }
    return (
      <div className="wrapper header__wrapper">
        <Logo />
        <Navigation />
      </div>
    )

  }
  return (
    <>
      <header className="header">

        {renderHeaderMenu()}


      </header>
      <Outlet />
      {isMobileWidth && (
        <HamburgerMenu
        isModalWindowOpened={isModalWindowOpened}
        setIsModalWindowOpened={setIsModalWindowOpened}
        isHamburgerMenuOpened={isHamburgerMenuOpened}
        setIsHamburgerMenuOpened={setIsHamburgerMenuOpened}
        />
      )}
    </>
  );
}
Header.propTypes = {
  isCurrentUserLoggedIn: PropTypes.bool,
};
export default Header;

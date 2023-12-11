import React, { useState } from "react";
import { Outlet, Link, useMatch } from "react-router-dom";
import PropTypes from "prop-types";
import useWindowSize from "../../hooks/useWindowSize.js";
import Logo from "../Logo/Logo.js";
import Navigation from "../Navigation/Navigation.js";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.js";
import {
  INITIALROUTE_SIGNUP,
  INITIALROUTE_SIGNIN,
  TABLET_SCREEN_WIDTH,
} from "../../utils/constants.js";


function Header({ IsUserLoggedIn }) {
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);

  function openModalWindow() {
    setIsModalWindowOpened(true);
  }

  function toggleHamburgerMenu() {
    if (!isModalWindowOpened) {
      openModalWindow();
    }

    setIsHamburgerOpened(!isHamburgerOpened);
  }

  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isRootHref = href.pathnameBase === "/";

  const isMobileWidth = useWindowSize() <= TABLET_SCREEN_WIDTH;

  function renderHeaderMenu() {
if (isRootHref && IsUserLoggedIn){
  if (isMobileWidth) {
    return (
      <div className="wrapper header__wrapper header__wrapper_color">

        <Logo />

        <button
          className={`btn hamburger ${(isHamburgerOpened && " hamburger_clicked") || ""
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

    if (isMobileWidth && IsUserLoggedIn) {
      return (
        <div className="wrapper header__wrapper">

          <Logo />

          <button
            className={`btn hamburger ${(isHamburgerOpened && " hamburger_clicked") || ""
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

    if (!IsUserLoggedIn) {
      return (
        <div className="wrapper header__wrapper  header__wrapper_color">
          <Logo />
          <div className="header__auth">
            <Link className="link" to={INITIALROUTE_SIGNUP}>
              Регистрация
            </Link>
            <Link className="link link_color btn-auth" to={INITIALROUTE_SIGNIN}>
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
        isHamburgerOpened={isHamburgerOpened}
        setIsHamburgerOpened={setIsHamburgerOpened}
        />
      )}
    </>
  );
}
Header.propTypes = {
  IsUserLoggedIn: PropTypes.bool,
};
export default Header;

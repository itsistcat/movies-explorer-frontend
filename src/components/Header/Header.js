import React from "react";
import { Outlet, Link, useMatch } from "react-router-dom";
import PropTypes from "prop-types";
import useWindowSize from "../../hooks/useWindowSize.js";
import Logo from "../Logo/Logo.js";
import Navigation from "../Navigation/Navigation.js";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.js";


function Header({
  toggleHamburgerMenu,
  isModalWindowOpened,
  isHamburgerMenuOpened,
  closeModalWindow,
  closeHamburgerMenuOnOutsideAndNavClick,
}) {
  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isRootHref = href.pathnameBase === "/";
  const isMobileWidth = useWindowSize() <= 768;

  function renderHeaderMenu() {
    if (!isRootHref && isMobileWidth) {
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

    if (isRootHref) {
      return (
        <div className="wrapper header__wrapper  header__wrapper_color">
          <Logo />
          <div className="header__auth">
            <Link className="link" to={"/signup"}>
              Регистрация
            </Link>
            <Link className="link link_color btn-auth" to={"/signin"}>
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
          isHamburgerMenuOpened={isHamburgerMenuOpened}
          closeModalWindow={closeModalWindow}
          closeHamburgerMenuOnOutsideAndNavClick={
            closeHamburgerMenuOnOutsideAndNavClick
          }
        />
      )}
    </>
  );
}
Header.propTypes = {
  toggleHamburgerMenu: PropTypes.func,
  isModalWindowOpened: PropTypes.bool,
  isHamburgerMenuOpened: PropTypes.bool,
  closeModalWindow: PropTypes.func,
  closeHamburgerMenuOnOutsideAndNavClick: PropTypes.func,
};
export default Header;

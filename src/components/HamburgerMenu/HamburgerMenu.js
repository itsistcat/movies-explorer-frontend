import React from "react";
import PropTypes from "prop-types";
import ModalWindow from "../ModalWindow/ModalWindow.js";
import Navigation from "../Navigation/Navigation.js";

function HamburgerMenu({
  setIsModalWindowOpened,
  isModalWindowOpened,
  isHamburgerOpened,
  setIsHamburgerOpened,
}) {
  return (
    <ModalWindow
    setIsModalWindowOpened={setIsModalWindowOpened}
    isModalWindowOpened={isModalWindowOpened}
    setIsHamburgerOpened={setIsHamburgerOpened}
    isHamburgerOpened={isHamburgerOpened}
    >
      <div
        className={`hamburger-menu${
          (isHamburgerOpened && " hamburger-menu_opened") || ""
        }`}
      >
        <div className="hamburger-menu__wrapper">
          <Navigation />
        </div>
      </div>
    </ModalWindow>
  );
}

HamburgerMenu.propTypes = {
  setIsModalWindowOpened: PropTypes.func,
  isModalWindowOpened: PropTypes.bool,
  isHamburgerOpened: PropTypes.bool,
  setIsHamburgerOpened: PropTypes.func,
};

export default HamburgerMenu;

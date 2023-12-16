import React from "react";
import PropTypes from "prop-types";
import ModalWindow from "../ModalWindow/ModalWindow.js";
import NavLinks from "../NavLinks/NavLinks.js";

function BurgerMenu({
  setIsModalWindowOpened,
  setIsBurgerOpened,
  isModalWindowOpened,
  isBurgerOpened,
}) {
  return (
    <ModalWindow
    setIsModalWindowOpened={setIsModalWindowOpened}
    isModalWindowOpened={isModalWindowOpened}
    setIsBurgerOpened={setIsBurgerOpened}
    isBurgerOpened={isBurgerOpened}
    >
      <div
        className={`burger-menu${
          (isBurgerOpened && " burger-menu_opened") || ""
        }`}
      >
        <div className="burger-menu__wrapper">
          <NavLinks />
        </div>
      </div>
    </ModalWindow>
  );
}

BurgerMenu.propTypes = {
  setIsModalWindowOpened: PropTypes.func,
  isBurgerOpened: PropTypes.bool,
  setIsBurgerOpened: PropTypes.func,
  isModalWindowOpened: PropTypes.bool,
};

export default BurgerMenu;

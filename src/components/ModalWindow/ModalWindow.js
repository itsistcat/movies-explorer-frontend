import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";

function ModalWindow({
  children,
  setIsModalWindowOpened,
  isModalWindowOpened,
  isHamburgerOpened,
  setIsHamburgerOpened,
}) {

  useEffect(() => {
    const body = document.body;

    isModalWindowOpened
      ? body.classList.add("page_no-scroll")
      : body.classList.remove("page_no-scroll");
  }, [isModalWindowOpened]);

  const closeModalWindow = useCallback(() => {
    setIsModalWindowOpened(false);
  }, []);

  const closeHamburgerMenu = useCallback(() => {
    setIsHamburgerOpened(false);
  }, []);

  function closeHamburgerMenuOnOutsideAndNavClick({ target }) {
    const checkSelector = (selector) => target.classList.contains(selector);

    if (checkSelector("modal-window_opened") || checkSelector("link")) {
      closeHamburgerMenu();
    }
  }

  return (
    <div
    className={`modal-window${
      (isModalWindowOpened && " modal-window_opened") || ""
    }${(isHamburgerOpened && " modal-window_bg-color_dark") || ""}`}
    onClick={closeHamburgerMenuOnOutsideAndNavClick}
    onTransitionEnd={({ propertyName, target }) => {
      if (
        propertyName === "transform" &&
        !target.classList.contains("hamburger-menu_opened")
      ) {
        closeModalWindow();
      }
    }}
    >
      {children}
    </div>
  );
}

ModalWindow.propTypes = {
  children: PropTypes.element,
  setIsModalWindowOpened: PropTypes.func,
  isModalWindowOpened: PropTypes.bool,
  isHamburgerOpened: PropTypes.bool,
  setIsHamburgerOpened: PropTypes.func,
};

export default ModalWindow;

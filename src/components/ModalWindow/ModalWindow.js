import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const ModalWindow = ({
  children,
  setIsModalWindowOpened,
  setIsBurgerOpened,
  isModalWindowOpened,
  isBurgerOpened,
}) => {
  useEffect(() => {
    const body = document.body;

    if (isModalWindowOpened) {
      body.classList.add("page_no-scroll");
    } else {
      body.classList.remove("page_no-scroll");
    }
  }, [isModalWindowOpened]);

  const closeBurgerMenu = useCallback(() => {
    setIsBurgerOpened(false);
  }, [setIsBurgerOpened]);

  const closeModalWindow = useCallback(() => {
    setIsModalWindowOpened(false);
  }, [setIsModalWindowOpened]);

  const handleTransitionEnd = ({ propertyName, target }) => {
    if (
      propertyName === "transform" &&
      !target.classList.contains("burger-menu_opened")
    ) {
      closeModalWindow();
    }
  };

  const closeBurgerMenuOnOutsideAndNavClick = ({ target }) => {
    const checkSelector = (selector) => target.classList.contains(selector);
    if (checkSelector("modal-window_opened") || checkSelector("link")) {
      closeBurgerMenu();
    }
  };

  const modalClasses = `modal-window${
    isModalWindowOpened ? " modal-window_opened" : ""
  }${isBurgerOpened ? " modal-window_bg-color_dark" : ""}`;

  return (
    <div
      className={modalClasses}
      onClick={closeBurgerMenuOnOutsideAndNavClick}
      onTransitionEnd={handleTransitionEnd}
    >
      {children}
    </div>
  );
};

ModalWindow.propTypes = {
  setIsModalWindowOpened: PropTypes.func,
  isBurgerOpened: PropTypes.bool,
  children: PropTypes.element,
  setIsBurgerOpened: PropTypes.func,
  isModalWindowOpened: PropTypes.bool,
};

export default ModalWindow;

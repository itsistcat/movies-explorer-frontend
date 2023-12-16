import React from "react";
import { useMatch } from "react-router-dom";
import PropTypes from "prop-types";

import Logo from "../Logo/Logo.js";

function Entrance({
  children,
  heading,
  name,
  btn,
  btnAriaLabel,
  onSubmit,
  onLoad,
  error,
  isValid,
}) {
  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isLoginHref = href.pathname.endsWith("/signin");
  console.log(isLoginHref);

  const renderInputs = () => children.slice(0, -1);
  const renderLink = () => children.slice(-1);

  return (
    <div className="entrance">
      <div className="entrance__wrapper">
        <Logo />
        <h1 className="entrance__heading">{heading}</h1>
        <form
          className={`entrance__form${
            isLoginHref ? " entrance__form_margin_big" : ""
          }`}
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <fieldset className="entrance__fieldset">{renderInputs()}</fieldset>
          <div className="entrance__wrapper-btn">
            <span
              className={`error${
                ((error?.registrationRes || error?.authorizationRes) &&
                  " error_visible") ||
                ""
              } error_type_server-response`}
            >
              {error?.registrationRes || error?.authorizationRes}
            </span>

            <button
              className="btn btn-entrance"
              type="submit"
              aria-label={btnAriaLabel}
              disabled={!isValid || onLoad}
            >
              {onLoad ? "Подождите..." : btn}
            </button>
          </div>
        </form>
        {renderLink()}
      </div>
    </div>
  );
}

Entrance.propTypes = {
  btn: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  error: PropTypes.object,
  btnAriaLabel: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  heading: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onLoad: PropTypes.bool,
};

export default Entrance;

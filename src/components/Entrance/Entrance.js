import React from "react";
import { useMatch } from "react-router-dom";
import PropTypes from "prop-types";

import Logo from "../Logo/Logo.js";

function Entrance({ children, heading, name, btn, btnAriaLabel }) {
  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isLoginHref = href.pathname.endsWith("/signin");
  console.log(isLoginHref);
  const inputs = children.slice(0, -1);
  const link = children.slice(-1);

  return (
    <div className="entrance">
      <div className="entrance__wrapper">
        <Logo />
        <h1 className="entrance__heading">{heading}</h1>
        <form className="entrance__form" name={name}>
          <fieldset
            className={`entrance__fieldset${
              (isLoginHref && " entrance__fieldset_margin_big") || ""
            }`}
          >
            {inputs}
          </fieldset>
          <button
            className="btn btn-entrance"
            type="submit"
            aria-label={btnAriaLabel}
          >
            {btn}
          </button>
        </form>
        {link}
      </div>
    </div>
  );
}

Entrance.propTypes = {
  children: PropTypes.array.isRequired,
  heading: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  btn: PropTypes.string.isRequired,
  btnAriaLabel: PropTypes.string.isRequired,
};

export default Entrance;

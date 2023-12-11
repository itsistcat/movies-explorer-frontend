import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { INITIALROUTE_ROOT, INITIALROUTE_MOVIES } from "../../utils/constants";

function PageNotFound({ IsUserLoggedIn }) {
  return (
    <div className="not-found">
      <div className="not-found__wrapper">
        <div className="not-found__description">
          <h1 className="not-found__heading">404</h1>
          <p className="not-found__paragraph">Страница не найдена</p>
        </div>
        <Link
          className="link not-found__link"
          to={IsUserLoggedIn ? INITIALROUTE_MOVIES : INITIALROUTE_ROOT}
        >
          Назад
        </Link>
      </div>
    </div>
  );
}

PageNotFound.propTypes = {
  IsUserLoggedIn: PropTypes.bool,
};

export default PageNotFound;

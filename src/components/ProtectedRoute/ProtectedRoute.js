import React from "react";
import { Navigate } from "react-router-dom";
import { ROOT } from "../../utils/constants";
import PropTypes from "prop-types";


// Компонент защищенного маршрута
const ProtectedRoute = ({ isUserLoggedIn, children }) => {
  if (isUserLoggedIn) {
    return children;
  } else {
    return <Navigate to={ROOT} replace />;
  }
};

ProtectedRoute.propTypes = {
  isUserLoggedIn: PropTypes.bool,
  children: PropTypes.object,
};

export default ProtectedRoute;

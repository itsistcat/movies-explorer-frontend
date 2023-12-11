import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { INITIALROUTE_ROOT } from "../../utils/constants";

const ProtectedRoute = ({ isUserLoggedIn, children }) =>
  isUserLoggedIn ? children : <Navigate to={INITIALROUTE_ROOT} replace />;

ProtectedRoute.propTypes = {
  isUserLoggedIn: PropTypes.bool,
  children: PropTypes.object,
};

export default ProtectedRoute;

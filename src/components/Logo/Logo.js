import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import { INITIALROUTE_ROOT } from "../../utils/constants";

export default function Logo() {
  return (
    <Link to={INITIALROUTE_ROOT}>
      <img
        className="logo"
        src={logo}
        alt="Лого с изображением смайлика"
      />
    </Link>
  );
}

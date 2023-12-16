import React from "react";
import logo from "../../assets/icons/logo.svg";
import { Link } from "react-router-dom";
import { ROOT } from "../../utils/constants";

export default function Logo() {
  return (
    <Link to={ROOT}>
      <img
        className="logo"
        src={logo}
        alt="Лого с изображением смайлика"
      />
    </Link>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";

export default function Logo() {
  return (
    <Link to={"/"}>
      <img
        className="logo"
        src={logo}
        alt="Лого с изображением смайлика"
      />
    </Link>
  );
}

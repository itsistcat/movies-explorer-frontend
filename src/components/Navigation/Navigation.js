import React from "react";
import { Link, NavLink } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize.js";
import {
  INITIALROUTE_ROOT,
  INITIALROUTE_MOVIES,
  INITIALROUTE_SAVED_MOVIES,
  INITIALROUTE_PROFILE,
} from "../../utils/constants.js";

function Navigation() {
  const isMobileWidth = useWindowSize() <= 768;


  const links = [
    {
      path: INITIALROUTE_MOVIES,
      label: "Фильмы",
    },
    {
      path: INITIALROUTE_SAVED_MOVIES,
      label: "Сохранённые фильмы",
    },
  ];
  function createNavLink(path, label) {
    return (
      <li key={label}>
        <NavLink
          className={({ isActive }) =>
          `link nav__link${(isActive && " nav__link-active") || ""}`
          }
          to={path}
        >
          {label}
        </NavLink>
      </li>
    );
  }
  return (
<div className="layout-nav">
      <nav className="nav">
        <ul className="list nav__list">
        {isMobileWidth && createNavLink(INITIALROUTE_ROOT, "Главная")}
          {links.map(({ path, label }) => createNavLink(path, label))}
        </ul>
      </nav>
      <Link className="link link-profile" to={INITIALROUTE_PROFILE}>
        Аккаунт
      </Link>
    </div>
  );
}
export default Navigation;

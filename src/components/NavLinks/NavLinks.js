import React from "react";
import { Link, NavLink } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize.js";
import {
  ROOT,
  SAVED_MOVIES,
  PROFILE,
  MOVIES,
} from "../../utils/constants.js";

function NavLinks() {
  const isMobileWidth = useWindowSize() <= 768;

  const createNavLink = (path, label) => (
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

  const links = [
    {
      path: MOVIES,
      label: "Фильмы",
    },
    {
      path: SAVED_MOVIES,
      label: "Сохранённые фильмы",
    },
  ];

  return (
    <div className="header-nav">
      <nav className="nav">
        <ul className="list nav__list">
          {isMobileWidth && createNavLink(ROOT, "Главная")}
          {links.map(({ path, label }) => createNavLink(path, label))}
        </ul>
      </nav>
      <Link className="link link-profile" to={PROFILE}>
        Аккаунт
      </Link>
    </div>
  );
}

export default NavLinks;

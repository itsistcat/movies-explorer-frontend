import React from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { MOVIES, SAVED_MOVIES } from "../../utils/constants";

function FilterCheckbox({ onFilter, isFilterCheckboxChecked }) {
  const location = useLocation();
  const pathMovies = location.pathname === MOVIES;
  const pathSavedMovies = location.pathname === SAVED_MOVIES;

  // Обработчик изменения состояния чекбокса
  function handleToggleFilterCheckbox(event) {
    if (pathMovies || pathSavedMovies) {
      if (event.type === "change" || (event.type === "keydown" && event.key === "Enter")) {
        const checked = event.target.checked;
        onFilter(checked);
      }
    }
  }

  return (
    <div className="filter-checkbox">
      <div
        className="filter-checkbox__wrapper"
        tabIndex="0"
        onChange={handleToggleFilterCheckbox}
        onKeyDown={handleToggleFilterCheckbox}
      >
        <input
          className="filter-checkbox__input"
          id="filter-films"
          type="checkbox"
          defaultChecked={isFilterCheckboxChecked}
        />
        <label className="filter-checkbox__label" htmlFor="filter-films" />
      </div>
      <span className="filter-checkbox__span">Короткометражки</span>
    </div>
  );
}

FilterCheckbox.propTypes = {
  isFilterCheckboxChecked: PropTypes.bool,
  onFilter: PropTypes.func,
};

export default FilterCheckbox;

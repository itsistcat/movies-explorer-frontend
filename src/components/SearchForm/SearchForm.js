import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import useWindowSize from "../../hooks/useWindowSize.js";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import lupa from "../../assets/icons/icon-lupa.svg";

function SearchForm({
  onSearch,
  setIsSearchRequestInProgress,
  searchFormValue,
  onFilter,
  isFilterCheckboxChecked,
  valueRequired,
  prevValue,
  setPrevValue,
}) {
  const movie = useRef("");
  const isMobileWidth = useWindowSize() <= 480;
  const [isSearchFormValid, setIsSearchFormValid] = useState(true);

  function handleSubmit(evt) {
    evt.preventDefault();

    const { value } = movie.current;
    if (value === prevValue) return;

    if (!value.trim()) {
      setIsSearchFormValid(false);
    } else {
      setIsSearchFormValid(true);
      onSearch(value);
      setIsSearchRequestInProgress(true);
      setPrevValue(value)
    }
  }

  function renderSearchForm() {
    if (!isMobileWidth) {
      return (
        <form className="search-film" name="search-film" noValidate onSubmit={handleSubmit}>
          <div className="search-film__wrapper">
            <img className="lupa" src={lupa} alt="Личное фото" />

            <input
              className="search-film__input"
              ref={movie}
              type="text"
              placeholder="Фильм"
              defaultValue={searchFormValue}
              required={valueRequired ?? false}
            />
            <button
              className="btn btn-search"
              type="submit"
              aria-label="Поиск фильмов"
            />
          </div>
          <span
            className={`error${(!isSearchFormValid && " error_visible") || ""}`}
          >
            Нужно ввести ключевое слово
          </span>
        </form>
      );
    }
    else {
      return (
        <form className="search-film" name="search-film" noValidate onSubmit={handleSubmit} >
          <div className="search-film__wrapper">
          <input
              className="search-film__input"
              ref={movie}
              type="text"
              placeholder="Фильм"
              defaultValue={searchFormValue}
              required={valueRequired ?? false}
            />
            <button
              className="btn btn-search"
              type="submit"
              aria-label="Поиск фильмов"
            />
          </div>
          <span
            className={`error${(!isSearchFormValid && " error_visible") || ""}`}
          >
            Нужно ввести ключевое слово
          </span>
        </form>
      )
    }
  }
  return (
    <section className="search" aria-label="Поиск фильмов">
      <div className="wrapper search__wrapper">
        {renderSearchForm()}
        <FilterCheckbox
          onFilter={onFilter}
          isFilterCheckboxChecked={isFilterCheckboxChecked}
        />
      </div>
    </section>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func,
  setIsSearchRequestInProgress: PropTypes.func,
  searchFormValue: PropTypes.string,
  onFilter: PropTypes.func,
  isFilterCheckboxChecked: PropTypes.bool,
  valueRequired: PropTypes.bool,
  prevValue: PropTypes.string,
  setPrevValue: PropTypes.func,
};

export default SearchForm;


import React from "react";
import useWindowSize from "../../hooks/useWindowSize.js";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import lupa from "../../assets/icons/icon-lupa.svg";

function SearchForm() {
  const isMobileWidth = useWindowSize() <= 480;


  function renderSearchForm() {
    if (!isMobileWidth) {
      return (
        <form className="search-film" name="search-film">
          <img className="lupa" src={lupa} alt="Личное фото" />
          <input className="search-film__input" type="text" placeholder="Фильм" required />
          <button
            className="btn btn-search"
            type="submit"
            aria-label="Поиск фильмов"
          />
        </form>
      );
    }
    else {
      return (
        <form className="search-film" name="search-film">
          <input className="search-film__input" type="text" placeholder="Фильм" required />
          <button
            className="btn btn-search"
            type="submit"
            aria-label="Поиск фильмов"
          />
        </form>
      )
    }
  }
  return (
    <section className="search" aria-label="Поиск фильмов">
      <div className="wrapper search__wrapper">
        {renderSearchForm()}
        <FilterCheckbox />
      </div>
    </section>
  );
}
export default SearchForm;


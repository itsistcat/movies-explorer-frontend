import React from "react";
import PropTypes from "prop-types";
import MoviesCard from "../MoviesCard/MoviesCard";
import { cards } from "./cardsDataTemporary";

function MoviesCardList({ icon }) {
  return (
    <section
      className="movies-gallery"
      aria-label="Галерея фильмов"
    >
      <div className="wrapper movies-gallery__wrapper">
      <div className="movies-gallery__movies">
          {cards.map((card) => (
            <MoviesCard key={card.movieId} card={card} icon={icon} />
          ))}
        </div>
        <button
          className="btn movies-gallery__btn-more"
          type="button"
          aria-label="Новые карточки"
        >
          Ещё
        </button>
      </div>
    </section>
  );
}

MoviesCardList.propTypes = {
  icon: PropTypes.element,
};

export default MoviesCardList;

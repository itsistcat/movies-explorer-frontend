import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import CardItems from "../CardItems/CardItems";
import Loader from "../Loader/Loader";
import useWindowSize from "../../hooks/useWindowSize";

import {
  MOVIES,
  LARGE_SCREEN,
  SMALL_SCREEN,
  LARGE_SCREEN_ADD,
  MEDIUM_SCREEN_ADD,
  SMALL_SCREEN_ADD,
  LARGE_CARD_SCREEN,
  MEDIUM_CARD_SCREEN,
  SMALL_CARD_SCREEN,
} from "../../utils/constants";

function CardList({
  movies,
  icon,
  onMovieSelect,
  onLoad,
  hasUserSearched,
  error,
}) {
  const location = useLocation();
  const pathMovies = location.pathname === MOVIES;
  const windowWidth = useWindowSize();
  const isDesktop = windowWidth > LARGE_SCREEN;
  const isTablet =
    windowWidth > SMALL_SCREEN && windowWidth <= LARGE_SCREEN;

  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    const isInitialVisibleCards = [
      LARGE_CARD_SCREEN,
      MEDIUM_CARD_SCREEN,
      SMALL_CARD_SCREEN,
      0,
    ].includes(visibleCards);

    if (isInitialVisibleCards) {
      setVisibleCards(
        isDesktop
          ? LARGE_CARD_SCREEN
          : isTablet
          ? MEDIUM_CARD_SCREEN
          : SMALL_CARD_SCREEN
      );
    }

    const isDesktopIncrementNeeded =
      isDesktop && visibleCards % 3 !== 0 && !isInitialVisibleCards;

    if (isDesktopIncrementNeeded) {
      setVisibleCards((prevVal) => (prevVal % 3 === 1 ? prevVal + 2 : prevVal + 1));
    }

    const isTabletIncrementNeeded = isTablet && visibleCards % 2 !== 0;

    if (isTabletIncrementNeeded) {
      setVisibleCards((prevVal) => prevVal + 1);
    }
  }, [windowWidth]);


  function renderCards() {
    return (
      <div className="card-list__movies">
        {(movies?.length &&
          (pathMovies
            ? movies.slice(0, visibleCards)
            : movies.slice().reverse()
          ).map((movie) => (
            <CardItems
              key={movie.id || movie.movieId}
              movie={movie}
              icon={icon}
              onMovieSelect={onMovieSelect}
            />
          ))) ||
          ""}
      </div>
    );
  }

  function renderResults() {
    if (onLoad) return <Loader />;

    if (hasUserSearched && !movies?.length && !error?.moviesResponse) {
      return <p className="paragraph paragraph__nothing">Ничего не найдено</p>;
    }

    if (hasUserSearched && !movies?.length && error?.moviesResponse) {
      return (
        <p className="paragraph paragraph_type_error">
          {error?.moviesResponse}
        </p>
      );
    }

    return renderCards();
  }

  function setMoreCards() {
    setVisibleCards(
      (prevVal) =>
        prevVal +
        (isDesktop
          ? LARGE_SCREEN_ADD
          : isTablet
          ? MEDIUM_SCREEN_ADD
          : SMALL_SCREEN_ADD)
    );
  }

  return (
    <section className="card-list" aria-label="Фильмы">
      <div className="wrapper card-list__wrapper">
        {renderResults()}

        {visibleCards < movies?.length && pathMovies && (
          <button
            className="btn card-list__btn-more"
            type="button"
            aria-label="Отображение новых карточек"
            onClick={() => setMoreCards()}
          >
            Ещё
          </button>
        )}
      </div>
    </section>
  );
}

CardList.propTypes = {
  onMovieSelect: PropTypes.func,
  hasUserSearched: PropTypes.bool,
  icon: PropTypes.element,
  onLoad: PropTypes.bool,
  error: PropTypes.object,
  movies: PropTypes.array,
};

export default CardList;

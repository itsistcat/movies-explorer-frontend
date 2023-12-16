import React from "react";
import PropTypes from "prop-types";

function CardItems({ movie, icon, onMovieSelect }) {
  const { nameRU, duration, trailerLink, image, selected } = movie;

  const countTime = (duration) => {
    const time = duration / 60;
    const hours = Math.floor(time);
    const minutes = duration - hours * 60;

    if (hours && minutes) return `${hours}ч ${minutes}м`;

    return hours ? `${hours}ч` : `${minutes}м`;
  };

  const handleMovieSelect = (evt) => {
    onMovieSelect(evt, movie);
  };

  return (
    <article className="card-items">
      <div className="card-items__description">
        <h2 className="card-items__heading">{nameRU}</h2>
        <span className="card-items__duration">{countTime(duration)}</span>
      </div>
      <button
        className={`btn card-items__btn-favourite${
          selected ? " btn card-items__btn-favourite_active" : ""
        }`}
        type="button"
        aria-label="Добавление в избранное"
        onClick={handleMovieSelect}
      >
        {icon}
      </button>
      <a
        className="link card-items__link"
        href={trailerLink}
        rel="noreferrer"
        target="_blank"
      >
        <img
          className="card-items__photo"
          src={
            (image?.url && `https://api.nomoreparties.co${image?.url}`) ||
            image
          }
          alt={`Постер фильма "${nameRU}"`}
        />
      </a>
    </article>
  );
}

CardItems.propTypes = {
  movie: PropTypes.object,
  onMovieSelect: PropTypes.func,
  icon: PropTypes.element,
};

export default CardItems;

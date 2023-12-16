import React from "react";
import PropTypes from "prop-types";
import arrow from "../../assets/icons/arrow-bar.svg";

function PortfolioProject({ url, heading }) {
  return (
    <li className="portfolio__project">
      <a className="link portfolio__link" href={url} rel="noreferrer" target="_blank">
      <h3 className="portfolio__project-heading">{heading}</h3>
        <img className="portfolio__project-arrow" src={arrow} alt="Чёрная стрелка" />
      </a>
    </li>
  );
}

PortfolioProject.propTypes = {
  heading: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default PortfolioProject;

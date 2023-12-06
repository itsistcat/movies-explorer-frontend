import React from "react";
import PropTypes from "prop-types";

function AboutProjectSubject({ heading, paragraph }) {
  return (
    <article className="diploma-work">
      <h3 className="diploma-work__heading">{heading}</h3>
      <p className="paragraph">{paragraph}</p>
    </article>
  );
}

AboutProjectSubject.propTypes = {
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
};

export default AboutProjectSubject;

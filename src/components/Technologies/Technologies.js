import React from "react";
import TechnologiesList from "../TechnologiesList/TechnologiesList.js";

export default function Technologies() {
  return (
    <section className="technologies" id="technologies">
      <div className="wrapper section-wrapper technologies__wrapper">
        <h2 className="section-heading technologies__heading">Технологии</h2>
        <div className="technologies__list">
          <h3 className="section-heading-main-tech">7 технологий</h3>
          <p className="paragraph technologies__paragraph">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <TechnologiesList />
        </div>
      </div>
    </section>
  );
}

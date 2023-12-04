import React from "react";

import avatar from "../../assets/images/img-me.jpg";

function AboutMe() {
  function calculateAge() {
    const today = new Date();
    const birthDate = new Date(2000, 3, 12);
    const month = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    let years = String(age);
    if (years >= 11 && years <= 14) {
      years = "лет";
    } else if (years.endsWith("1")) {
      years = "год";
    } else if (years.endsWith("2") || years.endsWith("3") || years.endsWith("4")) {
      years = "года";
    } else {
      years = "лет";
    }

    return `${age} ${years}`;
  }

  return (
    <section className="about-me">
      <div className="wrapper section-wrapper section-wrapper_indent_s">
        <h2 className="section-heading">Студент</h2>
        <div className="about-me__wrapper">
          <div className="about-me__biography">
            <h3 className="about-me__heading section-heading-main">Ольга</h3>
            <p className="about-me__subheading">Фронтенд-разработчик, {calculateAge()}</p>
            <p className="paragraph about-me__paragraph">Я родилась и живу в Приднестровье, закончила факультет &laquo;Компьютерных систем&raquo; в Техническом университете - г.София. Люблю котиков, музыку, аниме и Советский союз. Сейчас я работаю графическим дизайнером, но потихоньку начаю выполнять обязаности джуна.</p>
            <a className="paragraph-s" href="https://github.com/itsistcat" rel="noreferrer" target="_blank">Github</a>
          </div>
          <img className="avatar" src={avatar} alt="Личное фото" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

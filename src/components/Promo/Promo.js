import React from "react";
import plant from "../../assets/images/img-plant.png";

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrapper">
        <div className="promo__info">
          <h1 className="section-heading-main promo__heading">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <a className="paragraph promo__paragraph">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</a>
          <a className="link promo__link" href="#diploma">Узнать больше</a>
        </div>
        <div className="plant">
        <img className="plant__position" src={plant} alt="Фото планеты" />
        </div>
      </div>
    </section>
  );
}

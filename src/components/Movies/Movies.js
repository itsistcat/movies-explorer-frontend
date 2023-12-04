import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies() {
  const icon = (
    <svg
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 1.9C0.5 1.40294 0.902944 1 1.4 1H8.6C9.09706 1 9.5 1.40294 9.5 1.9V12.4789C9.5 12.5552 9.41798 12.6034 9.35133 12.5662L6.21676 10.8198C5.46033 10.3984 4.53968 10.3984 3.78324 10.8198L0.648671 12.5662C0.582015 12.6034 0.5 12.5552 0.5 12.4789V1.9Z"
        stroke="#E8E8E8"
      />
    </svg>
  );
  return (
    <>
      <main>
        <SearchForm />
        <MoviesCardList icon={icon} />
      </main>
      <Footer />
    </>
  );
}
export default Movies;
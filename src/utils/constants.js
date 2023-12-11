// URLS
export const URL_BASE = "https://api.films.nomoredomainsmonster.ru";
export const URL_BASE_LOCAL = "http://localhost:3001";
export const URL_BEATFILM_MOVIES =
  "https://api.nomoreparties.co/beatfilm-movies";

// INITIALROUTES
export const INITIALROUTE_ROOT = "/";
export const INITIALROUTE_SIGNUP = "/signup";
export const INITIALROUTE_SIGNIN = "/signin";
export const INITIALROUTE_MOVIES = "/movies";
export const INITIALROUTE_SAVED_MOVIES = "/saved-movies";
export const INITIALROUTE_PROFILE = "/profile";
export const INITIALROUTE_NOTHING = "*";
export const INITIALROUTE_USERS_CURRENT = "/users/me"
  // REGEX
export const PATTERN_EMAIL =
  "[A-z0-9!#$%&'*+-/=?^_`{|]{1,64}@[A-z0-9-.]{2,253}\\.[A-z]{2,63}";
export const PATTERN_PASSWORD =
  "(?=.*[A-z])(?=.*\\d)(?=.*[!@#$%^&*])(?=.{8,}).*";
export const PATTERN_USERNAME = "[A-я-\\s]{2,30}";

// MEDIA QUERIES (SEE ALSO VARIABLES IN SCSS)
export const LAPTOP_SCREEN_WIDTH = 1251;
export const TABLET_SCREEN_WIDTH = 768;
export const MOBILE_SCREEN_WIDTH = 480;

// MOVIES
export const SHORT_FILM_DURATION = 40;

export const COUNT_PIC_DESKTOP_INIT = 12;
export const COUNT_PIC_TABLET_INIT = 8;
export const COUNT_PIC_MOBILE_INIT = 5;

export const COUNT_PIC_DESKTOP_ADD = 3;
export const COUNT_PIC_TABLET_ADD = 2;
export const COUNT_PIC_MOBILE_ADD = 2;

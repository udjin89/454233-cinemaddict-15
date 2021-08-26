import FilmCardView from '../view/view-film-card.js';
import PopupView from '../view/view-popup.js';
import { RenderPosition, render } from '../utils/render.js';

export default class FilmCard {

  constructor(filmContainer) {
    this._filmContainer = filmContainer;

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
  }

  init(film) {
    // console.log(film);
    this._film = film; // тут передан фильм- объект со всей информацией о нем
    this._view = new FilmCardView(this._film); // создаем экземпляр класса, то есть карточку фильма: разметка, методы
    //устанавливаю обработчик, через метод setWatchListHandlerClick(он есть у каждой карточки), предаю this._handleWatchListClick - логику, что он будет делать при клике
    this._view.setWatchListHandlerClick(this._handleWatchListClick);
    this._view.setAsWatchedListHandlerClick(this._handleAsWatchedClick);
    this._view.setFavoriteHandlerClick(this._handleFavoriteClick);

    this._viewPopup = new PopupView(this._film);
    console.log(this._film);
    this._renderFilm();
  }
  _changeData(updateFilm) {

  }

  _handleWatchListClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !(this._film.isWatchlist),
        },
      ),
    );
  }

  _handleAsWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !(this._film.isWatched),
        },
      ),
    );
  }

  _handleFavoriteClick() {
    // console.log(this._film);
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !(this._film.isFavorite),
        },
      ),
    );
  }

  _renderFilm() {

    // const openCardPopup = () => {
    //   // render(siteBody, new PopupView(movie).getElement(), RenderPosition.BEFOREEND);
    //   siteBody.appendChild(cardPopup.getElement());
    //   siteBody.classList.add('hide-overflow');
    // };

    // const removeCardPopup = () => {
    //   siteBody.removeChild(cardPopup.getElement());
    //   siteBody.classList.remove('hide-overflow');
    // };

    // const onEscKeyDown = (evt) => {
    //   if (evt.key === 'Escape' || evt.key === 'Esc') {
    //     evt.preventDefault();
    //     removeCardPopup();
    //     document.removeEventListener('keydown', onEscKeyDown);
    //   }
    // };

    // cardFilm.setClickFilm(() => {
    //   openCardPopup();
    //   document.addEventListener('keydown', onEscKeyDown);
    // });

    // cardPopup.setClosePopup(() => {
    //   removeCardPopup();
    // });
    render(this._filmContainer, this._view, RenderPosition.BEFOREEND);
  }

  _renderFilmCard() {
    // Главный метод по отрисовке, который будет вызывать остальные
  }
}

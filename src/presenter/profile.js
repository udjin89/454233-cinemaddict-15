import ProfileView from '../view/view-profile.js';
import { RenderPosition, render, removeComponent, replace } from '../utils/render.js';
import { getRatingUser } from '../utils/stats.js';
export default class Profile {
  constructor(container, filmsModel) {
    this._container = container; //контейнер куда рендерим
    this._filmsModel = filmsModel; //данные

    this._profile = null;
    this._countFilms = 0;

    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    // console.log('profile');
    // console.log(this._filmsModel);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._renderProfile();
  }

  _renderProfile() {

    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    const status = this.getStatus();
    console.log('get status in profile.js -> ' + status)
    this._profile = new ProfileView(status);

    render(this._container, this._profile, RenderPosition.BEFOREEND);
  }

  _handleModelEvent() {
    console.log('profile change model');
    removeComponent(this._profile);
    this.init();

  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }

  getStatus() {
    let count = 0;
    const films = this._getFilms();
    return getRatingUser(films);
    // // elem.isWatched ? count++ : ;
    // films.reduce((accumulator, currentValue) => {
    //   // console.log(currentValue.isWatched);
    //   if (currentValue.isWatched) {
    //     count++;
    //   }
    // });
    console.log('->>>>' + getRatingUser(films));
  }

}

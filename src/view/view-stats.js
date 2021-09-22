
import { ShowPeriod } from '../const.js';
import { filterWachedFilmsInPeriod, getSortedGenre, getWatchedInfo } from '../utils/stats.js';
import Smart from './smart.js';

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Chart.register(...registerables);

const BAR_HEIGHT = 50;
const BG_COLOR = '#ffe800';
const HOVER_BG_COLOR = '#ffe800';

const HOUR = 60;

const renderCharts = ({ genres: genresOriginal = {} }, statisticCtx) => {

  const sortGenres = getSortedGenre(genresOriginal);

  const genres = sortGenres.map((item) => item.genre);
  const count = sortGenres.map((item) => item.count);

  statisticCtx.height = BAR_HEIGHT * 5;
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    // type: 'bar',
    data: {
      labels: genres,
      datasets: [{
        data: count,
        backgroundColor: BG_COLOR,
        hoverBackgroundColor: HOVER_BG_COLOR,
        anchor: 'start',
      }],
    },
    options: {
      // indexAxis: 'y',
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


const createStats = (rankName, {films, period}) => {
  console.log(films, period);
  const {watched, allTime, genres} = getWatchedInfo(films);
  const hours = Math.floor(allTime / HOUR);
  const minutes = Math.floor( allTime - hours * HOUR);


  const getTopGenres = () => {
    if (Object.keys(genres).length !== 0) {
      return getSortedGenre(genres)[0].genre;
    }
    return '';
  };

  // console.log('getSortedGenre:####', getSortedGenre(genres));


  // console.log('genres:#####', genres);
  // console.log('rankName:#####', rankName);
  // console.log('{films, period}:#####', films, period);
  const genre = null;
  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rankName}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="${ShowPeriod.ALL_TIME}" ${period === ShowPeriod.ALL_TIME ? 'checked' : ''} >
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${ShowPeriod.DAY}" ${period === ShowPeriod.DAY ? 'checked' : ''}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${ShowPeriod.WEEK}" ${period === ShowPeriod.WEEK ? 'checked' : ''}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${ShowPeriod.MOUTH}" ${period === ShowPeriod.MOUTH ? 'checked' : ''}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${ShowPeriod.YEAR}" ${period === ShowPeriod.YEAR ? 'checked' : ''}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watched} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hours}<span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${getTopGenres()}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000">
        </canvas>
      </div>

    </section>

    `
  );
};
export default class Stats extends Smart {
  constructor(state, rankName) {
    // console.log(state, rankName);
    super();
    this._chart = null;
    this._period = ShowPeriod.ALL_TIME;
    this._state = state;
    this._rankName = rankName;

    this._renderChart();

    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._setFilterChangeHandler();
  }

  _getWatchedFilms() {
    return filterWachedFilmsInPeriod(this._state);
  }

  _setFilterChangeHandler(){
    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._filterChangeHandler);
  }

  _filterChangeHandler(evt) {
    evt.preventDefault();
    this._state.period = evt.target.value;

    this.updateData({
      period : this._state.period,
    });

  }

  restoreHandlers() {
    this._renderChart();
    this._setFilterChangeHandler();
  }

  _renderChart() {
    if(this._chart !==null) {
      this._chart = null;
    }
    const statisticCtx = this.getElement().querySelector('.statistic__chart');

    this._chart = renderCharts(getWatchedInfo(this._state.films), statisticCtx);

  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией
    return createStats(this._rankName, this._state, this._getWatchedFilms());
  }
}

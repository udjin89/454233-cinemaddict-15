import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AbstractView from './abstract.js';
const BAR_HEIGHT = 50;


const renderCharts = (films) => {
  const statisticCtx = document.querySelector('.statistic__chart');
  console.log('renderCharts films-> ' + films);
  console.log('renderCharts -> ' + statisticCtx);
  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  statisticCtx.height = BAR_HEIGHT * 5;
  console.log('renderCharts height-> ' + statisticCtx.height);
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: ['Sci-Fi', 'Animation', 'Fantasy', 'Comedy', 'TV Series'],
      datasets: [{
        data: [11, 8, 7, 4, 3],
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
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

// const createStats = (films) => (
//   `

//   `
// );
export default class chart extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() { //Возвращаем разметку, сделано для удобства отдельной функцией

    return renderCharts(this._films);
  }
}

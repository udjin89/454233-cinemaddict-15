import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AbstractView from './abstract.js';
const BAR_HEIGHT = 50;

Chart.register(...registerables);

const renderCharts = (films) => {
  const statisticCtx = document.querySelector('.statistic__chart');
  // console.log('renderCharts films-> ' + films);
  // console.log('renderCharts -> ' + statisticCtx);
  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  statisticCtx.height = BAR_HEIGHT * 5;
  // console.log('renderCharts height-> ' + statisticCtx.height);
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'bar',
    data: {
      labels: ['Sci-Fi', 'Animation', 'Fantasy', 'Comedy', 'TV Series', 'ggg'],
      datasets: [{
        data: [20, 8, 7, 4, 3, 1],
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
        font: {
          size: 0,
        },
      }],
      font: {
        size: 0,
      },
    },
    title: {
      fontColor: '#000000',
    },
    options: {
      indexAxis: 'y',
      data: {
        font: {
          size: 44,
        },
      },
      plugins: {
        labels: {
          font: {
            size: 44,
          },
        },
        datalabels: {
          font: {
            size: 15,
          },
          color: '#ff00ff',
          anchor: 'start',
          align: 'start',
          offset: 10,
        },
      },
      scales: {
        // scaleLabel: {
        //   display: true,
        //   fontSize: 8,
        //   fontColor: "#4a4a4a"
        // },
        yAxes: [{
          ticks: {
            fontColor: '#00ffff',
            padding: 0,
            fontSize: 30,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
          font: {
            size: 0,
          },
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
        labels: {
          font: {
            size: 40,
          },
        },
        font: {
          size: 40,
        },
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

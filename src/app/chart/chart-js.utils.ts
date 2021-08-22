import {eChartTypes, ChartGraphModel} from '../models/chartGraph';

export function getLineChartConfig(data: ChartGraphModel[], data2: ChartGraphModel[], data3: ChartGraphModel[], ctx: CanvasRenderingContext2D): any {

  const firstgraph = ctx.createLinearGradient(0, 0, 0, 324);
  const secondgraph = ctx.createLinearGradient(0, 0, 0, 324);
  const thirdgraph = ctx.createLinearGradient(0, 0, 0, 324);

  const config = {
    type: eChartTypes.LINE,
    data: {
      labels: data.map((r) => r.month || ''),
      datasets: getDataSets(data, data2, data3, firstgraph, secondgraph, thirdgraph)
    },
    options: {
      interaction: {
        intersect: false
      },
      responsive: true,
      elements: {
        point: {
          pointStyle: 'circle',
          radius: 4,
          borderWidth: 2,
        }
      },
      plugins: {
        tooltip: {
          // enabled: true,
        },
        legend: {
          display: false,
          labels: {
            usePointStyle: false
          }
        },
        title: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          position: 'right',
          min: 0,
          max: 30,
          ticks: {
            autoSkip: true,
            maxTicksLimit: 6,
            color: 'rgba(0,0,0,0.4)'
          }
        },
        x: {
          ticks: {
            display: true
          }
        }
      }
    }
  };
  return config;

}


function getDataSets(data: ChartGraphModel[], data2: ChartGraphModel[], data3: ChartGraphModel[],
                     firstgraph: CanvasGradient, secondgraph: CanvasGradient, thirdgraph: CanvasGradient): any {

  return [
    {
      label: 'employees',
      data: data.map((r) => r.numberOfEmployees),
      backgroundColor: firstgraph,
      borderColor: 'red',
      tension: 0.4,
      borderWidth: 2,
      fill: true,
      pointBackgroundColor: '#fff',
    },
    {
      label: 'employees',
      data: data2.map((r) => r.numberOfEmployees),
      backgroundColor: secondgraph,
      borderColor: 'rgba(163, 161, 251, 1)',
      tension: 0.4,
      borderWidth: 2,
      fill: true,
      pointBackgroundColor: '#fff'
    },
    {
      label: 'employees',
      data: data3.map((r) => r.numberOfEmployees),
      backgroundColor: thirdgraph,
      borderColor: 'orange',
      tension: 0.4,
      borderWidth: 2,
      fill: true,
      pointBackgroundColor: '#fff'
    }
  ];
}

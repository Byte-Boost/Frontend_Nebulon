import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Importe o pacote Chart.js

let BarChart = ({type, id, width, height, title, dataX, dataY}) => {

  let barColors = ['rgba(210,65,108,0.7)'];

  let xValues = dataX
  let yValues = dataY

  useEffect(() => {

    // Criar o gráfico usando Chart.js
    var ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
      type: type,
      data: {
        labels: xValues,
        datasets: [{
          label: 'Valor em R$',
          data: yValues,
          backgroundColor: barColors,
          borderColor: 'rgba(210,65,108,1)',
          borderWidth: 2
        }
        ]
      },
      options: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: title
        }
      }
    });
  }, []);

  return (
    <div className='grow'>
      <canvas id={id} style={{ width: width, height: height}}></canvas>
    </div>
  );
}

export default BarChart;


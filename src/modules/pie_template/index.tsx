import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Importe o pacote Chart.js

let PieTemplate = ({id, dataX, dataY, colors}) => {

  let barColors = colors//['rgba(210,65,108,0.7)'];

  let xValues = dataX
  let yValues = dataY

  useEffect(() => {

    // Criar o gráfico usando Chart.js
    var ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: xValues,
        datasets: [{
          label: 'Valor em R$',
          data: yValues,
          backgroundColor: barColors
        }
        ]
      },
      options: {
        responsive: true,
        aspectRatio: 1|1,
        resizeDelay: 1
      }
    });
  }, []);

  return (
    <div className='grow flex justify-center h-full p-4'>
      <canvas id={id}></canvas>
    </div>
  );
}

export default PieTemplate;


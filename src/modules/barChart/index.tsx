import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Importe o pacote Chart.js

let BarChart = ({id, width, height, title, data}) => {

  let barColors = ['rgba(210,65,108,0.7)'];

  let xValues = data['Planilha1']['Vendedor']
  let yValues = data['Planilha1']['Valor de Venda']

  useEffect(() => {

    // Criar o gráfico usando Chart.js
    var ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
      type: "bar",
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


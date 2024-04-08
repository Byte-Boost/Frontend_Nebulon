import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Importe o pacote Chart.js

let MeuComponente = ({data}) => {
  useEffect(() => {

    // Dados do gráfico
    var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    var yValues = [55, 49, 44, 24, 15];
    var barColors = ["red", "green","blue","orange","brown"];

    // Criar o gráfico usando Chart.js
    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: "World Wine Production 2018"
        }
      }
    });
  }, []);

  return (
    <canvas id="myChart" style={{ width: '100%', maxWidth: '600px' }}></canvas>
  );
}

export default MeuComponente;


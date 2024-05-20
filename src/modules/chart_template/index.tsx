import React, { useEffect } from 'react';
import Chart, { ChartTypeRegistry } from 'chart.js/auto'; // Importe o pacote Chart.js

interface chartProps{
  type: keyof ChartTypeRegistry,
  id: string,
  title: string,
  dataX?: Array<any>,
  dataY?: Array<any>,
  colors?: Array<string>;

}

let ChartTemplate = ({type, id, title, dataX , dataY , colors = ['rgba(210,65,108,0.7)']} : chartProps ) => {
  const chartRef = React.useRef<Chart<keyof ChartTypeRegistry, any[] | undefined, any> | null>(null); // Update the type of chartRef

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    var ctx = document.getElementById(id).getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: type,
      data: {
        labels: dataX,
        datasets: [{
          label: 'Valor em R$',
          data: dataY,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        resizeDelay: 1,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: title
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [dataX, dataY]); // Add dataX and dataY as dependencies

  return (
    <div className='grow flex justify-center p-4'>
      <canvas id={id}></canvas>
    </div>
  );
}

export default ChartTemplate;
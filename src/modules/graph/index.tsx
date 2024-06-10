import { ApexOptions } from 'apexcharts';
import React from 'react';
import Chart from 'react-apexcharts';

interface ChartProps {
  type: 'line' | 'bar' | 'area' | 'pie' | 'donut' | 'radar' | 'heatmap' | 'candlestick';
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  options: ApexOptions;
  width?: string | number;
  height?: string | number;
}

const Graph: React.FC<ChartProps> = ({ type, series, options, width = '100%', height = 'auto' }) => {
  return (
    <Chart
      options={options}
      series={series}
      type={type}
      width={width}
      height={height}
    />
  );
};

export default Graph; 
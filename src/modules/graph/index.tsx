import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartProps {
  key : any;
  type: 'line' | 'bar' | 'area' | 'pie' | 'donut' | 'radar' | 'heatmap' | 'candlestick';
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  options: ApexOptions;
  width?: string | number;
  height?: string | number;
}

const Graph: React.FC<ChartProps> = ({key, type, series, options, width = '100%', height = 'auto' }) => {
  const [chartOptions, setChartOptions] = useState<ApexOptions>(options);
  const [chartSeries, setChartSeries] = useState<ApexAxisChartSeries | ApexNonAxisChartSeries>(series);
  
  useEffect(() => {
    setChartOptions(options);
  }, [options]);

  useEffect(()=>{
    setChartSeries(series);
  },[series]);
  
  return (
    <Chart
      key={key}
      options={chartOptions}
      series={chartSeries}
      type={type}
      width={width}
      height={height}
    />
  );
};

export default Graph;
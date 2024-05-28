import React, { useEffect, useRef } from 'react';
import { Chart, ChartTypeRegistry, registerables} from 'chart.js';


type ChartOptions = 'top' | 'right' | 'bottom' | 'left';
type LegendOptions = {
  hasLegend:boolean,
  position:ChartOptions, 
  labelColor:string,
  size:number
};

type TooltipOptions = {
  displayColors: boolean;
  backgroundColor: string;
  titleColor: string;
  titleFont: number;
  bodyColor: string;
  bodyFont: number;
};

type ScalesOptions = {
  xScales?: boolean;
  yScales?: boolean;
  xScalesTitle?: string;
  yScalesTitle?: string;
};

type InteractionOptions = {
  mode: 'nearest' | 'point' | 'index' | 'dataset' | 'x' |'y' | undefined;
  intersect: boolean;
  axis: 'x' | 'y' | 'xy';
}

interface ChartProps {
  type: keyof ChartTypeRegistry;
  id: string;
  title: string;
  itemsLabel?: string;
  dataX?: Array<any>;
  dataY?: Array<any>;
  colors?: Array<string>;
  borderColors?: Array<string>;
  scalesOptions?: ScalesOptions;
  legendOptions?: LegendOptions;
  interactionOptions?: InteractionOptions;
  tooltipOptions?: TooltipOptions;
  className?: string;
}

const ChartTemplate: React.FC<ChartProps> = ({
  type,
  id,
  title,
  itemsLabel,
  dataX = [],
  dataY = [],
  colors = ['rgba(210,65,108,0.7)'],
  borderColors = ['rgba(210,65,108,0.7)'],
  scalesOptions = { xScales: false, yScales: false, xScalesTitle: '', yScalesTitle: '' },
  legendOptions = { hasLegend: true, position: 'top', labelColor: '', size: 14 },
  interactionOptions = { mode: 'point', intersect: false, axis: 'x' },
  tooltipOptions = { displayColors: false, backgroundColor: 'grey', titleColor: 'white', titleFont: 14, bodyColor: 'white', bodyFont: 12 },	
  className,
}) => {
  Chart.register(...registerables);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        chartRef.current = new Chart(ctx, {
          type: type,
          data: {
            labels: dataX,
            datasets: [
              {
                label: itemsLabel,
                data: dataY,
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1,
              },
            ],
          },
          options: {
            
            interaction: {
              mode: interactionOptions?.mode,
              intersect: interactionOptions?.intersect,
              axis: interactionOptions?.axis,
            },
            responsive: true,
            plugins: {
              title: {
                display: title? true: false,
                text: title,
              },
              tooltip: {
                displayColors: tooltipOptions?.displayColors,
                backgroundColor: tooltipOptions?.backgroundColor,
                titleColor: tooltipOptions?.titleColor,
                titleFont: {
                    size: tooltipOptions?.titleFont,
                  },
                bodyColor: tooltipOptions?.bodyColor,
                bodyFont: {
                    size: tooltipOptions?.bodyFont,
                 },
                },
              legend: {
                display: legendOptions?.hasLegend,
                position: legendOptions?.position,
                labels: {
                  color: legendOptions?.labelColor,
                  font: {
                    size: legendOptions?.size,
                  },
                },
              },
            },
            scales: {
              x: {
                display: scalesOptions?.xScales,
                title: {
                  display: true,
                  text: scalesOptions?.xScalesTitle,
                },
              },
              y: {
                display: scalesOptions?.yScales,
                title: {
                  display: true,
                  text: scalesOptions?.yScalesTitle,
                },
              },
            },
          }
       });
      }
    }
  }, [type, id, title, dataX, dataY, colors, borderColors, scalesOptions, legendOptions, className]);

  return <canvas id={id} ref={canvasRef} className={className}></canvas>;
};

export default ChartTemplate;
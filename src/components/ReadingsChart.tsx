import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { Download } from 'lucide-react';
import { BloodPressureReading, ChartType } from '../types';
import { chartColors, chartLabels, chartConfig } from '../utils/chartUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ReadingsChartProps {
  readings: BloodPressureReading[];
  type: ChartType;
}

export function ReadingsChart({ readings, type }: ReadingsChartProps) {
  const chartRef = useRef<ChartJS>(null);

  const data = {
    labels: readings.map(r => format(r.timestamp, 'MMM d, HH:mm')),
    datasets: [
      {
        label: chartLabels[type],
        data: readings.map(r => r[type]),
        borderColor: chartColors[type],
        backgroundColor: `${chartColors[type]}33`,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const downloadChart = () => {
    const chart = chartRef.current;
    if (!chart) return;

    const link = document.createElement('a');
    link.download = `blood-pressure-${type}-${new Date().toISOString().split('T')[0]}.png`;
    link.href = chart.canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadChart}
          className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export PNG
        </button>
      </div>
      <Line 
        ref={chartRef}
        data={data} 
        options={chartConfig}
      />
    </div>
  );
}
import { ChartType } from '../types';

export const chartColors = {
  systolic: 'rgb(239, 68, 68)',
  diastolic: 'rgb(59, 130, 246)',
  pulse: 'rgb(34, 197, 94)'
} as const;

export const chartLabels = {
  systolic: 'Systolic Pressure',
  diastolic: 'Diastolic Pressure',
  pulse: 'Pulse Rate'
} as const;

export const chartConfig = {
  responsive: true,
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart',
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
    },
  },
} as const;
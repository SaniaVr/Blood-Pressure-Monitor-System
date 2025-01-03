export interface BloodPressureReading {
  id: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  timestamp: Date;
}

export type ChartType = 'systolic' | 'diastolic' | 'pulse';
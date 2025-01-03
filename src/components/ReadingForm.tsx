import React, { useState } from 'react';
import { Activity, Heart, Plus } from 'lucide-react';
import { BloodPressureReading } from '../types';

interface ReadingFormProps {
  onSubmit: (reading: BloodPressureReading) => void;
}

export function ReadingForm({ onSubmit }: ReadingFormProps) {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const reading: BloodPressureReading = {
      id: Date.now().toString(),
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      pulse: Number(pulse),
      timestamp: new Date()
    };

    onSubmit(reading);
    setSystolic('');
    setDiastolic('');
    setPulse('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Heart className="inline-block w-4 h-4 mr-1 text-red-500" />
            Systolic (SYS)
          </label>
          <input
            type="number"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
            min="70"
            max="200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Heart className="inline-block w-4 h-4 mr-1 text-blue-500" />
            Diastolic (DIA)
          </label>
          <input
            type="number"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
            min="40"
            max="130"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Activity className="inline-block w-4 h-4 mr-1 text-green-500" />
            Pulse
          </label>
          <input
            type="number"
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
            min="40"
            max="200"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Reading
      </button>
    </form>
  );
}
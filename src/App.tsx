import React, { useState, useEffect } from 'react';
import { Activity, Heart, HeartPulse, LogOut } from 'lucide-react';
import { ReadingForm } from './components/ReadingForm';
import { ReadingsList } from './components/ReadingsList';
import { ReadingsChart } from './components/ReadingsChart';
import { AuthForm } from './components/AuthForm';
import { Footer } from './components/Footer';
import { BloodPressureReading, ChartType } from './types';
import { onAuthStateChange, signOut } from './lib/auth';
import { addReading, deleteReading, getReadings } from './lib/readings';
import { User } from '@supabase/supabase-js';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [readings, setReadings] = useState<BloodPressureReading[]>([]);
  const [selectedChart, setSelectedChart] = useState<ChartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [statType, setStatType] = useState<'systolic' | 'diastolic' | 'pulse'>('systolic');

  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange(setUser);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      loadReadings();
    }
  }, [user]);

  async function loadReadings() {
    setLoading(true);
    const { data, error } = await getReadings();
    if (!error) {
      setReadings(data);
    }
    setLoading(false);
  }

  const handleAddReading = async (reading: Omit<BloodPressureReading, 'id'>) => {
    const { error } = await addReading(reading);
    if (!error) {
      await loadReadings();
    }
  };

  const handleDeleteReading = async (id: string) => {
    const { error } = await deleteReading(id);
    if (!error) {
      await loadReadings();
    }
  };
  
  function calculateStats(type: 'systolic' | 'diastolic' | 'pulse') {
    if (readings.length === 0) return null;

    const values = readings.map(r => r[type]);
    const maxIndex = values.indexOf(Math.max(...values));
    const minIndex = values.indexOf(Math.min(...values));
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;

    return {
      avg: avg.toFixed(1),
      max: {
        value: values[maxIndex],
        date: readings[maxIndex].timestamp,
      },
      min: {
        value: values[minIndex],
        date: readings[minIndex].timestamp,
      },
    };
  }

  const stats = calculateStats(statType);

  if (!user) {
    return (
      <>
        <AuthForm /> 
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Blood Pressure Tracker</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">{user.email}</div>
              <button
                onClick={() => signOut()}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-red-900"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sign Out
              </button>
            </div>
          </div>
          <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-center">Your Companion for Better Heart Health! <HeartPulse className="w-4 h-4 ml-2 text-green-500"/> </h1>
            <p className="text-gray-700 mb-2">Take control of your well-being with BP Tracker, the ultimate blood pressure monitoring app. Designed to simplify health tracking, BP Tracker helps you log, track, and analyze your blood pressure readings effortlessly.</p>
            <ul className="list-disc list-inside text-gray-700">
              <li><strong>Track Your BP Trends:</strong> Record your readings daily and watch your health patterns unfold with insightful graphs.</li>
              <li><strong>Comprehensive Analysis:</strong> Understand your numbers with easy-to-read visualizations that highlight trends, averages, and deviations over time.</li>
              <li><strong>Downloadable Reports:</strong> Export your data and graphs in just a few taps, making it easy to share with your doctor or keep for personal records.</li>
              {/* <li><strong>Stay on Top of Your Health:</strong> Set reminders to ensure you never miss a reading, and get tips for maintaining healthy blood pressure.</li> */}
            </ul>
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedChart(selectedChart === 'systolic' ? null : 'systolic')}
                className={`px-4 py-2 rounded-md flex items-center justify-center ${
                  selectedChart === 'systolic'
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-red-50'
                }`}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current mr-2 " />
                Systolic Chart
              </button>
              <button
                onClick={() => setSelectedChart(selectedChart === 'diastolic' ? null : 'diastolic')}
                className={`px-4 py-2 rounded-md flex items-center justify-center ${
                  selectedChart === 'diastolic'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                <Heart className="w-4 h-4 text-blue-500 fill-current mr-2" />
                Diastolic Chart
              </button>
              <button
                onClick={() => setSelectedChart(selectedChart === 'pulse' ? null : 'pulse')}
                className={`px-4 py-2 rounded-md flex items-center justify-center ${
                  selectedChart === 'pulse'
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-green-50'
                }`}
              >
                <Activity className="w-4 h-4 text-green-500 fill-current mr-2" />
                Pulse Chart
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <ReadingForm onSubmit={handleAddReading} />
            
            {selectedChart && readings.length > 0 && (
              <ReadingsChart readings={readings} type={selectedChart} />
            )}

            {loading ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-500">Loading readings...</p>
              </div>
            ) : readings.length > 0 ? (
              <ReadingsList readings={readings} onDelete={handleDeleteReading} />
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-500">No readings yet. Add your first reading above!</p>
              </div>
            )}
          </div>
          <div className="mb-8 mt-8">
            <label htmlFor="statType" className="block text-gray-700 font-bold mb-2">Select Stat Type:</label>
            <select
              id="statType"
              value={statType}
              onChange={(e) => setStatType(e.target.value as 'systolic' | 'diastolic' | 'pulse')}
              className="block w-full p-2 bg-white border border-gray-300 rounded-md"
            >
              <option value="systolic">Systolic</option>
              <option value="diastolic">Diastolic</option>
              <option value="pulse">Pulse</option>
            </select>
          </div>

          {stats && (
            <div className="grid grid-cols-3 gap-4">
              <div className="p-12 bg-white rounded-lg shadow-md text-center hover:bg-green-50">
                <h2 className="text-2xl mb-8 font-bold text-gray-700">Average</h2>
                <p className="text-7xl font-bold text-gray-900 my-2">{stats.avg}</p>
              </div>
              <div className="p-12 bg-white rounded-lg shadow-md text-center hover:bg-red-50">
                <h2 className="text-2xl mb-8 font-bold text-gray-700">Maximum</h2>
                <p className="text-7xl font-bold text-gray-900 my-2">{stats.max.value}</p>
                <p className="text-sm text-gray-600 mr-2 mt-8"> 
                Date&Time: {`${new Date(stats.max.date).toLocaleDateString()} ${new Date(stats.max.date).toLocaleTimeString()}`}
                </p>
                </div>
                <div className="p-12 bg-white rounded-lg shadow-md text-center hover:bg-yellow-50">
                <h2 className="text-2xl mb-8 font-bold text-gray-700">Minimum</h2>
                <p className="text-7xl font-bold text-gray-900 my-2">{stats.min.value}</p>
                <p className="text-sm text-gray-600 mr-2 mt-8"> 
                Date&Time: {`${new Date(stats.min.date).toLocaleDateString()} ${new Date(stats.min.date).toLocaleTimeString()}`}
                </p>
                </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
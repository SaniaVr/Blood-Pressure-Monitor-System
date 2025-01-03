import { supabase } from './supabase';
import { BloodPressureReading } from '../types';

export async function addReading(reading: Omit<BloodPressureReading, 'id'>) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { data: null, error: new Error('User not authenticated') };
  }

  const { data, error } = await supabase
    .from('blood_pressure_readings')
    .insert({
      user_id: user.id,
      systolic: reading.systolic,
      diastolic: reading.diastolic,
      pulse: reading.pulse,
      created_at: reading.timestamp.toISOString(),
    })
    .select()
    .single();

  return { data, error };
}

export async function deleteReading(id: string) {
  const { error } = await supabase
    .from('blood_pressure_readings')
    .delete()
    .eq('id', id);

  return { error };
}

export async function getReadings() {
  const { data, error } = await supabase
    .from('blood_pressure_readings')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    data: data?.map(reading => ({
      ...reading,
      timestamp: new Date(reading.created_at),
    })) ?? [],
    error,
  };
}
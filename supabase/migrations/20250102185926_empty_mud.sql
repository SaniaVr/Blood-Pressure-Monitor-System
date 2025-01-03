/*
  # Blood Pressure Readings Schema

  1. New Tables
    - `blood_pressure_readings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `systolic` (integer)
      - `diastolic` (integer)
      - `pulse` (integer)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `blood_pressure_readings` table
    - Add policies for authenticated users to:
      - Insert their own readings
      - Read their own readings
*/

CREATE TABLE IF NOT EXISTS blood_pressure_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  systolic integer NOT NULL,
  diastolic integer NOT NULL,
  pulse integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT systolic_range CHECK (systolic BETWEEN 70 AND 200),
  CONSTRAINT diastolic_range CHECK (diastolic BETWEEN 40 AND 130),
  CONSTRAINT pulse_range CHECK (pulse BETWEEN 40 AND 200)
);

ALTER TABLE blood_pressure_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own readings"
  ON blood_pressure_readings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own readings"
  ON blood_pressure_readings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
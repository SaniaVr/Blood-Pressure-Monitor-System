/*
  # Add delete policy for blood pressure readings

  1. Security Changes
    - Add policy to allow users to delete their own readings
*/

CREATE POLICY "Users can delete their own readings"
  ON blood_pressure_readings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
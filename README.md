# Blood Pressure Tracker
View the deployed website here- https://bloodpressuremonitor.netlify.app/
![image](https://github.com/user-attachments/assets/6d315b23-90f2-4599-a9c9-4752aae12f1f)
## Overview
Blood Pressure Tracker is a React-based web application that enables users to monitor, analyze, and manage their blood pressure readings. With interactive charts, insightful statistics, and easy data export, this app empowers users to take charge of their heart health.


## Features
- **Track Blood Pressure Readings**: Log systolic, diastolic, and pulse data daily.
- **Interactive Graphs**: Visualize trends with dynamic, user-friendly charts.
- **Detailed Statistics**: View average, maximum, and minimum readings with timestamps.
- **Data Export**: Easily download charts and reports.
- **User Authentication**: Secure login/logout functionality.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blood-pressure-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd blood-pressure-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```
5. Open the app in your browser at `http://localhost:3000`.

## Deployment

### Deploy to Netlify
1. Build the project:
   ```bash
   npm run build
   ```
2. Upload the `build` folder to [Netlify](https://www.netlify.com/).

3. View the Deployed website here: https://bloodpressuremonitor.netlify.app/

### Deploy to GitHub Pages
1. Install the `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Add the following to your `package.json`:
   ```json
   "homepage": "https://your-username.github.io/blood-pressure-tracker",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy the app:
   ```bash
   npm run deploy
   ```

## Project Structure
```
src/
├── components/          # Reusable components (e.g., forms, charts)
├── lib/                 # Utility functions (e.g., auth, API calls)
├── utils/              # Global and component-specific styles
├── types/               # TypeScript types
├── index.css             # tailwind css file
├── main.tsx             # React application entry file
└── App.tsx             # Main application file
```
## Working Video


https://github.com/user-attachments/assets/ae39b001-c193-48ac-bfee-886d728927a3


## Tech Stack
- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide-react
- **Backend**: Supabase (for authentication and database management)

## Possible Applications
1. **Personal Health Management**: Helps individuals track and analyze their blood pressure trends over time.
2. **Telemedicine Support**: Provides an easy way for patients to share their blood pressure data with doctors during virtual consultations.
3. **Health Research**: Serves as a tool for collecting anonymized blood pressure data for studies and analysis.
4. **Fitness and Wellness Programs**: Integrates with fitness apps or programs to monitor overall cardiovascular health.
5. **Corporate Wellness**: Employers can use this as part of employee health monitoring initiatives.
6. **Healthcare Clinics**: Used by clinics for monitoring patients' blood pressure trends remotely.
7. **Integration with IoT Devices**: Enhances the functionality of smart blood pressure monitors by providing analytics and visualization.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## Contact
For any queries or feedback, please contact:
- **Name**: Sania Verma
- **Email**: [saniavr19@gmail.com](mailto:saniavr19@gmail.com)
- **GitHub**: [https://github.com/SaniaVr](https://github.com/SaniaVr)

# Online Survey Application

This is a full-stack Online Survey Application built with a MERN stack - **MongoDB**, **Express**, **React**, and **Node.js**.  
The app allows users to register, login, create surveys with questions, and view survey results on a dashboard.

## Technologies Used

- Backend: Node.js, Express, MongoDB (Mongoose), JWT authentication
- Frontend: React, React Router, Axios
- Others: CORS, dotenv for environment variables, bcryptjs for password hashing

## Project Structure

- `backend/` — Express server, API routes, controllers, models, and database connection
- `frontend/` — React app with pages, components, services for API calls

---

## Setup Instructions

### Backend

1. Navigate to the backend folder:
   ```bash
   cd online-survey-app/backend
   ```
2. Create a `.env` file and set up necessary environment variables (e.g. MongoDB URI, JWT secret).
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Run the backend server in development mode:
   ```bash
   npm run dev
   ```
   The server will start on port 5000 by default.

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd online-survey-app/frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The app will launch in the browser at [http://localhost:3000](http://localhost:3000).

---

## Features

- User registration and login with JWT authentication
- Survey creation with customizable questions
- Dashboard to view user surveys and their results
- Profile page to view user information
- Routing handled by React Router

---

## Usage

- Register a new account or login with existing credentials.
- Create and manage surveys via the dashboard.
- View detailed results of surveys you have created.

---

## Notes

- Make sure MongoDB is running and accessible from your backend server.
- The frontend expects the backend API to be running on `http://localhost:5000/api`.

---

## License

This project is licensed under the MIT License.

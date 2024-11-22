frontend: React.js <br>
backend: Flask <br>
Databaase: SQLite 

### Table of Contents

1. [Clone the Repository](#clone-the-repository)
2. [Set Up the Backend](#set-up-the-backend)
3. [Set Up the Frontend](#set-up-the-frontend)
4. [Run the Application](#run-the-application)
5. [Test the Application](#test-the-application)

---

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/booringreader/habit-tracker.git
cd habit-tracker
```
---

### Set Up the Backend

1. **Navigate to the backend directory then create and activate a virtual environment**:

   ```bash
   cd backend
   ```
   - **For macOS/Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - **For Windows**:
     ```bash
     python -m venv venv
     .\venv\Scripts\activate
     ```

2. **Install the required backend dependencies**:

   Install the necessary packages for the backend (Flask, Flask-SQLAlchemy, Flask-CORS):

   ```bash
   pip install -r requirements.txt
   ```

   - If `requirements.txt` does not exist, you can create it with the following content:
     ```txt
     flask
     flask_sqlalchemy
     flask_cors
     ```
---

### Set Up the Frontend

1. **Navigate to the frontend directory & Install the required frontend dependencies**:

   ```bash
   cd frontend
   ```
   Make sure you have `Node.js` installed. Then, install the frontend dependencies:

   ```bash
   node --version
   npm --version
   npm install
   ```

---

### Run the Application

### Backend

**Start the Flask server on `http://localhost:8000`**:

   In the `backend` folder, run:

   ```bash
   python app.py
   ```

### Frontend

**Start the React development server on `http://localhost:5000`**:

   From the `frontend` folder, run:

   ```bash
   PORT=5000 npm start # on macOS/Linux
   set PORT=5000 && npm start # on Windows(CommandPrompt)
   ```

---

### Test the Application

1. **Test the Backend API with Postman or cURL**:

   - **GET all habits**:
     ```bash
     curl -X GET http://localhost:8000/habits
     ```

   - **POST a new habit**:
     ```bash
     curl -X POST http://localhost:8000/habits -H "Content-Type: application/json" -d '{"name": "Exercise", "description": "Daily workout", "frequency": 7}'
     ```

   - **GET all habit logs**:
     ```bash
     curl -X GET http://localhost:8000/habitlogs
     ```

   - **POST a new habit log**:
     ```bash
     curl -X POST http://localhost:8000/habitlogs -H "Content-Type: application/json" -d '{"habit_id": 1, "date": "2024-11-22"}'
     ```

2. **Test the Frontend**:

   - Navigate to the Habit Tracker app running on `http://localhost:5000`.
   - Add new habits using the form and ensure that the habit list is updated.
   - Add habit logs for the created habits and check if the logs appear in the habit log section.

---

## Additional Notes

- **Backend API Endpoints**:

   - **GET `/habits`**: Get all habits.
   - **POST `/habits`**: Add a new habit.
   - **GET `/habitlogs`**: Get all habit logs.
   - **POST `/habitlogs`**: Add a new habit log.

- **CORS**:
   Flask-CORS is used to allow cross-origin requests from the frontend running on a different port (`5000`) while the backend runs on (`8000`).

- **SQLite Database**:
   The app uses SQLite to store habits and habit logs. The database file will be created in the backend directory (`habit.db`).

---

## Possible Errors

1. **Failed to Fetch Errors**:
   - Make sure the backend server is running before the frontend. The frontend relies on the backend API to fetch and post data.
   - Ensure that you’re using the correct API endpoints in the frontend (e.g., `http://localhost:8000/habits`).

2. **CORS Issues**:
   - If you're encountering CORS-related errors, ensure that `Flask-CORS` is correctly installed and configured on the backend OR use a 
 browser plugin to allow CORS requests

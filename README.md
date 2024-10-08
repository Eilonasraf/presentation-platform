# Presentation Platform

## Overview
This project is a full-stack presentation management platform built using Node.js, Express, React, and MongoDB. It provides CRUD functionalities for managing presentations and their slides, following the MVC architecture on the backend and React for the frontend.

## Features
- **Create Presentations**: Add new presentations with a unique title, list of authors, and date of publishment.
- **Manage Slides**: Add, update, and delete slides within presentations.
- **Fetch Presentations**: Retrieve presentations by title or get a list of all presentations.
- **Update Authors**: Modify the authors list of a presentation.
- **Interactive Frontend**: React-based UI for interacting with the presentation data.

## Technologies Used
- **Backend**: Node.js with Express framework
- **Frontend**: React with Create React App
- **Database**: MongoDB
- **Templating**: Not applicable for this backend-focused project
- **Testing**: Postman for manual API testing

## Project Structure
The project follows the MVC (Model-View-Controller) architecture on the backend:
- **Models**: Define the data structure and database schema for presentations and slides.
- **Controllers**: Handle the business logic and link the models and views based on user actions and requests.
- **Routes**: Define the API endpoints and link them to the corresponding controller logic.

The frontend is built using React, providing an interactive user interface to interact with the backend API.

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js**: v16 or later
- **npm**: v7 or later
- **Docker**: Latest version (if you want to use Docker for running the application)

### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Eilonasraf/presentation-platform.git
   cd presentation-platform
2. **Install Backend Dependencies:**:
   ```bash
   cd backend
   npm install
3. **Set Up Environment Variables: Create a .env file at the root of the project and add the following**:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/presentations
4. **Start the Server**:
   ```bash
   npm start
5. **Access the Application: Open http://localhost:3000 in your web browser**.

## Frontend Setup

1. **Start the Server**:
   ```bash
   cd frontend

2. **Install Frontend Dependencies**:
   ```bash
   npm install
3. **Build the React App**:
   ```bash
   npm run build
4. **Start the Frontend Server**:
   ```bash
   npm start
5. **Access the Application: Open http://localhost:3000 in your web browser.**

## Docker Setup (If you prefer to run the entire stack using Docker:)

1. **Ensure Docker is Installed.**
2. **Start the Application:**
   ```bash
   docker-compose up --build
3. **Access the Application: Open http://localhost:3000 in your web browser.**

## API Endpoints
1. **Create a presentation**:
   ```bash
   POST /api/presentations

2. **Get a presentation by title**:
   ```bash
   GET /api/presentations/:title

3. **Add a slide to a presentation**:
   ```bash
   POST /api/presentations/:title/slides

4. **Update a slide**:
   ```bash
   PUT /api/presentations/:title/slides/:slideId

5. **Update authors**:
   ```bash
   PUT /api/presentations/:title/authors

6. **Delete a slide**:
   ```bash
   DELETE /api/presentations/:title/slides/:slideId

7. **Delete a presentation**:
   ```bash
   DELETE /api/presentations/:title

8. **Get all presentations**:
   ```bash
   GET /api/presentations

## Postman Testing
Postman was used to manually test the API endpoints. Below are the steps and the test cases used:

Test Cases:

1. **Create a Presentation**:
   Method: POST
   URL: http://localhost:3000/api/presentations
   Body:
   ```bash
   json
   {
     "title": "My Presentation",
     "authors": ["Author1", "Author2"],
     "dateOfPublishment": "2023-08-07"
   }

2. **Get a Presentation by Title**:
Method: GET
URL: http://localhost:3000/api/presentations/My%20Presentation

3. **Add a Slide to a Presentation**:
   Method: POST
   URL: http://localhost:3000/api/presentations/My%20Presentation/slides
   Body:
   ```bash
   json
   {
     "content": "This is the first slide."
   }

4. **Update a Slide**:
   Method: PUT
   URL: http://localhost:3000/api/presentations/My%20Presentation/slides/{slideId}
   Body:
   ```bash
   json
   {
     "content": "This is the updated slide content."
   }

5. **Update Authors**:
   Method: PUT
   URL: http://localhost:3000/api/presentations/My%20Presentation/authors
   Body:
   ```bash
   json
   {
     "authors": ["Author1", "Author2", "Author3"]
   }

6. **Delete a Slide**:
Method: DELETE
URL: http://localhost:3000/api/presentations/My%20Presentation/slides/{slideId}

7. **Delete a Presentation**:
Method: DELETE
URL: http://localhost:3000/api/presentations/My%20Presentation

8. **Get All Presentations**:
Method: GET
URL: http://localhost:3000/api/presentations

## How to Test?

1. **Install Postman from Postman**.
2. **Import Collection**:
   - Create a new collection in Postman named "Presentation Platform".
   - Add requests for each of the endpoints mentioned above.

3. **Run Requests**:
Execute each request and verify the responses against the expected results.

## Notes

- Backend Port: The backend API is running on port 5000. Make sure your frontend and backend are correctly configured to communicate.
- Frontend Port: The frontend React application runs on port 3000.

## License

**This project is licensed under the MIT License.**

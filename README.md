# Presentation Platform

## Overview
This project is a presentation management platform built using Node.js, Express, and MongoDB. It provides CRUD functionalities for managing presentations and their slides, following the MVC architecture to ensure a clean separation of concerns.

## Features
- **Create Presentations**: Add new presentations with a unique title, list of authors, and date of publishment.
- **Manage Slides**: Add, update, and delete slides within presentations.
- **Fetch Presentations**: Retrieve presentations by title or get a list of all presentations.
- **Update Authors**: Modify the authors list of a presentation.

## Technologies Used
- **Backend**: Node.js with Express framework
- **Database**: MongoDB
- **Testing**: Postman for manual API testing

## Project Structure
The project follows the MVC (Model-View-Controller) architecture:
- **Models**: Define the data structure and database schema for presentations and slides.
- **Controllers**: Handle the business logic and link the models and views based on user actions and requests.
- **Routes**: Define the API endpoints and link them to the corresponding controller logic.

## Getting Started
To get the project running locally:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Eilonasraf/presentation-platform.git
   cd presentation-platform

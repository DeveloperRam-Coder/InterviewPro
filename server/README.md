
# Interview Scheduler Server

This is the backend server for the Interview Scheduler application. It provides RESTful API endpoints for managing candidates, interviews, feedback, and offers.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Installation

1. Install dependencies:
```bash
cd server
npm install
```

2. Set up your environment variables by copying the sample .env file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your PostgreSQL database connection string.

4. Run database migrations:
```bash
npm run migrate
```

5. Seed the database with initial data:
```bash
npm run seed
```

### Development

Start the development server:
```bash
npm run dev
```

The server will run on http://localhost:3001 by default.

### Production Build

Build the production version:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Documentation

The API provides the following endpoints:

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration

### Candidates
- GET `/api/candidates` - Get all candidates
- GET `/api/candidates/:id` - Get candidate by ID
- POST `/api/candidates` - Create a new candidate
- PUT `/api/candidates/:id` - Update a candidate
- DELETE `/api/candidates/:id` - Delete a candidate

### Interviews
- GET `/api/interviews` - Get all interviews
- GET `/api/interviews/:id` - Get interview by ID
- GET `/api/interviews/candidate/:candidateId` - Get interviews by candidate ID
- POST `/api/interviews` - Create a new interview
- PUT `/api/interviews/:id` - Update an interview
- DELETE `/api/interviews/:id` - Delete an interview

### Feedback
- GET `/api/feedback` - Get all feedback
- GET `/api/feedback/:id` - Get feedback by ID
- GET `/api/feedback/interview/:interviewId` - Get feedback by interview ID
- POST `/api/feedback` - Create new feedback
- PUT `/api/feedback/:id` - Update feedback
- DELETE `/api/feedback/:id` - Delete feedback

### Offers
- GET `/api/offers` - Get all offers
- GET `/api/offers/:id` - Get offer by ID
- GET `/api/offers/candidate/:candidateId` - Get offers by candidate ID
- POST `/api/offers` - Create new offer
- PUT `/api/offers/:id` - Update offer
- DELETE `/api/offers/:id` - Delete offer

### Users
- GET `/api/users` - Get all users (admin only)
- GET `/api/users/:id` - Get user by ID
- POST `/api/users` - Create a new user (admin only)
- PUT `/api/users/:id` - Update a user
- DELETE `/api/users/:id` - Delete a user (admin only)
- POST `/api/users/:id/change-password` - Change user password

## Database Schema

The database schema includes the following models:

- User
- Candidate
- Interview
- Feedback
- Offer
- Skill

## Authentication

The API uses JWT-based authentication. Include the JWT token in the Authorization header as follows:

```
Authorization: Bearer <token>
```

## License

This project is licensed under the MIT License.

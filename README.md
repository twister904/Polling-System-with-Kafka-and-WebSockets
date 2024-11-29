Updated README.md
markdown
Copy code

# Polling System with Kafka and WebSockets

A real-time polling system built with **Kafka** for message processing and **WebSockets** for real-time updates. This project allows users to create polls, vote on options, and view the results in real-time through a WebSocket connection. Additionally, the leaderboard feature ranks the top poll options across all active polls.

## Features

- **Create Polls**: Users can create a poll with multiple options.
- **Vote on Polls**: Users can vote on poll options, with votes sent to Kafka for processing.
- **Real-Time Updates**: WebSocket connection allows clients to receive real-time poll updates and leaderboard changes.
- **Leaderboard**: Displays the top-ranking poll options across all active polls.

## Tech Stack

- **Node.js**: Backend server
- **Express.js**: For serving APIs
- **Kafka**: For message processing and queue management
- **WebSockets**: For real-time communication between the client and server
- **PostgreSQL**: Database for storing poll and vote data

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [Docker](https://www.docker.com/get-started)
- [PostgreSQL](https://www.postgresql.org/download/)

### Docker Setup for Kafka and Zookeeper

You can easily run **Kafka** and **Zookeeper** using Docker.

#### 1. **Running Zookeeper**

To run Zookeeper using Docker, run the following command:

````bash
docker run -p 2181:2181 zookeeper
2. Running Kafka
To run Kafka, use the following command (replace <YOUR IP> with your actual IP address):


docker run -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=<YOUR IP>:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<YOUR IP>:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
Ensure that both Zookeeper and Kafka are running. You can check the logs to verify that Kafka has connected to Zookeeper and is ready to accept messages.

Setup
1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/Polling-System-with-Kafka-and-WebSockets.git
cd Polling-System-with-Kafka-and-WebSockets
2. Install Dependencies
Run the following command to install the required dependencies:

bash
Copy code
npm install
3. Set Up PostgreSQL Database
Ensure PostgreSQL is running, and create a database for the polling system.

Create Database: Connect to PostgreSQL and create a new database:

sql
Copy code
CREATE DATABASE polling_system;
Create Tables: Use the provided SQL scripts in the repository to set up the necessary tables (polls, poll_options, votes).

4. Configure Environment Variables
Create a .env file in the root of your project and add the following configurations:

env
Copy code
PG_USER=your_postgres_user
PG_HOST=localhost
PG_DATABASE=polling_system
PG_PASSWORD=your_postgres_password
PG_PORT=5432

KAFKA_BROKER=<YOUR IP>:9092
Replace <YOUR IP> with your actual local or external IP where Kafka is running.
5. Running the Application
Start the WebSocket Server: In the root directory, start the application:

bash
Copy code
npm start
The application will start and should be accessible at http://localhost:3000.

6. API Endpoints
1. Create a Poll
Endpoint: POST /api/polls
Request Body:
json
Copy code
{
  "question": "What is your favorite programming language?",
  "options": ["JavaScript", "Python", "Java", "C++"]
}
Response:
json
Copy code
{
  "id": 1,
  "question": "What is your favorite programming language?",
  "created_at": "2024-11-25T12:34:56.789Z"
}
2. Vote on a Poll
Endpoint: POST /api/polls/:pollId/vote
Request Body:
json
Copy code
{
  "pollOptionId": 2
}
Response:
json
Copy code
{
  "message": "Vote submitted successfully."
}
3. Get Poll Results
Endpoint: GET /api/polls/:pollId
Response:
json
Copy code
[
  {
    "option_text": "JavaScript",
    "votes_count": 5
  },
  {
    "option_text": "Python",
    "votes_count": 3
  }
]
4. Get Leaderboard
Endpoint: GET /api/leaderboard
Response:
json
Copy code
[
  {
    "poll_id": 1,
    "option_text": "JavaScript",
    "votes_count": 5
  },
  {
    "poll_id": 2,
    "option_text": "Python",
    "votes_count": 3
  }
]
7. Real-Time Updates via WebSockets
The WebSocket connection provides real-time updates for poll results and leaderboard changes.

WebSocket URL:
ws://localhost:8080

Messages Sent to Clients:
Poll Update (after each vote):

json
Copy code
{
  "pollId": 1,
  "results": [
    { "option_text": "JavaScript", "votes_count": 5 },
    { "option_text": "Python", "votes_count": 3 }
  ]
}
Leaderboard Update:

json
Copy code
{
  "type": "leaderboard",
  "leaderboard": [
    { "poll_id": 1, "option_text": "JavaScript", "votes_count": 5 },
    { "poll_id": 2, "option_text": "Python", "votes_count": 3 }
  ]
}
8. Contributing
If you'd like to contribute to this project, follow these steps:

Fork the repository.
Clone your fork.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them.
Push to your fork and create a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

yaml
Copy code

---

### **Final Steps**
1. **Push the `README.md` to GitHub**:
   ```bash
   git add README.md
   git commit -m "Update README with Docker and API details"
   git push







````

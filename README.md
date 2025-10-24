# Express MongoDB CRUD

A simple CRUD API built with **Node.js**, **Express**, and **MongoDB**.

## 🚀 Setup

1. Clone the repository  
2. Run `npm install`  
3. Create a `.env` file with:
MONGO_URI=mongodb://127.0.0.1:27017/node_learning_db
PORT=3000
4. Start the app : node src/app.js


## 📚 API Routes
| Method | Endpoint        | Description          |
|--------|------------------|----------------------|
| GET    | /users           | Get all users        |
| GET    | /users/:id       | Get a single user    |
| POST   | /users           | Create a new user    |
| PUT    | /users/:id       | Update a user        |
| DELETE | /users/:id       | Delete a user        |

# Geo-Webapp Backend

A RESTful API backend for a geolocation tracking web application built with Node.js, Express, and MongoDB. This application allows users to authenticate, save geolocation search history, and manage their search records.

## 🚀 Features

- **User Authentication**: Secure login system using JWT (JSON Web Tokens)
- **Geolocation History**: Save and retrieve IP-based geolocation searches
- **History Management**: View and delete geolocation search records
- **Protected Routes**: Middleware-based authentication for secure endpoints
- **Database Seeding**: Pre-configured test users for development

## 🛠️ Technologies

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing support
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas account)
- npm or yarn package manager

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/itzjmbruhhh/geo-webapp-backend.git
   cd geo-webapp-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/geo-webapp
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

   **Important:** 
   - Replace the `MONGODB_URI` with your MongoDB connection string (local or MongoDB Atlas)
   - Replace `JWT_SECRET` with a secure, randomly generated secret key

4. **Seed the database (Optional)**
   
   To create test users for development:
   ```bash
   node seed/userSeeder.js
   ```

   This will create three test users:
   - `test@example.com` (password: `password123`)
   - `user2@example.com` (password: `password123`)
   - `user3@example.com` (password: `password123`)

## 🚀 Running the Application

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on **http://localhost:8000**

## 📡 API Endpoints

### Authentication

#### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### History (Protected Routes)

> **Note:** All history endpoints require authentication. Include the JWT token in the Authorization header:
> ```
> Authorization: <your_jwt_token>
> ```

#### Save Geolocation History
```http
POST /history
```

**Headers:**
```
Authorization: <your_jwt_token>
```

**Request Body:**
```json
{
  "ip": "8.8.8.8",
  "city": "Mountain View",
  "country": "US",
  "region": "California",
  "loc": "37.4056,-122.0775"
}
```

**Response:**
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "userId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "ip": "8.8.8.8",
  "city": "Mountain View",
  "country": "US",
  "region": "California",
  "loc": "37.4056,-122.0775",
  "created_at": "2026-02-25T10:30:00.000Z"
}
```

#### Get All History
```http
GET /history
```

**Headers:**
```
Authorization: <your_jwt_token>
```

**Response:**
```json
[
  {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "userId": "60f7b3b3b3b3b3b3b3b3b3b3",
    "ip": "8.8.8.8",
    "city": "Mountain View",
    "country": "US",
    "created_at": "2026-02-25T10:30:00.000Z"
  }
]
```

#### Delete History Records
```http
DELETE /history
```

**Headers:**
```
Authorization: <your_jwt_token>
```

**Request Body:**
```json
{
  "ids": ["60f7b3b3b3b3b3b3b3b3b3b3", "60f7b3b3b3b3b3b3b3b3b3b4"]
}
```

**Response:**
```json
{
  "message": "Deleted successfully"
}
```

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── middleware/
│   └── authMiddleware.js     # JWT authentication middleware
├── models/
│   ├── User.js              # User schema and model
│   └── History.js           # History schema and model
├── routes/
│   ├── auth.js              # Authentication routes
│   └── history.js           # History management routes
├── seed/
│   └── userSeeder.js        # Database seeding script
├── .env                     # Environment variables (create this)
├── package.json             # Project dependencies
└── server.js                # Application entry point
```

## 🔒 Security Considerations

- **JWT Tokens**: Currently, tokens don't expire. Consider adding an expiration time (e.g., `expiresIn: '24h'`) for production use
- **Password Storage**: Passwords are securely hashed using bcryptjs before storage
- **Protected Routes**: Sensitive endpoints are protected with JWT authentication middleware
- **Environment Variables**: Never commit your `.env` file to version control

## 🧪 Testing the API

You can test the API using tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [cURL](https://curl.se/)

**Example cURL requests:**

```bash
# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get history (replace TOKEN with actual JWT)
curl -X GET http://localhost:8000/history \
  -H "Authorization: TOKEN"

# Save history
curl -X POST http://localhost:8000/history \
  -H "Authorization: TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ip":"8.8.8.8","city":"Mountain View","country":"US"}'
```

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or your MongoDB Atlas connection string is correct
- Check that the `MONGODB_URI` in your `.env` file is properly configured

**JWT Token Error:**
- Verify that `JWT_SECRET` is set in your `.env` file
- Ensure the Authorization header is included in requests to protected routes

**Port Already in Use:**
- If port 8000 is already in use, you can modify the `PORT` constant in `server.js`

## 📝 Development Notes

- The server runs on port **8000** by default
- CORS is enabled for all origins (configure for production use)
- Database seeder creates users with the password `password123`
- History records are sorted by creation date (newest first)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

ISC

## 👤 Author

GitHub: [@itzjmbruhhh](https://github.com/itzjmbruhhh)

## 🔗 Related Projects

This backend is designed to work with a frontend geolocation tracking application. Make sure to configure the frontend to point to this API endpoint.

---

**Happy Coding! 🎉**

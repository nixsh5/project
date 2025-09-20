require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

// Middleware to parse JSON requests
app.use(express.json())

// CORS to allow frontend requests (adjust as needed)
app.use(cors({
    origin: 'http://localhost:3000', // your frontend URL
    credentials: true,
}))

// Example health endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

// Mount your auth routes here (we'll create auth.js later)
// const authRoutes = require('./routes/auth')
// app.use('/api/auth', authRoutes)

module.exports = app

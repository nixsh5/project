require('dotenv').config()

const mongoose = require('mongoose')
const app = require('./app')

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`)
    })
}).catch(err => {
    console.error('Database connection error:', err)
})

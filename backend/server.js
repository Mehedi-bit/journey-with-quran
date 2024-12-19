const dotenv = require('dotenv')
const express = require('express');
const connectDB = require('./db/connectDB.js')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes.js')


dotenv.config()
connectDB()

const app = express();

const port = process.env.PORT || 5000;


// Middlewares
app.use(express.json());  // Parse JSON bodies (req.body)
app.use(express.urlencoded({ extended: true }));  // Parse URL encoded bodies (form data in req.body)
app.use(cookieParser())  // For reach and access the cookies


// Basic route
app.get('/', (req, res) => {
  res.send('Salam from Journey with Quran!');
});


// Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




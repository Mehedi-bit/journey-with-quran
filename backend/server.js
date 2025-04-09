const dotenv = require('dotenv')
const cors = require("cors");
const express = require('express');
const connectDB = require('./db/connectDB.js')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes.js')
const postRoutes = require('./routes/postRoutes.js')
const cloudinary = require('cloudinary').v2


dotenv.config()
connectDB()

const app = express();



// Middlewares
app.use(express.json( {limit:"50mb"} ));  // Parse JSON bodies (req.body)
app.use(express.urlencoded({ extended: true }));  // Parse URL encoded bodies (form data in req.body)
app.use(cookieParser())  // For reach and access the cookies




// Enable CORS for all requests
// @TODO: Make this more specific and secure
app.use(cors({
  // set multiple origins
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://journey-with-quran.netlify.app', 'https://journeywithquran.vercel.app'],
  credentials: true // ✅ Allow sending cookies
}))




// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})




// Basic route
app.get('/', (req, res) => {
  res.send('Salam from Journey with Quran!');
});


// Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)



const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




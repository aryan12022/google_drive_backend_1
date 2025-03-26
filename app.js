require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const cookieParser = require('cookie-parser');
const connectToDb = require('./config/db.js');
const indexRouter = require('./routes/index.routes.js');
const userRouter = require('./routes/user.routes.js');
const uploadRouter=require('./routes/index.routes.js')
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectToDb();

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/upload',uploadRouter)

app.get('/', (req, res) => {
    res.render('index');
});



// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

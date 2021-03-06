//packages
//jshint esversion: 8
const express = require('express');
const app = express();
var cors = require("cors");
require('dotenv').config()
const port = process.env.PORT;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//data base connection
mongoose.connect(process.env.DB, 
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('Database is connected')
                }).catch(err => {
                                console.log(err)
                                });
//Predefined controllers/middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
//importing self made routes and controllers
const authRoutes = require('./routes/main/auth');
const eventRoutes = require('./routes/main/event');
const userRouters = require('./routes/main/user');
const adminRouters = require('./routes/main/admin');
const paymentRoutes = require('./routes/main/payment');
//Routes
app.use('/main/auth',authRoutes);
app.use('/main/event',eventRoutes);
app.use('/main/user', userRouters);
app.use('/main/admin', adminRouters);
app.use('/main/payment', paymentRoutes);
app.get('/', (req, res) =>{
    res.send('Welcome to the homepage!!');
})
//failed authentication route
app.get('/failurejson', function(req, res) {
    res.status(400).json({
        status: 400,
        msg:  "Authentication Failed Login Again",
        error: "Authentication Failed Login Again"
    });
});
app.get('main/logo.svg', (req, res) => {
	res.sendFile(path.join(__dirname, 'logo.png'))
})
//port connection
app.listen(port,(req, res) => {
    console.log(`The website is running at ${port}`);
})

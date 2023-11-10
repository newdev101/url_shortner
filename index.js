const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly, checkAuth} = require('./middlewares/auth')
//database connection
const { connectToMongoDB } = require("./connection");

//importing routes
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoute');
const userRoute = require('./routes/user')

const app = express();
const PORT = 8000;

//connect to mongodb
connectToMongoDB("mongodb://127.0.0.1:27017/short-url");


//coonect to ejs
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());  //!!!don't forgot to use ()

//routing
app.use('/url',restrictToLoggedinUserOnly,urlRoute);
app.use('/user',userRoute);
app.use('/',checkAuth,staticRoute);


//asigning port to server
app.listen(PORT,()=>console.log(`server started at PORT=${PORT}`));

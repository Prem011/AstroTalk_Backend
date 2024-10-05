require("dotenv").config({path: "./.env"});
const express = require('express')
const morgan = require('morgan');
const userRouter = require("./routes/user");
const requestRouter = require("./routes/requests");
const passport = require('passport')
const session = require('express-session');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const Login = require("./models/userSchema");

const db = require("./models/dbConfig");
const path = require("path");
const {startKafka} = require("./kafka")


const app = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json()); 

app.use(morgan('dev')); 


app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(Login.serializeUser())
passport.deserializeUser(Login.deserializeUser())

app.use("/user", userRouter); //user 
app.use("/request", requestRouter); //request

startKafka().catch(console.error);

app.listen(process.env.PORT, ()=>{
    try{
        console.log(`Server is running at ${process.env.PORT}`);
    }
    catch(error){
        console.error('Error starting server:', error);
    }
})


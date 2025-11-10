const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");

const port = 3001;
const app = express()
const router = express.Router();
app.use(router)

router.use(express.json());
router.use(express.urlencoded({extended: true}));

var connection = mysql.createConnection({
    host : process.env.DB_host,
    user : process.env.DB_username,
    password : process.env.DB_password,
    database : process.env.DB_name
});
 router.post("/v1/signup")

connection.connect(function(err){
    if(err) throw err;
    console.log(`Connected DB: ${process.env.DB_name}`);
})


app.listen(process.env.PORT, () => 
    { console.log(`Server listening on port: ${process.env.PORT}`); })




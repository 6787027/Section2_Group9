const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");
const bcrypt = require('bcrypt');
const cors = require('cors');

const port = 3001;
const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

var connection = mysql.createConnection({
    host: process.env.DB_host,
    user: process.env.DB_username,
    password: process.env.DB_password,
    database: process.env.DB_name
});

router.post("/v1/signup", function(req, res) {
    
    connection.query("SELECT Acc_Email FROM User_Account WHERE Acc_Email = ?", req.body.email, (err, result) => {
        
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ message: "Database query error" });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: "This email already exists" });
        }

        bcrypt.hash(req.body.password, 10, (hashErr, hashedPassword) => {
            
            if (hashErr) {
                console.error("Hashing error:", hashErr);
                return res.status(500).json({ message: "Error password" });
            }

            const newUser = {
                Acc_Fname: req.body.firstName,
                Acc_Lname: req.body.lastName,
                Acc_Email: req.body.email,
                Acc_PhoneNum: req.body.phone,
                Acc_Password: hashedPassword,
                Acc_Type: req.body.type
            };

            connection.query("INSERT INTO User_Account SET ?", newUser, (insertErr, insertResult) => {
                if (insertErr) {
                    console.error("Database insert error:", insertErr);
                    return res.status(500).json({ message: "Error creating user" });
                }

                console.log("New user created");
                res.status(201).json({ message: "User created successfully" });
            });
        });
    });
    
});

connection.connect(function(err) {
    console.log(`Connected DB: ${process.env.DB_name}`);
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
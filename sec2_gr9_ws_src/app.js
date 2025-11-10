// npm run dev on frontend side first then npm start in sec2_gr9_ws_scr to run backend
// Note: backend use for working with database only so you don't have to do "get page" method (sendFile)


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


// post: create user for signup
router.post("/v1/signup", function(req, res) {
    console.log("Create the user")

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

/*wait for login */
router.get("/user_profile", function(req, res) {
    /*input section */
    

    /*select section*/
    let fname = document.getElementById("fname")
    let lname = document.getElementById("lname")
    let email = document.getElementById("email")
    let phone = document.getElementById("phone")
    connection.query("SELECT Acc_Email, Acc_FName, Acc_LNam,Acc_PhoneNum WHERE Acc_Email = ?",email, function(error,result){
        return res.send({error: false, data: result[0], meesage:"Fail to send the information"})
    });

    fname.innerHTML = Acc_Fname;
    lname.innerHTML = Acc_Lname;
    email.innerHTML = Acc_Email;
    phone.innerHTML = Acc_PhoneNum;
});

router.put("/user_profile", function(req, res) {
    let email = req.body.User_Account.Acc_Email;
    let info = req.body.User_Account;

    //dont know what to put
    /*sql*/
    connection.query("UPDATE User_Account SET ? WHERE Acc_Email = ?",[info,email],function(error,result){
        if(error) throw error;
        return res.send({error:false, data: result.affectedRows, meesage:"Change user info successfully"});
    });
});


connection.connect(function(err) {
    console.log(`Connected DB: ${process.env.DB_name}`);
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
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

router.get("/ad_product", (req, res) => {
    const search = (req.query.search || "").toLowerCase();
    const type = req.query.type || "all";

    let sql = `
        SELECT 
            Pro_ID,
            Pro_Picture,
            Pro_Name,
            Pro_Quantity,
            Pro_Type,
            Col_Name,
            Pro_Price,
            Pro_Description
        FROM Product
        INNER JOIN Collection ON Pro_ColID = Col_ID
        INNER JOIN ProductPicture ON Pro_ID = Pic_ProID
        WHERE Pic_ID LIKE "%f"
    `;

    const params = [];

    // Filter by type
    if (type !== "all") {
        sql += ` AND Pro_Type = ?`;
        params.push(type);
    }

    // Search ทุก field
    if (search) {
        sql += ` AND (
            LOWER(Pro_ID) LIKE ? OR
            LOWER(Pro_Name) LIKE ? OR
            LOWER(Pro_Type) LIKE ? OR
            LOWER(Pro_Quantity) LIKE ? OR
            LOWER(Col_Name) LIKE ? OR
            LOWER(Pro_Price) LIKE ? OR
            LOWER(Pro_Description) LIKE ?
        )`;

        for (let i = 0; i < 7; i++) {
            params.push(`%${search}%`);
        }
    }

    sql += " ORDER BY Pro_ID";

    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    });
});




router.get("/v1/products", function(req,res){
   let sql ="SELECT p.Pro_Name, p.Pro_ID, p.Pro_Type, p.Pro_Price, c.Col_Name, pp.Pro_Picture " +
    "FROM Product AS p " +
    "LEFT JOIN Collection AS c ON p.Pro_ColID = c.Col_ID " +
    "LEFT JOIN ProductPicture AS pp ON p.Pro_ID = pp.Pic_ProID AND pp.Pic_id LIKE '%f' " +
    "WHERE 1=1 ";

    const {name,type,collection} = req.query

    const searchvari = []

    if(name) {
        sql += " AND p.Pro_Name LIKE ?"; 
        searchvari.push(`%${name}%`);
        
    }
    if(type){
        sql += " AND p.Pro_Type LIKE ?";
        searchvari.push(`%${type}%`);

    }
    if(collection){
        sql += "AND c.Col_Name LIKE ?";
        searchvari.push(`%${collection}%`)
    }

    connection.query(sql,searchvari, function(err,results){
        if(err) {
            console.error("Database query error:", err);
            return res.status(500).json([])
        }

        res.json(results)

    })
})

connection.connect(function(err) {
    console.log(`Connected DB: ${process.env.DB_name}`);
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
// use npm run dev on frontend side first then npm start in sec2_gr9_ws_scr to run backend
// Note: backend use for working with database only so you don't have to do "get page" method (sendFile)

const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken')

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
router.post("/v1/signup", function (req, res) {
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

// Login Acc
router.post("/v1/login", function (req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill out the form completely" })
        }

        const sql = "SELECT Acc_Email, Acc_Password FROM User_Account WHERE Acc_Email = ?";

        connection.query(sql, [req.body.email], (err, result) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ message: "Database query error" });
            }

            // Not found send Error 401 (Unauthorized)
            if (result.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const user = result[0];

            console.log(req.body.password)
            console.log(user.Acc_Password)
            bcrypt.compare(req.body.password, user.Acc_Password, (err, correct) => {

                // A. จัดการกรณี bcrypt error
                if (err) {
                    console.error("Bcrypt compare error:", err);
                    return res.status(500).json({ message: "Internal server error" });
                }

                //password wrong
                if (!correct) {
                    return res.status(401).json({ message: "Invalid email or password" });
                }

                // 1. สร้าง Payload: ข้อมูลที่จะเก็บใน Token (ห้ามเก็บรหัสผ่าน!)
                const payload = {
                    email: user.Acc_Email,
                    type: user.Acc_Type
                };

                const token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' } // Set expire time
                );

                res.json({
                    message: "Login successful",
                    token: token,
                    user: {
                        id: user.Acc_Email, 
                        email: user.Acc_Email,
                        firstName: user.Acc_FName,
                        lastName: user.Acc_LName
                    }
                });

            }); // สิ้นสุด bcrypt.compare
        }); // สิ้นสุด connection.query

    } catch (e) {
        console.error("Sync error:", e);
        res.status(500).json({ message: "Internal server error" });
    }
});

/*wait for login */
router.get("/user_profile", function (req, res) {
    /*input section */


    /*select section*/
    let fname = document.getElementById("fname")
    let lname = document.getElementById("lname")
    let email = document.getElementById("email")
    let phone = document.getElementById("phone")
    connection.query("SELECT Acc_Email, Acc_FName, Acc_LNam,Acc_PhoneNum WHERE Acc_Email = ?", email, function (error, result) {
        return res.send({ error: false, data: result[0], meesage: "Fail to send the information" })
    });

    fname.innerHTML = Acc_Fname;
    lname.innerHTML = Acc_Lname;
    email.innerHTML = Acc_Email;
    phone.innerHTML = Acc_PhoneNum;
});

router.put("/user_profile", function (req, res) {
    let email = req.body.User_Account.Acc_Email;
    let info = req.body.User_Account;

    //dont know what to put
    /*sql*/
    connection.query("UPDATE User_Account SET ? WHERE Acc_Email = ?", [info, email], function (error, result) {
        if (error) throw error;
        return res.send({ error: false, data: result.affectedRows, meesage: "Change user info successfully" });
    });
});

router.get("/ad_product", (req, res) => {
    const search = (req.query.search || "").toLowerCase();
    const type = req.query.type || "all";

    let sql = `
        SELECT 
            p.Pro_ID,
            p.Pro_Name,
            p.Pro_Price,
            p.Pro_Type,
            c.Col_Name,
            p.Pro_Quantity,
            p.Pro_Description,
            MAX(CASE WHEN pic.Pic_ID LIKE '%f' THEN pic.Pro_Picture END) AS Pic_f,
            MAX(CASE WHEN pic.Pic_ID LIKE '%b' THEN pic.Pro_Picture END) AS Pic_b,
            MAX(CASE WHEN pic.Pic_ID LIKE '%s' THEN pic.Pro_Picture END) AS Pic_s
        FROM Product p
        INNER JOIN ProductPicture pic ON p.Pro_ID = pic.Pic_ProID
        INNER JOIN Collection c ON p.Pro_ColID = c.Col_ID
        WHERE 1=1
    `;

    const params = [];

    // Filter by type
    if (type !== "all") {
        sql += " AND p.Pro_Type = ?";
        params.push(type);
    }

    // Search (ทุก field)
    if (search) {
        sql += ` AND (
            LOWER(p.Pro_ID) LIKE ? OR
            LOWER(p.Pro_Name) LIKE ? OR
            LOWER(p.Pro_Type) LIKE ? OR
            LOWER(p.Pro_Quantity) LIKE ? OR
            LOWER(c.Col_Name) LIKE ? OR
            LOWER(p.Pro_Price) LIKE ? OR
            LOWER(p.Pro_Description) LIKE ?
        )`;

        for (let i = 0; i < 7; i++) {
            params.push(`%${search}%`);
        }
    }

    sql += `
        GROUP BY 
            p.Pro_ID, p.Pro_Name, p.Pro_Price, p.Pro_Type, 
            c.Col_Name, p.Pro_Quantity, p.Pro_Description
        ORDER BY p.Pro_ID
    `;

    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    });
});





router.get("/v1/products", function (req, res) {
    let sql = "SELECT p.Pro_Name, p.Pro_ID, p.Pro_Type, p.Pro_Price, c.Col_Name, pp.Pro_Picture " +
        "FROM Product AS p " +
        "LEFT JOIN Collection AS c ON p.Pro_ColID = c.Col_ID " +
        "LEFT JOIN ProductPicture AS pp ON p.Pro_ID = pp.Pic_ProID AND pp.Pic_id LIKE '%f' " +
        "WHERE 1=1 ";

    const { name, type, collection } = req.query

    const searchvari = []

    if (name) {
        sql += " AND p.Pro_Name LIKE ?";
        searchvari.push(`%${name}%`);

    }
    if (type) {
        sql += " AND p.Pro_Type LIKE ?";
        searchvari.push(`%${type}%`);

    }
    if (collection) {
        sql += "AND c.Col_Name LIKE ?";
        searchvari.push(`%${collection}%`)
    }

    connection.query(sql, searchvari, function (err, results) {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json([])
        }

        res.json(results)

    })
})

router.get("/v1/products/:id", (req, res) => {
    const id = req.params.id;

    const sql = "SELECT Pro_ID, Pro_Name, Pro_Price, Pro_Type, Col_Name, Pro_Quantity, Pro_Description, MAX(CASE WHEN Pic_ID LIKE '%f' THEN Pro_Picture END) AS Pic_f, MAX(CASE WHEN Pic_ID LIKE '%b' THEN Pro_Picture END) AS Pic_b, MAX(CASE WHEN Pic_ID LIKE '%s' THEN Pro_Picture END) AS Pic_s FROM Product inner join ProductPicture on Pro_ID = Pic_ProID inner join Collection on Pro_ColID = Col_id Where Pro_ID = ? GROUP BY Pro_ID";
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(result[0]); // ส่งเฉพาะสินค้าตัวเดียว
    });
});

router.get("/v1/cart/:userEmail", (req, res) => {
    const userEmail = decodeURIComponent(req.params.userEmail);
    const sql = `
        SELECT 
            ci.Cart_ProID AS id,
            p.Pro_Name AS name,
            p.Pro_Price AS price,
            c.Col_Name AS collection,
            p.Pro_Type AS type,
            pp.Pro_Picture AS imageSrc,
            ci.Cart_Quantity AS selectedItem
        FROM CartItem ci
        JOIN Product p ON ci.Cart_ProID = p.Pro_ID
        JOIN Collection c ON p.Pro_ColID = c.Col_ID
        LEFT JOIN ProductPicture pp ON p.Pro_ID = pp.Pic_ProID AND pp.Pic_ID LIKE '%f'
        WHERE ci.Cart_AccEmail = ? 
    `;
    connection.query(sql, [userEmail], (err, results) => {
        if (err) {
            console.error("Error fetching cart:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

router.post("/v1/cart/add", (req, res) => {
    const { email, productId, quantity } = req.body;

    const checkSql = "SELECT * FROM CartItem WHERE Cart_AccEmail = ? AND Cart_ProID = ?";
    connection.query(checkSql, [email, productId], (err, results) => {
        if (err) return res.status(500).json({ error: "DB error" });

        if (results.length > 0) {
            const newQuantity = results[0].Cart_Quantity + quantity;
            const updateSql = "UPDATE CartItem SET Cart_Quantity = ? WHERE Cart_AccEmail = ? AND Cart_ProID = ?";
            connection.query(updateSql, [newQuantity, email, productId], (err) => {
                if (err) return res.status(500).json({ error: "DB error" });
                res.status(200).json({ message: "Item quantity updated" });
            });
        } else {
            const insertSql = "INSERT INTO CartItem (Cart_AccEmail, Cart_ProID, Cart_Quantity) VALUES (?, ?, ?)";
            connection.query(insertSql, [email, productId, quantity], (err) => {
                if (err) return res.status(500).json({ error: "DB error" });
                res.status(201).json({ message: "Item added to cart" });
            });
        }
    });
});

router.put("/v1/cart/update/quantity", (req, res) => {
    const { email, productId, newQuantity } = req.body;
    const sql = "UPDATE CartItem SET Cart_Quantity = ? WHERE Cart_AccEmail = ? AND Cart_ProID = ?";
    connection.query(sql, [newQuantity, email, productId], (err, result) => {
        if (err) return res.status(500).json({ error: "DB error" });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        res.status(200).json({ message: "Quantity updated" });
    });
});

router.delete("/v1/cart/remove", (req, res) => {
    const { email, productId } = req.body;
    const sql = "DELETE FROM CartItem WHERE Cart_AccEmail = ? AND Cart_ProID = ?";
    connection.query(sql, [email, productId], (err, result) => {
        if (err) return res.status(500).json({ error: "DB error" });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        res.status(200).json({ message: "Item removed" });
    });
});

router.post("/v1/cart/calculate", (req, res) => {
    const items = req.body;
    if (!Array.isArray(items)) {
        return res.status(400).json({ error: "Invalid payload." });
    }
    let subtotal = 0;
    try {
        items.forEach(item => {
            if (item.check) {
                subtotal += item.price * item.selectedItem;
            }
        });
        const shipping = subtotal > 0 ? 50 : 0;
        const total = subtotal + shipping;
        res.json({ subtotal, shipping, total });
    } catch (err) {
        res.status(500).json({ error: "Error calculating summary." });
    }
});






connection.connect(function (err) {
    console.log(`Connected DB: ${process.env.DB_name}`);
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
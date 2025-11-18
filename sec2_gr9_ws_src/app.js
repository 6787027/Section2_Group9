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
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    console.log(process.env.JWT_SECRET)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};




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


router.post("/v1/login", function (req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill out the form completely" });
        }

        const selectSql = "SELECT * FROM User_Account WHERE Acc_Email = ?";
        connection.query(selectSql, [email], (err, result) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ message: "Database query error" });
            }
            if (result.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const user = result[0];

            bcrypt.compare(password, user.Acc_Password, (err, correct) => {

                if (err) {
                    console.error("Bcrypt compare error:", err);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (!correct) {
                    return res.status(401).json({ message: "Invalid email or password" });
                }

                //Create new login data base on datetime then insert into database
                const now = new Date();
                const insertLogSql = "INSERT INTO Login_Log (Acc_Email, Log_Time) VALUES (?, ?)";

                connection.query(insertLogSql, [user.Acc_Email, now], (insertErr, insertResult) => {
                    if (insertErr) {
                        console.error("Failed to insert login log:", insertErr);
                    } else {
                        console.log(`Login log saved for ${user.Acc_Email}`);
                    }

                    //update login time in USer_Account
                    const updateLoginTimeSql = "UPDATE User_Account SET Acc_LogTime = ? WHERE Acc_Email = ?";

                    connection.query(updateLoginTimeSql, [now, user.Acc_Email], (updateErr, updateResult) => {
                        if (updateErr) {
                            console.error("Failed to update last login time:", updateErr);
                        }

                        const payload = {
                            email: user.Acc_Email,
                            type: user.Acc_Type,
                        };
                        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

                        res.json({
                            message: "Login successful",
                            token,
                            user: {
                                id: user.Acc_Email,
                                email: user.Acc_Email,
                                firstName: user.Acc_FName,
                                lastName: user.Acc_LName,
                                phonenum: user.Acc_PhoneNum,
                                type: user.Acc_Type,
                            },
                        });
                    });
                });
            });
        });
    } catch (e) {
        console.error("Sync error:", e);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/ad_log", (req, res) => {
    try {

        // Display log data from Login_Log (la to oldest)
        const sql = "SELECT Acc_Email, Log_Time AS Acc_LogTime FROM Login_Log ORDER BY Log_Time DESC";

        connection.query(sql, (err, results) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ message: "Database query error" });
            }


            res.json(results);
        });

    } catch (e) {
        console.error("Sync error:", e);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/user_profile/:email", (req, res) => {
    const email = req.params.email;
    const sql = "SELECT * FROM user_account WHERE Acc_Email = ?";

    connection.query(sql, [email], (err, data) => {
        if (err) {
            console.error("Error fetching profile:", err);
            return res.status(500).json({ message: "Database query error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(data[0]);
    });
});

router.put("/user_profile", async (req, res) => {
    const { email, fname, lname, phone, password } = req.body;

    try {
        const fields = [];
        const values = [];

        if (fname) {
            fields.push("Acc_FName = ?");
            values.push(fname);
        }
        if (lname) {
            fields.push("Acc_LName = ?");
            values.push(lname);
        }
        if (phone) {
            fields.push("Acc_PhoneNum = ?");
            values.push(phone);
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            fields.push("Acc_Password = ?");
            values.push(hashedPassword);
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }

        values.push(email);
        const sql = `UPDATE user_account SET ${fields.join(", ")} WHERE Acc_Email = ?`;

        connection.query(sql, values, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Database error" });
            }
            res.json({ message: "User updated successfully" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
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

    if (type !== "all") {
        sql += " AND p.Pro_Type = ?";
        params.push(type);
    }

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

router.get("/ad_account", (req, res) => {
    const { type, search } = req.query;

    let query = "SELECT * FROM User_Account";
    let conditions = [];
    let params = [];

    if (type && type !== "all") {
        conditions.push("Acc_Type = ?");
        params.push(type);
    }

    if (search && search.trim() !== "") {
        conditions.push("(Acc_FName LIKE ? OR Acc_LName LIKE ? OR Acc_Email LIKE ?)");
        const keyword = `%${search}%`;
        params.push(keyword, keyword, keyword);
    }
    L
    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error fetching accounts:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    })
});

router.post("/ad_account", async (req, res) => {

    const { email, fname, lname, phonenum, pass, type } = req.body;


    if (!email || !fname || !lname || !pass || !type) {
        return res.status(400).json({ message: "Please fill all required fields." });
    }

    try {

        const hashedPassword = await bcrypt.hash(pass, 10);


        const sql = `
            INSERT INTO User_Account 
                (Acc_Email, Acc_FName, Acc_LName, Acc_PhoneNum, Acc_Password, Acc_Type) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const values = [email, fname, lname, phonenum || null, hashedPassword, type];


        connection.query(sql, values, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: "This email is already registered." });
                }
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error" });
            }

            res.status(201).json({ message: "Account created successfully", insertedId: result.insertId });
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error during password hashing." });
    }
});

router.delete("/ad_account/:email", (req, res) => {

    const emailToDelete = req.params.email;

    if (!emailToDelete) {
        return res.status(400).json({ message: "Email parameter is missing" });
    }

    const deleteSQL = "DELETE FROM User_Account WHERE Acc_Email = ?";


    connection.query(deleteSQL, [emailToDelete], (err, result) => {
        if (err) {
            console.error("Error deleting account:", err);
            return res.status(500).json({ message: "Error deleting account" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Account not found" });
        }


        console.log(`Deleted Acc_Email: ${emailToDelete}`);
        res.json({ message: "Account deleted successfully" });
    });
});



router.put("/ad_account", (req, res) => {
    const { Acc_Email, Acc_FName, Acc_LName, Acc_PhoneNum, Acc_Type } = req.body;

    const sql = `
    UPDATE User_Account
    SET Acc_FName = ?, Acc_LName = ?, Acc_PhoneNum = ?, Acc_Type = ?
    WHERE Acc_Email = ?`;

    connection.query(sql, [Acc_FName, Acc_LName, Acc_PhoneNum, Acc_Type, Acc_Email], (err, result) => {
        if (err) {
            console.error("Error updating account:", err);
            return res.status(500).send("Database update error");
        }
        res.sendStatus(200);
    });
});

router.get("/ad_order", (req, res) => {
    const { status, search } = req.query;


    let query = `
        SELECT 
            Or_Num, 
            DATE_FORMAT(Or_Time, '%Y/%m/%d %H:%i:%s') AS Or_Time, 
            Or_Status, 
            Or_Price,
            Or_AccEmail,
            Or_Address 
        FROM User_Order
    `;
    let conditions = [];
    let params = [];

    if (status && status !== "all") {
        conditions.push("Or_Status = ?");
        params.push(status);
    }

    if (search && search.trim() !== "") {

        conditions.push("(Or_Num LIKE ? OR Or_Price LIKE ? OR Or_Time LIKE ? OR Or_AccEmail LIKE ? OR Or_Address LIKE ?)");
        const keyword = `%${search}%`;
        params.push(keyword, keyword, keyword, keyword, keyword);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});


router.post("/ad_order", (req, res) => {

    const { price, status, email, address } = req.body;

    if (!price || !status || !email || !address) {
        return res.status(400).json({ message: "Please fill all required fields (Price, Status, Email, Address)." });
    }

    const findLastIdSql = "SELECT Or_Num FROM User_Order ORDER BY Or_Num DESC LIMIT 1";

    connection.query(findLastIdSql, (err, results) => {
        if (err) {
            console.error("Database error (Finding last ID):", err);
            return res.status(500).json({ message: "Database error" });
        }

        let newIdNum = 1;
        if (results.length > 0) {
            const lastId = results[0].Or_Num;
            const lastNum = parseInt(lastId.substring(2));
            newIdNum = lastNum + 1;
        }
        const newOrNum = "OR" + String(newIdNum).padStart(5, '0');



        const insertSql = `INSERT INTO User_Order (Or_Num, Or_Time, Or_Price, Or_Status, Or_AccEmail, Or_Address) VALUES (?, NOW(), ?, ?, ?, ?)
`;
        const values = [newOrNum, price, status, email, address];

        connection.query(insertSql, values, (err, result) => {
            if (err) {

                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: "This order number already exists." });
                }
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(404).json({ message: "Account Email not found. Please use an existing user email." });
                }
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error" });
            }
            res.status(201).json({ message: "Order created successfully", newOrderId: newOrNum });
        });
    });
});


router.put("/ad_order", (req, res) => {

    const { Or_Num, Or_Status, Or_Address } = req.body;

    if (!Or_Num || !Or_Status || !Or_Address) {
        return res.status(400).json({ message: "Missing required fields (Or_Num, Or_Status, Or_Address)" });
    }

    const sql = `
        UPDATE User_Order 
        SET Or_Status = ?, Or_Address = ?
        WHERE Or_Num = ?
    `;
    const values = [Or_Status, Or_Address, Or_Num];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating order:", err);
            return res.status(500).json({ message: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Order updated successfully" });
    });
});


router.delete("/ad_order/:id", (req, res) => {
    const idToDelete = req.params.id;

    if (!idToDelete) {
        return res.status(400).json({ message: "Order number parameter is missing" });
    }

    const deleteSQL = "DELETE FROM User_Order WHERE Or_Num = ?";

    connection.query(deleteSQL, [idToDelete], (err, result) => {
        if (err) {
            console.error("Error deleting order:", err);
            return res.status(500).json({ message: "Error deleting order" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Order deleted successfully" });
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
        res.json(result[0]);
    });
});


router.put("/v1/products/:id", (req, res) => {
    const id = req.params.id;
    const {
        name,
        price,
        type,
        quantity,
        desc,
        colname,
        img1,
        img2,
        img3
    } = req.body;


    if (!name || !price || !type) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const updateProductSQL = `
        UPDATE Product p
        INNER JOIN Collection c ON p.Pro_ColID = c.Col_ID
        SET 
            p.Pro_Name = ?,
            p.Pro_Price = ?,
            p.Pro_Type = ?,
            p.Pro_Quantity = ?,
            p.Pro_Description = ?,
            p.Pro_ColID = c.Col_ID
        WHERE p.Pro_ID = ? AND c.Col_Name = ?
    `;

    connection.query(
        updateProductSQL,
        [name, price, type, quantity, desc, id, colname],
        (err, result) => {
            if (err) {
                console.error("Error updating Product:", err);
                return res.status(500).json({ message: "Database error updating product" });
            }

            const updatePicturesSQL = `
                UPDATE ProductPicture
                SET Pro_Picture = CASE
                    WHEN Pic_ID LIKE '%f' THEN ?
                    WHEN Pic_ID LIKE '%s' THEN ?
                    WHEN Pic_ID LIKE '%b' THEN ?
                END
                WHERE Pic_ProID = ?
            `;

            connection.query(updatePicturesSQL, [img1, img2, img3, id], (picErr) => {
                if (picErr) {
                    console.error("Error updating ProductPicture:", picErr);
                    return res.status(500).json({ message: "Error updating product pictures" });
                }

                console.log(`Product ${id} updated successfully`);
                res.json({ message: "Product updated successfully" });
            });
        }
    );
});

router.delete("/v1/products/:id", (req, res) => {
    const id = req.params.id;

    const deletePicsSQL = "DELETE FROM ProductPicture WHERE Pic_ProID = ?";

    connection.query(deletePicsSQL, [id], (picErr) => {
        if (picErr) {
            console.error("Error deleting product pictures:", picErr);
            return res.status(500).json({ message: "Error deleting product pictures" });
        }

        const deleteProductSQL = "DELETE FROM Product WHERE Pro_ID = ?";

        connection.query(deleteProductSQL, [id], (prodErr, result) => {
            if (prodErr) {
                console.error("Error deleting product:", prodErr);
                return res.status(500).json({ message: "Error deleting product" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Product not found" });
            }

            console.log(`Deleted product ID: ${id}`);
            res.json({ message: "Product deleted successfully" });
        });
    });
});


router.post("/v1/products", (req, res) => {
    const { name, price, type, quantity, desc, colname, img1, img2, img3 } = req.body;

    if (!name || !price || !type || !colname) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    connection.query(
        "SELECT Col_ID FROM Collection WHERE Col_Name = ?",
        [colname],
        (colErr, colResults) => {
            if (colErr) {
                console.error(colErr);
                return res.status(500).json({ message: "Database error" });
            }

            const handleInsertProduct = (colID) => {
                const prefix = type === "Doll" ? "DS" : "AC";
                const newIDSQL = `SELECT Pro_ID FROM Product WHERE Pro_ID LIKE '${prefix}%' ORDER BY Pro_ID DESC LIMIT 1`;

                connection.query(newIDSQL, (idErr, idResults) => {
                    if (idErr) return res.status(500).json({ message: "Error generating product ID" });

                    let nextNum = 1;
                    if (idResults.length > 0) {
                        const lastID = idResults[0].Pro_ID;
                        nextNum = parseInt(lastID.substring(2)) + 1;
                    }
                    const newID = prefix + nextNum.toString().padStart(5, "0");
                    const insertSQL = `
            INSERT INTO Product (Pro_ID, Pro_Name, Pro_Description, Pro_Price, Pro_Type, Pro_Quantity, Pro_ColID)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
                    connection.query(
                        insertSQL,
                        [newID, name, desc, price, type, quantity, colID],
                        (insertErr) => {
                            if (insertErr) {
                                console.error(insertErr);
                                return res.status(500).json({ message: "Error inserting product" });
                            }
                            const insertPics = `INSERT INTO ProductPicture (Pic_id, Pic_ProID, Pro_Picture) VALUES (?, ?, ?), (?, ?, ?),(?, ?, ?)`;
                            connection.query(
                                insertPics,
                                [newID + "f", newID, img1, newID + "s", newID, img2, newID + "b", newID, img3],
                                (picErr) => {
                                    if (picErr) {
                                        console.error(picErr);
                                        return res.status(500).json({ message: "Error inserting pictures" });
                                    }
                                    res.json({ message: "Product added successfully", Pro_ID: newID });
                                }
                            );
                        }
                    );
                });
            };

            if (colResults.length > 0) {
                handleInsertProduct(colResults[0].Col_ID);
            } else {
                const newColID = "COL" + Date.now();
                connection.query(
                    "INSERT INTO Collection (Col_ID, Col_Name) VALUES (?, ?)",
                    [newColID, colname],
                    (insertColErr) => {
                        if (insertColErr) {
                            console.error(insertColErr);
                            return res.status(500).json({ message: "Error creating collection" });
                        }
                        handleInsertProduct(newColID);
                    }
                );
                console.log("Add new product successfully");
            }
        }
    );
});




router.get("/v1/cart", authenticateToken, (req, res) => {
    const userEmail = req.user.email; // ดึงจาก Token
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
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
});

// POST: เพิ่มของลงตะกร้า
router.post("/v1/cart/add", authenticateToken, (req, res) => {
    const email = req.user.email;
    const { productId, quantity } = req.body;

    const checkSql = "SELECT * FROM CartItem WHERE Cart_AccEmail = ? AND Cart_ProID = ?";
    connection.query(checkSql, [email, productId], (err, results) => {
        if (err) return res.status(500).json({ error: "DB error" });

        if (results.length > 0) {
            // มีแล้ว -> Update Quantity
            const newQuantity = results[0].Cart_Quantity + quantity;
            const updateSql = "UPDATE CartItem SET Cart_Quantity = ? WHERE Cart_AccEmail = ? AND Cart_ProID = ?";
            connection.query(updateSql, [newQuantity, email, productId], (err) => {
                if (err) return res.status(500).json({ error: "DB error" });
                res.json({ message: "Updated quantity" });
            });
        } else {
            // ยังไม่มี -> Insert
            const insertSql = "INSERT INTO CartItem (Cart_AccEmail, Cart_ProID, Cart_Quantity) VALUES (?, ?, ?)";
            connection.query(insertSql, [email, productId, quantity], (err) => {
                if (err) return res.status(500).json({ error: "DB error" });
                res.status(201).json({ message: "Added to cart" });
            });
        }
    });
});

// PUT: อัปเดตจำนวน
router.put("/v1/cart/update/quantity", authenticateToken, (req, res) => {
    const email = req.user.email;
    const { productId, newQuantity } = req.body;

    const sql = "UPDATE CartItem SET Cart_Quantity = ? WHERE Cart_AccEmail = ? AND Cart_ProID = ?";
    connection.query(sql, [newQuantity, email, productId], (err) => {
        if (err) return res.status(500).json({ error: "DB error" });
        res.json({ message: "Quantity updated" });
    });
});

// DELETE: ลบของ
router.delete("/v1/cart/remove", authenticateToken, (req, res) => {
    const email = req.user.email;
    const { productId } = req.body;

    const sql = "DELETE FROM CartItem WHERE Cart_AccEmail = ? AND Cart_ProID = ?";
    connection.query(sql, [email, productId], (err) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: "DB error" });
        }
        res.json({ message: "Item removed" });
    });
});

// POST: คำนวณราคา (ไม่ต้อง Token ก็ได้)
router.post("/v1/cart/calculate", (req, res) => {
    const items = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ error: "Invalid payload" });

    let subtotal = 0;
    items.forEach(item => {
        if (item.check) subtotal += item.price * item.selectedItem;
    });
    const shipping = subtotal > 0 ? 50 : 0;
    res.json({ subtotal, shipping, total: subtotal + shipping });
});


router.post("/v1/payment", authenticateToken, (req, res) => {
    const { price, name, tel, address } = req.body;
    const email = req.user.email;

    //รวมข้อมูลที่อยู่
    const formattedAddress = `${name}\n${tel}\n${address}`;
    
    //Query เพื่อหาหมายเลข Or_Num ล่าสุด
    const selectMaxSql = "SELECT MAX(Or_Num) as max_or_num FROM user_order WHERE Or_Num IS NOT NULL";

    connection.query(selectMaxSql, (err, result) => {
        if (err) {
            console.error("DB Select Max Error:", err);
            return res.status(500).json({ error: "DB error on selecting max order number" });
        }

        //ดึงค่าเลขสูงสุดที่เคยมี
        const maxOrNum = result[0].max_or_num;
        let nextOrderNumber = 1;

        if (maxOrNum) {
            //maxOrNum จะอยู่ในรูปแบบ "OR0000X"
            //ดึงเฉพาะตัวเลขออกมา (ส่วนหลัง 'OR')
            const currentNumber = parseInt(maxOrNum.replace('OR', ''));
            
            //เพิ่มเลขลำดับ
            nextOrderNumber = currentNumber + 1;
        }

        //จัดรูปแบบเลขลำดับใหม่ (e.g., 1 -> "00001", 123 -> "00123")
        const formattedOrNum = 'OR' + String(nextOrderNumber).padStart(5, '0');

        //INSERT Order ใหม่
        const insertSql = "INSERT INTO user_order (Or_Num, Or_Time, Or_Status, Or_Price, Or_AccEmail, Or_Address) VALUES (?, ?, 'Paid', ?, ?, ?)";

        connection.query(insertSql, [formattedOrNum, new Date(), price, email, formattedAddress], (insertErr) => {
            if (insertErr) {
                console.error("DB Insert Error:", insertErr);
                
                return res.status(500).json({ error: "DB error on insert (Possible Race Condition)" });
            }

            // 5. สำเร็จ
            res.status(201).json({ message: "Order created", orderNumber: formattedOrNum });
        });
    });
});


connection.connect(function (err) {
    console.log(`Connected DB: ${process.env.DB_name}`);
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
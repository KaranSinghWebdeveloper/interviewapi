const con = require("../config/db");

class Users {
    // get all users
    static userAll = (req, res) => {
        try {
            con.query("SELECT * FROM users", (err, result, fields) => {
                if (err) throw err;
                console.log(result);
                res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve users.' });
        }
    }

    // get single user
    static userId = (req, res) => {
        const id = req.params.id;
        try {
            con.query("SELECT * FROM users where id = ?", [id], (err, result, fields) => {
                if (err) throw err;
                console.log(result);
                res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve users.' });
        }
    }

    // insert
    static userInsert = (req, res) => {
        const data = req.body;
        const userData = {
            "name": "Name",
            "email": "name.email@gmail.com",
            "password": "pass",
            "phone": 999999999,
            "address": "address",
            "image": "",
        };

        const values = [
            data.name || userData.name,
            data.email || userData.email,
            data.password || userData.password,
            data.phone || userData.phone,
            data.address || userData.address,
            data.image || userData.image
        ];

        try {
            con.query(
                "INSERT INTO users (name, email, password, phone, address, image) VALUES (?, ?, ?, ?, ?, ?)",
                values,
                (err, result, fields) => {
                    if (err) {
                        console.error("SQL Error:", err);
                        return res.status(500).json({ error: "Database query failed." });
                    }
                    console.log("Insert result:", result);
                    res.status(200).json({
                        error: "Data insert successfully.",
                        user: data || userData
                    });
                }
            );
        } catch (error) {
            console.error("Catch Block Error:", error);
            return res.status(500).json({ error: 'Failed to insert user.' });
        }
    };

    // edit
    static userEdit = (req, res) => {
        const id = req.params.id;
        const data = req.body;

        try {
            con.query("select * from users where id = ?",
                [id], (err, result, fields) => {
                    // console.log(result);
                    if (err) throw err;
                    if (result.length == 0) {
                        res.status(404).json({ message: 'User not found.', id: id });
                    }

                    con.query("update users set ? where id = ?",
                        [data, id],
                        (errUpdate, resultUpdate) => {
                            if (errUpdate) throw errUpdate;
                            res.status(200).json({
                                error: "Data Update successfully.",
                                user: data,
                            });
                        });
                });

        } catch (error) {
            return res.status(500).json({ message: 'Failed to Update users.', error: error });
        }
    }

    // delete
    static userDelete = (req, res) => {
        const id = req.params.id;
        try {
            const user = con.query("SELECT * FROM users where id = ?", [id], (err, result, fields) => {
                if (err) throw err;
                if (result.length == 0) {
                    return res.status(404).json({ error: 'User not found.' });
                }

                con.query("delete from users where id = ?", [id], (deleteErr, deleteResult) => {
                    if (deleteErr) throw deleteErr;
                    res.status(200).json({
                        message: 'User Deleted Succesfully.',
                        user: result
                    });
                });
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve users.' });
        }
    }
}

module.exports = Users;
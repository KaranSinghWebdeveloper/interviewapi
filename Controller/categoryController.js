const con = require("../config/db");

class Categorys {
    // get all categorys
    static categoryAll = (req, res) => {
        try {
            con.query("SELECT * FROM categorys", (err, result, fields) => {
                if (err) throw err;
                console.log(result);
                res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve categorys.' });
        }
    }

    // get single category
    static categoryId = (req, res) => {
        const id = req.params.id;
        try {
            con.query("SELECT * FROM categorys where id = ?", [id], (err, result, fields) => {
                if (err) throw err;
                console.log(result);
                if (result.length == 0) {
                    return res.status(404).json({ message: 'User not found.' });
                }
                res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve categorys.' });
        }
    }

    // insert
    static categoryInsert = (req, res) => {
        const data = req.body;
        // const categoryData = {
        //     "name": "Name",
        //     "email": "name.email@gmail.com",
        //     "password": "pass",
        //     "phone": 999999999,
        //     "address": "address",
        //     "image": "",
        // };

        const values = [
            data.category,
            data.description,
        ];

        try {
            con.query(
                "INSERT INTO categorys (category, description) VALUES (?, ?)",
                values,
                (err, result, fields) => {
                    if (err) {
                        console.error("SQL Error:", err);
                        return res.status(500).json({ error: "Database query failed." });
                    }
                    console.log("Insert result:", result);
                    res.status(200).json({
                        error: "Data insert successfully.",
                        category: data || values
                    });
                }
            );
        } catch (error) {
            console.error("Catch Block Error:", error);
            return res.status(500).json({ error: 'Failed to insert category.' });
        }
    };

    // edit
    static categoryEdit = (req, res) => {
        const id = req.params.id;
        const data = req.body;

        try {
            con.query("select * from categorys where id = ?",
                [id], (err, result, fields) => {
                    // console.log(result);
                    if (err) throw err;
                    if (result.length == 0) {
                        res.status(404).json({ message: 'category not found.', id: id });
                    }

                    con.query("update categorys set ? where id = ?",
                        [data, id],
                        (errUpdate, resultUpdate) => {
                            if (errUpdate) throw errUpdate;
                            res.status(200).json({
                                error: "Data Update successfully.",
                                category: data,
                            });
                        });
                });

        } catch (error) {
            return res.status(500).json({ message: 'Failed to Update categorys.', error: error });
        }
    }

    // delete
    static categoryDelete = (req, res) => {
        const id = req.params.id;
        try {
            const category = con.query("SELECT * FROM categorys where id = ?", [id], (err, result, fields) => {
                if (err) throw err;
                if (result.length == 0) {
                    return res.status(404).json({ error: 'category not found.' });
                }

                con.query("delete from categorys where id = ?", [id], (deleteErr, deleteResult) => {
                    if (deleteErr) throw deleteErr;
                    res.status(200).json({
                        message: 'category Deleted Succesfully.',
                        category: result
                    });
                });
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve categorys.' });
        }
    }
}

module.exports = Categorys;
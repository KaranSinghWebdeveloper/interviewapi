const con = require("../config/db");

class Interview {
    // get all interviewbanks
    static interviewbanksAll = (req, res) => {
        try {
            con.query("SELECT * FROM interviewbanks", (err, result, fields) => {
                if (err) throw err;
                // console.log(result);
                res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve interviewbanks.' });
        }
    }

    // get single interviewbanks
    static interviewbanksId = (req, res) => {
        const id = req.params.id;
        try {
            con.query("SELECT * FROM interviewbanks where id = ?", [id], (err, result, fields) => {
                if (err) throw err;
                // console.log(result);
                if (result.length == 0) {
                    return res.status(404).json({ message: 'User not found.' });
                }
                res.status(200).json(result);
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve interviewbanks.' });
        }
    }

    // insert
    static interviewbanksInsert = (req, res) => {
        const data = req.body;

        // const values = [
        //     data.interviewbanks,
        //     data.description,
        // ];
        // const values = [
        //     data.title,
        //     data.tags,
        //     data.category_id,
        //     data.user_id,
        //     data.description,
        //     data.content,
        //     data.interview_category
        // ];
        const values = Object.values(data);
        // console.log(values);

        try {
            con.query(
                "INSERT INTO interviewbanks (`title`, `tags`, `category_id`, `user_id`, `description`, `content`, `interview_category`) VALUES (?, ?, ?, ?, ?, ?, ?)",
                values,
                (err, result, fields) => {
                    if (err) {
                        console.error("SQL Error:", err);
                        return res.status(500).json({ error: "Database query failed." });
                    }
                    // console.log("Insert result:", result);
                    res.status(200).json({
                        error: "Data insert successfully.",
                        interviewbanks: data || values
                    });
                }
            );
        } catch (error) {
            console.error("Catch Block Error:", error);
            return res.status(500).json({ error: 'Failed to insert interviewbanks.' });
        }
    };

    // edit
    static interviewbanksEdit = (req, res) => {
        const id = req.params.id;
        const data = req.body;

        try {
            con.query("select * from interviewbanks where id = ?",
                [id], (err, result, fields) => {
                    // console.log(result);
                    if (err) throw err;
                    if (result.length == 0) {
                        res.status(404).json({ message: 'interviewbanks not found.', id: id });
                    }

                    con.query("update interviewbanks set ? where id = ?",
                        [data, id],
                        (errUpdate, resultUpdate) => {
                            if (errUpdate) throw errUpdate;
                            res.status(200).json({
                                error: "Data Update successfully.",
                                interviewbanks: data,
                            });
                        });
                });

        } catch (error) {
            return res.status(500).json({ message: 'Failed to Update interviewbanks.', error: error });
        }
    }

    // delete
    static interviewbanksDelete = (req, res) => {
        const id = req.params.id;
        try {
            const interviewbanks = con.query("SELECT * FROM interviewbanks where id = ?", [id], (err, result, fields) => {
                if (err) throw err;
                if (result.length == 0) {
                    return res.status(404).json({ error: 'interviewbanks not found.' });
                }

                con.query("delete from interviewbanks where id = ?", [id], (deleteErr, deleteResult) => {
                    if (deleteErr) throw deleteErr;
                    res.status(200).json({
                        message: 'interviewbanks Deleted Succesfully.',
                        interviewbanks: result
                    });
                });
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve interviewbanks.' });
        }
    }
}

module.exports = Interview;
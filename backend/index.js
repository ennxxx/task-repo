import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Enxipaulomon5",
    database: "tasks"
})

app.use(express.json())
app.use(cors())

app.get("/tasks", (req, res) => {
    const q = "SELECT * FROM tasks"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/tasks", (req, res) => {
    const q = "INSERT INTO tasks (taskname) VALUES (?)"
    const value = req.body.title;

    db.query(q, value, (err, data) => {
        if (err) return res.json(err);
        return res.json("Task created successfully.")
    })
})

app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const q = "UPDATE tasks SET status = ? WHERE id = ?";
    const values = [status, id];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Task status updated successfully.");
    });
});

app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM tasks WHERE id = ?";

    db.query(q, id, (err, data) => {
        if (err) return res.json(err);
        return res.json("Task deleted successfully.");
    });
});

app.listen(8800, () => {
    console.log("Successfully connected!")
})
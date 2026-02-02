const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Database Connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sheraz", // Apna password yahan likhein
    database: "test1"
});

// Root Route: Registration Page dikhaye ga
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

// Registration Handle Karna
app.post('/register', (req, res) => {
    const { firstName, surname, email, password } = req.body;
    const sql = "INSERT INTO users (first_name, surname, email, password) VALUES (?, ?, ?, ?)";
    conn.query(sql, [firstName, surname, email, password], (err, result) => {
        if (err) throw err;
        res.sendFile(path.join(__dirname, 'public', 'success.html'));
    });
});

// Task 1: Login Route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Task 1 (c): Login Authentication Query
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Missing SQL Query [cite: 332]
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?"; 
    
    conn.query(sql, [email, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
        } else {
            res.send("<h2>Invalid Email or Password</h2><a href='/login'>Try Again</a>");
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
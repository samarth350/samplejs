const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// POST /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data) || !data.every(item => typeof item === 'string')) {
            return res.status(400).json({ is_success: false, error: "Invalid input. Ensure 'data' is an array of strings." });
        }
        
        const user_id = "john_doe_17091999";
        const email = "john@xyz.com";
        const roll_number = "22BCS13134";
        
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
        
        const highest_alphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a, 'en', { sensitivity: 'base' }))[0]] : [];
        
        res.json({
            "is_success": true,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, error: "Internal Server Error" });
    }
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ "operation_code": 1 });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to handle POST requests to /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        const response = processData(data);

        res.json({
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            ...response
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Function to process the data and generate the response
function processData(data) {
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];

    data.forEach(item => {
        if (!isNaN(item)) { // Check if the item is a number
            const num = parseInt(item);
            if (num % 2 === 0) {
                evenNumbers.push(item);
            } else {
                oddNumbers.push(item);
            }
        } else if (typeof item === 'string') {
            alphabets.push(item.toUpperCase());
        }
    });

    return {
        even_numbers: evenNumbers,
        odd_numbers: oddNumbers,
        alphabets: alphabets
    };
}

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
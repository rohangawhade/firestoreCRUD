const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hi");
})

app.listen(3000, () => {
    console.log("server started...");
    console.log("http://localhost:3000/");
})
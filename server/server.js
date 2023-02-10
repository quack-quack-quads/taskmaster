const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// ! import routers
const { authRouter, chatRouter } = require("./routes/index.js");

// ! middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ! routes
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);



app.get("/", (req,res) => {
    res.send("Welcome to TaskMaster !!!");
})

const PORT = process.env.PORT || 5000;
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
        console.log(`http://localhost:${PORT}`);
    });
}
startServer();
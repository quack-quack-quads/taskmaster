const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// ! import routers
const { workerRouter, chatRouter, jobRouter, clientRouter, adminRouter } = require("./routes/index.js");

// ! middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ! routes
app.use("/api/auth/client", clientRouter);
app.use("/api/auth/business", workerRouter)
app.use("/api/auth/admin", adminRouter);
app.use("/api/chat", chatRouter);
app.use("/api/jobs", jobRouter);


app.get("/", (req,res) => {
    res.send("Welcome to TaskMaster API!!!");
})

const PORT = process.env.PORT || 5000;
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
        console.log(`http://localhost:${PORT}`);
    });
}
startServer();
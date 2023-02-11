const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketio = require("socket.io");
const http = require('http');
require('dotenv').config();

const { getChats, putMessage } = require("./db/chatFunctions")

// ! server
const app = express();
const server = http.createServer(app)

// ! import routers
const { workerRouter, chatRouter, jobRouter, clientRouter, adminRouter } = require("./routes/index.js");

// ! middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const io = socketio(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

io.on("connection", socket => {
    console.log("New client connected", socket.id);
    socket.on("disconnect", () => console.log("Client disconnected"));

    socket.on("join-room", (room) => {
        console.log("joining room", room);
        socket.join(room);
    })

    // now send-message to a specific room
    socket.on("send-message", (message, room) => {
        console.log(message, room);
        putMessage(room, message);
        socket.broadcast.to(room).emit("receive-message", message);
    });
})

// ! routes
app.use("/api/client", clientRouter);
app.use("/api/business", workerRouter)
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);
app.use("/api/jobs", jobRouter);


app.get("/", (req,res) => {
    res.send("Welcome to TaskMaster API!!!");
})

const PORT = process.env.PORT || 5000;
const startServer = () => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
        console.log(`http://localhost:${PORT}`);
    });
}
startServer();
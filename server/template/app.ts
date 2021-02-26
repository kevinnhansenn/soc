import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = 3001;
const httpServer = http.createServer(app);
const options = {
    cors: {
        origin: "http://localhost:3000",
    },
};
const io = new Server(httpServer, options);

io.of('/np1').on("connection", (socket) => {
    // If socket is disconnected
    socket.on('disconnect', reason => null)
});

io.of('/np2').on("connection", (socket) => {
    // second namespace
});

app.get("/", (req, res) => {
    res.send("Welcome to my world");
});

httpServer.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

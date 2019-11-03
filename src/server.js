const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Socket = require("socket.io");
const http = require("http");

const app = express();
const server = http.Server(app);
const io = Socket(server);

connectedUsers = {};

mongoose.connect("mongodb+srv://samuel:qwopaskl1290@aircnc-sqjnx.mongodb.net/test?retryWrites=true&w=majority", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});


io.on("connection", socket => {
   const { user_id } = socket.handshake.query; 
   connectedUsers[user_id] = socket.id;
});


app.use( (request, response, next) => {
   request.io = io;
   request.connectedUsers = connectedUsers;

   return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, `..`, `uploads`)));
app.use(routes);

server.listen(3000);

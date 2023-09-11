const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
    cors: {
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://localhost:3000' ],
    }
});


// Set up your other Express middleware and routes here
app.get('/', (req, res) => {
    io.emit('message', 'Hello World!');
    res.send('OK');
})
// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

io.on('connection', (socket) => {

    console.log(socket.id);

    socket.on('reach10', data => {
        console.log("data: ", data)
    })
});
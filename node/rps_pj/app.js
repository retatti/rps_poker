
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;



app.use(cors());

app.get('/', (req, res) => {
    res.send("hesss");
});


const server = app.listen(port, function() {
    console.log('server running on port 3000');
});


const io = require('socket.io')(server, {
    cors: {
        origin:["http://localhost:8080"],
        methods: ["GET", "POST"],
    }
});






io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data)
    });
});
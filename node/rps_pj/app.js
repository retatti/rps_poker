const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const RPS_Poker = require('./lib/rps_poker.js');



app.use(cors());

app.get('/', (req, res) => {
    res.send("hesss");
    RPS_Poker();
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
    var room = '';
    var name = '';

    socket.on('test', function(data) {
        console.log(data);
    });

    // socket.on('name_ctos', function(data) {

    // });

    socket.on('join_room1_ctos', function(data) {
        console.log(data.client_id + "さんがroom1に入室しました");
        socket.join('room1');
        socket.emit('join_room1_stoc', {
            room_id : 'room1'
        });
        room = 'room1';
    });

    // game_start
    socket.on('game_start_ctos', function(data) {
        
    });


});


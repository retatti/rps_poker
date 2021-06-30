// server setting
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send("hasuhasuhasuhasu");
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



// game setting

const GameMaster = require('./lib/gamemaster.js');
const Player = require('./lib/player.js');
const { reset } = require('nodemon');

let players = {};
let game_master = {};

function get_oppnent_idx(idx) {
    if (idx === 0) {
        return 1;
    }else {
        return 0;
    }
}

function create_showdict(pre_action) {
    let showdict = {};
    
    if (pre_action === 'bet') {
        showdict['raiseshow'] = true;
        showdict['callshow'] = true;
        showdict['foldshow'] = true;
    } else if (pre_action === 'raise') {
        showdict['raiseshow'] = true;
        showdict['callshow'] = true;
        showdict['foldshow'] = true;
    } else if (pre_action === 'call') {
    } else if (pre_action === 'fold') {
    } else if (pre_action === 'check') {
        showdict['betshow'] = true;
        showdict['foldshow'] = true;
        showdict['checkshow'] = true;
    } else if (pre_action === null) {
        showdict['betshow'] = true;
        showdict['foldshow'] = true;
        showdict['checkshow'] = true;
    } else {
        console.log("Error");
    }

    return showdict;
}

function create_discard_list(data) {
    let discsrd_list = String();
    if(data.discard0) {
        discsrd_list += '0';
    }
    if(data.discard1) {
        discsrd_list += '1';
    }
    if(data.discard2) {
        discsrd_list += '2';
    }
    if(data.discard3) {
        discsrd_list += '3';
    }
    if(data.discard4) {
        discsrd_list += '4';
    }

    return discsrd_list;
}

function create_fight_card(data) {
    let fightcsrd = String();
    if(data.fightcard0) {
        fightcsrd = '0';
    }
    if(data.fightcard1) {
        fightcsrd = '1';
    }
    if(data.fightcard2) {
        fightcsrd = '2';
    }
    if(data.fightcard3) {
        fightcsrd = '3';
    }
    if(data.fightcard4) {
        fightcsrd = '4';
    }

    return fightcsrd;
}

io.on('connection', function(socket) {
    let room = '';
    let name = '';
    let id = '';
    let player_idx = '';

    // game start
    socket.on('join_room_ctos', function(data) {
        id = data.client_id
        name = data.username;
        room = data.room
        socket.join(room);

        let player = new Player(id, name, room);
        // players[player.id] = player;

        // request join room
        let room_count = io.of('/').adapter.rooms.get(room).size;
        if (room_count === 1) {
            // wait
            // console.log("1");
            io.to(id).emit('game_wait_stoc');
            players[room] = new Array();
            players[room].push(player);
            player_idx = 0;

        } else if (room_count === 2) {
            // game start
            // console.log("2");
            // console.log(players);
            players[room].push(player);
            player_idx = 1
            // notify start 
            io.to(room).emit('game_start_stoc');
            game_master[room] = new GameMaster(players[room]);

            // create deck & deal
            game_master[room].create_deck();
            game_master[room].deal();

            // emit player info            
            // console.log(game_master[room]);
            // console.log(player);
            for (let i = 0; i < 2; i++) {
                io.to(players[room][i].get_id()).emit('player_info_stoc', {
                    player_hands: players[room][i].get_hands(),
                    tips : game_master[room].tips,
                    player_money: players[room][i].get_money(),
                    opponent_money:players[room][get_oppnent_idx(i)].get_money()
                });
            }
            
            // player1 turn
            for (let i = 0; i < 2; i++) {
                if (i === 0) {
                    io.to(players[room][i].get_id()).emit('player_select_discard_stoc');
                }else {
                    io.to(players[room][i].get_id()).emit('player_wait_stoc');
                }
            }

        }else {
            // leave room
            // console.log("3");
            io.to(id).emit('room_leave_stoc');
            socket.leave(room);
            room = '';
            delete players[room];
        }

    });


    socket.on('discard_card_ctos', function(data){
        // console.log("カードを捨てて補充します");
        // console.log(player_idx);
        let discard_card_list = create_discard_list(data);
        game_master[room].hand_exchange(player_idx, discard_card_list);

        io.to(players[room][player_idx].get_id()).emit('player_info_stoc', {
            player_hands: players[room][player_idx].get_hands(),
            tips : game_master[room].tips,
            player_money: players[room][player_idx].get_money(),
            opponent_money:players[room][get_oppnent_idx(player_idx)].get_money()
        });



        if (!(players[room][0].get_exchanged() && players[room][1].get_exchanged())) {
            // turn change
            for (let i = 0; i < 2; i++) {
                if (i === player_idx) {
                    io.to(players[room][i].get_id()).emit('player_wait_stoc');
                }else {
                    io.to(players[room][i].get_id()).emit('player_select_discard_stoc');
                }
            }
        } else {
            for (let i = 0; i < 2; i++) {
                if(i === player_idx) {
                    io.to(players[room][i].get_id()).emit('player_wait_stoc');
                }else {
                    io.to(players[room][i].get_id()).emit('player_select_fight_stoc');
                }
            }
        } 
    });

    socket.on('fight_card_ctos', function(data){
        // console.log("勝負カードを決定します");
        // console.log(player_idx);
        let fight_card = create_fight_card(data);

        game_master[room].fight_card_determine(player_idx, fight_card);
        
        // disp select result
        io.to(players[room][player_idx].get_id()).emit('fight_card_info_stoc', {
            player: players[room][player_idx]
        });

        if (!(players[room][0].get_selected_fight_card() && players[room][1].get_selected_fight_card())) {
            // turn change
            for (let i = 0; i < 2; i++) {
                if (i === player_idx) {
                    io.to(players[room][i].get_id()).emit('player_wait_stoc');
                }else {
                    io.to(players[room][i].get_id()).emit('player_select_fight_stoc');
                }
            }
        } else {
            for (let i = 0; i < 2; i++) {
                if(i === player_idx) {
                    io.to(players[room][i].get_id()).emit('player_wait_stoc');
                }else {
                    // betting
                    // console.log("ベッティングに移るよ");
                    

                    // ante
                    game_master[room].collect_anty();
                    for (let i = 0; i < 2; i++) {
                        io.to(players[room][i].get_id()).emit('player_info_stoc', {
                            player_hands: players[room][i].get_hands(),
                            tips : game_master[room].tips,
                            player_money: players[room][i].get_money(),
                            opponent_money:players[room][get_oppnent_idx(i)].get_money()
                        });
                    }
                    

                    // select bet
                    io.to(players[room][i].get_id()).emit('player_select_bet_stoc', create_showdict(game_master[room].pre_action));
                    
                }
            }
        } 

    });



    socket.on('betting_ctos', function(data){
        let winner;

        let result = game_master[room].betting(player_idx, data.action);

        // player select alert
        for (let i = 0; i < 2; i++) {
            io.to(players[room][i].get_id()).emit('player_select_alert_stoc', {
                player_name: players[room][player_idx].name,
                action: data.action,
            });
        }
        
        for (let i = 0; i < 2; i++) {
            io.to(players[room][i].get_id()).emit('player_info_stoc', {
                player_hands: players[room][i].get_hands(),
                tips : game_master[room].tips,
                player_money: players[room][i].get_money(),
                opponent_money:players[room][get_oppnent_idx(i)].get_money()
            });
        }

        if (result === 1) {
    
            // turn change
            for (let i = 0; i < 2; i++) {
                if (i === player_idx) {
                    io.to(players[room][i].get_id()).emit('player_wait_stoc');
                }else {
                    io.to(players[room][i].get_id()).emit('player_select_bet_stoc',  create_showdict(game_master[room].pre_action));
                }
            }

        }else if (result === 0) {
            // judge
            // console.log("勝敗を判定するよ");
            winner = game_master[room].judge();
            // console.log(winner);

            if (winner === -1) {
                // emit result
                io.to(room).emit('game_result_draw_stoc');

            }else {
                // emit result
                io.to(room).emit('game_result_stoc', {
                    player: players[room][winner]
                });
    
                // money transfer
                game_master[room].money_transfer(winner);

            }

            // reset
            game_master[room].reset();

            for (let i = 0; i < 2; i++) {
                io.to(players[room][i].get_id()).emit('player_info_stoc', {
                    player_hands: players[room][i].get_hands(),
                    tips : game_master[room].tips,
                    player_money: players[room][i].get_money(),
                    opponent_money:players[room][get_oppnent_idx(i)].get_money()
                });
            }

            
    
        }else if (result === 2) {
            // player_idx lose
            // money transfer
            game_master[room].money_transfer(get_oppnent_idx(player_idx));

            // reset
            game_master[room].reset();

            for (let i = 0; i < 2; i++) {
                io.to(players[room][i].get_id()).emit('player_info_stoc', {
                    player_hands: players[room][i].get_hands(),
                    tips : game_master[room].tips,
                    player_money: players[room][i].get_money(),
                    opponent_money:players[room][get_oppnent_idx(i)].get_money()
                });
            }
        }



        if (game_master[room].end_judge() && (result === 0 || result === 2)) {
            // console.log("Game Over");
            // game over 
            io.to(room).emit('game_over_stoc', {
                winner_player: game_master[room].players[get_oppnent_idx(game_master[room].game_loser_idx)]
            });          
        }else if (result === 0 || result === 2) {
            // emit game reset
            io.to(room).emit('game_reset_stoc');
        }

    }); 

    // desconnect
    socket.on('game_reset_ctos', function(data) {
        // restart
        game_master[room].restart();
        // emit next start
        io.to(room).emit('next_start_stoc');

        for (let i = 0; i < 2; i++) {
            io.to(players[room][i].get_id()).emit('player_info_stoc', {
                player_hands: players[room][i].get_hands(),
                tips : game_master[room].tips,
                player_money: players[room][i].get_money(),
                opponent_money:players[room][get_oppnent_idx(i)].get_money()
            });
        }

        // player? turn
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                io.to(players[room][i].get_id()).emit('player_select_discard_stoc');
            }else {
                io.to(players[room][i].get_id()).emit('player_wait_stoc');
            }
        }

    });

    // leave room
    socket.on('leave_room_ctos', function(data) {
        socket.leave(room);
    });

    // desconnect
    socket.on('disconnect', function(data) {
        socket.leave(room);
        io.to(room).emit('opponent_disconnect_stoc');   
    });

});


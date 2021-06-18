const GameMaster = require('./gamemaster.js');

// じゃんけんポーカー実行
function main() {
    const deck_num = 63;
    const player_num = 2;
    const game_master = new GameMaster(deck_num, player_num);
    game_master.start_game();

}

main();

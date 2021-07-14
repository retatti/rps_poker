const Player = require('./player.js');


// じゃんけんポーカー実行
function bettest(p1, p2) {
    let result = -1; // 勝負: 0, p1 fold: 1, p2 fold: 2
    let p1select = null

    while(true) {

        // p1が選択
        p1select = p1.select_bet_act(p2select);

        if (p1select === 'fold') {
            // お金を出さない処理
            result = 1;
            break;
        }else if(p1select === 'call'){
            // お金を出す処理
            result = 0;
            break;
        }else if (p1select === 'raise') {
            // お金を出す処理
        }else if (p1select === 'check') {
            // お金を出さない処理
        }else if (p1select === 'bet') {
            // お金を出す処理
        }

        p2select = p2.select_bet_act(p1select);

        if (p2select === 'fold') {
            result = 2;
            break;
        }else if(p2select === 'call'){
            result = 0;
            break;
        }else if (p2select === 'raise') {
            
        }else if (p2select === 'check') {
            // 相手がチェックしているときだけ
            result = 0;
            break;
        }else if (p2select === 'bet') {
            // 相手がチェックしているときだけ

        }


    }


    return result;
}



let id =0;
let name = 1;
let room = 2

let player1 = new Player(id, name, room);
let player2 = new Player(id, name, room);

bettest(player1, player2);
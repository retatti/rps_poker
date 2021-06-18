const Player = require('./player.js');
const janken = require('./janken.js');

module.exports = class GameMaster {
    constructor(deck_num, player_num) {
        this.deck_num = deck_num;
        this.deck = new Array();
        this.discard = new Array();
        this.player_num = player_num;
        this.players = new Array(this.player_num);
        for (let i = 0; i < this.player_num; i++) {
            this.players[i] = new Player(i);
        }
        this.suit = ["Rock", "Paper", "Scissors"];
        this.hands_num = 5;
    }

    // ゲームスタート
    start_game() {
        var winner_idx = -1;
        // 山札作成
        this.create_deck();

        // 山札から手札を5枚ずつ配る
        this.deal();

        // 手札の入れかえ
        this.hand_exchange();

        console.log(this.players[0].get_hands());
        console.log(this.players[1].get_hands());

        // 勝負するスートの決定
        this.suit_determine();
        
        console.log(this.players[0].get_fight_card());
        console.log(this.players[1].get_fight_card());

        // 勝利判定
        winner_idx = this.judge();
        console.log(winner_idx);

        // ゲーム終了
        this.end_game(winner_idx);

    }

    // デックの作成
    create_deck() {
        const card_num = Math.floor(this.deck_num / 3);
        for (let i = 0; i < card_num; i++) {
            for (let j = 0; j < this.suit.length; j++) {
                this.deck.push(this.suit[j]);
            }
        }
        this.deck = this.shuffle(this.deck);
    }

    // デックシャッフル
    shuffle = ([...array]) => {
        for (let i = array.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // 手札を配る
    deal() {
        for (let i = 0; i < this.player_num; i++) {
            for (let j = 0; j < this.hands_num; j++) {
                this.players[i].hands.push(this.deck[0]);
                this.deck.shift();
            }
        }
    }   

    // 手札交換
    hand_exchange() {
        let discard_hands_num = 0;
        let deal_hands_num = 0;
        const change_cards = ["012", "24"];

        for (let i = 0; i < this.player_num; i++) {
            console.log("入れ替える手札を選択してください");
            console.log("例: 0,1,4を入れ替える　→ 「014」");
            
            // 標準入力
            try {
                this.players[i].choice_discard();
                // console.log(change_cards[i]);
                // console.log(typeof(change_cards[i][0]));
                // console.log(Number(change_cards[i][0]));

            } catch (e) {
                console.error(e);
            }

            // 手札破棄
            for (let j = 0; j < change_cards[i].length; j++) {
                discard_hands_num = Number(change_cards[i][j]);
                this.discard.push(this.players[i].hands[discard_hands_num]);
                delete this.players[i].hands[discard_hands_num];
            }

            // 手札補充
            for (let j = 0; j < change_cards[i].length; j++) {
                deal_hands_num = Number(change_cards[i][j]);
                this.players[i].hands[deal_hands_num] = this.deck[0];
                this.deck.shift();
            }
        }
    }

    // 勝負カード決定
    suit_determine() {
        // 各プレイヤーに勝負カードを決定してもらう処理
        for (let i = 0; i < this.player_num; i++) {
            this.players[i].choice_fight_card();
        }        

    }

    // 勝利判定
    judge() {
        var draw_flag;
        var winner_idx;
        const players_suit = new Array();
        // 各プレイヤーに勝負カードを決定してもらう処理
        for (let i = 0; i < this.player_num; i++) {
            players_suit.push(this.players[i].hands[this.players[i].get_fight_card_idx()]);
        }        
        
        console.log(players_suit);
        // じゃんけんの勝利判定

        // あいこ
        if (players_suit.includes(this.suit[0]) && players_suit.includes(this.suit[1]) && players_suit.includes(this.suit[3])) {
            draw_flag = true;
        } else {
            draw_flag = false;
        }
        

        // 全て同じ
        if (players_suit.every(v => v === players_suit[0])) {
            draw_flag = true;
        }
        console.log("draw_flag");
        console.log(draw_flag);

        if (draw_flag) {
            if (this.player_num != 2) {
                return 'Draw';
            } else {
                // カード枚数での勝利判定
                if (this.players[0].count_fight_suit() > this.players[1].count_fight_suit()) {
                    winner_idx = 0;
                } else if(this.players[0].count_fight_suit() < this.players[1].count_fight_suit()) {
                    winner_idx = 1; 
                } else {
                    winner_idx = -1;
                }
            }

        } else { 
            // スートで勝利判定
            if (this.player_num != 2) {
                return 'Draw';
            } else {
                winner_idx = janken(this.players[0].get_fight_card(), this.players[1].get_fight_card());
            }
        }
        
        return winner_idx;
    }

    // ゲーム終了処理
    end_game(winner_idx) {
        if (winner_idx == 0) {
            console.log("Winner Player1");
        } else if (winner_idx == 1) {
            console.log("Winner Player2");
        } else {
            console.log("Draw");
        }
    }



}
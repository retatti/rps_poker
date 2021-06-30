<template>
  <div>
    <div v-show="startshow">
        <button type="submit" class="btn btn-success" v-on:click="geme_start">ゲームスタート</button><br>
        <input type="text" id="nickname" v-model="username" placeholder="Your name" autofocus><br>
        <input type="text" id="room" v-model="room" placeholder="Your room" autofocus><br>
        <!-- <button v-on:click="joinroom1">ルーム1に入室</button> -->
    </div>
    <div v-show="waitshow">
        待機画面
    </div>
    <div id="game-screen" v-if="gameshow">
        <p>Your name: {{username}}</p><br>
        <p>Room: {{room}}</p><br>
        <p>指示： {{instruction}}</p><br>
        <p>Current Tips: {{Tips}}</p><br>
        <p>相手：</p><br>
        <p>[？ , ？ , ？ , ？ , ？]</p><br>
        <p>Opponent Money: {{OpponentMoney}}</p><br>
        <p>自分：</p><br>
        <p>
            {{hands}}
        </p>
        <br>
        <p>Your Money: {{Money}}</p><br>
        <div v-if="selectshow">
            <input type="text" id="select" v-model="select" autofocus><br>
            <button type="submit" class="btn btn-success" v-on:click="discard_card">決定</button><br>
        </div>
        <p v-if="fightidxshow">あなたは {{fight_card_suit}} を選択しました。</p><br>
        <div v-if="fightshow">
            <input type="text" id="fight" v-model="fight" autofocus><br>
            <button type="submit" class="btn btn-success" v-on:click="fight_card">決定</button><br>
        </div>
        <br>
        <div>
            <button type="submit" id="bet" class="btn btn-success" v-on:click="bet_action('bet')" v-if="betshow">ベット</button>
            <button type="submit" id="raise" class="btn btn-success" v-on:click="bet_action('raise')" v-if="raiseshow">レイズ</button>
            <button type="submit" id="call" class="btn btn-success" v-on:click="bet_action('call')" v-if="callshow">コール</button>
            <button type="submit" id="fold" class="btn btn-success" v-on:click="bet_action('fold')" v-if="foldshow">フォールド</button>
            <button type="submit" id="check" class="btn btn-success" v-on:click="bet_action('check')" v-if="checkshow">チェック</button><br>
        </div>
        <br>
        <p v-if="resultshow">プレイヤー {{winner_name}} が勝ちました</p><br>
        <div v-if="gameovershow">
            <p>プレイヤー {{game_winner_name}} がこのゲームに勝利しました</p><br>
            <button type="submit" id="leave" class="btn btn-success" v-on:click="leave_room()">退出する</button><br>
        </div>
        <button type="submit" id="next" class="btn btn-success" v-on:click="next_game()" v-if="nextshow">次へ</button><br>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
// import jQuery from 'jquery';

export default {
    data() {
        return {
            username: '',
            room: '',
            message: '',
            instruction: '',
            Money: '',
            OpponentMoney: '',
            Tips: '',
            select: '',
            fight: '',
            fight_card_suit: '',
            winner_name: '',
            game_winner_name: '',
            messages: [],
            hands: [],
            socket : io('localhost:3000'),
            startshow : true,
            waitshow : false,
            gameshow : false,
            selectshow: false,
            fightshow: false,
            fightidxshow: false,
            betshow: false,
            raiseshow: false,
            callshow: false,
            foldshow: false,
            checkshow: false,
            resultshow: false,
            nextshow: false,
            gameovershow: false,
        }
    },
    methods: {
        test: function (e){
            this.socket.emit('test', {
                client_id : this.socket.id
            });

            e.preventDefault();

        },
        geme_start: function() {
            this.startshow = false;

            this.socket.emit('join_room_ctos', {
                client_id: this.socket.id,
                username: this.username,
                room: this.room,
            });
        },
        discard_card: function() {
            this.socket.emit('discard_card_ctos',{
                client_id:this.socket.id,
                room: this.room,
                discard_card: this.select,
            });

            this.selectshow = false;
        },
        fight_card: function() {
            this.socket.emit('fight_card_ctos',{
                client_id:this.socket.id,
                room: this.room,
                fight_card: this.fight,
            });

            this.fightshow = false;
        },
        bet_action: function(act) {
            console.log(act);
            this.socket.emit('betting_ctos', {
                client_id: this.socket.id, 
                room: this.room,
                action: act
            });
            this.betshow = false;
            this.raiseshow = false;
            this.callshow = false;
            this.foldshow = false;
            this.checkshow = false;

        },
        next_game: function() {
            this.socket.emit('game_reset_ctos');
        },
        leave_room: function() {
            this.socket.emit('leave_room_ctos');
            this.gameshow = false;
            this.startshow = true;
            this.gameovershow = false;
            this.fightidxshow = false;
            this.resultshow = false;
        }

    },
    mounted() {
        this.socket.on('game_wait_stoc', () => {
            alert("もう一人入るまで待っててね");
            this.waitshow = true;
        });
        
        this.socket.on('game_start_stoc', () => {
            alert("ゲームスタート");
            this.waitshow = false;
            this.gameshow = true;
            // console.log(data);
        });

        this.socket.on('room_leave_stoc', () => {
            alert("ルームが満室デス");
            this.startshow = true;

        });

        // display game
        this.socket.on('player_info_stoc', (data) => {
            // console.log(data.player);
            this.hands = data.player_hands;
            this.Money = data.player_money;
            this.Tips = data.tips;
            this.OpponentMoney = data.opponent_money;
        });

        // select turn
        this.socket.on('player_select_discard_stoc', () => {
            this.instruction = '変更するカードを選択してください';
            this.selectshow = true;
        });        
        
        // wait turn
        this.socket.on('player_wait_stoc', () => {
            this.instruction = '相手プレイヤーの選択を待っています';
            this.selectshow = false;
            this.fightshow = false;
            this.betshow = false;
        });

        // select turn
        this.socket.on('player_select_fight_stoc', () => {
            this.instruction = '勝負するカードを選択してください';
            this.fightshow = true;
        });            

        // display select result
        this.socket.on('fight_card_info_stoc', (data) => {
            // console.log(data.player);
            this.fight_card_suit = data.player.hands[data.player.fight_card_idx];
            this.fightidxshow = true;
        });        

        this.socket.on('game_result_stoc', (data) => {
            this.winner_name = data.player.name
            this.resultshow = true;
        });

        this.socket.on('game_result_draw_stoc', () => {
            alert('Draw');
        });

        // select bet action
        this.socket.on('player_select_bet_stoc', (data) => {
            this.instruction = 'アクションを選択してください';
            this.betshow = data.betshow;
            this.raiseshow = data.raiseshow;
            this.callshow = data.callshow;
            this.foldshow = data.foldshow;
            this.checkshow = data.checkshow;
        });     

        // select bet action
        this.socket.on('player_select_alert_stoc', (data) => {
            alert("プレイヤー " + data.player_name + " が" + data.action + " をしました");
        });  
        
        // game reset
        this.socket.on('game_reset_stoc', () => {
            this.nextshow = true;
        });          

        // next start
        this.socket.on('next_start_stoc', () => {
            this.nextshow = false;           
            this.resultshow = false;
            this.fightidxshow = false;        
        });

        // game over
        this.socket.on('game_over_stoc', (data) => {
            this.game_winner_name = data.winner_player.name
            this.gameovershow = true;
        });

        this.socket.on('opponent_disconnect_stoc', () => {
            alert('相手の接続が切れました');
            this.leave_room();
        })

    },

}



</script>

<style>

</style>

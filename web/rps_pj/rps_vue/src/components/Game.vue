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
        <div v-if="betshow">
            <button type="submit" id="bet" class="btn btn-success" v-on:click="bet_action">ベット</button>
            <button type="submit" id="raise" class="btn btn-success" v-on:click="bet_action">レイズ</button>
            <button type="submit" id="call" class="btn btn-success" v-on:click="bet_action">コール</button>
            <button type="submit" id="fold" class="btn btn-success" v-on:click="bet_action">フォールド</button><br>
        </div>
        <br>
        <p v-if="resultshow">プレイヤー {{winner_name}} が勝ちました</p><br>
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
            resultshow: false,
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

        // select bet action
        this.socket.on('player_select_bet_stoc', () => {
            this.instruction = 'アクションを選択してください';
            this.betshow = true;
        });     


    },

}



</script>

<style>

</style>

<template>
  <div class="text-center">
    <div v-show="startshow">
        <v-container>
            <v-text-field
            label="Your name"
            :rules="rules"
            hide-details="auto"
            v-model="username"
            ></v-text-field>
            <v-text-field
            label="Your room"
            :rules="rules"
            hide-details="auto"
            v-model="room"
            ></v-text-field>
            <v-btn
            class="ma-4"
            :loading="gamestartbutton"
            :disabled="gamestartbutton"
            color="info"
            @click="loader = 'gamestartbutton'; game_start()"
            >
            ルームに入室
            <template v-slot:loader>
                <span>Loading...</span>
            </template>
            </v-btn>
        </v-container>

    </div>
    <div v-show="waitshow">
        <v-alert type="info">
        対戦相手を待っています
        </v-alert>
        <v-progress-circular
        :size="150"
        :width="20"
        color="purple"
        indeterminate
        ></v-progress-circular>
    </div>
    <div id="game-screen" v-if="gameshow">
        <v-alert type="success" dismissible elevation="17">
        ゲームスタート
        </v-alert>

        <h4>Your name: {{username}}</h4>
        <!-- <p>Room: {{room}}</p> -->
        <br>
        <h3>指示： {{instruction}}</h3>
        <p>Current Tips: {{Tips}} 円</p>
        <p>相手：</p>
        <div id="opponent_disp">
            <img v-bind:src="imgura" alt="ura" width="100" height="100">
            <img v-bind:src="imgura" alt="ura" width="100" height="100">
            <img v-bind:src="imgura" alt="ura" width="100" height="100">
            <img v-bind:src="imgura" alt="ura" width="100" height="100">
            <img v-bind:src="imgura" alt="ura" width="100" height="100">
        </div>
        <p>相手のお金: {{OpponentMoney}} 円</p>
        <p>自分：</p>
        <div id="my_disp">
            <img v-bind:src="converthands[0]" v-on:click="onActive(0)" v-bind:class="{clicked: isClicked0}" width="100" height="100">
            <img v-bind:src="converthands[1]" v-on:click="onActive(1)" v-bind:class="{clicked: isClicked1}" width="100" height="100">
            <img v-bind:src="converthands[2]" v-on:click="onActive(2)" v-bind:class="{clicked: isClicked2}" width="100" height="100">
            <img v-bind:src="converthands[3]" v-on:click="onActive(3)" v-bind:class="{clicked: isClicked3}" width="100" height="100">
            <img v-bind:src="converthands[4]" v-on:click="onActive(4)" v-bind:class="{clicked: isClicked4}" width="100" height="100">
        </div>
        <p>自分のお金: {{Money}} 円</p>
        <div v-if="selectshow">
            <v-btn
            color="secondary"
            elevation="3"
            v-on:click="discard_card"
            >決定</v-btn><br>
        </div>
        <p v-if="fightidxshow">あなたは {{fight_card_suit}} を選択しました。</p><br>
        <div v-if="fightshow">
            <v-btn
            color="secondary"
            elevation="3"
            v-on:click="fight_card"
            >決定</v-btn><br>
        </div>
        <br>
        <div>
            <v-btn
            color="secondary"
            elevation="5"
            v-on:click="bet_action('bet')"
            v-if="betshow"
            >ベット</v-btn>
            <v-btn
            color="secondary"
            elevation="5"
            v-on:click="bet_action('raise')"
            v-if="raiseshow"
            >レイズ</v-btn>
            <v-btn
            color="secondary"
            elevation="5"
            v-on:click="bet_action('call')"
            v-if="callshow"
            >コール</v-btn>
            <v-btn
            color="secondary"
            elevation="5"
            v-on:click="bet_action('fold')"
            v-if="foldshow"
            >フォールド</v-btn>
            <v-btn
            color="secondary"
            elevation="5"
            v-on:click="bet_action('check')"
            v-if="checkshow"
            >チェック</v-btn><br>
        </div>
        <br>
        <p v-if="resultshow">プレイヤー {{winner_name}} が勝ちました</p><br>
        <div v-if="gameovershow">
            <h2>プレイヤー {{game_winner_name}} がこのゲームに勝利しました</h2><br>
            <v-btn
            color="secondary"
            elevation="5"
            v-on:click="leave_room()"
            >退出する</v-btn><br>
        </div>
        <v-btn
        color="secondary"
        elevation="5"
        v-on:click="next_game()"
        v-if="nextshow"
        >次へ</v-btn><br>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

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
            converthands: [],
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
            loader: null,
            gamestartbutton: false,
            rules: [
                value => !!value || 'Required.',
            ],
            imgura: require("@/assets/ura.png"),
            imgrock: require("@/assets/rock.png"),
            imgpaper: require("@/assets/paper.png"),
            imgscissors: require("@/assets/scissors.png"),
            isClicked0: false,
            isClicked1: false,
            isClicked2: false,
            isClicked3: false,
            isClicked4: false,

        }
    },
    methods: {
        test: function (){
            this.loader = 'gamestartbutton';
            this.game_start();
        },
        game_start: function() {
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
                discard0: this.isClicked0,
                discard1: this.isClicked1,
                discard2: this.isClicked2,
                discard3: this.isClicked3,
                discard4: this.isClicked4,
            });

            this.selectshow = false;
        },
        fight_card: function() {
            this.socket.emit('fight_card_ctos',{
                client_id:this.socket.id,
                room: this.room,
                fightcard0: this.isClicked0,
                fightcard1: this.isClicked1,
                fightcard2: this.isClicked2,
                fightcard3: this.isClicked3,
                fightcard4: this.isClicked4,
            });

            this.fightshow = false;
        },
        bet_action: function(act) {
            // console.log(act);
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
        },
        convert_hand_suit: function(hands) {
            let converthands = [];

            for (let i = 0; i < hands.length; i++) {
                if (hands[i] === 'Rock') {
                    converthands.push(this.imgrock);
                }else if (hands[i] === 'Paper') {
                    converthands.push(this.imgpaper);
                }else if (hands[i] === 'Scissors') {
                    converthands.push(this.imgscissors);
                }
            }
            return converthands;
        },
        onActive: function(n) {
            if(n === 0) {
                if (this.isClicked0) {
                    this.isClicked0 = false;
                }else {
                    this.isClicked0 = true;
                }
            }
            if(n === 1) {
                if (this.isClicked1) {
                    this.isClicked1 = false;
                }else {
                    this.isClicked1 = true;
                }
            }
            if(n === 2) {
                if (this.isClicked2) {
                    this.isClicked2 = false;
                }else {
                    this.isClicked2 = true;
                }
            }
            if(n === 3) {
                if (this.isClicked3) {
                    this.isClicked3 = false;
                }else {
                    this.isClicked3 = true;
                }
            }
            if(n === 4) {
                if (this.isClicked4) {
                    this.isClicked4 = false;
                }else {
                    this.isClicked4 = true;
                }
            }

        },
        isClicked_reset() {
            this.isClicked0 = false;
            this.isClicked1 = false;
            this.isClicked2 = false;
            this.isClicked3 = false;
            this.isClicked4 = false;
        }

    },
    mounted() {
        this.socket.on('game_wait_stoc', () => {
            this.waitshow = true;
        });
        
        this.socket.on('game_start_stoc', () => {
            // alert("ゲームスタート");
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
            this.converthands = this.convert_hand_suit(this.hands);
            this.Money = data.player_money;
            this.Tips = data.tips;
            this.OpponentMoney = data.opponent_money;
            this.isClicked_reset();
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
            this.isClicked_reset();
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
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      },
    },

}



</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

.v-progress-circular {
  margin: 1rem;
}

.clicked{
    /* opacity: 0.7;
  filter: alpha(opacity=70);
  -ms-filter: "alpha(opacity=70)"; */
  background-color: blue;
  opacity: 0.5; /** 画像の透明度 */
    display: block;
}

</style>
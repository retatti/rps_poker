<template>
  <div>
    <button type="submit" class="btn btn-success">ゲームスタート</button>
    <p>Your Socket ID :</p> 
    <p>{{ socket.id }}</p>
    <button v-on:click="test">テスト送信</button>
    <button v-on:click="joinroom1">ルーム1に入室</button>
    <p>現在のルーム</p> 
    <p>{{ message }}</p>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            user: '',
            message: '',
            messages: [],
            socket : io('localhost:3000')
        }
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();
            
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message
            });
            this.message = ''
        },
        test: function (e){
            this.socket.emit('test', {
                client_id : this.socket.id
            });

            e.preventDefault();

        },
        joinroom1: function () {
            this.socket.emit('join_room1_ctos', {
                client_id: this.socket.id
            });
        }

    },
    mounted() {
        this.socket.on('join_room1_stoc', (data) => {
            console.log("room1 join");
            this.message = data.room_id;
        });

    }
}
</script>

<style>

</style>

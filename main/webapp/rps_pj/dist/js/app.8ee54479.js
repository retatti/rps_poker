(function(t){function e(e){for(var s,r,c=e[0],a=e[1],l=e[2],d=0,u=[];d<c.length;d++)r=c[d],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&u.push(o[r][0]),o[r]=0;for(s in a)Object.prototype.hasOwnProperty.call(a,s)&&(t[s]=a[s]);h&&h(e);while(u.length)u.shift()();return n.push.apply(n,l||[]),i()}function i(){for(var t,e=0;e<n.length;e++){for(var i=n[e],s=!0,c=1;c<i.length;c++){var a=i[c];0!==o[a]&&(s=!1)}s&&(n.splice(e--,1),t=r(r.s=i[0]))}return t}var s={},o={app:0},n=[];function r(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=s,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(i,s,function(e){return t[e]}.bind(null,s));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],a=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var h=a;n.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"4e2d":function(t,e,i){},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var s,o,n=i("2b0e"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Practice")],1)},c=[],a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",{attrs:{id:"inspire"}},[i("v-navigation-drawer",{attrs:{app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}}),i("v-app-bar",{attrs:{app:""}},[i("v-app-bar-nav-icon",{on:{click:function(e){t.drawer=!t.drawer}}}),i("v-toolbar-title",[t._v("じゃんけんポーカー")])],1),i("v-main",[i("Game"),i("Test")],1)],1)},l=[],h=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"text-center"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.startshow,expression:"startshow"}]},[i("v-container",[i("v-text-field",{attrs:{label:"Your name",rules:t.rules,"hide-details":"auto"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),i("v-text-field",{attrs:{label:"Your room",rules:t.rules,"hide-details":"auto"},model:{value:t.room,callback:function(e){t.room=e},expression:"room"}}),i("v-btn",{staticClass:"ma-4",attrs:{loading:t.gamestartbutton,disabled:t.gamestartbutton,color:"info"},on:{click:function(e){t.loader="gamestartbutton",t.game_start()}},scopedSlots:t._u([{key:"loader",fn:function(){return[i("span",[t._v("Loading...")])]},proxy:!0}])},[t._v(" ルームに入室 ")])],1)],1),i("div",{directives:[{name:"show",rawName:"v-show",value:t.waitshow,expression:"waitshow"}]},[i("v-alert",{attrs:{type:"info"}},[t._v(" 対戦相手を待っています ")]),i("v-progress-circular",{attrs:{size:150,width:20,color:"purple",indeterminate:""}})],1),t.gameshow?i("div",{attrs:{id:"game-screen"}},[i("v-alert",{attrs:{type:"success",dismissible:"",elevation:"17"}},[t._v(" ゲームスタート ")]),i("h4",[t._v("Your name: "+t._s(t.username))]),i("br"),i("h3",[t._v("指示： "+t._s(t.instruction))]),i("p",[t._v("Current Tips: "+t._s(t.Tips)+" 円")]),i("p",[t._v("相手：")]),i("div",{attrs:{id:"opponent_disp"}},[i("img",{attrs:{src:t.imgura,alt:"ura",width:"100",height:"100"}}),i("img",{attrs:{src:t.imgura,alt:"ura",width:"100",height:"100"}}),i("img",{attrs:{src:t.imgura,alt:"ura",width:"100",height:"100"}}),i("img",{attrs:{src:t.imgura,alt:"ura",width:"100",height:"100"}}),i("img",{attrs:{src:t.imgura,alt:"ura",width:"100",height:"100"}})]),i("p",[t._v("相手のお金: "+t._s(t.OpponentMoney)+" 円")]),i("p",[t._v("自分：")]),i("div",{attrs:{id:"my_disp"}},[i("img",{class:{clicked:t.isClicked0},attrs:{src:t.converthands[0],width:"100",height:"100"},on:{click:function(e){return t.onActive(0)}}}),i("img",{class:{clicked:t.isClicked1},attrs:{src:t.converthands[1],width:"100",height:"100"},on:{click:function(e){return t.onActive(1)}}}),i("img",{class:{clicked:t.isClicked2},attrs:{src:t.converthands[2],width:"100",height:"100"},on:{click:function(e){return t.onActive(2)}}}),i("img",{class:{clicked:t.isClicked3},attrs:{src:t.converthands[3],width:"100",height:"100"},on:{click:function(e){return t.onActive(3)}}}),i("img",{class:{clicked:t.isClicked4},attrs:{src:t.converthands[4],width:"100",height:"100"},on:{click:function(e){return t.onActive(4)}}})]),i("p",[t._v("自分のお金: "+t._s(t.Money)+" 円")]),t.selectshow?i("div",[i("v-btn",{attrs:{color:"secondary",elevation:"3"},on:{click:t.discard_card}},[t._v("決定")]),i("br")],1):t._e(),t.fightidxshow?i("p",[t._v("あなたは "+t._s(t.fight_card_suit)+" を選択しました。")]):t._e(),i("br"),t.fightshow?i("div",[i("v-btn",{attrs:{color:"secondary",elevation:"3"},on:{click:t.fight_card}},[t._v("決定")]),i("br")],1):t._e(),i("br"),i("div",[t.betshow?i("v-btn",{attrs:{color:"secondary",elevation:"5"},on:{click:function(e){return t.bet_action("bet")}}},[t._v("ベット")]):t._e(),t.raiseshow?i("v-btn",{attrs:{color:"secondary",elevation:"5"},on:{click:function(e){return t.bet_action("raise")}}},[t._v("レイズ")]):t._e(),t.callshow?i("v-btn",{attrs:{color:"secondary",elevation:"5"},on:{click:function(e){return t.bet_action("call")}}},[t._v("コール")]):t._e(),t.foldshow?i("v-btn",{attrs:{color:"secondary",elevation:"5"},on:{click:function(e){return t.bet_action("fold")}}},[t._v("フォールド")]):t._e(),t.checkshow?i("v-btn",{attrs:{color:"secondary",elevation:"5"},on:{click:function(e){return t.bet_action("check")}}},[t._v("チェック")]):t._e(),i("br")],1),i("br"),t.resultshow?i("p",[t._v("プレイヤー "+t._s(t.winner_name)+" が勝ちました")]):t._e(),i("br"),t.gameovershow?i("div",[i("h2",[t._v("プレイヤー "+t._s(t.game_winner_name)+" がこのゲームに勝利しました")]),i("br"),i("v-btn",{attrs:{color:"secondary",elevation:"5"},on:{click:function(e){return t.leave_room()}}},[t._v("退出する")]),i("br")],1):t._e(),t.nextshow?i("v-btn",{attrs:{color:"secondary",elevation:"5"},on:{click:function(e){return t.next_game()}}},[t._v("次へ")]):t._e(),i("br")],1):t._e()])},d=[],u=(i("b0c0"),i("7c81")),_=i.n(u),f={data:function(){return{username:"",room:"",message:"",instruction:"",Money:"",OpponentMoney:"",Tips:"",select:"",fight:"",fight_card_suit:"",winner_name:"",game_winner_name:"",messages:[],hands:[],converthands:[],socket:_()(),startshow:!0,waitshow:!1,gameshow:!1,selectshow:!1,fightshow:!1,fightidxshow:!1,betshow:!1,raiseshow:!1,callshow:!1,foldshow:!1,checkshow:!1,resultshow:!1,nextshow:!1,gameovershow:!1,loader:null,gamestartbutton:!1,rules:[function(t){return!!t||"Required."}],imgura:i("c88b"),imgrock:i("8e41"),imgpaper:i("c079"),imgscissors:i("cfd2"),isClicked0:!1,isClicked1:!1,isClicked2:!1,isClicked3:!1,isClicked4:!1}},methods:{test:function(){this.loader="gamestartbutton",this.game_start()},game_start:function(){this.startshow=!1,this.socket.emit("join_room_ctos",{client_id:this.socket.id,username:this.username,room:this.room})},discard_card:function(){this.socket.emit("discard_card_ctos",{client_id:this.socket.id,room:this.room,discard0:this.isClicked0,discard1:this.isClicked1,discard2:this.isClicked2,discard3:this.isClicked3,discard4:this.isClicked4}),this.selectshow=!1},fight_card:function(){this.socket.emit("fight_card_ctos",{client_id:this.socket.id,room:this.room,fightcard0:this.isClicked0,fightcard1:this.isClicked1,fightcard2:this.isClicked2,fightcard3:this.isClicked3,fightcard4:this.isClicked4}),this.fightshow=!1},bet_action:function(t){this.socket.emit("betting_ctos",{client_id:this.socket.id,room:this.room,action:t}),this.betshow=!1,this.raiseshow=!1,this.callshow=!1,this.foldshow=!1,this.checkshow=!1},next_game:function(){this.socket.emit("game_reset_ctos")},leave_room:function(){this.socket.emit("leave_room_ctos"),this.gameshow=!1,this.startshow=!0,this.gameovershow=!1,this.fightidxshow=!1,this.resultshow=!1},convert_hand_suit:function(t){for(var e=[],i=0;i<t.length;i++)"Rock"===t[i]?e.push(this.imgrock):"Paper"===t[i]?e.push(this.imgpaper):"Scissors"===t[i]&&e.push(this.imgscissors);return e},onActive:function(t){0===t&&(this.isClicked0?this.isClicked0=!1:this.isClicked0=!0),1===t&&(this.isClicked1?this.isClicked1=!1:this.isClicked1=!0),2===t&&(this.isClicked2?this.isClicked2=!1:this.isClicked2=!0),3===t&&(this.isClicked3?this.isClicked3=!1:this.isClicked3=!0),4===t&&(this.isClicked4?this.isClicked4=!1:this.isClicked4=!0)},isClicked_reset:function(){this.isClicked0=!1,this.isClicked1=!1,this.isClicked2=!1,this.isClicked3=!1,this.isClicked4=!1}},mounted:function(){var t=this;this.socket.on("game_wait_stoc",(function(){t.waitshow=!0})),this.socket.on("game_start_stoc",(function(){t.waitshow=!1,t.gameshow=!0})),this.socket.on("room_leave_stoc",(function(){alert("ルームが満室デス"),t.startshow=!0})),this.socket.on("player_info_stoc",(function(e){t.hands=e.player_hands,t.converthands=t.convert_hand_suit(t.hands),t.Money=e.player_money,t.Tips=e.tips,t.OpponentMoney=e.opponent_money,t.isClicked_reset()})),this.socket.on("player_select_discard_stoc",(function(){t.instruction="変更するカードを選択してください",t.selectshow=!0})),this.socket.on("player_wait_stoc",(function(){t.instruction="相手プレイヤーの選択を待っています",t.selectshow=!1,t.fightshow=!1,t.betshow=!1,t.isClicked_reset()})),this.socket.on("player_select_fight_stoc",(function(){t.instruction="勝負するカードを選択してください",t.fightshow=!0})),this.socket.on("fight_card_info_stoc",(function(e){t.fight_card_suit=e.player.hands[e.player.fight_card_idx],t.fightidxshow=!0})),this.socket.on("game_result_stoc",(function(e){t.winner_name=e.player.name,t.resultshow=!0})),this.socket.on("game_result_draw_stoc",(function(){alert("Draw")})),this.socket.on("player_select_bet_stoc",(function(e){t.instruction="アクションを選択してください",t.betshow=e.betshow,t.raiseshow=e.raiseshow,t.callshow=e.callshow,t.foldshow=e.foldshow,t.checkshow=e.checkshow})),this.socket.on("player_select_alert_stoc",(function(t){alert("プレイヤー "+t.player_name+" が"+t.action+" をしました")})),this.socket.on("game_reset_stoc",(function(){t.nextshow=!0})),this.socket.on("next_start_stoc",(function(){t.nextshow=!1,t.resultshow=!1,t.fightidxshow=!1})),this.socket.on("game_over_stoc",(function(e){t.game_winner_name=e.winner_player.name,t.gameovershow=!0})),this.socket.on("opponent_disconnect_stoc",(function(){alert("相手の接続が切れました"),t.leave_room()}))},watch:{loader:function(){var t=this,e=this.loader;this[e]=!this[e],setTimeout((function(){return t[e]=!1}),3e3),this.loader=null}}},p=f,m=(i("68e4"),i("2877")),v=i("6544"),w=i.n(v),g=i("0798"),k=i("8336"),b=i("a523"),y=i("490a"),C=i("8654"),x=Object(m["a"])(p,h,d,!1,null,null,null),O=x.exports;w()(x,{VAlert:g["a"],VBtn:k["a"],VContainer:b["a"],VProgressCircular:y["a"],VTextField:C["a"]});var j={},T=Object(m["a"])(j,s,o,!1,null,null,null),A=T.exports,M={data:function(){return{drawer:null}},components:{Game:O,Test:A}},P=M,V=i("7496"),S=i("40dc"),N=i("5bc1"),$=i("f6c4"),B=i("f774"),E=i("2a7f"),Y=Object(m["a"])(P,a,l,!1,null,null,null),D=Y.exports;w()(Y,{VApp:V["a"],VAppBar:S["a"],VAppBarNavIcon:N["a"],VMain:$["a"],VNavigationDrawer:B["a"],VToolbarTitle:E["a"]});var G={name:"App",components:{Practice:D}},J=G,R=Object(m["a"])(J,r,c,!1,null,null,null),q=R.exports,z=i("f309");n["a"].use(z["a"]);var F=new z["a"]({});n["a"].config.productionTip=!1,new n["a"]({vuetify:F,render:function(t){return t(q)}}).$mount("#app")},"68e4":function(t,e,i){"use strict";i("4e2d")},"8e41":function(t,e,i){t.exports=i.p+"img/rock.8300d5a9.png"},c079:function(t,e,i){t.exports=i.p+"img/paper.f72a62ec.png"},c88b:function(t,e,i){t.exports=i.p+"img/ura.7a35be36.png"},cfd2:function(t,e,i){t.exports=i.p+"img/scissors.fbc3ec8e.png"}});
//# sourceMappingURL=app.8ee54479.js.map
module.exports = class Player{
    constructor(id, name, room) {
        this.id = id;
        this.name = name;
        this.room = room;
        this.hands = new Array();
        this.money = 100;
        this.fight_card_idx = -1;
        this.exchanged = false;
        this.selected_fight_card = false;
        this.fold_flag = false;
        this.current_bet = 0;
    }

    get_id() {
        return this.id;
    }

    get_name() {
        return this.name;
    }
    
    get_hands() {
        return this.hands;
    }

    get_fight_card() {
        return this.hands[this.fight_card_idx];
    }

    get_exchanged() {
        return this.exchanged;
    }

    get_fight_card_idx() {
        return this.fight_card_idx;
    }

    get_selected_fight_card() {
        return this.selected_fight_card;
    }

    get_money() {
        return this.money;
    }
  
    choice_discard() {
        const change_cards = new Array();
    }

    choice_fight_card() {
        this.fight_card_idx = Math.floor(Math.random() * 5);
    }

    count_fight_suit() {
        let cnt = 0;
        for (let i = 0; i < this.hands.length; i++) {
            if (this.hands[i] == this.hands[this.fight_card_idx]) {
                cnt++;
            }
        }
        return cnt;
    }

    bet(bet) {
        this.money -= bet;
        this.current_bet += bet;
    }

    call(call) {
        this.money -= call;
        this.current_bet += call;
    }

    fold() {

    }

    raise(raise) {
        this.money -= raise;
        this.current_bet += raise;
    }

    reset() {
        this.fight_card_idx = -1;
        this.exchanged = false;
        this.selected_fight_card = false;
        this.fold_flag = false;
        this.current_bet = 0;
    }

}
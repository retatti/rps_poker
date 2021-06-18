module.exports = class Player{
    constructor(id) {
        this.id = id;
        this.hands = new Array();
        this.money = 0;
        this.fight_card_idx = -1;
    }

    get_id() {
        return this.id;
    }
    
    get_hands() {
        return this.hands;
    }

    get_fight_card() {
        return this.hands[this.fight_card_idx];
    }

    get_fight_card_idx() {
        return this.fight_card_idx;
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

}
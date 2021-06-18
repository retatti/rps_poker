// 二人用じゃんけん
module.exports = function janken(suit1, suit2) {
    const suit_list = ["Rock", "Paper", "Scissors"];
    var winner_idx = -1;

    if (suit1 == suit_list[0] && suit2 == suit_list[2]) {
        winner_idx = 0;
    } else if (suit1 == suit_list[2] && suit2 == suit_list[1]) {
        winner_idx = 0;
    } else if (suit1 == suit_list[1] && suit2 == suit_list[0]) {
        winner_idx = 0;
    } else if (suit1 == suit2) {
        winner_idx = -1;
    } else {
        winner_idx = 1;
    }
    return winner_idx;
};
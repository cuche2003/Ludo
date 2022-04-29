export default class GameState {
  constructor(map, pieces, parties, playerCount, players) {
    this.map = map;
    this.pieces = pieces;
    this.parties = parties;
    this.players = players;

    this.playerCount = playerCount;
    this.turn = 0;
    this.turnOrder = Array(playerCount).fill(0).map((item, index) => index);
    this.currentPlayer = 0;

    this.rollResult = 0;
  }
}

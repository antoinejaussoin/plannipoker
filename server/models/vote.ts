import Card from './Card';
import Player from './player';

export default class Vote {
  card: Card = null;
  player: Player = null;

  constructor(card: Card, player: Player) {
    this.card = card;
    this.player = player;
  }
}
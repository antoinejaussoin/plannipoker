import Card from './Card';
import Player from './player';

export default class Vote {
  constructor(public card: Card, public player: Player) {}
}

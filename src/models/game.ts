import Story from './story';
import Player from './player';
import * as shortid from 'shortid';

export default class Game {
  id: string;
  name: string;
  stories: Story[] = [];
  players: Player[] = [];
  currentStoryId: string = null;

  constructor() {
    this.id = shortid();
    this.name = 'My Plannipoker Game';
  }

  get owner(): Player {
    return this.players.find(player => player.owner);
  }
}
